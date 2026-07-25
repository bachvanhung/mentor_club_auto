#!/usr/bin/env node
/*
 * post-youtube-api.js — Đăng video từ Lark Base lên YouTube bằng LARK OPEN API + YouTube Data API v3.
 * Cùng mô hình post-reels-api.js (đăng Reel Facebook) nhưng đích đến là YouTube.
 * Chỉ cần Node 18+ (dùng fetch có sẵn). Đọc/ghi Base bằng app credentials (tenant token),
 * tải video từ Lark rồi upload resumable (phân mảnh) lên YouTube.
 *
 * Chạy:  node post-youtube-api.js            (đăng thật các dòng "Chờ đăng")
 *        node post-youtube-api.js --dry-run  (chỉ liệt kê, không đăng, không ghi Base)
 *
 * Đây là runner ON-DEMAND: Lark Automation gọi workflow dang-youtube → chạy file này 1 lần.
 *
 * BẮT BUỘC qua BIẾN MÔI TRƯỜNG (GitHub Secrets/Variables — KHÔNG hardcode để tránh lộ):
 *   Lark:    LARK_APP_ID, LARK_APP_SECRET, LARK_APP_TOKEN (base), LARK_TABLE_ID (bảng đăng YouTube)
 *   YouTube: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN
 *            (tạo OAuth client "Desktop"/"Web" ở Google Cloud, bật YouTube Data API v3,
 *             lấy refresh_token với scope https://www.googleapis.com/auth/youtube.upload)
 * TÙY CHỌN: LARK_DOMAIN, TRIGGER, RESPECT_SCHEDULE, YT_PRIVACY (public|unlisted|private),
 *            YT_CATEGORY_ID (mặc định 22), YT_CHUNK_MB, YT_UPLOAD_RETRY, RECORD_ID (đăng đúng 1 dòng).
 */
'use strict';
const fs = require('fs'), os = require('os'), path = require('path');

const CFG = {
  APP_ID:        process.env.LARK_APP_ID      || '',   // BẮT BUỘC (Variables)
  APP_SECRET:    process.env.LARK_APP_SECRET  || '',   // BẮT BUỘC (Secrets)
  APP_TOKEN:     process.env.LARK_APP_TOKEN   || '',   // BẮT BUỘC: base token (Variables)
  TABLE_ID:      process.env.LARK_TABLE_ID    || '',   // BẮT BUỘC: bảng "Đăng YouTube" (Variables)
  LARK_DOMAIN:   process.env.LARK_DOMAIN      || 'https://open.larksuite.com',
  YT_CLIENT_ID:     process.env.YT_CLIENT_ID     || '',   // BẮT BUỘC (Secrets)
  YT_CLIENT_SECRET: process.env.YT_CLIENT_SECRET || '',   // BẮT BUỘC (Secrets)
  YT_REFRESH_TOKEN: process.env.YT_REFRESH_TOKEN || '',   // BẮT BUỘC (Secrets)
  YT_PRIVACY:    (process.env.YT_PRIVACY || 'public').trim(),      // public|unlisted|private
  YT_CATEGORY:   (process.env.YT_CATEGORY_ID || '22').trim(),      // 22 = People & Blogs
  TRIGGER:       process.env.TRIGGER || 'Chờ đăng',
  RESPECT_SCHEDULE: process.env.RESPECT_SCHEDULE !== 'false',       // dòng "Lịch đăng" tương lai -> bỏ qua
  RECORD_ID:     (process.env.RECORD_ID || '').trim(),             // đăng đúng 1 dòng
};
const DRY = process.argv.includes('--dry-run');
if (!DRY && (!CFG.APP_SECRET || !CFG.YT_CLIENT_ID || !CFG.YT_CLIENT_SECRET || !CFG.YT_REFRESH_TOKEN)) {
  console.error('!! Thiếu LARK_APP_SECRET hoặc YT_CLIENT_ID/YT_CLIENT_SECRET/YT_REFRESH_TOKEN — đặt qua biến môi trường (GitHub Secrets).');
  process.exit(1);
}

// Tên cột trong bảng Lark — có thể ghi đè qua env nếu bảng của bạn đặt tên khác.
const F = {
  trigger:  process.env.COL_TRIGGER  || 'TT YouTube',   // cột trạng thái (nút/loại) — giá trị TRIGGER để chọn đăng
  title:    process.env.COL_TITLE    || 'Tiêu đề',
  media:    process.env.COL_MEDIA    || 'Video',
  caption:  process.env.COL_CAPTION  || 'Nội dung',
  tags:     process.env.COL_TAGS     || 'Tags',
  link:     process.env.COL_LINK     || 'Link YouTube',
  log:      process.env.COL_LOG      || 'Log',
  schedule: process.env.COL_SCHEDULE || 'Lịch đăng',
};
const DONE = process.env.STATUS_DONE || 'Đã đăng';
const FAIL = process.env.STATUS_FAIL || 'Lỗi';

const now = () => new Date().toISOString().replace('T',' ').slice(0,19);
const log = (...a) => console.log(now(), ...a);
const plain = v => v==null?'':typeof v==='string'?v:Array.isArray(v)?v.map(x=>x.text||x.name||'').join(''):(v.text||v.name||String(v));
const selName = v => plain(v);

// ---------- Lark ----------
async function larkToken() {
  const r = await fetch(CFG.LARK_DOMAIN+'/open-apis/auth/v3/tenant_access_token/internal',
    { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({app_id:CFG.APP_ID,app_secret:CFG.APP_SECRET}) });
  const j = await r.json(); if (j.code!==0) throw new Error('Lark token: '+JSON.stringify(j));
  return j.tenant_access_token;
}
async function listAll(tk) {
  let items=[], pt='';
  do { const r=await fetch(`${CFG.LARK_DOMAIN}/open-apis/bitable/v1/apps/${CFG.APP_TOKEN}/tables/${CFG.TABLE_ID}/records?page_size=200`+(pt?'&page_token='+pt:''),{headers:{Authorization:'Bearer '+tk}});
    const j=await r.json(); if(j.code!==0)throw new Error('list: '+JSON.stringify(j));
    items=items.concat(j.data.items||[]); pt=j.data.has_more?j.data.page_token:''; } while(pt);
  return items;
}
async function downloadVideo(tk, fileToken, out) {
  const tries=[ `${CFG.LARK_DOMAIN}/open-apis/drive/v1/medias/${fileToken}/download?extra=${encodeURIComponent(JSON.stringify({bitablePerm:{tableId:CFG.TABLE_ID}}))}`,
                `${CFG.LARK_DOMAIN}/open-apis/drive/v1/medias/${fileToken}/download` ];
  for (const u of tries) { const r=await fetch(u,{headers:{Authorization:'Bearer '+tk}});
    if (r.ok && (r.headers.get('content-type')||'').indexOf('json')<0) { const b=Buffer.from(await r.arrayBuffer()); fs.writeFileSync(out,b); return b.length; } }
  throw new Error('không tải được video từ Lark');
}
async function updateRow(tk, recId, fields) {
  const r=await fetch(`${CFG.LARK_DOMAIN}/open-apis/bitable/v1/apps/${CFG.APP_TOKEN}/tables/${CFG.TABLE_ID}/records/${recId}`,
    {method:'PUT',headers:{'Content-Type':'application/json; charset=utf-8',Authorization:'Bearer '+tk},body:JSON.stringify({fields})});
  const j=await r.json(); if(j.code!==0)throw new Error('update: '+JSON.stringify(j));
}
function scheduleMs(cell){ if(cell==null)return null; if(typeof cell==='number')return cell; // Lark datetime = epoch ms
  const t=plain(cell).trim(); if(!t)return null;
  const m=t.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/); if(m)return new Date(+m[1],+m[2]-1,+m[3],+m[4],+m[5]).getTime();
  const d=new Date(t); return isNaN(d)?null:d.getTime(); }

// ---------- YouTube ----------
// Đổi refresh_token -> access_token ngắn hạn (mỗi lần chạy lấy mới).
async function ytAccessToken() {
  const r = await fetch('https://oauth2.googleapis.com/token', { method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({ client_id:CFG.YT_CLIENT_ID, client_secret:CFG.YT_CLIENT_SECRET,
      refresh_token:CFG.YT_REFRESH_TOKEN, grant_type:'refresh_token' }) });
  const t = await r.text(); let j; try{j=JSON.parse(t)}catch{j={_raw:t}}
  if (!r.ok || !j.access_token) throw new Error('YT token: '+JSON.stringify(j.error_description||j.error||j._raw||j));
  return j.access_token;
}
// Upload PHÂN MẢNH + resume + retry theo chuẩn resumable của Google:
// 1) POST khởi tạo (kèm metadata JSON) -> nhận Location = upload URL.
// 2) PUT từng chunk với Content-Range; 308 = chưa xong (đọc header Range để resume), 200/201 = xong (trả video resource).
const YT_CHUNK = Math.max(1, parseInt(process.env.YT_CHUNK_MB || '8', 10)) * 1024 * 1024;
const YT_UPLOAD_RETRY = Math.max(1, parseInt(process.env.YT_UPLOAD_RETRY || '5', 10));
async function uploadResumable(accessToken, filePath, metadata) {
  const total = fs.statSync(filePath).size;
  // [1] Khởi tạo phiên resumable
  const init = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method:'POST',
    headers:{ Authorization:'Bearer '+accessToken, 'Content-Type':'application/json; charset=utf-8',
      'X-Upload-Content-Length':String(total), 'X-Upload-Content-Type':'video/*' },
    body: JSON.stringify(metadata) });
  if (!init.ok) { const t=await init.text(); throw new Error('YT init '+init.status+': '+t.slice(0,300)); }
  const uploadUrl = init.headers.get('location');
  if (!uploadUrl) throw new Error('YT init không trả upload URL (Location).');
  // [2] PUT từng chunk
  const fd = fs.openSync(filePath, 'r');
  try {
    let offset = 0;
    while (offset < total) {
      const len = Math.min(YT_CHUNK, total - offset);
      const chunk = Buffer.alloc(len);
      fs.readSync(fd, chunk, 0, len, offset);
      let attempt = 0;
      for(;;){
        attempt++;
        try {
          const r = await fetch(uploadUrl, { method:'PUT',
            headers:{ 'Content-Length':String(len), 'Content-Range':`bytes ${offset}-${offset+len-1}/${total}` },
            body: chunk });
          if (r.status === 308) { // chưa xong — server báo đã nhận tới đâu qua Range: bytes=0-N
            const range = r.headers.get('range');
            offset = range ? (parseInt(range.split('-')[1],10)+1) : (offset+len);
            break;
          }
          if (r.ok) { // 200/201 — xong: body là video resource
            const t=await r.text(); let j; try{j=JSON.parse(t)}catch{j={_raw:t}}
            if (!j.id) throw new Error('YT upload xong nhưng thiếu video id: '+JSON.stringify(j).slice(0,200));
            log(`     ↑ youtube upload ${total}/${total} bytes (100%)`);
            return j;
          }
          const t=await r.text(); throw new Error('YT put '+r.status+': '+t.slice(0,200));
        } catch(e){
          if(attempt >= YT_UPLOAD_RETRY) throw new Error(`upload chunk @${offset} thất bại sau ${attempt} lần: ${String(e.message||e).slice(0,160)}`);
          log(`     … chunk @${offset} lỗi (lần ${attempt}), thử lại: ${String(e.message||e).slice(0,100)}`);
          await new Promise(r=>setTimeout(r, 1500*attempt));
        }
      }
      log(`     ↑ youtube upload ${Math.min(offset,total)}/${total} bytes (${Math.round(offset/total*100)}%)`);
    }
    throw new Error('YT upload kết thúc mà không nhận được video resource.');
  } finally { fs.closeSync(fd); }
}
async function postYouTube(accessToken, videoPath, title, description, tags) {
  const metadata = {
    snippet: { title: (title||'Video').slice(0,100), description: description||'',
      tags: tags && tags.length ? tags : undefined, categoryId: CFG.YT_CATEGORY },
    status: { privacyStatus: CFG.YT_PRIVACY, selfDeclaredMadeForKids: false },
  };
  const res = await uploadResumable(accessToken, videoPath, metadata);
  return { videoId: res.id, url: `https://youtu.be/${res.id}` };
}

(async()=>{
  const tk=await larkToken();
  const rows=await listAll(tk);
  let targets=rows.filter(r=>selName(r.fields[F.trigger])===CFG.TRIGGER);
  if(CFG.RECORD_ID){ targets=rows.filter(r=>r.record_id===CFG.RECORD_ID);
    log(`Chỉ đăng dòng record_id=${CFG.RECORD_ID} (${targets.length} dòng khớp).`); }
  else log(`Tìm thấy ${targets.length} dòng "${CFG.TRIGGER}" (tổng ${rows.length}).`);

  let ytToken=null;
  if(!DRY && targets.length) ytToken=await ytAccessToken();

  let ok=0,err=0,wait=0; const nowMs=Date.now();
  for(const row of targets){
    const recId=row.record_id;
    // Chỉ định record_id = đăng ngay dòng đó, bỏ qua kiểm tra lịch.
    if(CFG.RESPECT_SCHEDULE && !CFG.RECORD_ID){ const s=scheduleMs(row.fields[F.schedule]); if(s&&s>nowMs){ log(`  [CHỜ GIỜ] ${recId}: hẹn ${plain(row.fields[F.schedule])}`); wait++; continue; } }
    const media=row.fields[F.media];
    const att=Array.isArray(media)?(media.find(a=>/\.(mp4|mov|m4v|webm|avi|mkv)$/i.test(a.name||''))||media[0]):null;
    const title=plain(row.fields[F.title]).trim();
    const description=plain(row.fields[F.caption]);
    const tags=plain(row.fields[F.tags]).split(/[,\n]/).map(s=>s.trim()).filter(Boolean);
    if(!att||!att.file_token){ log(`  [BỎ QUA] ${recId}: không có video.`); if(!DRY)await updateRow(tk,recId,{[F.trigger]:FAIL,[F.log]:`${now()} - không có video`}); err++; continue; }
    log(`  >> ${recId}: ${(att.name||'').slice(0,40)} (${Math.round((att.size||0)/1048576*10)/10}MB) | "${(title||'(không tiêu đề)').slice(0,40)}"`);
    if(DRY){ log(`     [DRY] title: ${title.slice(0,60)} | privacy=${CFG.YT_PRIVACY} | tags=${tags.join(',').slice(0,60)}`); continue; }
    const vp=path.join(os.tmpdir(),'yt_'+recId+'.mp4');
    try{ await downloadVideo(tk,att.file_token,vp);
      const {videoId,url}=await postYouTube(ytToken, vp, title||(att.name||'Video'), description, tags);
      await updateRow(tk,recId,{[F.trigger]:DONE,[F.link]:{link:url,text:'Xem video'},[F.log]:`${now()} - OK - video_id ${videoId}`});
      log(`     ✔ ĐÃ ĐĂNG: ${url}`); ok++;
    }catch(e){ const msg=String(e.message||e).slice(0,300); log(`     ✖ LỖI: ${msg}`);
      try{await updateRow(tk,recId,{[F.trigger]:FAIL,[F.log]:`${now()} - ${msg}`});}catch{} err++;
    }finally{ try{fs.unlinkSync(vp)}catch{} }
  }
  log(`Xong. Đăng: ${ok}, Lỗi: ${err}, Chờ giờ: ${wait}.`);
})().catch(e=>{console.error('FATAL',e.message||e);process.exit(1);});

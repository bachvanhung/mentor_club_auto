#!/usr/bin/env node
/*
 * post-reels-api.js — Đăng Reel từ Lark Base lên Facebook Page bằng LARK OPEN API.
 * KHÁC bản gốc post-reels.js: KHÔNG cần lark-cli / auth login.
 * Chỉ cần Node 18+. Dùng app credentials (tenant token) để đọc/ghi Base + tải video.
 *
 * Chạy:  node post-reels-api.js            (đăng thật, tất cả dòng "Chờ đăng")
 *        node post-reels-api.js --dry-run  (chỉ liệt kê, không đăng)
 *
 * Đây là runner cho mô hình ON-DEMAND: gọi skill dang-reel-facebook → chạy file này 1 lần.
 */
'use strict';
const fs = require('fs'), os = require('os'), path = require('path');

// Thông số đọc từ BIẾN MÔI TRƯỜNG (GitHub Secrets / .env local).
// Bí mật (APP_SECRET, FB_PAGE_TOKEN) KHÔNG hardcode để tránh lộ khi đẩy lên git.
// Các giá trị không bí mật có default tiện chạy nhanh; ghi đè qua env nếu cần.
const CFG = {
  APP_ID:        process.env.LARK_APP_ID     || '',                       // BẮT BUỘC qua env/Variables
  APP_SECRET:    process.env.LARK_APP_SECRET || '',                       // BẮT BUỘC qua env/Secrets
  APP_TOKEN:     process.env.LARK_APP_TOKEN  || '',                       // BẮT BUỘC: base token (Variables)
  TABLE_ID:      process.env.LARK_TABLE_ID   || '',                       // BẮT BUỘC: bảng "Đăng Reel" (Variables)
  FB_PAGE_ID:    process.env.FB_PAGE_ID      || '',                       // BẮT BUỘC: Page ID (Variables)
  FB_PAGE_TOKEN: process.env.FB_PAGE_TOKEN   || '',                       // BẮT BUỘC qua env/Secrets
  LARK_DOMAIN:   process.env.LARK_DOMAIN     || 'https://open.larksuite.com',
  GRAPH_VERSION: 'v21.0',
  TRIGGER:       process.env.TRIGGER         || 'Chờ đăng',
  RESPECT_SCHEDULE: process.env.RESPECT_SCHEDULE !== 'false', // dòng "Lịch đăng" tương lai -> bỏ qua
  // Số Reel tối đa mỗi lần chạy (0 = không giới hạn). Workflow chạy theo lịch đặt = 1
  // để mỗi khung giờ chỉ đăng đúng 1 video, kể cả khi cột "Lịch đăng" để trống.
  MAX_POSTS:     Math.max(0, parseInt(process.env.MAX_POSTS || '0', 10) || 0),
  // FB_SCHEDULE=true: dòng có "Lịch đăng" tương lai được tải lên trước và HẸN GIỜ TRÊN FACEBOOK
  // (video_state=SCHEDULED) -> Facebook tự đăng đúng phút, không phụ thuộc cron GitHub chạy trễ.
  FB_SCHEDULE:   process.env.FB_SCHEDULE === 'true'
};
// Facebook chỉ nhận giờ hẹn cách hiện tại từ 10 phút đến 75 ngày.
const FB_SCHED_MIN = 10*60*1000, FB_SCHED_MAX = 75*24*3600*1000;
const GRAPH = `https://graph.facebook.com/${CFG.GRAPH_VERSION}`;
const DRY = process.argv.includes('--dry-run');
if (!DRY && (!CFG.APP_SECRET || !CFG.FB_PAGE_TOKEN)) {
  console.error('!! Thiếu LARK_APP_SECRET hoặc FB_PAGE_TOKEN — đặt qua biến môi trường (GitHub Secrets).');
  process.exit(1);
}
const F = { trigger:'TT Reel', media:'Ảnh/video', caption:'Nội dung', hashtag:'Hastag', link:'Link Reel', log:'Log đăng Reel', schedule:'Lịch đăng', comment:'Comment ebook' };
const now = () => new Date().toISOString().replace('T',' ').slice(0,19);
const log = (...a) => console.log(now(), ...a);
const plain = v => v==null?'':typeof v==='string'?v:Array.isArray(v)?v.map(x=>x.text||x.name||'').join(''):(v.text||v.name||String(v));
const selName = v => { const t=plain(v); return t; };

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
  throw new Error('không tải được video');
}
async function fbFetch(u,o){ const r=await fetch(u,o); const t=await r.text(); let j; try{j=JSON.parse(t)}catch{j={_raw:t}} if(!r.ok||j.error)throw new Error('FB '+r.status+': '+JSON.stringify(j.error||j._raw||j)); return j; }
// Upload PHÂN MẢNH + resume + retry lên rupload endpoint: đọc file theo chunk (không nạp cả file vào RAM),
// gửi theo offset tăng dần; lỗi mạng/5xx -> retry đúng chunk (backoff); tôn trọng offset server trả về.
const REEL_CHUNK = Math.max(1, parseInt(process.env.REEL_CHUNK_MB || '8', 10)) * 1024 * 1024;
const REEL_UPLOAD_RETRY = Math.max(1, parseInt(process.env.REEL_UPLOAD_RETRY || '5', 10));
async function uploadResumable(uploadUrl, token, filePath){
  const total = fs.statSync(filePath).size;
  const fd = fs.openSync(filePath, 'r');
  try {
    let offset = 0;
    while (offset < total) {
      const len = Math.min(REEL_CHUNK, total - offset);
      const chunk = Buffer.alloc(len);
      fs.readSync(fd, chunk, 0, len, offset);
      let attempt = 0;
      for(;;){
        attempt++;
        try {
          const r = await fetch(uploadUrl, { method:'POST',
            headers:{ Authorization:`OAuth ${token}`, offset:String(offset), file_size:String(total) }, body: chunk });
          const t = await r.text(); let j; try{j=JSON.parse(t)}catch{j={_raw:t}}
          if(!r.ok || j.error) throw new Error('rupload '+r.status+': '+JSON.stringify(j.error||j._raw||j));
          offset = (typeof j.offset === 'number') ? j.offset : offset + len;
          break;
        } catch(e){
          if(attempt >= REEL_UPLOAD_RETRY) throw new Error(`upload chunk @${offset} thất bại sau ${attempt} lần: ${String(e.message||e).slice(0,160)}`);
          log(`     … chunk @${offset} lỗi (lần ${attempt}), thử lại: ${String(e.message||e).slice(0,100)}`);
          await new Promise(r=>setTimeout(r, 1500*attempt));
        }
      }
      log(`     ↑ reel upload ${Math.min(offset,total)}/${total} bytes (${Math.round(offset/total*100)}%)`);
    }
  } finally { fs.closeSync(fd); }
}
async function postReel(videoPath, caption, publishAtMs) {
  const start=await fbFetch(`${GRAPH}/${CFG.FB_PAGE_ID}/video_reels?upload_phase=start&access_token=${encodeURIComponent(CFG.FB_PAGE_TOKEN)}`,{method:'POST'});
  const videoId=start.video_id, uploadUrl=start.upload_url;
  if(!videoId||!uploadUrl)throw new Error('start thiếu video_id/upload_url');
  await uploadResumable(uploadUrl, CFG.FB_PAGE_TOKEN, videoPath);
  const finish={upload_phase:'finish',video_id:videoId,video_state:'PUBLISHED',description:caption||'',access_token:CFG.FB_PAGE_TOKEN};
  if(publishAtMs){ finish.video_state='SCHEDULED'; finish.scheduled_publish_time=String(Math.floor(publishAtMs/1000)); }
  await fbFetch(`${GRAPH}/${CFG.FB_PAGE_ID}/video_reels`,{method:'POST',body:new URLSearchParams(finish)});
  let permalink='';
  if(publishAtMs) return {videoId,permalink};   // hẹn giờ: Facebook tự đăng, không cần chờ xử lý
  for(let i=0;i<30;i++){ await new Promise(r=>setTimeout(r,6000));
    try{ const st=await fbFetch(`${GRAPH}/${videoId}?fields=status,permalink_url&access_token=${encodeURIComponent(CFG.FB_PAGE_TOKEN)}`,{method:'GET'});
      const phase=st.status&&(st.status.video_status||(st.status.processing_phase&&st.status.processing_phase.status));
      if(st.permalink_url)permalink=st.permalink_url;
      if(phase==='ready'||phase==='PUBLISHED'||(st.status&&st.status.video_status==='ready'))break;
      if(phase==='error')throw new Error('FB xử lý lỗi: '+JSON.stringify(st.status)); }catch(e){}
  }
  if(permalink&&permalink.startsWith('/'))permalink='https://www.facebook.com'+permalink;
  return {videoId,permalink};
}
// Đăng comment #1 vào bài (link ebook). Cần FB scope pages_manage_engagement.
// objectId = video_id của Reel vừa đăng. Không throw ra ngoài luồng đăng chính.
async function postComment(objectId, message) {
  return fbFetch(`${GRAPH}/${objectId}/comments`, { method:'POST', body:new URLSearchParams({ message, access_token:CFG.FB_PAGE_TOKEN }) });
}
async function updateRow(tk, recId, fields) {
  const r=await fetch(`${CFG.LARK_DOMAIN}/open-apis/bitable/v1/apps/${CFG.APP_TOKEN}/tables/${CFG.TABLE_ID}/records/${recId}`,
    {method:'PUT',headers:{'Content-Type':'application/json; charset=utf-8',Authorization:'Bearer '+tk},body:JSON.stringify({fields})});
  const j=await r.json(); if(j.code!==0)throw new Error('update: '+JSON.stringify(j));
}
function scheduleMs(cell){ const t=plain(cell).trim(); if(!t)return null;
  const m=t.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/); if(m)return new Date(+m[1],+m[2]-1,+m[3],+m[4],+m[5]).getTime();
  const d=new Date(t); return isNaN(d)?null:d.getTime(); }

(async()=>{
  const tk=await larkToken();
  const rows=await listAll(tk);
  // Thứ tự đăng: dòng có "Lịch đăng" sớm nhất trước, dòng không có lịch theo thứ tự trong bảng.
  const targets=rows.map((r,i)=>({r,i,s:scheduleMs(r.fields[F.schedule])}))
    .filter(x=>selName(x.r.fields[F.trigger])===CFG.TRIGGER)
    .sort((a,b)=>(a.s??Infinity)-(b.s??Infinity)||a.i-b.i).map(x=>x.r);
  log(`Tìm thấy ${targets.length} dòng "${CFG.TRIGGER}" (tổng ${rows.length}).`+(CFG.MAX_POSTS?` Giới hạn ${CFG.MAX_POSTS} Reel/lần.`:''));
  let ok=0,err=0,wait=0,tried=0,sched=0; const nowMs=Date.now();
  for(const row of targets){
    const recId=row.record_id;
    let publishAt=null;
    if(CFG.RESPECT_SCHEDULE){ const s=scheduleMs(row.fields[F.schedule]);
      if(s&&s>nowMs){
        if(CFG.FB_SCHEDULE && s-nowMs>=FB_SCHED_MIN && s-nowMs<=FB_SCHED_MAX) publishAt=s;
        else { log(`  [CHỜ GIỜ] ${recId}: hẹn ${plain(row.fields[F.schedule])}`+(CFG.FB_SCHEDULE?' (ngoài khoảng 10 phút - 75 ngày, để lần chạy sau)':'')); wait++; continue; }
      } }
    if(!publishAt && CFG.MAX_POSTS && tried>=CFG.MAX_POSTS){ log(`  [ĐỂ SAU] ${recId}: đã đủ ${CFG.MAX_POSTS} Reel đăng ngay cho lần chạy này.`); continue; }
    const media=row.fields[F.media]; const att=Array.isArray(media)?(media.find(a=>/\.(mp4|mov|m4v|webm)$/i.test(a.name||''))||media[0]):null;
    const caption=[plain(row.fields[F.caption]),plain(row.fields[F.hashtag])].filter(Boolean).join('\n\n');
    if(!att||!att.file_token){ log(`  [BỎ QUA] ${recId}: không có file.`); if(!DRY)await updateRow(tk,recId,{[F.trigger]:'Lỗi',[F.log]:`${now()} - không có file`}); err++; continue; }
    log(`  >> ${recId}: ${(att.name||'').slice(0,40)} (${Math.round((att.size||0)/1048576*10)/10}MB)`);
    if(DRY){ if(publishAt)log(`     [DRY] sẽ HẸN GIỜ trên Facebook: ${plain(row.fields[F.schedule])}`);
      log(`     [DRY] caption: ${caption.slice(0,60).replace(/\n/g,' ')}`);
      const c=plain(row.fields[F.comment]).trim(); if(c)log(`     [DRY] comment #1: ${c.slice(0,80).replace(/\n/g,' ')}`); continue; }
    const vp=path.join(os.tmpdir(),'reel_'+recId+'.mp4'); if(!publishAt)tried++;
    try{ await downloadVideo(tk,att.file_token,vp);
      const {videoId,permalink}=await postReel(vp,caption,publishAt);
      if(publishAt){ const at=plain(row.fields[F.schedule]);
        await updateRow(tk,recId,{[F.trigger]:'Đã hẹn giờ',[F.log]:`${now()} - HẸN GIỜ FB ${at} - video_id ${videoId}`});
        log(`     ⏰ ĐÃ HẸN GIỜ trên Facebook: ${at} (video_id ${videoId})`); sched++; continue; }
      // [2] Auto comment #1: link ebook. Chỉ chạy nếu cột "Comment ebook" có nội dung. Lỗi comment KHÔNG làm hỏng bài đã đăng.
      let cmtNote=''; const commentText=plain(row.fields[F.comment]).trim();
      if(commentText){ try{ await postComment(videoId,commentText); cmtNote=' +cmt'; }catch(e){ cmtNote=' (cmt lỗi: '+String(e.message||e).slice(0,80)+')'; log(`     ! comment lỗi: ${String(e.message||e).slice(0,120)}`); } }
      await updateRow(tk,recId,{[F.trigger]:'Đã đăng',[F.link]:permalink||'',[F.log]:`${now()} - OK - video_id ${videoId}${cmtNote}`});
      log(`     ✔ ĐÃ ĐĂNG: ${permalink||'(đang xử lý)'}`); ok++;
    }catch(e){ const msg=String(e.message||e).slice(0,300); log(`     ✖ LỖI: ${msg}`);
      try{await updateRow(tk,recId,{[F.trigger]:'Lỗi',[F.log]:`${now()} - ${msg}`});}catch{} err++;
    }finally{ try{fs.unlinkSync(vp)}catch{} }
  }
  log(`Xong. Đăng: ${ok}, Hẹn giờ FB: ${sched}, Lỗi: ${err}, Chờ giờ: ${wait}.`);
})().catch(e=>{console.error('FATAL',e);process.exit(1);});

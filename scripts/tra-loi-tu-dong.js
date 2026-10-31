#!/usr/bin/env node
/*
 * tra-loi-tu-dong.js — AI tự trả lời BÌNH LUẬN + TIN NHẮN Fanpage (Claude soạn câu trả lời).
 *
 * Chạy:  node scripts/tra-loi-tu-dong.js            (trả lời thật)
 *        node scripts/tra-loi-tu-dong.js --dry-run  (chỉ in câu trả lời AI soạn, KHÔNG gửi)
 *
 * Làm gì mỗi lần chạy (GitHub Actions gọi định kỳ 15 phút/lần):
 *   1) Bình luận: quét N bài mới nhất, bình luận gốc nào Page CHƯA trả lời -> AI trả lời công khai
 *      + (tùy chọn) nhắn riêng cho người bình luận (private reply) để kéo về inbox.
 *   2) Tin nhắn: hội thoại nào tin cuối là của KHÁCH (trong 24h, đúng luật Messenger) -> AI trả lời.
 * Không lưu trạng thái: dựa vào "Page đã trả lời chưa" trên chính Facebook nên chạy lại không bị trùng.
 *
 * Kiến thức bán hàng AI dùng: tri-thuc/*.md (sản phẩm, giá, FAQ, giọng văn). SỬA FILE ĐÓ cho đúng của bạn.
 *
 * Bí mật qua BIẾN MÔI TRƯỜNG:
 *   ANTHROPIC_API_KEY (bắt buộc), FB_PAGE_TOKEN (bắt buộc), FB_PAGE_ID (bắt buộc)
 * Tùy chọn: SO_BAI (mặc định 10), PRIVATE_REPLY (true/false, mặc định true), TRA_LOI_INBOX (mặc định true),
 *           GRAPH_VERSION, CLAUDE_MODEL.
 * Quyền token Page cần: pages_read_engagement, pages_manage_engagement, pages_messaging.
 */
'use strict';
const fs = require('fs'), path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const CFG = {
  PAGE_ID:       process.env.FB_PAGE_ID    || '',
  PAGE_TOKEN:    process.env.FB_PAGE_TOKEN || '',
  GRAPH_VERSION: process.env.GRAPH_VERSION || 'v21.0',
  SO_BAI:        +(process.env.SO_BAI || 10),
  PRIVATE_REPLY: process.env.PRIVATE_REPLY !== 'false',
  TRA_LOI_INBOX: process.env.TRA_LOI_INBOX !== 'false',
  MODEL:         process.env.CLAUDE_MODEL  || 'claude-opus-5-5',
};
const GRAPH = `https://graph.facebook.com/${CFG.GRAPH_VERSION}`;
const DRY = process.argv.includes('--dry-run');
const BO_QUA = 'BO_QUA';
const now = () => new Date().toISOString().replace('T',' ').slice(0,19);
const log = (...a) => console.log(now(), ...a);
if (!process.env.ANTHROPIC_API_KEY) { console.error('!! Thiếu ANTHROPIC_API_KEY — đặt qua biến môi trường.'); process.exit(1); }
for (const k of ['PAGE_ID','PAGE_TOKEN']) if (!CFG[k]) { console.error(`!! Thiếu ${k==='PAGE_ID'?'FB_PAGE_ID':'FB_PAGE_TOKEN'} — đặt qua biến môi trường.`); process.exit(1); }

// ---------- Kiến thức bán hàng ----------
function triThuc() {
  const dir = path.join(__dirname, '..', 'tri-thuc');
  if (!fs.existsSync(dir)) return '';
  return fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()
    .map(f => `### ${f}\n${fs.readFileSync(path.join(dir, f), 'utf8')}`).join('\n\n');
}
const SYSTEM = `Bạn là nhân viên chăm sóc khách hàng của Fanpage, trả lời bình luận và tin nhắn bằng tiếng Việt.
Quy tắc:
- Ngắn gọn (1-3 câu), thân thiện, xưng "em" gọi "anh/chị", tự nhiên như người thật, không dùng markdown.
- CHỈ dùng thông tin trong phần KIẾN THỨC bên dưới. Không bịa giá, ưu đãi, cam kết. Không biết thì mời khách để lại số điện thoại/Zalo để tư vấn viên gọi lại.
- Mục tiêu: giải đáp + dẫn khách sang bước tiếp theo (đăng ký / để lại SĐT / nhắn tin).
- Bình luận tiêu cực: xin lỗi, mời nhắn tin riêng để hỗ trợ, không tranh cãi.
- Nếu là spam, quảng cáo của người khác, tag bạn bè, hoặc chỉ là icon/sticker không cần trả lời: trả lời đúng một từ ${BO_QUA}.
Chỉ in ra nội dung câu trả lời, không giải thích.

KIẾN THỨC:
${triThuc() || '(chưa có — hãy điền tri-thuc/san-pham.md)'}`;

// ---------- Claude ----------
const claude = new Anthropic();
async function soanTraLoi(ngu_canh) {
  const res = await claude.beta.messages.create({
    model: CFG.MODEL,
    max_tokens: 2000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',                    // bị từ chối thì server tự chuyển model dự phòng
    output_config: { effort: 'low' },        // trả lời chat ngắn -> effort thấp cho nhanh, rẻ
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: ngu_canh }],
  });
  if (res.stop_reason === 'refusal') return null;
  const txt = res.content.filter(b => b.type === 'text').map(b => b.text).join('').trim();
  return (!txt || txt.includes(BO_QUA)) ? null : txt;
}

// ---------- Facebook ----------
async function fb(pathQs, opt = {}) {
  const sep = pathQs.includes('?') ? '&' : '?';
  const u = opt.body ? `${GRAPH}/${pathQs}` : `${GRAPH}/${pathQs}${sep}access_token=${encodeURIComponent(CFG.PAGE_TOKEN)}`;
  const r = await fetch(u, opt.body ? { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...opt.body, access_token: CFG.PAGE_TOKEN }) } : {});
  const t = await r.text(); let j; try { j = JSON.parse(t) } catch { j = { _raw: t } }
  if (!r.ok || j.error) throw new Error('FB ' + r.status + ': ' + JSON.stringify(j.error || j._raw || j));
  return j;
}

async function xuLyBinhLuan() {
  const posts = (await fb(`${CFG.PAGE_ID}/published_posts?fields=id,message&limit=${CFG.SO_BAI}`)).data || [];
  let tl = 0, bq = 0;
  for (const p of posts) {
    let cmts;
    try { cmts = (await fb(`${p.id}/comments?filter=toplevel&order=reverse_chronological&limit=50&fields=id,message,from,comments.limit(25){from}`)).data || []; }
    catch (e) { log(`  ! không đọc được bình luận ${p.id}: ${String(e.message).slice(0,100)}`); continue; }
    for (const c of cmts) {
      if (!c.message || (c.from && c.from.id === CFG.PAGE_ID)) continue;
      const daTraLoi = ((c.comments && c.comments.data) || []).some(r => r.from && r.from.id === CFG.PAGE_ID);
      if (daTraLoi) continue;
      const ten = (c.from && c.from.name) || 'khách';
      const tra = await soanTraLoi(`Bài viết của Page:\n"""${(p.message || '').slice(0, 1500)}"""\n\nBình luận của ${ten}:\n"""${c.message}"""\n\nViết câu trả lời công khai cho bình luận này.`);
      if (!tra) { bq++; log(`  - bỏ qua: "${c.message.slice(0,60)}"`); continue; }
      log(`  > ${ten}: "${c.message.slice(0,60)}"\n    AI: ${tra}`);
      if (DRY) continue;
      try {
        await fb(`${c.id}/comments`, { body: { message: tra } });
        if (CFG.PRIVATE_REPLY) {
          const nhan = await soanTraLoi(`Khách ${ten} vừa bình luận dưới bài viết: """${c.message}"""\nViết 1 tin nhắn riêng ngắn chào khách, cảm ơn đã quan tâm, và hỏi 1 câu để hiểu nhu cầu.`);
          if (nhan) await fb(`${CFG.PAGE_ID}/messages`, { body: { recipient: { comment_id: c.id }, message: { text: nhan } } })
            .catch(e => log(`    ! nhắn riêng lỗi (đã nhắn trước đó / thiếu quyền): ${String(e.message).slice(0,100)}`));
        }
        tl++;
      } catch (e) { log(`    ✖ lỗi gửi: ${String(e.message).slice(0,160)}`); }
    }
  }
  log(`Bình luận: trả lời ${tl}, bỏ qua ${bq}.`);
}

async function xuLyInbox() {
  const convs = (await fb(`${CFG.PAGE_ID}/conversations?fields=id,updated_time,messages.limit(8){message,from,created_time}&limit=25`)).data || [];
  const han24h = Date.now() - 23.5 * 3600 * 1000;
  let tl = 0;
  for (const cv of convs) {
    const msgs = (cv.messages && cv.messages.data) || [];   // mới nhất đứng đầu
    const cuoi = msgs[0];
    if (!cuoi || !cuoi.from || cuoi.from.id === CFG.PAGE_ID || !cuoi.message) continue;
    if (new Date(cuoi.created_time).getTime() < han24h) continue;   // quá 24h: Messenger không cho nhắn
    const lichSu = msgs.slice().reverse()
      .map(m => `${m.from && m.from.id === CFG.PAGE_ID ? 'Page' : 'Khách'}: ${m.message || '(tệp/ảnh)'}`).join('\n');
    const tra = await soanTraLoi(`Hội thoại Messenger gần đây:\n${lichSu}\n\nViết tin nhắn trả lời tiếp theo của Page.`);
    if (!tra) continue;
    log(`  > inbox ${cuoi.from.name || cuoi.from.id}: "${cuoi.message.slice(0,60)}"\n    AI: ${tra}`);
    if (DRY) continue;
    try { await fb(`${CFG.PAGE_ID}/messages`, { body: { recipient: { id: cuoi.from.id }, messaging_type: 'RESPONSE', message: { text: tra } } }); tl++; }
    catch (e) { log(`    ✖ lỗi gửi: ${String(e.message).slice(0,160)}`); }
  }
  log(`Tin nhắn: trả lời ${tl}.`);
}

(async () => {
  log(`Bắt đầu${DRY ? ' (DRY-RUN, không gửi)' : ''} — page ${CFG.PAGE_ID}`);
  await xuLyBinhLuan();
  if (CFG.TRA_LOI_INBOX) await xuLyInbox();
})().catch(e => { console.error('FATAL', e); process.exit(1); });

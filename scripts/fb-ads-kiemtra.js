#!/usr/bin/env node
/*
 * fb-ads-kiemtra.js — CHỈ ĐỌC. Kiểm tra trước khi tạo chiến dịch quảng cáo:
 *   - token có những quyền gì (ads_management, pages_...)
 *   - tài khoản quảng cáo: trạng thái, tiền tệ, múi giờ, số dư trả trước
 *   - các Trang quản lý được, Trang Mế Nguyệt, danh sách Reel / bài video
 *   - toạ độ để thả ghim (vị trí Trang hoặc tra OpenStreetMap)
 * Không tạo, không sửa, không xoá gì. Không in token ra log.
 */
'use strict';
const V = process.env.GRAPH_VERSION || 'v23.0';
const G = `https://graph.facebook.com/${V}`;
const UT = (process.env.FB_USER_TOKEN || '').trim();
const PT = (process.env.FB_PAGE_TOKEN || '').trim();
const HINT = (process.env.PAGE_HINT || 'nguyệt').toLowerCase();
const PLACE = process.env.PLACE_QUERY || 'Cao Dương, Lương Sơn, Hòa Bình, Việt Nam';

const mask = t => { if (t) console.log('::add-mask::' + t); };
mask(UT); mask(PT);

async function get(path, token, params = {}) {
  const u = new URL(G + path);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  u.searchParams.set('access_token', token);
  try {
    const r = await fetch(u);
    const j = await r.json().catch(() => ({}));
    if (j.error) return { error: { code: j.error.code, sub: j.error.error_subcode, type: j.error.type, msg: String(j.error.message || '').slice(0, 220) } };
    return j;
  } catch (e) { return { error: { msg: String(e.message || e).slice(0, 200) } }; }
}
const show = (label, v) => console.log(label, JSON.stringify(v, null, 1));
const short = s => String(s || '').replace(/\s+/g, ' ').slice(0, 70);

async function inspectPage(id, tok) {
  console.log(`\n--- Trang ${id} ---`);
  show('page:', await get('/' + id, tok, { fields: 'id,name,link,location,fan_count,followers_count,is_published' }));
  const reels = await get('/' + id + '/video_reels', tok, { fields: 'id,created_time,description,permalink_url,status', limit: '100' });
  if (reels.data) {
    console.log(`REELS: ${reels.data.length}`);
    reels.data.forEach((r, i) => console.log(`  R${String(i + 1).padStart(2, '0')} video_id=${r.id} | ${r.created_time} | ${r.status && r.status.video_status} | ${short(r.description)} | ${r.permalink_url || ''}`));
  } else show('video_reels:', reels);
  const posts = await get('/' + id + '/posts', tok, { fields: 'id,created_time,status_type,message,permalink_url,is_eligible_for_promotion', limit: '100' });
  if (posts.data) {
    console.log(`POSTS: ${posts.data.length}`);
    posts.data.forEach(p => console.log(`  post_id=${p.id} | ${p.created_time} | ${p.status_type} | promo=${p.is_eligible_for_promotion} | ${short(p.message)}`));
  } else show('posts:', posts);
}

(async () => {
  console.log(`Graph ${V}. Secret FB_USER_TOKEN: ${UT ? 'CÓ' : 'KHÔNG CÓ'} | FB_PAGE_TOKEN: ${PT ? 'CÓ' : 'KHÔNG CÓ'}`);
  for (const [name, tok] of [['FB_USER_TOKEN', UT], ['FB_PAGE_TOKEN', PT]]) {
    if (!tok) continue;
    console.log(`\n================ ${name} ================`);
    const me = await get('/me', tok, { fields: 'id,name' });
    show('me:', me);
    const perms = await get('/me/permissions', tok);
    show('quyền đã cấp:', perms.data ? perms.data.filter(p => p.status === 'granted').map(p => p.permission) : perms);
    const acts = await get('/me/adaccounts', tok, { fields: 'id,name,account_status,disable_reason,currency,timezone_name,amount_spent,balance,spend_cap,is_prepay_account,funding_source_details', limit: '50' });
    show('tài khoản quảng cáo:', acts.data || acts);
    const pages = await get('/me/accounts', tok, { fields: 'id,name,tasks,access_token', limit: '100' });
    if (pages.data) {
      pages.data.forEach(p => mask(p.access_token));
      show('trang quản lý:', pages.data.map(p => ({ id: p.id, name: p.name, tasks: p.tasks })));
      const pg = pages.data.find(p => (p.name || '').toLowerCase().includes(HINT));
      if (pg) await inspectPage(pg.id, pg.access_token || tok);
      else console.log(`Không thấy Trang nào có chữ "${HINT}" trong tên.`);
    } else if (me && me.name && me.name.toLowerCase().includes(HINT)) {
      await inspectPage(me.id, tok); // token này là page token của Mế Nguyệt
    } else show('trang quản lý:', pages);
  }

  console.log('\n================ Toạ độ (OpenStreetMap) ================');
  try {
    const u = 'https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=vn&q=' + encodeURIComponent(PLACE);
    const r = await fetch(u, { headers: { 'User-Agent': 'mentor-club-auto-ads-check/1.0' } });
    const j = await r.json();
    j.forEach(x => console.log(`  ${x.lat}, ${x.lon} | ${x.display_name}`));
    if (!j.length) console.log('  (không tìm thấy)');
  } catch (e) { console.log('  lỗi tra toạ độ:', String(e.message || e).slice(0, 120)); }
})().catch(e => { console.error('FATAL', String(e.message || e).slice(0, 300)); process.exit(1); });

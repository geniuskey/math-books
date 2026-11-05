// Render the 1200×630 share images: og.png (shelf home) and linear/og.png (LinearBook).
// Usage: node tools/og.mjs   (rerun after books, chapters or simulators change). Needs Playwright.
// Covers use the same shelf.css and covers.js as the home page; stats are counted like shared/js/shelf.js.
import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8');
const window = {};
new Function('window', read('catalog.js'))(window);
const books = window.MATH_BOOKS;
const live = books.filter((b) => b.status !== 'planned');
const chapters = live.reduce((n, b) => n + (b.chapters || 0), 0);
const simulators = Math.floor(live.reduce((n, b) => n + (b.simulators || 0), 0) / 50) * 50;
const titles = { mathbook: '공학 수학', linearbook: '선형대수', 'probability-statistics': '확률과 통계', calculusbook: '미적분', odebook: '미분방정식', numericalbook: '수치해석' };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const base = `
  html, body { margin:0; width:1200px; height:630px; overflow:hidden; }
  body { position:relative; color:#e6ebf5; font-family:var(--font); word-break:keep-all;
    background: radial-gradient(ellipse 70% 90% at 78% 45%, #1c2146 0%, transparent 70%), linear-gradient(160deg, #11152c, #0a0c17); }
  body::before { content:""; position:absolute; inset:0; opacity:.5;
    background-image:linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px); background-size:40px 40px; }
  .left { position:absolute; left:62px; top:70px; width:470px; }
  .brand { display:flex; align-items:center; gap:16px; font-size:29px; font-weight:800; letter-spacing:-.02em; }
  .brand svg { width:48px; height:48px; }
  .eyebrow { margin-top:48px; color:#b197fc; font:600 13px var(--mono); letter-spacing:.2em; }
  h1 { margin:16px 0 0; font-size:46px; line-height:1.3; font-weight:800; letter-spacing:-.04em; }
  h1 .soft { color:#a9c4ec; } h1 .warm { color:#b197fc; }
  .lead { margin:22px 0 0; color:#aeb8cc; font-size:17px; line-height:1.65; }
  .stats { display:flex; gap:22px; margin-top:26px; color:#aeb8cc; font-size:14px; }
  .stats b { margin-right:5px; color:#fff; font:700 21px var(--mono); }
  .url { position:absolute; left:62px; bottom:62px; color:#b197fc; font:600 15px var(--mono); }`;

const shelfCovers = books.map((b) => `<div class="book${b.status === 'planned' ? ' planned' : ''}"><div class="book-stand"><div class="book-cover" style="--c:${b.color}">
    <strong>${esc(titles[b.id] || b.title)}</strong><span class="book-art" data-motif="${esc(b.motif)}"></span><span class="book-foot"></span>
  </div></div></div>`).join('');

const shelf = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${read('shelf.css')}</style><style>${base}
  .case { --gap:34px; position:absolute; left:640px; top:70px; width:470px; display:grid; grid-template-columns:repeat(3,1fr); column-gap:var(--gap); row-gap:34px; }
  .book.planned .book-cover { filter:saturate(.55) brightness(.8); }
  .book-cover { padding:12% 9% 9% 13%; }
  .book-cover strong { margin-top:0; font-size:15px; white-space:nowrap; letter-spacing:-.05em; }
  .book-art { margin:6% 0 8%; }
  .book-foot { padding-top:0; }
</style></head><body>
  <div class="left">
    <div class="brand">${read('favicon.svg')}<span>MathBooks</span></div>
    <div class="eyebrow">INTERACTIVE MATH TEXTBOOKS</div>
    <h1>정의를 외우기 전에,<br><span class="soft">직접 끌고 바꿔 보며</span><br><span class="warm">배우는 수학</span></h1>
    <p class="lead">공학 수학 입문, 선형대수, 확률과 통계에서<br>미적분·미분방정식·수치해석까지 한 서가에서.</p>
    <div class="stats"><span><b>${live.length}</b>권 공개</span><span><b>${chapters}</b>개 장</span><span><b>${simulators.toLocaleString('ko-KR')}+</b>시뮬레이터</span></div>
  </div>
  <div class="url">math.euiyun.com</div>
  <div class="case">${shelfCovers}</div>
</body></html>`;

// LinearBook: a unit grid and its image under a shear-rotation, with the two eigen-directions of a symmetric matrix.
const grid = (() => {
  const A = [[1.25, 0.55], [0.35, 1.05]], u = 34, cx = 300, cy = 300;
  const P = (x, y) => [cx + u * (A[0][0] * x + A[0][1] * y), cy - u * (A[1][0] * x + A[1][1] * y)];
  let s = '';
  for (let k = -8; k <= 8; k++) {
    const [a, b] = P(k, -8), [c, d] = P(k, 8), [e, f] = P(-8, k), [g, h] = P(8, k);
    s += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#b197fc" stroke-opacity="${k ? 0.28 : 0.8}" stroke-width="${k ? 1.2 : 2}"/>`;
    s += `<line x1="${e}" y1="${f}" x2="${g}" y2="${h}" stroke="#3bc9db" stroke-opacity="${k ? 0.28 : 0.8}" stroke-width="${k ? 1.2 : 2}"/>`;
  }
  const sq = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => P(x, y).join(',')).join(' ');
  const [ix, iy] = P(1, 0), [jx, jy] = P(0, 1);
  s += `<polygon points="${sq}" fill="#b197fc" fill-opacity=".3" stroke="#b197fc" stroke-width="2"/>`;
  s += `<line x1="${cx}" y1="${cy}" x2="${ix}" y2="${iy}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${ix}" cy="${iy}" r="8" fill="#b197fc"/>`;
  s += `<line x1="${cx}" y1="${cy}" x2="${jx}" y2="${jy}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${jx}" cy="${jy}" r="8" fill="#3bc9db"/>`;

  return `<svg viewBox="0 0 600 600" width="600" height="600"><defs><clipPath id="c"><rect x="20" y="20" width="560" height="560" rx="28"/></clipPath></defs><rect x="20" y="20" width="560" height="560" rx="28" fill="#0f1228" stroke="#2a2f55"/><g clip-path="url(#c)">${s}</g></svg>`;
})();
const linear = books.find((b) => b.id === 'linearbook');
const linearPage = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${read('shelf.css')}</style><style>${base}
  .art { position:absolute; right:40px; top:15px; }
</style></head><body>
  <div class="left">
    <div class="brand">${read('linear/favicon.svg')}<span>LinearBook</span></div>
    <div class="eyebrow">INTERACTIVE LINEAR ALGEBRA</div>
    <h1>숫자의 표가 아니라<br><span class="soft">공간을 움직이는</span><br><span class="warm">기계, 행렬</span></h1>
    <p class="lead">소거와 LU, 부분공간, 최소제곱,<br>고유값과 SVD를 직접 끌며 익히는 선형대수.</p>
    <div class="stats"><span><b>5</b>부</span><span><b>16</b>개 장</span><span><b>${linear.chapters}</b>장 공개</span></div>
  </div>
  <div class="url">math.euiyun.com/linear/</div>
  <div class="art">${grid}</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [html, out] of [[shelf, 'og.png'], [linearPage, 'linear/og.png']]) {
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: read('shared/js/covers.js') });
  await page.evaluate(async () => {
    document.querySelectorAll('[data-motif]').forEach((el) => { el.innerHTML = window.coverArt(el.dataset.motif); });
    await document.fonts.ready;
  });
  await page.screenshot({ path: join(root, out) });
}
await browser.close();
console.log(`og.png: ${live.length} books, ${chapters} chapters, ${simulators}+ simulators; linear/og.png: ${linear.chapters} chapters`);

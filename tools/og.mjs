// Render the 1200×630 share images: og.png (shelf home), linear/og.png (LinearBook), calculus/og.png (CalculusBook), ode/og.png (ODEBook) and numerical/og.png (NumericalBook).
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
    <p class="lead">공학 수학 입문, 선형대수, 미적분, 미분방정식,<br>확률과 통계에서 수치해석까지 한 서가에서.</p>
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
    <div class="stats"><span><b>5</b>부</span><span><b>16</b>개 장</span><span><b>${Math.floor(linear.simulators / 10) * 10}+</b>시뮬레이터</span></div>
  </div>
  <div class="url">math.euiyun.com/linear/</div>
  <div class="art">${grid}</div>
</body></html>`;

// CalculusBook: one curve read with both eyes — Riemann bars filling the area (∫) and a tangent line (f′).
const calc = (() => {
  const u = 1, X = (x) => 60 + x * 480 / 6, Y = (y) => 470 - y * 95;
  const f = (x) => 1.6 + 1.25 * Math.sin(1.05 * x - 0.4) + 0.32 * x;
  let s = '';
  for (let k = 0; k <= 6; k++) s += `<line x1="${X(k)}" y1="60" x2="${X(k)}" y2="${Y(0)}" stroke="#ffffff10"/>`;
  const n = 14, a = 0.6, b = 5.4, dx = (b - a) / n;
  for (let i = 0; i < n; i++) { const x = a + i * dx, y = f(x + dx / 2); s += `<rect x="${X(x) + 1.5}" y="${Y(y)}" width="${X(x + dx) - X(x) - 3}" height="${Y(0) - Y(y)}" fill="#f783ac" fill-opacity="${0.16 + 0.025 * i}" stroke="#f783ac" stroke-opacity=".55"/>`; }
  let d = ''; for (let i = 0; i <= 240; i++) { const x = 6 * i / 240; d += (i ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(f(x)).toFixed(1); }
  s += `<path d="${d}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
  const x0 = 3.9, y0 = f(x0), m = (f(x0 + 1e-4) - f(x0 - 1e-4)) / 2e-4;
  s += `<line x1="${X(x0 - 1.6)}" y1="${Y(y0 - 1.6 * m)}" x2="${X(x0 + 1.6)}" y2="${Y(y0 + 1.6 * m)}" stroke="#74c0fc" stroke-width="4" stroke-linecap="round"/>`;
  s += `<circle cx="${X(x0)}" cy="${Y(y0)}" r="10" fill="#74c0fc" stroke="#0f1228" stroke-width="3"/>`;
  s += `<line x1="40" y1="${Y(0)}" x2="560" y2="${Y(0)}" stroke="#ffffff70" stroke-width="2"/>`;
  s += `<text x="${X(1.7)}" y="${Y(0) + 46}" fill="#f783ac" font-family="monospace" font-size="30" font-weight="700">∫ f(x) dx</text>`;
  s += `<text x="${X(x0) + 22}" y="${Y(y0) - 34}" fill="#74c0fc" font-family="monospace" font-size="30" font-weight="700">f′(x)</text>`;
  return `<svg viewBox="0 0 600 600" width="600" height="600"><defs><clipPath id="c"><rect x="20" y="20" width="560" height="560" rx="28"/></clipPath></defs><rect x="20" y="20" width="560" height="560" rx="28" fill="#0f1228" stroke="#2a2f55"/><g clip-path="url(#c)">${s}</g></svg>`;
})();
const calculus = books.find((b) => b.id === 'calculusbook');
const calculusPage = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${read('shelf.css')}</style><style>${base}
  .art { position:absolute; right:40px; top:15px; }
  .eyebrow, .url, h1 .warm { color:#f783ac; } h1 .soft { color:#a5d8ff; }
</style></head><body>
  <div class="left">
    <div class="brand">${read('calculus/favicon.svg')}<span>CalculusBook</span></div>
    <div class="eyebrow">INTERACTIVE CALCULUS</div>
    <h1>변화율과 누적,<br><span class="soft">두 개의 눈으로</span><br><span class="warm">보는 세계</span></h1>
    <p class="lead">극한과 미분, 적분과 급수, 다변수와<br>벡터 미적분을 직접 끌며 익히는 미적분.</p>
    <div class="stats"><span><b>5</b>부</span><span><b>16</b>개 장</span><span><b>${Math.floor(calculus.simulators / 10) * 10}+</b>시뮬레이터</span></div>
  </div>
  <div class="url">math.euiyun.com/calculus/</div>
  <div class="art">${calc}</div>
</body></html>`;

// ODEBook: a direction field with solution curves spiralling into a stable focus (damped oscillator x′ = y, y′ = −x − 0.35y).
const odeArt = (() => {
  const cx = 300, cy = 300, k = 62, f = (x, y) => [y, -x - 0.35 * y];
  let s = '';
  for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) {
    const x = i * 0.95, y = j * 0.95, [dx, dy] = f(x, y), n = Math.hypot(dx, dy) || 1, L = 15;
    const px = cx + x * k, py = cy - y * k, ux = dx / n * L, uy = -dy / n * L;
    s += `<line x1="${(px - ux).toFixed(1)}" y1="${(py - uy).toFixed(1)}" x2="${(px + ux).toFixed(1)}" y2="${(py + uy).toFixed(1)}" stroke="#ffffff38" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  const orbit = (x0, y0, color, w) => {
    let x = x0, y = y0, d = `M${(cx + x * k).toFixed(1)} ${(cy - y * k).toFixed(1)}`; const h = 0.02;
    for (let n = 0; n < 1400; n++) {
      const a = f(x, y), b = f(x + h / 2 * a[0], y + h / 2 * a[1]), c = f(x + h / 2 * b[0], y + h / 2 * b[1]), e = f(x + h * c[0], y + h * c[1]);
      x += h / 6 * (a[0] + 2 * b[0] + 2 * c[0] + e[0]); y += h / 6 * (a[1] + 2 * b[1] + 2 * c[1] + e[1]);
      if (n % 2) d += `L${(cx + x * k).toFixed(1)} ${(cy - y * k).toFixed(1)}`;
    }
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${cx + x0 * k}" cy="${cy - y0 * k}" r="9" fill="${color}" stroke="#0f1228" stroke-width="3"/>`;
  };
  s += orbit(-3.6, 2.4, '#ffa94d', 4) + orbit(3.4, -1.2, '#66d9e8', 3.2) + orbit(0.6, 3.9, '#ffffffb0', 2.4);
  s += `<circle cx="${cx}" cy="${cy}" r="7" fill="#fff"/>`;
  s += `<text x="44" y="556" fill="#ffa94d" font-family="monospace" font-size="30" font-weight="700">x″ + 0.35x′ + x = 0</text>`;
  return `<svg viewBox="0 0 600 600" width="600" height="600"><defs><clipPath id="c"><rect x="20" y="20" width="560" height="560" rx="28"/></clipPath></defs><rect x="20" y="20" width="560" height="560" rx="28" fill="#0f1228" stroke="#2a2f55"/><g clip-path="url(#c)">${s}</g></svg>`;
})();
const ode = books.find((b) => b.id === 'odebook');
const odePage = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${read('shelf.css')}</style><style>${base}
  .art { position:absolute; right:40px; top:15px; }
  .eyebrow, .url, h1 .warm { color:#ffa94d; } h1 .soft { color:#99e9f2; }
</style></head><body>
  <div class="left">
    <div class="brand">${read('ode/favicon.svg')}<span>ODEBook</span></div>
    <div class="eyebrow">INTERACTIVE DIFFERENTIAL EQUATIONS</div>
    <h1>변화의 법칙에서<br><span class="soft">미래를</span><br><span class="warm">계산한다</span></h1>
    <p class="lead">방향장과 진동, 라플라스 변환, 위상 평면과<br>혼돈을 직접 시뮬레이션하며 익히는 미분방정식.</p>
    <div class="stats"><span><b>5</b>부</span><span><b>16</b>개 장</span><span><b>${Math.floor(ode.simulators / 10) * 10}+</b>시뮬레이터</span></div>
  </div>
  <div class="url">math.euiyun.com/ode/</div>
  <div class="art">${odeArt}</div>
</body></html>`;

// NumericalBook: Newton's method on f(x) = x³ − 2x − 2 — tangent steps falling onto the root, with the error halving its digits each step.
const numArt = (() => {
  const X = (x) => 60 + (x + 0.4) * 480 / 3.6, Y = (y) => 300 - y * 11;
  const f = (x) => x * x * x - 2 * x - 2, df = (x) => 3 * x * x - 2;
  let s = '';
  for (let k = 0; k <= 6; k++) s += `<line x1="${X(-0.2 + k * 0.5)}" y1="50" x2="${X(-0.2 + k * 0.5)}" y2="360" stroke="#ffffff10"/>`;
  s += `<line x1="40" y1="${Y(0)}" x2="560" y2="${Y(0)}" stroke="#ffffff70" stroke-width="2"/>`;
  let d = ''; for (let i = 0; i <= 240; i++) { const x = -0.4 + 3.6 * i / 240; d += (i ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(f(x)).toFixed(1); }
  s += `<path d="${d}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
  let x = 3.0; const errs = [];
  for (let n = 0; n < 4; n++) {
    const y = f(x), x1 = x - y / df(x);
    s += `<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(y)}" stroke="#e599f7" stroke-width="2" stroke-dasharray="6 6" opacity=".8"/>`;
    s += `<line x1="${X(x)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(0)}" stroke="#8ce99a" stroke-width="3.5" stroke-linecap="round"/>`;
    s += `<circle cx="${X(x)}" cy="${Y(y)}" r="8" fill="#8ce99a" stroke="#0f1228" stroke-width="3"/>`;
    x = x1;
  }
  s += `<circle cx="${X(x)}" cy="${Y(0)}" r="9" fill="#fff" stroke="#0f1228" stroke-width="3"/>`;
  s += `<text x="44" y="404" fill="#8ce99a" font-family="monospace" font-size="27" font-weight="700">xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)</text>`;
  const r = 1.7692923542386314; let z = 3.0, row = 450;
  for (let n = 0; n < 4; n++) { s += `<text x="44" y="${row}" fill="#ffffffb0" font-family="monospace" font-size="21">x${'₀₁₂₃'[n]} = ${z.toFixed(12)}   |e| = ${Math.abs(z - r).toExponential(1)}</text>`; z = z - f(z) / df(z); row += 32; }
  return `<svg viewBox="0 0 600 600" width="600" height="600"><defs><clipPath id="c"><rect x="20" y="20" width="560" height="560" rx="28"/></clipPath></defs><rect x="20" y="20" width="560" height="560" rx="28" fill="#0f1228" stroke="#2a2f55"/><g clip-path="url(#c)">${s}</g></svg>`;
})();
const numerical = books.find((b) => b.id === 'numericalbook');
const numericalPage = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${read('shelf.css')}</style><style>${base}
  .art { position:absolute; right:40px; top:15px; }
  .eyebrow, .url, h1 .warm { color:#8ce99a; } h1 .soft { color:#e599f7; }
</style></head><body>
  <div class="left">
    <div class="brand">${read('numerical/favicon.svg')}<span>NumericalBook</span></div>
    <div class="eyebrow">INTERACTIVE NUMERICAL ANALYSIS</div>
    <h1>컴퓨터가<br><span class="soft">수학을 근사하는</span><br><span class="warm">방법</span></h1>
    <p class="lead">오차와 근 찾기, 보간과 FFT, 수치 미적분,<br>선형대수와 최적화를 한 단계씩 돌려 보는 수치해석.</p>
    <div class="stats"><span><b>5</b>부</span><span><b>16</b>개 장</span><span><b>${Math.floor(numerical.simulators / 10) * 10}+</b>시뮬레이터</span></div>
  </div>
  <div class="url">math.euiyun.com/numerical/</div>
  <div class="art">${numArt}</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [html, out] of [[shelf, 'og.png'], [linearPage, 'linear/og.png'], [calculusPage, 'calculus/og.png'], [odePage, 'ode/og.png'], [numericalPage, 'numerical/og.png']]) {
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: read('shared/js/covers.js') });
  await page.evaluate(async () => {
    document.querySelectorAll('[data-motif]').forEach((el) => { el.innerHTML = window.coverArt(el.dataset.motif); });
    await document.fonts.ready;
  });
  await page.screenshot({ path: join(root, out) });
}
await browser.close();
console.log(`og.png: ${live.length} books, ${chapters} chapters, ${simulators}+ simulators; linear/og.png: ${linear.simulators} simulators; calculus/og.png: ${calculus.simulators} simulators; ode/og.png: ${ode.simulators} simulators; numerical/og.png: ${numerical.simulators} simulators`);

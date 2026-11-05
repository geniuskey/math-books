/* ==========================================================================
   SciBook Engine — science.euiyun.com 공통 교과서 엔진 (전역 객체 SB)
   --------------------------------------------------------------------------
   과목과 무관한 기능만 담는다. 과목 내용(목차·색·챕터)은 각 과목 폴더의
   course.js(= course.json에서 생성)가 SB.registerCourse(...)로 넘겨준다.

   - 레이아웃: 상단바, 챕터 서랍(부 단위), 우측 목차, 이전/다음, 푸터, 테마, 검색
   - 교과서 컴포넌트: 절·예제·그림 자동 번호, 자동 채점 연습문제, 무작위 드릴,
     개념 퀴즈, 학습 진도 저장(localStorage)
   - 시뮬레이터 헬퍼: canvas, chart, loop, range, seg, stat, three.js 씬
   - KaTeX(+mhchem \ce{})를 엔진이 직접 불러와 렌더한다.

   이 파일은 <head>에서 defer 없이 로드한다. 페이지 스크립트는 </body> 직전에 둔다.
   ES module을 쓰지 않는다(file://에서도 열리도록).
   ========================================================================== */
(function () {
  "use strict";

  const VERSION = "2.0.0";
  const KATEX = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/";
  const SB = (window.SB = {});
  SB.version = VERSION;
  SB.hooks = [];   // 레이아웃 생성 직후 호출: (root, slug) => {}

  /* 엔진 위치(…/engine/)와 플랫폼 루트(…/)를 이 스크립트의 src에서 알아낸다. */
  const me = document.currentScript && document.currentScript.src;
  SB.engineBase = me ? me.replace(/js\/scibook\.js(\?.*)?$/, "") : "../engine/";
  SB.siteBase = SB.engineBase.replace(/engine\/$/, "");
  SB.SITE = { name: "MathBooks", ko: "인터랙티브 수학 교과서", url: "https://math.euiyun.com/", repo: "https://github.com/geniuskey/math-books", hub: "https://books.euiyun.com/" };

  /* ------------------------------------------------------------ course registry */
  SB.course = null;
  SB.catalog = null;
  /** 과목 매니페스트 등록. course.js(생성 파일)가 호출한다. */
  SB.registerCourse = function (c) {
    SB.course = c;
    c.chapters = [];
    (c.parts || []).forEach((p) => p.chapters.forEach((ch) => { ch.part = p.title; c.chapters.push(ch); }));
    if (c.accent) applyAccent(c.accent);
  };
  /** 플랫폼 과목 목록 등록. catalog.js(생성 파일)가 호출한다. */
  SB.registerCatalog = function (cat) { SB.catalog = cat; };

  function hexA(hex, a) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return hex;
    const n = parseInt(m[1], 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
  }
  function applyAccent(ac) {
    const light = (ac.light ? `--accent:${ac.light};--accent-soft:${hexA(ac.light, 0.12)};` : "") + (ac.light2 ? `--accent-2:${ac.light2};--accent-2-soft:${hexA(ac.light2, 0.12)};` : "");
    const dark = (ac.dark ? `--accent:${ac.dark};--accent-soft:${hexA(ac.dark, 0.14)};` : "") + (ac.dark2 ? `--accent-2:${ac.dark2};--accent-2-soft:${hexA(ac.dark2, 0.14)};` : "");
    const st = document.createElement("style");
    st.id = "sb-accent";
    st.textContent = `:root{${light}}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${dark}}}:root[data-theme="dark"]{${dark}}`;
    document.head.appendChild(st);
  }

  /* ------------------------------------------------------------ progress store */
  /** 과목별 학습 기록: { solved:{id:1}, quiz:{id:0|1}, visited:{slug:ts} } */
  SB.store = {
    key() { return "scibook:" + (SB.course ? SB.course.id : "site"); },
    load() { try { return JSON.parse(localStorage.getItem(this.key())) || {}; } catch (e) { return {}; } },
    save(d) { try { localStorage.setItem(this.key(), JSON.stringify(d)); } catch (e) {} },
    mark(kind, id, val) { const d = this.load(); (d[kind] = d[kind] || {})[id] = val; this.save(d); },
    get(kind, id) { const d = this.load(); return d[kind] ? d[kind][id] : undefined; },
    count(kind, prefix) { const d = this.load()[kind] || {}; return Object.keys(d).filter((k) => d[k] && (!prefix || k.indexOf(prefix + ":") === 0)).length; },
  };

  /* ------------------------------------------------------------ math utils */
  SB.clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  SB.lerp = (a, b, t) => a + (b - a) * t;
  SB.map = (x, a, b, c, d) => c + ((x - a) * (d - c)) / (b - a);
  SB.randn = function () {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  SB.poisson = function (lambda) {
    if (lambda <= 0) return 0;
    if (lambda > 40) return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * SB.randn()));
    const L = Math.exp(-lambda);
    let k = 0, p = 1;
    do { k++; p *= Math.random(); } while (p > L);
    return k - 1;
  };
  /** 숫자 포맷: 유효 자리 */
  SB.fmt = function (x, digits = 3) {
    if (!isFinite(x)) return "—";
    if (x === 0) return "0";
    const a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) return x.toExponential(digits - 1).replace("e+", "e");
    return Number(x.toPrecision(digits)).toLocaleString("en-US", { maximumFractionDigits: 6 });
  };
  /** SI 접두사 포맷: SB.si(2.3e-9,'m') → "2.3 nm" */
  SB.si = function (x, unit = "", digits = 3) {
    if (!isFinite(x)) return "—";
    if (x === 0) return "0 " + unit;
    const pre = [[1e12, "T"], [1e9, "G"], [1e6, "M"], [1e3, "k"], [1, ""], [1e-3, "m"], [1e-6, "µ"], [1e-9, "n"], [1e-12, "p"], [1e-15, "f"]];
    const a = Math.abs(x);
    for (const [v, p] of pre) if (a >= v * 0.9995) return Number((x / v).toPrecision(digits)) + " " + p + unit;
    return x.toExponential(digits - 1) + " " + unit;
  };

  /* ------------------------------------------------------------ physics consts (CODATA 2018 정확값/권장값) */
  SB.C = { h: 6.62607015e-34, c: 2.99792458e8, q: 1.602176634e-19, k: 1.380649e-23, NA: 6.02214076e23, R: 8.314462618, me: 9.1093837015e-31, eps0: 8.8541878128e-12, g: 9.80665 };

  /** 파장(nm) → [r,g,b] 0..255 (가시광 380~780, 밖은 어두운 색) */
  SB.wl2rgbArr = function (nm) {
    let r = 0, g = 0, b = 0;
    if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
    else if (nm < 490 && nm >= 440) { g = (nm - 440) / 50; b = 1; }
    else if (nm < 510 && nm >= 490) { g = 1; b = -(nm - 510) / 20; }
    else if (nm < 580 && nm >= 510) { r = (nm - 510) / 70; g = 1; }
    else if (nm < 645 && nm >= 580) { r = 1; g = -(nm - 645) / 65; }
    else if (nm <= 780 && nm >= 645) { r = 1; }
    let f = 0;
    if (nm >= 380 && nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
    else if (nm >= 420 && nm <= 700) f = 1;
    else if (nm > 700 && nm <= 780) f = 0.3 + (0.7 * (780 - nm)) / 80;
    const gm = 0.8;
    const c = (v) => Math.round(255 * Math.pow(v * f, gm));
    if (nm < 380) return [110, 60, 160];   // UV: 보라 계열 표시용
    if (nm > 780) return [120, 30, 30];    // IR: 어두운 적색 표시용
    return [c(r), c(g), c(b)];
  };
  SB.wl2rgb = function (nm, alpha = 1) {
    const [r, g, b] = SB.wl2rgbArr(nm);
    return alpha === 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
  };

  /* ------------------------------------------------------------ theme */
  const themeCbs = [];
  SB.onTheme = (cb) => themeCbs.push(cb);
  SB.isDark = function () {
    const t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  /** CSS 변수 값 읽기: SB.color('accent') */
  SB.color = function (name) {
    return getComputedStyle(document.documentElement).getPropertyValue("--" + name).trim();
  };
  /** 자주 쓰는 색 묶음 (테마 변경 시 다시 호출할 것) */
  SB.palette = function () {
    const c = SB.color;
    return {
      bg: c("canvas-bg"), text: c("text"), dim: c("text-dim"), faint: c("text-faint"),
      grid: c("grid"), axis: c("axis"), border: c("border"), surface: c("surface"),
      accent: c("accent"), accent2: c("accent-2"), ok: c("ok"), warn: c("warn"), bad: c("bad"),
      red: c("red"), green: c("green"), blue: c("blue"),
      // 데이터 시리즈용 기본 순서
      series: [c("accent"), c("accent-2"), c("warn"), c("ok"), c("bad"), c("text-dim")],
    };
  };
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
    themeCbs.forEach((cb) => { try { cb(); } catch (e) { console.error(e); } });
  }
  try { const saved = localStorage.getItem("math-theme"); if (saved) document.documentElement.setAttribute("data-theme", saved); } catch (e) {}
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
      if (!document.documentElement.getAttribute("data-theme")) applyTheme(null);
    });
  }

  /* ------------------------------------------------------------ canvas helper */
  /**
   * HiDPI 캔버스. 폭은 부모 폭을 따르고 높이는 aspect(높이/폭) 또는 height(px)로 결정.
   * draw(ctx, w, h)는 리사이즈·테마 변경 시 자동 호출된다. 애니메이션이면 직접 redraw() 호출.
   *   const cv = SB.canvas(el, (ctx,w,h)=>{...}, {aspect:0.5, maxHeight: 420});
   *   cv.redraw(); cv.ctx; cv.w; cv.h
   */
  SB.canvas = function (canvas, draw, opts = {}) {
    if (typeof canvas === "string") canvas = document.getElementById(canvas) || document.querySelector(canvas);
    const ctx = canvas.getContext("2d");
    const st = { ctx, w: 0, h: 0, canvas, dpr: 1 };
    function resize() {
      const parent = canvas.parentElement;
      const w = Math.max(200, Math.floor(opts.width || parent.clientWidth || 600));
      let h = opts.height || Math.round(w * (opts.aspect || 0.5));
      if (opts.minHeight) h = Math.max(h, opts.minHeight);
      if (opts.maxHeight) h = Math.min(h, opts.maxHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      st.w = w; st.h = h; st.dpr = dpr;
      st.redraw();
    }
    st.redraw = function () {
      if (!st.w) return;
      ctx.save();
      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
      if (!opts.noClear) {
        ctx.clearRect(0, 0, st.w, st.h);
        ctx.fillStyle = SB.color("canvas-bg");
        ctx.fillRect(0, 0, st.w, st.h);
      }
      try { draw && draw(ctx, st.w, st.h, st); } finally { ctx.restore(); }
    };
    st.resize = resize;
    if (window.ResizeObserver) {
      let lastW = -1;
      new ResizeObserver(() => { const w = canvas.parentElement.clientWidth; if (w !== lastW) { lastW = w; resize(); } }).observe(canvas.parentElement);
    } else window.addEventListener("resize", resize);
    SB.onTheme(() => st.redraw());
    resize();
    return st;
  };

  /**
   * 화면에 보일 때만 도는 애니메이션 루프. fn(dt초, t초)
   *   const loop = SB.loop(el, (dt,t)=>{...}); loop.stop(); loop.start();
   */
  SB.loop = function (el, fn) {
    if (typeof el === "string") el = document.getElementById(el) || document.querySelector(el);
    let raf = 0, last = 0, t = 0, visible = true, running = true;
    function frame(ts) {
      raf = 0;
      if (!running || !visible) return;
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts; t += dt;
      fn(dt, t);
      raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf && running && visible) { last = 0; raf = requestAnimationFrame(frame); } }
    if (window.IntersectionObserver && el) {
      const io = new IntersectionObserver((es) => { visible = es[es.length - 1].isIntersecting; kick(); });
      io.observe(el);
      // 엔진이 레이아웃을 만들며 본문을 옮기면 관찰 상태가 '안 보임'에 머물 수 있다 → 레이아웃 후 다시 관찰
      (SB._observers = SB._observers || []).push([io, el]);
    }
    kick();
    return {
      start() { running = true; kick(); },
      stop() { running = false; },
      get running() { return running; },
      toggle() { running ? (running = false) : ((running = true), kick()); return running; },
    };
  };

  /* ------------------------------------------------------------ chart helper */
  /**
   * 간단한 선 그래프. box = {x,y,w,h}(생략 시 캔버스 전체에 여백 자동)
   * opts: { x:[min,max], y:[min,max], logX, logY, xLabel, yLabel, xTicks, yTicks,
   *         xFmt, yFmt, series:[{data:[[x,y],...], color, width, dash, fill, label}],
   *         vlines:[{x,color,label,dash,row}] (row: 라벨 줄 번호, 겹침 방지), hlines:[{y,color,label,dash}], points:[{x,y,color,r,label}],
   *         bands:[{x0,x1,color}], hbands:[{y0,y1,color}] }
   * 반환: { X(v)->px, Y(v)->px, box }
   */
  SB.chart = function (ctx, box, opts) {
    const P = SB.palette();
    const dpr = (ctx.getTransform && ctx.getTransform().a) || 1;
    const W = ctx.canvas.width / dpr, H = ctx.canvas.height / dpr;
    if (!box) box = { x: 58, y: 16, w: W - 58 - 18, h: H - 16 - 46 };
    const [x0, x1] = opts.x, [y0, y1] = opts.y;
    const lx = (v) => (opts.logX ? Math.log10(v) : v);
    const ly = (v) => (opts.logY ? Math.log10(v) : v);
    const X = (v) => box.x + ((lx(v) - lx(x0)) / (lx(x1) - lx(x0))) * box.w;
    const Y = (v) => box.y + box.h - ((ly(v) - ly(y0)) / (ly(y1) - ly(y0))) * box.h;
    const ticks = (a, b, log, n) => {
      if (log) { const out = []; for (let e = Math.ceil(Math.log10(a) - 1e-9); e <= Math.log10(b) + 1e-9; e++) out.push(Math.pow(10, e)); return out; }
      const span = b - a, raw = span / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(raw)));
      const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= (n || 5) + 0.5) || raw;
      const out = []; for (let v = Math.ceil(a / step - 1e-9) * step; v <= b + step * 1e-6; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
      return out;
    };
    const defFmt = (v) => (Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-2 && v !== 0) ? v.toExponential(0).replace("e+", "e") : String(Number(v.toPrecision(4))));
    const xFmt = opts.xFmt || defFmt, yFmt = opts.yFmt || defFmt;
    ctx.save();
    ctx.font = "11px " + getComputedStyle(document.body).getPropertyValue("--mono");
    ctx.lineWidth = 1;
    // bands
    (opts.bands || []).forEach((b) => { ctx.fillStyle = b.color; ctx.fillRect(X(b.x0), box.y, X(b.x1) - X(b.x0), box.h); });
    (opts.hbands || []).forEach((b) => { ctx.fillStyle = b.color; const a = Y(b.y0), c = Y(b.y1); ctx.fillRect(box.x, Math.min(a, c), box.w, Math.abs(a - c)); });
    // grid + ticks
    const xt = opts.xTicks || ticks(x0, x1, opts.logX, 6);
    const yt = opts.yTicks || ticks(y0, y1, opts.logY, 5);
    ctx.strokeStyle = P.grid; ctx.fillStyle = P.dim;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    xt.forEach((v) => { const px = X(v); if (px < box.x - 1 || px > box.x + box.w + 1) return; ctx.beginPath(); ctx.moveTo(px, box.y); ctx.lineTo(px, box.y + box.h); ctx.stroke(); ctx.fillText(xFmt(v), px, box.y + box.h + 6); });
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    yt.forEach((v) => { const py = Y(v); if (py < box.y - 1 || py > box.y + box.h + 1) return; ctx.beginPath(); ctx.moveTo(box.x, py); ctx.lineTo(box.x + box.w, py); ctx.stroke(); ctx.fillText(yFmt(v), box.x - 6, py); });
    ctx.strokeStyle = P.axis;
    ctx.beginPath(); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.stroke();
    // labels
    ctx.fillStyle = P.dim; ctx.font = "12px " + getComputedStyle(document.body).getPropertyValue("--font");
    if (opts.xLabel) { ctx.textAlign = "center"; ctx.textBaseline = "bottom"; ctx.fillText(opts.xLabel, box.x + box.w / 2, box.y + box.h + 40); }
    if (opts.yLabel) { ctx.save(); ctx.translate(Math.max(14, box.x - 44), box.y + box.h / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(opts.yLabel, 0, 0); ctx.restore(); }
    // clip plot area
    ctx.save(); ctx.beginPath(); ctx.rect(box.x, box.y - 2, box.w + 2, box.h + 4); ctx.clip();
    (opts.series || []).forEach((s, i) => {
      if (!s.data || !s.data.length) return;
      ctx.strokeStyle = s.color || P.series[i % P.series.length];
      ctx.lineWidth = s.width || 2; ctx.setLineDash(s.dash || []);
      ctx.beginPath();
      let started = false;
      s.data.forEach(([x, y]) => { if (!isFinite(y) || (opts.logY && y <= 0) || (opts.logX && x <= 0)) { started = false; return; } const px = X(x), py = Y(y); started ? ctx.lineTo(px, py) : ctx.moveTo(px, py); started = true; });
      ctx.stroke();
      if (s.fill) {
        ctx.lineTo(X(s.data[s.data.length - 1][0]), Y(opts.logY ? y0 : Math.max(y0, 0)));
        ctx.lineTo(X(s.data[0][0]), Y(opts.logY ? y0 : Math.max(y0, 0)));
        ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill();
      }
      ctx.setLineDash([]);
    });
    (opts.vlines || []).forEach((l) => { ctx.strokeStyle = l.color || P.faint; ctx.setLineDash(l.dash || [4, 4]); ctx.lineWidth = l.width || 1.2; ctx.beginPath(); ctx.moveTo(X(l.x), box.y); ctx.lineTo(X(l.x), box.y + box.h); ctx.stroke(); ctx.setLineDash([]); if (l.label) { ctx.fillStyle = l.color || P.dim; ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillText(l.label, X(l.x) + 4, box.y + 4 + (l.row || 0) * 14); } });
    (opts.hlines || []).forEach((l) => { ctx.strokeStyle = l.color || P.faint; ctx.setLineDash(l.dash || [4, 4]); ctx.lineWidth = l.width || 1.2; ctx.beginPath(); ctx.moveTo(box.x, Y(l.y)); ctx.lineTo(box.x + box.w, Y(l.y)); ctx.stroke(); ctx.setLineDash([]); if (l.label) { ctx.fillStyle = l.color || P.dim; ctx.textAlign = "right"; ctx.textBaseline = "bottom"; ctx.fillText(l.label, box.x + box.w - 4, Y(l.y) - 3); } });
    (opts.points || []).forEach((p) => { ctx.fillStyle = p.color || P.accent; ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), p.r || 4, 0, Math.PI * 2); ctx.fill(); if (p.label) { ctx.fillStyle = P.text; ctx.textAlign = "left"; ctx.textBaseline = "bottom"; ctx.fillText(p.label, X(p.x) + 6, Y(p.y) - 4); } });
    ctx.restore();
    ctx.restore();
    return { X, Y, box };
  };

  /* ------------------------------------------------------------ controls */
  /**
   * range 입력 바인딩. output은 id+"-out" 요소 또는 <output for=id>.
   *   const get = SB.range('wl', v => v+' nm', v => redraw());  get() → 현재 값(Number)
   */
  SB.range = function (id, fmt, onInput) {
    const el = typeof id === "string" ? document.getElementById(id) : id;
    const out = document.getElementById(el.id + "-out") || document.querySelector(`output[for="${el.id}"]`);
    const update = (fire) => {
      const v = Number(el.value);
      const pct = ((v - Number(el.min || 0)) / (Number(el.max || 100) - Number(el.min || 0))) * 100;
      el.style.setProperty("--fill", pct + "%");
      if (out) out.textContent = fmt ? fmt(v) : String(v);
      if (fire && onInput) onInput(v);
    };
    el.addEventListener("input", () => update(true));
    update(false);
    const get = () => Number(el.value);
    get.set = (v, silent) => { el.value = v; update(!silent); };   // silent=true: 표시만 갱신, onInput 호출 안 함
    get.el = el;
    return get;
  };
  /**
   * 세그먼트 버튼: <div class="seg" id="mode"><button data-value="a" class="on">A</button>...</div>
   *   const mode = SB.seg('mode', v => redraw());  mode() → 현재 값
   */
  SB.seg = function (id, onChange) {
    const el = typeof id === "string" ? document.getElementById(id) : id;
    const btns = [...el.querySelectorAll("button")];
    let cur = (btns.find((b) => b.classList.contains("on")) || btns[0]).dataset.value;
    const set = (v, fire = true) => {
      cur = v;
      btns.forEach((b) => { const on = b.dataset.value === v; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
      if (fire && onChange) onChange(v);
    };
    btns.forEach((b) => b.addEventListener("click", () => set(b.dataset.value)));
    set(cur, false);
    const get = () => cur;
    get.set = set;
    return get;
  };
  /** 통계 표시: SB.stat('snr', '32.1 dB') → id 요소의 textContent 설정(HTML 허용) */
  SB.stat = function (id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  /* ------------------------------------------------------------ three.js helper */
  /**
   * three.js 씬 준비 (전역 THREE, THREE.OrbitControls 필요).
   *   const T = SB.three(containerEl, { camera:[x,y,z], target:[x,y,z], fov:40, autoRotate:false });
   *   T.scene, T.camera, T.renderer, T.controls, T.THREE
   *   T.onFrame((dt,t)=>{...});   T.label('텍스트', new THREE.Vector3(...)) → HTML 라벨(자동 투영)
   *   T.material(color, opts)  → MeshStandardMaterial 헬퍼
   * 조명(환경광+방향광 2개), 리사이즈, 화면 밖 일시정지, 테마 대응 포함.
   */
  SB.three = function (container, opts = {}) {
    if (typeof container === "string") container = document.getElementById(container) || document.querySelector(container);
    if (!window.THREE) { container.innerHTML = '<p style="padding:20px;color:var(--text-dim)">3D 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인하세요.</p>'; return null; }
    const THREE = window.THREE;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(opts.fov || 40, 1, 0.01, 2000);
    camera.position.set(...(opts.camera || [6, 5, 8]));
    const controls = THREE.OrbitControls ? new THREE.OrbitControls(camera, renderer.domElement) : null;
    if (controls) {
      controls.target.set(...(opts.target || [0, 0, 0]));
      controls.enableDamping = true; controls.dampingFactor = 0.08;
      controls.autoRotate = !!opts.autoRotate; controls.autoRotateSpeed = opts.autoRotateSpeed || 0.8;
      controls.enablePan = opts.pan !== false;
      if (opts.minDistance) controls.minDistance = opts.minDistance;
      if (opts.maxDistance) controls.maxDistance = opts.maxDistance;
      controls.update();
    } else camera.lookAt(...(opts.target || [0, 0, 0]));
    scene.add(new THREE.HemisphereLight(0xffffff, 0x445066, 0.75));
    const d1 = new THREE.DirectionalLight(0xffffff, 0.85); d1.position.set(5, 10, 7); scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xbfd7ff, 0.35); d2.position.set(-6, 4, -5); scene.add(d2);

    const labelLayer = document.createElement("div");
    labelLayer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden";
    container.appendChild(labelLayer);
    const labels = [];
    const frameCbs = [];
    const T = { THREE, scene, camera, renderer, controls, container, labels };
    T.onFrame = (cb) => frameCbs.push(cb);
    T.label = function (text, pos, cls) {
      const el = document.createElement("div");
      el.className = "overlay-label" + (cls ? " " + cls : "");
      el.innerHTML = text;
      labelLayer.appendChild(el);
      const L = { el, pos: pos.clone ? pos.clone() : new THREE.Vector3(...pos), visible: true, obj: null };
      L.setVisible = (v) => { L.visible = v; el.style.display = v ? "" : "none"; };
      L.remove = () => { el.remove(); labels.splice(labels.indexOf(L), 1); };
      labels.push(L);
      return L;
    };
    T.material = (color, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.05 }, o));
    function resize() {
      const w = container.clientWidth, h = container.clientHeight || 400;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = w + "px"; renderer.domElement.style.height = h + "px";
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(container); else window.addEventListener("resize", resize);
    resize();
    const v = new THREE.Vector3();
    T.loop = SB.loop(container, (dt, t) => {
      frameCbs.forEach((cb) => cb(dt, t));
      if (controls) controls.update();
      renderer.render(scene, camera);
      const w = container.clientWidth, h = container.clientHeight;
      labels.forEach((L) => {
        if (!L.visible) return;
        v.copy(L.pos); if (L.obj) L.obj.localToWorld(v);
        v.project(camera);
        const behind = v.z > 1;
        L.el.style.display = behind ? "none" : "";
        L.el.style.left = ((v.x + 1) / 2) * w + "px";
        L.el.style.top = ((1 - v.y) / 2) * h + "px";
      });
    });
    return T;
  };

  /* ------------------------------------------------------------ answer checking */
  /**
   * 학생 입력을 숫자로 바꾼다. 허용: "1.2e-3", "1.2×10^-3", "1.2x10-3", "1.2*10^(-3)", "1,234.5", "−4", "3/4", "45%".
   * 실패하면 NaN.
   */
  SB.parseNum = function (str) {
    if (str == null) return NaN;
    let s = String(str).trim().replace(/[−–—]/g, "-").replace(/\s+/g, "").replace(/,(?=\d{3}(\D|$))/g, "");
    if (!s) return NaN;
    let pct = false;
    if (s.endsWith("%")) { pct = true; s = s.slice(0, -1); }
    s = s.replace(/[×xX*·]10\^?\(?([+-]?\d+)\)?$/, "e$1").replace(/^10\^\(?([+-]?\d+)\)?$/, "1e$1");
    let v;
    if (/^[+-]?\d+(\.\d+)?\/[+-]?\d+(\.\d+)?$/.test(s)) { const [a, b] = s.split("/"); v = Number(a) / Number(b); }
    else v = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s) ? Number(s) : NaN;
    return pct ? v / 100 : v;
  };
  /** tol: "2%"(상대, 기본 1%) 또는 "0.05"(절대). 정답이 0이면 절대 1e-9. */
  SB.near = function (v, ans, tol) {
    if (!isFinite(v)) return false;
    tol = tol == null || tol === "" ? "1%" : String(tol);
    if (tol.endsWith("%")) {
      const r = Number(tol.slice(0, -1)) / 100;
      return ans === 0 ? Math.abs(v) < 1e-9 : Math.abs(v - ans) <= Math.abs(ans) * r + 1e-15;
    }
    return Math.abs(v - ans) <= Number(tol) + 1e-15;
  };
  const splitList = (s) => (s == null ? [] : String(s).split(";").map((x) => x.trim()));

  /* ------------------------------------------------------------ math (KaTeX) */
  const MATH_DELIMS = [{ left: "$$", right: "$$", display: true }, { left: "\\(", right: "\\)", display: false }, { left: "\\[", right: "\\]", display: true }];
  let katexReady = false;
  const katexQueue = [];
  /** 요소 안의 수식을 렌더한다(동적으로 만든 HTML에도 호출). */
  SB.math = function (el) {
    el = el || document.body;
    if (katexReady && window.renderMathInElement) {
      renderMathInElement(el, { delimiters: MATH_DELIMS, throwOnError: false, strict: "ignore", ignoredClasses: ["no-math"] });
      fitMath(el);
    } else katexQueue.push(el);
  };
  /** 부모보다 넓은 인라인 수식은 그 자리에서 가로 스크롤되게 한다(모바일 가로 넘침 방지). */
  function fitMath(root) {
    (root || document).querySelectorAll("main .katex").forEach((k) => {
      if (k.closest(".katex-display")) return;
      k.classList.remove("katex-wide");
      const box = k.parentElement && k.parentElement.closest("p, li, td, div, span.step, figcaption");
      const limit = box ? box.getBoundingClientRect().right : document.documentElement.clientWidth;
      if (k.getBoundingClientRect().right > Math.min(limit, document.documentElement.clientWidth) + 1) k.classList.add("katex-wide");
    });
  }
  let fitT = 0;
  addEventListener("resize", () => { clearTimeout(fitT); fitT = setTimeout(() => katexReady && fitMath(document), 150); });
  /** TeX 문자열 → HTML (KaTeX 준비 전이면 원문) */
  SB.tex = function (tex, display) {
    if (window.katex) { try { return katex.renderToString(tex, { throwOnError: false, strict: "ignore", displayMode: !!display }); } catch (e) {} }
    return display ? `\\[${tex}\\]` : `\\(${tex}\\)`;
  };
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  function loadKatex() {
    if (!document.querySelector('link[href*="katex"]')) {
      const l = document.createElement("link"); l.rel = "stylesheet"; l.href = KATEX + "katex.min.css"; document.head.appendChild(l);
    }
    const chain = window.katex ? Promise.resolve() : loadScript(KATEX + "katex.min.js");
    chain
      .then(() => Promise.all([window.renderMathInElement ? 0 : loadScript(KATEX + "contrib/auto-render.min.js"), loadScript(KATEX + "contrib/mhchem.min.js")]))
      .then(() => {
        katexReady = true;
        SB.math(document.body);
        katexQueue.splice(0).forEach((el) => el !== document.body && SB.math(el));
        document.dispatchEvent(new CustomEvent("sb:math"));
      })
      .catch(() => console.warn("KaTeX를 불러오지 못했습니다."));
  }

  /* ------------------------------------------------------------ components */
  const chapterNum = () => {
    const slug = document.body.dataset.chapter;
    const ch = SB.course && SB.course.chapters.find((c) => c.slug === slug);
    return ch ? (isNaN(Number(ch.num)) ? ch.num : String(Number(ch.num))) : document.body.dataset.num || "";
  };

  /** 예제: <div class="example" data-title="..."><div class="ex-body">...</div></div> → 머리말·번호 */
  function initExamples(main, num) {
    [...main.querySelectorAll(".example")].forEach((ex, i) => {
      const label = `예제 ${num ? num + "." : ""}${i + 1}`;
      if (!ex.id) ex.id = "ex-" + (i + 1);
      ex.dataset.label = label;
      let head = ex.querySelector(":scope > .ex-head");
      if (!head) {
        head = document.createElement("div");
        head.className = "ex-head";
        head.innerHTML = `<h4></h4>`;
        head.querySelector("h4").textContent = ex.dataset.title || "";
        ex.prepend(head);
      }
      if (!head.querySelector(".ex-tag")) head.insertAdjacentHTML("afterbegin", `<span class="ex-tag">${label}</span>`);
      if (!ex.querySelector(":scope > .ex-body")) {
        const body = document.createElement("div"); body.className = "ex-body";
        [...ex.childNodes].filter((n) => n !== head).forEach((n) => body.appendChild(n));
        ex.appendChild(body);
      }
    });
  }

  /** 그림 번호: figcaption이 <b>로 시작하지 않으면 "그림 N.k"를 붙인다. */
  function initFigures(main, num) {
    let k = 0;
    [...main.querySelectorAll("figure")].forEach((f) => {
      const cap = f.querySelector("figcaption");
      if (!cap) return;
      k++;
      if (!f.id) f.id = "fig-" + k;
      const first = cap.firstElementChild;
      if (!(first && first.tagName === "B" && cap.textContent.trim().indexOf(first.textContent.trim()) === 0)) {
        cap.insertAdjacentHTML("afterbegin", `<b>그림 ${num ? num + "." : ""}${k}</b> `);
      }
    });
  }

  /**
   * 연습문제.
   *   <div class="problem" data-answer="0.0821" data-unit="L·atm/(mol·K)" data-tol="1%" data-level="2" data-topic="이상기체">
   *     <div class="prob-q">…</div> <div class="prob-hint">…</div> <div class="prob-sol">…</div>
   *   </div>
   * 여러 칸: data-answer="1.2; 3.4" data-label="x; y" data-unit="g; L"
   * 선택형: <div class="prob-choices"><button>…</button><button data-correct>…</button></div>
   * 서술형(자동 채점 없음): data-answer 생략 → 풀이 보기만.
   */
  function initProblems(main, num, slug) {
    const probs = [...main.querySelectorAll(".problem")];
    probs.forEach((p, i) => {
      const label = `${num ? num + "." : ""}${i + 1}`;
      const id = slug + ":" + (p.dataset.id || "p" + (i + 1));
      if (!p.id) p.id = "prob-" + (i + 1);
      const lv = Number(p.dataset.level || 0);
      const head = document.createElement("div");
      head.className = "prob-head";
      head.innerHTML = `<span class="prob-num">문제 ${label}</span>` + (lv ? `<span class="prob-level" title="난이도 ${lv}/3">${"●".repeat(lv)}${"○".repeat(3 - lv)}</span>` : "") +
        (p.dataset.topic ? `<span class="prob-topic"></span>` : "") + `<span class="prob-state"></span>`;
      if (p.dataset.topic) head.querySelector(".prob-topic").textContent = p.dataset.topic;
      p.prepend(head);
      const state = head.querySelector(".prob-state");
      const msg = document.createElement("div"); msg.className = "prob-msg"; msg.setAttribute("aria-live", "polite");
      const setSolved = (ok) => {
        p.classList.toggle("solved", ok);
        state.textContent = ok ? "✓ 해결" : "";
      };
      const markResult = (ok) => {
        if (ok) { SB.store.mark("solved", id, 1); setSolved(true); }
        document.dispatchEvent(new CustomEvent("sb:progress"));
      };
      const hints = [...p.querySelectorAll(".prob-hint")];
      const sol = p.querySelector(".prob-sol");
      const actions = document.createElement("div"); actions.className = "prob-actions";
      let hintIdx = 0;
      const ans = document.createElement("div"); ans.className = "prob-ans";

      const choices = p.querySelector(".prob-choices");
      if (choices) {
        const btns = [...choices.querySelectorAll("button")];
        btns.forEach((b) => b.addEventListener("click", () => {
          const ok = b.hasAttribute("data-correct");
          btns.forEach((o) => o.classList.remove("wrong"));
          b.classList.add(ok ? "right" : "wrong");
          msg.className = "prob-msg " + (ok ? "right" : "wrong");
          msg.textContent = ok ? "정답입니다." : "다시 생각해 보세요.";
          if (ok) btns.forEach((o) => (o.disabled = true));
          markResult(ok);
        }));
      } else if (p.dataset.answer != null || p.dataset.text != null) {
        const isText = p.dataset.text != null;
        const answers = isText ? [p.dataset.text] : splitList(p.dataset.answer).map(Number);
        const labels = splitList(p.dataset.label), units = splitList(p.dataset.unit), tols = splitList(p.dataset.tol);
        const inputs = answers.map((_, k) => {
          const f = document.createElement("label"); f.className = "prob-field";
          const inp = document.createElement("input");
          inp.type = "text"; inp.inputMode = isText ? "text" : "decimal"; inp.autocomplete = "off"; inp.spellcheck = false;
          inp.setAttribute("aria-label", `문제 ${label} 답${labels[k] ? " " + labels[k] : ""}`);
          if (labels[k]) f.append(Object.assign(document.createElement("span"), { innerHTML: labels[k] }));
          f.append(inp);
          if (units[k]) f.append(Object.assign(document.createElement("span"), { className: "unit", innerHTML: units[k] }));
          ans.append(f);
          inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
          return inp;
        });
        const check = () => {
          let allOk = true, anyEmpty = false;
          inputs.forEach((inp, k) => {
            if (!inp.value.trim()) { anyEmpty = true; inp.classList.remove("right", "wrong"); allOk = false; return; }
            let ok;
            if (isText) {
              const norm = (x) => x.toLowerCase().replace(/[\s_·]/g, "");
              ok = answers[0].split("|").some((a) => norm(a) === norm(inp.value));
            } else ok = SB.near(SB.parseNum(inp.value), answers[k], tols[k] || tols[0]);
            inp.classList.toggle("right", ok); inp.classList.toggle("wrong", !ok);
            allOk = allOk && ok;
          });
          if (anyEmpty && !inputs.some((x) => x.value.trim())) { msg.className = "prob-msg"; msg.textContent = "답을 입력하세요."; return; }
          msg.className = "prob-msg " + (allOk ? "right" : "wrong");
          if (allOk) msg.textContent = "정답입니다.";
          else if (!isText && inputs.some((x) => x.value.trim() && !isFinite(SB.parseNum(x.value)))) msg.textContent = "숫자로 입력하세요. 예: 2.5e-3 또는 2.5×10^-3";
          else msg.textContent = "아직 아닙니다. 단위와 유효숫자, 부호를 확인해 보세요." + (hints.length ? " 힌트를 열어 볼 수도 있습니다." : "");
          markResult(allOk);
        };
        const cb = document.createElement("button"); cb.className = "btn primary"; cb.type = "button"; cb.textContent = "확인";
        cb.addEventListener("click", check);
        ans.append(cb);
      }
      if (hints.length) {
        const hb = document.createElement("button"); hb.className = "btn"; hb.type = "button";
        hb.textContent = hints.length > 1 ? `힌트 (0/${hints.length})` : "힌트";
        hb.addEventListener("click", () => {
          if (hintIdx < hints.length) hints[hintIdx++].classList.add("show");
          if (hints.length > 1) hb.textContent = `힌트 (${hintIdx}/${hints.length})`;
          if (hintIdx >= hints.length) hb.disabled = true;
        });
        actions.append(hb);
      }
      if (sol) {
        const sb = document.createElement("button"); sb.className = "btn"; sb.type = "button"; sb.textContent = "풀이 보기";
        sb.addEventListener("click", () => { const on = sol.classList.toggle("show"); sb.textContent = on ? "풀이 숨기기" : "풀이 보기"; });
        actions.append(sb);
      }
      const q = p.querySelector(".prob-q") || head;
      if (ans.children.length) ans.append(actions); else (choices || q).after(actions);
      if (ans.children.length) q.after(ans);
      (ans.children.length ? ans : actions).after(msg);
      // 힌트·풀이는 맨 뒤로
      hints.forEach((h) => p.appendChild(h));
      if (sol) p.appendChild(sol);
      if (SB.store.get("solved", id)) setSolved(true);
    });
    // 세트 진행 막대
    main.querySelectorAll(".problem-set").forEach((set) => {
      const n = set.querySelectorAll(".problem").length;
      if (!n) return;
      const bar = document.createElement("div"); bar.className = "problem-progress";
      bar.innerHTML = `<span class="lbl"></span><span class="bar"><i></i></span>`;
      set.before(bar);
      const upd = () => {
        const k = set.querySelectorAll(".problem.solved").length;
        bar.querySelector(".lbl").textContent = `해결 ${k} / ${n}`;
        bar.querySelector("i").style.width = (k / n) * 100 + "%";
      };
      upd();
      document.addEventListener("sb:progress", upd);
    });
  }

  /**
   * 무작위 반복 연습.
   *   <div class="drill" id="drill-mm" data-title="몰 질량 구하기"></div>
   *   SB.drill('drill-mm', () => ({ q:'HTML', answer: 180.16 | [a,b], label:['x','y'], unit:'g/mol', tol:'0.5%', sol:'HTML' }))
   */
  SB.drill = function (id, gen) {
    const el = typeof id === "string" ? document.getElementById(id) : id;
    if (!el) return;
    let streak = 0, total = 0, right = 0, cur;
    el.innerHTML = `<div class="drill-head"><span class="sim-tag">DRILL</span><h4></h4><span class="drill-score"></span></div>
      <div class="drill-q"></div><div class="prob-ans"></div><div class="prob-msg" aria-live="polite"></div><div class="prob-sol"></div>`;
    el.querySelector("h4").textContent = el.dataset.title || "반복 연습";
    const qEl = el.querySelector(".drill-q"), ansEl = el.querySelector(".prob-ans"), msg = el.querySelector(".prob-msg"), solEl = el.querySelector(".prob-sol"), score = el.querySelector(".drill-score");
    const updScore = () => (score.textContent = total ? `${right}/${total} · 연속 ${streak}` : "");
    function next() {
      cur = gen();
      const answers = [].concat(cur.answer), labels = [].concat(cur.label || []), units = [].concat(cur.unit || []);
      qEl.innerHTML = cur.q; solEl.innerHTML = cur.sol || ""; solEl.classList.remove("show");
      msg.textContent = ""; msg.className = "prob-msg";
      ansEl.innerHTML = "";
      const inputs = answers.map((_, k) => {
        const f = document.createElement("label"); f.className = "prob-field";
        if (labels[k]) f.append(Object.assign(document.createElement("span"), { innerHTML: labels[k] }));
        const inp = document.createElement("input"); inp.type = "text"; inp.inputMode = "decimal"; inp.autocomplete = "off";
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
        f.append(inp);
        if (units[k]) f.append(Object.assign(document.createElement("span"), { className: "unit", innerHTML: units[k] }));
        ansEl.append(f);
        return inp;
      });
      let answered = false;
      const check = () => {
        if (inputs.some((x) => !x.value.trim())) { msg.textContent = "답을 입력하세요."; return; }
        const ok = inputs.every((inp, k) => { const r = SB.near(SB.parseNum(inp.value), answers[k], cur.tol); inp.classList.toggle("right", r); inp.classList.toggle("wrong", !r); return r; });
        if (!answered) { total++; if (ok) { right++; streak++; } else streak = 0; answered = true; updScore(); }
        msg.className = "prob-msg " + (ok ? "right" : "wrong");
        msg.textContent = ok ? "정답! ‘새 문제’로 계속해 보세요." : "아직 아닙니다. 풀이를 보고 다시 해 보세요.";
      };
      const acts = document.createElement("div"); acts.className = "prob-actions";
      const mk = (t, cls, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "btn " + cls; b.textContent = t; b.addEventListener("click", fn); acts.append(b); };
      mk("확인", "primary", check);
      if (cur.sol) mk("풀이", "", () => solEl.classList.toggle("show"));
      mk("새 문제", "", next);
      ansEl.append(acts);
      SB.math(el);
    }
    next();
    updScore();
    return { next };
  };

  function initQuiz(root, slug) {
    root.querySelectorAll(".quiz-q").forEach((q, i) => {
      const opts = [...q.querySelectorAll("button.opt")];
      const id = slug + ":" + (q.dataset.id || "q" + (i + 1));
      opts.forEach((b) => b.addEventListener("click", () => {
        opts.forEach((o) => { o.disabled = true; if (o.hasAttribute("data-correct")) o.classList.add("right"); });
        const ok = b.hasAttribute("data-correct");
        if (!ok) b.classList.add("wrong");
        q.classList.add("done");
        SB.store.mark("quiz", id, ok ? 1 : 0);
        q.dispatchEvent(new CustomEvent("answered", { bubbles: true, detail: { correct: ok } }));
      }));
    });
  }

  /* ------------------------------------------------------------ layout build */
  const ICON = {
    menu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
    moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
    sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
    shelf: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5h6v14H4zM10 5.5h6v14h-6zM17 7l3-1 2 13-3 1z"/></svg>`,
    chat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 4V6a2 2 0 0 1 2-2z"/><path d="M8 9h8M8 13h5"/></svg>`,
    search: `<svg class="book-search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>`,
  };
  /** 과목 로고: 매니페스트의 mark(SVG 내부 마크업) 또는 기본 플라스크 */
  const LOGO = (inner) => `<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient></defs><rect x="2" y="2" width="28" height="28" rx="8" fill="url(#sbg)"/>${inner || '<path d="M13 8h6M14 8v6l-5 9a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 23 23l-5-9V8" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M11.3 20h9.4" stroke="#fff" stroke-width="2"/>'}</svg>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function build() {
    const body = document.body;
    const C = SB.course;
    const page = body.dataset.page || (body.dataset.chapter ? "chapter" : C ? "course-home" : "site-home");
    const root = body.dataset.root != null ? body.dataset.root : page === "chapter" ? "../" : "";
    const curSlug = body.dataset.chapter || "";
    const href = (slug) => (slug ? `${root}chapters/${slug}.html` : `${root}index.html`);
    const siteHome = page === "site-home" ? "index.html" : SB.siteBase + "index.html";
    const chapters = C ? C.chapters : [];
    const isLive = (c) => c.status !== "planned";
    const bookId = C ? C.id : "science";
    const feedbackUrl = SB.SITE.hub + "feedback.html?book=" + encodeURIComponent(bookId) + "&page=" + encodeURIComponent(location.href);

    // ---- top bar
    const bar = document.createElement("header");
    bar.className = "sb-topbar";
    const logoText = C ? `${esc(C.title)} <small>${esc(C.en || "")}</small>` : `${SB.SITE.name} <small>${SB.SITE.ko}</small>`;
    bar.innerHTML = `
      <div class="book-nav-left">
        ${C ? `<button class="sb-btn icon" id="sb-menu" aria-label="챕터 목록">${ICON.menu}</button>` : ""}
        <a class="sb-logo" href="${C ? href("") : siteHome}">${LOGO(C && C.mark)}<span>${logoText}</span></a>
      </div>
      ${C ? `<div class="book-search">${ICON.search}<input type="search" aria-label="이 교과서의 챕터, 절, 예제, 시뮬레이터 검색" placeholder="이 교과서 검색" autocomplete="off"><div class="book-search-results" aria-live="polite"></div></div>` : '<span class="spacer" style="flex:1"></span>'}
      <div class="book-nav-right">
        ${page === "site-home" ? `<a class="sb-btn series-link" href="${SB.SITE.hub}" title="euiyun books 전체 서가">${ICON.shelf}<span>전체 책</span></a>` : `<a class="sb-btn series-link" href="${siteHome}" title="수학 서가">${ICON.shelf}<span>모든 교과서</span></a>`}
        <a class="sb-btn icon feedback-button" href="${feedbackUrl}" target="_blank" rel="noopener" aria-label="독자 의견 보내기" title="독자 의견 보내기">${ICON.chat}</a>
        <button class="sb-btn icon" id="sb-theme" aria-label="테마 전환"></button>
      </div>
      <div class="sb-progress" id="sb-progress"></div>`;
    body.prepend(bar);

    // ---- theme
    const tbtn = bar.querySelector("#sb-theme");
    const setIcon = () => (tbtn.innerHTML = SB.isDark() ? ICON.sun : ICON.moon);
    setIcon();
    tbtn.addEventListener("click", () => {
      const next = SB.isDark() ? "light" : "dark";
      try { localStorage.setItem("math-theme", next); } catch (e) {}
      applyTheme(next); setIcon();
    });
    const prog = bar.querySelector("#sb-progress");
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%"; };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    if (C) {
      buildDrawer(bar, C, chapters, curSlug, href, isLive, siteHome);
      buildSearch(bar, chapters.filter(isLive), href);
    }

    // ---- chapter page
    const main = document.querySelector("main.chapter");
    if (main) {
      const num = chapterNum();
      const layout = document.createElement("div");
      layout.className = "sb-layout";
      main.parentNode.insertBefore(layout, main);
      layout.appendChild(main);
      const toc = document.createElement("aside");
      toc.className = "sb-toc";
      const h2s = [...main.querySelectorAll("section > h2")];
      let n = 0;
      toc.innerHTML = "<h4>ON THIS PAGE</h4>" + h2s.map((h, i) => {
        const sec = h.parentElement;
        if (!sec.id) sec.id = "s" + (i + 1);
        const numbered = !sec.classList.contains("keypoints") && !sec.classList.contains("quiz-sec") && !sec.classList.contains("problems") && !sec.hasAttribute("data-nonum");
        const plain = h.textContent.trim();
        if (numbered && !h.querySelector(".h-num")) { n++; h.insertAdjacentHTML("afterbegin", `<span class="h-num">${num ? num + "." : ""}${n}</span>`); }
        return `<a href="#${sec.id}">${esc(plain)}</a>`;
      }).join("");
      layout.appendChild(toc);
      const links = [...toc.querySelectorAll("a")];
      if (window.IntersectionObserver && h2s.length) {
        const io = new IntersectionObserver((es) => {
          es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); });
        }, { rootMargin: "-20% 0px -70% 0px" });
        h2s.forEach((h) => io.observe(h.parentElement));
      }
      initFigures(main, num);
      initExamples(main, num);
      initProblems(main, num, curSlug);
      [...main.querySelectorAll(".sim")].forEach((s, i) => { if (!s.id) s.id = "sim-" + (i + 1); });

      // 선수 지식 링크: <header data-prereq="atoms stoichiometry">
      const hero = main.querySelector(".chapter-hero");
      const pre = hero && hero.dataset.prereq;
      if (pre && C) {
        const items = pre.split(/\s+/).map((s) => chapters.find((c) => c.slug === s)).filter(Boolean);
        if (items.length) hero.insertAdjacentHTML("beforeend", `<div class="prereq"><span>먼저 보면 좋은 장</span>${items.map((c) => `<a href="${href(c.slug)}">${esc(c.num)} ${esc(c.title)}</a>`).join("")}</div>`);
      }

      // pager
      if (C) {
        const live = chapters.filter(isLive);
        const idx = live.findIndex((c) => c.slug === curSlug);
        const prev = idx > 0 ? live[idx - 1] : null;
        const next = idx >= 0 && idx < live.length - 1 ? live[idx + 1] : null;
        const pager = document.createElement("nav");
        pager.className = "sb-pager";
        pager.innerHTML =
          (prev ? `<a class="prev" href="${href(prev.slug)}"><small>← 이전 · ${esc(prev.num)}</small>${esc(prev.title)}</a>` : `<a class="prev" href="${href("")}"><small>← 처음으로</small>목차</a>`) +
          (next ? `<a class="next" href="${href(next.slug)}"><small>다음 · ${esc(next.num)} →</small>${esc(next.title)}</a>` : "");
        layout.after(pager);
        SB.store.mark("visited", curSlug, Date.now());
      }
      if (/^#/.test(location.hash)) requestAnimationFrame(() => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); });
    }

    // 과목 홈: 챕터 카드에 진도 표시 (카드는 build.py가 정적으로 생성)
    if (page === "course-home" && C) {
      const st = C.stats || {};
      document.querySelectorAll(".ch-card[data-slug]").forEach((card) => {
        const s = st[card.dataset.slug];
        if (!s || !s.problems) return;
        const k = SB.store.count("solved", card.dataset.slug);
        if (!k) return;
        card.insertAdjacentHTML("beforeend", `<div class="meter" title="연습문제 ${k}/${s.problems} 해결"><i style="width:${Math.min(100, (k / s.problems) * 100)}%"></i></div>`);
      });
    }

    (SB._observers || []).forEach(([io, el]) => { io.unobserve(el); io.observe(el); });
    (SB.hooks || []).forEach((f) => { try { f(main || document.body, curSlug || page); } catch (e) { console.error(e); } });
    initQuiz(document, curSlug || page);

    // ---- footer
    const foot = document.createElement("footer");
    foot.className = "sb-foot";
    const lic = SB.SITE.repo + "/blob/main/";
    foot.innerHTML = `${C ? esc(C.title) + " — " : ""}${SB.SITE.name} · 직접 만지며 배우는 인터랙티브 수학 교과서. 시뮬레이터 수치는 교육용 모델입니다.
      <br>© 2026 <a href="https://github.com/geniuskey">geniuskey</a> ·
      콘텐츠 <a href="https://creativecommons.org/licenses/by/4.0/deed.ko" rel="license">CC BY 4.0</a> ·
      코드 <a href="${lic}LICENSE-MIT">MIT</a> ·
      <a href="${lic}LICENSE.md">라이선스 안내</a> ·
      <a href="${feedbackUrl}" target="_blank" rel="noopener">독자 의견</a> ·
      <span class="t-mono" title="엔진 버전">engine ${VERSION}</span>`;
    body.appendChild(foot);

    // 컨트롤 라벨: <span>k<sub>f</sub> <output></span> 처럼 섞인 내용이 flex 항목으로 쪼개지지 않게 글자 부분을 한 덩어리로 감싼다.
    document.querySelectorAll(".ctrl > span").forEach((sp) => {
      const nodes = [...sp.childNodes].filter((n) => !(n.nodeType === 1 && n.tagName === "OUTPUT"));
      if (nodes.length < 2) return;
      const w = document.createElement("span");
      sp.insertBefore(w, nodes[0]);
      nodes.forEach((n) => w.appendChild(n));
    });

    // simulator deep links
    document.querySelectorAll(".sim[id] > .sim-head").forEach((head) => {
      if (head.querySelector(".sim-link")) return;
      const link = document.createElement("a");
      link.className = "sim-link"; link.href = "#" + head.parentElement.id; link.textContent = "#";
      link.title = "이 시뮬레이터로 가는 링크"; link.setAttribute("aria-label", link.title);
      head.appendChild(link);
    });

    loadKatex();
    document.dispatchEvent(new CustomEvent("sb:ready"));
  }

  function buildDrawer(bar, C, chapters, curSlug, href, isLive, siteHome) {
    const body = document.body;
    const drawer = document.createElement("nav");
    drawer.className = "sb-drawer";
    drawer.setAttribute("aria-label", "챕터 목록");
    const stats = C.stats || {};
    const item = (c) => {
      const live = isLive(c);
      const k = live && stats[c.slug] && stats[c.slug].problems ? SB.store.count("solved", c.slug) : 0;
      const tail = !live ? `<span class="badge">준비 중</span>` : k ? `<span class="done" title="해결한 연습문제">✓${k}/${stats[c.slug].problems}</span>` : "";
      return `<li><a href="${live ? href(c.slug) : "#"}" class="${c.slug === curSlug ? "active" : ""}${live ? "" : " planned"}"${live ? "" : ' aria-disabled="true" tabindex="-1"'}><span class="num">${esc(c.num)}</span><span>${esc(c.title)}</span>${tail}</a></li>`;
    };
    drawer.innerHTML = `<h4>${esc(C.title)}</h4>
      <ul class="sb-chlist home-links">
        <li><a href="${href("")}" class="${curSlug ? "" : "active"}"><span class="num">≡</span><span>목차 · 학습 안내</span></a></li>
        <li><a href="${siteHome}"><span class="num">↖</span><span>수학 서가</span></a></li>
      </ul>
      ${(C.parts || []).map((p) => `<div class="part">${esc(p.title)}</div><ul class="sb-chlist">${p.chapters.map(item).join("")}</ul>`).join("")}`;
    const backdrop = document.createElement("div");
    backdrop.className = "sb-drawer-backdrop";
    body.append(backdrop, drawer);
    const toggle = (o) => body.classList.toggle("drawer-open", o);
    bar.querySelector("#sb-menu").addEventListener("click", () => toggle(true));
    backdrop.addEventListener("click", () => toggle(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
    const act = drawer.querySelector("a.active:not([href$='index.html'])");
    if (act) body.addEventListener("transitionend", () => act.scrollIntoView({ block: "center" }), { once: true });
  }

  function buildSearch(bar, chapters, href) {
    const search = bar.querySelector(".book-search");
    const input = search.querySelector("input");
    const results = search.querySelector(".book-search-results");
    const close = () => { search.classList.remove("open"); results.replaceChildren(); };
    let entries = [], loaded = false, promise;
    const load = () => promise || (promise = Promise.all(chapters.map(async (chapter) => {
      try {
        const r = await fetch(href(chapter.slug));
        if (!r.ok) return [];
        const doc = new DOMParser().parseFromString(await r.text(), "text/html");
        const main = doc.querySelector("main.chapter");
        if (!main) return [];
        const out = [];
        main.querySelectorAll("section > h2").forEach((h, i) => out.push({ type: "절", title: h.textContent.trim(), chapter, hash: h.parentElement.id || `s${i + 1}` }));
        main.querySelectorAll(".sim").forEach((s, i) => { const h = s.querySelector(".sim-head h3"); if (h) out.push({ type: "시뮬레이터", title: h.textContent.trim(), chapter, hash: s.id || `sim-${i + 1}` }); });
        main.querySelectorAll(".example").forEach((e, i) => { const t = e.dataset.title || (e.querySelector("h4") || {}).textContent; if (t) out.push({ type: "예제", title: t.trim(), chapter, hash: e.id || `ex-${i + 1}` }); });
        main.querySelectorAll("figure").forEach((f, i) => { const c = f.querySelector("figcaption"); if (c) out.push({ type: "그림", title: c.textContent.replace(/\s+/g, " ").trim().slice(0, 120), chapter, hash: f.id || `fig-${i + 1}` }); });
        main.querySelectorAll(".term").forEach((t) => out.push({ type: "용어", title: (t.textContent + " " + ((t.nextElementSibling && t.nextElementSibling.classList.contains("en")) ? t.nextElementSibling.textContent : "")).trim(), chapter, hash: (t.closest("section") || {}).id || "" }));
        return out;
      } catch (e) { return []; }
    })).then((parts) => { entries = parts.flat(); loaded = true; render(); }));
    function render() {
      const words = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      results.replaceChildren();
      if (!words.length) { close(); return; }
      const has = (v) => words.every((w) => v.toLocaleLowerCase().includes(w));
      const chs = chapters.filter((c) => has([c.num, c.title, c.en || "", c.desc, ...(c.tags || [])].join(" "))).map((c) => ({ type: "챕터", title: c.title, chapter: c, hash: "" }));
      const det = entries.filter((e) => has(e.title));
      const seen = new Set();
      const pick = (t, k) => det.filter((e) => e.type === t).filter((e) => { const key = e.type + e.title + e.chapter.slug; if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, k);
      const list = [...chs.slice(0, 4), ...pick("절", 5), ...pick("용어", 4), ...pick("예제", 3), ...pick("시뮬레이터", 4), ...pick("그림", 3)];
      list.forEach((e) => {
        const a = document.createElement("a");
        a.href = href(e.chapter.slug) + (e.hash ? `#${e.hash}` : "");
        const t = document.createElement("strong"); t.textContent = e.title;
        const s = document.createElement("small"); s.textContent = `${e.chapter.num} · ${e.chapter.title} · ${e.type}`;
        a.append(t, s); results.appendChild(a);
      });
      if (promise && !loaded) results.insertAdjacentHTML("beforeend", "<p>절·예제·시뮬레이터 목록을 불러오는 중…</p>");
      else if (!list.length) results.insertAdjacentHTML("beforeend", "<p>검색 결과가 없습니다</p>");
      search.classList.add("open");
    }
    input.addEventListener("input", () => { if (input.value.trim()) load(); render(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { close(); input.blur(); }
      else if (e.key === "ArrowDown") { const f = results.querySelector("a"); if (f) { e.preventDefault(); f.focus(); } }
      else if (e.key === "Enter") { const f = results.querySelector("a"); if (f) { e.preventDefault(); f.click(); } }
    });
    results.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { close(); input.focus(); }
      else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const ls = [...results.querySelectorAll("a")];
        const i = ls.indexOf(document.activeElement) + (e.key === "ArrowDown" ? 1 : -1);
        e.preventDefault(); (ls[i] || input).focus();
      }
    });
    document.addEventListener("pointerdown", (e) => { if (!search.contains(e.target)) close(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();

/* ==========================================================================
   SciBook 인터랙션 모듈 (엔진 2.0)
   글 속에서 바로 만지고 보는 요소를 싸게 만들기 위한 부품.
   - SB.tangle  : 본문 속 드래그 숫자(explorable explanation)
   - SB.drag    : 캔버스 위 드래그 핸들(포인터·터치 공통)
   - .steps     : 단계별로 펼쳐지는 SVG 그림(자동 초기화)
   - .predict   : 예측하고 나서 시뮬레이터 열기(자동 초기화)
   - SB.arrow, SB.spring, SB.dashLine, SB.label : 캔버스 그리기 도구
   - SB.play    : 재생/일시정지 버튼과 루프 연결
   ========================================================================== */
(function () {
  "use strict";
  const SB = window.SB;

  /* ------------------------------------------------------------ 드래그 숫자 */
  /**
   * 본문 속 드래그 숫자.
   *   <p id="tg-range">각도 <span class="tn" data-var="th" data-min="5" data-max="85" data-step="1">45</span>°로 쏘면
   *      사거리는 <span class="tn-out" data-out="R"></span> m.</p>
   *   SB.tangle("tg-range", (v) => ({ R: (v.v0**2*Math.sin(2*v.th*Math.PI/180)/9.8).toFixed(1) }), { onChange(v){ cv.redraw(); } })
   * 값 읽기: t.get() → {th:45,...}, t.set('th', 30)
   * 숫자는 좌우로 끌거나(1px = step 단위 가속), 포커스 후 ←/→ 키로 바꾼다.
   */
  SB.tangle = function (rootId, compute, opts = {}) {
    const root = typeof rootId === "string" ? document.getElementById(rootId) : rootId;
    if (!root) return null;
    const vars = {}, els = {};
    root.querySelectorAll(".tn[data-var]").forEach((el) => {
      const k = el.dataset.var;
      const min = Number(el.dataset.min ?? -Infinity), max = Number(el.dataset.max ?? Infinity), step = Number(el.dataset.step || 1);
      const dec = (String(el.dataset.step || "1").split(".")[1] || "").length;
      const unit = el.dataset.unit || "";
      vars[k] = Number(el.textContent);
      (els[k] = els[k] || []).push(el);
      el.tabIndex = 0;
      el.setAttribute("role", "slider");
      el.setAttribute("aria-valuemin", min); el.setAttribute("aria-valuemax", max);
      el.title = "좌우로 끌거나 ←/→ 키로 값을 바꿔 보세요";
      const fmt = (v) => (opts.fmt && opts.fmt[k] ? opts.fmt[k](v) : v.toFixed(dec)) + unit;
      el._fmt = fmt; el._lim = [min, max, step];
      let sx = 0, sv = 0, drag = false;
      el.addEventListener("pointerdown", (e) => { drag = true; sx = e.clientX; sv = vars[k]; el.setPointerCapture(e.pointerId); el.classList.add("on"); e.preventDefault(); });
      el.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const dx = e.clientX - sx;
        const n = Math.sign(dx) * Math.floor(Math.pow(Math.abs(dx) / 4, 1.25));
        set(k, sv + n * step);
      });
      const end = () => { drag = false; el.classList.remove("on"); };
      el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
      el.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") { set(k, vars[k] + step); e.preventDefault(); }
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") { set(k, vars[k] - step); e.preventDefault(); }
      });
    });
    function set(k, v) {
      const [min, max, step] = els[k][0]._lim;
      v = Math.round(SB.clamp(v, min, max) / step) * step;
      v = Number(v.toFixed(10));
      if (v === vars[k] && root._init) return;
      vars[k] = v;
      els[k].forEach((el) => { el.textContent = el._fmt(v); el.setAttribute("aria-valuenow", v); });
      update();
    }
    function update() {
      const out = compute ? compute(Object.assign({}, vars)) || {} : {};
      for (const key in out) root.querySelectorAll(`[data-out="${key}"]`).forEach((o) => (o.innerHTML = out[key]));
      if (opts.onChange) opts.onChange(Object.assign({}, vars), out);
    }
    Object.keys(els).forEach((k) => els[k].forEach((el) => (el.textContent = el._fmt(vars[k]))));
    root._init = true;
    update();
    return { get: () => Object.assign({}, vars), set, update };
  };

  /* ------------------------------------------------------------ 캔버스 드래그 */
  /**
   * 캔버스 위 드래그 핸들.
   *   SB.drag(cv, {
   *     handles: () => [{ id:'tip', x:px, y:py, r:12 }],   // 현재 핸들 위치(CSS px)
   *     move: (id, x, y, e) => { …상태 갱신… },             // 드래그 중
   *     down: (id, x, y) => {}, up: (id) => {},             // 선택
   *     free: true  // 핸들 밖을 눌러도 move(null, x, y) 호출(예: 클릭 위치에 놓기)
   *   })
   * cv는 SB.canvas가 돌려준 객체 또는 canvas 요소. 이동 후 자동으로 cv.redraw() 한다.
   */
  SB.drag = function (cv, o) {
    const canvas = cv.canvas || cv;
    canvas.style.touchAction = "none";
    let active = null;
    const pos = (e) => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const hit = (x, y) => {
      const hs = (o.handles && o.handles()) || [];
      let best = null, bd = Infinity;
      hs.forEach((h) => { const d = Math.hypot(h.x - x, h.y - y); if (d <= (h.r || 14) + 6 && d < bd) { bd = d; best = h.id; } });
      return best;
    };
    canvas.addEventListener("pointerdown", (e) => {
      const [x, y] = pos(e);
      active = hit(x, y);
      if (active == null && !o.free) return;
      canvas.setPointerCapture(e.pointerId);
      if (o.down) o.down(active, x, y, e);
      if (o.move) o.move(active, x, y, e);
      cv.redraw && cv.redraw();
      e.preventDefault();
    });
    canvas.addEventListener("pointermove", (e) => {
      const [x, y] = pos(e);
      if (active == null && !(o.free && e.buttons)) { canvas.style.cursor = hit(x, y) != null ? "grab" : o.free ? "crosshair" : ""; return; }
      canvas.style.cursor = "grabbing";
      if (o.move) o.move(active, x, y, e);
      cv.redraw && cv.redraw();
    });
    const end = (e) => { if (o.up) o.up(active, e); active = null; canvas.style.cursor = ""; };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    return { get active() { return active; } };
  };

  /* ------------------------------------------------------------ 캔버스 그리기 도구 */
  /** 화살표: SB.arrow(ctx, x1,y1, x2,y2, {color, width, head, label, dash, labelPos:'end'|'mid'}) */
  SB.arrow = function (ctx, x1, y1, x2, y2, o = {}) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    ctx.save();
    ctx.strokeStyle = ctx.fillStyle = o.color || SB.color("accent");
    ctx.lineWidth = o.width || 2.2; ctx.lineCap = "round";
    if (o.dash) ctx.setLineDash(o.dash);
    if (len > 0.5) {
      const h = Math.min(o.head || 9, len * 0.6), a = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * h * 0.8, y2 - Math.sin(a) * h * 0.8); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - h * Math.cos(a - 0.42), y2 - h * Math.sin(a - 0.42));
      ctx.lineTo(x2 - h * Math.cos(a + 0.42), y2 - h * Math.sin(a + 0.42));
      ctx.closePath(); ctx.fill();
    }
    if (o.label) {
      const t = o.labelPos === "mid" ? 0.5 : 1;
      const lx = x1 + (x2 - x1) * t, ly = y1 + (y2 - y1) * t;
      const a = Math.atan2(y2 - y1, x2 - x1), off = o.labelOff || 14;
      SB.label(ctx, o.label, lx + Math.cos(a - Math.PI / 2) * off * (o.labelSide || 1) + (t === 1 ? Math.cos(a) * 8 : 0), ly + Math.sin(a - Math.PI / 2) * off * (o.labelSide || 1) + (t === 1 ? Math.sin(a) * 8 : 0), { color: o.color, bold: true });
    }
    ctx.restore();
  };
  /** 글자(배경 테두리로 가독성 확보): SB.label(ctx, '텍스트', x, y, {color, size, align, bold, bg}) */
  SB.label = function (ctx, text, x, y, o = {}) {
    ctx.save();
    ctx.font = `${o.bold ? "600 " : ""}${o.size || 12}px ${o.mono ? SB.color("mono") : SB.color("font")}`;
    ctx.textAlign = o.align || "center"; ctx.textBaseline = o.baseline || "middle";
    ctx.lineWidth = 3.5; ctx.strokeStyle = o.bg || SB.color("canvas-bg"); ctx.lineJoin = "round";
    ctx.strokeText(text, x, y);
    ctx.fillStyle = o.color || SB.color("text");
    ctx.fillText(text, x, y);
    ctx.restore();
  };
  /** 용수철: SB.spring(ctx, x1,y1, x2,y2, {coils:10, amp:8, color, width}) */
  SB.spring = function (ctx, x1, y1, x2, y2, o = {}) {
    const n = o.coils || 10, amp = o.amp || 8, L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1);
    ctx.save(); ctx.translate(x1, y1); ctx.rotate(a);
    ctx.strokeStyle = o.color || SB.color("text-dim"); ctx.lineWidth = o.width || 1.8; ctx.lineJoin = "round";
    const lead = Math.min(10, L * 0.1);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(lead, 0);
    for (let i = 0; i <= n * 2; i++) ctx.lineTo(lead + ((L - 2 * lead) * i) / (n * 2), i === 0 || i === n * 2 ? 0 : (i % 2 ? -amp : amp));
    ctx.lineTo(L, 0); ctx.stroke(); ctx.restore();
  };
  /** 점선: SB.dashLine(ctx, x1,y1,x2,y2, color, dash=[4,4]) */
  SB.dashLine = function (ctx, x1, y1, x2, y2, color, dash) {
    ctx.save(); ctx.strokeStyle = color || SB.color("text-faint"); ctx.lineWidth = 1.2; ctx.setLineDash(dash || [4, 4]);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
  };
  /** 재생 버튼: SB.play('btn-id', loop) → 버튼 글자가 ▶ 재생 / ❚❚ 정지로 바뀐다. loop는 SB.loop 반환값 */
  SB.play = function (id, loop, o = {}) {
    const b = typeof id === "string" ? document.getElementById(id) : id;
    if (!b) return;
    const sync = () => (b.textContent = loop.running ? (o.pause || "❚❚ 정지") : (o.play || "▶ 재생"));
    b.addEventListener("click", () => { loop.toggle(); sync(); });
    sync();
    return sync;
  };

  /* ------------------------------------------------------------ 단계별 그림 */
  /**
   *   <figure class="diagram steps" data-steps="4">
   *     <svg> … <g data-step="2">두 번째 단계부터 보임</g> … </svg>
   *     <ol class="steps-cap"><li>1단계 설명</li><li>2단계 설명</li>…</ol>
   *     <figcaption>…</figcaption>
   *   </figure>
   * data-step="n" 인 요소는 n단계부터 보인다. data-only="n" 은 n단계에서만 보인다.
   * 엔진이 ◀ ▶ ⟲ 자동재생 버튼을 붙인다.
   */
  function initSteps(root) {
    root.querySelectorAll(".steps").forEach((fig) => {
      const caps = [...fig.querySelectorAll(".steps-cap > li")];
      const n = Number(fig.dataset.steps) || caps.length || Math.max(1, ...[...fig.querySelectorAll("[data-step]")].map((e) => Number(e.dataset.step)));
      let k = 1, timer = 0;
      const bar = document.createElement("div");
      bar.className = "steps-bar";
      bar.innerHTML = `<button type="button" class="btn" data-a="prev" aria-label="이전 단계">◀</button><span class="steps-dots"></span><button type="button" class="btn" data-a="next" aria-label="다음 단계">▶</button><button type="button" class="btn" data-a="auto">⟲ 자동 재생</button><span class="steps-now" aria-live="polite"></span>`;
      const svg = fig.querySelector("svg, canvas");
      (svg || fig.firstElementChild).after(bar);
      const dots = bar.querySelector(".steps-dots");
      dots.innerHTML = Array.from({ length: n }, (_, i) => `<button type="button" aria-label="${i + 1}단계">${i + 1}</button>`).join("");
      const now = bar.querySelector(".steps-now");
      function show(i) {
        k = SB.clamp(i, 1, n);
        fig.querySelectorAll("[data-step]").forEach((e) => e.classList.toggle("st-hide", Number(e.dataset.step) > k));
        fig.querySelectorAll("[data-only]").forEach((e) => e.classList.toggle("st-hide", Number(e.dataset.only) !== k));
        caps.forEach((c, j) => c.classList.toggle("on", j === k - 1));
        [...dots.children].forEach((d, j) => d.classList.toggle("on", j < k));
        now.innerHTML = caps[k - 1] ? caps[k - 1].innerHTML : `${k} / ${n}`;
        fig.dispatchEvent(new CustomEvent("step", { detail: { step: k, total: n } }));
      }
      bar.addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        if (b.parentElement === dots) { stop(); show([...dots.children].indexOf(b) + 1); return; }
        const a = b.dataset.a;
        if (a === "prev") { stop(); show(k - 1); }
        if (a === "next") { stop(); show(k + 1); }
        if (a === "auto") { if (timer) stop(); else { if (k >= n) show(1); timer = setInterval(() => { if (k >= n) stop(); else show(k + 1); }, Number(fig.dataset.interval) || 1800); b.textContent = "❚❚ 멈춤"; } }
      });
      function stop() { clearInterval(timer); timer = 0; bar.querySelector('[data-a="auto"]').textContent = "⟲ 자동 재생"; }
      show(Number(fig.dataset.start) || 1);
      fig._steps = { show, get step() { return k; } };
    });
  }

  /* ------------------------------------------------------------ 예측 후 실험 */
  /**
   *   <div class="predict" data-for="sim-drop">
   *     <p>질문: 두 공 중 어느 것이 먼저 떨어질까?</p>
   *     <div class="opts"><button class="opt">A</button><button class="opt" data-correct>동시에</button></div>
   *     <div class="quiz-exp">왜 그런지 한 줄 설명(시뮬레이터에서 확인)</div>
   *   </div>
   *   <div class="sim" id="sim-drop"> … </div>   ← 예측 전에는 흐리게 잠긴다(‘건너뛰기’ 가능)
   */
  function initPredict(root) {
    root.querySelectorAll(".predict").forEach((p) => {
      const target = p.dataset.for && document.getElementById(p.dataset.for);
      p.insertAdjacentHTML("afterbegin", '<span class="predict-tag">PREDICT · 먼저 예측해 보세요</span>');
      if (target) {
        target.classList.add("locked");
        const ov = document.createElement("div");
        ov.className = "lock-ov";
        ov.innerHTML = '<div><b>먼저 위에서 결과를 예측해 보세요.</b><br><button type="button" class="btn">예측 없이 열기</button></div>';
        target.appendChild(ov);
        ov.querySelector("button").addEventListener("click", () => unlock());
      }
      function unlock() { if (target) { target.classList.remove("locked"); const o = target.querySelector(".lock-ov"); if (o) o.remove(); target.dispatchEvent(new CustomEvent("unlock")); } }
      const opts = [...p.querySelectorAll("button.opt")];
      opts.forEach((b) => b.addEventListener("click", () => {
        opts.forEach((o) => { o.disabled = true; if (o.hasAttribute("data-correct")) o.classList.add("right"); });
        if (!b.hasAttribute("data-correct")) b.classList.add("wrong");
        p.classList.add("done");
        unlock();
        if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "nearest" }), 250);
      }));
    });
  }

  SB.hooks.push((root) => { initSteps(root); initPredict(root); });
})();

// Series glossary tooltips; data is generated into the active course manifest.
(function () {
  const base = new URL(".", document.currentScript.src);
  const script = document.createElement("script");
  script.src = new URL("glossary-tooltips.js", base).href;
  document.head.append(script);
})();

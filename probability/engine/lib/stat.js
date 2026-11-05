/* ==========================================================================
   SciBook lib/stat.js — 확률·통계 라이브러리 (전역 Stat)
   시드 난수와 표본 추출, 특수 함수(감마·베타·오차 함수·불완전 감마/베타),
   확률 분포 객체(pdf/pmf·cdf·분위수·표본), 기술 통계(분위수·히스토그램·상자 그림·
   KDE·ECDF·순위), 추론(z·t·비율·분산 구간과 검정, 검정력, 카이제곱·피셔·
   만–휘트니·윌콕슨·부호·KS·순열·부트스트랩), 회귀(단순·다중·다항·로지스틱),
   분산 분석(일원·이원·투키 HSD), 실험 계획(2ᵏ 요인·부분 요인·효과), 확률 과정
   (마르코프 연쇄·흡수·M/M/1·M/M/c·자기 상관), SPC(관리도 계수·한계·규칙·EWMA·
   CUSUM·ARL·공정 능력·Gage R&R·OC 곡선), 신뢰성·수율(와이블 적합·중앙 순위·
   카플란–마이어·아레니우스·FIT·수율 모형), 그리기 도구(SB.chart 위에 막대·면적·
   상자 그림·점 그림).
   의존: engine/js/scibook.js (그리기 함수만)

   관례
   - 분포 모수: normal(μ, σ) — σ는 표준 편차. exponential(λ) — 비율(평균 1/λ).
     gamma(k, θ) — 모양 k, 척도 θ(평균 kθ). weibull(β, η) — 모양 β, 척도 η.
     lognormal(μ, σ) — ln X ~ N(μ, σ). geometric(p) — 첫 성공까지의 시행 횟수(1, 2, …).
     negbinom(r, p) — r번째 성공까지의 시행 횟수(r, r+1, …). hypergeom(N, K, n) —
     모집단 N개 중 성공 K개, n개 비복원 추출의 성공 수.
   - 분산·표준 편차는 기본이 표본(n−1). 모집단 값은 Stat.var(x, 0).
   - 분위수 Stat.quantile은 선형 보간(R type 7, 엑셀 QUANTILE.INC와 같음).
   - 검정 결과 alt: "two"(양측, 기본) | "less" | "greater".
   - 난수: Stat.rng(seed)는 재현 가능한 생성기. 인자 없이 쓰면 Math.random 기반.
   ========================================================================== */
(function () {
  "use strict";
  const Stat = (window.Stat = {});
  const PI = Math.PI, LN2PI = Math.log(2 * PI), SQRT2 = Math.SQRT2;
  const isArr = Array.isArray;

  /* ------------------------------------------------------------ 난수 */
  /** mulberry32 — seed(정수)가 같으면 같은 수열. seed 생략 시 Math.random. */
  Stat.rng = function (seed) {
    let u;
    if (seed == null) u = Math.random;
    else {
      let a = seed >>> 0;
      u = function () {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    let spare = null;
    const R = {
      u,
      uniform: (a = 0, b = 1) => a + (b - a) * u(),
      int: (a, b) => a + Math.floor(u() * (b - a + 1)), // a..b 포함
      bernoulli: (p) => (u() < p ? 1 : 0),
      normal(mu = 0, s = 1) {
        if (spare != null) { const z = spare; spare = null; return mu + s * z; }
        let x, y, r;
        do { x = 2 * u() - 1; y = 2 * u() - 1; r = x * x + y * y; } while (r >= 1 || r === 0);
        const f = Math.sqrt((-2 * Math.log(r)) / r);
        spare = y * f;
        return mu + s * x * f;
      },
      exp: (rate = 1) => -Math.log(1 - u()) / rate,
      gamma(k, theta = 1) {
        if (k < 1) return R.gamma(k + 1, theta) * Math.pow(u(), 1 / k);
        const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
        for (;;) {
          let x, v;
          do { x = R.normal(); v = 1 + c * x; } while (v <= 0);
          v = v * v * v;
          const w = u();
          if (w < 1 - 0.0331 * x * x * x * x || Math.log(w) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v * theta;
        }
      },
      beta(a, b) { const x = R.gamma(a), y = R.gamma(b); return x / (x + y); },
      chi2: (k) => R.gamma(k / 2, 2),
      t: (df) => R.normal() / Math.sqrt(R.chi2(df) / df),
      f: (d1, d2) => (R.chi2(d1) / d1) / (R.chi2(d2) / d2),
      lognormal: (mu, s) => Math.exp(R.normal(mu, s)),
      weibull: (beta, eta) => eta * Math.pow(-Math.log(1 - u()), 1 / beta),
      binom(n, p) {
        if (n < 60) { let k = 0; for (let i = 0; i < n; i++) if (u() < p) k++; return k; }
        return Stat.dist.binomial(n, p).q(u());
      },
      poisson(lam) {
        if (lam < 30) { const L = Math.exp(-lam); let k = 0, p = 1; do { k++; p *= u(); } while (p > L); return k - 1; }
        return Stat.dist.poisson(lam).q(u());
      },
      geometric: (p) => Math.max(1, Math.ceil(Math.log(1 - u()) / Math.log(1 - p))),
      pick: (arr) => arr[Math.floor(u() * arr.length)],
      /** 가중치 배열에서 인덱스 하나 */
      choice(w) { const s = w.reduce((a, b) => a + b, 0); let r = u() * s; for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i; } return w.length - 1; },
      shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(u() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
      /** n개 추출(replace=true면 복원 추출) */
      sample(arr, n, replace = false) {
        if (replace) return Array.from({ length: n }, () => arr[Math.floor(u() * arr.length)]);
        const a = arr.slice(), out = [];
        for (let i = 0; i < Math.min(n, a.length); i++) { const j = i + Math.floor(u() * (a.length - i)); [a[i], a[j]] = [a[j], a[i]]; out.push(a[i]); }
        return out;
      },
      /** 분포 객체에서 n개 */
      from: (dist, n) => (n == null ? dist.sample(R) : Array.from({ length: n }, () => dist.sample(R))),
      normals: (n, mu = 0, s = 1) => Array.from({ length: n }, () => R.normal(mu, s)),
    };
    return R;
  };
  Stat.random = Stat.rng();

  /* ------------------------------------------------------------ 특수 함수 */
  const LG = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  /** ln Γ(x), x > 0 (란초시 근사, 상대 오차 ~1e-15) */
  function lgamma(x) {
    if (x < 0.5) return Math.log(PI / Math.abs(Math.sin(PI * x))) - lgamma(1 - x);
    x -= 1;
    let a = LG[0];
    const t = x + 7.5;
    for (let i = 1; i < 9; i++) a += LG[i] / (x + i);
    return 0.5 * LN2PI + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  Stat.lgamma = lgamma;
  Stat.gamma = (x) => {
    if (Number.isInteger(x) && x > 0 && x < 171) { let f = 1; for (let i = 2; i < x; i++) f *= i; return f; }
    return x < 0.5 ? PI / (Math.sin(PI * x) * Stat.gamma(1 - x)) : Math.exp(lgamma(x));
  };
  Stat.lbeta = (a, b) => lgamma(a) + lgamma(b) - lgamma(a + b);
  Stat.betaFn = (a, b) => Math.exp(Stat.lbeta(a, b));
  const FACT = [1]; for (let i = 1; i <= 170; i++) FACT[i] = FACT[i - 1] * i;
  Stat.factorial = (n) => (n <= 170 ? FACT[n] : Infinity);
  Stat.lfactorial = (n) => (n <= 170 ? Math.log(FACT[n]) : lgamma(n + 1));
  Stat.lchoose = (n, k) => (k < 0 || k > n ? -Infinity : Stat.lfactorial(n) - Stat.lfactorial(k) - Stat.lfactorial(n - k));
  /** 이항 계수(정수 n ≤ 1000이면 정확한 곱셈) */
  Stat.choose = function (n, k) {
    if (k < 0 || k > n) return 0;
    k = Math.min(k, n - k);
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return Math.round(r) === r || r > 1e15 ? r : Math.round(r);
  };
  Stat.perm = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; };

  /** 정규화된 하부 불완전 감마 P(a, x) */
  function gammaP(a, x) {
    if (x <= 0) return 0;
    if (x < a + 1) {
      let sum = 1 / a, del = sum, ap = a;
      for (let n = 0; n < 1000; n++) { ap += 1; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-16) break; }
      return Math.min(1, sum * Math.exp(-x + a * Math.log(x) - lgamma(a)));
    }
    return 1 - gammaQcf(a, x);
  }
  function gammaQcf(a, x) {
    const FP = 1e-300;
    let b = x + 1 - a, c = 1 / FP, d = 1 / b, h = d;
    for (let i = 1; i < 1000; i++) {
      const an = -i * (i - a);
      b += 2;
      d = an * d + b; if (Math.abs(d) < FP) d = FP;
      c = b + an / c; if (Math.abs(c) < FP) c = FP;
      d = 1 / d;
      const del = d * c; h *= del;
      if (Math.abs(del - 1) < 1e-16) break;
    }
    return Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
  }
  /** 정규화된 상부 불완전 감마 Q(a, x) = 1 − P (꼬리에서도 정확) */
  function gammaQ(a, x) { if (x <= 0) return 1; return x < a + 1 ? 1 - gammaP(a, x) : gammaQcf(a, x); }
  Stat.gammaP = gammaP;
  Stat.gammaQ = gammaQ;

  function betacf(a, b, x) {
    const FP = 1e-300;
    const qab = a + b, qap = a + 1, qam = a - 1;
    let c = 1, d = 1 - (qab * x) / qap;
    if (Math.abs(d) < FP) d = FP;
    d = 1 / d;
    let h = d;
    for (let m = 1; m <= 3000; m++) {
      const m2 = 2 * m;
      let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < FP) d = FP;
      c = 1 + aa / c; if (Math.abs(c) < FP) c = FP;
      d = 1 / d; h *= d * c;
      aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < FP) d = FP;
      c = 1 + aa / c; if (Math.abs(c) < FP) c = FP;
      d = 1 / d;
      const del = d * c; h *= del;
      if (Math.abs(del - 1) < 1e-15) break;
    }
    return h;
  }
  /** 정규화된 불완전 베타 I_x(a, b) */
  function betaI(x, a, b) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    if (x < (a + 1) / (a + b + 2)) return (bt * betacf(a, b, x)) / a;
    return 1 - (bt * betacf(b, a, 1 - x)) / b;
  }
  Stat.betaI = betaI;
  /** 오차 함수(꼬리 정확) */
  Stat.erf = (x) => (x >= 0 ? gammaP(0.5, x * x) : -gammaP(0.5, x * x));
  Stat.erfc = (x) => (x >= 0 ? gammaQ(0.5, x * x) : 1 + gammaP(0.5, x * x));

  /* ------------------------------------------------------------ 정규 분포 함수 */
  const dnorm = (x, mu = 0, s = 1) => { const z = (x - mu) / s; return Math.exp(-0.5 * z * z) / (s * Math.sqrt(2 * PI)); };
  const pnorm = (x, mu = 0, s = 1) => { const z = (x - mu) / (s * SQRT2); return z < 0 ? 0.5 * Stat.erfc(-z) : 1 - 0.5 * Stat.erfc(z); };
  /** 표준 정규 분위수(Acklam + 핼리 보정 1회, 상대 오차 ~1e-15) */
  function qnormStd(p) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
    const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
    const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
    const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
    const pl = 0.02425;
    let x;
    if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    else if (p <= 1 - pl) { const q = p - 0.5, r = q * q; x = ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
    else { const q = Math.sqrt(-2 * Math.log(1 - p)); x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    const e = pnorm(x) - p, u = e * Math.sqrt(2 * PI) * Math.exp((x * x) / 2);
    return x - u / (1 + (x * u) / 2);
  }
  Stat.dnorm = dnorm;
  Stat.pnorm = pnorm;
  Stat.qnorm = (p, mu = 0, s = 1) => mu + s * qnormStd(p);

  /* ------------------------------------------------------------ 분포 객체 */
  /** 연속 cdf의 역함수: 괄호 확장 + 이분법(+뉴턴) */
  function invertCont(cdf, p, lo, hi, pdf) {
    if (p <= 0) return lo;
    if (p >= 1) return hi;
    let a = isFinite(lo) ? lo : -1, b = isFinite(hi) ? hi : 1;
    if (!isFinite(lo)) while (cdf(a) > p) { b = a; a *= 2; if (a < -1e300) return -Infinity; }
    if (!isFinite(hi)) while (cdf(b) < p) { a = b; b = b <= 0 ? 1 : b * 2; if (b > 1e300) return Infinity; }
    for (let i = 0; i < 200; i++) {
      const m = 0.5 * (a + b);
      if (cdf(m) < p) a = m; else b = m;
      if (b - a <= 1e-14 * Math.max(1, Math.abs(m))) break;
    }
    let x = 0.5 * (a + b);
    if (pdf) for (let i = 0; i < 3; i++) { const f = pdf(x); if (!(f > 0)) break; const nx = x - (cdf(x) - p) / f; if (nx > a - 1e-9 && nx < b + 1e-9) x = nx; }
    return x;
  }
  Stat.invert = invertCont;

  function cont(o) {
    const d = Object.assign({ discrete: false }, o);
    if (!d.q) d.q = (p) => invertCont(d.cdf, p, d.support[0], d.support[1], d.pdf);
    if (!d.sample) d.sample = (R = Stat.random) => d.q(R.u());
    d.sd = Math.sqrt(d.var);
    d.sf = (x) => 1 - d.cdf(x);
    /** 그리기용 범위: 분위수 [p, 1−p] */
    d.range = (p = 0.001) => [Math.max(d.support[0], d.q(p)), Math.min(d.support[1], d.q(1 - p))];
    d.prob = (a, b) => d.cdf(b) - d.cdf(a);
    return d;
  }
  function disc(o) {
    const d = Object.assign({ discrete: true }, o);
    d.pdf = d.pmf;
    if (!d.cdf) d.cdf = (k) => { k = Math.floor(k); let s = 0; for (let i = d.support[0]; i <= k; i++) s += d.pmf(i); return Math.min(1, s); };
    if (!d.q) d.q = (p) => {
      // 가장 작은 k: cdf(k) ≥ p
      let lo = d.support[0], hi = isFinite(d.support[1]) ? d.support[1] : Math.max(lo + 1, Math.ceil(d.mean + 10 * Math.sqrt(d.var) + 10));
      while (!isFinite(d.support[1]) && d.cdf(hi) < p) hi *= 2;
      if (d.cdf(lo) >= p) return lo;
      while (hi - lo > 1) { const m = Math.floor((lo + hi) / 2); if (d.cdf(m) >= p) hi = m; else lo = m; }
      return hi;
    };
    if (!d.sample) d.sample = (R = Stat.random) => d.q(R.u());
    d.sd = Math.sqrt(d.var);
    d.sf = (k) => 1 - d.cdf(k);
    d.range = (p = 0.001) => [Math.max(d.support[0], d.q(p)), Math.min(d.support[1], d.q(1 - p))];
    /** P(a ≤ X ≤ b) */
    d.prob = (a, b) => d.cdf(b) - d.cdf(a - 1);
    /** [[k, pmf]] 배열(a..b) */
    d.table = (a, b) => { if (a == null) [a, b] = d.range(1e-4); const out = []; for (let k = a; k <= b; k++) out.push([k, d.pmf(k)]); return out; };
    return d;
  }

  const D = (Stat.dist = {});
  D.normal = (mu = 0, s = 1) => cont({
    name: "normal", params: { mu, sigma: s }, support: [-Infinity, Infinity], mean: mu, var: s * s,
    pdf: (x) => dnorm(x, mu, s), cdf: (x) => pnorm(x, mu, s), q: (p) => mu + s * qnormStd(p),
    sample: (R = Stat.random) => R.normal(mu, s),
  });
  D.uniform = (a = 0, b = 1) => cont({
    name: "uniform", params: { a, b }, support: [a, b], mean: (a + b) / 2, var: ((b - a) * (b - a)) / 12,
    pdf: (x) => (x >= a && x <= b ? 1 / (b - a) : 0), cdf: (x) => (x <= a ? 0 : x >= b ? 1 : (x - a) / (b - a)), q: (p) => a + p * (b - a),
  });
  D.exponential = (rate = 1) => cont({
    name: "exponential", params: { rate }, support: [0, Infinity], mean: 1 / rate, var: 1 / (rate * rate),
    pdf: (x) => (x < 0 ? 0 : rate * Math.exp(-rate * x)), cdf: (x) => (x <= 0 ? 0 : -Math.expm1(-rate * x)), q: (p) => -Math.log1p(-p) / rate,
    sample: (R = Stat.random) => R.exp(rate),
  });
  D.gamma = (k, theta = 1) => cont({
    name: "gamma", params: { k, theta }, support: [0, Infinity], mean: k * theta, var: k * theta * theta,
    pdf: (x) => (x < 0 ? 0 : x === 0 ? (k === 1 ? 1 / theta : k < 1 ? Infinity : 0) : Math.exp((k - 1) * Math.log(x) - x / theta - lgamma(k) - k * Math.log(theta))),
    cdf: (x) => gammaP(k, x / theta), sample: (R = Stat.random) => R.gamma(k, theta),
  });
  D.chi2 = (df) => Object.assign(D.gamma(df / 2, 2), { name: "chi2", params: { df } });
  D.erlang = (k, rate) => Object.assign(D.gamma(k, 1 / rate), { name: "erlang", params: { k, rate } });
  D.beta = (a, b) => cont({
    name: "beta", params: { a, b }, support: [0, 1], mean: a / (a + b), var: (a * b) / ((a + b) * (a + b) * (a + b + 1)),
    pdf: (x) => (x < 0 || x > 1 ? 0 : x === 0 ? (a < 1 ? Infinity : a === 1 ? b : 0) : x === 1 ? (b < 1 ? Infinity : b === 1 ? a : 0) : Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - Stat.lbeta(a, b))),
    cdf: (x) => betaI(x, a, b), sample: (R = Stat.random) => R.beta(a, b),
  });
  D.lognormal = (mu = 0, s = 1) => cont({
    name: "lognormal", params: { mu, sigma: s }, support: [0, Infinity], mean: Math.exp(mu + (s * s) / 2), var: (Math.exp(s * s) - 1) * Math.exp(2 * mu + s * s),
    pdf: (x) => (x <= 0 ? 0 : dnorm(Math.log(x), mu, s) / x), cdf: (x) => (x <= 0 ? 0 : pnorm(Math.log(x), mu, s)), q: (p) => Math.exp(mu + s * qnormStd(p)),
    median: Math.exp(mu),
  });
  D.weibull = (beta, eta = 1) => cont({
    name: "weibull", params: { beta, eta }, support: [0, Infinity],
    mean: eta * Stat.gamma(1 + 1 / beta), var: eta * eta * (Stat.gamma(1 + 2 / beta) - Math.pow(Stat.gamma(1 + 1 / beta), 2)),
    pdf: (x) => (x < 0 ? 0 : (beta / eta) * Math.pow(x / eta, beta - 1) * Math.exp(-Math.pow(x / eta, beta))),
    cdf: (x) => (x <= 0 ? 0 : -Math.expm1(-Math.pow(x / eta, beta))), q: (p) => eta * Math.pow(-Math.log1p(-p), 1 / beta),
    /** 고장률 h(t) */
    hazard: (x) => (beta / eta) * Math.pow(x / eta, beta - 1),
  });
  D.t = (df) => cont({
    name: "t", params: { df }, support: [-Infinity, Infinity], mean: df > 1 ? 0 : NaN, var: df > 2 ? df / (df - 2) : Infinity,
    pdf: (x) => Math.exp(lgamma((df + 1) / 2) - lgamma(df / 2) - 0.5 * Math.log(df * PI) - ((df + 1) / 2) * Math.log1p((x * x) / df)),
    cdf: (x) => { if (!isFinite(df)) return pnorm(x); const p = 0.5 * betaI(df / (df + x * x), df / 2, 0.5); return x > 0 ? 1 - p : p; },
    sample: (R = Stat.random) => R.t(df),
  });
  D.f = (d1, d2) => cont({
    name: "f", params: { d1, d2 }, support: [0, Infinity], mean: d2 > 2 ? d2 / (d2 - 2) : NaN,
    var: d2 > 4 ? (2 * d2 * d2 * (d1 + d2 - 2)) / (d1 * (d2 - 2) * (d2 - 2) * (d2 - 4)) : Infinity,
    pdf: (x) => (x <= 0 ? 0 : Math.exp(0.5 * (d1 * Math.log(d1 * x) + d2 * Math.log(d2) - (d1 + d2) * Math.log(d1 * x + d2)) - Math.log(x) - Stat.lbeta(d1 / 2, d2 / 2))),
    cdf: (x) => (x <= 0 ? 0 : betaI((d1 * x) / (d1 * x + d2), d1 / 2, d2 / 2)), sample: (R = Stat.random) => R.f(d1, d2),
  });
  D.cauchy = (x0 = 0, g = 1) => cont({
    name: "cauchy", params: { x0, gamma: g }, support: [-Infinity, Infinity], mean: NaN, var: Infinity,
    pdf: (x) => 1 / (PI * g * (1 + ((x - x0) / g) ** 2)), cdf: (x) => 0.5 + Math.atan((x - x0) / g) / PI, q: (p) => x0 + g * Math.tan(PI * (p - 0.5)),
  });
  D.triangular = (a, c, b) => cont({
    name: "triangular", params: { a, c, b }, support: [a, b], mean: (a + b + c) / 3, var: (a * a + b * b + c * c - a * b - a * c - b * c) / 18,
    pdf: (x) => (x < a || x > b ? 0 : x < c ? (2 * (x - a)) / ((b - a) * (c - a)) : (2 * (b - x)) / ((b - a) * (b - c))),
    cdf: (x) => (x <= a ? 0 : x >= b ? 1 : x <= c ? ((x - a) ** 2) / ((b - a) * (c - a)) : 1 - ((b - x) ** 2) / ((b - a) * (b - c))),
  });
  D.logistic = (mu = 0, s = 1) => cont({
    name: "logistic", params: { mu, s }, support: [-Infinity, Infinity], mean: mu, var: (s * s * PI * PI) / 3,
    pdf: (x) => { const e = Math.exp(-(x - mu) / s); return e / (s * (1 + e) * (1 + e)); }, cdf: (x) => 1 / (1 + Math.exp(-(x - mu) / s)), q: (p) => mu + s * Math.log(p / (1 - p)),
  });
  /** 혼합 분포: [[가중치, dist], …] */
  D.mixture = (parts) => {
    const W = parts.reduce((a, p) => a + p[0], 0), P = parts.map(([w, d]) => [w / W, d]);
    const mean = P.reduce((a, [w, d]) => a + w * d.mean, 0);
    const lo = Math.min(...P.map(([, d]) => d.support[0])), hi = Math.max(...P.map(([, d]) => d.support[1]));
    return cont({
      name: "mixture", support: [lo, hi], mean, var: P.reduce((a, [w, d]) => a + w * (d.var + (d.mean - mean) ** 2), 0),
      pdf: (x) => P.reduce((a, [w, d]) => a + w * d.pdf(x), 0), cdf: (x) => P.reduce((a, [w, d]) => a + w * d.cdf(x), 0),
      sample: (R = Stat.random) => { let u = R.u(); for (const [w, d] of P) { if ((u -= w) < 0) return d.sample(R); } return P[P.length - 1][1].sample(R); },
    });
  };

  // 이산
  D.bernoulli = (p) => disc({ name: "bernoulli", params: { p }, support: [0, 1], mean: p, var: p * (1 - p), pmf: (k) => (k === 1 ? p : k === 0 ? 1 - p : 0), cdf: (k) => (k < 0 ? 0 : k < 1 ? 1 - p : 1) });
  D.binomial = (n, p) => disc({
    name: "binomial", params: { n, p }, support: [0, n], mean: n * p, var: n * p * (1 - p),
    pmf: (k) => { if (k < 0 || k > n || k !== Math.floor(k)) return 0; if (p === 0) return k === 0 ? 1 : 0; if (p === 1) return k === n ? 1 : 0; return Math.exp(Stat.lchoose(n, k) + k * Math.log(p) + (n - k) * Math.log1p(-p)); },
    cdf: (k) => { k = Math.floor(k); if (k < 0) return 0; if (k >= n) return 1; return betaI(1 - p, n - k, k + 1); },
    sample: (R = Stat.random) => R.binom(n, p),
  });
  D.poisson = (lam) => disc({
    name: "poisson", params: { lambda: lam }, support: [0, Infinity], mean: lam, var: lam,
    pmf: (k) => (k < 0 || k !== Math.floor(k) ? 0 : lam === 0 ? (k === 0 ? 1 : 0) : Math.exp(k * Math.log(lam) - lam - Stat.lfactorial(k))),
    cdf: (k) => (k < 0 ? 0 : gammaQ(Math.floor(k) + 1, lam)),
    sample: (R = Stat.random) => R.poisson(lam),
  });
  D.geometric = (p) => disc({
    name: "geometric", params: { p }, support: [1, Infinity], mean: 1 / p, var: (1 - p) / (p * p),
    pmf: (k) => (k < 1 || k !== Math.floor(k) ? 0 : p * Math.pow(1 - p, k - 1)), cdf: (k) => (k < 1 ? 0 : 1 - Math.pow(1 - p, Math.floor(k))),
    q: (u) => Math.max(1, Math.ceil(Math.log1p(-u) / Math.log1p(-p) - 1e-12)),
  });
  D.negbinom = (r, p) => disc({
    name: "negbinom", params: { r, p }, support: [r, Infinity], mean: r / p, var: (r * (1 - p)) / (p * p),
    pmf: (k) => (k < r || k !== Math.floor(k) ? 0 : Math.exp(Stat.lchoose(k - 1, r - 1) + r * Math.log(p) + (k - r) * Math.log1p(-p))),
    cdf: (k) => (k < r ? 0 : betaI(p, r, Math.floor(k) - r + 1)),
  });
  D.hypergeom = (N, K, n) => disc({
    name: "hypergeom", params: { N, K, n }, support: [Math.max(0, n - (N - K)), Math.min(n, K)],
    mean: (n * K) / N, var: (n * K * (N - K) * (N - n)) / (N * N * (N - 1 || 1)),
    pmf: (k) => (k !== Math.floor(k) ? 0 : Math.exp(Stat.lchoose(K, k) + Stat.lchoose(N - K, n - k) - Stat.lchoose(N, n))),
  });
  D.discreteUniform = (a, b) => disc({ name: "discreteUniform", params: { a, b }, support: [a, b], mean: (a + b) / 2, var: ((b - a + 1) ** 2 - 1) / 12, pmf: (k) => (k >= a && k <= b && k === Math.floor(k) ? 1 / (b - a + 1) : 0) });
  /** 임의 이산 분포: values, probs */
  D.custom = (vals, probs) => {
    const s = probs.reduce((a, b) => a + b, 0), P = probs.map((p) => p / s);
    const mean = vals.reduce((a, v, i) => a + v * P[i], 0);
    const o = disc({
      name: "custom", support: [Math.min(...vals), Math.max(...vals)], mean, var: vals.reduce((a, v, i) => a + (v - mean) ** 2 * P[i], 0),
      pmf: (k) => { let t = 0; vals.forEach((v, i) => { if (v === k) t += P[i]; }); return t; },
      cdf: (k) => vals.reduce((a, v, i) => a + (v <= k ? P[i] : 0), 0),
      sample: (R = Stat.random) => vals[R.choice(P)],
    });
    o.q = (p) => { const idx = vals.map((v, i) => i).sort((i, j) => vals[i] - vals[j]); let c = 0; for (const i of idx) { c += P[i]; if (c >= p - 1e-12) return vals[i]; } return vals[idx[idx.length - 1]]; };
    o.table = () => vals.map((v, i) => [v, P[i]]);
    return o;
  };
  /** 다항 분포 확률 P(x1..xk) */
  Stat.multinomialPmf = (x, p) => { const n = x.reduce((a, b) => a + b, 0); let l = Stat.lfactorial(n); x.forEach((xi, i) => { l += xi * Math.log(p[i]) - Stat.lfactorial(xi); }); return Math.exp(l); };
  /** 이변량 정규 밀도 */
  Stat.dbvnorm = (x, y, mx = 0, my = 0, sx = 1, sy = 1, rho = 0) => {
    const zx = (x - mx) / sx, zy = (y - my) / sy, q = (zx * zx - 2 * rho * zx * zy + zy * zy) / (1 - rho * rho);
    return Math.exp(-q / 2) / (2 * PI * sx * sy * Math.sqrt(1 - rho * rho));
  };
  /** 이변량 정규 표본 [x, y] */
  Stat.rbvnorm = (R, mx, my, sx, sy, rho) => { const z1 = R.normal(), z2 = R.normal(); return [mx + sx * z1, my + sy * (rho * z1 + Math.sqrt(1 - rho * rho) * z2)]; };

  // 지름길
  Stat.pt = (x, df) => D.t(df).cdf(x);
  Stat.qt = (p, df) => (isFinite(df) ? D.t(df).q(p) : qnormStd(p));
  Stat.pchisq = (x, df) => gammaP(df / 2, x / 2);
  Stat.qchisq = (p, df) => D.chi2(df).q(p);
  Stat.pf = (x, d1, d2) => D.f(d1, d2).cdf(x);
  Stat.qf = (p, d1, d2) => D.f(d1, d2).q(p);
  Stat.pbinom = (k, n, p) => D.binomial(n, p).cdf(k);
  Stat.dbinom = (k, n, p) => D.binomial(n, p).pmf(k);
  Stat.ppois = (k, l) => D.poisson(l).cdf(k);
  Stat.dpois = (k, l) => D.poisson(l).pmf(k);

  /** 비중심 t 분포 cdf P(T' ≤ x), T' = (Z + δ)/√(V/df) — 수치 적분(검정력 계산용) */
  Stat.pnct = function (x, df, delta) {
    if (!isFinite(df)) return pnorm(x - delta);
    // ∫ Φ(x·s − δ) f_S(s) ds, S = √(V/df)
    const lf = (s) => Math.log(2) + (df / 2) * Math.log(df / 2) - lgamma(df / 2) + (df - 1) * Math.log(s) - (df * s * s) / 2;
    const sd = 1 / Math.sqrt(2 * df), lo = Math.max(1e-9, 1 - 12 * sd - 0.2), hi = 1 + 12 * sd + 0.5;
    const N = 800, h = (hi - lo) / N;
    let sum = 0;
    for (let i = 0; i <= N; i++) { const s = lo + i * h, w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2; sum += w * pnorm(x * s - delta) * Math.exp(lf(s)); }
    // 작은 df에서 s가 0 근처까지 퍼지는 부분 보정: 아래 구간을 따로 적분
    let low = 0;
    if (lo > 1e-9) { const M = 400, g = lo / M; for (let i = 0; i <= M; i++) { const s = Math.max(1e-12, i * g), w = i === 0 || i === M ? 1 : i % 2 ? 4 : 2; low += w * pnorm(x * s - delta) * Math.exp(lf(s)); } low *= g / 3; }
    return Math.min(1, Math.max(0, (sum * h) / 3 + low));
  };

  /** 스튜던트화 범위 분포 cdf P(Q ≤ q; k 집단, df) — 투키 HSD용 수치 적분 */
  Stat.ptukey = function (q, k, df = Infinity) {
    if (q <= 0) return 0;
    const prange = (w) => {
      // P(R ≤ w) = k ∫ φ(z) [Φ(z) − Φ(z − w)]^{k−1} dz
      const N = 240, lo = -8, hi = 8 + w, h = (hi - lo) / N;
      let s = 0;
      for (let i = 0; i <= N; i++) { const z = lo + i * h, wt = i === 0 || i === N ? 1 : i % 2 ? 4 : 2; const d = pnorm(z) - pnorm(z - w); s += wt * dnorm(z) * (d > 0 ? Math.pow(d, k - 1) : 0); }
      return Math.min(1, (k * s * h) / 3);
    };
    if (!isFinite(df) || df > 5000) return prange(q);
    const lf = (s) => Math.log(2) + (df / 2) * Math.log(df / 2) - lgamma(df / 2) + (df - 1) * Math.log(s) - (df * s * s) / 2;
    const sd = 1 / Math.sqrt(2 * df), lo = Math.max(1e-6, 1 - 10 * sd - 0.1), hi = 1 + 12 * sd + 0.3;
    const N = df < 10 ? 400 : 160;
    // 작은 df는 s가 0까지, 큰 쪽 꼬리가 길다
    const a = df < 10 ? 1e-6 : lo, b = df < 10 ? 6 : hi, h = (b - a) / N;
    let s = 0;
    for (let i = 0; i <= N; i++) { const x = a + i * h, wt = i === 0 || i === N ? 1 : i % 2 ? 4 : 2; s += wt * Math.exp(lf(x)) * prange(q * x); }
    return Math.min(1, (s * h) / 3);
  };
  Stat.qtukey = (p, k, df = Infinity) => { let a = 0, b = 20; while (Stat.ptukey(b, k, df) < p && b < 1e4) { a = b; b *= 2; } // 할선법 + 괄호 유지(보통 6–10회 평가)
    let fa = Stat.ptukey(a, k, df) - p, fb = Stat.ptukey(b, k, df) - p;
    for (let i = 0; i < 40 && b - a > 1e-6 * b; i++) {
      let m = a - (fa * (b - a)) / (fb - fa);
      if (!(m > a && m < b) || i % 3 === 2) m = (a + b) / 2;
      const fm = Stat.ptukey(m, k, df) - p;
      if (Math.abs(fm) < 1e-10) return m;
      if (fm < 0) { a = m; fa = fm; } else { b = m; fb = fm; }
    }
    return (a + b) / 2; };

  /* ------------------------------------------------------------ 기술 통계 */
  Stat.sum = (x) => { let s = 0; for (const v of x) s += v; return s; };
  Stat.mean = (x) => Stat.sum(x) / x.length;
  /** 분산: ddof=1(표본, 기본) 또는 0(모집단) */
  Stat.var = (x, ddof = 1) => { const m = Stat.mean(x); let s = 0; for (const v of x) s += (v - m) * (v - m); return s / (x.length - ddof); };
  Stat.sd = (x, ddof = 1) => Math.sqrt(Stat.var(x, ddof));
  Stat.se = (x) => Stat.sd(x) / Math.sqrt(x.length);
  Stat.min = (x) => x.reduce((a, b) => (b < a ? b : a), Infinity);
  Stat.max = (x) => x.reduce((a, b) => (b > a ? b : a), -Infinity);
  Stat.sorted = (x) => Float64Array.from(x).sort();
  /** 분위수(R type 7 선형 보간). p는 수 또는 배열 */
  Stat.quantile = (x, p, isSorted = false) => {
    const s = isSorted ? x : Stat.sorted(x), n = s.length;
    const one = (pp) => { const h = (n - 1) * pp, lo = Math.floor(h), hi = Math.min(n - 1, lo + 1); return s[lo] + (h - lo) * (s[hi] - s[lo]); };
    return isArr(p) ? p.map(one) : one(p);
  };
  Stat.median = (x) => Stat.quantile(x, 0.5);
  Stat.iqr = (x) => { const [a, b] = Stat.quantile(x, [0.25, 0.75]); return b - a; };
  /** 최빈값들(동률이면 여러 개) */
  Stat.mode = (x) => { const m = new Map(); x.forEach((v) => m.set(v, (m.get(v) || 0) + 1)); const top = Math.max(...m.values()); return [...m].filter(([, c]) => c === top).map(([v]) => v).sort((a, b) => a - b); };
  Stat.mad = (x) => { const m = Stat.median(x); return Stat.median(x.map((v) => Math.abs(v - m))); };
  /** 절사 평균(양쪽 frac씩 버림) */
  Stat.trimmedMean = (x, frac = 0.1) => { const s = Stat.sorted(x), k = Math.floor(s.length * frac); return Stat.mean(Array.from(s.slice(k, s.length - k))); };
  /** 왜도(표본 보정 G1, 엑셀 SKEW와 같음) */
  Stat.skew = (x) => { const n = x.length, m = Stat.mean(x), s = Stat.sd(x); let t = 0; for (const v of x) t += ((v - m) / s) ** 3; return (n / ((n - 1) * (n - 2))) * t; };
  /** 초과 첨도(표본 보정 G2, 엑셀 KURT와 같음) */
  Stat.kurt = (x) => { const n = x.length, m = Stat.mean(x), s = Stat.sd(x); let t = 0; for (const v of x) t += ((v - m) / s) ** 4; return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * t - (3 * (n - 1) ** 2) / ((n - 2) * (n - 3)); };
  Stat.cov = (x, y, ddof = 1) => { const mx = Stat.mean(x), my = Stat.mean(y); let s = 0; for (let i = 0; i < x.length; i++) s += (x[i] - mx) * (y[i] - my); return s / (x.length - ddof); };
  Stat.cor = (x, y) => Stat.cov(x, y) / (Stat.sd(x) * Stat.sd(y));
  /** 순위(동률은 평균 순위, 1부터) */
  Stat.rank = (x) => { const idx = x.map((v, i) => i).sort((a, b) => x[a] - x[b]), r = new Array(x.length); for (let i = 0; i < idx.length; ) { let j = i; while (j + 1 < idx.length && x[idx[j + 1]] === x[idx[i]]) j++; const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = avg; i = j + 1; } return r; };
  Stat.spearman = (x, y) => Stat.cor(Stat.rank(x), Stat.rank(y));
  Stat.zscores = (x) => { const m = Stat.mean(x), s = Stat.sd(x); return x.map((v) => (v - m) / s); };
  Stat.cumsum = (x) => { let s = 0; return x.map((v) => (s += v)); };
  Stat.linspace = (a, b, n) => Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
  Stat.seq = (a, b, step = 1) => { const out = []; for (let v = a; v <= b + 1e-12; v += step) out.push(v); return out; };
  /** 요약: n, mean, sd, min, q1, median, q3, max, iqr, range */
  Stat.summary = (x) => { const s = Stat.sorted(x), [q1, med, q3] = Stat.quantile(s, [0.25, 0.5, 0.75], true); return { n: s.length, mean: Stat.mean(s), sd: s.length > 1 ? Stat.sd(s) : 0, min: s[0], q1, median: med, q3, max: s[s.length - 1], iqr: q3 - q1, range: s[s.length - 1] - s[0] }; };
  /** 상자 그림 통계: 수염은 1.5·IQR 안의 가장 먼 자료, 그 밖은 이상값 */
  Stat.boxStats = (x, k = 1.5) => {
    const S = Stat.summary(x), lo = S.q1 - k * S.iqr, hi = S.q3 + k * S.iqr;
    const inside = x.filter((v) => v >= lo && v <= hi);
    return Object.assign(S, { whiskerLo: Stat.min(inside), whiskerHi: Stat.max(inside), fenceLo: lo, fenceHi: hi, outliers: x.filter((v) => v < lo || v > hi) });
  };
  /** 계급 수 규칙 */
  Stat.bins = {
    sturges: (x) => Math.ceil(Math.log2(x.length) + 1),
    sqrt: (x) => Math.ceil(Math.sqrt(x.length)),
    scott: (x) => 3.49 * Stat.sd(x) * Math.pow(x.length, -1 / 3), // 폭
    fd: (x) => 2 * Stat.iqr(x) * Math.pow(x.length, -1 / 3), // 폭
  };
  /** 히스토그램: opts {bins | width, range:[a,b], start}. → {edges, counts, width, n, density[]} */
  Stat.hist = (x, opts = {}) => {
    let [a, b] = opts.range || [Stat.min(x), Stat.max(x)];
    let w = opts.width, k;
    if (w) { if (opts.start != null) a = opts.start; k = Math.max(1, Math.ceil((b - a) / w - 1e-9)); if (a + k * w <= b) k++; b = a + k * w; }
    else { k = opts.bins || Stat.bins.sturges(x); if (b === a) b = a + 1; w = (b - a) / k; }
    const counts = new Array(k).fill(0);
    let n = 0;
    for (const v of x) { if (v < a || v > b) continue; let i = Math.floor((v - a) / w + 1e-9); if (i >= k) i = k - 1; counts[i]++; n++; }
    const edges = Array.from({ length: k + 1 }, (_, i) => a + i * w);
    return { edges, counts, width: w, n, density: counts.map((c) => c / (x.length * w)), rel: counts.map((c) => c / x.length) };
  };
  /** 커널 밀도 추정(가우스). bw 생략 시 실버먼 규칙. → f(t) */
  Stat.kde = (x, bw) => {
    const n = x.length;
    if (!bw) bw = 0.9 * Math.min(Stat.sd(x), Stat.iqr(x) / 1.34 || Stat.sd(x)) * Math.pow(n, -0.2);
    const f = (t) => { let s = 0; for (const v of x) { const z = (t - v) / bw; s += Math.exp(-0.5 * z * z); } return s / (n * bw * Math.sqrt(2 * PI)); };
    f.bw = bw;
    return f;
  };
  /** 경험적 누적 분포 함수 */
  Stat.ecdf = (x) => { const s = Stat.sorted(x), n = s.length; const F = (t) => { let lo = 0, hi = n; while (lo < hi) { const m = (lo + hi) >> 1; if (s[m] <= t) lo = m + 1; else hi = m; } return lo / n; }; F.sorted = s; return F; };
  /** 정규 점수(블롬 (i−3/8)/(n+1/4)) — Q–Q 그림·효과 정규 확률 그림 */
  Stat.normalScores = (n) => Array.from({ length: n }, (_, i) => qnormStd((i + 1 - 0.375) / (n + 0.25)));
  /** Q–Q 그림 점 [[이론, 표본]] */
  Stat.qqPoints = (x, dist = D.normal()) => { const s = Stat.sorted(x), n = s.length; return Array.from(s, (v, i) => [dist.q((i + 1 - 0.375) / (n + 0.25)), v]); };

  /* ------------------------------------------------------------ 추론: 구간과 검정 */
  const tail = (cdfAt, alt) => (alt === "less" ? cdfAt : alt === "greater" ? 1 - cdfAt : 2 * Math.min(cdfAt, 1 - cdfAt));
  Stat.pFromZ = (z, alt = "two") => tail(pnorm(z), alt);
  Stat.pFromT = (t, df, alt = "two") => tail(Stat.pt(t, df), alt);
  /** 임계값: alt 양측이면 상위 α/2 */
  Stat.zCrit = (alpha = 0.05, alt = "two") => qnormStd(1 - (alt === "two" ? alpha / 2 : alpha));
  Stat.tCrit = (alpha, df, alt = "two") => Stat.qt(1 - (alt === "two" ? alpha / 2 : alpha), df);

  /** 평균의 z 구간(σ 앎) */
  Stat.zInterval = (mean, sigma, n, conf = 0.95) => { const z = qnormStd(1 - (1 - conf) / 2), e = (z * sigma) / Math.sqrt(n); return { lo: mean - e, hi: mean + e, margin: e, crit: z }; };
  /** 평균의 t 구간: (자료 배열) 또는 (mean, sd, n) */
  Stat.tInterval = (a, b, c, d) => {
    let mean, sd, n, conf;
    if (isArr(a)) { mean = Stat.mean(a); sd = Stat.sd(a); n = a.length; conf = b == null ? 0.95 : b; } else { mean = a; sd = b; n = c; conf = d == null ? 0.95 : d; }
    const t = Stat.qt(1 - (1 - conf) / 2, n - 1), e = (t * sd) / Math.sqrt(n);
    return { lo: mean - e, hi: mean + e, margin: e, crit: t, mean, sd, n, df: n - 1 };
  };
  /** 비율의 구간: method "wald" | "wilson"(기본) | "exact"(클로퍼–피어슨) | "agresti" */
  Stat.propInterval = (x, n, conf = 0.95, method = "wilson") => {
    const p = x / n, z = qnormStd(1 - (1 - conf) / 2), a = 1 - conf;
    if (method === "wald") { const e = z * Math.sqrt((p * (1 - p)) / n); return { lo: p - e, hi: p + e, p }; }
    if (method === "agresti") { const nt = n + z * z, pt = (x + (z * z) / 2) / nt, e = z * Math.sqrt((pt * (1 - pt)) / nt); return { lo: pt - e, hi: pt + e, p }; }
    if (method === "exact") return { lo: x === 0 ? 0 : D.beta(x, n - x + 1).q(a / 2), hi: x === n ? 1 : D.beta(x + 1, n - x).q(1 - a / 2), p };
    const den = 1 + (z * z) / n, c = (p + (z * z) / (2 * n)) / den, e = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / den;
    return { lo: c - e, hi: c + e, p };
  };
  /** 분산의 카이제곱 구간 */
  Stat.varInterval = (s2, n, conf = 0.95) => { const a = 1 - conf, df = n - 1; return { lo: (df * s2) / Stat.qchisq(1 - a / 2, df), hi: (df * s2) / Stat.qchisq(a / 2, df) }; };
  /** 예측 구간(새 관측 하나)과 정규 공차 구간 계수(하우–근사) */
  Stat.predInterval = (mean, sd, n, conf = 0.95) => { const t = Stat.qt(1 - (1 - conf) / 2, n - 1), e = t * sd * Math.sqrt(1 + 1 / n); return { lo: mean - e, hi: mean + e }; };
  Stat.tolFactor = (n, coverage = 0.99, conf = 0.95) => { const z = qnormStd((1 + coverage) / 2), df = n - 1; return z * Math.sqrt((df * (1 + 1 / n)) / Stat.qchisq(1 - conf, df)); };
  /** 표본 크기: 평균(오차 한계 E), 비율(오차 한계 E, 예상 p) */
  Stat.nForMean = (sigma, E, conf = 0.95) => Math.ceil(((qnormStd(1 - (1 - conf) / 2) * sigma) / E) ** 2);
  Stat.nForProp = (E, p = 0.5, conf = 0.95) => Math.ceil(((qnormStd(1 - (1 - conf) / 2) ** 2) * p * (1 - p)) / (E * E));

  /** 단일 표본 z 검정 */
  Stat.zTest = (mean, mu0, sigma, n, alt = "two") => { const z = (mean - mu0) / (sigma / Math.sqrt(n)); return { stat: z, z, p: Stat.pFromZ(z, alt) }; };
  /** 단일 표본 t 검정 */
  Stat.tTest = (x, mu0 = 0, alt = "two") => { const n = x.length, m = Stat.mean(x), s = Stat.sd(x), t = (m - mu0) / (s / Math.sqrt(n)); return { stat: t, t, df: n - 1, p: Stat.pFromT(t, n - 1, alt), mean: m, sd: s, n, se: s / Math.sqrt(n) }; };
  /** 요약값으로 t 검정 */
  Stat.tTestStats = (mean, sd, n, mu0 = 0, alt = "two") => { const t = (mean - mu0) / (sd / Math.sqrt(n)); return { stat: t, t, df: n - 1, p: Stat.pFromT(t, n - 1, alt) }; };
  /** 두 표본 t 검정: equalVar=false면 웰치(기본) */
  Stat.tTest2 = (x, y, { equalVar = false, alt = "two" } = {}) => {
    const n1 = x.length, n2 = y.length, m1 = Stat.mean(x), m2 = Stat.mean(y), v1 = Stat.var(x), v2 = Stat.var(y);
    return Stat.tTest2Stats(m1, Math.sqrt(v1), n1, m2, Math.sqrt(v2), n2, { equalVar, alt });
  };
  Stat.tTest2Stats = (m1, s1, n1, m2, s2, n2, { equalVar = false, alt = "two" } = {}) => {
    const v1 = s1 * s1, v2 = s2 * s2;
    let se, df, sp;
    if (equalVar) { sp = Math.sqrt(((n1 - 1) * v1 + (n2 - 1) * v2) / (n1 + n2 - 2)); se = sp * Math.sqrt(1 / n1 + 1 / n2); df = n1 + n2 - 2; }
    else { const a = v1 / n1, b = v2 / n2; se = Math.sqrt(a + b); df = ((a + b) ** 2) / ((a * a) / (n1 - 1) + (b * b) / (n2 - 1)); }
    const t = (m1 - m2) / se;
    return { stat: t, t, df, p: Stat.pFromT(t, df, alt), diff: m1 - m2, se, sp };
  };
  /** 대응 t 검정 */
  Stat.tTestPaired = (x, y, alt = "two") => Stat.tTest(x.map((v, i) => v - y[i]), 0, alt);
  /** 비율 z 검정 */
  Stat.propTest = (x, n, p0, alt = "two") => { const p = x / n, z = (p - p0) / Math.sqrt((p0 * (1 - p0)) / n); return { stat: z, z, p: Stat.pFromZ(z, alt), phat: p }; };
  /** 정확 이항 검정(양측: 관측 확률 이하인 값들의 합) */
  Stat.binomTest = (x, n, p0, alt = "two") => {
    const B = D.binomial(n, p0);
    if (alt === "less") return { p: B.cdf(x) };
    if (alt === "greater") return { p: 1 - B.cdf(x - 1) };
    const px = B.pmf(x); let s = 0; for (let k = 0; k <= n; k++) { const q = B.pmf(k); if (q <= px * (1 + 1e-7)) s += q; } return { p: Math.min(1, s) };
  };
  /** 두 비율 z 검정(합동 비율) */
  Stat.prop2Test = (x1, n1, x2, n2, alt = "two") => { const p1 = x1 / n1, p2 = x2 / n2, pp = (x1 + x2) / (n1 + n2), z = (p1 - p2) / Math.sqrt(pp * (1 - pp) * (1 / n1 + 1 / n2)); return { stat: z, z, p: Stat.pFromZ(z, alt), p1, p2, pooled: pp }; };
  /** 분산 카이제곱 검정 */
  Stat.varTest = (s2, n, sigma0sq, alt = "two") => { const c = ((n - 1) * s2) / sigma0sq; return { stat: c, df: n - 1, p: tail(Stat.pchisq(c, n - 1), alt) }; };
  /** 두 분산 F 검정 */
  Stat.fTest = (s1sq, n1, s2sq, n2, alt = "two") => { const F = s1sq / s2sq; return { stat: F, F, df1: n1 - 1, df2: n2 - 1, p: tail(Stat.pf(F, n1 - 1, n2 - 1), alt) }; };

  /** 검정력: z 검정(평균 차 delta, 표준 편차 sigma, n) */
  Stat.powerZ = (delta, sigma, n, alpha = 0.05, alt = "two") => {
    const s = (delta * Math.sqrt(n)) / sigma;
    if (alt === "greater") return 1 - pnorm(qnormStd(1 - alpha) - s);
    if (alt === "less") return pnorm(-qnormStd(1 - alpha) - s);
    const z = qnormStd(1 - alpha / 2); return 1 - pnorm(z - s) + pnorm(-z - s);
  };
  /** 검정력: 단일/대응 t 검정(비중심 t). twoSample=true면 각 군 n인 두 표본 */
  Stat.powerT = (delta, sigma, n, alpha = 0.05, alt = "two", twoSample = false) => {
    const df = twoSample ? 2 * n - 2 : n - 1, ncp = (delta / sigma) * Math.sqrt(twoSample ? n / 2 : n);
    if (alt === "greater") return 1 - Stat.pnct(Stat.qt(1 - alpha, df), df, ncp);
    if (alt === "less") return Stat.pnct(-Stat.qt(1 - alpha, df), df, ncp);
    const t = Stat.qt(1 - alpha / 2, df); return 1 - Stat.pnct(t, df, ncp) + Stat.pnct(-t, df, ncp);
  };
  /** 원하는 검정력을 주는 표본 크기(z 근사) */
  Stat.nForPower = (delta, sigma, power = 0.8, alpha = 0.05, alt = "two") => Math.ceil((((qnormStd(1 - (alt === "two" ? alpha / 2 : alpha)) + qnormStd(power)) * sigma) / delta) ** 2);

  /** 카이제곱 적합도: obs, expected(개수 또는 확률). ddof: 추정한 모수 개수 */
  Stat.chi2GOF = (obs, exp, ddof = 0) => {
    const n = Stat.sum(obs), E = Math.abs(Stat.sum(exp) - 1) < 1e-9 ? exp.map((p) => p * n) : exp;
    let c = 0; obs.forEach((o, i) => { c += ((o - E[i]) ** 2) / E[i]; });
    const df = obs.length - 1 - ddof; return { stat: c, df, p: 1 - Stat.pchisq(c, df), expected: E };
  };
  /** 분할표 독립성 검정. correct: 2×2에서 예이츠 보정 */
  Stat.chi2Indep = (table, correct = false) => {
    const r = table.length, c = table[0].length, rs = table.map((row) => Stat.sum(row)), cs = table[0].map((_, j) => Stat.sum(table.map((row) => row[j]))), N = Stat.sum(rs);
    const E = table.map((row, i) => row.map((_, j) => (rs[i] * cs[j]) / N));
    let chi = 0;
    const resid = table.map((row, i) => row.map((o, j) => { const e = E[i][j]; let d = Math.abs(o - e); if (correct && r === 2 && c === 2) d = Math.max(0, d - 0.5); chi += (d * d) / e; return (o - e) / Math.sqrt(e); }));
    const df = (r - 1) * (c - 1);
    return { stat: chi, df, p: 1 - Stat.pchisq(chi, df), expected: E, residuals: resid, cramerV: Math.sqrt(chi / (N * (Math.min(r, c) - 1))) };
  };
  /** 피셔 정확 검정(2×2 [[a,b],[c,d]]) */
  Stat.fisherExact = (t, alt = "two") => {
    const [[a, b], [c, d]] = t, r1 = a + b, c1 = a + c, N = a + b + c + d;
    const H = D.hypergeom(N, r1, c1), lo = Math.max(0, c1 - (N - r1)), hi = Math.min(r1, c1), pa = H.pmf(a);
    let p = 0;
    if (alt === "less") for (let k = lo; k <= a; k++) p += H.pmf(k);
    else if (alt === "greater") for (let k = a; k <= hi; k++) p += H.pmf(k);
    else for (let k = lo; k <= hi; k++) { const q = H.pmf(k); if (q <= pa * (1 + 1e-7)) p += q; }
    return { p: Math.min(1, p), oddsRatio: (a * d) / (b * c) };
  };
  /** 만–휘트니 U(윌콕슨 순위합). 작은 표본·동률 없음이면 정확, 아니면 정규 근사(동률·연속성 보정) */
  Stat.mannWhitney = (x, y, alt = "two") => {
    const n1 = x.length, n2 = y.length, all = x.concat(y), r = Stat.rank(all);
    const R1 = Stat.sum(r.slice(0, n1)), U1 = R1 - (n1 * (n1 + 1)) / 2, U = Math.min(U1, n1 * n2 - U1);
    const ties = new Map(); all.forEach((v) => ties.set(v, (ties.get(v) || 0) + 1));
    const hasTies = [...ties.values()].some((t) => t > 1);
    let p;
    if (!hasTies && n1 * n2 <= 400) {
      // f[n1][n2][u] 개수 점화식
      const memo = new Map();
      const cnt = (m, n, u) => { if (u < 0) return 0; if (m === 0 || n === 0) return u === 0 ? 1 : 0; const key = m * 1e6 + n * 1e3 + u; if (memo.has(key)) return memo.get(key); const v = cnt(m - 1, n, u - n) + cnt(m, n - 1, u); memo.set(key, v); return v; };
      const tot = Stat.choose(n1 + n2, n1), cdf = (u) => { let s = 0; for (let k = 0; k <= u; k++) s += cnt(n1, n2, k); return s / tot; };
      if (alt === "less") p = cdf(U1); else if (alt === "greater") p = 1 - cdf(U1 - 1); else p = Math.min(1, 2 * cdf(U));
      return { U: U1, Umin: U, W: R1, p, exact: true };
    }
    const mu = (n1 * n2) / 2, N = n1 + n2; let tc = 0; ties.forEach((t) => { tc += t * t * t - t; });
    const sd = Math.sqrt(((n1 * n2) / 12) * (N + 1 - tc / (N * (N - 1))));
    const cc = alt === "two" ? 0.5 * Math.sign(U1 - mu) : alt === "greater" ? 0.5 : -0.5, z = (U1 - mu - cc) / sd;
    return { U: U1, Umin: U, W: R1, z, p: Stat.pFromZ(z, alt), exact: false };
  };
  /** 윌콕슨 부호 순위 검정(차이 d, 0은 버림) */
  Stat.wilcoxonSigned = (d, alt = "two") => {
    d = d.filter((v) => v !== 0);
    const n = d.length, r = Stat.rank(d.map(Math.abs));
    let Wp = 0; d.forEach((v, i) => { if (v > 0) Wp += r[i]; });
    const hasTies = new Set(d.map(Math.abs)).size < n, T = n * (n + 1) / 2;
    if (!hasTies && n <= 30) {
      const dist = new Array(T + 1).fill(0); dist[0] = 1;
      for (let k = 1; k <= n; k++) for (let s = T; s >= k; s--) dist[s] += dist[s - k];
      const tot = Math.pow(2, n), cdf = (w) => { let s = 0; for (let i = 0; i <= Math.min(T, Math.floor(w)); i++) s += dist[i]; return s / tot; };
      let p; if (alt === "less") p = cdf(Wp); else if (alt === "greater") p = 1 - cdf(Wp - 1); else p = Math.min(1, 2 * Math.min(cdf(Wp), 1 - cdf(Wp - 1)));
      return { W: Wp, n, p, exact: true };
    }
    const mu = T / 2; let tc = 0; const m = new Map(); d.forEach((v) => m.set(Math.abs(v), (m.get(Math.abs(v)) || 0) + 1)); m.forEach((t) => { tc += t * t * t - t; });
    const sd = Math.sqrt((n * (n + 1) * (2 * n + 1)) / 24 - tc / 48), z = (Wp - mu) / sd;
    return { W: Wp, n, z, p: Stat.pFromZ(z, alt), exact: false };
  };
  /** 부호 검정(중앙값 m0) */
  Stat.signTest = (x, m0 = 0, alt = "two") => { const pos = x.filter((v) => v > m0).length, n = x.filter((v) => v !== m0).length; return Object.assign({ pos, n }, Stat.binomTest(pos, n, 0.5, alt)); };
  /** 콜모고로프 분포 꼬리 Q_KS(λ) */
  Stat.qks = (lam) => { if (lam < 0.2) return 1; let s = 0; for (let j = 1; j <= 100; j++) { const t = 2 * Math.pow(-1, j - 1) * Math.exp(-2 * j * j * lam * lam); s += t; if (Math.abs(t) < 1e-12) break; } return Math.max(0, Math.min(1, s)); };
  /** 콜모고로프 통계량의 정확한 분포 P(D_n < d) — 마샬리아–창–왕(2003) */
  Stat.pkolmogorov = function (n, d) {
    const s0 = d * d * n;
    if (s0 > 7.24 || (s0 > 3.76 && n > 99)) return 1 - 2 * Math.exp(-(2.000071 + 0.331 / Math.sqrt(n) + 1.409 / n) * s0);
    const k = Math.floor(n * d) + 1, m = 2 * k - 1, h = k - n * d;
    const H = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => (i - j + 1 < 0 ? 0 : 1)));
    for (let i = 0; i < m; i++) { H[i][0] -= Math.pow(h, i + 1); H[m - 1][i] -= Math.pow(h, m - i); }
    H[m - 1][0] += 2 * h - 1 > 0 ? Math.pow(2 * h - 1, m) : 0;
    for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) if (i - j + 1 > 0) for (let g = 1; g <= i - j + 1; g++) H[i][j] /= g;
    const pw = (e) => {
      if (e === 1) return { V: H, ex: 0 };
      const h2 = pw(Math.floor(e / 2)); let V = M.mul(h2.V, h2.V), ex = 2 * h2.ex;
      if (e % 2) V = M.mul(H, V);
      const c = Math.floor(m / 2);
      if (V[c][c] > 1e140) { V = V.map((r) => r.map((v) => v * 1e-140)); ex += 140; }
      return { V, ex };
    };
    const P = pw(n);
    let s = P.V[k - 1][k - 1], ex = P.ex;
    for (let i = 1; i <= n; i++) { s = (s * i) / n; if (s < 1e-140) { s *= 1e140; ex -= 140; } }
    return Math.min(1, Math.max(0, s * Math.pow(10, ex)));
  };
  /** 단일 표본 KS 검정(cdf 함수와 비교; n ≤ 300이면 정확한 p, 그 이상은 근사) */
  Stat.ksTest = (x, cdf) => {
    const s = Stat.sorted(x), n = s.length; let Dm = 0, at = s[0];
    for (let i = 0; i < n; i++) { const F = cdf(s[i]), d = Math.max((i + 1) / n - F, F - i / n); if (d > Dm) { Dm = d; at = s[i]; } }
    const en = Math.sqrt(n);
    return { D: Dm, at, p: n <= 300 ? 1 - Stat.pkolmogorov(n, Dm) : Stat.qks((en + 0.12 + 0.11 / en) * Dm) };
  };
  /** 두 표본 KS 검정 */
  Stat.ks2 = (x, y) => {
    const a = Stat.sorted(x), b = Stat.sorted(y), n = a.length, m = b.length; let i = 0, j = 0, Dm = 0;
    while (i < n && j < m) { const v = Math.min(a[i], b[j]); while (i < n && a[i] <= v) i++; while (j < m && b[j] <= v) j++; Dm = Math.max(Dm, Math.abs(i / n - j / m)); }
    const en = Math.sqrt((n * m) / (n + m)); return { D: Dm, p: Stat.qks((en + 0.12 + 0.11 / en) * Dm) };
  };
  /** 순열 검정(두 표본 평균 차). B회 무작위 재배치. → {obs, p, null:[…]} */
  Stat.permTest = (x, y, B = 2000, R = Stat.random, stat = (a, b) => Stat.mean(a) - Stat.mean(b)) => {
    const obs = stat(x, y), all = x.concat(y), n = x.length, nul = [];
    let c = 0;
    for (let k = 0; k < B; k++) { const s = R.shuffle(all), v = stat(s.slice(0, n), s.slice(n)); nul.push(v); if (Math.abs(v) >= Math.abs(obs) - 1e-12) c++; }
    return { obs, p: (c + 1) / (B + 1), null: nul };
  };
  /** 부트스트랩: 통계량 B개 → {stats, se, ci:[lo,hi](백분위)} */
  Stat.bootstrap = (x, stat = Stat.mean, B = 1000, R = Stat.random, conf = 0.95) => {
    const n = x.length, out = new Array(B);
    for (let b = 0; b < B; b++) { const s = new Array(n); for (let i = 0; i < n; i++) s[i] = x[Math.floor(R.u() * n)]; out[b] = stat(s); }
    const a = (1 - conf) / 2; return { stats: out, se: Stat.sd(out), ci: Stat.quantile(out, [a, 1 - a]) };
  };
  /** 다중 비교 보정 */
  Stat.bonferroni = (ps) => ps.map((p) => Math.min(1, p * ps.length));
  Stat.holm = (ps) => { const m = ps.length, idx = ps.map((p, i) => i).sort((a, b) => ps[a] - ps[b]), adj = new Array(m); let run = 0; idx.forEach((i, k) => { run = Math.max(run, Math.min(1, (m - k) * ps[i])); adj[i] = run; }); return adj; };
  Stat.bh = (ps) => { const m = ps.length, idx = ps.map((p, i) => i).sort((a, b) => ps[b] - ps[a]), adj = new Array(m); let run = 1; idx.forEach((i, k) => { run = Math.min(run, (ps[i] * m) / (m - k)); adj[i] = Math.min(1, run); }); return adj; };

  /* ------------------------------------------------------------ 선형 대수(작은 행렬) */
  const M = (Stat.mat = {
    T: (A) => A[0].map((_, j) => A.map((r) => r[j])),
    mul: (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0))),
    mulv: (A, v) => A.map((r) => r.reduce((s, a, k) => s + a * v[k], 0)),
    eye: (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))),
    /** 가우스–요르단 역행렬(부분 피벗) */
    inv(A) {
      const n = A.length, a = A.map((r, i) => r.concat(M.eye(n)[i]));
      for (let c = 0; c < n; c++) {
        let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r;
        if (Math.abs(a[p][c]) < 1e-300) throw new Error("singular");
        [a[c], a[p]] = [a[p], a[c]];
        const d = a[c][c]; for (let j = 0; j < 2 * n; j++) a[c][j] /= d;
        for (let r = 0; r < n; r++) if (r !== c) { const f = a[r][c]; if (f) for (let j = 0; j < 2 * n; j++) a[r][j] -= f * a[c][j]; }
      }
      return a.map((r) => r.slice(n));
    },
    solve: (A, b) => M.mulv(M.inv(A), b),
    pow(A, k) { let R = M.eye(A.length), B = A; while (k > 0) { if (k & 1) R = M.mul(R, B); B = M.mul(B, B); k >>= 1; } return R; },
    /** 2×2 대칭 행렬 고유값·고유벡터(신뢰 타원용) */
    eig2(a, b, d) { const tr = a + d, det = a * d - b * b, s = Math.sqrt(Math.max(0, (tr * tr) / 4 - det)), l1 = tr / 2 + s, l2 = tr / 2 - s, ang = Math.abs(b) < 1e-15 ? (a >= d ? 0 : PI / 2) : Math.atan2(l1 - a, b); return { l1, l2, angle: ang }; },
  });

  /* ------------------------------------------------------------ 회귀 */
  /** 단순 선형 회귀 y = a + b x */
  Stat.linreg = (x, y) => {
    const n = x.length, mx = Stat.mean(x), my = Stat.mean(y);
    let sxx = 0, sxy = 0, syy = 0;
    for (let i = 0; i < n; i++) { const dx = x[i] - mx, dy = y[i] - my; sxx += dx * dx; sxy += dx * dy; syy += dy * dy; }
    const b = sxy / sxx, a = my - b * mx, fitted = x.map((v) => a + b * v), resid = y.map((v, i) => v - fitted[i]);
    const sse = resid.reduce((s, e) => s + e * e, 0), df = n - 2, s2 = sse / df, s = Math.sqrt(s2);
    const seB = s / Math.sqrt(sxx), seA = s * Math.sqrt(1 / n + (mx * mx) / sxx), r = sxy / Math.sqrt(sxx * syy);
    const lev = x.map((v) => 1 / n + ((v - mx) ** 2) / sxx);
    const tq = (conf) => Stat.qt(1 - (1 - conf) / 2, df);
    return {
      a, b, intercept: a, slope: b, r, r2: r * r, n, df, sse, ssr: syy - sse, sst: syy, s, s2, sxx, sxy, syy, mx, my,
      seA, seB, tB: b / seB, pB: Stat.pFromT(b / seB, df), tA: a / seA, pA: Stat.pFromT(a / seA, df), F: (syy - sse) / s2,
      fitted, resid, leverage: lev, studentized: resid.map((e, i) => e / (s * Math.sqrt(1 - lev[i]))),
      cooks: resid.map((e, i) => ((e * e) / (2 * s2)) * (lev[i] / ((1 - lev[i]) ** 2))),
      predict: (x0) => a + b * x0,
      /** 평균 반응의 신뢰 구간 */
      ci: (x0, conf = 0.95) => { const yh = a + b * x0, e = tq(conf) * s * Math.sqrt(1 / n + ((x0 - mx) ** 2) / sxx); return { fit: yh, lo: yh - e, hi: yh + e }; },
      /** 새 관측의 예측 구간 */
      pi: (x0, conf = 0.95) => { const yh = a + b * x0, e = tq(conf) * s * Math.sqrt(1 + 1 / n + ((x0 - mx) ** 2) / sxx); return { fit: yh, lo: yh - e, hi: yh + e }; },
      ciB: (conf = 0.95) => [b - tq(conf) * seB, b + tq(conf) * seB],
      ciA: (conf = 0.95) => [a - tq(conf) * seA, a + tq(conf) * seA],
    };
  };
  /** 다중 회귀: X는 행 배열(절편 열 자동 추가, intercept=false로 끔) */
  Stat.mlr = (X, y, { intercept = true } = {}) => {
    const A = X.map((r) => (intercept ? [1].concat(isArr(r) ? r : [r]) : isArr(r) ? r.slice() : [r]));
    const n = A.length, p = A[0].length, At = M.T(A), XtXi = M.inv(M.mul(At, A)), beta = M.mulv(XtXi, M.mulv(At, y));
    const fitted = A.map((r) => r.reduce((s, v, k) => s + v * beta[k], 0)), resid = y.map((v, i) => v - fitted[i]);
    const sse = resid.reduce((s, e) => s + e * e, 0), my = Stat.mean(y), sst = y.reduce((s, v) => s + (v - my) ** 2, 0);
    const df = n - p, s2 = sse / df, se = XtXi.map((r, i) => Math.sqrt(s2 * r[i])), t = beta.map((b, i) => b / se[i]);
    const k = intercept ? p - 1 : p, r2 = intercept ? 1 - sse / sst : 1 - sse / y.reduce((s, v) => s + v * v, 0);
    const lev = A.map((r) => { const v = M.mulv(XtXi, r); return r.reduce((s, x, i) => s + x * v[i], 0); });
    const F = ((sst - sse) / k) / s2;
    return {
      beta, se, t, p: t.map((tv) => Stat.pFromT(tv, df)), df, n, k, sse, sst, s2, s: Math.sqrt(s2), r2, adjR2: 1 - ((1 - r2) * (n - 1)) / df,
      F, pF: 1 - Stat.pf(F, k, df), fitted, resid, leverage: lev, XtXi,
      predict: (row) => { const r = intercept ? [1].concat(isArr(row) ? row : [row]) : row; return r.reduce((s, v, i) => s + v * beta[i], 0); },
    };
  };
  /** 다항 회귀(계수는 낮은 차수부터) */
  Stat.polyfit = (x, y, deg) => { const R = Stat.mlr(x.map((v) => Array.from({ length: deg }, (_, k) => Math.pow(v, k + 1))), y); R.coef = R.beta; R.predict = (v) => R.beta.reduce((s, b, k) => s + b * Math.pow(v, k), 0); return R; };
  /** 로지스틱 회귀(IRLS). X 행 배열(절편 자동), y ∈ {0,1} */
  Stat.logistic = (X, y, iters = 50) => {
    const A = X.map((r) => [1].concat(isArr(r) ? r : [r])), p = A[0].length;
    let b = new Array(p).fill(0), ll = 0, cov = null;
    for (let it = 0; it < iters; it++) {
      const mu = A.map((r) => 1 / (1 + Math.exp(-r.reduce((s, v, k) => s + v * b[k], 0))));
      const H = Array.from({ length: p }, () => new Array(p).fill(0)), g = new Array(p).fill(0);
      A.forEach((r, i) => { const w = mu[i] * (1 - mu[i]); for (let j = 0; j < p; j++) { g[j] += r[j] * (y[i] - mu[i]); for (let k = 0; k < p; k++) H[j][k] += w * r[j] * r[k]; } });
      cov = M.inv(H); const step = M.mulv(cov, g); b = b.map((v, i) => v + step[i]);
      if (Math.max(...step.map(Math.abs)) < 1e-10) break;
    }
    ll = A.reduce((s, r, i) => { const eta = r.reduce((t, v, k) => t + v * b[k], 0); return s + y[i] * eta - Math.log1p(Math.exp(eta)); }, 0);
    const se = cov.map((r, i) => Math.sqrt(r[i]));
    return { beta: b, se, z: b.map((v, i) => v / se[i]), logLik: ll, predict: (row) => 1 / (1 + Math.exp(-[1].concat(isArr(row) ? row : [row]).reduce((s, v, k) => s + v * b[k], 0))) };
  };

  /* ------------------------------------------------------------ 분산 분석 */
  /** 일원 분산 분석: groups = [[…], […], …] */
  Stat.anova1 = (groups) => {
    const all = groups.flat(), N = all.length, k = groups.length, gm = Stat.mean(all);
    const means = groups.map(Stat.mean), ns = groups.map((g) => g.length);
    const ssb = groups.reduce((s, g, i) => s + ns[i] * (means[i] - gm) ** 2, 0);
    const ssw = groups.reduce((s, g, i) => s + g.reduce((t, v) => t + (v - means[i]) ** 2, 0), 0);
    const dfb = k - 1, dfw = N - k, msb = ssb / dfb, msw = ssw / dfw, F = msb / msw;
    return { ssb, ssw, sst: ssb + ssw, dfb, dfw, dft: N - 1, msb, msw, F, p: 1 - Stat.pf(F, dfb, dfw), means, ns, grand: gm, eta2: ssb / (ssb + ssw) };
  };
  /** 투키 HSD 쌍별 비교 → [{i, j, diff, q, p, lo, hi}] */
  Stat.tukeyHSD = (groups, conf = 0.95) => {
    const A = Stat.anova1(groups), k = groups.length, qc = Stat.qtukey(conf, k, A.dfw), out = [];
    for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) {
      const se = Math.sqrt((A.msw / 2) * (1 / A.ns[i] + 1 / A.ns[j])), diff = A.means[i] - A.means[j], q = Math.abs(diff) / se;
      out.push({ i, j, diff, q, p: 1 - Stat.ptukey(q, k, A.dfw), lo: diff - qc * se, hi: diff + qc * se });
    }
    return { pairs: out, qcrit: qc, anova: A };
  };
  /** 이원 분산 분석(균형, 반복 r ≥ 1): data[i][j] = [반복값…] (i: 요인 A 수준, j: 요인 B 수준) */
  Stat.anova2 = (data) => {
    const a = data.length, b = data[0].length, r = data[0][0].length, N = a * b * r;
    const all = data.flat(2), gm = Stat.mean(all);
    const cell = data.map((row) => row.map(Stat.mean));
    const mA = data.map((row) => Stat.mean(row.flat())), mB = data[0].map((_, j) => Stat.mean(data.map((row) => row[j]).flat()));
    const ssA = b * r * mA.reduce((s, m) => s + (m - gm) ** 2, 0), ssB = a * r * mB.reduce((s, m) => s + (m - gm) ** 2, 0);
    const sst = all.reduce((s, v) => s + (v - gm) ** 2, 0);
    let ssAB = 0, ssE = 0;
    for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) { ssAB += r * (cell[i][j] - mA[i] - mB[j] + gm) ** 2; for (const v of data[i][j]) ssE += (v - cell[i][j]) ** 2; }
    const row = (ss, df, msE, dfE) => { const ms = ss / df, F = msE ? ms / msE : NaN; return { ss, df, ms, F, p: msE ? 1 - Stat.pf(F, df, dfE) : NaN }; };
    if (r === 1) { const dfE = (a - 1) * (b - 1), msE = ssAB / dfE; return { A: row(ssA, a - 1, msE, dfE), B: row(ssB, b - 1, msE, dfE), E: { ss: ssAB, df: dfE, ms: msE }, total: { ss: sst, df: N - 1 }, cell, mA, mB, grand: gm }; }
    const dfE = a * b * (r - 1), msE = ssE / dfE;
    return { A: row(ssA, a - 1, msE, dfE), B: row(ssB, b - 1, msE, dfE), AB: row(ssAB, (a - 1) * (b - 1), msE, dfE), E: { ss: ssE, df: dfE, ms: msE }, total: { ss: sst, df: N - 1 }, cell, mA, mB, grand: gm };
  };

  /* ------------------------------------------------------------ 실험 계획 */
  const doe = (Stat.doe = {
    /** 2ᵏ 완전 요인 설계(표준 순서, 첫 요인이 가장 빨리 바뀜) → 행 배열(±1) */
    full: (k) => Array.from({ length: 1 << k }, (_, i) => Array.from({ length: k }, (_, j) => ((i >> j) & 1 ? 1 : -1))),
    /** 부분 요인: 기본 요인 base개 + 생성자(예: ["ABC"] → 넷째 요인 D = ABC) */
    fraction: (base, gens) => doe.full(base).map((row) => row.concat(gens.map((g) => [...g].reduce((p, ch) => p * row[ch.charCodeAt(0) - 65], 1)))),
    letters: (k) => Array.from({ length: k }, (_, i) => String.fromCharCode(65 + i)),
    /** 효과 추정: 모든 교호 작용 포함(maxOrder까지). → [{name, effect, coef, cols}] */
    effects(X, y, maxOrder) {
      const k = X[0].length, n = X.length, L = doe.letters(k), out = [];
      maxOrder = maxOrder || k;
      for (let m = 1; m < 1 << k; m++) {
        const cols = []; for (let j = 0; j < k; j++) if ((m >> j) & 1) cols.push(j);
        if (cols.length > maxOrder) continue;
        let s = 0; for (let i = 0; i < n; i++) s += y[i] * cols.reduce((p, j) => p * X[i][j], 1);
        const eff = (2 * s) / n; out.push({ name: cols.map((j) => L[j]).join(""), effect: eff, coef: eff / 2, cols, order: cols.length });
      }
      return out.sort((a, b) => a.order - b.order || (a.name < b.name ? -1 : 1));
    },
    /** 별칭 구조: 정의 관계(예: ["ABCD"])에서 효과 name의 별칭 */
    alias(name, defining) { const mult = (a, b) => [...new Set([...a, ...b])].filter((c) => !(a.includes(c) && b.includes(c))).sort().join(""); return defining.map((w) => mult(name, w)); },
    /** 예측: 효과 목록으로 ŷ = ȳ + Σ coef·Π x */
    predict(eff, mean, x) { return eff.reduce((s, e) => s + e.coef * e.cols.reduce((p, j) => p * x[j], 1), mean); },
    /** 중심 합성 계획(코드 단위) k요인, α(기본 회전성 (2ᵏ)^{1/4}), 중심점 nc */
    ccd(k, alpha, nc = 3) { alpha = alpha || Math.pow(1 << k, 0.25); const pts = doe.full(k); for (let j = 0; j < k; j++) for (const s of [-1, 1]) { const r = new Array(k).fill(0); r[j] = s * alpha; pts.push(r); } for (let i = 0; i < nc; i++) pts.push(new Array(k).fill(0)); return pts; },
  });

  /* ------------------------------------------------------------ 확률 과정 */
  Stat.markov = {
    /** 분포 π를 n걸음 진행 */
    step: (pi, P, n = 1) => { let v = pi.slice(); for (let s = 0; s < n; s++) v = P[0].map((_, j) => v.reduce((a, x, i) => a + x * P[i][j], 0)); return v; },
    /** 흡수 연쇄: 일시 상태 인덱스 tr, 흡수 상태 ab → {N, t(흡수까지 기대 걸음), B(흡수 확률)} */
    absorb(P, tr, ab) { const Q = tr.map((i) => tr.map((j) => P[i][j])), R = tr.map((i) => ab.map((j) => P[i][j])); const N = M.inv(M.eye(tr.length).map((r, i) => r.map((v, j) => v - Q[i][j]))); return { N, t: N.map((r) => Stat.sum(r)), B: M.mul(N, R) }; },
    simulate(P, s0, n, R = Stat.random) { const path = [s0]; let s = s0; for (let i = 0; i < n; i++) { s = R.choice(P[s]); path.push(s); } return path; },
  };
  /** 정상 분포(πP = π, Σπ = 1) */
  Stat.markov.stationary = function (P) {
    const n = P.length, A = [], b = new Array(n).fill(0);
    for (let i = 0; i < n - 1; i++) A.push(Array.from({ length: n }, (_, j) => (i === j ? 1 : 0) - P[j][i]));
    A.push(new Array(n).fill(1)); b[n - 1] = 1;
    return M.solve(A, b).map((v) => (Math.abs(v) < 1e-15 ? 0 : v));
  };
  /** M/M/1 대기 행렬 */
  Stat.mm1 = (lam, mu) => { const rho = lam / mu; if (rho >= 1) return { rho, stable: false }; return { rho, stable: true, L: rho / (1 - rho), Lq: (rho * rho) / (1 - rho), W: 1 / (mu - lam), Wq: rho / (mu - lam), P0: 1 - rho, Pn: (n) => (1 - rho) * Math.pow(rho, n) }; };
  /** M/M/c (얼랑 C) */
  Stat.mmc = (lam, mu, c) => {
    const a = lam / mu, rho = a / c; if (rho >= 1) return { rho, stable: false };
    let s = 0; for (let k = 0; k < c; k++) s += Math.pow(a, k) / Stat.factorial(k);
    const last = Math.pow(a, c) / (Stat.factorial(c) * (1 - rho)), P0 = 1 / (s + last), Pw = last * P0;
    const Lq = (Pw * rho) / (1 - rho), Wq = Lq / lam; return { rho, stable: true, P0, Pwait: Pw, Lq, Wq, W: Wq + 1 / mu, L: Lq + a };
  };
  /** 표본 자기 상관 함수 r_k, k = 0..maxLag */
  Stat.acf = (x, maxLag = 20) => { const n = x.length, m = Stat.mean(x); let c0 = 0; for (const v of x) c0 += (v - m) ** 2; const out = []; for (let k = 0; k <= maxLag; k++) { let c = 0; for (let i = 0; i + k < n; i++) c += (x[i] - m) * (x[i + k] - m); out.push(c / c0); } return out; };
  /** AR(1) 계열 x_t = φ x_{t−1} + ε */
  Stat.ar1 = (n, phi, sigma = 1, R = Stat.random) => { const out = [R.normal(0, sigma / Math.sqrt(Math.max(1e-9, 1 - phi * phi)))]; for (let i = 1; i < n; i++) out.push(phi * out[i - 1] + R.normal(0, sigma)); return out; };
  /** 포아송 과정 도착 시각(구간 [0, T]) */
  Stat.poissonProcess = (rate, T, R = Stat.random) => { const t = []; let s = R.exp(rate); while (s <= T) { t.push(s); s += R.exp(rate); } return t; };
  /** 1차원 단순 랜덤 워크(±1, p는 +1 확률) */
  Stat.randomWalk = (n, p = 0.5, R = Stat.random) => { const out = [0]; for (let i = 0; i < n; i++) out.push(out[i] + (R.u() < p ? 1 : -1)); return out; };

  /* ------------------------------------------------------------ SPC */
  const D2 = [NaN, NaN, 1.1284, 1.6926, 2.0588, 2.3259, 2.5344, 2.7044, 2.8472, 2.97, 3.0775, 3.1729, 3.2585, 3.336, 3.4068, 3.4718, 3.532, 3.5879, 3.6401, 3.689, 3.735, 3.7783, 3.8194, 3.8583, 3.8953, 3.9306];
  const D3c = [NaN, NaN, 0.8525, 0.8884, 0.8798, 0.8641, 0.848, 0.8332, 0.8198, 0.8078, 0.7971, 0.7873, 0.7785, 0.7704, 0.763, 0.7562, 0.7499, 0.7441, 0.7386, 0.7335, 0.7287, 0.7242, 0.7199, 0.7159, 0.7121, 0.7084];
  const r4 = (v) => Math.round(v * 10000) / 10000;
  /** 관리도 계수(n = 2..25): d2, d3, c4, A2, A3, D3, D4, B3, B4, E2(개별값 = 3/d2) */
  Stat.spcConst = (n) => {
    const d2 = D2[n], d3 = D3c[n], c4 = Math.sqrt(2 / (n - 1)) * Math.exp(lgamma(n / 2) - lgamma((n - 1) / 2)), s4 = Math.sqrt(1 - c4 * c4);
    return { n, d2, d3, c4: r4(c4), A2: r4(3 / (d2 * Math.sqrt(n))), A3: r4(3 / (c4 * Math.sqrt(n))), D3: r4(Math.max(0, 1 - (3 * d3) / d2)), D4: r4(1 + (3 * d3) / d2), B3: r4(Math.max(0, 1 - (3 * s4) / c4)), B4: r4(1 + (3 * s4) / c4), E2: r4(3 / d2) };
  };
  const spc = (Stat.spc = {
    /** X̄–R: subgroups = [[…], …] */
    xbarR(sub) { const n = sub[0].length, K = Stat.spcConst(n), xb = sub.map(Stat.mean), R = sub.map((s) => Stat.max(s) - Stat.min(s)), xbb = Stat.mean(xb), rb = Stat.mean(R); return { n, xbar: xb, R, center: xbb, ucl: xbb + K.A2 * rb, lcl: xbb - K.A2 * rb, rbar: rb, rUcl: K.D4 * rb, rLcl: K.D3 * rb, sigma: rb / K.d2, K }; },
    /** X̄–s */
    xbarS(sub) { const n = sub[0].length, K = Stat.spcConst(n), xb = sub.map(Stat.mean), S = sub.map((s) => Stat.sd(s)), xbb = Stat.mean(xb), sb = Stat.mean(S); return { n, xbar: xb, s: S, center: xbb, ucl: xbb + K.A3 * sb, lcl: xbb - K.A3 * sb, sbar: sb, sUcl: K.B4 * sb, sLcl: K.B3 * sb, sigma: sb / K.c4, K }; },
    /** 개별값–이동 범위(I–MR) */
    imr(x) { const mr = x.slice(1).map((v, i) => Math.abs(v - x[i])), m = Stat.mean(x), mrb = Stat.mean(mr), sig = mrb / 1.1284; return { x, mr, center: m, ucl: m + 3 * sig, lcl: m - 3 * sig, mrbar: mrb, mrUcl: 3.2665 * mrb, sigma: sig }; },
    /** p 관리도(n 일정 또는 배열) */
    p(d, n) { const ns = isArr(n) ? n : d.map(() => n), pb = Stat.sum(d) / Stat.sum(ns), p = d.map((v, i) => v / ns[i]); return { p, center: pb, ucl: ns.map((m) => Math.min(1, pb + 3 * Math.sqrt((pb * (1 - pb)) / m))), lcl: ns.map((m) => Math.max(0, pb - 3 * Math.sqrt((pb * (1 - pb)) / m))) }; },
    np(d, n) { const pb = Stat.sum(d) / (d.length * n), c = n * pb, e = 3 * Math.sqrt(c * (1 - pb)); return { center: c, ucl: c + e, lcl: Math.max(0, c - e) }; },
    c(cnt) { const cb = Stat.mean(cnt); return { center: cb, ucl: cb + 3 * Math.sqrt(cb), lcl: Math.max(0, cb - 3 * Math.sqrt(cb)) }; },
    u(cnt, units) { const us = isArr(units) ? units : cnt.map(() => units), ub = Stat.sum(cnt) / Stat.sum(us); return { u: cnt.map((c, i) => c / us[i]), center: ub, ucl: us.map((m) => ub + 3 * Math.sqrt(ub / m)), lcl: us.map((m) => Math.max(0, ub - 3 * Math.sqrt(ub / m))) }; },
    /** 웨스턴 일렉트릭 규칙 1–4 위반 → [{i, rule}] (i는 규칙이 성립한 마지막 점) */
    rules(x, center, sigma, which = [1, 2, 3, 4]) {
      const z = x.map((v) => (v - center) / sigma), out = [];
      z.forEach((v, i) => {
        if (which.includes(1) && Math.abs(v) > 3) out.push({ i, rule: 1 });
        if (which.includes(2) && i >= 2) for (const sg of [1, -1]) if (z.slice(i - 2, i + 1).filter((w) => w * sg > 2).length >= 2 && v * sg > 2) out.push({ i, rule: 2 });
        if (which.includes(3) && i >= 4) for (const sg of [1, -1]) if (z.slice(i - 4, i + 1).filter((w) => w * sg > 1).length >= 4 && v * sg > 1) out.push({ i, rule: 3 });
        if (which.includes(4) && i >= 7) for (const sg of [1, -1]) if (z.slice(i - 7, i + 1).every((w) => w * sg > 0)) out.push({ i, rule: 4 });
      });
      return out;
    },
    /** EWMA 통계량과 시변 한계 */
    ewma(x, lambda = 0.2, L = 3, mu0, sigma) { mu0 = mu0 == null ? Stat.mean(x) : mu0; sigma = sigma || Stat.sd(x); let z = mu0; const Z = [], ucl = [], lcl = []; x.forEach((v, i) => { z = lambda * v + (1 - lambda) * z; Z.push(z); const w = L * sigma * Math.sqrt((lambda / (2 - lambda)) * (1 - Math.pow(1 - lambda, 2 * (i + 1)))); ucl.push(mu0 + w); lcl.push(mu0 - w); }); return { z: Z, ucl, lcl, center: mu0, uclInf: mu0 + L * sigma * Math.sqrt(lambda / (2 - lambda)) }; },
    /** 표 CUSUM: k, h는 σ 단위 */
    cusum(x, k = 0.5, h = 5, mu0, sigma) { mu0 = mu0 == null ? Stat.mean(x) : mu0; sigma = sigma || Stat.sd(x); let cp = 0, cm = 0; const Cp = [], Cm = []; x.forEach((v) => { cp = Math.max(0, cp + (v - mu0) / sigma - k); cm = Math.max(0, cm - (v - mu0) / sigma - k); Cp.push(cp); Cm.push(cm); }); return { cp: Cp, cm: Cm, h, signal: Cp.map((v, i) => v > h || Cm[i] > h) }; },
    /** 슈하트 관리도 ARL: 평균 이동 shift(공정 σ 단위), 부분군 n, 한계 L */
    arlShewhart(shift, n = 1, L = 3) { const d = shift * Math.sqrt(n), p = pnorm(-L - d) + 1 - pnorm(L - d); return 1 / p; },
    /** EWMA ARL(브룩–에번스 마르코프 근사, m 상태). shift는 σ 단위 */
    arlEwma(lambda, L, shift = 0, m = 101) {
      const sz = L * Math.sqrt(lambda / (2 - lambda)), w = (2 * sz) / m, c = (j) => -sz + (j + 0.5) * w;
      const Q = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => { const a = (c(j) - w / 2 - (1 - lambda) * c(i)) / lambda, b = (c(j) + w / 2 - (1 - lambda) * c(i)) / lambda; return pnorm(b - shift) - pnorm(a - shift); }));
      const N = M.inv(Q.map((r, i) => r.map((v, j) => (i === j ? 1 : 0) - v))); return Stat.sum(N[(m - 1) / 2]);
    },
    /** 단측 CUSUM ARL(브룩–에번스). k, h, shift는 σ 단위 */
    arlCusum(k, h, shift = 0, m = 80) {
      const w = h / (m - 0.5), Q = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => { const ci = i * w; if (j === 0) return pnorm(w / 2 - ci + k - shift); return pnorm((j + 0.5) * w - ci + k - shift) - pnorm((j - 0.5) * w - ci + k - shift); }));
      const N = M.inv(Q.map((r, i) => r.map((v, j) => (i === j ? 1 : 0) - v))); return Stat.sum(N[0]);
    },
    /** 공정 능력: (mean, sd, lsl, usl) — 한쪽 규격은 null. ppm은 정규 가정 */
    capability(mean, sd, lsl, usl) {
      const cpu = usl != null ? (usl - mean) / (3 * sd) : Infinity, cpl = lsl != null ? (mean - lsl) / (3 * sd) : Infinity;
      const cp = lsl != null && usl != null ? (usl - lsl) / (6 * sd) : NaN, cpk = Math.min(cpu, cpl);
      const pu = usl != null ? 1 - pnorm((usl - mean) / sd) : 0, pl = lsl != null ? pnorm((lsl - mean) / sd) : 0;
      return { cp, cpk, cpu, cpl, ppmAbove: pu * 1e6, ppmBelow: pl * 1e6, ppm: (pu + pl) * 1e6, yield: 1 - pu - pl, sigmaLevel: 3 * cpk };
    },
    /** Cpk 신뢰 하한(바우어 근사) */
    cpkLower: (cpk, n, conf = 0.95) => cpk - qnormStd(conf) * Math.sqrt(1 / (9 * n) + (cpk * cpk) / (2 * (n - 1))),
    /** Gage R&R(교차, 분산 분석법): data[part][operator] = [반복…] */
    gageRR(data, tol) {
      const p = data.length, o = data[0].length, r = data[0][0].length, A = Stat.anova2(data);
      let msP = A.A.ms, msO = A.B.ms, msPO, msE;
      if (r > 1) { msPO = A.AB.ms; msE = A.E.ms; } else { msPO = A.E.ms; msE = A.E.ms; }
      const repeat = msE, inter = r > 1 ? Math.max(0, (msPO - msE) / r) : 0, oper = Math.max(0, (msO - msPO) / (p * r)), part = Math.max(0, (msP - msPO) / (o * r));
      const reprod = oper + inter, grr = repeat + reprod, tot = grr + part, sd = (v) => Math.sqrt(v);
      return { var: { repeatability: repeat, reproducibility: reprod, operator: oper, interaction: inter, grr, part, total: tot }, pctGRR: (100 * sd(grr)) / sd(tot), pctPart: (100 * sd(part)) / sd(tot), ptRatio: tol ? (600 * sd(grr)) / tol : NaN, ndc: Math.floor(1.41 * (sd(part) / sd(grr))), anova: A };
    },
    /** 합격 판정 샘플링 OC: 로트 불량률 p에서 합격 확률(표본 n, 합격 개수 c). N이 있으면 초기하 */
    oc(p, n, c, N) { if (N) { const K = Math.round(p * N); return D.hypergeom(N, K, n).cdf(c); } return D.binomial(n, p).cdf(c); },
  });

  /* ------------------------------------------------------------ 신뢰성과 수율 */
  const kB_eV = 8.617333262e-5;
  Stat.rel = {
    kB: kB_eV,
    /** 아레니우스 가속 계수(Ea eV, 온도 °C) */
    arrhenius: (Ea, Tuse, Tstress) => Math.exp((Ea / kB_eV) * (1 / (Tuse + 273.15) - 1 / (Tstress + 273.15))),
    /** 멱법칙(전압 등) 가속 계수 (S_stress/S_use)^n */
    powerLaw: (Suse, Sstress, n) => Math.pow(Sstress / Suse, n),
    /** 펙 습도 가속 계수: (RH_s/RH_u)^n · 아레니우스 */
    peck: (RHuse, RHs, n, Ea, Tuse, Ts) => Math.pow(RHs / RHuse, n) * Stat.rel.arrhenius(Ea, Tuse, Ts),
    /** 고장 r개, 총 소자·시간 T(소자·시간)일 때 고장률 상한(카이제곱, 시간 단절) → per hour, FIT */
    lambdaUpper(r, T, conf = 0.6) { const l = Stat.qchisq(conf, 2 * r + 2) / (2 * T); return { lambda: l, fit: l * 1e9, mttf: 1 / l }; },
    /** 베르나르 중앙 순위 (i − 0.3)/(n + 0.4) */
    medianRank: (i, n) => (i - 0.3) / (n + 0.4),
    /** 와이블 확률지 좌표: [ln t, ln(−ln(1−F))] */
    weibullPlot(times) { const s = Stat.sorted(times), n = s.length; return Array.from(s, (t, i) => { const F = (i + 1 - 0.3) / (n + 0.4); return { t, F, x: Math.log(t), y: Math.log(-Math.log(1 - F)) }; }); },
    /** 중앙 순위 회귀(y on x)로 와이블 모수 */
    weibullRRY(times) { const P = Stat.rel.weibullPlot(times), L = Stat.linreg(P.map((p) => p.x), P.map((p) => p.y)); return { beta: L.b, eta: Math.exp(-L.a / L.b), r2: L.r2, points: P }; },
    /** 와이블 MLE(우측 중도 절단: failed[i] = true/false, 생략 시 모두 고장) */
    weibullMLE(t, failed) {
      failed = failed || t.map(() => true);
      const r = failed.filter(Boolean).length, lt = t.map(Math.log), sumLnF = lt.reduce((s, v, i) => s + (failed[i] ? v : 0), 0);
      const g = (b) => { let A = 0, B = 0; t.forEach((x, i) => { const p = Math.pow(x, b); A += p * lt[i]; B += p; }); return A / B - 1 / b - sumLnF / r; };
      let lo = 0.02, hi = 50; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; }
      const beta = (lo + hi) / 2, eta = Math.pow(t.reduce((s, x) => s + Math.pow(x, beta), 0) / r, 1 / beta);
      return { beta, eta, r, n: t.length };
    },
    /** 지수 MLE(중도 절단): λ = r / Σt */
    expMLE: (t, failed) => { const r = failed ? failed.filter(Boolean).length : t.length, T = Stat.sum(t); return { lambda: r / T, mttf: T / r, r, T }; },
    /** 카플란–마이어: times, events(1 고장, 0 절단) → [{t, S, atRisk, d}] */
    kaplanMeier(times, events) {
      const idx = times.map((_, i) => i).sort((a, b) => times[a] - times[b] || events[b] - events[a]);
      let S = 1, n = times.length; const out = [{ t: 0, S: 1, atRisk: n, d: 0 }];
      for (let i = 0; i < idx.length; ) { const t = times[idx[i]]; let d = 0, c = 0; while (i < idx.length && times[idx[i]] === t) { if (events[idx[i]]) d++; else c++; i++; } if (d) { S *= 1 - d / n; out.push({ t, S, atRisk: n, d }); } n -= d + c; }
      return out;
    },
    /** 직렬·병렬 계통 신뢰도 */
    series: (rs) => rs.reduce((a, r) => a * r, 1),
    parallel: (rs) => 1 - rs.reduce((a, r) => a * (1 - r), 1),
    /** k-out-of-n (같은 신뢰도 r) */
    kOfN: (k, n, r) => 1 - D.binomial(n, r).cdf(k - 1),
  };
  /** 수율 모형: D0 결함 밀도(개/cm²), A 다이 면적(cm²), alpha 군집 모수 */
  Stat.yield = {
    poisson: (D0, A) => Math.exp(-D0 * A),
    murphy: (D0, A) => { const x = D0 * A; return x === 0 ? 1 : ((1 - Math.exp(-x)) / x) ** 2; },
    seeds: (D0, A) => 1 / (1 + D0 * A),
    negbinom: (D0, A, alpha = 2) => Math.pow(1 + (D0 * A) / alpha, -alpha),
    /** 웨이퍼당 총 다이 수(지름 d mm, 다이 면적 S mm², 가장자리 손실 근사) */
    diesPerWafer: (d, S) => Math.floor((PI * d * d) / (4 * S) - (PI * d) / Math.sqrt(2 * S)),
  };

  /* ------------------------------------------------------------ 몬테카를로 도우미 */
  /** f를 n번 실행해 결과 배열 */
  Stat.simulate = (n, f, R = Stat.random) => Array.from({ length: n }, (_, i) => f(R, i));
  /** 실행 평균(대수의 법칙 그림용) */
  Stat.runningMean = (x) => { let s = 0; return x.map((v, i) => (s += v) / (i + 1)); };

  /* ------------------------------------------------------------ 형식 */
  /** p 값 표시: < 0.001 등 */
  Stat.fmtP = (p) => (p < 0.0001 ? "< 0.0001" : p < 0.001 ? p.toExponential(1).replace("e-", "×10⁻") : p < 0.01 ? p.toFixed(4) : p.toFixed(3));
  Stat.pct = (x, d = 1) => (100 * x).toFixed(d) + "%";

  /* ------------------------------------------------------------ 그리기(SB.chart 반환값 C 위에) */
  const pal = () => (window.SB ? SB.palette() : { accent: "#15803d", accent2: "#a21caf", text: "#222", dim: "#666", faint: "#bbb", bg: "#fff", grid: "#eee" });
  const withA = (ctx, a, fn) => { const g = ctx.globalAlpha; ctx.globalAlpha = g * a; fn(); ctx.globalAlpha = g; };
  Stat.draw = {
    /** 막대(PMF 등): pts [[x, h]], width는 x 단위 폭(기본 0.8) */
    bars(ctx, C, pts, o = {}) {
      const w = o.width == null ? 0.8 : o.width, col = o.color || pal().accent, base = C.Y(o.base || 0);
      for (const [x, h] of pts) {
        const x0 = C.X(x - w / 2), x1 = C.X(x + w / 2), y = C.Y(h);
        const c = typeof col === "function" ? col(x, h) : col;
        withA(ctx, o.alpha == null ? 0.85 : o.alpha, () => { ctx.fillStyle = c; ctx.fillRect(x0, Math.min(y, base), Math.max(1, x1 - x0), Math.abs(base - y)); });
        if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = 1; ctx.strokeRect(x0, Math.min(y, base), x1 - x0, Math.abs(base - y)); }
      }
    },
    /** 히스토그램 H(Stat.hist 결과). mode "count" | "density" | "rel" */
    hist(ctx, C, H, o = {}) {
      const mode = o.mode || "count", vals = mode === "density" ? H.density : mode === "rel" ? H.rel : H.counts, p = pal();
      vals.forEach((v, i) => {
        const x0 = C.X(H.edges[i]), x1 = C.X(H.edges[i + 1]), y = C.Y(v), y0 = C.Y(0);
        const c = typeof o.color === "function" ? o.color(i, H.edges[i], H.edges[i + 1]) : o.color || p.accent;
        withA(ctx, o.alpha == null ? 0.55 : o.alpha, () => { ctx.fillStyle = c; ctx.fillRect(x0, y, x1 - x0, y0 - y); });
        ctx.strokeStyle = o.stroke || c; ctx.lineWidth = 1; ctx.strokeRect(x0 + 0.5, y + 0.5, x1 - x0 - 1, y0 - y);
      });
    },
    /** 곡선 f(x), [a, b] */
    curve(ctx, C, f, a, b, o = {}) {
      const n = o.n || 300; ctx.save(); ctx.strokeStyle = o.color || pal().accent; ctx.lineWidth = o.width || 2; if (o.dash) ctx.setLineDash(o.dash);
      ctx.beginPath(); let pen = false;
      for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n, y = f(x); if (!isFinite(y)) { pen = false; continue; } const Y = Math.max(C.box.y - 2000, Math.min(C.box.y + C.box.h + 2000, C.Y(y))); if (!pen) { ctx.moveTo(C.X(x), Y); pen = true; } else ctx.lineTo(C.X(x), Y); }
      ctx.stroke(); ctx.restore();
    },
    /** f 아래 [a, b] 칠하기(꼬리 확률·p 값) */
    area(ctx, C, f, a, b, o = {}) {
      const n = o.n || 200, lo = Math.max(a, o.clip ? o.clip[0] : -Infinity), hi = Math.min(b, o.clip ? o.clip[1] : Infinity); if (!(hi > lo)) return;
      ctx.save(); ctx.beginPath(); ctx.moveTo(C.X(lo), C.Y(0));
      for (let i = 0; i <= n; i++) { const x = lo + ((hi - lo) * i) / n, y = f(x); ctx.lineTo(C.X(x), Math.max(C.box.y, C.Y(isFinite(y) ? y : 0))); }
      ctx.lineTo(C.X(hi), C.Y(0)); ctx.closePath();
      withA(ctx, o.alpha == null ? 0.35 : o.alpha, () => { ctx.fillStyle = o.color || pal().accent; ctx.fill(); }); ctx.restore();
    },
    /** 수평 상자 그림: B = Stat.boxStats, y 픽셀 중심, h 픽셀 높이 */
    box(ctx, C, B, y, h = 22, o = {}) {
      const p = pal(), c = o.color || p.accent; ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 1.5;
      const X = C.X;
      ctx.beginPath(); ctx.moveTo(X(B.whiskerLo), y); ctx.lineTo(X(B.q1), y); ctx.moveTo(X(B.q3), y); ctx.lineTo(X(B.whiskerHi), y);
      ctx.moveTo(X(B.whiskerLo), y - h / 4); ctx.lineTo(X(B.whiskerLo), y + h / 4); ctx.moveTo(X(B.whiskerHi), y - h / 4); ctx.lineTo(X(B.whiskerHi), y + h / 4); ctx.stroke();
      withA(ctx, 0.25, () => { ctx.fillStyle = c; ctx.fillRect(X(B.q1), y - h / 2, X(B.q3) - X(B.q1), h); });
      ctx.strokeRect(X(B.q1), y - h / 2, X(B.q3) - X(B.q1), h);
      ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(B.median), y - h / 2); ctx.lineTo(X(B.median), y + h / 2); ctx.stroke();
      if (o.mean !== false) { ctx.fillStyle = p.text; ctx.beginPath(); ctx.moveTo(X(B.mean), y - 4); ctx.lineTo(X(B.mean) + 4, y); ctx.lineTo(X(B.mean), y + 4); ctx.lineTo(X(B.mean) - 4, y); ctx.fill(); }
      ctx.fillStyle = o.outlier || p.bad || "#d33"; for (const v of B.outliers) { ctx.beginPath(); ctx.arc(X(v), y, 3.5, 0, 2 * PI); ctx.fill(); }
      ctx.restore();
    },
    /** 점 그림(같은 칸에 쌓기): bin은 x 단위 칸 폭, r 픽셀 → 각 점 위치 [{x,y,v,i}] 반환 */
    dots(ctx, C, vals, o = {}) {
      const bin = o.bin || 1, r = o.r || 4, gap = o.gap == null ? 1 : o.gap, base = o.y0 == null ? C.Y(0) - r - 1 : o.y0, stacks = new Map(), out = [];
      vals.forEach((v, i) => { const k = Math.round(v / bin), h = stacks.get(k) || 0; stacks.set(k, h + 1); const x = C.X(k * bin), y = base - h * (2 * r + gap); out.push({ x, y, v, i }); ctx.fillStyle = typeof o.color === "function" ? o.color(v, i) : o.color || pal().accent; ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * PI); ctx.fill(); });
      return out;
    },
    /** 산점도 점 */
    points(ctx, C, pts, o = {}) { const r = o.r || 3.5; pts.forEach((p, i) => { ctx.fillStyle = typeof o.color === "function" ? o.color(p, i) : o.color || pal().accent; withA(ctx, o.alpha == null ? 0.85 : o.alpha, () => { ctx.beginPath(); ctx.arc(C.X(p[0]), C.Y(p[1]), r, 0, 2 * PI); ctx.fill(); }); }); },
    /** 계단 함수(ECDF·CDF): pts [[x, y]] 오름차순 */
    step(ctx, C, pts, o = {}) { ctx.save(); ctx.strokeStyle = o.color || pal().accent; ctx.lineWidth = o.width || 2; ctx.beginPath(); pts.forEach(([x, y], i) => { if (i === 0) ctx.moveTo(C.X(x), C.Y(y)); else { ctx.lineTo(C.X(x), C.Y(pts[i - 1][1])); ctx.lineTo(C.X(x), C.Y(y)); } }); ctx.stroke(); ctx.restore(); },
    /** 구간 막대(신뢰 구간): x 단위 [lo, hi], y 픽셀 */
    interval(ctx, C, lo, hi, y, o = {}) { const c = o.color || pal().accent; ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = o.width || 2; ctx.beginPath(); ctx.moveTo(C.X(lo), y); ctx.lineTo(C.X(hi), y); ctx.moveTo(C.X(lo), y - 3); ctx.lineTo(C.X(lo), y + 3); ctx.moveTo(C.X(hi), y - 3); ctx.lineTo(C.X(hi), y + 3); ctx.stroke(); if (o.center != null) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(C.X(o.center), y, 2.5, 0, 2 * PI); ctx.fill(); } ctx.restore(); },
    /** 2σ·3σ 등 공분산 타원(데이터 좌표) */
    ellipse(ctx, C, mx, my, sx, sy, rho, k = 2, o = {}) {
      const e = M.eig2(sx * sx, rho * sx * sy, sy * sy), a = k * Math.sqrt(e.l1), b = k * Math.sqrt(Math.max(0, e.l2)), ca = Math.cos(e.angle), sa = Math.sin(e.angle);
      ctx.save(); ctx.strokeStyle = o.color || pal().accent; ctx.lineWidth = o.width || 1.5; if (o.dash) ctx.setLineDash(o.dash); ctx.beginPath();
      for (let i = 0; i <= 120; i++) { const t = (2 * PI * i) / 120, u = a * Math.cos(t), v = b * Math.sin(t), x = mx + u * ca - v * sa, y = my + u * sa + v * ca; if (i) ctx.lineTo(C.X(x), C.Y(y)); else ctx.moveTo(C.X(x), C.Y(y)); }
      ctx.stroke(); ctx.restore();
    },
  };
})();

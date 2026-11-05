# LinearBook 챕터 작성 가이드

LinearBook은 [MathBook(foundations)](../foundations/CONTRIBUTING.md)과 같은 엔진(`MB`)으로 쓰는 선형대수 교과서다. **이 문서에 없는 규칙과 `MB` API 전체는 `../foundations/CONTRIBUTING.md`를 따른다.** 문체·구성·그림·시뮬레이터 수준의 본보기는 `../foundations/chapters/linalg.html`이다.

## 기여물의 라이선스

코드는 MIT, 교재 콘텐츠는 CC BY 4.0. 다른 교재의 문장·그림·연습문제를 옮겨 오지 않는다. 역사·수치는 확인된 사실만 쓴다.

## 구조

빌드 없이 열리는 정적 페이지다. `index.html` + `chapters/<slug>.html` + `css/style.css`(MathBook 스타일, 색만 보라·청록) + `js/common.js`(전역 `MB`, 장 목록 `CHAPTERS`). classic script만 쓴다(ES module 금지).

- 장 목록은 `js/common.js`의 `CHAPTERS`에 있다. 아직 쓰지 않은 장은 `planned: true`로 두면 목차에만 보이고 링크·검색·이전/다음에서 빠진다. 장을 공개할 때 `planned`를 지운다.
- 용어는 `js/glossary-data.js`에 추가한다(형식은 MathBook과 같은 시리즈 공통 v1: `ko`, `en`, `abbr`, `def`, `chapters`). 본문에서 처음 나오는 용어는 `<span class="term">…</span>`.

## 원칙: 그림 → 계산 → 쓰임

MathBook이 "문제에서 도구로"였다면 LinearBook은 **한 과목을 끝까지** 다룬다. 대학 선형대수 한 학기(소거, 부분공간, 직교성, 행렬식, 고유값, SVD)와 수치 선형대수 입문을 빠짐없이 다루되, 모든 개념을 **기하 그림으로 먼저 보고, 손으로 계산하고, 공학에서 쓰이는 곳**까지 잇는다.

- 한국어, 대상은 공대 1–2학년과 선형대수를 다시 공부하는 엔지니어. 영어 원어는 `<span class="en">(Pivot)</span>`처럼 병기.
- 장 첫머리는 `.origin`("이 수식이 없었다면")으로 연다. 각 절은 가능하면 `.problem`으로 시작한다.
- 흐름: 문제 → 그림(SVG) → **조작하는 시뮬레이터** → 정의·정리(KaTeX) → **손으로 푸는 예제**(`.callout` 안에 단계별) → 쓰이는 곳(`.uses`) → 핵심 정리 → 확인 퀴즈(5–8문항).
- 교과서다운 엄밀함: 정의와 정리는 `<div class="callout deep"><strong>정리 3.2 (…)</strong> …</div>`처럼 번호를 붙여 분명히 쓰고, 증명은 짧으면 본문에, 길면 핵심 아이디어만 쓴다.
- 장마다 시뮬레이터 5–8개. 숫자를 바꾸면 그림이 바로 반응해야 한다. `MB.plane`(끄는 점)과 `.mat`(행렬 입력 칸)을 적극 쓴다. 단계별 알고리즘(소거, 그람–슈미트 …)은 "다음 단계" 버튼으로 한 단계씩 보여 준다.
- MathBook의 "행렬은 변환이다" 장과 겹치는 내용은 더 깊이 다루고, 필요하면 `../../foundations/chapters/linalg.html#basis`처럼 링크한다.
- 색은 CSS 변수와 `MB.palette()`만. 라이트/다크 모두 확인. 폭 360px에서 가로 스크롤 금지. SVG는 `viewBox`만 주고 width/height 생략.
- 시뮬레이터 `id`는 `sim-<장 접두사>-<이름>`, 요소 id도 같은 접두사를 붙인다. 장 접두사: vectors `vec`, matrices `mx`, elimination `ge`, lu `lu`, subspaces `sp`, rank `rk`, change-of-basis `cb`, orthogonality `or`, qr `qr`, determinants `dt`, eigen `eg`, dynamics `dy`, symmetric `sy`, svd `sv`, pca `pc`, numerical `nm`, glossary `gl`. 절 `id`는 의미 있는 영어 슬러그로 짓고 바꾸지 않는다.

## head 템플릿

```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<title>벡터와 선형 결합 · LinearBook</title>
<meta name="description" content="한 문장 설명(120자 안팎)">
<link rel="stylesheet" href="../css/style.css">
<script src="../js/common.js"></script>
<style> /* 이 장 전용 스타일(최소한) */ </style>
<!-- Cloudflare Web Analytics -->
<!-- End Cloudflare Web Analytics -->
<link rel="stylesheet" href="../../shared/css/book-shell.css">
<script defer src="../../shared/js/book-shell.js" data-book="linear"></script>
</head>
<body data-chapter="vectors">
<main class="chapter">
  <header class="chapter-hero">
    <div class="eyebrow">Chapter 01</div>
    <h1 data-no-glossary>벡터와 선형 결합</h1>
    <p class="lead">...</p>
    <ul class="objectives"><li>...</li></ul>
    <div class="origin">...</div>
  </header>
  <section id="..."><h2>...</h2> ... </section>
  ...
  <section id="uses"><h2>이 도구가 쓰이는 곳</h2><div class="uses">...</div></section>
  <section class="keypoints" id="summary"><h2>핵심 정리</h2><ol><li>...</li></ol></section>
  <section class="quiz-sec" id="quiz"><h2>확인 퀴즈</h2><div class="quiz"> ... </div></section>
</main>
<script> /* 시뮬레이터마다 (function(){ ... })(); */ </script>
</body>
</html>
```

소스에는 `<title>`과 `<meta name="description">`(한 줄)만 쓴다. canonical·Open Graph 태그는 `tools/build.mjs`가 `linear/book.json`의 `meta`로 생성하고, 수식은 빌드가 `tools/katex.mjs`로 미리 렌더링한다. 그래서 다음을 지킨다. 어기면 `npm test`나 빌드가 실패한다.

- canonical·`og:` 태그, KaTeX `<link>`/`<script>`를 소스에 넣지 않는다(소스를 바로 열면 `common.js`가 CDN에서 KaTeX를 불러 렌더링한다).
- **스크립트가 수식을 DOM에 넣지 않는다.** 빌드는 정적 HTML의 수식만 렌더링한다. 인라인 `<script>` 안에 `\(`·`\[`·`$$`가 있으면 검사가 실패한다. 시뮬레이터의 행렬·식 출력은 HTML(`<span class="mx-out">` 같은 격자, 위첨자 `<sup>`, `·`, `−`)로 만든다. `MB.tex`는 쓰지 않는다.
- 수식 안에서 `<` 바로 뒤에 글자가 오면 브라우저가 태그로 읽는다. `a<b` 대신 `a \lt b` 또는 `a < b`(공백).
- 수식 안의 HTML 엔티티는 `&amp; &lt; &gt; &nbsp; &middot; &times; &minus;`와 숫자 엔티티만 쓴다. 행렬의 열 구분 `&`는 HTML 속성 밖 본문에서 그대로 써도 된다.

## 검사

```bash
npm test                              # 메타데이터·링크·수식(KaTeX 문법) 검사
npm run build                         # .book-dist/ 생성(수식 미리 렌더링)
node tools/browser-check.cjs linear   # (Playwright) 콘솔 오류·가로 넘침 검사
```

# MathBooks · 수학 교과서 서가

그림을 끌고 숫자를 바꾸며 배우는 한국어 인터랙티브 수학 교과서를 한 저장소에서 관리합니다. 홈은 SemiBooks·MusicBooks의 책장·검색·분야 필터·실습·읽는 순서 구성을 따릅니다.

서비스 주소: **https://math.euiyun.com/** · 책 한 권의 홈은 **`/{slug}/`**, 각 장은 **`/{slug}/chapters/{chapter}.html`**입니다.

## 수록 책

| 경로 | 책 | 상태 | 처음 가져온 곳 |
|---|---|---|---|
| `/foundations/` | MathBook · 문제에서 출발하는 공학 수학 | 공개, 13개 장 | `geniuskey/mathbook`(삭제됨) |
| `/linear/` | LinearBook · 선형대수 | 공개, 5부 16장 + 용어집 | 이 저장소에서 집필 |
| `/calculus/` | CalculusBook · 미적분 | 공개, 5부 16장 + 용어집 | 이 저장소에서 집필 |
| `/ode/` | ODEBook · 미분방정식 | 공개, 5부 16장 + 용어집 | 이 저장소에서 집필 |
| `/numerical/` | NumericalBook · 수치해석 | 공개, 5부 16장 + 용어집 | 이 저장소에서 집필 |
| `/probability/` | 확률과 통계 | 공개, 19개 장 | `geniuskey/science-books`의 `probability-statistics/` |

준비 중인 책은 `roadmap.json`에 적습니다(지금은 비어 있음).

LinearBook(`linear/`)은 MathBook의 엔진(`MB`: 좌표 평면·행렬·고유값·SVD 도구)과 장 구성 규칙을 그대로 쓰고 색과 장 목록만 바꿨습니다. 벡터와 행렬, 벡터 공간, 직교성, 고유값, 분해와 응용의 5부 16장에 용어집·종합 퀴즈를 더했습니다. 새 장을 미리 목차에만 올릴 때는 `linear/js/common.js`의 `CHAPTERS`에 `planned: true`를 붙입니다. 집필 규칙은 [linear/CONTRIBUTING.md](linear/CONTRIBUTING.md)를 참고하세요.

CalculusBook(`calculus/`)도 같은 엔진 위에 색(진분홍·파랑)과 장 목록만 바꿔 썼습니다. 극한과 연속, 미분, 적분, 무한급수, 다변수 미적분의 5부 16장에 용어집·종합 퀴즈를 더했습니다. 집필 규칙과 장별 설계는 [calculus/CONTRIBUTING.md](calculus/CONTRIBUTING.md)를 참고하세요.

ODEBook(`ode/`)도 같은 엔진 위에 색(주황·청록)과 장 목록만 바꿔 썼습니다. 1계 미분방정식, 2계 선형 방정식, 라플라스 변환, 연립 방정식과 동역학, 급수해와 편미분방정식의 5부 16장에 용어집·종합 퀴즈를 더했습니다. 집필 규칙과 장별 설계는 [ode/CONTRIBUTING.md](ode/CONTRIBUTING.md)를 참고하세요.

NumericalBook(`numerical/`)도 같은 엔진 위에 색(초록·보라)과 장 목록만 바꿔 썼습니다. 오차와 근 찾기, 보간과 근사, 수치 미적분, 수치 선형대수, 최적화와 편미분방정식의 5부 16장에 용어집·종합 퀴즈를 더했습니다. 알고리즘은 장마다 직접 구현해 한 단계씩 보여 줍니다. 집필 규칙과 장별 설계는 [numerical/CONTRIBUTING.md](numerical/CONTRIBUTING.md)를 참고하세요.

## 구성

```text
index.html, shelf.css                  서가 홈: 책장·분야 필터·검색, 대표 실험, 읽는 순서
catalog.js                            생성된 책 목록(직접 수정하지 않음)
book.json                             서가 메타데이터, 각 책의 book.json 목록
roadmap.json                          준비 중인 책
shared/js/shelf.js                    서가 홈의 책장 렌더링·필터
shared/js/covers.js                   SVG 책 표지(books 포털 코드 + 선형대수·미적분·미분방정식 표지)
shared/js/book-shell.js               모든 책 상단 바의 ‘수학 서가’ 연결
{slug}/                               각 책의 본문, 실습 엔진, 용어 데이터
probability/engine/                   확률과 통계가 쓰는 SciBook 엔진 사본(가져온 파일)
tools/sync-catalog.py                 catalog.js 생성(IMPORTED_BOOKS + LOCAL_BOOKS + roadmap.json)
tools/sync-sitemap.py                 루트 사이트맵 생성
tools/build.mjs                       정적 배포물(.book-dist/) 생성, meta가 있는 책의 SEO 태그와 수식 미리 렌더링
tools/katex.mjs, katex.test.mjs       빌드 시 수식 렌더링과 회귀 검사
tools/check.py                        메타데이터·링크 정적 검사
tools/browser-check.cjs               데스크톱·모바일 브라우저 검사(Playwright)
tools/og.mjs                          공유 이미지 og.png, linear/og.png, calculus/og.png, ode/og.png, numerical/og.png 생성(Playwright)
```

## 실행과 배포

```bash
npm ci
npm test
npm run build
python3 -m http.server 8000 --directory .book-dist
```

배포물은 `.book-dist/`입니다. GitHub Pages의 Source를 GitHub Actions로 설정하고 커스텀 도메인 `math.euiyun.com`과 DNS를 연결합니다. `main`에 push하거나 Deploy Book 워크플로를 실행하면 검사·빌드 후 배포합니다. 이 저장소의 CNAME 설정만으로 DNS나 GitHub 설정이 자동으로 바뀌지는 않습니다.

`book.json`에 `meta`가 있는 책(LinearBook)은 소스에 canonical·Open Graph·KaTeX 태그를 두지 않습니다. 빌드가 태그를 생성하고 수식을 미리 렌더링해 KaTeX 스타일시트만 붙입니다. 가져온 MathBook과 확률과 통계는 가져올 때의 태그와 CDN 의존성(수식·폰트)을 그대로 씁니다.

책·장·시뮬레이터 수가 바뀌면 `npm run catalog`, `npm run sitemap`, `node tools/og.mjs`로 목록과 공유 이미지를 갱신합니다.

## 가져온 책

MathBook(`foundations/`)과 확률과 통계(`probability/`)는 2026-11에 다른 저장소에서 한 번 가져왔고, 지금은 이 저장소가 유일한 원본입니다. 두 책은 이 저장소에서 직접 고칩니다.

- MathBook: `geniuskey/mathbook`의 파일을 복사했습니다. 원래 저장소와 `mathbook.euiyun.com`은 내렸습니다.
- 확률과 통계: `geniuskey/science-books`의 `probability-statistics/`와 SciBook 엔진 사본(`probability/engine/`)을 복사했습니다. `science.euiyun.com/probability-statistics/`의 각 쪽은 이 서가의 같은 장으로 리다이렉트합니다.
- 가져올 때 쓴 도구(`tools/import-books.py`, `migration/`)는 원본이 사라져 지웠습니다. 경로·주소 바꾸기 규칙은 Git 이력(커밋 0966530)에 남아 있습니다.

## 새 책 추가

책마다 `{slug}/index.html`, `{slug}/chapters/`, `{slug}/book.json`을 두고 루트 `book.json`의 `books`에 등록합니다. 서가 메타데이터는 `tools/sync-catalog.py`의 `LOCAL_BOOKS`에 추가합니다. 공개할 때 `roadmap.json`의 예정 항목을 지우고 `npm run catalog`와 `npm run sitemap`을 실행합니다.

## 라이선스

코드는 MIT, 교육 콘텐츠는 CC BY 4.0입니다. [라이선스 안내](LICENSE.md)와 각 책의 저작권 표시를 참고하세요.

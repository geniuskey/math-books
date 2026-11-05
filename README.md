# MathBooks · 수학 교과서 서가

그림을 끌고 숫자를 바꾸며 배우는 한국어 인터랙티브 수학 교과서를 한 저장소에서 관리합니다. 홈은 SemiBooks·MusicBooks의 책장·검색·분야 필터·실습·읽는 순서 구성을 따릅니다.

서비스 주소: **https://math.euiyun.com/** · 책 한 권의 홈은 **`/{slug}/`**, 각 장은 **`/{slug}/chapters/{chapter}.html`**입니다.

## 수록 책

| 경로 | 책 | 상태 | 원래 저장소 |
|---|---|---|---|
| `/foundations/` | MathBook · 문제에서 출발하는 공학 수학 | 공개, 13개 장 | `geniuskey/mathbook` |
| `/linear/` | LinearBook · 선형대수 | 공개, 5부 16장 + 용어집 | 이 저장소에서 집필 |
| `/probability/` | 확률과 통계 | 공개, 19개 장 | `geniuskey/science-books`의 `probability-statistics/` |

준비 중인 책(`roadmap.json`): CalculusBook(미적분, `/calculus/`), ODEBook(미분방정식, `/ode/`), NumericalBook(수치해석, `/numerical/`).

LinearBook(`linear/`)은 MathBook의 엔진(`MB`: 좌표 평면·행렬·고유값·SVD 도구)과 장 구성 규칙을 그대로 쓰고 색과 장 목록만 바꿨습니다. 벡터와 행렬, 벡터 공간, 직교성, 고유값, 분해와 응용의 5부 16장에 용어집·종합 퀴즈를 더했습니다. 새 장을 미리 목차에만 올릴 때는 `linear/js/common.js`의 `CHAPTERS`에 `planned: true`를 붙입니다. 집필 규칙은 [linear/CONTRIBUTING.md](linear/CONTRIBUTING.md)를 참고하세요.

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
migration/books.json                  가져온 책의 원본·slug·서가 정보와 경로 바꾸기 규칙
migration/import-state.json           가져온 파일별 원본 커밋과 해시
tools/import-books.py                 보호된 가져오기(로컬 수정은 덮어쓰지 않음)
tools/sync-catalog.py                 catalog.js 생성(가져온 책 + LOCAL_BOOKS + roadmap.json)
tools/sync-sitemap.py                 루트 사이트맵 생성
tools/build.mjs                       정적 배포물(.book-dist/) 생성, meta가 있는 책의 SEO 태그와 수식 미리 렌더링
tools/katex.mjs, katex.test.mjs       빌드 시 수식 렌더링과 회귀 검사
tools/check.py                        메타데이터·링크·가져온 파일 정적 검사
tools/browser-check.cjs               데스크톱·모바일 브라우저 검사(Playwright)
tools/og.mjs                          공유 이미지 og.png, linear/og.png 생성(Playwright)
```

## 실행과 배포

```bash
npm ci
npm test
npm run build
python3 -m http.server 8000 --directory .book-dist
```

배포물은 `.book-dist/`입니다. GitHub Pages의 Source를 GitHub Actions로 설정하고 커스텀 도메인 `math.euiyun.com`과 DNS를 연결합니다. `main`에 push하거나 Deploy Book 워크플로를 실행하면 검사·빌드 후 배포합니다. 이 저장소의 CNAME 설정만으로 DNS나 GitHub 설정이 자동으로 바뀌지는 않습니다.

`book.json`에 `meta`가 있는 책(LinearBook)은 소스에 canonical·Open Graph·KaTeX 태그를 두지 않습니다. 빌드가 태그를 생성하고 수식을 미리 렌더링해 KaTeX 스타일시트만 붙입니다. 가져온 MathBook과 확률과 통계는 원본과 같게 유지하며 기존 CDN 의존성(수식·폰트)을 그대로 씁니다.

책·장·시뮬레이터 수가 바뀌면 `npm run catalog`, `npm run sitemap`, `node tools/og.mjs`로 목록과 공유 이미지를 갱신합니다.

## 원본 가져오기

`geniuskey/mathbook`의 추적 파일을 `foundations/`에, `geniuskey/science-books`의 `probability-statistics/`와 그 책이 쓰는 SciBook 엔진 파일(`engine/js/scibook.js`, `engine/lib/stat.js` 등)을 `probability/`에 복사했습니다. 원본 Git 이력은 중첩하지 않고 `migration/import-state.json`에 원본 커밋과 파일 해시를 기록합니다. 원본 저장소와 기존 서비스는 변경하지 않았습니다.

가져오면서 바꾸는 것은 `migration/books.json`에 모두 적혀 있습니다.

- 공통: 기존 주소(`mathbook.euiyun.com`, `science.euiyun.com/probability-statistics/`)를 새 경로로, 운영을 마친 개별 반도체 책 도메인(`*book.euiyun.com`)을 `semi.euiyun.com/{slug}/`로, 테마 저장 키를 `math-theme`으로 바꾸고, 서가 연결(`shared/js/book-shell.js`)을 붙입니다.
- 확률과 통계: `sourceSubdirectory`와 `extraFiles`로 폴더 하나와 엔진 파일만 가져오고, `replacements`로 엔진 경로(`../../engine/` → `../engine/`), 다른 과학 교과서 링크(→ `science.euiyun.com`), SciBook 이름을 바꿉니다.

원본이 같은 상위 폴더(`../mathbook`, `../science-books`)에 있을 때:

```bash
npm run import:check
python3 tools/import-books.py --write
npm run catalog
npm run sitemap
npm test
```

가져오기 도구는 통합본의 로컬 수정 덮어쓰기와 원본에서 삭제된 파일의 자동 삭제를 거부합니다. 양쪽에서 수정한 파일은 먼저 직접 병합해야 합니다. 가져온 책을 이 저장소에서 직접 고치기 시작하면(SemiBooks처럼) 그 책은 더는 다시 가져오지 않습니다.

## 새 책 추가

책마다 `{slug}/index.html`, `{slug}/chapters/`, `{slug}/book.json`을 두고 루트 `book.json`의 `books`에 등록합니다. 외부 저장소에서 가져오는 책은 `migration/books.json`에 추가하고, 이 저장소에서 새로 쓰는 책은 `tools/sync-catalog.py`의 `LOCAL_BOOKS`에 메타데이터를 추가합니다. 공개할 때 `roadmap.json`의 예정 항목을 지우고 `npm run catalog`와 `npm run sitemap`을 실행합니다.

## 라이선스

코드는 MIT, 교육 콘텐츠는 CC BY 4.0입니다. [라이선스 안내](LICENSE.md)와 각 책의 저작권 표시를 참고하세요.

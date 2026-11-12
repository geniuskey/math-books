#!/usr/bin/env python3
"""Generate the shelf (catalog.js) from the books below and the future-volume roadmap."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
# Imported once from geniuskey/mathbook and science-books/probability-statistics; maintained here since 2026-11-06.
IMPORTED_BOOKS = [{
    'id': "mathbook",
    'code': "MTH",
    'title': "MathBook",
    'subtitle': "문제에서 출발하는 수학 교과서",
    'headline': "이 수식이 없었다면 못 만들었을 물건",
    'description': "전력망에서 복소수를, MRI에서 푸리에를, QR 코드에서 오류 정정 부호를 만납니다. 극한과 급수, 선형대수, 미분방정식, 표본화, 확률, 정보 이론, 최적화, 수치 해석, 기하와 대칭까지 — 정의보다 공학 문제에서 출발해 그림을 직접 끌며 직관을 만들도록 썼습니다.",
    'status': "published",
    'level': "공대 학부",
    'stage': "foundations",
    'color': "#2b54d4",
    'colorDark': "#7d9bff",
    'topics': ["극한·급수", "복소수·페이저", "선형대수·SVD", "미분방정식", "푸리에·표본화", "확률·정보", "최적화·수치 해석", "기하·대칭"],
    'motif': "matrix",
    'featured': [{"title": "격자를 휘는 행렬", "desc": "기저 벡터를 끌면 공간 전체가 따라 휜다. 행렬식은 넓이 배율", "link": "chapters/linalg.html#sim-la-grid", "image": "img/sims/mathbook-sim-la-grid.jpg"}, {"title": "해밍 부호로 비트 고치기", "desc": "아무 비트나 뒤집으면 세 검사의 신드롬이 오류 위치를 가리킨다", "link": "chapters/information.html#sim-inf-hamming", "image": "img/sims/mathbook-sim-inf-hamming.jpg"}],
    'slug': "foundations",
    'legacyUrl': None,
}, {
    'id': "probability-statistics",
    'code': "PRB",
    'title': "확률과 통계",
    'subtitle': "확률과 통계 교과서",
    'headline': "동전을 던지고 표본을 다시 뽑으며 익히는 추론",
    'description': "자료 요약과 확률의 기초에서 출발해 조건부 확률과 베이즈 정리, 이산·연속 분포, 중심 극한 정리, 표본 분포와 추정, 가설 검정, 회귀와 분산 분석, 실험 계획, 확률 과정, 통계적 공정 관리, 신뢰성과 수율까지 — 동전을 던지고 공을 떨어뜨리고 표본을 수천 번 다시 뽑으며 눈으로 익히는 인터랙티브 교과서.",
    'status': "published",
    'level': "대학 1–2학년",
    'stage': "computing",
    'color': "#15803d",
    'colorDark': "#4ade80",
    'topics': ["자료와 확률", "확률 변수와 분포", "표본 분포·추정", "가설 검정", "회귀·분산 분석", "확률 과정·SPC"],
    'motif': "probability-statistics",
    'slug': "probability",
    'legacyUrl': None,
}]
# Books written in this repository. Keep these fields in sync with the book's own book.json.
LOCAL_BOOKS = [{
    'id': 'linearbook', 'code': 'LIN', 'title': 'LinearBook', 'subtitle': '선형대수 교과서',
    'headline': '숫자의 표가 아니라 공간을 움직이는 기계',
    'description': '벡터와 행렬에서 시작해 가우스 소거와 LU 분해, 벡터 공간과 계수, 직교성과 최소제곱, 행렬식, 고유값과 동역학, 대칭 행렬, 특이값 분해와 PCA, 수치 선형대수까지 — 격자를 직접 휘고 벡터를 끌며 한 학기 선형대수를 익히는 교과서.',
    'url': 'https://math.euiyun.com/linear/', 'repo': 'https://github.com/geniuskey/math-books', 'field': 'math',
    'status': 'published', 'level': '공대 1–2학년', 'stage': 'core', 'slug': 'linear', 'legacyUrl': None,
    'color': '#5f3dc4', 'colorDark': '#b197fc', 'motif': 'linear',
    'topics': ['벡터·행렬', '가우스 소거·LU', '부분공간·계수', '직교성·최소제곱', '고유값', 'SVD·PCA'],
}, {
    'id': 'calculusbook', 'code': 'CAL', 'title': 'CalculusBook', 'subtitle': '미적분 교과서',
    'headline': '변화율과 누적, 두 개의 눈으로 보는 세계',
    'description': '극한과 연속에서 시작해 도함수와 연쇄 법칙, 평균값 정리와 최적화, 정적분과 미적분의 기본 정리, 적분 기법과 응용, 수열과 급수, 테일러 전개, 편미분과 그래디언트, 중적분과 벡터 미적분까지 — 접선을 끌고 직사각형을 쌓으며 1년 미적분을 익히는 교과서.',
    'url': 'https://math.euiyun.com/calculus/', 'repo': 'https://github.com/geniuskey/math-books', 'field': 'math',
    'status': 'published', 'level': '공대 1학년', 'stage': 'core', 'slug': 'calculus', 'legacyUrl': None,
    'color': '#c2255c', 'colorDark': '#f783ac', 'motif': 'calculus',
    'topics': ['극한·연속', '미분·최적화', '적분·기본 정리', '급수·테일러', '편미분·그래디언트', '중적분·벡터 미적분'],
}, {
    'id': 'odebook', 'code': 'ODE', 'title': 'ODEBook', 'subtitle': '미분방정식 교과서',
    'headline': '변화의 법칙에서 미래를 계산한다',
    'description': '방향장과 1계 방정식, 위상선과 수치 해법, 2계 선형 방정식과 진동·공진, 라플라스 변환과 전달 함수, 연립 방정식과 위상 평면, 비선형 안정성과 혼돈, 급수해와 푸리에 급수, 편미분방정식 입문까지 — 회로·기계·열을 직접 시뮬레이션하며 익히는 미분방정식 교과서.',
    'url': 'https://math.euiyun.com/ode/', 'repo': 'https://github.com/geniuskey/math-books', 'field': 'math',
    'status': 'published', 'level': '공대 2학년', 'stage': 'core', 'slug': 'ode', 'legacyUrl': None,
    'color': '#e8590c', 'colorDark': '#ffa94d', 'motif': 'ode',
    'topics': ['방향장·1계 방정식', '수치 해법', '진동·공진', '라플라스·전달 함수', '위상 평면·안정성', '혼돈·편미분방정식'],
}, {
    'id': 'numericalbook', 'code': 'NUM', 'title': 'NumericalBook', 'subtitle': '수치해석 교과서',
    'headline': '컴퓨터가 수학을 근사하는 방법',
    'description': '부동소수점과 오차, 조건수와 안정성, 근 찾기, 보간·스플라인·최소제곱과 FFT, 수치 미분과 적분, 미분방정식 해법, 직접·반복 선형 해법과 고유값 계산, 수치 최적화, 편미분방정식의 수치 해법까지 — 알고리즘을 한 단계씩 돌려 보며 오차를 재는 수치해석 교과서.',
    'url': 'https://math.euiyun.com/numerical/', 'repo': 'https://github.com/geniuskey/math-books', 'field': 'math',
    'status': 'published', 'level': '공대 3학년', 'stage': 'computing', 'slug': 'numerical', 'legacyUrl': None,
    'color': '#2b8a3e', 'colorDark': '#8ce99a', 'motif': 'numerical',
    'topics': ['오차·조건수', '근 찾기', '보간·근사·FFT', '수치 미적분', '수치 선형대수', '최적화·PDE'],
}]
books = IMPORTED_BOOKS + LOCAL_BOOKS
catalog = []
for book in books:
    entry = {k: book[k] for k in ('id','title','subtitle','headline','description','stage','status','color','colorDark','topics','motif','code','legacyUrl','slug')}
    entry['url'] = book['slug'] + '/'
    pages = list((ROOT / book['slug'] / 'chapters').glob('*.html'))
    entry['chapters'] = len(pages)
    entry['simulators'] = sum(p.read_text().count('class="sim"') for p in pages)
    catalog.append(entry)
catalog.extend(json.loads((ROOT / 'roadmap.json').read_text()))

# The map groups books by stage; every book sits in exactly one group.
shelf = json.loads((ROOT / 'book.json').read_text())
shelf_map = shelf['map']
stages = {group['id'] for group in shelf_map['groups']}
ids = {book['id'] for book in catalog}
missing = [book['id'] for book in catalog if book['stage'] not in stages]
assert not missing, f'Books without a map group: {missing}'
for a, b, reason in shelf_map['links']:
    assert a in ids and b in ids and a != b and reason.strip(), f'Bad map link: {a} → {b}'

dump = lambda value: json.dumps(value, ensure_ascii=False, indent=2)
(ROOT / 'catalog.js').write_text('/* Generated by tools/sync-catalog.py. Text: CC BY 4.0. */\n'
                                 f'window.MATH_BOOKS = {dump(catalog)};\nwindow.MATH_MAP = {dump(shelf_map)};\n')
(ROOT / 'catalog.json').write_text(dump({
    'format': 'euiyun-shelf/1',
    'shelf': {key: shelf[key] for key in ('id', 'title', 'url', 'field')},
    'map': shelf_map,
    'books': catalog,
}) + '\n')
print(f'Catalog: {len(books)} published, {len(catalog)-len(books)} planned')

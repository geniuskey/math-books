/* 생성 파일 — course.json을 고치고 python3 tools/build.py 를 실행하세요. */
SB.registerCourse({
 "id": "probability-statistics",
 "title": "확률과 통계",
 "en": "Probability and Statistics",
 "field": "math",
 "level": "대학 1–2학년 · 반도체 기초",
 "status": "published",
 "description": "자료 요약과 확률의 기초에서 출발해 조건부 확률과 베이즈 정리, 이산·연속 분포, 중심 극한 정리, 표본 분포와 추정, 가설 검정, 회귀와 분산 분석, 실험 계획, 확률 과정, 통계적 공정 관리, 신뢰성과 수율까지 — 동전을 던지고 공을 떨어뜨리고 표본을 수천 번 다시 뽑으며 눈으로 익히는 인터랙티브 교과서.",
 "accent": {
  "light": "#15803d",
  "dark": "#4ade80",
  "light2": "#a21caf",
  "dark2": "#e879f9"
 },
 "mark": "<path d=\"M4 24c3 0 4.5-1.5 6-5s3-11 6-11 4.5 7.5 6 11 3 5 6 5\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M6 27h20\" stroke=\"#fff\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><circle cx=\"10\" cy=\"8\" r=\"1.6\" fill=\"#fff\"/><circle cx=\"22\" cy=\"6\" r=\"1.6\" fill=\"#fff\"/><circle cx=\"25\" cy=\"12\" r=\"1.6\" fill=\"#fff\"/>",
 "parts": [
  {
   "title": "제1부 자료와 확률",
   "chapters": [
    {
     "slug": "descriptive",
     "num": "01",
     "title": "자료의 요약과 시각화",
     "en": "Describing Data",
     "desc": "자료의 종류와 척도, 도수 분포와 히스토그램(계급 폭의 영향), 평균·중앙값·최빈값, 분산·표준 편차·사분위 범위, 상자 그림과 이상값, 왜도와 첨도, 산점도와 상관 계수 — 웨이퍼 막두께 측정값 한 묶음을 숫자 몇 개로 말하기.",
     "tags": [
      "히스토그램",
      "표준 편차"
     ]
    },
    {
     "slug": "probability",
     "num": "02",
     "title": "확률의 기초",
     "en": "Foundations of Probability",
     "desc": "표본 공간과 사건, 벤 다이어그램과 집합 연산, 확률의 공리와 기본 성질, 상대 도수와 대수의 법칙의 직관, 경우의 수(순열·조합·중복), 고전적 확률 문제(생일 문제, 몬티 홀 맛보기) — 칩 하나가 불량일 확률.",
     "tags": [
      "표본 공간",
      "조합"
     ]
    },
    {
     "slug": "conditional",
     "num": "03",
     "title": "조건부 확률과 베이즈 정리",
     "en": "Conditional Probability and Bayes",
     "desc": "조건부 확률과 곱셈 법칙, 확률 나무, 독립 사건과 직렬·병렬 계통의 신뢰도, 전확률 공식, 베이즈 정리와 기저율 오류, 사전·사후 확률의 갱신, 몬티 홀 — 검사 장비의 과검출·미검출과 불량 원인 추적.",
     "tags": [
      "베이즈 정리",
      "독립"
     ]
    }
   ]
  },
  {
   "title": "제2부 확률 변수와 분포",
   "chapters": [
    {
     "slug": "discrete",
     "num": "04",
     "title": "이산 확률 변수",
     "en": "Discrete Random Variables",
     "desc": "확률 변수와 확률 질량 함수·누적 분포 함수, 기댓값과 분산의 성질, 베르누이·이항·기하·음이항·초기하·포아송 분포, 포아송 근사, 적률 생성 함수 — 웨이퍼당 결함 수와 로트 샘플링 검사.",
     "tags": [
      "이항 분포",
      "포아송 분포"
     ]
    },
    {
     "slug": "continuous",
     "num": "05",
     "title": "연속 확률 변수",
     "en": "Continuous Random Variables",
     "desc": "확률 밀도 함수와 누적 분포 함수, 기댓값·분산·분위수, 균일·지수(무기억성)·정규·감마·베타·로그 정규·와이블 분포, 표준화와 z 값, 확률 변수의 변환과 역변환 표본 추출 — 임계 치수(CD) 산포와 소자 수명.",
     "tags": [
      "정규 분포",
      "지수 분포"
     ]
    },
    {
     "slug": "joint",
     "num": "06",
     "title": "결합 분포",
     "en": "Joint Distributions",
     "desc": "결합·주변·조건부 분포, 독립 확률 변수, 공분산과 상관 계수, 이변량 정규 분포와 등고선, 확률 변수의 합과 합성곱, 선형 결합의 평균·분산, 오차 전파, 다항 분포 — 두께와 굴절률, 문턱 전압과 누설 전류의 함께 흔들림.",
     "tags": [
      "공분산",
      "오차 전파"
     ]
    },
    {
     "slug": "limit-theorems",
     "num": "07",
     "title": "극한 정리와 시뮬레이션",
     "en": "Limit Theorems and Simulation",
     "desc": "마르코프·체비쇼프 부등식, 큰 수의 법칙, 중심 극한 정리와 갈톤 보드, 이항·포아송의 정규 근사와 연속성 수정, 몬테카를로 적분과 오차, 의사 난수와 재현성 — 수많은 작은 요인이 만드는 정규 산포.",
     "tags": [
      "중심 극한 정리",
      "몬테카를로"
     ]
    }
   ]
  },
  {
   "title": "제3부 통계적 추론",
   "chapters": [
    {
     "slug": "sampling",
     "num": "08",
     "title": "표본 분포",
     "en": "Sampling Distributions",
     "desc": "모집단과 표본, 무작위 추출과 표본 추출 방법(층화·군집), 통계량과 표본 분포, 표본 평균의 분포와 표준 오차, 카이제곱·t·F 분포의 유래와 모양, 표본 분산의 분포, 순서 통계량 — 웨이퍼 몇 점만 재고 전체를 말할 수 있을까.",
     "tags": [
      "표준 오차",
      "t 분포"
     ]
    },
    {
     "slug": "estimation",
     "num": "09",
     "title": "점추정",
     "en": "Point Estimation",
     "desc": "추정량과 추정값, 불편성·효율성·일치성, 평균 제곱 오차와 편향–분산 분해, 적률법, 최대 가능도 추정(가능도 곡면 탐색), 피셔 정보와 크라메르–라오 하한, 베이즈 추정 맛보기 — 결함 밀도와 고장률 추정.",
     "tags": [
      "최대 가능도",
      "불편 추정"
     ]
    },
    {
     "slug": "confidence",
     "num": "10",
     "title": "구간 추정",
     "en": "Confidence Intervals",
     "desc": "신뢰 구간의 뜻(100개 구간 실험), 모평균의 z·t 구간, 모비율의 구간(왈드·윌슨), 모분산의 구간, 두 모집단 비교 구간, 표본 크기 결정, 예측 구간과 공차 구간, 부트스트랩 — 수율 95% 신뢰 구간과 측정 반복 횟수.",
     "tags": [
      "신뢰 구간",
      "부트스트랩"
     ]
    },
    {
     "slug": "hypothesis",
     "num": "11",
     "title": "가설 검정",
     "en": "Hypothesis Testing",
     "desc": "귀무·대립 가설, 검정 통계량과 기각역, p 값의 뜻과 오해, 1종·2종 오류와 검정력 곡선, 단일 표본·두 표본·대응 t 검정, 비율 검정, 분산 검정, 다중 비교와 본페로니 — 공정 변경 전후 스플릿 로트 비교.",
     "tags": [
      "p 값",
      "검정력"
     ]
    }
   ]
  },
  {
   "title": "제4부 통계 모형",
   "chapters": [
    {
     "slug": "categorical",
     "num": "12",
     "title": "범주형 자료와 비모수 검정",
     "en": "Categorical Data and Nonparametric Tests",
     "desc": "카이제곱 적합도 검정, 분할표와 독립성·동질성 검정, 피셔 정확 검정, 정규성 확인(Q–Q 그림, 콜모고로프–스미르노프), 부호 검정, 윌콕슨 순위합(만–휘트니) 검정, 순열 검정 — 장비별 불량 유형 분포와 빈(bin) 비교.",
     "tags": [
      "카이제곱 검정",
      "순위 검정"
     ]
    },
    {
     "slug": "regression",
     "num": "13",
     "title": "회귀 분석",
     "en": "Regression Analysis",
     "desc": "최소 제곱 직선과 잔차, 결정 계수와 상관, 회귀 계수의 추론(구간·검정), 신뢰 대 예측 띠, 잔차 진단과 영향점·지렛값, 다중 회귀와 행렬 표기, 다항·변환 회귀와 과적합, 로지스틱 회귀 맛보기 — 검량선과 가상 계측(VM).",
     "tags": [
      "최소 제곱",
      "결정 계수"
     ]
    },
    {
     "slug": "anova-doe",
     "num": "14",
     "title": "분산 분석과 실험 계획",
     "en": "ANOVA and Design of Experiments",
     "desc": "일원 분산 분석과 F 검정, 사후 비교(투키), 이원 분산 분석과 교호 작용, 랜덤화·반복·블록화, 2ᵏ 요인 실험과 주효과·교호 효과, 부분 요인 실험과 교락, 반응 표면법과 중심 합성 계획 — 식각 조건 최적화.",
     "tags": [
      "분산 분석",
      "요인 실험"
     ]
    }
   ]
  },
  {
   "title": "제5부 공학 응용",
   "chapters": [
    {
     "slug": "stochastic",
     "num": "15",
     "title": "확률 과정",
     "en": "Stochastic Processes",
     "desc": "랜덤 워크와 확산, 포아송 과정과 도착 간격, 마르코프 연쇄와 전이 행렬·정상 분포, 흡수 상태와 도달 시간, 대기 행렬(M/M/1)과 리틀의 법칙, 자기 상관과 백색 잡음 — 팹의 장비 대기열과 노이즈.",
     "tags": [
      "마르코프 연쇄",
      "포아송 과정"
     ]
    },
    {
     "slug": "spc",
     "num": "16",
     "title": "통계적 공정 관리",
     "en": "Statistical Process Control",
     "desc": "공통 원인과 특수 원인, X̄–R·X̄–s·개별값 관리도, p·np·c·u 관리도, 웨스턴 일렉트릭 규칙과 ARL, EWMA·CUSUM, 공정 능력 지수 Cp·Cpk와 ppm, 측정 시스템 분석(Gage R&R), 합격 판정 샘플링과 OC 곡선 — 팹의 SPC 화면 읽기.",
     "tags": [
      "관리도",
      "공정 능력"
     ]
    },
    {
     "slug": "reliability-yield",
     "num": "17",
     "title": "신뢰성과 수율",
     "en": "Reliability and Yield",
     "desc": "신뢰도 함수와 고장률, 욕조 곡선, 지수·와이블·로그 정규 수명, 와이블 확률지와 모수 추정, 중도 절단 자료, 가속 수명 시험(아레니우스·멱법칙)과 FIT, 계통 신뢰도, 수율 모형(포아송·머피·음이항)과 결함 군집, 번인 — 칩 수명과 다이 수율.",
     "tags": [
      "와이블",
      "수율 모형"
     ]
    }
   ]
  },
  {
   "title": "부록",
   "appendix": true,
   "chapters": [
    {
     "slug": "tables",
     "num": "A",
     "title": "분포표와 계산기",
     "en": "Distribution Tables and Calculators",
     "desc": "표준 정규·t·카이제곱·F·이항·포아송 분포의 확률과 분위수를 계산기와 표로 찾고, 관리도 계수와 자주 쓰는 공식을 한곳에 모았다.",
     "tags": [
      "부록",
      "분포표"
     ]
    },
    {
     "slug": "glossary",
     "num": "B",
     "title": "용어집과 종합 문제",
     "en": "Glossary and Review",
     "desc": "핵심 용어를 검색하고 장별 종합 문제로 실력을 점검한다.",
     "tags": [
      "부록",
      "정리"
     ]
    }
   ]
  }
 ],
 "stats": {
  "descriptive": {
   "problems": 16,
   "examples": 8,
   "sims": 9,
   "figures": 17,
   "drills": 4,
   "minis": 10,
   "tangles": 6,
   "steps": 3,
   "predicts": 4,
   "hero": 1
  },
  "probability": {
   "problems": 16,
   "examples": 8,
   "sims": 7,
   "figures": 15,
   "drills": 3,
   "minis": 9,
   "tangles": 5,
   "steps": 3,
   "predicts": 8,
   "hero": 1
  },
  "conditional": {
   "problems": 16,
   "examples": 8,
   "sims": 8,
   "figures": 13,
   "drills": 3,
   "minis": 7,
   "tangles": 5,
   "steps": 2,
   "predicts": 5,
   "hero": 1
  },
  "discrete": {
   "problems": 16,
   "examples": 8,
   "sims": 9,
   "figures": 17,
   "drills": 4,
   "minis": 10,
   "tangles": 7,
   "steps": 4,
   "predicts": 7,
   "hero": 1
  },
  "continuous": {
   "problems": 16,
   "examples": 8,
   "sims": 10,
   "figures": 13,
   "drills": 4,
   "minis": 7,
   "tangles": 6,
   "steps": 3,
   "predicts": 4,
   "hero": 1
  },
  "joint": {
   "problems": 16,
   "examples": 8,
   "sims": 8,
   "figures": 14,
   "drills": 5,
   "minis": 8,
   "tangles": 8,
   "steps": 2,
   "predicts": 5,
   "hero": 1
  },
  "limit-theorems": {
   "problems": 16,
   "examples": 8,
   "sims": 9,
   "figures": 15,
   "drills": 4,
   "minis": 8,
   "tangles": 6,
   "steps": 4,
   "predicts": 7,
   "hero": 1
  },
  "sampling": {
   "problems": 16,
   "examples": 8,
   "sims": 8,
   "figures": 11,
   "drills": 3,
   "minis": 6,
   "tangles": 5,
   "steps": 2,
   "predicts": 5,
   "hero": 1
  },
  "estimation": {
   "problems": 16,
   "examples": 8,
   "sims": 10,
   "figures": 13,
   "drills": 4,
   "minis": 6,
   "tangles": 8,
   "steps": 3,
   "predicts": 4,
   "hero": 1
  },
  "confidence": {
   "problems": 16,
   "examples": 8,
   "sims": 8,
   "figures": 12,
   "drills": 4,
   "minis": 7,
   "tangles": 5,
   "steps": 2,
   "predicts": 4,
   "hero": 1
  },
  "hypothesis": {
   "problems": 16,
   "examples": 8,
   "sims": 10,
   "figures": 13,
   "drills": 4,
   "minis": 7,
   "tangles": 4,
   "steps": 3,
   "predicts": 5,
   "hero": 1
  },
  "categorical": {
   "problems": 16,
   "examples": 9,
   "sims": 11,
   "figures": 15,
   "drills": 4,
   "minis": 6,
   "tangles": 5,
   "steps": 5,
   "predicts": 6,
   "hero": 1
  },
  "regression": {
   "problems": 16,
   "examples": 8,
   "sims": 12,
   "figures": 14,
   "drills": 3,
   "minis": 8,
   "tangles": 5,
   "steps": 3,
   "predicts": 5,
   "hero": 1
  },
  "anova-doe": {
   "problems": 16,
   "examples": 7,
   "sims": 7,
   "figures": 13,
   "drills": 3,
   "minis": 7,
   "tangles": 5,
   "steps": 3,
   "predicts": 4,
   "hero": 1
  },
  "stochastic": {
   "problems": 16,
   "examples": 8,
   "sims": 11,
   "figures": 14,
   "drills": 4,
   "minis": 7,
   "tangles": 6,
   "steps": 3,
   "predicts": 6,
   "hero": 1
  },
  "spc": {
   "problems": 16,
   "examples": 8,
   "sims": 10,
   "figures": 13,
   "drills": 5,
   "minis": 8,
   "tangles": 8,
   "steps": 2,
   "predicts": 6,
   "hero": 1
  },
  "reliability-yield": {
   "problems": 16,
   "examples": 8,
   "sims": 10,
   "figures": 13,
   "drills": 4,
   "minis": 8,
   "tangles": 7,
   "steps": 2,
   "predicts": 6,
   "hero": 1
  },
  "tables": {
   "problems": 14,
   "examples": 0,
   "sims": 8,
   "figures": 1,
   "drills": 2,
   "minis": 0,
   "tangles": 4,
   "steps": 0,
   "predicts": 0,
   "hero": 0
  },
  "glossary": {
   "problems": 68,
   "examples": 0,
   "sims": 0,
   "figures": 0,
   "drills": 2,
   "minis": 0,
   "tangles": 0,
   "steps": 0,
   "predicts": 0,
   "hero": 0
  }
 },
 "published": 19,
 "total": 19,
 "url": "https://math.euiyun.com/probability/",
 "glossary": {
  "version": 1,
  "terms": [
   {
    "ko": "1/f 잡음",
    "en": "1/f noise",
    "abbr": "",
    "def": "전력 스펙트럼이 진동수에 반비례하는 잡음(플리커 잡음). 기억이 길어 오래 평균해도 잘 줄지 않는다.",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "2ᵏ 요인 실험",
    "en": "2ᵏ factorial design",
    "abbr": "",
    "def": "요인 \\(k\\)개를 각각 두 수준(−1, +1)으로 두고 모든 \\(2^k\\) 조합을 실행하는 실험.",
    "chapters": [
     "anova-doe#factorial"
    ]
   },
   {
    "ko": "3의 규칙",
    "en": "rule of three",
    "abbr": "",
    "def": "\\(n\\)개 중 불량이 0개일 때 불량률의 95% 단측 상한이 약 \\(3/n\\)이라는 규칙. 정확한 값은 \\(1 - 0.05^{1/n}\\).",
    "chapters": [
     "confidence#proportion"
    ]
   },
   {
    "ko": "AQL",
    "en": "acceptable quality level",
    "abbr": "",
    "def": "생산자가 합격되기를 바라는 좋은 품질 수준의 불량률. 이 불량률의 로트가 거부될 확률이 생산자 위험이다.",
    "chapters": [
     "spc#acceptance"
    ]
   },
   {
    "ko": "B10 수명",
    "en": "B10 life",
    "abbr": "",
    "def": "모집단의 10%가 고장 나는 시각. 와이블이면 \\(\\eta(-\\ln 0.9)^{1/\\beta}\\)이다.",
    "chapters": [
     "reliability-yield#weibull-plot"
    ]
   },
   {
    "ko": "F 분포",
    "en": "F distribution",
    "abbr": "",
    "def": "독립인 두 카이제곱 변수를 각자 자유도로 나눈 비 \\((\\chi^2_{\\nu_1}/\\nu_1)/(\\chi^2_{\\nu_2}/\\nu_2)\\)의 분포. 두 표본 분산의 비를 비교할 때 쓴다.",
    "chapters": [
     "sampling#t-f"
    ]
   },
   {
    "ko": "FIT",
    "en": "failures in time",
    "abbr": "",
    "def": "소자 \\(10^9\\)개를 한 시간 동작할 때의 기대 고장 수. 1 FIT = \\(10^{-9}\\)/h.",
    "chapters": [
     "reliability-yield#accelerated"
    ]
   },
   {
    "ko": "Gage R&R",
    "en": "gauge repeatability and reproducibility",
    "abbr": "",
    "def": "반복성과 재현성을 합친 측정 산포. 부품×작업자 교차 연구의 분산 분석으로 추정하고 %GRR, ndc로 판정한다.",
    "chapters": [
     "spc#msa"
    ]
   },
   {
    "ko": "LTPD",
    "en": "lot tolerance percent defective",
    "abbr": "",
    "def": "소비자가 거부되기를 바라는 나쁜 품질 수준의 불량률. 이 불량률의 로트가 합격할 확률이 소비자 위험이다.",
    "chapters": [
     "spc#acceptance"
    ]
   },
   {
    "ko": "OC 곡선",
    "en": "operating characteristic curve",
    "abbr": "",
    "def": "샘플링 계획의 로트 합격 확률 \\(P_a(p) = P(X\\le c)\\)를 로트 불량률 \\(p\\)에 대해 그린 곡선. 생산자 위험과 소비자 위험을 함께 보여 준다.",
    "chapters": [
     "discrete#hypergeom"
    ]
   },
   {
    "ko": "k-out-of-n 계통",
    "en": "k-out-of-n system",
    "abbr": "",
    "def": "\\(n\\)개의 부품 중 \\(k\\)개 이상이 동작하면 동작하는 계통. 같은 부품이면 신뢰도는 이항 분포의 합 \\(\\sum_{j\\ge k}\\binom nj r^j(1-r)^{n-j}\\)이다.",
    "chapters": [
     "conditional#reliability"
    ]
   },
   {
    "ko": "p 값",
    "en": "p-value",
    "abbr": "",
    "def": "\\(H_0\\)가 참일 때 검정 통계량이 관측값만큼 또는 그보다 극단적인 값이 나올 확률. \\(p \\le \\alpha\\)이면 \\(H_0\\)를 기각한다.",
    "chapters": [
     "hypothesis#pvalue"
    ]
   },
   {
    "ko": "p 해킹",
    "en": "p-hacking",
    "abbr": "",
    "def": "자료를 보면서 표본을 늘리거나 분석을 골라 p 값을 0.05 아래로 만드는 관행. 실제 제1종 오류 확률을 크게 부풀린다.",
    "chapters": [
     "hypothesis#pvalue"
    ]
   },
   {
    "ko": "t 분포",
    "en": "Student's t distribution",
    "abbr": "",
    "def": "\\(Z/\\sqrt{\\chi^2_\\nu/\\nu}\\)(\\(Z\\)와 \\(\\chi^2\\)는 독립)의 분포. 정규 표본에서 \\((\\bar X-\\mu)/(S/\\sqrt n) \\sim t_{n-1}\\)이며 정규 분포보다 꼬리가 두껍다.",
    "chapters": [
     "sampling#t-f"
    ]
   },
   {
    "ko": "z 값",
    "en": "z-score",
    "abbr": "",
    "def": "\\(z = (x - \\mu)/\\sigma\\). 값이 평균에서 표준 편차 몇 개만큼 떨어져 있는지를 나타내는 단위 없는 수.",
    "chapters": [
     "continuous#normal"
    ]
   },
   {
    "ko": "z 점수",
    "en": "z-score",
    "abbr": "",
    "def": "관측값이 평균에서 표준 편차 몇 개만큼 떨어졌는지 나타낸 값 \\((x - \\bar x)/s\\).",
    "chapters": [
     "descriptive#spread"
    ]
   },
   {
    "ko": "가능도",
    "en": "likelihood",
    "abbr": "",
    "def": "각 가설이 참일 때 관측된 증거가 나올 확률 \\(P(A\\mid B_j)\\). 가설의 함수로 보며, 합이 1일 필요는 없다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "가능도 함수",
    "en": "likelihood function",
    "abbr": "",
    "def": "관측된 자료를 고정하고 결합 밀도(또는 확률)를 모수의 함수로 본 것 \\(L(\\theta) = \\prod f(x_i;\\theta)\\). \\(\\theta\\)에 대한 확률 분포는 아니다.",
    "chapters": [
     "estimation#mle"
    ]
   },
   {
    "ko": "가능도비",
    "en": "likelihood ratio",
    "abbr": "",
    "def": "증거가 한 가설에서 나올 확률과 다른 가설에서 나올 확률의 비. 양성 검사의 \\(LR_+ = P(+\\mid D)/P(+\\mid D^c)\\)는 결과 하나가 오즈를 몇 배로 만드는지 말해 준다.",
    "chapters": [
     "conditional#updating"
    ]
   },
   {
    "ko": "가상 계측",
    "en": "virtual metrology, VM",
    "abbr": "",
    "def": "장비 센서 자료로 세운 모형으로 계측하지 않은 웨이퍼의 결과를 예측하는 기법.",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "가속 계수",
    "en": "acceleration factor",
    "abbr": "",
    "def": "사용 조건 수명과 스트레스 조건 수명의 비 \\(\\mathrm{AF} = t_u/t_s\\).",
    "chapters": [
     "reliability-yield#accelerated"
    ]
   },
   {
    "ko": "가속 수명 시험",
    "en": "accelerated life test",
    "abbr": "",
    "def": "온도·전압·습도 등 스트레스를 높여 고장 메커니즘을 빨리 진행시키고, 그 결과를 사용 조건으로 환산하는 시험.",
    "chapters": [
     "reliability-yield#accelerated"
    ]
   },
   {
    "ko": "가족별 오류율",
    "en": "familywise error rate, FWER",
    "abbr": "",
    "def": "여러 검정 가운데 적어도 하나에서 제1종 오류를 범할 확률. 독립 검정 \\(m\\)개면 \\(1 - (1-\\alpha)^m\\).",
    "chapters": [
     "hypothesis#multiple"
    ]
   },
   {
    "ko": "가중 평균",
    "en": "weighted mean",
    "abbr": "",
    "def": "값마다 무게 \\(w_i\\)를 주어 구한 평균 \\(\\sum w_ix_i/\\sum w_i\\).",
    "chapters": [
     "descriptive#center"
    ]
   },
   {
    "ko": "갈톤 보드",
    "en": "Galton board",
    "abbr": "",
    "def": "삼각형으로 박힌 못 사이로 구슬을 떨어뜨려, 각 못에서 좌우로 튀는 베르누이 시행의 합이 이항 분포를 거쳐 정규 분포 모양으로 쌓이는 것을 보여 주는 장치.",
    "chapters": [
     "limit-theorems#galton"
    ]
   },
   {
    "ko": "감마 분포",
    "en": "gamma distribution",
    "abbr": "",
    "def": "밀도 \\(x^{k-1}e^{-x/\\theta}/(\\Gamma(k)\\theta^k)\\)인 분포 \\(\\mathrm{Gamma}(k, \\theta)\\). 정수 \\(k\\)이면 독립 지수 분포 \\(k\\)개의 합이며, 평균 \\(k\\theta\\), 분산 \\(k\\theta^2\\).",
    "chapters": [
     "continuous#zoo"
    ]
   },
   {
    "ko": "강건성",
    "en": "robustness",
    "abbr": "",
    "def": "이상값이나 분포 가정의 어긋남에 통계량이 덜 흔들리는 성질. 중앙값·IQR은 강건하고 평균·표준 편차는 그렇지 않다.",
    "chapters": [
     "descriptive#center"
    ]
   },
   {
    "ko": "같은 것이 있는 순열",
    "en": "permutation of multisets",
    "abbr": "",
    "def": "같은 것이 \\(n_1, \\dots, n_r\\)개씩 섞인 \\(n\\)개를 늘어놓는 방법. 그 수는 \\(n!/(n_1!\\cdots n_r!)\\)(다항 계수).",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "거의 확실한 수렴",
    "en": "almost sure convergence",
    "abbr": "",
    "def": "\\(P(\\lim_{n\\to\\infty}X_n = c) = 1\\)일 때의 수렴. 표본 경로 하나하나가 확률 1로 결국 \\(c\\)에 붙는다는 뜻으로 확률 수렴보다 강하다.",
    "chapters": [
     "limit-theorems#lln"
    ]
   },
   {
    "ko": "거짓 발견율",
    "en": "false discovery rate, FDR",
    "abbr": "",
    "def": "기각한 가설 가운데 실제로는 참인 \\(H_0\\)의 비율의 기댓값. 벤저미니–호크버그 절차로 관리한다.",
    "chapters": [
     "hypothesis#multiple"
    ]
   },
   {
    "ko": "검사 역설",
    "en": "inspection paradox",
    "abbr": "",
    "def": "무작위 시각에 걸린 간격(진행 중인 구간)이 길이에 비례해 뽑혀 평균보다 길게 관찰되는 현상. 포아송 과정에서 그 평균은 \\(2/\\lambda\\)이다.",
    "chapters": [
     "stochastic#poisson"
    ]
   },
   {
    "ko": "검사관의 오류",
    "en": "prosecutor's fallacy",
    "abbr": "",
    "def": "\\(P(\\text{증거}\\mid\\text{무죄})\\)가 작다는 것을 \\(P(\\text{무죄}\\mid\\text{증거})\\)가 작다는 것으로 바꿔 읽는 잘못. 사전 확률 없이는 사후 확률을 말할 수 없다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "검정 통계량",
    "en": "test statistic",
    "abbr": "",
    "def": "자료가 \\(H_0\\)와 얼마나 어긋나는지를 요약한 통계량. \\(H_0\\) 아래의 분포를 알아야 한다(예: \\(Z = (\\bar X - \\mu_0)/(\\sigma/\\sqrt n)\\)).",
    "chapters": [
     "hypothesis#test-stat"
    ]
   },
   {
    "ko": "검정력",
    "en": "power",
    "abbr": "",
    "def": "거짓인 \\(H_0\\)를 올바르게 기각할 확률 \\(1 - \\beta\\). 효과 크기, 표본 크기, \\(\\alpha\\)가 클수록, 산포가 작을수록 커진다.",
    "chapters": [
     "hypothesis#power"
    ]
   },
   {
    "ko": "검정력 함수",
    "en": "power function",
    "abbr": "",
    "def": "참 모수값에 따른 기각 확률을 그린 곡선. \\(H_0\\)의 값에서 높이가 \\(\\alpha\\)이고 멀어질수록 1로 간다.",
    "chapters": [
     "hypothesis#power"
    ]
   },
   {
    "ko": "결과",
    "en": "outcome",
    "abbr": "",
    "def": "확률 실험을 한 번 했을 때 나오는 하나의 값. 표본 공간의 원소이며 \\(\\omega\\)로 쓴다.",
    "chapters": [
     "probability#sample-space"
    ]
   },
   {
    "ko": "결점",
    "en": "defect, nonconformity",
    "abbr": "",
    "def": "개체 위의 흠 하나하나. 검사 단위당 결점 수는 포아송 분포로 보고 c·u 관리도로 감시한다.",
    "chapters": [
     "spc#attributes"
    ]
   },
   {
    "ko": "결정 계수",
    "en": "coefficient of determination",
    "abbr": "",
    "def": "반응 변수의 변동 가운데 회귀식이 설명하는 비율 \\(R^2 = \\mathrm{SSR}/\\mathrm{SST} = 1 - \\mathrm{SSE}/\\mathrm{SST}\\). 단순 회귀에서는 \\(r^2\\)과 같다.",
    "chapters": [
     "regression#r-squared"
    ]
   },
   {
    "ko": "결함 군집",
    "en": "defect clustering",
    "abbr": "",
    "def": "결함이 웨이퍼 위에 고르게 흩어지지 않고 몇 곳에 뭉쳐 생기는 현상. 같은 결함 밀도에서 수율을 높인다.",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "결함 밀도",
    "en": "defect density",
    "abbr": "",
    "def": "단위 면적당 치명 결함 수 \\(D_0\\)(개/cm²). 수율 모형의 핵심 모수다.",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "결합 누적 분포 함수",
    "en": "joint cumulative distribution function",
    "abbr": "",
    "def": "\\(F_{X,Y}(x,y) = P(X\\le x,\\ Y\\le y)\\). 연속이면 \\(f_{X,Y} = \\partial^2F/\\partial x\\,\\partial y\\)이다.",
    "chapters": [
     "joint#joint-dist"
    ]
   },
   {
    "ko": "결합 확률 밀도 함수",
    "en": "joint probability density function",
    "abbr": "",
    "def": "영역 위에서 적분하면 두 연속 확률 변수가 그 영역에 들 확률이 되는 함수 \\(f_{X,Y}(x,y)\\). 곡면 아래 부피가 확률이다.",
    "chapters": [
     "joint#joint-dist"
    ]
   },
   {
    "ko": "결합 확률 질량 함수",
    "en": "joint probability mass function",
    "abbr": "",
    "def": "두 이산 확률 변수가 동시에 각 값을 가질 확률 \\(p_{X,Y}(x,y) = P(X = x,\\ Y = y)\\). 모든 칸의 합이 1인 표로 나타낼 수 있다.",
    "chapters": [
     "joint#joint-dist"
    ]
   },
   {
    "ko": "경쟁 위험",
    "en": "competing risks",
    "abbr": "",
    "def": "여러 고장 메커니즘 가운데 가장 먼저 일어나는 것이 수명을 정하는 모형. 신뢰도는 곱해지고 고장률은 더해진다.",
    "chapters": [
     "reliability-yield#bathtub"
    ]
   },
   {
    "ko": "경험적 누적 분포 함수",
    "en": "empirical CDF",
    "abbr": "",
    "def": "자료 중 \\(x\\) 이하인 비율 \\(F_n(x)\\). 자료점마다 \\(1/n\\)씩 뛰는 계단 함수다.",
    "chapters": [
     "categorical#normality"
    ]
   },
   {
    "ko": "계급",
    "en": "class, bin",
    "abbr": "",
    "def": "도수 분포표에서 값의 범위를 나눈 겹치지 않는 구간. 보통 \\([a, b)\\) 꼴이다.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "계급값",
    "en": "class mark",
    "abbr": "",
    "def": "계급의 가운데 값. 묶은 자료의 평균·분산을 근사할 때 쓴다.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "계승",
    "en": "factorial",
    "abbr": "",
    "def": "\\(n! = n(n-1)\\cdots2\\cdot1\\), \\(n\\)개를 모두 줄 세우는 방법의 수. \\(0! = 1\\)로 약속한다.",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "계통 추출",
    "en": "systematic sampling",
    "abbr": "",
    "def": "목록에서 무작위 시작점 하나를 고르고 그 뒤로 \\(k\\)번째마다 뽑는 방법. 목록에 주기 \\(k\\)의 무늬가 있으면 크게 틀린다.",
    "chapters": [
     "sampling#methods"
    ]
   },
   {
    "ko": "고장률",
    "en": "hazard rate, failure rate",
    "abbr": "",
    "def": "시각 \\(t\\)까지 살아남은 것이 다음 순간 고장 나는 비율 \\(h(t) = f(t)/R(t)\\). 지수 분포는 일정, 와이블 분포는 \\(t^{\\beta-1}\\)에 비례한다. 반도체에서는 FIT(\\(10^{-9}\\)/h)로 쓴다.",
    "chapters": [
     "continuous#uniform-exponential"
    ]
   },
   {
    "ko": "고전적 확률",
    "en": "classical probability",
    "abbr": "",
    "def": "모든 결과가 같은 가능성일 때 \\(P(A) = |A|/|\\Omega|\\)로 정하는 확률. 라플라스의 정의라고도 한다.",
    "chapters": [
     "probability#sample-space"
    ]
   },
   {
    "ko": "곱사건",
    "en": "intersection",
    "abbr": "",
    "def": "\\(A\\)와 \\(B\\)가 함께 일어나는 사건 \\(A\\cap B\\).",
    "chapters": [
     "probability#set-operations"
    ]
   },
   {
    "ko": "곱셈 법칙",
    "en": "multiplication rule",
    "abbr": "",
    "def": "교집합의 확률을 조건부 확률로 쓰는 규칙 \\(P(A\\cap B) = P(B)P(A\\mid B)\\). 여러 사건으로 늘리면 연쇄 법칙이 된다.",
    "chapters": [
     "conditional#conditional-prob"
    ]
   },
   {
    "ko": "곱의 법칙",
    "en": "multiplication rule",
    "abbr": "",
    "def": "1단계를 \\(n_1\\)가지, 그 각각에 대해 2단계를 \\(n_2\\)가지, …로 할 수 있으면 전체 방법은 \\(n_1n_2\\cdots\\)가지라는 세기 규칙.",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "공분산",
    "en": "covariance",
    "abbr": "",
    "def": "\\(\\operatorname{Cov}(X,Y) = E[(X-\\mu_X)(Y-\\mu_Y)] = E[XY] - \\mu_X\\mu_Y\\). 두 변수가 함께 평균보다 크거나 작으면 양수, 엇갈리면 음수다.",
    "chapters": [
     "joint#covariance"
    ]
   },
   {
    "ko": "공정 능력 지수",
    "en": "process capability index",
    "abbr": "",
    "def": "규격 폭과 공정 산포를 견주는 지수. \\(C_p = (\\mathrm{USL}-\\mathrm{LSL})/6\\sigma\\), \\(C_{pk} = \\min(\\mathrm{USL}-\\mu, \\mu-\\mathrm{LSL})/3\\sigma\\).",
    "chapters": [
     "spc#capability"
    ]
   },
   {
    "ko": "공차 구간",
    "en": "tolerance interval",
    "abbr": "",
    "def": "모집단의 정해진 비율 \\(P\\) 이상을 신뢰 수준 \\(1-\\alpha\\)로 덮는 구간. 정규 모집단에서 \\(\\bar x \\pm k s\\) 꼴이다.",
    "chapters": [
     "confidence#prediction"
    ]
   },
   {
    "ko": "공통 원인",
    "en": "common cause, chance cause",
    "abbr": "",
    "def": "공정에 늘 존재하는 수많은 작고 독립적인 요인에서 오는 변동. 출력 분포를 시간에 따라 일정하게 유지하며, 줄이려면 공정 자체를 바꿔야 한다.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "과검출",
    "en": "overkill, false alarm",
    "abbr": "",
    "def": "양품을 불량으로 판정하는 오류(위양성). 반도체 테스트에서는 과잉 불량(overkill)이라 하며 수율 손실이 된다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "과대 산포",
    "en": "overdispersion",
    "abbr": "",
    "def": "개수 자료의 분산이 포아송 모형이 예측하는 값(평균)보다 큰 현상. 결함이 뭉쳐 있거나 조건이 단위마다 다를 때 생긴다.",
    "chapters": [
     "discrete#poisson"
    ]
   },
   {
    "ko": "과적합",
    "en": "overfitting",
    "abbr": "",
    "def": "모형이 학습 자료의 잡음까지 맞추어 새 자료에 대한 예측이 나빠지는 현상.",
    "chapters": [
     "regression#nonlinear"
    ]
   },
   {
    "ko": "관리 상태",
    "en": "in statistical control",
    "abbr": "",
    "def": "공정에 공통 원인 변동만 있어 출력의 분포가 시간에 따라 변하지 않는 상태. 안정을 뜻할 뿐 규격 만족을 뜻하지는 않는다.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "관리 한계",
    "en": "control limits",
    "abbr": "",
    "def": "관리도의 위·아래 경계 \\(\\mu_W \\pm L\\sigma_W\\). 보통 \\(L = 3\\)이며, 공정 자료에서 계산한다.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "관리도",
    "en": "control chart",
    "abbr": "",
    "def": "공정에서 주기적으로 뽑은 표본의 통계량을 시간순으로 찍고 중심선과 관리 한계를 그려, 특수 원인의 발생을 판단하는 그림. 점마다 되풀이하는 가설 검정이다.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "관측 도수",
    "en": "observed frequency",
    "abbr": "",
    "def": "실제 자료에서 각 범주(칸)에 들어간 개수 \\(O_i\\).",
    "chapters": [
     "categorical#gof"
    ]
   },
   {
    "ko": "교락",
    "en": "confounding",
    "abbr": "",
    "def": "두 효과(또는 처리와 방해 요인)가 자료에서 함께 움직여 서로 구별할 수 없는 상태.",
    "chapters": [
     "anova-doe#principles"
    ]
   },
   {
    "ko": "교차 검증",
    "en": "cross-validation",
    "abbr": "",
    "def": "자료를 나누어 일부로 맞추고 나머지를 예측하는 일을 돌아가며 해 예측 오차를 추정하는 방법.",
    "chapters": [
     "regression#nonlinear"
    ]
   },
   {
    "ko": "교호 작용",
    "en": "interaction",
    "abbr": "",
    "def": "한 요인의 효과가 다른 요인의 수준에 따라 달라지는 현상. 교호 작용 그림에서 선이 평행하지 않다.",
    "chapters": [
     "anova-doe#twoway"
    ]
   },
   {
    "ko": "교환 가능성",
    "en": "exchangeability",
    "abbr": "",
    "def": "관측값의 이름표(집단)를 바꿔 붙여도 결합 분포가 변하지 않는 성질. 순열 검정이 성립하는 조건이다.",
    "chapters": [
     "categorical#permutation"
    ]
   },
   {
    "ko": "구간 척도",
    "en": "interval scale",
    "abbr": "",
    "def": "차이는 의미 있지만 0이 임의로 정해져 비는 의미 없는 척도. 섭씨 온도, 날짜.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "구간 추정",
    "en": "interval estimation",
    "abbr": "",
    "def": "표본으로 계산한 두 통계량 \\(L\\), \\(U\\)로 범위 \\([L, U]\\)를 만들어 모수를 짐작하는 일.",
    "chapters": [
     "confidence#meaning"
    ]
   },
   {
    "ko": "군집 모수",
    "en": "cluster parameter",
    "abbr": "",
    "def": "음이항 수율 모형의 모수 \\(\\alpha\\). 작을수록 결함이 심하게 뭉치고, \\(\\alpha \\to \\infty\\)이면 포아송 모형이 된다.",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "군집 추출",
    "en": "cluster sampling",
    "abbr": "",
    "def": "모집단을 군집으로 나누고 몇 개 군집을 골라 그 안을 모두 관측하는 방법. 싸지만 군집 안 상관 때문에 정밀도가 떨어진다.",
    "chapters": [
     "sampling#methods"
    ]
   },
   {
    "ko": "귀무가설",
    "en": "null hypothesis",
    "abbr": "",
    "def": "'변화·차이·효과 없음'을 말하는 기준 가설 \\(H_0\\). 등호를 포함하고, 증거가 충분하지 않으면 유지된다.",
    "chapters": [
     "hypothesis#hypotheses"
    ]
   },
   {
    "ko": "규격 한계",
    "en": "specification limits",
    "abbr": "",
    "def": "고객이나 설계가 정한, 개별 제품이 쓸 수 있는 범위의 경계 USL·LSL. 관리 한계와 출처가 다르다.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "균일 분포",
    "en": "uniform distribution",
    "abbr": "",
    "def": "구간 \\([a, b]\\)의 모든 점에 같은 밀도 \\(1/(b-a)\\)를 주는 분포 \\(U(a,b)\\). 평균 \\((a+b)/2\\), 분산 \\((b-a)^2/12\\).",
    "chapters": [
     "continuous#uniform-exponential"
    ]
   },
   {
    "ko": "기각역",
    "en": "rejection region, critical region",
    "abbr": "",
    "def": "\\(H_0\\)가 참일 때 좀처럼 나오지 않는 검정 통계량 값의 영역. 통계량이 여기에 들면 \\(H_0\\)를 기각한다.",
    "chapters": [
     "hypothesis#test-stat"
    ]
   },
   {
    "ko": "기대 도수",
    "en": "expected frequency",
    "abbr": "",
    "def": "귀무가설이 참일 때 각 칸에 들어갈 것으로 기대되는 개수. 적합도 검정에서는 \\(E_i = np_{i0}\\), 분할표에서는 \\(E_{ij} = R_iC_j/N\\).",
    "chapters": [
     "categorical#gof"
    ]
   },
   {
    "ko": "기댓값",
    "en": "expected value",
    "abbr": "",
    "def": "확률을 가중치로 한 평균 \\(E[X] = \\sum_x x\\,p_X(x)\\). pmf의 무게 중심이자 반복 실험의 장기 평균이다.",
    "chapters": [
     "discrete#expectation"
    ]
   },
   {
    "ko": "기본 행렬",
    "en": "fundamental matrix",
    "abbr": "",
    "def": "흡수 연쇄에서 \\(N = (I-Q)^{-1}\\). \\(N_{ij}\\)는 \\(i\\)에서 출발해 흡수 전까지 \\(j\\)를 방문하는 기대 횟수다.",
    "chapters": [
     "stochastic#absorbing"
    ]
   },
   {
    "ko": "기술 통계",
    "en": "descriptive statistics",
    "abbr": "",
    "def": "자료를 표·그림·요약 수치로 정리해 보여 주는 통계. 표본으로 모집단을 추론하는 추론 통계와 구별한다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "기약",
    "en": "irreducible",
    "abbr": "",
    "def": "모든 상태가 유한 걸음 안에 서로 오갈 수 있는 마르코프 연쇄의 성질.",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "기저율 오류",
    "en": "base rate fallacy",
    "abbr": "",
    "def": "사전 확률(기저율)을 무시하고 검사의 정확도만으로 사후 확률을 판단하는 잘못. 드문 사건에서는 양성 결과의 대부분이 오경보일 수 있다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "기하 분포",
    "en": "geometric distribution",
    "abbr": "",
    "def": "독립 시행을 첫 성공이 나올 때까지 되풀이한 시행 횟수의 분포. \\(P(X=k) = (1-p)^{k-1}p\\), 평균 \\(1/p\\), 분산 \\((1-p)/p^2\\).",
    "chapters": [
     "discrete#geometric"
    ]
   },
   {
    "ko": "누적 고장률",
    "en": "cumulative hazard",
    "abbr": "",
    "def": "고장률의 적분 \\(H(t) = \\int_0^t h(u)\\,du\\). 신뢰도와 \\(R(t) = e^{-H(t)}\\)의 관계가 있다.",
    "chapters": [
     "reliability-yield#reliability-function"
    ]
   },
   {
    "ko": "누적 도수",
    "en": "cumulative frequency",
    "abbr": "",
    "def": "첫 계급부터 해당 계급까지의 도수를 더한 값.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "누적 분포 함수",
    "en": "cumulative distribution function (cdf)",
    "abbr": "",
    "def": "\\(F_X(x) = P(X\\le x)\\). 0에서 1까지 줄지 않고 오르며, 이산 변수에서는 값이 있는 자리에서만 뛰는 계단이다. \\(P(a < X\\le b) = F_X(b) - F_X(a)\\).",
    "chapters": [
     "discrete#rv"
    ]
   },
   {
    "ko": "누적 합",
    "en": "cumulative sum, CUSUM",
    "abbr": "",
    "def": "목표에서 벗어난 양에서 허용치 \\(k\\)를 뺀 값을 0 아래로 내려가지 않게 쌓은 통계량 \\(C_i^\\pm\\). 결정 한계 \\(h\\)를 넘으면 경보를 낸다.",
    "chapters": [
     "spc#ewma-cusum"
    ]
   },
   {
    "ko": "다섯 숫자 요약",
    "en": "five-number summary",
    "abbr": "",
    "def": "최솟값, \\(Q_1\\), 중앙값, \\(Q_3\\), 최댓값의 다섯 수로 자료를 요약한 것.",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "다중 공선성",
    "en": "multicollinearity",
    "abbr": "",
    "def": "설명 변수끼리 강하게 상관된 상태. 계수의 표준 오차가 부풀고 해석이 불안정해진다.",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "다중 회귀",
    "en": "multiple regression",
    "abbr": "",
    "def": "설명 변수가 둘 이상인 회귀 모형 \\(Y = \\beta_0 + \\beta_1x_1 + \\cdots + \\beta_kx_k + \\varepsilon\\).",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "다항 분포",
    "en": "multinomial distribution",
    "abbr": "",
    "def": "\\(n\\)번의 독립 시행이 각각 확률 \\(p_1,\\dots,p_k\\)로 \\(k\\)개 범주 중 하나에 떨어질 때 범주별 개수의 결합 분포. 각 개수의 주변 분포는 이항이고 서로 다른 범주의 공분산은 \\(-np_ip_j\\)다.",
    "chapters": [
     "joint#multinomial"
    ]
   },
   {
    "ko": "다항 회귀",
    "en": "polynomial regression",
    "abbr": "",
    "def": "\\(x, x^2, \\dots, x^d\\)를 설명 변수로 쓰는 회귀. 계수에 대해 선형이라 다중 회귀로 푼다.",
    "chapters": [
     "regression#nonlinear"
    ]
   },
   {
    "ko": "단순 무작위 추출",
    "en": "simple random sampling",
    "abbr": "",
    "def": "모집단의 모든 \\(n\\)개 묶음이 같은 확률로 뽑히게 하는 추출 방법.",
    "chapters": [
     "sampling#population"
    ]
   },
   {
    "ko": "단순 선형 회귀",
    "en": "simple linear regression",
    "abbr": "",
    "def": "설명 변수 하나의 모형 \\(Y = \\beta_0 + \\beta_1x + \\varepsilon\\), \\(\\varepsilon \\sim N(0, \\sigma^2)\\) 독립.",
    "chapters": [
     "regression#inference"
    ]
   },
   {
    "ko": "단측 검정",
    "en": "one-sided test",
    "abbr": "",
    "def": "한 방향(크다 또는 작다)으로 벗어났는지만 보는 검정. 방향은 자료를 보기 전에 정한다.",
    "chapters": [
     "hypothesis#hypotheses"
    ]
   },
   {
    "ko": "대기 중복",
    "en": "standby redundancy",
    "abbr": "",
    "def": "예비 부품이 쉬고 있다가 주 부품이 고장 나면 전환되어 동작하는 중복 방식. 지수 부품 \\(n\\)개면 MTTF가 \\(n/\\lambda\\)이다.",
    "chapters": [
     "reliability-yield#system"
    ]
   },
   {
    "ko": "대기 행렬",
    "en": "queue",
    "abbr": "",
    "def": "도착·대기·서비스·떠남으로 이루어진 확률 모형. 머릿수, 대기 시간, 이용률을 다룬다.",
    "chapters": [
     "stochastic#queue"
    ]
   },
   {
    "ko": "대립가설",
    "en": "alternative hypothesis",
    "abbr": "",
    "def": "자료로 보이고 싶은 주장 \\(H_1\\). \\(\\mu \\ne \\mu_0\\), \\(\\mu > \\mu_0\\), \\(\\mu < \\mu_0\\) 꼴이 있다.",
    "chapters": [
     "hypothesis#hypotheses"
    ]
   },
   {
    "ko": "대비",
    "en": "contrast",
    "abbr": "",
    "def": "부호 열(±1)을 곱해 더한 반응의 선형 결합. 2ᵏ에서 효과 = 대비 \\(/(n2^{k-1})\\).",
    "chapters": [
     "anova-doe#factorial"
    ]
   },
   {
    "ko": "대수의 법칙",
    "en": "law of large numbers",
    "abbr": "",
    "def": "같은 조건에서 독립적으로 반복하면 상대 도수가 확률에서 일정 거리 이상 벗어날 확률이 \\(n\\to\\infty\\)에서 0으로 간다는 법칙.",
    "chapters": [
     "probability#frequency"
    ]
   },
   {
    "ko": "대응 t 검정",
    "en": "paired t-test",
    "abbr": "",
    "def": "같은 단위를 두 번 잰 짝 자료에서 차이 \\(D_i\\)의 평균이 0인지 보는 단일 표본 t 검정. 단위 간 산포가 빠진다.",
    "chapters": [
     "hypothesis#paired"
    ]
   },
   {
    "ko": "대응 표본",
    "en": "paired samples",
    "abbr": "",
    "def": "같은 대상(웨이퍼, 칩)을 두 조건에서 재어 짝을 이룬 표본. 차이 \\(d_i\\)에 단일 표본 t 구간을 쓴다.",
    "chapters": [
     "confidence#two-sample"
    ]
   },
   {
    "ko": "델타 방법",
    "en": "delta method",
    "abbr": "",
    "def": "함수를 평균점에서 1차 테일러 전개해 함수값의 평균과 분산을 근사하는 방법. 산포가 작고 함수가 매끄러울 때 정확하다.",
    "chapters": [
     "joint#propagation"
    ]
   },
   {
    "ko": "도박꾼의 파산",
    "en": "gambler's ruin",
    "abbr": "",
    "def": "두 흡수 장벽 0과 \\(N\\) 사이 랜덤 워크가 어느 장벽에 먼저 닿는가의 문제. 대칭이면 \\(h_k = k/N\\), 기대 걸음 \\(k(N-k)\\).",
    "chapters": [
     "stochastic#absorbing"
    ]
   },
   {
    "ko": "도박사의 오류",
    "en": "gambler's fallacy",
    "abbr": "",
    "def": "독립적인 시행에서 과거의 연속(예: 앞면 다섯 번)이 다음 결과의 확률을 바꾼다고 믿는 잘못.",
    "chapters": [
     "probability#frequency"
    ]
   },
   {
    "ko": "도수",
    "en": "frequency",
    "abbr": "",
    "def": "각 계급(또는 범주)에 속한 관측값의 개수.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "도수 분포표",
    "en": "frequency distribution",
    "abbr": "",
    "def": "계급마다 도수, 상대 도수, 누적 도수를 정리한 표.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "도착 간격",
    "en": "interarrival time",
    "abbr": "",
    "def": "연속한 두 사건 사이의 시간 \\(T_i\\). 포아송 과정에서는 서로 독립인 \\(\\mathrm{Exp}(\\lambda)\\)이다.",
    "chapters": [
     "stochastic#poisson"
    ]
   },
   {
    "ko": "독립",
    "en": "independent",
    "abbr": "",
    "def": "\\(P(A\\cap B) = P(A)P(B)\\)를 만족하는 두 사건의 관계. 한 사건이 일어났다는 정보가 다른 사건의 확률을 바꾸지 않는다.",
    "chapters": [
     "conditional#independence"
    ]
   },
   {
    "ko": "독립 증분",
    "en": "independent increments",
    "abbr": "",
    "def": "겹치지 않는 시간 구간에서 일어난 사건 수(증가량)가 서로 독립인 성질.",
    "chapters": [
     "stochastic#poisson"
    ]
   },
   {
    "ko": "독립 확률 변수",
    "en": "independent random variables",
    "abbr": "",
    "def": "모든 \\(x, y\\)에서 \\(p_{X,Y}(x,y) = p_X(x)p_Y(y)\\)(연속이면 밀도의 곱)인 확률 변수들. 한쪽을 알아도 다른 쪽의 분포가 바뀌지 않는다.",
    "chapters": [
     "joint#conditional-indep"
    ]
   },
   {
    "ko": "독립성 검정",
    "en": "test of independence",
    "abbr": "",
    "def": "한 표본을 두 변수로 분류한 분할표에서 두 변수가 독립인지 검정하는 카이제곱 검정. 자유도 \\((r-1)(c-1)\\).",
    "chapters": [
     "categorical#contingency"
    ]
   },
   {
    "ko": "동질성 검정",
    "en": "test of homogeneity",
    "abbr": "",
    "def": "행(집단)마다 정해진 수를 따로 뽑아 범주 분포가 모든 집단에서 같은지 검정하는 카이제곱 검정. 계산은 독립성 검정과 같다.",
    "chapters": [
     "categorical#contingency"
    ]
   },
   {
    "ko": "드모르간 법칙",
    "en": "De Morgan's laws",
    "abbr": "",
    "def": "\\((A\\cup B)^c = A^c\\cap B^c\\), \\((A\\cap B)^c = A^c\\cup B^c\\). 여사건과 합·곱사건을 바꿔 쓰는 규칙.",
    "chapters": [
     "probability#set-operations"
    ]
   },
   {
    "ko": "랜덤 워크",
    "en": "random walk",
    "abbr": "",
    "def": "독립인 걸음 \\(X_i\\)(보통 ±1)를 누적한 위치 \\(S_n = X_1+\\cdots+X_n\\). 대칭이면 퍼짐이 \\(\\sqrt n\\)으로 자란다.",
    "chapters": [
     "stochastic#random-walk"
    ]
   },
   {
    "ko": "랜덤화",
    "en": "randomization",
    "abbr": "",
    "def": "처리 배정과 실행 순서를 무작위로 정해 알 수 없는 방해 요인이 처리와 교락되지 않게 하는 원칙.",
    "chapters": [
     "anova-doe#principles"
    ]
   },
   {
    "ko": "로그 가능도",
    "en": "log-likelihood",
    "abbr": "",
    "def": "가능도 함수의 자연로그 \\(\\ell(\\theta) = \\sum \\ln f(x_i;\\theta)\\). 곱이 합이 되어 미분과 수치 계산이 쉽고, 최댓값의 위치는 가능도와 같다.",
    "chapters": [
     "estimation#mle"
    ]
   },
   {
    "ko": "로그 정규 분포",
    "en": "lognormal distribution",
    "abbr": "",
    "def": "\\(\\ln X \\sim N(\\mu, \\sigma^2)\\)인 양수 확률 변수 \\(X\\)의 분포. 중앙값 \\(e^\\mu\\), 평균 \\(e^{\\mu+\\sigma^2/2}\\)이며 작은 요인의 곱에서 나온다. EM 수명에 관례로 쓴다.",
    "chapters": [
     "continuous#zoo"
    ]
   },
   {
    "ko": "로지스틱 회귀",
    "en": "logistic regression",
    "abbr": "",
    "def": "0/1 반응의 확률을 \\(p = 1/(1 + e^{-(\\beta_0 + \\beta_1x)})\\)로 모형화하고 최대 가능도로 추정하는 회귀.",
    "chapters": [
     "regression#logistic"
    ]
   },
   {
    "ko": "로짓",
    "en": "logit",
    "abbr": "",
    "def": "오즈의 로그 \\(\\ln[p/(1 - p)]\\). 로지스틱 회귀에서 설명 변수의 선형식이 된다.",
    "chapters": [
     "regression#logistic"
    ]
   },
   {
    "ko": "리틀의 법칙",
    "en": "Little's law",
    "abbr": "",
    "def": "안정한 계에서 장기 평균 머릿수 = 도착률 × 평균 체류 시간, \\(L = \\lambda W\\). 재공 = 처리량 × 사이클 타임.",
    "chapters": [
     "stochastic#queue"
    ]
   },
   {
    "ko": "마르코프 부등식",
    "en": "Markov's inequality",
    "abbr": "",
    "def": "음이 아닌 확률 변수 \\(X\\)와 \\(a>0\\)에 대해 \\(P(X\\ge a)\\le E[X]/a\\)가 성립한다는 부등식. 평균만으로 오른쪽 꼬리 확률의 상한을 준다.",
    "chapters": [
     "limit-theorems#inequalities"
    ]
   },
   {
    "ko": "마르코프 성질",
    "en": "Markov property",
    "abbr": "",
    "def": "현재 상태가 주어지면 미래가 과거와 조건부 독립인 성질: \\(P(X_{n+1}\\mid X_n,\\dots,X_0) = P(X_{n+1}\\mid X_n)\\).",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "마르코프 연쇄",
    "en": "Markov chain",
    "abbr": "",
    "def": "마르코프 성질을 갖는 이산 상태 확률 과정. 전이 행렬 \\(P\\)로 완전히 정해진다.",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "마모 고장",
    "en": "wear-out",
    "abbr": "",
    "def": "재료가 닳아 수명 끝에 고장률이 커지는 구간(와이블 \\(\\beta > 1\\)).",
    "chapters": [
     "reliability-yield#bathtub"
    ]
   },
   {
    "ko": "마할라노비스 거리",
    "en": "Mahalanobis distance",
    "abbr": "",
    "def": "상관과 척도를 고려한 평균으로부터의 거리. 이변량 정규에서 \\(d^2 = (z_x^2 - 2\\rho z_xz_y + z_y^2)/(1-\\rho^2)\\)이며 자유도 2인 카이제곱 분포를 따른다.",
    "chapters": [
     "joint#bivariate"
    ]
   },
   {
    "ko": "만–휘트니 U 검정",
    "en": "Mann–Whitney U test",
    "abbr": "",
    "def": "표본 1의 값이 표본 2의 값보다 큰 쌍의 수 \\(U\\)로 두 독립 표본을 비교하는 순위 검정. \\(H_0\\) 아래 평균 \\(n_1n_2/2\\).",
    "chapters": [
     "categorical#mann-whitney"
    ]
   },
   {
    "ko": "머피 모형",
    "en": "Murphy model",
    "abbr": "",
    "def": "결함 밀도가 삼각 분포라고 보고 얻은 수율 모형 \\(Y = ((1-e^{-D_0A})/D_0A)^2\\).",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "명목 척도",
    "en": "nominal scale",
    "abbr": "",
    "def": "값이 같다·다르다만 의미 있는 척도. 장비 ID, 결함 유형, 빈 코드.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "명중–실패법",
    "en": "hit-or-miss method",
    "abbr": "",
    "def": "함수 그래프를 둘러싼 상자에 점을 균일하게 뿌려 곡선 아래에 든 비율로 넓이(적분)를 추정하는 몬테카를로 방법. 같은 표본 수에서 표본 평균법보다 분산이 크다.",
    "chapters": [
     "limit-theorems#monte-carlo"
    ]
   },
   {
    "ko": "모수",
    "en": "parameter",
    "abbr": "",
    "def": "모집단을 설명하는 고정된 수. 모평균 \\(\\mu\\), 모분산 \\(\\sigma^2\\) 등.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "모자 행렬",
    "en": "hat matrix",
    "abbr": "",
    "def": "적합값을 \\(\\hat y = Hy\\)로 주는 사영 행렬 \\(H = X(X^{\\mathsf T}X)^{-1}X^{\\mathsf T}\\).",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "모집단",
    "en": "population",
    "abbr": "",
    "def": "관심을 두는 대상 전체 또는 그 전체의 값. 웨이퍼 위 모든 점의 막두께처럼 보통 전부 잴 수 없다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "몬테카를로 방법",
    "en": "Monte Carlo method",
    "abbr": "",
    "def": "구하려는 양을 확률 변수의 기댓값으로 쓰고, 난수로 표본을 많이 뽑아 평균을 내어 근사하는 계산법. 오차는 표준 오차 \\(\\sigma/\\sqrt N\\)로 준다.",
    "chapters": [
     "limit-theorems#monte-carlo"
    ]
   },
   {
    "ko": "몬테카를로 적분",
    "en": "Monte Carlo integration",
    "abbr": "",
    "def": "\\(\\int_a^b f(x)\\,dx = (b-a)E[f(U)]\\), \\(U\\sim U(a,b)\\)를 이용해 균일 난수에서의 함숫값 평균으로 적분을 추정하는 방법. 오차가 차원과 무관하다.",
    "chapters": [
     "limit-theorems#monte-carlo"
    ]
   },
   {
    "ko": "몬티 홀 문제",
    "en": "Monty Hall problem",
    "abbr": "",
    "def": "세 문 중 하나를 고른 뒤 진행자가 염소 문을 열어 줄 때, 선택을 바꾸면 이길 확률이 2/3가 되는 문제. 조건부 확률로 설명된다.",
    "chapters": [
     "probability#classic"
    ]
   },
   {
    "ko": "무기억성",
    "en": "memorylessness",
    "abbr": "",
    "def": "이미 \\(m\\)번 실패했다는 정보가 남은 횟수의 분포를 바꾸지 않는 성질 \\(P(X > m+n\\mid X > m) = P(X > n)\\). 이산 분포에서는 기하 분포만 갖는다.",
    "chapters": [
     "discrete#geometric"
    ]
   },
   {
    "ko": "무의식적 통계학자의 법칙",
    "en": "law of the unconscious statistician, LOTUS",
    "abbr": "",
    "def": "\\(Y = g(X)\\)의 분포를 구하지 않고도 \\(E[g(X)] = \\int g(x) f_X(x)\\,dx\\)(이산이면 합)로 기댓값을 계산할 수 있다는 규칙.",
    "chapters": [
     "continuous#expectation"
    ]
   },
   {
    "ko": "미검출",
    "en": "underkill, escape",
    "abbr": "",
    "def": "불량을 양품으로 통과시키는 오류(위음성). 출하되면 유출(escape)이 되어 DPPM을 높인다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "민감도",
    "en": "sensitivity",
    "abbr": "",
    "def": "실제로 불량(양성)인 대상을 검사가 양성으로 잡아낼 확률 \\(P(+\\mid D)\\). 검출률, 포획률이라고도 한다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "반복",
    "en": "replication",
    "abbr": "",
    "def": "같은 처리를 독립적으로 여러 번 다시 실행하는 것. 오차 분산을 추정하고 표준 오차를 줄인다.",
    "chapters": [
     "anova-doe#principles"
    ]
   },
   {
    "ko": "반복성",
    "en": "repeatability",
    "abbr": "",
    "def": "같은 사람이 같은 계측기로 같은 부품을 되풀이해 잴 때의 측정 산포.",
    "chapters": [
     "spc#msa"
    ]
   },
   {
    "ko": "반응 변수",
    "en": "response variable",
    "abbr": "",
    "def": "회귀에서 예측하거나 설명하려는 변수 \\(y\\).",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "반응 표면법",
    "en": "response surface methodology (RSM)",
    "abbr": "",
    "def": "반응을 요인의 매끄러운 함수로 보고 1차·2차 모형과 순차 실험으로 최적 조건을 찾는 방법.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "배반 사건",
    "en": "mutually exclusive events",
    "abbr": "",
    "def": "함께 일어날 수 없는 사건, 곧 \\(A\\cap B = \\varnothing\\)인 두 사건. 이때 \\(P(A\\cup B) = P(A) + P(B)\\).",
    "chapters": [
     "probability#set-operations"
    ]
   },
   {
    "ko": "백분위 구간",
    "en": "percentile interval",
    "abbr": "",
    "def": "부트스트랩 통계량들의 \\(\\alpha/2\\) 분위수와 \\(1-\\alpha/2\\) 분위수 사이로 만든 구간.",
    "chapters": [
     "confidence#bootstrap"
    ]
   },
   {
    "ko": "백색 잡음",
    "en": "white noise",
    "abbr": "",
    "def": "평균 0, 분산 일정, 서로 상관없는 값들의 열. \\(k\\ne0\\)이면 \\(\\rho(k) = 0\\)이고 모든 진동수 성분의 세기가 같다.",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "번인",
    "en": "burn-in",
    "abbr": "",
    "def": "출하 전 칩을 고온·고전압에서 일정 시간 동작시켜 약한 칩을 미리 고장 내 걸러 내는 스크린.",
    "chapters": [
     "reliability-yield#burn-in"
    ]
   },
   {
    "ko": "범위",
    "en": "range",
    "abbr": "",
    "def": "최댓값에서 최솟값을 뺀 값. 자료 수가 많을수록 커지는 경향이 있다.",
    "chapters": [
     "descriptive#spread"
    ]
   },
   {
    "ko": "범주형 자료",
    "en": "categorical data",
    "abbr": "",
    "def": "값이 이름표(범주)인 자료. 명목 척도 또는 순서 척도로 잰다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "베르누이 시행",
    "en": "Bernoulli trial",
    "abbr": "",
    "def": "결과가 성공(확률 \\(p\\))과 실패 둘뿐인 시행. 성공에 1, 실패에 0을 붙인 변수는 평균 \\(p\\), 분산 \\(p(1-p)\\)인 베르누이 분포를 따른다.",
    "chapters": [
     "discrete#binomial"
    ]
   },
   {
    "ko": "베이즈 정리",
    "en": "Bayes' theorem",
    "abbr": "",
    "def": "\\(P(B_j\\mid A) = P(A\\mid B_j)P(B_j)/\\sum_i P(A\\mid B_i)P(B_i)\\). 증거를 본 뒤의 확률(사후)을 사전 확률과 가능도로 구하는 공식이다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "베타 분포",
    "en": "beta distribution",
    "abbr": "",
    "def": "\\([0,1]\\) 위의 분포 \\(\\mathrm{Beta}(a,b)\\), 밀도 \\(x^{a-1}(1-x)^{b-1}/B(a,b)\\). 수율·비율의 불확실성을 나타내며 평균은 \\(a/(a+b)\\).",
    "chapters": [
     "continuous#zoo"
    ]
   },
   {
    "ko": "변동 계수",
    "en": "coefficient of variation",
    "abbr": "",
    "def": "표준 편차를 평균으로 나눈 값 \\(s/\\bar x\\). 단위가 없어 크기가 다른 자료의 퍼짐을 비교한다. 1σ 비균일도와 같다.",
    "chapters": [
     "descriptive#spread"
    ]
   },
   {
    "ko": "변수",
    "en": "variable",
    "abbr": "",
    "def": "관측 대상마다 값이 달라질 수 있는 특성. 막두께, 장비 이름, 결함 수 등.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "별칭",
    "en": "alias",
    "abbr": "",
    "def": "부분 요인 실험에서 같은 열을 공유해 따로 추정할 수 없는 효과. 예: \\(I = ABCD\\)이면 AB와 CD.",
    "chapters": [
     "anova-doe#fractional"
    ]
   },
   {
    "ko": "병렬 계통",
    "en": "parallel system",
    "abbr": "",
    "def": "모든 부품이 고장 나야 멈추는 중복 계통. 독립 고장이면 신뢰도는 \\(1-\\prod(1-r_i)\\)이다.",
    "chapters": [
     "conditional#reliability"
    ]
   },
   {
    "ko": "복원 추출",
    "en": "sampling with replacement",
    "abbr": "",
    "def": "뽑은 개체를 되돌려 놓고 다음을 뽑는 추출. 관측값들이 서로 독립이다.",
    "chapters": [
     "sampling#population"
    ]
   },
   {
    "ko": "본페로니 보정",
    "en": "Bonferroni correction",
    "abbr": "",
    "def": "검정 \\(m\\)개를 각각 유의 수준 \\(\\alpha/m\\)으로 해서 가족별 오류율을 \\(\\alpha\\) 이하로 묶는 방법.",
    "chapters": [
     "hypothesis#multiple"
    ]
   },
   {
    "ko": "부분 요인 실험",
    "en": "fractional factorial design",
    "abbr": "",
    "def": "2ᵏ 조합의 \\(1/2^p\\)만 골라 실행하는 실험 \\(2^{k-p}\\). 효과들이 별칭으로 겹치는 대가로 실행 횟수를 줄인다.",
    "chapters": [
     "anova-doe#fractional"
    ]
   },
   {
    "ko": "부트스트랩",
    "en": "bootstrap",
    "abbr": "",
    "def": "표본에서 같은 크기를 복원 추출로 거듭 다시 뽑아 통계량의 표본 분포를 흉내 내는 재표집 방법.",
    "chapters": [
     "confidence#bootstrap"
    ]
   },
   {
    "ko": "부호 검정",
    "en": "sign test",
    "abbr": "",
    "def": "대응 차이의 양수 개수가 \\(H_0\\) 아래 \\(\\mathrm{Bin}(n, 1/2)\\)를 따른다는 것으로 중앙값을 검정하는 방법. 이상값에 전혀 영향받지 않는다.",
    "chapters": [
     "categorical#signed-rank"
    ]
   },
   {
    "ko": "분산",
    "en": "variance",
    "abbr": "",
    "def": "평균에서 벗어난 거리 제곱의 기댓값 \\(\\operatorname{Var}(X) = E[(X-\\mu)^2] = E[X^2] - \\mu^2\\). 분포가 퍼진 정도를 나타낸다.",
    "chapters": [
     "discrete#expectation"
    ]
   },
   {
    "ko": "분산 팽창 인자",
    "en": "variance inflation factor, VIF",
    "abbr": "",
    "def": "공선성 때문에 계수의 분산이 커지는 배수 \\(\\mathrm{VIF}_j = 1/(1 - R_j^2)\\).",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "분위수",
    "en": "quantile",
    "abbr": "",
    "def": "\\(F(x_p) = p\\)를 만족하는 값 \\(x_p\\). 100\\(p\\) 백분위수라고도 하며, \\(p = 0.5\\)이면 중앙값이다.",
    "chapters": [
     "continuous#expectation"
    ]
   },
   {
    "ko": "분포 수렴",
    "en": "convergence in distribution",
    "abbr": "",
    "def": "누적 분포 함수가 극한 분포의 연속점마다 수렴하는 것. \\(F_{X_n}(x)\\to F_X(x)\\)이면 \\(X_n\\xrightarrow{d}X\\)로 쓴다.",
    "chapters": [
     "limit-theorems#clt"
    ]
   },
   {
    "ko": "분할",
    "en": "partition",
    "abbr": "",
    "def": "서로 배반이면서 합치면 표본 공간 전체가 되는 사건들의 모음. 테스트 빈처럼 결과마다 정확히 하나에 속한다.",
    "chapters": [
     "probability#set-operations"
    ]
   },
   {
    "ko": "분할표",
    "en": "contingency table",
    "abbr": "",
    "def": "두 범주형 변수로 동시에 분류한 개수를 행과 열로 정리한 표.",
    "chapters": [
     "categorical#contingency"
    ]
   },
   {
    "ko": "분해능",
    "en": "resolution",
    "abbr": "",
    "def": "정의 관계에서 가장 짧은 단어의 길이. III이면 주효과가 2인자 교호 작용과, IV면 2인자 교호 작용끼리 겹친다.",
    "chapters": [
     "anova-doe#fractional"
    ]
   },
   {
    "ko": "불량품",
    "en": "defective, nonconforming unit",
    "abbr": "",
    "def": "규격을 벗어난 개체. 표본 안의 불량품 수는 이항 분포를 따르며 p·np 관리도로 감시한다.",
    "chapters": [
     "spc#attributes"
    ]
   },
   {
    "ko": "불변성",
    "en": "invariance property",
    "abbr": "",
    "def": "\\(\\hat\\theta\\)가 \\(\\theta\\)의 MLE이면 \\(g(\\hat\\theta)\\)가 \\(g(\\theta)\\)의 MLE라는 성질. 예: MTTF의 MLE는 \\(1/\\hat\\lambda\\).",
    "chapters": [
     "estimation#mle"
    ]
   },
   {
    "ko": "불의 부등식",
    "en": "Boole's inequality",
    "abbr": "",
    "def": "합사건의 확률은 각 확률의 합을 넘지 않는다: \\(P(\\bigcup_i A_i) \\le \\sum_i P(A_i)\\).",
    "chapters": [
     "probability#axioms"
    ]
   },
   {
    "ko": "불편 추정량",
    "en": "unbiased estimator",
    "abbr": "",
    "def": "모든 \\(\\theta\\)에서 \\(E[\\hat\\theta] = \\theta\\)인 추정량. \\(\\bar X\\), \\(\\hat p\\), \\(n-1\\)로 나눈 \\(S^2\\)가 대표적이다.",
    "chapters": [
     "estimation#unbiased"
    ]
   },
   {
    "ko": "블록화",
    "en": "blocking",
    "abbr": "",
    "def": "로트·날짜처럼 알려진 방해 요인이 같은 단위끼리 묶어 그 안에서 처리를 비교함으로써 그 변동을 오차에서 빼내는 원칙.",
    "chapters": [
     "anova-doe#principles"
    ]
   },
   {
    "ko": "비모수 검정",
    "en": "nonparametric test",
    "abbr": "",
    "def": "자료 분포의 모양(정규 등)을 가정하지 않고 부호·순위·순열만으로 하는 검정.",
    "chapters": [
     "categorical#signed-rank"
    ]
   },
   {
    "ko": "비복원 추출",
    "en": "sampling without replacement",
    "abbr": "",
    "def": "뽑은 개체를 되돌리지 않는 추출. 관측값끼리 약한 음의 상관이 생겨 표본 평균의 분산이 줄어든다.",
    "chapters": [
     "sampling#population"
    ]
   },
   {
    "ko": "비율 척도",
    "en": "ratio scale",
    "abbr": "",
    "def": "0이 '없음'을 뜻해 차이와 비가 모두 의미 있는 척도. 막두께, 결함 수, 절대 온도.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "비주기",
    "en": "aperiodic",
    "abbr": "",
    "def": "상태로 돌아오는 걸음 수의 최대공약수가 1이어서 일정한 주기로만 돌아오지 않는 성질.",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "사건",
    "en": "event",
    "abbr": "",
    "def": "표본 공간의 부분집합. 실험의 결과 \\(\\omega\\)가 사건 \\(A\\)에 속하면 \\(A\\)가 일어났다고 한다.",
    "chapters": [
     "probability#sample-space"
    ]
   },
   {
    "ko": "사분위 범위",
    "en": "interquartile range, IQR",
    "abbr": "",
    "def": "\\(Q_3 - Q_1\\). 가운데 50% 자료가 차지하는 폭으로 이상값에 강하다.",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "사분위수",
    "en": "quartiles",
    "abbr": "",
    "def": "자료를 네 등분하는 세 값 \\(Q_1\\), 중앙값, \\(Q_3\\).",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "사전 분포",
    "en": "prior distribution",
    "abbr": "",
    "def": "자료를 보기 전 모수에 대한 믿음을 나타내는 확률 분포 \\(\\pi(\\theta)\\).",
    "chapters": [
     "estimation#bayes"
    ]
   },
   {
    "ko": "사전 확률",
    "en": "prior probability",
    "abbr": "",
    "def": "새 증거를 보기 전에 가설에 매기는 확률. 검사에서는 불량률(기저율)이 사전 확률이다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "사후 분포",
    "en": "posterior distribution",
    "abbr": "",
    "def": "자료를 본 뒤 모수의 분포. 베이즈 정리로 \\(\\pi(\\theta\\mid x) \\propto L(\\theta)\\pi(\\theta)\\)를 얻는다.",
    "chapters": [
     "estimation#bayes"
    ]
   },
   {
    "ko": "사후 비교",
    "en": "post hoc comparison",
    "abbr": "",
    "def": "분산 분석에서 유의한 결과를 얻은 뒤 어느 처리 쌍이 다른지 가족별 오류율을 통제하며 비교하는 절차.",
    "chapters": [
     "anova-doe#tukey"
    ]
   },
   {
    "ko": "사후 확률",
    "en": "posterior probability",
    "abbr": "",
    "def": "증거를 반영해 갱신한 가설의 확률 \\(P(B\\mid A)\\). 사전 확률 × 가능도에 비례한다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "산점도",
    "en": "scatter plot",
    "abbr": "",
    "def": "두 변수의 짝 \\((x_i, y_i)\\)를 평면 위 점으로 찍은 그림.",
    "chapters": [
     "descriptive#correlation"
    ]
   },
   {
    "ko": "상관 계수",
    "en": "correlation coefficient",
    "abbr": "",
    "def": "공분산을 두 표준 편차로 나눈 값 \\(r = s_{xy}/(s_xs_y)\\). −1부터 1까지이며 직선 관계의 세기를 잰다.",
    "chapters": [
     "descriptive#correlation"
    ]
   },
   {
    "ko": "상관도",
    "en": "correlogram",
    "abbr": "",
    "def": "표본 자기 상관 \\(r_k\\)를 시차 \\(k\\)에 대해 막대로 그린 그림. 보통 \\(\\pm2/\\sqrt n\\) 유의 띠를 함께 그린다.",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "상대 도수",
    "en": "relative frequency",
    "abbr": "",
    "def": "도수를 전체 자료 수 \\(n\\)으로 나눈 비율.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "상대 효율",
    "en": "relative efficiency",
    "abbr": "",
    "def": "두 불편 추정량의 분산의 비 \\(\\operatorname{Var}(\\hat\\theta_1)/\\operatorname{Var}(\\hat\\theta_2)\\). 같은 정밀도를 얻는 데 필요한 표본 크기의 비를 뜻한다.",
    "chapters": [
     "estimation#efficiency"
    ]
   },
   {
    "ko": "상자 그림",
    "en": "box plot",
    "abbr": "",
    "def": "\\(Q_1\\)–\\(Q_3\\) 상자와 중앙값 선, 울타리 안까지의 수염, 울타리 밖 이상값 점으로 그린 그림.",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "상호 독립",
    "en": "mutually independent",
    "abbr": "",
    "def": "사건 모임의 어떤 부분 모임을 골라도 교집합의 확률이 개별 확률의 곱이 되는 성질. 쌍별 독립보다 강한 조건이다.",
    "chapters": [
     "conditional#independence"
    ]
   },
   {
    "ko": "생산자 위험",
    "en": "producer's risk",
    "abbr": "",
    "def": "AQL 수준의 좋은 로트가 거부될 확률 \\(\\alpha = 1 - P_a(\\mathrm{AQL})\\). 보통 0.05로 잡는다.",
    "chapters": [
     "spc#acceptance"
    ]
   },
   {
    "ko": "생성자",
    "en": "generator",
    "abbr": "",
    "def": "부분 요인 실험에서 추가 요인의 수준을 기본 요인 열의 곱으로 정하는 식. 예: \\(D = ABC\\).",
    "chapters": [
     "anova-doe#fractional"
    ]
   },
   {
    "ko": "생일 문제",
    "en": "birthday problem",
    "abbr": "",
    "def": "\\(n\\)명 가운데 생일이 같은 쌍이 적어도 하나 있을 확률 \\(1 - \\prod_{i<n}(1 - i/365)\\)을 구하는 문제. 23명이면 0.507.",
    "chapters": [
     "probability#classic"
    ]
   },
   {
    "ko": "선형 합동 생성기",
    "en": "linear congruential generator",
    "abbr": "",
    "def": "\\(x_{k+1} = (ax_k + c)\\bmod m\\), \\(u_k = x_k/m\\)으로 난수를 만드는 가장 단순한 생성기. 헐–도벨 조건을 만족하면 주기가 \\(m\\)이지만 연속한 수가 격자 위에 놓인다.",
    "chapters": [
     "limit-theorems#prng"
    ]
   },
   {
    "ko": "설계 행렬",
    "en": "design matrix",
    "abbr": "",
    "def": "각 관측을 한 행으로, 절편(1)과 설명 변수를 열로 쌓은 행렬 \\(X\\).",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "설명 변수",
    "en": "explanatory variable",
    "abbr": "",
    "def": "회귀에서 반응 변수를 예측하는 데 쓰는 변수 \\(x\\). 예측 변수·회귀 변수라고도 한다.",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "소비자 위험",
    "en": "consumer's risk",
    "abbr": "",
    "def": "LTPD 수준의 나쁜 로트가 합격할 확률 \\(\\beta = P_a(\\mathrm{LTPD})\\). 보통 0.10으로 잡는다.",
    "chapters": [
     "spc#acceptance"
    ]
   },
   {
    "ko": "솎아내기",
    "en": "thinning",
    "abbr": "",
    "def": "포아송 과정의 각 사건을 독립적으로 확률 \\(p\\)로만 남기는 것. 남은 사건은 비율 \\(p\\lambda\\)인 포아송 과정이다.",
    "chapters": [
     "stochastic#poisson"
    ]
   },
   {
    "ko": "수율 학습 곡선",
    "en": "yield learning curve",
    "abbr": "",
    "def": "새 공정의 결함 밀도와 수율이 시간에 따라 개선되는 모양을 나타낸 곡선.",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "수정 결정 계수",
    "en": "adjusted R²",
    "abbr": "",
    "def": "자유도로 보정한 결정 계수 \\(1 - (1 - R^2)(n-1)/(n-p)\\). 쓸모없는 변수를 넣으면 줄 수 있다.",
    "chapters": [
     "regression#multiple"
    ]
   },
   {
    "ko": "수준",
    "en": "level",
    "abbr": "",
    "def": "요인이 실험에서 취하는 각각의 값. 2수준 요인은 낮음·높음 두 값을 쓴다.",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "수축 추정량",
    "en": "shrinkage estimator",
    "abbr": "",
    "def": "추정값을 어떤 기준점(보통 0이나 사전 평균) 쪽으로 끌어당긴 추정량, 예컨대 \\(c\\bar X\\) (\\(0<c<1\\)). 편향을 조금 받아들이고 분산을 줄여 MSE를 낮춘다.",
    "chapters": [
     "estimation#mse"
    ]
   },
   {
    "ko": "수치형 자료",
    "en": "numerical data",
    "abbr": "",
    "def": "값이 양을 나타내는 수인 자료. 이산형과 연속형으로 나뉜다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "순서 척도",
    "en": "ordinal scale",
    "abbr": "",
    "def": "크고 작은 순서는 의미 있지만 간격은 의미 없는 척도. 결함 등급, 만족도.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "순서 통계량",
    "en": "order statistics",
    "abbr": "",
    "def": "표본을 크기순으로 늘어놓은 \\(X_{(1)} \\le \\cdots \\le X_{(n)}\\). 최댓값의 cdf는 \\(F(x)^n\\), 최솟값의 cdf는 \\(1-[1-F(x)]^n\\)이다.",
    "chapters": [
     "sampling#order"
    ]
   },
   {
    "ko": "순열",
    "en": "permutation",
    "abbr": "",
    "def": "서로 다른 \\(n\\)개에서 \\(k\\)개를 골라 순서 있게 늘어놓는 것. 그 수는 \\({}_nP_k = n!/(n-k)!\\).",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "순열 검정",
    "en": "permutation test",
    "abbr": "",
    "def": "집단 이름표를 무작위로 섞어 통계량의 귀무 분포를 직접 만들고, 관측값 이상으로 극단적인 비율을 p 값으로 삼는 검정.",
    "chapters": [
     "categorical#permutation"
    ]
   },
   {
    "ko": "순위 상관 계수",
    "en": "Spearman rank correlation",
    "abbr": "",
    "def": "값을 순위로 바꾼 뒤 구한 상관 계수(스피어만 \\(r_s\\)). 단조 관계를 재며 이상값에 강하다.",
    "chapters": [
     "descriptive#correlation"
    ]
   },
   {
    "ko": "스튜던트화 범위 분포",
    "en": "studentized range distribution",
    "abbr": "",
    "def": "\\(k\\)개 정규 표본 평균의 범위를 추정한 표준 오차로 나눈 통계량 \\(q\\)의 분포. 투키 HSD의 임계값을 준다.",
    "chapters": [
     "anova-doe#tukey"
    ]
   },
   {
    "ko": "스튜던트화 잔차",
    "en": "studentized residual",
    "abbr": "",
    "def": "잔차를 그 표준 편차 추정값으로 나눈 값 \\(r_i = e_i/(s\\sqrt{1 - h_{ii}})\\).",
    "chapters": [
     "regression#diagnostics"
    ]
   },
   {
    "ko": "시그마 수준",
    "en": "sigma level",
    "abbr": "",
    "def": "공정 평균에서 가까운 규격까지의 거리를 표준 편차 단위로 잰 값 \\(Z = 3C_{pk}\\).",
    "chapters": [
     "spc#capability"
    ]
   },
   {
    "ko": "시드",
    "en": "seed",
    "abbr": "",
    "def": "의사 난수 생성기의 처음 내부 상태를 정하는 값. 시드를 고정하면 같은 난수 수열을 다시 만들 수 있다.",
    "chapters": [
     "limit-theorems#prng"
    ]
   },
   {
    "ko": "시즈 모형",
    "en": "Seeds model",
    "abbr": "",
    "def": "결함 밀도가 지수 분포라고 보고 얻은 수율 모형 \\(Y = 1/(1 + D_0A)\\).",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "신뢰 구간",
    "en": "confidence interval",
    "abbr": "",
    "def": "\\(P(L \\le \\theta \\le U) = 1-\\alpha\\)를 만족하는 확률 구간. 같은 방법으로 구간을 거듭 만들면 그중 \\(100(1-\\alpha)\\)%가 모수를 포함한다.",
    "chapters": [
     "confidence#meaning"
    ]
   },
   {
    "ko": "신뢰 띠",
    "en": "confidence band",
    "abbr": "",
    "def": "각 \\(x_0\\)에서 평균 반응 \\(E[Y\\mid x_0]\\)의 신뢰 구간을 이은 띠. \\(\\bar x\\)에서 가장 좁다.",
    "chapters": [
     "regression#bands"
    ]
   },
   {
    "ko": "신뢰 상한",
    "en": "upper confidence bound",
    "abbr": "",
    "def": "\\(\\alpha\\)를 한쪽 꼬리에만 두어 만든 단측 신뢰 한계의 위쪽 경계. 예: \\(\\bar x + t_{\\alpha,n-1}s/\\sqrt n\\).",
    "chapters": [
     "confidence#mean"
    ]
   },
   {
    "ko": "신뢰 수준",
    "en": "confidence level",
    "abbr": "",
    "def": "신뢰 구간 절차가 모수를 덮는 장기 성공률 \\(1-\\alpha\\). 보통 90%, 95%, 99%를 쓴다.",
    "chapters": [
     "confidence#meaning"
    ]
   },
   {
    "ko": "신뢰도",
    "en": "reliability",
    "abbr": "",
    "def": "부품이나 계통이 정해진 조건과 기간 동안 제 기능을 할 확률. 시간의 함수로 쓰면 신뢰도 함수 \\(R(t)\\)가 된다.",
    "chapters": [
     "conditional#reliability"
    ]
   },
   {
    "ko": "신뢰도 함수",
    "en": "reliability function, survival function",
    "abbr": "",
    "def": "시각 \\(t\\)까지 고장 나지 않을 확률 \\(R(t) = P(T > t) = 1 - F(t)\\). 생존 함수라고도 한다.",
    "chapters": [
     "continuous#uniform-exponential"
    ]
   },
   {
    "ko": "실험 계획",
    "en": "design of experiments (DOE)",
    "abbr": "",
    "def": "요인·수준·실행 횟수·순서·실험 단위를 미리 정해 최소한의 실험으로 타당한 결론을 얻도록 설계하는 일.",
    "chapters": [
     "anova-doe#principles"
    ]
   },
   {
    "ko": "쌍대성",
    "en": "duality",
    "abbr": "",
    "def": "\\(1-\\alpha\\) 양측 신뢰 구간이 유의 수준 \\(\\alpha\\)의 양측 검정에서 기각되지 않는 \\(\\mu_0\\)들의 모임이라는 관계.",
    "chapters": [
     "hypothesis#t-tests"
    ]
   },
   {
    "ko": "쌍별 독립",
    "en": "pairwise independent",
    "abbr": "",
    "def": "사건들 가운데 아무 두 개를 골라도 독립인 성질. 셋 이상이 함께 독립(상호 독립)이라는 보장은 없다.",
    "chapters": [
     "conditional#independence"
    ]
   },
   {
    "ko": "아레니우스 모형",
    "en": "Arrhenius model",
    "abbr": "",
    "def": "수명이 \\(e^{E_a/kT}\\)에 비례한다는 온도 가속 모형. \\(\\mathrm{AF} = \\exp[\\frac{E_a}{k}(\\frac1{T_u} - \\frac1{T_s})]\\).",
    "chapters": [
     "reliability-yield#accelerated"
    ]
   },
   {
    "ko": "약한 부분 모집단",
    "en": "weak subpopulation",
    "abbr": "",
    "def": "출하된 제품 중 잠재 결함 때문에 수명이 훨씬 짧은 작은 무리. 정상 무리와 섞여 혼합 분포를 이룬다.",
    "chapters": [
     "reliability-yield#bathtub"
    ]
   },
   {
    "ko": "양성 예측도",
    "en": "positive predictive value, PPV",
    "abbr": "",
    "def": "검사가 양성으로 판정한 대상이 실제로 양성일 확률 \\(P(D\\mid +)\\). 분류에서는 정밀도·순도라고 하며 기저율에 크게 좌우된다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "양측 검정",
    "en": "two-sided test",
    "abbr": "",
    "def": "기준값에서 어느 방향으로든 벗어났는지 보는 검정. 기각역을 두 꼬리에 \\(\\alpha/2\\)씩 둔다.",
    "chapters": [
     "hypothesis#hypotheses"
    ]
   },
   {
    "ko": "여사건",
    "en": "complement",
    "abbr": "",
    "def": "\\(A\\)가 일어나지 않는 사건 \\(A^c = \\Omega\\setminus A\\). \\(P(A^c) = 1 - P(A)\\).",
    "chapters": [
     "probability#set-operations"
    ]
   },
   {
    "ko": "역멱법칙",
    "en": "inverse power law",
    "abbr": "",
    "def": "수명이 스트레스(전압 등)의 거듭제곱에 반비례한다는 가속 모형 \\(t \\propto V^{-n}\\).",
    "chapters": [
     "reliability-yield#accelerated"
    ]
   },
   {
    "ko": "역변환 표본 추출",
    "en": "inverse transform sampling",
    "abbr": "",
    "def": "균일 난수 \\(U\\)를 \\(X = F^{-1}(U)\\)로 바꿔 누적 분포 함수가 \\(F\\)인 난수를 만드는 방법. 예: 지수 분포는 \\(-\\ln(1-U)/\\lambda\\).",
    "chapters": [
     "continuous#transform"
    ]
   },
   {
    "ko": "역추정",
    "en": "inverse prediction, calibration",
    "abbr": "",
    "def": "검량선 \\(y = a + bx\\)를 거꾸로 써서 측정한 \\(y_0\\)로부터 \\(x_0 = (y_0 - a)/b\\)를 추정하는 일.",
    "chapters": [
     "regression#bands"
    ]
   },
   {
    "ko": "연속성 수정",
    "en": "continuity correction",
    "abbr": "",
    "def": "이산 확률 변수의 확률을 연속 분포(정규 등)의 넓이로 근사할 때 정수 경계를 \\(\\pm0.5\\) 옮겨 막대 전체를 덮는 보정. 예: \\(P(X\\le k)\\approx\\Phi((k+0.5-\\mu)/\\sigma)\\).",
    "chapters": [
     "limit-theorems#normal-approx"
    ]
   },
   {
    "ko": "연속형",
    "en": "continuous",
    "abbr": "",
    "def": "어떤 구간 안의 모든 실수 값을 가질 수 있는 수치형 자료. 막두께, 온도 등.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "영향점",
    "en": "influential point",
    "abbr": "",
    "def": "빼면 회귀 결과가 크게 달라지는 관측점. 지렛값과 잔차가 함께 클 때 생긴다.",
    "chapters": [
     "regression#diagnostics"
    ]
   },
   {
    "ko": "예이츠 방법",
    "en": "Yates' algorithm",
    "abbr": "",
    "def": "표준 순서의 반응에 이웃 합과 차를 \\(k\\)번 반복해 2ᵏ 실험의 모든 대비를 한꺼번에 구하는 계산법.",
    "chapters": [
     "anova-doe#factorial"
    ]
   },
   {
    "ko": "예이츠 연속성 수정",
    "en": "Yates' continuity correction",
    "abbr": "",
    "def": "2×2 표의 카이제곱 계산에서 \\(|O-E|\\)에서 0.5를 빼 이산성을 보정하는 방법. p 값이 커진다(보수적).",
    "chapters": [
     "categorical#fisher"
    ]
   },
   {
    "ko": "예측 구간",
    "en": "prediction interval",
    "abbr": "",
    "def": "다음 관측값 하나가 들어갈 범위. 정규 모집단에서 \\(\\bar x \\pm t_{\\alpha/2,n-1}s\\sqrt{1 + 1/n}\\)이며 \\(n\\)이 커져도 \\(\\pm z_{\\alpha/2}\\sigma\\)보다 좁아지지 않는다.",
    "chapters": [
     "confidence#prediction"
    ]
   },
   {
    "ko": "예측 띠",
    "en": "prediction band",
    "abbr": "",
    "def": "각 \\(x_0\\)에서 새 관측 하나의 예측 구간을 이은 띠. 신뢰 띠보다 오차 분산 \\(\\sigma^2\\)만큼 넓다.",
    "chapters": [
     "regression#bands"
    ]
   },
   {
    "ko": "오즈",
    "en": "odds",
    "abbr": "",
    "def": "확률 \\(p\\)를 \\(p/(1-p)\\)로 나타낸 값. 베이즈 갱신에서는 사후 오즈 = 가능도비 × 사전 오즈로 곱셈이 된다.",
    "chapters": [
     "conditional#updating"
    ]
   },
   {
    "ko": "오즈비",
    "en": "odds ratio",
    "abbr": "",
    "def": "2×2 표 [[a, b], [c, d]]에서 두 집단의 오즈의 비 \\(ad/(bc)\\). 1이면 연관이 없다.",
    "chapters": [
     "categorical#fisher"
    ]
   },
   {
    "ko": "오차 전파",
    "en": "propagation of error",
    "abbr": "",
    "def": "입력 변수들의 산포가 함수 \\(g(X,Y)\\)의 산포로 어떻게 옮겨 가는지 계산하는 것. 1차 근사로 \\(\\sigma_g^2\\approx g_x^2\\sigma_X^2 + g_y^2\\sigma_Y^2 + 2g_xg_y\\operatorname{Cov}\\).",
    "chapters": [
     "joint#propagation"
    ]
   },
   {
    "ko": "오차 한계",
    "en": "margin of error",
    "abbr": "",
    "def": "대칭 신뢰 구간의 반폭. 평균의 z 구간에서는 \\(E = z_{\\alpha/2}\\sigma/\\sqrt n\\)이다.",
    "chapters": [
     "confidence#mean"
    ]
   },
   {
    "ko": "와이블 분포",
    "en": "Weibull distribution",
    "abbr": "",
    "def": "\\(F(t) = 1 - e^{-(t/\\eta)^\\beta}\\)인 수명 분포 \\(\\mathrm{Weibull}(\\beta, \\eta)\\). 가장 약한 고리 모형이며 고장률이 \\(t^{\\beta-1}\\)에 비례해 β로 초기 고장·우발 고장·마모를 나타낸다.",
    "chapters": [
     "continuous#zoo"
    ]
   },
   {
    "ko": "와이블 확률지",
    "en": "Weibull probability plot",
    "abbr": "",
    "def": "가로축 \\(\\ln t\\), 세로축 \\(\\ln[-\\ln(1-F)]\\)인 그래프. 와이블 자료는 기울기 \\(\\beta\\)인 직선으로 나타난다.",
    "chapters": [
     "reliability-yield#weibull-plot"
    ]
   },
   {
    "ko": "왈드 구간",
    "en": "Wald interval",
    "abbr": "",
    "def": "비율의 구간 \\(\\hat p \\pm z_{\\alpha/2}\\sqrt{\\hat p(1-\\hat p)/n}\\). 간단하지만 \\(p\\)가 0이나 1에 가까우면 포함 확률이 크게 떨어진다.",
    "chapters": [
     "confidence#proportion"
    ]
   },
   {
    "ko": "왜도",
    "en": "skewness",
    "abbr": "",
    "def": "분포의 비대칭 정도. 표본 왜도 \\(g_1 = m_3/m_2^{3/2}\\)는 오른쪽 꼬리가 길면 양수다.",
    "chapters": [
     "descriptive#shape"
    ]
   },
   {
    "ko": "요인",
    "en": "factor",
    "abbr": "",
    "def": "실험에서 연구자가 의도적으로 바꾸는 조건. 예: RF 전력, 압력, 챔버.",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "욕조 곡선",
    "en": "bathtub curve",
    "abbr": "",
    "def": "초기 고장(감소), 우발 고장(일정), 마모 고장(증가) 구간으로 이루어진 제품 고장률의 전형적인 모양.",
    "chapters": [
     "reliability-yield#bathtub"
    ]
   },
   {
    "ko": "우발 고장",
    "en": "random failure",
    "abbr": "",
    "def": "외부 스트레스 등으로 나이와 무관하게 일어나는 고장. 고장률이 거의 일정하다.",
    "chapters": [
     "reliability-yield#bathtub"
    ]
   },
   {
    "ko": "운영 곡선",
    "en": "operating curve",
    "abbr": "",
    "def": "이용률에 대한 사이클 타임(X-팩터)의 그래프. M/M/1에서는 \\(1/(1-\\rho)\\)로, \\(\\rho\\to1\\)에서 발산한다.",
    "chapters": [
     "stochastic#queue"
    ]
   },
   {
    "ko": "울타리",
    "en": "fence",
    "abbr": "",
    "def": "상자 그림에서 이상값을 가르는 경계 \\(Q_1 - 1.5\\,\\mathrm{IQR}\\)과 \\(Q_3 + 1.5\\,\\mathrm{IQR}\\).",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "웨스턴 일렉트릭 규칙",
    "en": "Western Electric rules",
    "abbr": "",
    "def": "관리도의 비정상 패턴을 판정하는 규칙 묶음: 3σ 밖 1점, 3점 중 2점 2σ 밖, 5점 중 4점 1σ 밖, 8점 연속 한쪽.",
    "chapters": [
     "spc#rules"
    ]
   },
   {
    "ko": "웨이퍼 맵",
    "en": "wafer map",
    "abbr": "",
    "def": "웨이퍼 위 측정 위치마다 값을 색으로 나타낸 그림. 요약 통계가 버리는 공간 무늬를 보여 준다.",
    "chapters": [
     "descriptive#wafer-summary"
    ]
   },
   {
    "ko": "웰치 t 검정",
    "en": "Welch's t-test",
    "abbr": "",
    "def": "두 모분산이 같다고 가정하지 않는 두 표본 t 검정. 표준 오차 \\(\\sqrt{S_1^2/n_1 + S_2^2/n_2}\\)와 웰치–새터스웨이트 자유도를 쓴다.",
    "chapters": [
     "hypothesis#t-tests"
    ]
   },
   {
    "ko": "웰치 구간",
    "en": "Welch interval",
    "abbr": "",
    "def": "분산이 다를 수 있는 두 평균 차이의 t 구간. 표준 오차 \\(\\sqrt{s_1^2/n_1 + s_2^2/n_2}\\)와 웰치–새터스웨이트 자유도를 쓴다.",
    "chapters": [
     "confidence#two-sample"
    ]
   },
   {
    "ko": "윌슨 점수 구간",
    "en": "Wilson score interval",
    "abbr": "",
    "def": "\\(|\\hat p - p| \\le z\\sqrt{p(1-p)/n}\\)을 \\(p\\)에 대해 풀어 얻는 비율의 구간. 중심이 1/2 쪽으로 당겨지고 포함 확률이 명목값에 가깝다.",
    "chapters": [
     "confidence#proportion"
    ]
   },
   {
    "ko": "윌콕슨 부호 순위 검정",
    "en": "Wilcoxon signed-rank test",
    "abbr": "",
    "def": "대응 차이의 절댓값 순위에 부호를 붙여 양수 쪽 순위합 \\(W^+\\)로 검정하는 방법. 평균 \\(n(n+1)/4\\).",
    "chapters": [
     "categorical#signed-rank"
    ]
   },
   {
    "ko": "윌콕슨 순위합 검정",
    "en": "Wilcoxon rank-sum test",
    "abbr": "",
    "def": "독립 두 표본을 합쳐 순위를 매기고 한 표본의 순위합 \\(W\\)로 두 분포를 비교하는 검정. 만–휘트니 U 검정과 같다.",
    "chapters": [
     "categorical#mann-whitney"
    ]
   },
   {
    "ko": "유의 수준",
    "en": "significance level",
    "abbr": "",
    "def": "\\(H_0\\)가 참인데 기각할 확률, 곧 제1종 오류의 확률 \\(\\alpha\\). 자료를 보기 전에 정한다(보통 0.05).",
    "chapters": [
     "hypothesis#test-stat"
    ]
   },
   {
    "ko": "유의 확률",
    "en": "p-value",
    "abbr": "",
    "def": "p 값의 한국어 이름. \\(H_0\\) 아래에서 관측 결과 이상으로 극단적인 결과가 나올 확률이다.",
    "chapters": [
     "hypothesis#pvalue"
    ]
   },
   {
    "ko": "유한 모집단 수정",
    "en": "finite population correction",
    "abbr": "",
    "def": "비복원 추출에서 분산에 곱해지는 인수 \\((N-n)/(N-1)\\). 표본이 모집단의 큰 부분을 차지할수록 산포가 줄어드는 효과를 나타낸다.",
    "chapters": [
     "discrete#hypergeom"
    ]
   },
   {
    "ko": "유효 추정량",
    "en": "efficient estimator",
    "abbr": "",
    "def": "분산이 크라메르–라오 하한 \\(1/nI(\\theta)\\)과 같은 불편 추정량. 베르누이의 \\(\\hat p\\), 포아송의 \\(\\bar X\\)가 그 예다.",
    "chapters": [
     "estimation#fisher"
    ]
   },
   {
    "ko": "유효 표본 크기",
    "en": "effective sample size",
    "abbr": "",
    "def": "상관된 표본 \\(n\\)개와 같은 정밀도의 평균을 주는 독립 표본 수. AR(1)에서 \\(n(1-\\phi)/(1+\\phi)\\).",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "음이항 분포",
    "en": "negative binomial distribution",
    "abbr": "",
    "def": "\\(r\\)번째 성공까지의 시행 횟수의 분포. \\(P(X=k) = \\binom{k-1}{r-1}p^r(1-p)^{k-r}\\), 평균 \\(r/p\\), 분산 \\(r(1-p)/p^2\\). 독립인 기하 분포 \\(r\\)개의 합이다.",
    "chapters": [
     "discrete#geometric"
    ]
   },
   {
    "ko": "음이항 수율 모형",
    "en": "negative binomial yield model",
    "abbr": "",
    "def": "결함 밀도가 감마 분포를 따른다고 보고 얻은 수율 모형 \\(Y = (1 + D_0A/\\alpha)^{-\\alpha}\\).",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "의사 난수",
    "en": "pseudo-random number",
    "abbr": "",
    "def": "결정론적 규칙으로 계산되지만 통계적으로 무작위처럼 보이는 수열. 시드가 같으면 같은 수열이 나온다.",
    "chapters": [
     "limit-theorems#prng"
    ]
   },
   {
    "ko": "이동 범위",
    "en": "moving range",
    "abbr": "",
    "def": "이웃한 두 개별값의 차이의 절댓값 \\(MR_i = |x_i - x_{i-1}|\\). I–MR 관리도에서 \\(\\hat\\sigma = \\overline{MR}/1.128\\)로 쓴다.",
    "chapters": [
     "spc#variables"
    ]
   },
   {
    "ko": "이변량 정규 분포",
    "en": "bivariate normal distribution",
    "abbr": "",
    "def": "평균 둘, 표준 편차 둘, 상관 계수 하나로 정해지는 두 변수의 정규 분포. 등고선이 타원이고 주변·조건부 분포가 모두 정규다.",
    "chapters": [
     "joint#bivariate"
    ]
   },
   {
    "ko": "이분산성",
    "en": "heteroscedasticity",
    "abbr": "",
    "def": "오차의 분산이 설명 변수나 적합값에 따라 달라지는 성질. 잔차 그림에서 깔때기 모양으로 나타난다.",
    "chapters": [
     "regression#diagnostics"
    ]
   },
   {
    "ko": "이산 확률 변수",
    "en": "discrete random variable",
    "abbr": "",
    "def": "가질 수 있는 값이 유한개이거나 0, 1, 2, …처럼 셀 수 있게 떨어져 있는 확률 변수. 불량 개수, 재시험 횟수, 결함 수가 대표적이다.",
    "chapters": [
     "discrete#rv"
    ]
   },
   {
    "ko": "이산형",
    "en": "discrete",
    "abbr": "",
    "def": "셀 수 있는 값(0, 1, 2, …)만 갖는 수치형 자료. 웨이퍼당 결함 수 등.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "이상값",
    "en": "outlier",
    "abbr": "",
    "def": "자료의 무리에서 멀리 떨어진 관측값. 상자 그림에서는 울타리 밖의 값으로 표시한다.",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "이용률",
    "en": "utilization",
    "abbr": "",
    "def": "서버가 바쁜 시간 비율 \\(\\rho = \\lambda/(c\\mu)\\). 안정하려면 \\(\\rho<1\\)이어야 한다.",
    "chapters": [
     "stochastic#queue"
    ]
   },
   {
    "ko": "이원 분산 분석",
    "en": "two-way ANOVA",
    "abbr": "",
    "def": "두 요인의 주효과와 교호 작용을 \\(SS_A + SS_B + SS_{AB} + SS_E\\)로 나누어 검정하는 분산 분석.",
    "chapters": [
     "anova-doe#twoway"
    ]
   },
   {
    "ko": "이항 계수",
    "en": "binomial coefficient",
    "abbr": "",
    "def": "\\(\\binom nk\\). \\((a+b)^n\\) 전개에서 \\(a^kb^{n-k}\\)의 계수이며 조합의 수와 같다.",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "이항 분포",
    "en": "binomial distribution",
    "abbr": "",
    "def": "성공 확률 \\(p\\)인 독립 베르누이 시행 \\(n\\)번의 성공 횟수의 분포. \\(P(X=k) = \\binom nk p^k(1-p)^{n-k}\\), 평균 \\(np\\), 분산 \\(np(1-p)\\).",
    "chapters": [
     "discrete#binomial"
    ]
   },
   {
    "ko": "일시 상태",
    "en": "transient state",
    "abbr": "",
    "def": "언젠가는 떠나 다시 돌아오지 않을 확률이 양수인 상태. 흡수 연쇄의 흡수되지 않은 상태.",
    "chapters": [
     "stochastic#absorbing"
    ]
   },
   {
    "ko": "일원 분산 분석",
    "en": "one-way analysis of variance (ANOVA)",
    "abbr": "",
    "def": "요인 하나의 \\(k\\)개 처리 평균이 모두 같은지를 \\(F_0 = MS_B/MS_W\\)로 한 번에 검정하는 방법.",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "일치 추정량",
    "en": "consistent estimator",
    "abbr": "",
    "def": "표본 크기 \\(n\\to\\infty\\)일 때 모든 \\(\\varepsilon>0\\)에 대해 \\(P(|\\hat\\theta_n-\\theta|>\\varepsilon)\\to0\\)인 추정량. MSE가 0으로 가면 일치 추정량이다.",
    "chapters": [
     "estimation#efficiency"
    ]
   },
   {
    "ko": "임계 면적",
    "en": "critical area",
    "abbr": "",
    "def": "결함이 떨어졌을 때 회로를 실제로 고장 내는 위치들의 넓이. 결함 크기와 배선 간격에 따라 달라진다.",
    "chapters": [
     "reliability-yield#yield-models"
    ]
   },
   {
    "ko": "임계값",
    "en": "critical value",
    "abbr": "",
    "def": "기각역의 경계값. 예: α = 0.05 양측 z 검정에서 \\(\\pm 1.96\\).",
    "chapters": [
     "hypothesis#test-stat"
    ]
   },
   {
    "ko": "자기 공분산",
    "en": "autocovariance",
    "abbr": "",
    "def": "같은 과정의 시차 \\(k\\)만큼 떨어진 두 값의 공분산 \\(\\gamma(k) = \\operatorname{Cov}(X_t, X_{t+k})\\).",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "자기 상관 함수",
    "en": "autocorrelation function (ACF)",
    "abbr": "",
    "def": "\\(\\rho(k) = \\gamma(k)/\\gamma(0)\\). 시차 \\(k\\) 떨어진 값들 사이의 상관 계수.",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "자기 회귀 모형",
    "en": "autoregressive model",
    "abbr": "",
    "def": "현재 값을 과거 값의 선형 결합과 백색 잡음으로 나타낸 모형. AR(1)은 \\(X_t = \\phi X_{t-1}+\\varepsilon_t\\)이고 \\(\\rho(k) = \\phi^k\\).",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "자유도",
    "en": "degrees of freedom",
    "abbr": "",
    "def": "자유롭게 변할 수 있는 값의 개수. 편차의 합이 0이라는 제약 때문에 표본 분산의 자유도는 \\(n-1\\)이다.",
    "chapters": [
     "descriptive#spread"
    ]
   },
   {
    "ko": "잔차",
    "en": "residual",
    "abbr": "",
    "def": "관측값과 적합값의 차이 \\(e_i = y_i - \\hat y_i\\). 오차 \\(\\varepsilon_i\\)의 관측 가능한 대리인이다.",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "잔차 제곱합",
    "en": "sum of squared errors, SSE",
    "abbr": "",
    "def": "잔차를 제곱해 더한 값 \\(\\mathrm{SSE} = \\sum e_i^2\\). 최소 제곱법이 최소로 만드는 양이다.",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "재현성",
    "en": "reproducibility",
    "abbr": "",
    "def": "같은 생성기·시드·코드·입력으로 시뮬레이션을 다시 돌리면 같은 결과가 나오는 성질. 결과 검증과 디버깅, 공정한 비교 실험의 바탕이다.",
    "chapters": [
     "limit-theorems#prng"
    ]
   },
   {
    "ko": "적률",
    "en": "moment",
    "abbr": "",
    "def": "확률 변수의 거듭제곱의 기댓값 \\(E[X^k]\\)(\\(k\\)차 적률). 1차는 평균, 2차에서 분산이 나온다.",
    "chapters": [
     "discrete#mgf"
    ]
   },
   {
    "ko": "적률 생성 함수",
    "en": "moment generating function (mgf)",
    "abbr": "",
    "def": "\\(M_X(t) = E[e^{tX}]\\). \\(M_X'(0) = E[X]\\), \\(M_X''(0) = E[X^2]\\)이고, 분포를 유일하게 정하며 독립 합의 mgf는 곱이 된다.",
    "chapters": [
     "discrete#mgf"
    ]
   },
   {
    "ko": "적률법",
    "en": "method of moments",
    "abbr": "",
    "def": "모집단 적률 \\(E[X^k]\\)를 표본 적률 \\(\\frac1n\\sum X_i^k\\)와 같다고 놓고 모수에 대해 풀어 추정량을 만드는 방법.",
    "chapters": [
     "estimation#moments"
    ]
   },
   {
    "ko": "적합값",
    "en": "fitted value",
    "abbr": "",
    "def": "회귀식이 관측점 \\(x_i\\)에서 내놓는 값 \\(\\hat y_i = a + bx_i\\).",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "적합도 검정",
    "en": "goodness-of-fit test",
    "abbr": "",
    "def": "자료가 가설로 정한 분포(범주 확률)를 따르는지 판정하는 검정. 자유도는 칸 수 − 1 − 추정한 모수 수.",
    "chapters": [
     "categorical#gof"
    ]
   },
   {
    "ko": "전이 행렬",
    "en": "transition matrix",
    "abbr": "",
    "def": "\\(p_{ij} = P(X_{n+1}=j\\mid X_n=i)\\)를 모은 행렬. 각 행의 합은 1이다.",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "전확률 공식",
    "en": "law of total probability",
    "abbr": "",
    "def": "분할 \\(B_1,\\dots,B_k\\)에 대해 \\(P(A) = \\sum_i P(A\\mid B_i)P(B_i)\\). 전체 확률은 조건부 확률들의 가중 평균이다.",
    "chapters": [
     "conditional#tree-total"
    ]
   },
   {
    "ko": "절사 평균",
    "en": "trimmed mean",
    "abbr": "",
    "def": "정렬한 자료의 양 끝에서 같은 비율씩 버리고 남은 값의 평균.",
    "chapters": [
     "descriptive#center"
    ]
   },
   {
    "ko": "점 그림",
    "en": "dot plot",
    "abbr": "",
    "def": "각 관측값을 수직선 위에 점으로 찍고 겹치면 쌓은 그림.",
    "chapters": [
     "descriptive#frequency"
    ]
   },
   {
    "ko": "점수 함수",
    "en": "score function",
    "abbr": "",
    "def": "로그 가능도의 모수에 대한 도함수 \\(U(\\theta) = \\partial\\ell/\\partial\\theta\\). 참 모수에서 기댓값이 0이다.",
    "chapters": [
     "estimation#fisher"
    ]
   },
   {
    "ko": "점추정",
    "en": "point estimation",
    "abbr": "",
    "def": "모수를 숫자 하나(추정값)로 짐작하는 일. 구간으로 짐작하는 구간 추정과 대비된다.",
    "chapters": [
     "estimation#estimators"
    ]
   },
   {
    "ko": "정규 Q–Q 그림",
    "en": "normal quantile–quantile plot",
    "abbr": "",
    "def": "정렬한 자료를 표준 정규 분위수에 대해 찍은 그림. 정규 자료면 직선이 되고, 휘어진 모양으로 치우침·꼬리·쌍봉·이상값을 읽는다.",
    "chapters": [
     "categorical#normality"
    ]
   },
   {
    "ko": "정규 방정식",
    "en": "normal equations",
    "abbr": "",
    "def": "잔차 제곱합의 편미분을 0으로 놓아 얻는 연립 방정식 \\(X^{\\mathsf T}X\\hat\\beta = X^{\\mathsf T}y\\). 해가 최소 제곱 추정값이다.",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "정규 분포",
    "en": "normal distribution",
    "abbr": "",
    "def": "밀도 \\(\\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^2/2\\sigma^2}\\)인 종 모양 분포 \\(N(\\mu, \\sigma^2)\\). 많은 작은 요인의 합이 따르는 분포로, \\(\\mu \\pm \\sigma\\)가 변곡점이다.",
    "chapters": [
     "continuous#normal"
    ]
   },
   {
    "ko": "정상 과정",
    "en": "stationary process",
    "abbr": "",
    "def": "평균이 일정하고 공분산 \\(\\operatorname{Cov}(X_t,X_{t+k})\\)가 시차 \\(k\\)에만 의존하는 (약) 정상 확률 과정.",
    "chapters": [
     "stochastic#autocorrelation"
    ]
   },
   {
    "ko": "정상 분포",
    "en": "stationary distribution",
    "abbr": "",
    "def": "\\(\\pi = \\pi P\\), \\(\\sum\\pi_j = 1\\)을 만족하는 확률 벡터. 기약·비주기 연쇄의 장기 분포이자 각 상태의 장기 시간 비율이다.",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "정상 증분",
    "en": "stationary increments",
    "abbr": "",
    "def": "길이가 같은 구간의 증가량 분포가 구간의 위치와 무관한 성질.",
    "chapters": [
     "stochastic#poisson"
    ]
   },
   {
    "ko": "정상점",
    "en": "stationary point",
    "abbr": "",
    "def": "2차 반응 표면의 기울기가 0인 점 \\(\\mathbf x_s = -\\tfrac12\\mathbf B^{-1}\\mathbf b\\). 고유값 부호로 최대·최소·안장을 판정한다.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "정수 중도 절단",
    "en": "Type II censoring",
    "abbr": "",
    "def": "미리 정한 \\(r\\)번째 고장이 일어날 때 시험을 끝내는 방식.",
    "chapters": [
     "reliability-yield#censoring"
    ]
   },
   {
    "ko": "정시 중도 절단",
    "en": "Type I censoring",
    "abbr": "",
    "def": "정해진 시각에 시험을 끝내 그때까지 살아 있는 소자의 수명은 그 시각보다 길다는 정보만 남는 자료.",
    "chapters": [
     "reliability-yield#censoring"
    ]
   },
   {
    "ko": "정의 관계",
    "en": "defining relation",
    "abbr": "",
    "def": "생성자와 그 곱으로 이루어진 항등식 \\(I = ABCD\\) 등. 효과에 곱하면 별칭을 얻는다.",
    "chapters": [
     "anova-doe#fractional"
    ]
   },
   {
    "ko": "정확 이항 검정",
    "en": "exact binomial test",
    "abbr": "",
    "def": "정규 근사 없이 이항 분포의 확률을 더해 p 값을 구하는 비율 검정. \\(np_0\\)가 작을 때 쓴다.",
    "chapters": [
     "hypothesis#proportion"
    ]
   },
   {
    "ko": "제1종 오류",
    "en": "type I error",
    "abbr": "",
    "def": "참인 \\(H_0\\)를 기각하는 오류(거짓 경보). 확률은 \\(\\alpha\\)다.",
    "chapters": [
     "hypothesis#power"
    ]
   },
   {
    "ko": "제2종 오류",
    "en": "type II error",
    "abbr": "",
    "def": "거짓인 \\(H_0\\)를 기각하지 못하는 오류(놓침). 확률 \\(\\beta\\)는 참값에 따라 달라진다.",
    "chapters": [
     "hypothesis#power"
    ]
   },
   {
    "ko": "조건부 분포",
    "en": "conditional distribution",
    "abbr": "",
    "def": "한 변수의 값을 알 때 다른 변수의 분포. \\(p_{Y|X}(y\\mid x) = p_{X,Y}(x,y)/p_X(x)\\)로, 결합 분포의 한 단면을 합이 1이 되게 정규화한 것이다.",
    "chapters": [
     "joint#conditional-indep"
    ]
   },
   {
    "ko": "조건부 신뢰도",
    "en": "conditional reliability",
    "abbr": "",
    "def": "이미 \\(t\\)를 버틴 소자가 \\(s\\)를 더 버틸 확률 \\(R(s\\mid t) = R(t+s)/R(t)\\).",
    "chapters": [
     "reliability-yield#reliability-function"
    ]
   },
   {
    "ko": "조건부 확률",
    "en": "conditional probability",
    "abbr": "",
    "def": "사건 \\(B\\)가 일어났다는 것을 알 때 사건 \\(A\\)의 확률. \\(P(B)>0\\)이면 \\(P(A\\mid B) = P(A\\cap B)/P(B)\\)로, 표본 공간을 \\(B\\)로 좁혀 다시 정규화한 확률이다.",
    "chapters": [
     "conditional#conditional-prob"
    ]
   },
   {
    "ko": "조합",
    "en": "combination",
    "abbr": "",
    "def": "서로 다른 \\(n\\)개에서 순서를 무시하고 \\(k\\)개를 고르는 것. 그 수는 \\(\\binom nk = n!/(k!(n-k)!)\\).",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "주관적 확률",
    "en": "subjective probability",
    "abbr": "",
    "def": "반복하기 어려운 사건에 대해 근거를 바탕으로 매기는 믿음의 정도로서의 확률. 공리는 똑같이 따른다.",
    "chapters": [
     "probability#frequency"
    ]
   },
   {
    "ko": "주기",
    "en": "period",
    "abbr": "",
    "def": "의사 난수 생성기의 수열이 같은 상태로 돌아와 되풀이되기까지의 길이. 상태가 \\(b\\)비트이면 많아야 \\(2^b\\)이다.",
    "chapters": [
     "limit-theorems#prng"
    ]
   },
   {
    "ko": "주변 분포",
    "en": "marginal distribution",
    "abbr": "",
    "def": "결합 분포에서 다른 변수에 대해 더하거나 적분해 얻은 한 변수만의 분포. 예: \\(p_X(x) = \\sum_y p_{X,Y}(x,y)\\).",
    "chapters": [
     "joint#joint-dist"
    ]
   },
   {
    "ko": "주효과",
    "en": "main effect",
    "abbr": "",
    "def": "한 요인의 수준을 바꿀 때 다른 요인 수준에 대해 평균한 반응의 변화.",
    "chapters": [
     "anova-doe#twoway"
    ]
   },
   {
    "ko": "중도 절단",
    "en": "censoring",
    "abbr": "",
    "def": "관측이 끝날 때까지 사건(고장)이 일어나지 않아 수명이 어떤 값보다 길다는 정보만 있는 자료. 가능도에는 밀도 대신 생존 확률로 들어간다.",
    "chapters": [
     "estimation#mle"
    ]
   },
   {
    "ko": "중복순열",
    "en": "permutation with repetition",
    "abbr": "",
    "def": "중복을 허락해(복원 추출) 순서 있게 \\(k\\)개를 늘어놓는 것. 그 수는 \\(n^k\\).",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "중복조합",
    "en": "combination with repetition",
    "abbr": "",
    "def": "서로 다른 \\(n\\)종류에서 중복을 허락해 순서 없이 \\(k\\)개를 고르는 것. 그 수는 \\(\\binom{n+k-1}{k}\\)(별과 막대).",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "중심 극한 정리",
    "en": "central limit theorem",
    "abbr": "",
    "def": "유한한 분산을 갖는 독립 동일 분포 표본에서 표준화한 표본 평균 \\((\\bar X_n-\\mu)/(\\sigma/\\sqrt n)\\)의 분포가 모집단 모양과 무관하게 표준 정규 분포로 수렴한다는 정리.",
    "chapters": [
     "limit-theorems#clt"
    ]
   },
   {
    "ko": "중심 합성 계획",
    "en": "central composite design (CCD)",
    "abbr": "",
    "def": "2ᵏ 요인점에 축점 \\(2k\\)개(\\(\\pm\\alpha\\))와 중심점을 더한 2차 모형용 설계.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "중심점",
    "en": "center point",
    "abbr": "",
    "def": "설계 중심(부호화 0)에서 반복하는 실험점. 순수 오차와 곡률을 추정하게 해 준다.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "중앙 순위",
    "en": "median rank",
    "abbr": "",
    "def": "\\(n\\)개 중 \\(i\\)번째 고장에 붙이는 누적 고장 확률의 추정값. 베르나르 근사 \\((i-0.3)/(n+0.4)\\)를 쓴다.",
    "chapters": [
     "reliability-yield#weibull-plot"
    ]
   },
   {
    "ko": "중앙 절대 편차",
    "en": "median absolute deviation, MAD",
    "abbr": "",
    "def": "중앙값에서 잰 절대 편차들의 중앙값. \\(1.4826\\,\\mathrm{MAD}\\)는 정규 분포에서 \\(\\sigma\\)의 강건 추정값이다.",
    "chapters": [
     "descriptive#boxplot"
    ]
   },
   {
    "ko": "중앙값",
    "en": "median",
    "abbr": "",
    "def": "크기순으로 늘어놓았을 때 한가운데 값. 짝수 개면 가운데 두 값의 평균이다.",
    "chapters": [
     "descriptive#center"
    ]
   },
   {
    "ko": "중첩",
    "en": "superposition",
    "abbr": "",
    "def": "독립인 포아송 과정들을 합친 것. 비율 \\(\\lambda_1+\\lambda_2\\)인 포아송 과정이 된다.",
    "chapters": [
     "stochastic#poisson"
    ]
   },
   {
    "ko": "지렛값",
    "en": "leverage",
    "abbr": "",
    "def": "모자 행렬의 대각 원소 \\(h_{ii}\\). 점이 자기 적합값을 끌어당기는 잠재력으로, 단순 회귀에서 \\(1/n + (x_i - \\bar x)^2/S_{xx}\\)이다.",
    "chapters": [
     "regression#diagnostics"
    ]
   },
   {
    "ko": "지수 가중 이동 평균",
    "en": "exponentially weighted moving average, EWMA",
    "abbr": "",
    "def": "\\(z_i = \\lambda x_i + (1-\\lambda)z_{i-1}\\)로 과거 값에 기하급수적으로 줄어드는 가중치를 주는 통계량. 작은 평균 이동에 민감한 EWMA 관리도에 쓴다.",
    "chapters": [
     "spc#ewma-cusum"
    ]
   },
   {
    "ko": "지수 분포",
    "en": "exponential distribution",
    "abbr": "",
    "def": "밀도 \\(\\lambda e^{-\\lambda t}\\) \\((t \\ge 0)\\)인 분포 \\(\\mathrm{Exp}(\\lambda)\\). 포아송 과정의 기다림 시간이며 평균과 표준 편차가 모두 \\(1/\\lambda\\)이고 고장률이 일정하다.",
    "chapters": [
     "continuous#uniform-exponential"
    ]
   },
   {
    "ko": "지시 확률 변수",
    "en": "indicator random variable",
    "abbr": "",
    "def": "사건 \\(A\\)가 일어나면 1, 아니면 0인 확률 변수 \\(I_A\\). \\(E[I_A] = P(A)\\)이고, 개수를 지시 변수의 합으로 써서 평균을 쉽게 구한다.",
    "chapters": [
     "discrete#binomial"
    ]
   },
   {
    "ko": "직렬 계통",
    "en": "series system",
    "abbr": "",
    "def": "구성 부품이 하나라도 고장 나면 멈추는 계통. 독립 고장이면 신뢰도는 \\(\\prod r_i\\)이다.",
    "chapters": [
     "conditional#reliability"
    ]
   },
   {
    "ko": "집단 간 제곱합",
    "en": "between-group sum of squares",
    "abbr": "",
    "def": "처리 평균이 전체 평균에서 벗어난 정도의 제곱합 \\(SS_B = \\sum n_i(\\bar y_{i\\cdot}-\\bar y_{\\cdot\\cdot})^2\\).",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "집단 내 제곱합",
    "en": "within-group sum of squares",
    "abbr": "",
    "def": "각 관측값이 자기 처리 평균에서 벗어난 정도의 제곱합 \\(SS_W\\). 오차 제곱합이라고도 한다.",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "차원의 저주",
    "en": "curse of dimensionality",
    "abbr": "",
    "def": "차원이 늘수록 격자·구적법 같은 방법에 필요한 점의 수가 지수적으로 늘어 정확도가 급격히 나빠지는 현상. 몬테카를로의 오차 \\(N^{-1/2}\\)는 차원에 무관하다.",
    "chapters": [
     "limit-theorems#monte-carlo"
    ]
   },
   {
    "ko": "채프먼–콜모고로프 방정식",
    "en": "Chapman–Kolmogorov equation",
    "abbr": "",
    "def": "\\(n\\)걸음 전이 확률이 중간 상태를 거쳐 곱해진다는 관계 \\(P^{m+n} = P^mP^n\\).",
    "chapters": [
     "stochastic#markov"
    ]
   },
   {
    "ko": "처리",
    "en": "treatment",
    "abbr": "",
    "def": "실험 단위에 적용하는 요인 수준(또는 수준 조합) 하나.",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "처리 효과",
    "en": "treatment effect",
    "abbr": "",
    "def": "처리 평균이 전체 평균에서 벗어난 양 \\(\\tau_i = \\mu_i - \\mu\\).",
    "chapters": [
     "anova-doe#tukey"
    ]
   },
   {
    "ko": "첨도",
    "en": "kurtosis",
    "abbr": "",
    "def": "분포 꼬리의 두꺼운 정도. 초과 첨도 \\(g_2 = m_4/m_2^2 - 3\\)는 정규 분포에서 0이다.",
    "chapters": [
     "descriptive#shape"
    ]
   },
   {
    "ko": "첫걸음 분석",
    "en": "first-step analysis",
    "abbr": "",
    "def": "첫 전이가 어디로 가는지로 경우를 나누고 마르코프 성질로 다시 시작하는 계산법. 도달 확률·기대 도달 시간의 연립 방정식을 준다.",
    "chapters": [
     "stochastic#absorbing"
    ]
   },
   {
    "ko": "체비쇼프 부등식",
    "en": "Chebyshev's inequality",
    "abbr": "",
    "def": "평균 \\(\\mu\\), 표준 편차 \\(\\sigma\\)인 모든 분포에서 \\(P(|X-\\mu|\\ge k\\sigma)\\le 1/k^2\\)이 성립한다는 부등식. 분포 모양을 몰라도 쓸 수 있지만 대개 느슨하다.",
    "chapters": [
     "limit-theorems#inequalities"
    ]
   },
   {
    "ko": "초기 고장",
    "en": "infant mortality",
    "abbr": "",
    "def": "출하 직후 잠재 결함을 가진 약한 소자들이 일찍 고장 나는 구간. 고장률이 시간에 따라 줄어든다(와이블 \\(\\beta < 1\\)).",
    "chapters": [
     "reliability-yield#bathtub"
    ]
   },
   {
    "ko": "초기 고장률",
    "en": "early life failure rate, ELFR",
    "abbr": "",
    "def": "출하 후 첫 기간(보통 1년) 동안의 고장 비율. ppm으로 관리하며 번인의 효과를 나타낸다.",
    "chapters": [
     "reliability-yield#burn-in"
    ]
   },
   {
    "ko": "초기하 분포",
    "en": "hypergeometric distribution",
    "abbr": "",
    "def": "불량 \\(K\\)개를 포함한 \\(N\\)개에서 \\(n\\)개를 비복원으로 뽑을 때 표본 속 불량 수의 분포. \\(P(X=k) = \\binom Kk\\binom{N-K}{n-k}/\\binom Nn\\).",
    "chapters": [
     "discrete#hypergeom"
    ]
   },
   {
    "ko": "최대 가능도 추정량",
    "en": "maximum likelihood estimator, MLE",
    "abbr": "",
    "def": "가능도 \\(L(\\theta)\\)를 최대로 만드는 \\(\\hat\\theta\\). 관측된 자료가 나올 가능성이 가장 큰 모수 값이며, 큰 표본에서 거의 불편이고 분산이 크라메르–라오 하한에 다가간다.",
    "chapters": [
     "estimation#mle"
    ]
   },
   {
    "ko": "최대 경사 상승법",
    "en": "method of steepest ascent",
    "abbr": "",
    "def": "1차 모형의 기울기 \\((\\hat\\beta_1, \\hat\\beta_2)\\) 방향으로 실험점을 옮겨 반응이 가장 빨리 커지는 쪽으로 나아가는 방법.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "최빈값",
    "en": "mode",
    "abbr": "",
    "def": "자료에서 가장 자주 나오는 값(또는 범주). 연속형 자료에서는 도수가 가장 큰 계급으로 말한다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "최소 분산 불편 추정량",
    "en": "minimum variance unbiased estimator, MVUE",
    "abbr": "",
    "def": "모든 불편 추정량 가운데 분산이 가장 작은 추정량. 정규 모집단에서 \\(\\bar X\\)는 \\(\\mu\\)의 MVUE다.",
    "chapters": [
     "estimation#efficiency"
    ]
   },
   {
    "ko": "최소 제곱법",
    "en": "method of least squares",
    "abbr": "",
    "def": "잔차 제곱합을 가장 작게 만드는 계수를 추정값으로 택하는 방법.",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "추정값",
    "en": "estimate",
    "abbr": "",
    "def": "추정량에 실제 자료 \\(x_1,\\dots,x_n\\)을 넣어 얻은 숫자 하나.",
    "chapters": [
     "estimation#estimators"
    ]
   },
   {
    "ko": "추정량",
    "en": "estimator",
    "abbr": "",
    "def": "모수를 짐작하려고 쓰는 통계량 \\(\\hat\\theta = h(X_1,\\dots,X_n)\\). 표본의 함수이므로 그 자체가 확률 변수이고 표본 분포를 가진다.",
    "chapters": [
     "estimation#estimators"
    ]
   },
   {
    "ko": "측정 시스템 분석",
    "en": "measurement system analysis, MSA",
    "abbr": "",
    "def": "계측기·작업자·절차로 이루어진 측정 시스템의 산포와 치우침을 평가하는 일. Gage R&R, 편향, 선형성, 안정성을 본다.",
    "chapters": [
     "spc#msa"
    ]
   },
   {
    "ko": "층화 추출",
    "en": "stratified sampling",
    "abbr": "",
    "def": "모집단을 겹치지 않는 층으로 나누고 층마다 따로 무작위 추출하는 방법. 층 안 산포만 표준 오차에 남는다.",
    "chapters": [
     "sampling#methods"
    ]
   },
   {
    "ko": "카이제곱 분포",
    "en": "chi-square distribution",
    "abbr": "",
    "def": "독립인 표준 정규 변수 \\(k\\)개의 제곱합 \\(\\sum Z_i^2\\)의 분포. 평균 \\(k\\), 분산 \\(2k\\)이며 \\(\\mathrm{Gamma}(k/2, 2)\\)와 같다.",
    "chapters": [
     "sampling#chi-square"
    ]
   },
   {
    "ko": "카플란–마이어 추정량",
    "en": "Kaplan–Meier estimator",
    "abbr": "",
    "def": "중도 절단 자료에서 신뢰도를 고장 시각마다 \\(1 - d_j/n_j\\)를 곱해 추정하는 비모수 계단 함수.",
    "chapters": [
     "reliability-yield#censoring"
    ]
   },
   {
    "ko": "켄달 기호",
    "en": "Kendall notation",
    "abbr": "",
    "def": "대기 행렬을 도착 과정/서비스 분포/서버 수로 줄여 쓰는 표기(예: M/M/1, M/M/c, G/G/1).",
    "chapters": [
     "stochastic#queue"
    ]
   },
   {
    "ko": "켤레 사전 분포",
    "en": "conjugate prior",
    "abbr": "",
    "def": "가능도와 곱했을 때 사후 분포가 사전 분포와 같은 분포족에 머무는 사전 분포. 이항 자료의 베타 분포, 포아송 자료의 감마 분포가 대표적이다.",
    "chapters": [
     "estimation#bayes"
    ]
   },
   {
    "ko": "콜모고로프–스미르노프 검정",
    "en": "Kolmogorov–Smirnov test",
    "abbr": "",
    "def": "경험적 누적 분포 함수와 가설 분포의 cdf 사이 최대 세로 간격 \\(D_n\\)으로 적합을 판정하는 검정. 5% 임계값은 약 \\(1.36/\\sqrt n\\).",
    "chapters": [
     "categorical#normality"
    ]
   },
   {
    "ko": "쿡의 거리",
    "en": "Cook's distance",
    "abbr": "",
    "def": "점 하나를 뺐을 때 적합값 전체가 바뀌는 정도 \\(D_i = \\frac{r_i^2}{p}\\frac{h_{ii}}{1 - h_{ii}}\\). 1을 넘으면 영향점으로 본다.",
    "chapters": [
     "regression#diagnostics"
    ]
   },
   {
    "ko": "크라메르 V",
    "en": "Cramér's V",
    "abbr": "",
    "def": "분할표 연관의 크기를 0–1로 나타낸 값 \\(V = \\sqrt{\\chi^2/(N(\\min(r,c)-1))}\\). 표본 크기에 휘둘리지 않는다.",
    "chapters": [
     "categorical#contingency"
    ]
   },
   {
    "ko": "큰 수의 법칙",
    "en": "law of large numbers",
    "abbr": "",
    "def": "독립 동일 분포 표본의 평균 \\(\\bar X_n\\)이 \\(n\\to\\infty\\)에서 모평균 \\(\\mu\\)로 수렴한다는 정리. 약한 법칙은 확률 수렴, 강한 법칙은 거의 확실한 수렴을 말한다.",
    "chapters": [
     "limit-theorems#lln"
    ]
   },
   {
    "ko": "클로퍼–피어슨 구간",
    "en": "Clopper–Pearson exact interval",
    "abbr": "",
    "def": "이항 분포를 정확히 거꾸로 풀어 베타 분위수로 계산하는 비율의 구간. 포함 확률이 언제나 명목값 이상인 보수적 구간이다.",
    "chapters": [
     "confidence#proportion"
    ]
   },
   {
    "ko": "통계량",
    "en": "statistic",
    "abbr": "",
    "def": "표본 값으로 계산한 수. 표본 평균 \\(\\bar x\\), 표본 분산 \\(s^2\\) 등.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "통계적 가설",
    "en": "statistical hypothesis",
    "abbr": "",
    "def": "모집단의 모수에 대한 주장. 가설 검정에서는 귀무가설과 대립가설 두 개를 맞세운다.",
    "chapters": [
     "hypothesis#hypotheses"
    ]
   },
   {
    "ko": "통계적 공정 관리",
    "en": "statistical process control, SPC",
    "abbr": "",
    "def": "관리도·공정 능력 분석·측정 시스템 분석 등 통계 도구로 공정의 변동을 감시하고 줄이는 활동.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "투키 HSD",
    "en": "Tukey's honestly significant difference",
    "abbr": "",
    "def": "모든 쌍별 비교에서 가족별 오류율을 \\(\\alpha\\)로 묶는 기준 \\(q_\\alpha(k,N-k)\\sqrt{MS_W/n}\\). 평균 차이가 이보다 크면 유의하다.",
    "chapters": [
     "anova-doe#tukey"
    ]
   },
   {
    "ko": "특성 수명",
    "en": "characteristic life",
    "abbr": "",
    "def": "와이블 분포의 척도 모수 \\(\\eta\\). 모양 모수와 상관없이 \\(t = \\eta\\)까지 전체의 \\(1 - e^{-1} \\approx 63.2\\%\\)가 고장 난다.",
    "chapters": [
     "continuous#zoo"
    ]
   },
   {
    "ko": "특수 원인",
    "en": "special cause, assignable cause",
    "abbr": "",
    "def": "장비 고장, 소모품 마모, 보정 오류처럼 찾아서 없앨 수 있는 구체적 사건에서 오는 변동. 관리도에서 한계 이탈이나 비정상 패턴으로 드러난다.",
    "chapters": [
     "spc#causes"
    ]
   },
   {
    "ko": "특이도",
    "en": "specificity",
    "abbr": "",
    "def": "실제로 양품(음성)인 대상을 검사가 음성으로 통과시킬 확률 \\(P(-\\mid D^c)\\). 1에서 뺀 값이 오경보율이다.",
    "chapters": [
     "conditional#bayes"
    ]
   },
   {
    "ko": "파레토 그림",
    "en": "Pareto chart",
    "abbr": "",
    "def": "범주별 도수를 큰 순서로 막대로 그리고 누적 비율 꺾은선을 겹친 그림. 주요 원인을 가려내는 데 쓴다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "파스칼 삼각형",
    "en": "Pascal's triangle",
    "abbr": "",
    "def": "이항 계수 \\(\\binom nk\\)를 삼각형으로 늘어놓은 표. 각 수는 바로 위 두 수의 합이다.",
    "chapters": [
     "probability#counting"
    ]
   },
   {
    "ko": "편차",
    "en": "deviation",
    "abbr": "",
    "def": "관측값에서 평균을 뺀 값 \\(x_i - \\bar x\\). 합은 언제나 0이다.",
    "chapters": [
     "descriptive#center"
    ]
   },
   {
    "ko": "편향",
    "en": "bias",
    "abbr": "",
    "def": "추정량의 기댓값과 참값의 차이 \\(E[\\hat\\theta] - \\theta\\). 반복 추출에서 추정값들이 평균적으로 어느 쪽으로 치우치는지를 나타낸다.",
    "chapters": [
     "estimation#unbiased"
    ]
   },
   {
    "ko": "평균 고장 시간",
    "en": "mean time to failure, MTTF",
    "abbr": "",
    "def": "수리하지 않는 소자의 평균 수명 \\(\\text{MTTF} = E[T] = \\int_0^\\infty R(t)\\,dt\\).",
    "chapters": [
     "reliability-yield#reliability-function"
    ]
   },
   {
    "ko": "평균 런 길이",
    "en": "average run length, ARL",
    "abbr": "",
    "def": "관리도가 첫 경보를 낼 때까지의 평균 점 수. 점당 경보 확률이 \\(p\\)이면 \\(1/p\\)이고, 3시그마 관리도의 관리 상태 값은 370이다.",
    "chapters": [
     "spc#rules"
    ]
   },
   {
    "ko": "평균 제곱",
    "en": "mean square",
    "abbr": "",
    "def": "제곱합을 그 자유도로 나눈 값. \\(MS_W\\)는 오차 분산 \\(\\sigma^2\\)의 불편 추정량이다.",
    "chapters": [
     "anova-doe#oneway"
    ]
   },
   {
    "ko": "평균 제곱 오차",
    "en": "mean squared error, MSE",
    "abbr": "",
    "def": "추정량이 참값에서 벗어난 제곱의 기댓값 \\(E[(\\hat\\theta-\\theta)^2]\\). 분산과 편향의 제곱의 합 \\(\\operatorname{Var}(\\hat\\theta) + \\mathrm{Bias}^2\\)으로 분해된다.",
    "chapters": [
     "estimation#mse"
    ]
   },
   {
    "ko": "평균 출검 품질",
    "en": "average outgoing quality, AOQ",
    "abbr": "",
    "def": "불합격 로트를 전수 선별하는 검사를 거친 뒤 나가는 평균 불량률 \\(\\mathrm{AOQ} \\approx P_a(p)\\,p\\,(N-n)/N\\). 그 최댓값이 AOQL이다.",
    "chapters": [
     "spc#acceptance"
    ]
   },
   {
    "ko": "평균으로의 회귀",
    "en": "regression to the mean",
    "abbr": "",
    "def": "\\(|r| < 1\\)이어서 극단적인 \\(x\\)에 대한 예측(또는 재측정)이 평균 쪽으로 당겨지는 현상.",
    "chapters": [
     "regression#r-squared"
    ]
   },
   {
    "ko": "포아송 과정",
    "en": "Poisson process",
    "abbr": "",
    "def": "사건이 서로 독립적으로 일정한 평균 비율 \\(\\lambda\\)로 일어나는 확률 과정. 길이 \\(t\\)인 구간의 사건 수는 \\(\\mathrm{Poisson}(\\lambda t)\\), 사건 사이 간격은 \\(\\mathrm{Exp}(\\lambda)\\)를 따른다.",
    "chapters": [
     "continuous#uniform-exponential"
    ]
   },
   {
    "ko": "포아송 근사",
    "en": "Poisson approximation",
    "abbr": "",
    "def": "\\(n\\)이 크고 \\(p\\)가 작을 때 \\(\\mathrm{Bin}(n,p)\\)를 \\(\\mathrm{Poisson}(np)\\)로 바꿔 계산하는 근사. 오차는 대략 \\(p\\)에 비례한다.",
    "chapters": [
     "discrete#poisson"
    ]
   },
   {
    "ko": "포아송 분포",
    "en": "Poisson distribution",
    "abbr": "",
    "def": "일정한 면적·시간 안에서 독립적으로 드물게 일어나는 사건 수의 분포. \\(P(X=k) = e^{-\\lambda}\\lambda^k/k!\\), 평균과 분산이 모두 \\(\\lambda\\)다.",
    "chapters": [
     "discrete#poisson"
    ]
   },
   {
    "ko": "포함 확률",
    "en": "coverage probability",
    "abbr": "",
    "def": "구간 절차가 실제로 참값을 덮는 확률. 가정이 맞으면 명목 신뢰 수준과 같고, 어긋나면 낮아진다.",
    "chapters": [
     "confidence#meaning"
    ]
   },
   {
    "ko": "포함–배제 원리",
    "en": "inclusion–exclusion principle",
    "abbr": "",
    "def": "겹치는 사건의 합사건 확률을 구하는 공식. \\(P(A\\cup B) = P(A) + P(B) - P(A\\cap B)\\)이고, 사건이 많으면 겹침을 번갈아 빼고 더한다.",
    "chapters": [
     "probability#axioms"
    ]
   },
   {
    "ko": "표본",
    "en": "sample",
    "abbr": "",
    "def": "모집단에서 실제로 관측한 일부. 49점 막두께는 웨이퍼 전체에서 뽑은 표본이다.",
    "chapters": [
     "descriptive#data-types"
    ]
   },
   {
    "ko": "표본 공간",
    "en": "sample space",
    "abbr": "",
    "def": "한 번의 시행에서 나올 수 있는 모든 결과의 집합. 보통 \\(\\Omega\\) 또는 \\(S\\)로 쓴다.",
    "chapters": [
     "probability#sample-space"
    ]
   },
   {
    "ko": "표본 공분산",
    "en": "sample covariance",
    "abbr": "",
    "def": "\\(s_{xy} = \\sum(x_i - \\bar x)(y_i - \\bar y)/(n-1)\\). 두 변수가 함께 움직이는 방향과 크기를 단위가 있는 값으로 나타낸다.",
    "chapters": [
     "descriptive#correlation"
    ]
   },
   {
    "ko": "표본 범위",
    "en": "sample range",
    "abbr": "",
    "def": "표본의 최댓값과 최솟값의 차 \\(X_{(n)} - X_{(1)}\\).",
    "chapters": [
     "sampling#order"
    ]
   },
   {
    "ko": "표본 분산",
    "en": "sample variance",
    "abbr": "",
    "def": "편차 제곱의 합을 \\(n-1\\)로 나눈 값 \\(s^2 = \\sum(x_i - \\bar x)^2/(n-1)\\).",
    "chapters": [
     "descriptive#spread"
    ]
   },
   {
    "ko": "표본 분포",
    "en": "sampling distribution",
    "abbr": "",
    "def": "같은 방법으로 표본을 반복해서 뽑을 때 통계량이 따르는 확률 분포.",
    "chapters": [
     "sampling#statistic"
    ]
   },
   {
    "ko": "표본 평균",
    "en": "sample mean",
    "abbr": "",
    "def": "관측값의 합을 개수로 나눈 값 \\(\\bar x = \\sum x_i/n\\). 편차의 합이 0이 되는 받침점이다.",
    "chapters": [
     "descriptive#center"
    ]
   },
   {
    "ko": "표본 표준 편차",
    "en": "sample standard deviation",
    "abbr": "",
    "def": "표본 분산의 양의 제곱근 \\(s\\). 자료와 단위가 같다.",
    "chapters": [
     "descriptive#spread"
    ]
   },
   {
    "ko": "표준 오차",
    "en": "standard error",
    "abbr": "",
    "def": "통계량의 표본 분포의 표준 편차. 표본 평균이면 \\(\\sigma/\\sqrt n\\)이다.",
    "chapters": [
     "sampling#statistic"
    ]
   },
   {
    "ko": "표준 정규 분포",
    "en": "standard normal distribution",
    "abbr": "",
    "def": "평균 0, 분산 1인 정규 분포 \\(N(0,1)\\). 누적 분포 함수를 \\(\\Phi(z)\\), 밀도를 \\(\\phi(z)\\)로 쓴다.",
    "chapters": [
     "continuous#normal"
    ]
   },
   {
    "ko": "표준 편차",
    "en": "standard deviation",
    "abbr": "",
    "def": "분산의 제곱근 \\(\\sigma = \\sqrt{\\operatorname{Var}(X)}\\). 확률 변수와 같은 단위로 퍼짐을 나타낸다.",
    "chapters": [
     "discrete#expectation"
    ]
   },
   {
    "ko": "표준화",
    "en": "standardization",
    "abbr": "",
    "def": "평균을 빼고 표준 편차로 나누는 변환 \\(Z = (X - \\mu)/\\sigma\\). 정규 분포를 표준 정규 분포로 바꿔 표 하나로 확률을 계산하게 한다.",
    "chapters": [
     "continuous#normal"
    ]
   },
   {
    "ko": "피벗량",
    "en": "pivotal quantity",
    "abbr": "",
    "def": "표본과 모수를 함께 담고 있으면서 분포가 모수에 의존하지 않는 양. 예: \\(Z = (\\bar X - \\mu)/(\\sigma/\\sqrt n)\\). 이를 뒤집어 신뢰 구간을 만든다.",
    "chapters": [
     "confidence#meaning"
    ]
   },
   {
    "ko": "피셔 정보",
    "en": "Fisher information",
    "abbr": "",
    "def": "점수 함수의 분산, 곧 로그 밀도의 평균 곡률 \\(I(\\theta) = -E[\\partial^2\\ln f(X;\\theta)/\\partial\\theta^2]\\). 관측 하나가 모수에 대해 담은 정보의 양이다.",
    "chapters": [
     "estimation#fisher"
    ]
   },
   {
    "ko": "피셔 정확 검정",
    "en": "Fisher's exact test",
    "abbr": "",
    "def": "2×2 표의 행·열 합을 고정하고 초기하 분포로 p 값을 정확히 계산하는 검정. 기대 도수가 작아도 쓸 수 있다.",
    "chapters": [
     "categorical#fisher"
    ]
   },
   {
    "ko": "피어슨 잔차",
    "en": "Pearson residual",
    "abbr": "",
    "def": "분할표 각 칸의 표준화된 어긋남 \\((O-E)/\\sqrt E\\). 절댓값이 2를 넘으면 눈여겨볼 칸이다.",
    "chapters": [
     "categorical#contingency"
    ]
   },
   {
    "ko": "피어슨 카이제곱 통계량",
    "en": "Pearson's chi-square statistic",
    "abbr": "",
    "def": "관측 도수와 기대 도수의 어긋남을 모은 통계량 \\(\\chi^2 = \\sum (O-E)^2/E\\). 귀무가설 아래 근사적으로 카이제곱 분포를 따른다.",
    "chapters": [
     "categorical#gof"
    ]
   },
   {
    "ko": "한 번에 한 요인",
    "en": "one factor at a time (OFAT)",
    "abbr": "",
    "def": "다른 요인을 고정하고 한 요인씩 바꿔 최적화하는 방식. 교호 작용이 있으면 최적점을 놓친다.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "합격 판정 샘플링",
    "en": "acceptance sampling",
    "abbr": "",
    "def": "로트에서 표본 \\(n\\)개를 검사해 불량이 \\(c\\)개 이하면 로트 전체를 합격시키는 검사 방식. 규칙 \\((n, c)\\)를 샘플링 계획이라 한다.",
    "chapters": [
     "discrete#hypergeom"
    ]
   },
   {
    "ko": "합동 분산",
    "en": "pooled variance",
    "abbr": "",
    "def": "두 모분산이 같다고 보고 두 표본 분산을 자유도로 가중 평균한 값 \\(s_p^2 = [(n_1-1)s_1^2 + (n_2-1)s_2^2]/(n_1+n_2-2)\\).",
    "chapters": [
     "confidence#two-sample"
    ]
   },
   {
    "ko": "합리적 부분군",
    "en": "rational subgroup",
    "abbr": "",
    "def": "부분군 안에는 공통 원인 변동만, 부분군 사이에 특수 원인이 드러나도록 같은 조건에서 거의 동시에 뽑은 표본 묶음.",
    "chapters": [
     "spc#variables"
    ]
   },
   {
    "ko": "합사건",
    "en": "union",
    "abbr": "",
    "def": "\\(A\\) 또는 \\(B\\) 가운데 적어도 하나가 일어나는 사건 \\(A\\cup B\\).",
    "chapters": [
     "probability#set-operations"
    ]
   },
   {
    "ko": "합성곱",
    "en": "convolution",
    "abbr": "",
    "def": "독립인 두 확률 변수의 합의 분포를 구하는 연산 \\(f_{X+Y}(s) = \\int f_X(x)f_Y(s-x)\\,dx\\)(이산이면 합).",
    "chapters": [
     "joint#sums"
    ]
   },
   {
    "ko": "홀름 방법",
    "en": "Holm's step-down method",
    "abbr": "",
    "def": "p 값을 오름차순으로 정렬해 \\(p_{(k)} \\le \\alpha/(m-k+1)\\)인 동안 차례로 기각하는 단계적 보정. 본페로니보다 같거나 많이 기각한다.",
    "chapters": [
     "hypothesis#multiple"
    ]
   },
   {
    "ko": "확률 과정",
    "en": "stochastic process",
    "abbr": "",
    "def": "시간(또는 순서)을 첨자로 갖는 확률 변수들의 모임 \\(\\{X_t\\}\\). 한 번 실행한 결과를 표본 경로라 한다.",
    "chapters": [
     "stochastic"
    ]
   },
   {
    "ko": "확률 나무",
    "en": "probability tree",
    "abbr": "",
    "def": "여러 단계의 실험을 가지마다 조건부 확률을 적어 나타낸 그림. 뿌리에서 잎까지 가지의 확률을 곱하면 그 잎(교집합)의 확률이다.",
    "chapters": [
     "conditional#tree-total"
    ]
   },
   {
    "ko": "확률 밀도 함수",
    "en": "probability density function, pdf",
    "abbr": "",
    "def": "연속 확률 변수의 확률을 넓이로 주는 함수 \\(f_X(x) \\ge 0\\). \\(P(a \\le X \\le b) = \\int_a^b f_X(x)\\,dx\\)이고 전체 넓이는 1이며, 값 자체는 확률이 아니라 단위 길이당 확률이다.",
    "chapters": [
     "continuous#pdf-cdf"
    ]
   },
   {
    "ko": "확률 변수",
    "en": "random variable",
    "abbr": "",
    "def": "표본 공간의 각 결과에 실수 하나를 대응시키는 함수 \\(X:\\Omega\\to\\mathbb R\\). 대문자 \\(X\\)로 쓰고 그 값은 소문자 \\(x\\)로 쓴다.",
    "chapters": [
     "discrete#rv"
    ]
   },
   {
    "ko": "확률 수렴",
    "en": "convergence in probability",
    "abbr": "",
    "def": "모든 \\(\\varepsilon>0\\)에 대해 \\(P(|X_n-c|\\ge\\varepsilon)\\to0\\)일 때 \\(X_n\\)이 \\(c\\)로 확률 수렴한다고 하고 \\(X_n\\xrightarrow{P}c\\)로 쓴다.",
    "chapters": [
     "limit-theorems#lln"
    ]
   },
   {
    "ko": "확률 실험",
    "en": "random experiment",
    "abbr": "",
    "def": "결과를 미리 알 수 없지만 일어날 수 있는 결과의 범위는 알고 있는 과정. 주사위 던지기, 칩 하나의 테스트, 막 두께 한 번 측정 등.",
    "chapters": [
     "probability#sample-space"
    ]
   },
   {
    "ko": "확률 적분 변환",
    "en": "probability integral transform",
    "abbr": "",
    "def": "연속 확률 변수 \\(X\\)를 자기 누적 분포 함수에 넣은 \\(U = F_X(X)\\)는 \\(U(0,1)\\)을 따른다는 성질.",
    "chapters": [
     "continuous#transform"
    ]
   },
   {
    "ko": "확률 질량 함수",
    "en": "probability mass function (pmf)",
    "abbr": "",
    "def": "이산 확률 변수가 각 값을 가질 확률 \\(p_X(x) = P(X = x)\\). 모든 값에서 0 이상이고 합이 1이다.",
    "chapters": [
     "discrete#rv"
    ]
   },
   {
    "ko": "확률의 공리",
    "en": "axioms of probability",
    "abbr": "",
    "def": "콜모고로프의 세 규칙: \\(P(A) \\ge 0\\), \\(P(\\Omega) = 1\\), 서로 배반인 사건들의 확률은 더해진다(가산 가법성).",
    "chapters": [
     "probability#axioms"
    ]
   },
   {
    "ko": "확률화 블록 계획",
    "en": "randomized complete block design (RCBD)",
    "abbr": "",
    "def": "블록마다 모든 처리를 한 번씩 무작위 순서로 적용하는 설계. 모형은 \\(y_{ij} = \\mu + \\tau_i + \\beta_j + \\varepsilon_{ij}\\).",
    "chapters": [
     "anova-doe#principles"
    ]
   },
   {
    "ko": "확산 계수",
    "en": "diffusion coefficient",
    "abbr": "",
    "def": "확산하는 입자 위치의 분산이 \\(\\sigma^2 = 2Dt\\)(1차원)로 자랄 때의 비례 상수 \\(D\\). 걸음 길이 \\(a\\), 간격 \\(\\tau\\)이면 \\(D = a^2/2\\tau\\).",
    "chapters": [
     "stochastic#random-walk"
    ]
   },
   {
    "ko": "활성화 에너지",
    "en": "activation energy",
    "abbr": "",
    "def": "아레니우스 모형에서 고장 반응 속도의 온도 의존성을 정하는 에너지 \\(E_a\\)(eV).",
    "chapters": [
     "reliability-yield#accelerated"
    ]
   },
   {
    "ko": "회귀 계수",
    "en": "regression coefficients",
    "abbr": "",
    "def": "회귀 모형의 절편과 기울기 등 모수 \\(\\beta_0, \\beta_1, \\dots\\).",
    "chapters": [
     "regression#inference"
    ]
   },
   {
    "ko": "회귀 분석",
    "en": "regression analysis",
    "abbr": "",
    "def": "한 변수(설명 변수)의 값으로 다른 변수(반응 변수)의 값을 설명하거나 예측하는 식을 자료로 세우는 방법.",
    "chapters": [
     "regression#least-squares"
    ]
   },
   {
    "ko": "회귀 함수",
    "en": "regression function",
    "abbr": "",
    "def": "조건부 기댓값 \\(E[Y\\mid X = x]\\)를 \\(x\\)의 함수로 본 것. 이변량 정규에서는 직선이다.",
    "chapters": [
     "joint#conditional-indep"
    ]
   },
   {
    "ko": "회전성",
    "en": "rotatability",
    "abbr": "",
    "def": "중심에서 같은 거리의 점들에서 예측 분산이 같은 성질. CCD에서는 \\(\\alpha = (2^k)^{1/4}\\)일 때 성립한다.",
    "chapters": [
     "anova-doe#rsm"
    ]
   },
   {
    "ko": "효과 크기",
    "en": "effect size",
    "abbr": "",
    "def": "차이를 산포 단위로 잰 값. 평균 비교에서는 \\(d = \\delta/\\sigma\\)(코헨의 d).",
    "chapters": [
     "hypothesis#power"
    ]
   },
   {
    "ko": "효과 희소성 원리",
    "en": "sparsity of effects principle",
    "abbr": "",
    "def": "많은 효과 가운데 실제로 큰 것은 주효과와 저차 교호 작용 몇 개뿐이라는 경험적 원리.",
    "chapters": [
     "anova-doe#factorial"
    ]
   },
   {
    "ko": "흡수 상태",
    "en": "absorbing state",
    "abbr": "",
    "def": "한번 들어가면 떠나지 않는 상태(\\(p_{jj} = 1\\)).",
    "chapters": [
     "stochastic#absorbing"
    ]
   },
   {
    "ko": "히스토그램",
    "en": "histogram",
    "abbr": "",
    "def": "도수 분포표를 서로 붙은 막대로 그린 그림. 밀도 척도로 그리면 막대 넓이의 합이 1이다.",
    "chapters": [
     "descriptive#frequency"
    ]
   }
  ]
 }
});

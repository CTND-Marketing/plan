# Charlla 통계 대시보드

분기별로 콘텐츠 성과와 비즈니스 데이터를 함께 보는 대시보드입니다.

## 📁 폴더 구조

```
plan/charlla_mktg_report/
├── index.html              ← UI 마크업
├── css/
│   └── styles.css          ← 스타일시트
├── js/
│   ├── app.js              ← 콘텐츠 페이지 로직
│   ├── business.js         ← 비즈니스 페이지 로직 (신규)
│   └── data/
│       ├── loader.js       ← 분기 데이터 로더
│       ├── _template.js    ← 새 분기 추가용 빈 템플릿
│       ├── 2025-q1.js      ← 2025년 1분기 (도입기)
│       ├── 2025-q2.js      ← 2025년 2분기 (성장 시작)
│       ├── 2025-q3.js      ← 2025년 3분기 (본격 성장)
│       ├── 2025-q4.js      ← 2025년 4분기 (시즌 특수)
│       ├── 2026-q1.js      ← 2026년 1분기 (안정기)
│       └── 2026-q2.js      ← 2026년 2분기 (안정 성장)
└── README.md
```

## 🎯 분석 영역

### 📊 콘텐츠 분석 (위젯·영상 성과)
- **개요** — 핵심 KPI, 시청 흐름, TOP 5
- **디스플레이어** — 단일/연결 영상
- **위젯** — 플로팅, 슬라이드, 멀티 샵플레이어
- **로드 발생 도메인** — 자사몰 vs 외부 플랫폼
- **플랜·사용량**

### 💼 비즈니스 분석 (매출·광고·회원)
- **매출 · 수익** — 일자별 매출, 채널별, 위젯 기여, TOP 상품
- **광고 운영** — ROAS, 채널별 효율, 캠페인, 전환 퍼널
- **회원 · 전환** — 가입, 유료 전환, 코호트 잔존율
- **휴면 · 해지** — 휴면율, 해지율, 해지 사유
- **핵심 지표** — CAC, LTV, MRR, ARPU, 회수 기간

## 🚀 보기

```bash
# 로컬 서버 띄우기 (file:// 로는 분기 데이터 로드 불가)
cd plan/charlla_mktg_report
python3 -m http.server 8000
# 브라우저: http://localhost:8000
```

상단의 분기 셀렉터에서 분기를 선택하면 모든 차트와 표가 해당 분기 데이터로 자동 갱신됩니다.

## 🆕 새 분기 추가 방법

### 가장 쉬운 방법: Claude에게 raw 데이터 전달

1. 새 분기의 raw 데이터를 정리해서 Claude에게 전달:
   - 매출 데이터, 광고 운영 데이터
   - 위젯·영상 성과
   - 회원·해지 데이터
2. Claude가 분석 후 동일 포맷의 `js/data/YYYY-qN.js` 파일을 생성
3. `loader.js`의 PERIODS 배열 최상단에 새 항목 한 줄 추가
4. 끝 — 셀렉터에 자동 노출

### 직접 만드는 경우

1. `js/data/_template.js`를 복사해서 `2026-q3.js` 같은 이름으로 저장
2. 변수명을 `PERIOD_2026_Q3` 같이 변경
3. 각 필드를 채움
4. `loader.js`의 PERIODS 배열에 등록

## 📐 데이터 스키마

각 분기 파일(`PERIOD_YYYY_QN`)은 다음 구조를 따릅니다:

```javascript
{
  meta: { id, label, range, sampleStart, sampleEnd, dayLabels, phase },

  // 콘텐츠
  CONNECTED_FLOW_DATA: { ... },    // 연결 영상 페이지
  SINGLE_VIDEO_DATA: { ... },      // 단일 영상
  FLOATING_DATA: { ... },          // 플로팅 위젯
  SLIDE_VIDEO_DATA: { ... },       // 슬라이드 위젯 내 영상
  MULTI_VIDEO_DATA: { ... },       // 멀티 위젯 내 영상
  VIDEO_DETAIL_DATA: { ... },      // 영상 상세 페이지용
  WIDGET_DETAIL_DATA: { ... },     // 위젯 상세 페이지용

  // 비즈니스
  REVENUE: { total, dailyRevenue, byChannel, byWidget, topProducts },
  AD_OPERATION: { totalSpend, roas, byChannel, campaigns, funnel },
  MEMBERSHIP: { totalActive, funnel, dailySignups, cohort },
  CHURN: { dormantRate, churnRate, dailyChurn, reasons },
  KEY_METRICS: { cac, ltv, ltvCacRatio, mrr, arpu }
}
```

자세한 내용은 `js/data/_template.js` 참고.

## 🔧 동작 원리

1. `index.html` 로드 → `loader.js` 실행
2. `loader.js`가 PERIODS 배열의 첫 항목 데이터 파일 동적 로드
3. 해당 분기 객체가 `window.PERIOD_DATA`로 할당됨
4. `app.js`와 `business.js`는 `PERIOD_DATA.XXX`를 참조해서 차트·표 렌더링
5. 셀렉터 변경 → 새 분기 데이터 로드 → `PERIOD_DATA` 교체 → 자동 갱신

## ⚠️ 주의사항

- `file://` 프로토콜로 열면 분기 데이터 동적 로드가 CORS로 막힙니다. 로컬 서버 필수.
- ID 값(`v1`, `sv1`, `linen` 등)은 분기별로 일관되게 유지하세요. 같은 영상이 분기별로 다른 ID면 추적 불가.
- 깃허브 페이지 배포 시 정상 작동.

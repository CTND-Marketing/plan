// ============================================================
// 차랄라 통계 대시보드 - 분기 데이터 스키마
// ============================================================
// 모든 분기 데이터 파일(2025-q1.js, 2026-q1.js 등)은
// 이 구조를 따라야 합니다.
//
// 새 분기 데이터를 만들 때:
//   1. _template.js 를 복사
//   2. 변수명을 PERIOD_YYYY_QN 형식으로 변경
//   3. raw 데이터를 분석해서 각 필드 채우기
//   4. loader.js의 PERIODS 배열에 추가
// ============================================================

window.PERIOD_TEMPLATE = {
  // ===== 메타 정보 =====
  meta: {
    id: 'YYYY-qN',
    label: 'YYYY년 N분기',
    range: 'YYYY.MM.DD - YYYY.MM.DD',
    sampleStart: 'YYYY.MM.DD',
    sampleEnd: 'YYYY.MM.DD',
    dayLabels: []
  },

  // ===== 콘텐츠 데이터 =====
  CONNECTED_FLOW_DATA: {},
  SINGLE_VIDEO_DATA: {},
  FLOATING_DATA: {},
  SLIDE_VIDEO_DATA: {},
  MULTI_VIDEO_DATA: {},
  VIDEO_DETAIL_DATA: {},
  WIDGET_DETAIL_DATA: {},

  // ===== 비즈니스 데이터 =====
  REVENUE: {
    total: 0, totalDelta: 0,
    widgetContribution: 0, widgetContributionPct: 0,
    dailyRevenue: [],
    byChannel: [],
    byWidget: [],
    topProducts: []
  },
  AD_OPERATION: {
    totalSpend: 0, totalSpendDelta: 0, roas: 0, cpc: 0, cpa: 0,
    dailySpend: [], dailyRoas: [],
    byChannel: [],
    campaigns: [],
    funnel: { impression: 0, click: 0, widgetView: 0, bannerClick: 0, purchase: 0 }
  },
  MEMBERSHIP: {
    totalActive: 0, activeDelta: 0,
    newSignups: 0, paidConversion: 0, paidConversionRate: 0,
    funnel: { visit: 0, signup: 0, firstPurchase: 0, repurchase: 0 },
    dailySignups: [],
    cohort: []
  },
  CHURN: {
    dormantCount: 0, dormantRate: 0,
    churnCount: 0, churnRate: 0, churnRateDelta: 0,
    dailyChurn: [],
    reasons: []
  },
  KEY_METRICS: {
    cac: 0, ltv: 0, ltvCacRatio: 0,
    mrr: 0, mrrDelta: 0, arpu: 0
  }
};

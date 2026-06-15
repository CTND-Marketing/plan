// ============================================================
// 분기 데이터 로더
// ============================================================
// 사용 가능한 분기 목록을 관리하고, 선택한 분기의 데이터 파일을
// 동적으로 불러옵니다. PERIOD_DATA 전역 변수를 갱신하면 app.js의
// 모든 함수가 자동으로 새 데이터를 참조합니다.
// ============================================================

// 사용 가능한 분기 목록
// 새 분기를 추가하려면:
//   1. 사용자가 raw 데이터를 Claude에게 전달
//   2. Claude가 동일 포맷의 js/data/YYYY-qN.js 파일 생성
//   3. 아래 PERIODS 배열에 항목 추가
//   4. 끝!
window.PERIODS = [
  { id: '2026-q2', label: '2026년 2분기', file: 'js/data/2026-q2.js', globalKey: 'PERIOD_2026_Q2' },
  { id: '2026-q1', label: '2026년 1분기', file: 'js/data/2026-q1.js', globalKey: 'PERIOD_2026_Q1' },
  { id: '2025-q4', label: '2025년 4분기', file: 'js/data/2025-q4.js', globalKey: 'PERIOD_2025_Q4' },
  { id: '2025-q3', label: '2025년 3분기', file: 'js/data/2025-q3.js', globalKey: 'PERIOD_2025_Q3' },
  { id: '2025-q2', label: '2025년 2분기', file: 'js/data/2025-q2.js', globalKey: 'PERIOD_2025_Q2' },
  { id: '2025-q1', label: '2025년 1분기', file: 'js/data/2025-q1.js', globalKey: 'PERIOD_2025_Q1' },
];

// 현재 선택된 분기 ID
window.CURRENT_PERIOD_ID = null;

// 분기 데이터 로드 함수
function loadPeriod(periodId, onReady) {
  const period = window.PERIODS.find(p => p.id === periodId);
  if (!period) {
    console.error('Period not found:', periodId);
    return;
  }

  // 이미 로드된 경우 즉시 적용
  if (window[period.globalKey]) {
    applyPeriod(period);
    if (onReady) onReady();
    return;
  }

  // 동적으로 스크립트 로드
  const script = document.createElement('script');
  script.src = period.file;
  script.onload = () => {
    applyPeriod(period);
    if (onReady) onReady();
  };
  script.onerror = () => {
    console.error('Failed to load period data:', period.file);
  };
  document.head.appendChild(script);
}

function applyPeriod(period) {
  window.PERIOD_DATA = window[period.globalKey];
  window.CURRENT_PERIOD_ID = period.id;

  // 페이지 상단의 기간 표시 업데이트
  document.querySelectorAll('.date-control').forEach(el => {
    el.innerHTML = `
      <svg class="ic" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
      ${period.label} (${window.PERIOD_DATA.meta.sampleStart} - ${window.PERIOD_DATA.meta.sampleEnd})
    `;
  });

  // 셀렉터 값 동기화
  const sel = document.getElementById('periodSelector');
  if (sel) sel.value = period.id;

  // 활성 페이지 새로고침 (개요 또는 현재 보고 있는 페이지)
  const activePage = document.querySelector('.page.active');
  if (activePage && window.refreshActivePage) {
    window.refreshActivePage(activePage.dataset.page);
  }

  // 비즈니스 페이지가 활성 상태면 갱신
  if (window.refreshBusinessIfActive) {
    window.refreshBusinessIfActive();
  }
}

// 셀렉터 채우기 + 초기 분기 로드
function initPeriodSelector() {
  const sel = document.getElementById('periodSelector');
  if (sel && window.PERIODS.length > 0) {
    sel.innerHTML = window.PERIODS
      .map(p => `<option value="${p.id}">${p.label}</option>`)
      .join('');
    sel.value = window.PERIODS[0].id;
    sel.addEventListener('change', e => loadPeriod(e.target.value));
  }
  // 첫 번째 분기 자동 로드
  if (window.PERIODS.length > 0) {
    loadPeriod(window.PERIODS[0].id);
  }
}

// DOM 준비되면 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPeriodSelector);
} else {
  initPeriodSelector();
}

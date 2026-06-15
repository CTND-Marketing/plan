// ============================================================
// 비즈니스 분석 페이지 렌더링
// ============================================================
// 5개 비즈니스 페이지(매출/광고/회원/해지/핵심지표) 렌더링
// PERIOD_DATA의 REVENUE, AD_OPERATION, MEMBERSHIP, CHURN, KEY_METRICS 사용
// ============================================================

// 숫자 포맷 헬퍼
function fmtKRW(n) {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + '억';
  if (n >= 10000) return (n / 10000).toFixed(0) + '만';
  return n.toLocaleString();
}
function fmtNum(n) { return (n || 0).toLocaleString(); }
function fmtDelta(d) {
  if (d == null) return '';
  const sign = d > 0 ? '+' : '';
  const cls = d > 0 ? 'up' : d < 0 ? 'down' : 'neutral';
  return `<div class="kpi-delta ${cls}">${sign}${d}% 전 분기 대비</div>`;
}

// 차트 인스턴스 저장
let bizCharts = {};
function destroyChart(id) {
  if (bizCharts[id]) { bizCharts[id].destroy(); delete bizCharts[id]; }
}

// ============ 매출 · 수익 ============
function renderBizRevenue() {
  const d = window.PERIOD_DATA && window.PERIOD_DATA.REVENUE;
  if (!d) return;

  const subEl = document.getElementById('bizRevSub');
  if (subEl) subEl.textContent = `${window.PERIOD_DATA.meta.label} · ${window.PERIOD_DATA.meta.range}`;

  document.getElementById('bizRevenueKpi').innerHTML = `
    <div class="kpi"><div class="kpi-label">총 매출</div><div class="kpi-value">${fmtKRW(d.total)}<span class="unit">원</span></div>${fmtDelta(d.totalDelta)}</div>
    <div class="kpi"><div class="kpi-label">위젯 기여 매출</div><div class="kpi-value" style="color: var(--success-text);">${fmtKRW(d.widgetContribution)}<span class="unit">원</span></div><div class="kpi-delta neutral">전체의 ${d.widgetContributionPct}%</div></div>
    <div class="kpi"><div class="kpi-label">주문 채널</div><div class="kpi-value">${d.byChannel.length}<span class="unit">개</span></div></div>
    <div class="kpi"><div class="kpi-label">상위 위젯 매출</div><div class="kpi-value">${fmtKRW(d.byWidget[0] ? d.byWidget[0].revenue : 0)}<span class="unit">원</span></div><div class="kpi-delta neutral">${d.byWidget[0] ? d.byWidget[0].name : ''}</div></div>
  `;

  // 채널별 매출
  document.getElementById('bizRevenueByChannel').innerHTML = d.byChannel.map(c => `
    <div class="domain-bar-row">
      <div class="domain-bar-name">
        <span style="font-size: 13px; font-weight: 500;">${c.channel}</span>
        <span style="color: var(--text-mute); font-size: 12px;">${fmtKRW(c.revenue)}원</span>
      </div>
      <div class="domain-progress"><div class="domain-progress-fill" style="width: ${c.pct}%; background: var(--brand);"></div></div>
      <div class="domain-bar-pct">${c.pct}%</div>
    </div>
  `).join('');

  // 위젯별 매출 TOP 5
  document.getElementById('bizRevenueByWidget').innerHTML = d.byWidget.slice(0, 5).map((w, i) => `
    <div style="display: grid; grid-template-columns: 28px 1fr 100px 80px; align-items: center; gap: 12px; padding: 10px 8px; border-bottom: 1px solid var(--border);">
      <div style="font-size: 13px; color: var(--text-mute); font-weight: 600;">#${i + 1}</div>
      <div style="font-size: 14px; font-weight: 500;">${w.name}</div>
      <div style="text-align: right; font-weight: 600;">${fmtKRW(w.revenue)}원</div>
      <div style="text-align: right; color: var(--text-sub); font-size: 13px;">${fmtNum(w.orders)} 건</div>
    </div>
  `).join('');

  // TOP 상품 표
  document.getElementById('bizRevenueTopProducts').innerHTML = d.topProducts.map(p => `
    <tr><td style="color: var(--text-mute); font-weight: 600;">${p.rank}</td><td>${p.name}</td><td>${fmtKRW(p.revenue)}원</td><td>${fmtNum(p.units)}</td></tr>
  `).join('');

  // 일자별 차트
  setTimeout(() => {
    const ctx = document.getElementById('bizRevenueDailyChart');
    if (!ctx) return;
    destroyChart('bizRevenueDaily');
    const labels = window.PERIOD_DATA.meta.dayLabels;
    bizCharts['bizRevenueDaily'] = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ data: d.dailyRevenue, borderColor: '#FF6B35', backgroundColor: 'rgba(255,107,53,0.1)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmtKRW(ctx.parsed.y) + '원' } } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => fmtKRW(v) } } } }
    });
  }, 50);
}

// ============ 광고 운영 ============
function renderBizAds() {
  const d = window.PERIOD_DATA && window.PERIOD_DATA.AD_OPERATION;
  const rev = window.PERIOD_DATA && window.PERIOD_DATA.REVENUE;
  if (!d) return;

  document.getElementById('bizAdsKpi').innerHTML = `
    <div class="kpi"><div class="kpi-label">총 광고비</div><div class="kpi-value">${fmtKRW(d.totalSpend)}<span class="unit">원</span></div>${fmtDelta(d.totalSpendDelta)}</div>
    <div class="kpi" style="background: var(--success-soft); border-color: #B8E0CD;"><div class="kpi-label" style="color: var(--success-text);">ROAS</div><div class="kpi-value" style="color: var(--success-text);">${d.roas}<span class="unit" style="color: var(--success-text); opacity: 0.7;">x</span></div><div class="kpi-delta neutral">투자 1원당 ${d.roas}원 매출</div></div>
    <div class="kpi"><div class="kpi-label">평균 CPC</div><div class="kpi-value">${fmtNum(d.cpc)}<span class="unit">원</span></div></div>
    <div class="kpi"><div class="kpi-label">평균 CPA</div><div class="kpi-value">${fmtKRW(d.cpa)}<span class="unit">원</span></div></div>
  `;

  // 채널별 표
  document.getElementById('bizAdsByChannel').innerHTML = d.byChannel.map(c => `
    <tr>
      <td>${c.channel}</td>
      <td>${fmtKRW(c.spend)}원</td>
      <td>${fmtNum(c.impressions)}</td>
      <td>${fmtNum(c.clicks)}</td>
      <td>${fmtNum(c.cpc)}원</td>
      <td>${fmtNum(c.conversions)}</td>
      <td>${fmtNum(c.cpa)}원</td>
      <td>${fmtKRW(c.revenue)}원</td>
      <td style="color: var(--success-text); font-weight: 600;">${c.roas}x</td>
    </tr>
  `).join('');

  // 캠페인별
  document.getElementById('bizAdsCampaigns').innerHTML = d.campaigns.map(c => `
    <tr>
      <td>${c.name}</td>
      <td><span class="pill gray" style="font-size: 11px;">${c.channel}</span></td>
      <td>${fmtKRW(c.spend)}원</td>
      <td>${fmtNum(c.conversions)}</td>
      <td style="color: var(--success-text); font-weight: 600;">${c.roas}x</td>
    </tr>
  `).join('');

  // 퍼널
  const f = d.funnel;
  const max = f.impression;
  const stages = [
    { label: '광고 노출',    value: f.impression },
    { label: '광고 클릭',    value: f.click },
    { label: '위젯 시청',    value: f.widgetView },
    { label: '배너 클릭',    value: f.bannerClick },
    { label: '구매 전환',    value: f.purchase },
  ];
  document.getElementById('bizAdsFunnel').innerHTML = stages.map((s, i) => {
    const pct = (s.value / max * 100).toFixed(1);
    const prev = i > 0 ? stages[i - 1].value : null;
    const dropPct = prev ? ((1 - s.value / prev) * 100).toFixed(1) : null;
    return `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <div style="font-size: 13px; font-weight: 500;">${s.label}</div>
          <div style="font-size: 13px;">
            <span style="font-weight: 700;">${fmtNum(s.value)}</span>
            <span style="color: var(--text-mute);"> · ${pct}%</span>
            ${dropPct ? `<span style="color: var(--danger-text); margin-left: 8px;">▼ ${dropPct}%</span>` : ''}
          </div>
        </div>
        <div class="plan-progress"><div class="plan-progress-fill" style="width: ${pct}%; background: ${i === stages.length - 1 ? 'var(--success)' : 'var(--brand)'};"></div></div>
      </div>
    `;
  }).join('');

  // 일자별 차트 (광고비 + ROAS 이중축)
  setTimeout(() => {
    const ctx = document.getElementById('bizAdsDailyChart');
    if (!ctx) return;
    destroyChart('bizAdsDaily');
    const labels = window.PERIOD_DATA.meta.dayLabels;
    bizCharts['bizAdsDaily'] = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [
        { label: '광고비', data: d.dailySpend, borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.08)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0, yAxisID: 'y' },
        { label: 'ROAS', data: d.dailyRoas, borderColor: '#1D9E75', borderDash: [4,3], tension: 0.3, fill: false, borderWidth: 2, pointRadius: 0, yAxisID: 'y1' }
      ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top', labels: { font: { size: 12 } } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } },
          y: { position: 'left', grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => fmtKRW(v) } },
          y1: { position: 'right', grid: { display: false }, ticks: { font: { size: 11 }, color: '#1D9E75', callback: v => v + 'x' } }
        }
      }
    });
  }, 50);
}

// ============ 회원 · 전환 ============
function renderBizMembership() {
  const d = window.PERIOD_DATA && window.PERIOD_DATA.MEMBERSHIP;
  if (!d) return;

  document.getElementById('bizMembershipKpi').innerHTML = `
    <div class="kpi"><div class="kpi-label">활성 회원</div><div class="kpi-value">${fmtNum(d.totalActive)}<span class="unit">명</span></div>${fmtDelta(d.activeDelta)}</div>
    <div class="kpi"><div class="kpi-label">신규 가입</div><div class="kpi-value">${fmtNum(d.newSignups)}<span class="unit">명</span></div></div>
    <div class="kpi" style="background: var(--success-soft); border-color: #B8E0CD;"><div class="kpi-label" style="color: var(--success-text);">유료 전환율</div><div class="kpi-value" style="color: var(--success-text);">${d.paidConversionRate}<span class="unit" style="color: var(--success-text); opacity: 0.7;">%</span></div></div>
    <div class="kpi"><div class="kpi-label">유료 전환자</div><div class="kpi-value">${fmtNum(d.paidConversion)}<span class="unit">명</span></div></div>
  `;

  // 퍼널
  const f = d.funnel;
  const stages = [
    { label: '방문',      value: f.visit, color: 'var(--accent-purple)' },
    { label: '회원 가입',  value: f.signup, color: 'var(--brand)' },
    { label: '첫 구매',    value: f.firstPurchase, color: 'var(--success)' },
    { label: '재구매',     value: f.repurchase, color: '#1D9E75' },
  ];
  const maxVal = f.visit;
  document.getElementById('bizMembershipFunnel').innerHTML = stages.map((s, i) => {
    const pct = (s.value / maxVal * 100).toFixed(1);
    const prev = i > 0 ? stages[i - 1].value : null;
    const dropPct = prev ? ((1 - s.value / prev) * 100).toFixed(1) : null;
    return `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <div style="font-size: 13px; font-weight: 500;">${s.label}</div>
          <div style="font-size: 13px;">
            <span style="font-weight: 700;">${fmtNum(s.value)}</span>
            <span style="color: var(--text-mute);"> · ${pct}%</span>
            ${dropPct ? `<span style="color: var(--danger-text); margin-left: 8px;">▼ ${dropPct}%</span>` : ''}
          </div>
        </div>
        <div class="plan-progress"><div class="plan-progress-fill" style="width: ${pct}%; background: ${s.color};"></div></div>
      </div>
    `;
  }).join('');

  // 코호트 표
  document.getElementById('bizCohortTable').innerHTML = d.cohort.map(c => `
    <tr>
      <td style="font-weight: 600;">${c.cohort}</td>
      <td>${c.m0}%</td>
      <td>${c.m1 != null ? c.m1 + '%' : '-'}</td>
      <td>${c.m2 != null ? c.m2 + '%' : '-'}</td>
      <td>${c.m3 != null ? c.m3 + '%' : '-'}</td>
    </tr>
  `).join('');

  // 일자별 가입
  setTimeout(() => {
    const ctx = document.getElementById('bizSignupChart');
    if (!ctx) return;
    destroyChart('bizSignup');
    const labels = window.PERIOD_DATA.meta.dayLabels;
    bizCharts['bizSignup'] = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ data: d.dailySignups, backgroundColor: '#534AB7', borderRadius: 4 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92' } } } }
    });
  }, 50);
}

// ============ 휴면 · 해지 ============
function renderBizChurn() {
  const d = window.PERIOD_DATA && window.PERIOD_DATA.CHURN;
  if (!d) return;

  document.getElementById('bizChurnKpi').innerHTML = `
    <div class="kpi"><div class="kpi-label">휴면 회원</div><div class="kpi-value">${fmtNum(d.dormantCount)}<span class="unit">명</span></div><div class="kpi-delta neutral">활성의 ${d.dormantRate}%</div></div>
    <div class="kpi" style="background: ${d.churnRate > 2.5 ? 'var(--danger-soft)' : 'var(--surface)'}; border-color: ${d.churnRate > 2.5 ? '#F5C7C0' : 'var(--border)'};"><div class="kpi-label" style="${d.churnRate > 2.5 ? 'color: var(--danger-text);' : ''}">해지율</div><div class="kpi-value" style="${d.churnRate > 2.5 ? 'color: var(--danger-text);' : ''}">${d.churnRate}<span class="unit" style="${d.churnRate > 2.5 ? 'color: var(--danger-text); opacity: 0.7;' : ''}">%</span></div>${fmtDelta(d.churnRateDelta != null ? Number((d.churnRateDelta * 100).toFixed(0)) / 10 : null)}</div>
    <div class="kpi"><div class="kpi-label">해지 회원</div><div class="kpi-value">${fmtNum(d.churnCount)}<span class="unit">명</span></div></div>
    <div class="kpi"><div class="kpi-label">주요 해지 사유</div><div class="kpi-value" style="font-size: 16px; margin-top: 8px;">${d.reasons[0] ? d.reasons[0].reason : ''}</div><div class="kpi-delta neutral">${d.reasons[0] ? d.reasons[0].pct + '%' : ''}</div></div>
  `;

  // 해지 사유
  document.getElementById('bizChurnReasons').innerHTML = d.reasons.map(r => `
    <div class="domain-bar-row">
      <div class="domain-bar-name">
        <span style="font-size: 13px; font-weight: 500;">${r.reason}</span>
        <span style="color: var(--text-mute); font-size: 12px;">${fmtNum(r.count)}명</span>
      </div>
      <div class="domain-progress"><div class="domain-progress-fill" style="width: ${r.pct}%; background: var(--danger);"></div></div>
      <div class="domain-bar-pct">${r.pct}%</div>
    </div>
  `).join('');

  // 일자별 해지
  setTimeout(() => {
    const ctx = document.getElementById('bizChurnDailyChart');
    if (!ctx) return;
    destroyChart('bizChurnDaily');
    const labels = window.PERIOD_DATA.meta.dayLabels;
    bizCharts['bizChurnDaily'] = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ data: d.dailyChurn, borderColor: '#A32D2D', backgroundColor: 'rgba(163,45,45,0.1)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92' } } } }
    });
  }, 50);
}

// ============ 핵심 지표 ============
function renderBizMetrics() {
  const d = window.PERIOD_DATA && window.PERIOD_DATA.KEY_METRICS;
  if (!d) return;

  document.getElementById('bizMetricsKpiRow1').innerHTML = `
    <div class="kpi"><div class="kpi-label">CAC (고객 획득 비용)</div><div class="kpi-value">${fmtKRW(d.cac)}<span class="unit">원</span></div><div class="kpi-delta neutral">광고비 / 첫 구매 고객</div></div>
    <div class="kpi" style="background: var(--success-soft); border-color: #B8E0CD;"><div class="kpi-label" style="color: var(--success-text);">LTV (고객 생애 가치)</div><div class="kpi-value" style="color: var(--success-text);">${fmtKRW(d.ltv)}<span class="unit" style="color: var(--success-text); opacity: 0.7;">원</span></div></div>
    <div class="kpi"><div class="kpi-label">LTV / CAC</div><div class="kpi-value" style="${d.ltvCacRatio >= 3 ? 'color: var(--success-text);' : 'color: var(--danger-text);'}">${d.ltvCacRatio}<span class="unit">x</span></div><div class="kpi-delta neutral">${d.ltvCacRatio >= 3 ? '건강한 수준' : '개선 필요'}</div></div>
  `;

  document.getElementById('bizMetricsKpiRow2').innerHTML = `
    <div class="kpi"><div class="kpi-label">MRR (월 반복 매출)</div><div class="kpi-value">${fmtKRW(d.mrr)}<span class="unit">원</span></div>${fmtDelta(d.mrrDelta)}</div>
    <div class="kpi"><div class="kpi-label">ARPU (고객당 매출)</div><div class="kpi-value">${fmtKRW(d.arpu)}<span class="unit">원</span></div></div>
    <div class="kpi"><div class="kpi-label">예상 회수 기간</div><div class="kpi-value">${(d.cac / (d.arpu || 1)).toFixed(1)}<span class="unit">개월</span></div><div class="kpi-delta neutral">CAC ÷ ARPU</div></div>
  `;

  // 해석
  const interpretations = [];
  if (d.ltvCacRatio >= 3) {
    interpretations.push(`<div style="padding: 8px 12px; background: var(--success-soft); border-radius: 6px; margin-bottom: 8px;">✅ <strong>LTV/CAC ${d.ltvCacRatio}x</strong> — 고객 한 명에게 들이는 비용보다 ${d.ltvCacRatio}배 더 많이 벌고 있어요. SaaS 업계 기준 3x 이상이 건강합니다.</div>`);
  } else {
    interpretations.push(`<div style="padding: 8px 12px; background: var(--danger-soft); border-radius: 6px; margin-bottom: 8px;">⚠️ <strong>LTV/CAC ${d.ltvCacRatio}x</strong> — 3x 미만이라 광고 효율 개선이 시급합니다.</div>`);
  }
  const payback = (d.cac / (d.arpu || 1));
  if (payback <= 6) {
    interpretations.push(`<div style="padding: 8px 12px; background: var(--success-soft); border-radius: 6px; margin-bottom: 8px;">✅ <strong>회수 기간 ${payback.toFixed(1)}개월</strong> — 광고비 회수가 빠른 편입니다.</div>`);
  } else {
    interpretations.push(`<div style="padding: 8px 12px; background: var(--warning-soft); border-radius: 6px; margin-bottom: 8px;">⚠️ <strong>회수 기간 ${payback.toFixed(1)}개월</strong> — 6개월 이상 걸려서 현금흐름 부담이 있을 수 있어요.</div>`);
  }
  if (d.mrrDelta > 0) {
    interpretations.push(`<div style="padding: 8px 12px; background: var(--brand-soft); border-radius: 6px;">📈 <strong>MRR ${d.mrrDelta}% 성장</strong> — 반복 매출이 꾸준히 늘고 있어요.</div>`);
  }
  document.getElementById('bizMetricsInterpret').innerHTML = interpretations.join('');
}

// ============ 전체 디스패처 ============
function renderBusinessPage(pageId) {
  switch (pageId) {
    case 'biz-revenue':    renderBizRevenue();    break;
    case 'biz-ads':        renderBizAds();        break;
    case 'biz-membership': renderBizMembership(); break;
    case 'biz-churn':      renderBizChurn();      break;
    case 'biz-metrics':    renderBizMetrics();    break;
  }
}

// app.js의 페이지 변경에 hook
// (페이지 진입 시 자동 렌더링)
document.addEventListener('click', function(e) {
  const navItem = e.target.closest('.sub-nav-item[data-page]');
  if (!navItem) return;
  const pageId = navItem.dataset.page;
  if (pageId && pageId.startsWith('biz-')) {
    setTimeout(() => renderBusinessPage(pageId), 50);
  }
});

// PERIOD_DATA 로드 후 현재 활성 비즈니스 페이지가 있다면 자동 갱신
window.refreshBusinessIfActive = function() {
  const active = document.querySelector('.page.active');
  if (active && active.dataset.page && active.dataset.page.startsWith('biz-')) {
    renderBusinessPage(active.dataset.page);
  }
};

// ============================================================
// Charlla 통계 대시보드 - 메인 로직
// ============================================================
// 데이터는 PERIOD_DATA 전역 변수에서 동적으로 가져옵니다.
// 분기 전환 시 loader.js가 PERIOD_DATA를 교체합니다.
// ============================================================

// PERIOD_DATA에서 데이터를 끌어오는 getter
function getData(key) {
  return (window.PERIOD_DATA && window.PERIOD_DATA[key]) || {};
}

// 데이터 변수에 대한 동적 프록시 — 코드에서 그대로 CONNECTED_FLOW_DATA 등으로 참조 가능
Object.defineProperty(window, 'CONNECTED_FLOW_DATA', { get: () => getData('CONNECTED_FLOW_DATA') });
Object.defineProperty(window, 'SINGLE_VIDEO_DATA', { get: () => getData('SINGLE_VIDEO_DATA') });
Object.defineProperty(window, 'FLOATING_DATA', { get: () => getData('FLOATING_DATA') });
Object.defineProperty(window, 'SLIDE_VIDEO_DATA', { get: () => getData('SLIDE_VIDEO_DATA') });
Object.defineProperty(window, 'MULTI_VIDEO_DATA', { get: () => getData('MULTI_VIDEO_DATA') });
Object.defineProperty(window, 'VIDEO_DETAIL_DATA', { get: () => getData('VIDEO_DETAIL_DATA') });
Object.defineProperty(window, 'WIDGET_DETAIL_DATA', { get: () => getData('WIDGET_DETAIL_DATA') });

  function toggleAccordion(headEl) {
    const item = headEl.closest('.accordion-item');
    item.classList.toggle('open');
  }

  // ============ RENDER HELPERS ============
  function renderDomainBars(domain) {
    return domain.map(d => `
      <div class="domain-bar-row">
        <div class="domain-bar-name">
          <span class="pill ${d.external ? 'brand-orange' : 'success'}">${d.label}</span>
          <span style="font-family: monospace; font-size: 12px;">${d.name}</span>
          <span style="color: var(--text-mute); font-size: 12px;">${d.count}</span>
        </div>
        <div class="domain-progress"><div class="domain-progress-fill ${d.external ? 'external' : ''}" style="width: ${d.pct}%;"></div></div>
        <div class="domain-bar-pct">${d.pct}%</div>
      </div>
    `).join('');
  }

  function renderBannerRows(banners) {
    return banners.map((b, i) => `
      <div class="banner-row">
        <div class="banner-name">${i+1}. ${b.name}</div>
        <div class="banner-num">${b.clicks.toLocaleString()}</div>
        <div class="banner-num" style="color: var(--success-text);">${b.ctr}%</div>
        <div style="height: 6px; background: var(--bg); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: var(--success); border-radius: 3px; width: ${Math.min(100, b.ctr * 12)}%;"></div></div>
      </div>
    `).join('');
  }

  function selectRow(targetRow, containerSelector) {
    document.querySelectorAll(`${containerSelector} tr.clickable-row, ${containerSelector} .clickable-row`).forEach(r => r.classList.remove('selected'));
    if (targetRow) targetRow.classList.add('selected');
  }

  // ============ NAVIGATION HISTORY ============
  let pageHistory = ['overview'];
  function goBack() {
    if (pageHistory.length > 1) {
      pageHistory.pop();
      const prev = pageHistory[pageHistory.length - 1];
      goPageNoHistory(prev);
    } else {
      goPage('overview');
    }
  }

  // ============ VIDEO DETAIL PAGE ============
  // 일자별 데이터 생성 helper (5/1 ~ 5/19, 19일)
  function genDailyData(base, variance) {
    const result = [];
    for (let i = 0; i < 19; i++) {
      const v = base + Math.round((Math.sin(i * 0.7) * variance) + (Math.random() * variance * 0.4 - variance * 0.2));
      result.push(Math.max(0, v));
    }
    return result;
  }


  // ===== Domain bars + banner helpers =====
  function renderDomainBars(domain) {
    return domain.map(d => `
      <div class="domain-bar-row">
        <div class="domain-bar-name">
          <span class="pill ${d.external ? 'brand-orange' : 'success'}">${d.label}</span>
          <span style="font-family: monospace; font-size: 12px;">${d.name}</span>
          <span style="color: var(--text-mute); font-size: 12px;">${d.count}</span>
        </div>
        <div class="domain-progress"><div class="domain-progress-fill ${d.external ? 'external' : ''}" style="width: ${d.pct}%;"></div></div>
        <div class="domain-bar-pct">${d.pct}%</div>
      </div>
    `).join('');
  }

  // ===== Page navigation with history =====
  function goPageNoHistory(pageId) {
    document.querySelectorAll('.sub-nav-item').forEach(n => n.classList.remove('active', 'parent-active'));
    const navItem = document.querySelector(`.sub-nav-item[data-page="${pageId}"]`);
    if (navItem) navItem.classList.add('active');
    const widgetTypePages = ['widget-floating', 'widget-slide', 'widget-multi'];
    if (widgetTypePages.includes(pageId)) {
      const parent = document.querySelector('.sub-nav-item[data-page="widget-compare"]');
      if (parent) parent.classList.add('parent-active');
    }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.querySelector(`.page[data-page="${pageId}"]`);
    if (page) page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== Video Detail Page =====
  let videoChartLoad = null, videoChartPlay = null;
  function goVideoDetail(videoKey) {
    pageHistory.push('video-detail');
    const d = VIDEO_DETAIL_DATA[videoKey];
    if (!d) return;

    document.getElementById('videoDetailTitle').textContent = d.name;
    document.getElementById('videoDetailSub').textContent = `${d.type} · ${d.placement} · 2026.05.01 - 2026.05.19`;
    document.getElementById('videoDetailBreadcrumb').innerHTML =
      `통계 <span>›</span> <span class="crumb-link" onclick="goPage('displayer')">디스플레이어</span> <span>›</span> ${d.name}`;

    document.getElementById('videoDetailKpi').innerHTML = `
      <div class="kpi"><div class="kpi-label">누적 로드 수</div><div class="kpi-value">${d.load.toLocaleString()}</div></div>
      <div class="kpi"><div class="kpi-label">순수 재생 수</div><div class="kpi-value">${d.play.toLocaleString()}</div><div class="kpi-delta neutral">재생률 ${d.playRate}%</div></div>
      <div class="kpi"><div class="kpi-label">평균 시청 시간</div><div class="kpi-value">${d.avgTime}<span class="unit">초</span></div></div>
      <div class="kpi"><div class="kpi-label">발생 도메인</div><div class="kpi-value">${d.domain.length}<span class="unit">개</span></div><div class="kpi-delta neutral">자사 + 외부 ${d.domain.filter(x => x.external).length}개</div></div>
    `;

    document.getElementById('videoDomainList').innerHTML = renderDomainBars(d.domain);

    goPageNoHistory('video-detail');

    setTimeout(() => {
      const labels = ['5/1','5/2','5/3','5/4','5/5','5/6','5/7','5/8','5/9','5/10','5/11','5/12','5/13','5/14','5/15','5/16','5/17','5/18','5/19'];
      if (videoChartLoad) videoChartLoad.destroy();
      videoChartLoad = new Chart(document.getElementById('videoDailyLoadChart'), {
        type: 'line',
        data: { labels, datasets: [{ data: d.dailyLoad, borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.1)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92' } } } }
      });
      if (videoChartPlay) videoChartPlay.destroy();
      videoChartPlay = new Chart(document.getElementById('videoDailyPlayChart'), {
        type: 'line',
        data: { labels, datasets: [
          { label: '재생', data: d.dailyPlay, borderColor: '#1D9E75', backgroundColor: 'rgba(29,158,117,0.1)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0 }
        ]},
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92' } } } }
      });
    }, 80);
  }

  // ===== Connected Funnel: inline update with auto mode switching =====
  let pathChartInstance = null;
  function changeFunnelData(rowEl, key) {
    const d = CONNECTED_FLOW_DATA[key];
    if (!d) return;

    // 모든 선택 표시 해제
    document.querySelectorAll('section[data-page="displayer"] .top-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('section[data-page="displayer"] tr.clickable-row').forEach(r => r.classList.remove('selected'));

    // 선택 강조
    if (rowEl) {
      rowEl.classList.add('selected');
    } else {
      const targetCard = document.querySelector(`section[data-page="displayer"] .top-card[onclick*="'${key}'"]`);
      if (targetCard) targetCard.classList.add('selected');
    }

    // 셀렉터 동기화
    const selectEl = document.getElementById('funnelSelector');
    if (selectEl && selectEl.value !== key) selectEl.value = key;

    // 영상 개수에 따라 모드 자동 결정
    const count = d.steps.length;
    const pathFlow = document.getElementById('pathFlow');
    const chartWrap = document.getElementById('pathChartWrap');

    if (count <= 6) {
      // === 막대 모드 (3~6개) ===
      pathFlow.style.display = 'flex';
      pathFlow.style.gap = '10px';
      chartWrap.style.display = 'none';
      pathFlow.innerHTML = renderFunnelBars(d.steps, false);
    } else if (count <= 10) {
      // === 슬림 막대 모드 (7~10개) ===
      pathFlow.style.display = 'flex';
      pathFlow.style.gap = '4px';
      chartWrap.style.display = 'none';
      pathFlow.innerHTML = renderFunnelBars(d.steps, true);
    } else {
      // === 라인 차트 모드 (11개 이상) ===
      pathFlow.style.display = 'none';
      chartWrap.style.display = 'block';
      renderFunnelLineChart(d.steps);
    }

    // 경고 메시지
    document.getElementById('funnelAlert').querySelector('span').textContent = d.alert;

    // 카드와 그래프 둘 다 보이도록 스크롤
    const cardGrid = document.querySelector('section[data-page="displayer"] [data-subpage="d-connected"] .top-card-grid');
    if (cardGrid) {
      const rect = cardGrid.getBoundingClientRect();
      const offsetTop = window.pageYOffset + rect.top - 90;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  // 막대 렌더링 (5개 기본 색상 + 6개 이상 자동 생성)
  function renderFunnelBars(steps, slim) {
    // 보라 그라데이션 색상 자동 생성
    const baseColors = ['#534AB7', '#7F77DD', '#AFA9EC', '#CECBF6', '#EEEDFE'];
    let html = '';
    steps.forEach((s, i) => {
      // 색상 선택: 5개 이하는 기본, 그 이상은 비율 기반 그라데이션
      let color, txt;
      if (steps.length <= 5) {
        color = baseColors[Math.min(i, baseColors.length - 1)];
        txt = i <= 1 ? '#fff' : '#26215C';
      } else {
        // 진하기를 % 기반으로
        const intensity = Math.max(0.2, s.pct / 100);
        const r = Math.round(83 + (238 - 83) * (1 - intensity));
        const g = Math.round(74 + (237 - 74) * (1 - intensity));
        const b = Math.round(183 + (254 - 183) * (1 - intensity));
        color = `rgb(${r}, ${g}, ${b})`;
        txt = intensity > 0.55 ? '#fff' : '#26215C';
      }
      const showLabel = !slim || i === 0 || i === steps.length - 1 || s.down;
      if (i > 0) html += `<div class="path-arrow" style="${slim ? 'font-size: 12px; margin-bottom: 60px;' : ''}">→</div>`;
      html += `
        <div class="path-step" style="${slim ? 'min-width: 0;' : ''}">
          <div class="path-pct ${s.down ? 'down' : ''}" style="${slim ? 'font-size: 11px;' : ''}">${s.pct}%${s.down ? ' ▼' : ''}</div>
          <div class="path-step-bar" style="height: ${s.pct}%; background: ${color}; color: ${txt}; ${slim ? 'padding: 4px 2px; font-size: 10px;' : ''}">
            <span>${showLabel ? (s.label || '') + (slim ? '' : '<br/>') : ''}${!slim || showLabel ? `<strong>${s.count}</strong>` : ''}</span>
          </div>
          <div class="path-label" style="${slim ? 'font-size: 10px;' : ''}">${s.loc || s.label || ''}</div>
        </div>
      `;
    });
    return html;
  }

  // 라인 차트 렌더링 (11개 이상)
  function renderFunnelLineChart(steps) {
    const ctx = document.getElementById('pathChart');
    if (!ctx) return;
    if (pathChartInstance) pathChartInstance.destroy();

    const labels = steps.map(s => s.label);
    const data = steps.map(s => s.pct);
    const counts = steps.map(s => s.count);
    // 이탈 지점에 빨간 마커
    const pointColors = steps.map(s => s.down ? '#A32D2D' : '#534AB7');
    const pointSizes = steps.map(s => s.down ? 7 : 4);

    pathChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: '#534AB7',
          backgroundColor: 'rgba(83, 74, 183, 0.1)',
          tension: 0.3,
          fill: true,
          borderWidth: 2.5,
          pointRadius: pointSizes,
          pointBackgroundColor: pointColors,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 9
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                const i = ctx.dataIndex;
                return [`${steps[i].label}`, `시청률: ${data[i]}%`, `로드: ${counts[i]}`];
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 11 },
              color: '#9C9A92',
              maxRotation: 0,
              autoSkip: false,
              callback: function(val, idx) {
                // 영상 개수가 많으면 일부만 표시
                if (steps.length > 15) return idx % 2 === 0 ? '#' + (idx + 1) : '';
                return '#' + (idx + 1);
              }
            }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => v + '%' },
            min: 0,
            max: 100
          }
        }
      }
    });
  }

  // ===== Connected Detail Page =====
  let connectedDailyChart = null;
  function goConnectedDetail(key) {
    pageHistory.push('connected-detail');
    const d = CONNECTED_FLOW_DATA[key];
    if (!d) return;

    document.getElementById('connectedDetailTitle').textContent = d.name;
    document.getElementById('connectedDetailSub').textContent = `연결 영상 페이지 · 2026.05.01 - 2026.05.19`;
    document.getElementById('connectedDetailBreadcrumb').innerHTML =
      `통계 <span>›</span> <span class="crumb-link" onclick="goPage('displayer')">디스플레이어</span> <span>›</span> 연결 영상 <span>›</span> ${d.name}`;

    document.getElementById('connectedDetailKpi').innerHTML = `
      <div class="kpi"><div class="kpi-label">총 로드 수</div><div class="kpi-value">${d.totalLoad.toLocaleString()}</div></div>
      <div class="kpi"><div class="kpi-label">마지막까지 시청</div><div class="kpi-value ${d.lastPct >= 45 ? '' : ''}" style="${d.lastPct >= 45 ? 'color: var(--success-text);' : (d.lastPct < 30 ? 'color: var(--danger-text);' : '')}">${d.lastPct}<span class="unit">%</span></div></div>
      <div class="kpi"><div class="kpi-label">연결 영상</div><div class="kpi-value">${d.videos.length}<span class="unit">개</span></div></div>
      <div class="kpi"><div class="kpi-label">발생 도메인</div><div class="kpi-value">${d.domain.length}<span class="unit">개</span></div><div class="kpi-delta neutral">자사 + 외부 ${d.domain.filter(x => x.external).length}개</div></div>
    `;

    // 시청 경로 퍼널
    let pathHtml = '';
    d.steps.forEach((s, i) => {
      if (i > 0) pathHtml += '<div class="path-arrow">→</div>';
      pathHtml += `
        <div class="path-step">
          <div class="path-pct ${s.down ? 'down' : ''}">${s.pct}%${s.down ? ' ▼' : ''}</div>
          <div class="path-step-bar" style="height: ${s.pct}%; background: ${s.color}; color: ${s.txt};">
            <span>${s.label ? s.label + '<br/>' : ''}<strong>${s.count}</strong></span>
          </div>
          <div class="path-label">${s.loc}</div>
        </div>
      `;
    });
    document.getElementById('connectedDetailPath').innerHTML = pathHtml;
    document.getElementById('connectedDetailAlert').querySelector('span').textContent = d.alert;

    document.getElementById('connectedDomainList').innerHTML = renderDomainBars(d.domain);

    // 포함된 영상 리스트
    let videoListHtml = '';
    d.videos.forEach((v, i) => {
      videoListHtml += `
        <div onclick="goVideoDetailFromConnected('${v.id}')" style="display: grid; grid-template-columns: 28px 1fr 90px 20px; align-items: center; gap: 12px; padding: 11px 8px; border-bottom: 1px solid var(--border); cursor: pointer; border-radius: 4px; transition: background 0.12s;" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background=''">
          <div style="font-size: 13px; color: var(--text-mute); font-weight: 600;">#${i + 1}</div>
          <div>
            <div style="font-size: 14px; font-weight: 500;">${v.name}</div>
            <div style="font-size: 12px; color: var(--text-sub); margin-top: 2px;">${v.position}</div>
          </div>
          <div style="font-size: 14px; font-weight: 600; text-align: right;">${v.loads.toLocaleString()}</div>
          <svg class="ic" viewBox="0 0 24 24" style="color: var(--text-mute); width: 14px; height: 14px;"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      `;
    });
    document.getElementById('connectedVideoList').innerHTML = videoListHtml;

    goPageNoHistory('connected-detail');

    setTimeout(() => {
      const labels = ['5/1','5/2','5/3','5/4','5/5','5/6','5/7','5/8','5/9','5/10','5/11','5/12','5/13','5/14','5/15','5/16','5/17','5/18','5/19'];
      if (connectedDailyChart) connectedDailyChart.destroy();
      connectedDailyChart = new Chart(document.getElementById('connectedDailyChart'), {
        type: 'line',
        data: { labels, datasets: [{ data: d.dailyLoad, borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.1)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92' } } } }
      });
    }, 80);
  }

  // 연결 영상 페이지에서 개별 영상 클릭 시 — 영상 ID가 cv-* 형태라 임시로 v1으로 매핑
  function goVideoDetailFromConnected(videoId) {
    // 실제 환경에서는 videoId에 맞는 데이터 보유. 데모용: 가장 가까운 영상 데이터 사용
    const fallbackMap = {
      'cv-linen-1': 'v1', 'cv-linen-2': 'v1', 'cv-linen-3': 'v1', 'cv-linen-4': 'v1', 'cv-linen-5': 'v1',
      'cv-shoes-1': 'v2', 'cv-shoes-2': 'v2', 'cv-shoes-3': 'v2', 'cv-shoes-4': 'v2',
      'cv-denim-1': 'v3', 'cv-denim-2': 'v3', 'cv-denim-3': 'v3',
      'cv-outer-1': 'v4', 'cv-outer-2': 'v4', 'cv-outer-3': 'v4',
      'cv-acc-1': 'v5', 'cv-acc-2': 'v5', 'cv-acc-3': 'v5', 'cv-acc-4': 'v5'
    };
    goVideoDetail(fallbackMap[videoId] || 'v1');
  }

  // ===== Widget Detail Page =====
  let widgetChart = null;
  const widgetVideoCharts = {};
  function goWidgetDetail(widgetKey) {
    pageHistory.push('widget-detail');
    const d = WIDGET_DETAIL_DATA[widgetKey];
    if (!d) return;

    document.getElementById('widgetDetailTitle').textContent = d.name;
    document.getElementById('widgetDetailSub').textContent = `${d.type} · 생성 ${d.created} · 2026.05.01 - 2026.05.19`;
    document.getElementById('widgetDetailBreadcrumb').innerHTML =
      `통계 <span>›</span> 위젯 <span>›</span> <span class="crumb-link" onclick="goPage('${d.parentPage}')">${d.type}</span> <span>›</span> ${d.name}`;

    document.getElementById('widgetDetailKpi').innerHTML = `
      <div class="kpi"><div class="kpi-label">누적 로드</div><div class="kpi-value">${d.load.toLocaleString()}</div></div>
      <div class="kpi"><div class="kpi-label">배너 클릭</div><div class="kpi-value">${d.clicks.toLocaleString()}</div></div>
      <div class="kpi" style="background: var(--success-soft); border-color: #B8E0CD;"><div class="kpi-label" style="color: var(--success-text);">배너 CTR</div><div class="kpi-value" style="color: var(--success-text);">${d.ctr}<span class="unit" style="color: var(--success-text); opacity: 0.7;">%</span></div></div>
      <div class="kpi"><div class="kpi-label">참여 수</div><div class="kpi-value">${(d.engagement.likes + d.engagement.shares + d.engagement.saves).toLocaleString()}</div><div class="kpi-delta neutral">♡${d.engagement.likes} · ↗${d.engagement.shares} · ⭐${d.engagement.saves}</div></div>
    `;

    document.getElementById('widgetDomainList').innerHTML = renderDomainBars(d.domain);

    document.getElementById('widgetEngagement').innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
            <span style="color: var(--text-sub);">♡ 좋아요</span><span style="font-weight: 600;">${d.engagement.likes.toLocaleString()}</span>
          </div>
          <div class="plan-progress"><div class="plan-progress-fill" style="width: 100%; background: var(--brand);"></div></div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
            <span style="color: var(--text-sub);">↗ 공유</span><span style="font-weight: 600;">${d.engagement.shares.toLocaleString()}</span>
          </div>
          <div class="plan-progress"><div class="plan-progress-fill" style="width: ${(d.engagement.shares/d.engagement.likes*100).toFixed(0)}%; background: var(--accent-purple);"></div></div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
            <span style="color: var(--text-sub);">⭐ 저장</span><span style="font-weight: 600;">${d.engagement.saves.toLocaleString()}</span>
          </div>
          <div class="plan-progress"><div class="plan-progress-fill" style="width: ${(d.engagement.saves/d.engagement.likes*100).toFixed(0)}%; background: var(--success);"></div></div>
        </div>
      </div>
    `;

    // 영상별 아코디언
    let videosHtml = '';
    d.videos.forEach((v, idx) => {
      videosHtml += `
        <div class="accordion-item ${idx === 0 ? 'open' : ''}">
          <div class="accordion-head" onclick="toggleAccordion(this); renderVideoChart('${v.id}', ${JSON.stringify(v.dailyClicks)})">
            <div style="display: grid; grid-template-columns: 28px 1fr 90px 90px 90px 20px; align-items: center; gap: 12px; width: 100%;">
              <div style="font-size: 13px; color: var(--text-mute); font-weight: 600;">${idx + 1}</div>
              <div>
                <div style="font-size: 14.5px; font-weight: 600;">${v.name}</div>
                <div style="font-size: 12px; color: var(--text-sub); margin-top: 2px;">${v.banners ? v.banners.length + '개 배너' : '단일 배너'}</div>
              </div>
              <div style="font-size: 13px; text-align: right; color: var(--text-sub);">${v.totalClicks.toLocaleString()} 클릭</div>
              <div style="font-size: 14px; font-weight: 700; text-align: right; color: var(--success-text);">CTR ${v.ctr}%</div>
              <div></div>
              <svg class="ic accordion-chev" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div class="accordion-body">
            <div style="background: var(--bg); padding: 16px 20px; border-radius: 8px; margin-top: 12px;">
              <div style="font-size: 13px; color: var(--text-sub); margin-bottom: 12px;">일자별 배너 클릭 추이</div>
              <div style="position: relative; height: 180px; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 10px;">
                <canvas id="chart-${v.id}"></canvas>
              </div>
              ${v.banners ? `
                <div style="margin-top: 16px;">
                  <div style="font-size: 13px; color: var(--text-sub); margin-bottom: 10px;">배너(상품링크)별 성과</div>
                  ${v.banners.map((b, i) => `
                    <div class="banner-row">
                      <div class="banner-name">${i+1}. ${b.name}</div>
                      <div class="banner-num">${b.clicks.toLocaleString()}</div>
                      <div class="banner-num" style="color: var(--success-text);">${b.ctr}%</div>
                      <div style="height: 6px; background: var(--bg); border-radius: 3px; overflow: hidden;"><div style="height: 100%; background: var(--success); border-radius: 3px; width: ${Math.min(100, b.ctr * 12)}%;"></div></div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById('widgetVideoList').innerHTML = videosHtml;

    goPageNoHistory('widget-detail');

    setTimeout(() => {
      const labels = ['5/1','5/2','5/3','5/4','5/5','5/6','5/7','5/8','5/9','5/10','5/11','5/12','5/13','5/14','5/15','5/16','5/17','5/18','5/19'];
      if (widgetChart) widgetChart.destroy();
      const ctrSeries = d.dailyLoad.map((l, i) => (d.dailyClicks[i] / l * 100).toFixed(2));
      widgetChart = new Chart(document.getElementById('widgetDailyChart'), {
        type: 'line',
        data: { labels, datasets: [
          { label: '로드', data: d.dailyLoad, borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.08)', tension: 0.3, fill: true, borderWidth: 2.5, pointRadius: 0, yAxisID: 'y' },
          { label: '클릭', data: d.dailyClicks, borderColor: '#1D9E75', tension: 0.3, fill: false, borderWidth: 2.5, pointRadius: 0, yAxisID: 'y1' },
          { label: 'CTR(%)', data: ctrSeries, borderColor: '#BA7517', borderDash: [4,3], tension: 0.3, fill: false, borderWidth: 2, pointRadius: 0, yAxisID: 'y2' }
        ]},
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } },
            y: { position: 'left', grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => (v/1000)+'k' } },
            y1: { position: 'right', grid: { display: false }, ticks: { font: { size: 11 }, color: '#1D9E75' } },
            y2: { display: false }
          }
        }
      });

      // 첫 번째 영상 차트도 자동 렌더
      if (d.videos[0]) renderVideoChart(d.videos[0].id, d.videos[0].dailyClicks);
    }, 100);
  }

  function renderVideoChart(videoId, dailyClicks) {
    setTimeout(() => {
      const el = document.getElementById('chart-' + videoId);
      if (!el) return;
      if (widgetVideoCharts[videoId]) widgetVideoCharts[videoId].destroy();
      const labels = ['5/1','5/2','5/3','5/4','5/5','5/6','5/7','5/8','5/9','5/10','5/11','5/12','5/13','5/14','5/15','5/16','5/17','5/18','5/19'];
      widgetVideoCharts[videoId] = new Chart(el, {
        type: 'line',
        data: { labels, datasets: [{ data: dailyClicks, borderColor: '#1D9E75', backgroundColor: 'rgba(29,158,117,0.1)', tension: 0.3, fill: true, borderWidth: 2, pointRadius: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9C9A92', maxTicksLimit: 8 } }, y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 }, color: '#9C9A92' } } } }
      });
    }, 50);
  }

  // ============ WIDGET-ALL: Filter + Sort ============
  let currentFilter = 'all';
  function filterWidgetTable(pillEl, type) {
    currentFilter = type;
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pillEl.classList.add('active');
    applyFilterAndSort();
  }
  function sortWidgetTable() {
    applyFilterAndSort();
  }
  function applyFilterAndSort() {
    const tbody = document.getElementById('allWidgetTbody');
    if (!tbody) return;
    const sortBy = document.getElementById('widgetSort').value;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.forEach(r => {
      r.style.display = (currentFilter === 'all' || r.dataset.type === currentFilter) ? '' : 'none';
    });
    const visible = rows.filter(r => r.style.display !== 'none');
    visible.sort((a, b) => parseFloat(b.dataset[sortBy]) - parseFloat(a.dataset[sortBy]));
    visible.forEach((r, i) => {
      const rankCell = r.querySelector('.row-rank');
      if (rankCell) rankCell.textContent = (i + 1);
      tbody.appendChild(r);
    });
    document.getElementById('allWidgetCount').textContent = visible.length;
  }

  let compareMode = false;
  function toggleCompareMode() {
    compareMode = !compareMode;
    const indicator = document.getElementById('compareIndicator');
    const kpiNormal = document.getElementById('kpiNormal');
    const kpiCompare = document.getElementById('kpiCompare');
    const btn = document.getElementById('compareBtn');
    const trendNormal = document.getElementById('overviewTrend');
    const trendCompare = document.getElementById('overviewTrendCompare');
    const funnelNormal = document.getElementById('funnelNormal');
    const funnelCompare = document.getElementById('funnelCompare');

    if (compareMode) {
      indicator.style.display = 'flex';
      kpiNormal.style.display = 'none';
      kpiCompare.style.display = 'block';
      btn.textContent = '비교 해제';
      btn.style.borderStyle = 'solid';
      btn.style.color = 'var(--brand-text)';
      btn.style.background = 'var(--brand-soft)';
      if (trendNormal) trendNormal.parentElement.parentElement.style.display = 'none';
      if (trendCompare) trendCompare.parentElement.parentElement.style.display = 'block';
      if (funnelNormal) funnelNormal.style.display = 'none';
      if (funnelCompare) funnelCompare.style.display = 'block';
      // Chart resize fix - 숨겨진 canvas가 노출될 때 강제 리사이즈
      setTimeout(() => {
        if (window.Chart && trendCompare) {
          const inst = Chart.getChart(trendCompare);
          if (inst) { inst.resize(); inst.update(); }
        }
      }, 50);
    } else {
      indicator.style.display = 'none';
      kpiNormal.style.display = 'grid';
      kpiCompare.style.display = 'none';
      btn.textContent = '+ 비교일 추가';
      btn.style.borderStyle = '';
      btn.style.color = '';
      btn.style.background = '';
      if (trendNormal) trendNormal.parentElement.parentElement.style.display = 'block';
      if (trendCompare) trendCompare.parentElement.parentElement.style.display = 'none';
      if (funnelNormal) funnelNormal.style.display = 'block';
      if (funnelCompare) funnelCompare.style.display = 'none';
      setTimeout(() => {
        if (window.Chart && trendNormal) {
          const inst = Chart.getChart(trendNormal);
          if (inst) { inst.resize(); inst.update(); }
        }
      }, 50);
    }
  }

  function goPage(pageId) {
    if (pageHistory[pageHistory.length - 1] !== pageId) {
      pageHistory.push(pageId);
    }
    goPageNoHistory(pageId);
  }
  document.querySelectorAll('.sub-nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => goPage(item.dataset.page));
  });

  // 디스플레이어 단일/연결 탭
  document.querySelectorAll('.tab[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.page');
      parent.querySelectorAll('.tab[data-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      parent.querySelectorAll('.sub-page').forEach(sp => sp.classList.remove('active'));
      parent.querySelector(`.sub-page[data-subpage="${target}"]`).classList.add('active');
    });
  });

  // Widget type trend charts
  function makeWidgetTrendChart(canvasId, data, color) {
    const el = document.getElementById(canvasId);
    if (!el) return;
    new Chart(el, {
      type: 'line',
      data: {
        labels: ['5/1','5/3','5/5','5/7','5/9','5/11','5/13','5/15','5/17','5/19'],
        datasets: [{
          data: data, borderColor: color, backgroundColor: color+'15',
          tension: 0.35, fill: true, borderWidth: 2.5, pointRadius: 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => v+'%' }, min: 0, max: 8 }
        }
      }
    });
  }
  makeWidgetTrendChart('floatingTrendChart', [4.2,4.0,4.3,4.1,4.2,4.0,4.1,4.3,4.2,4.17], '#BA7517');
  makeWidgetTrendChart('slideTrendChart', [5.8,6.0,5.9,6.2,6.0,6.1,6.3,6.0,6.1,6.05], '#534AB7');
  makeWidgetTrendChart('multiTrendChart', [3.0,3.1,2.9,3.0,3.1,3.2,3.0,3.1,3.0,3.08], '#1D9E75');

  // 초기 시청 경로 렌더 (linen 5개)
  (function initFunnel() {
    const d = CONNECTED_FLOW_DATA.linen;
    const pathFlow = document.getElementById('pathFlow');
    if (pathFlow && d) {
      pathFlow.innerHTML = renderFunnelBars(d.steps, false);
    }
  })();

  // Overview trend chart
  const overviewTrendEl = document.getElementById('overviewTrend');
  if (overviewTrendEl) {
    new Chart(overviewTrendEl, {
      type: 'line',
      data: {
        labels: ['5/1','5/3','5/5','5/7','5/9','5/11','5/13','5/15','5/17','5/19'],
        datasets: [
          { label: '디스플레이어', data: [42000,45000,48000,52000,55000,58000,62000,65000,68000,72000], borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.08)', tension: 0.35, fill: true, borderWidth: 2, pointRadius: 0 },
          { label: '위젯', data: [18000,19500,21000,23000,24500,26000,28000,30000,32000,34000], borderColor: '#FF6B35', backgroundColor: 'rgba(255,107,53,0.08)', tension: 0.35, fill: true, borderWidth: 2, pointRadius: 0 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => (v/1000)+'k' } }
        }
      }
    });
  }

  // Overview Compare trend chart
  const overviewTrendCompareEl = document.getElementById('overviewTrendCompare');
  if (overviewTrendCompareEl) {
    new Chart(overviewTrendCompareEl, {
      type: 'line',
      data: {
        labels: ['1일','3일','5일','7일','9일','11일','13일','15일','17일','19일'],
        datasets: [
          { label: '기준 (5/1-19)', data: [60000,64500,69000,75000,79500,84000,90000,95000,100000,106000], borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.08)', tension: 0.35, fill: true, borderWidth: 2.5, pointRadius: 0 },
          { label: '비교 (4/1-19)', data: [52000,55000,59000,64000,68000,72000,77000,81000,85000,90000], borderColor: '#9C9A92', borderDash: [5,4], tension: 0.35, fill: false, borderWidth: 2, pointRadius: 0 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9C9A92' } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => (v/1000)+'k' } }
        }
      }
    });
  }

  // Plan Chart
  const days = Array.from({length: 31}, (_, i) => (i+1));
  const actual = [42,82,120,158,198,238,278,318,358,402,448,492,538,582];
  while (actual.length < 31) actual.push(null);
  const forecast = Array(31).fill(null);
  forecast[13] = 582;
  for (let i = 14; i < 31; i++) forecast[i] = Math.round(582 + (i-13) * 41.5);
  const limit = Array(31).fill(800);
  new Chart(document.getElementById('planChart'), {
    type: 'line',
    data: { labels: days, datasets: [
      { label: '실제', data: actual, borderColor: '#534AB7', backgroundColor: 'rgba(83,74,183,0.1)', tension: 0.2, fill: true, borderWidth: 2, pointRadius: 0 },
      { label: '예측', data: forecast, borderColor: '#BA7517', borderDash: [5,4], tension: 0.2, borderWidth: 2, pointRadius: 0, fill: false },
      { label: '한도', data: limit, borderColor: '#A32D2D', borderWidth: 1.5, pointRadius: 0, fill: false }
    ] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9C9A92', maxRotation: 0, autoSkip: true, maxTicksLimit: 10, callback: function(v, i) { return days[i]+'일'; } } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#9C9A92', callback: v => v+'K' }, max: 1500 }
      }
    }
  });
</script>

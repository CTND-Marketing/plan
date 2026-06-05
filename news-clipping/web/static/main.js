// ── 공통 유틸 ──────────────────────────────────────────
function showFeedback(msg, ok=true) {
  const el = document.getElementById('save-feedback');
  if (!el) return;
  el.textContent = msg;
  el.style.color = ok ? 'var(--accent2)' : 'var(--danger)';
  setTimeout(() => el.textContent = '', 2500);
}

async function post(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

// ── 전체 저장 ──────────────────────────────────────────
async function saveAll() {
  // 현재 페이지 감지 후 해당 저장 함수 호출
  if (typeof savePage === 'function') {
    await savePage();
    showFeedback('✓ 전체 저장됨');
  }
}

// ── 모니터링 실행 ──────────────────────────────────────
async function runMonitoring() {
  const modal = document.getElementById('run-modal');
  const progress = document.getElementById('run-progress');
  modal.style.display = 'flex';

  const res = await post('/api/run', {});
  if (!res.ok) {
    alert(res.msg);
    modal.style.display = 'none';
    return;
  }

  // 상태 폴링
  const poll = setInterval(async () => {
    const status = await fetch('/api/status').then(r => r.json());
    progress.textContent = status.progress;
    if (status.done) {
      clearInterval(poll);
      setTimeout(() => {
        modal.style.display = 'none';
        if (status.error) alert('오류: ' + status.error);
      }, 1500);
    }
  }, 1000);
}

// ── 라디오 옵션 ─────────────────────────────────────────
document.querySelectorAll('.radio-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const name = opt.querySelector('input[type=radio]').name;
    document.querySelectorAll(`.radio-option input[name="${name}"]`).forEach(r => {
      r.closest('.radio-option').classList.remove('selected');
    });
    opt.classList.add('selected');
    opt.querySelector('input[type=radio]').checked = true;
    if (typeof onChannelChange === 'function') onChannelChange();
  });
});

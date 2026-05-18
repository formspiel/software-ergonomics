const mql = window.matchMedia('(forced-colors: active)');

function updateStatus(e) {
  document.getElementById('hcm-status').textContent = e.matches ? 'yes' : 'no';
}

updateStatus(mql);
mql.addEventListener('change', updateStatus);

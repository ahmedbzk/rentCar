function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alertContainer');
  
  const iconMap = {
    success: '✔️',
    danger: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const icon = iconMap[type] || '';
  const alertEl = document.createElement('div');

  alertEl.className = `alert alert-${type} d-flex align-items-center alert-dismissible fade show mt-2`;
  alertEl.setAttribute('role', 'alert');
  alertEl.innerHTML = `
    <span class="me-2">${icon}</span>
    <div>${message}</div>
    <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  alertContainer.appendChild(alertEl);

  setTimeout(() => {
    alertEl.classList.remove('show');
    alertEl.classList.add('hide');
    setTimeout(() => alertEl.remove(), 300);
  }, 5000);
}

const loginForm = document.querySelector('#login-form');
const passwordInput = document.querySelector('#password');
const formMessage = document.querySelector('#form-message');
const requestDialog = document.querySelector('#request-dialog');

function showMessage(message) {
  formMessage.textContent = message;
}

function openRequestDialog() {
  if (typeof requestDialog.showModal === 'function') {
    requestDialog.showModal();
  } else {
    requestDialog.setAttribute('open', '');
  }
}

document.addEventListener('click', (event) => {
  const actionElement = event.target.closest('[data-action]');
  if (!actionElement) return;

  const { action } = actionElement.dataset;

  if (action === 'toggle-password') {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    actionElement.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  }

  if (action === 'request-seat') openRequestDialog();

  if (action === 'close-dialog') requestDialog.close();

  if (action === 'forgot-password') showMessage('Recovery instructions are ready for your verified email.');

  if (action === 'google-login') showMessage('Google Workspace connection is queued for this prototype.');

  if (action === 'load-demo') {
    document.querySelector('#email').value = 'alex.morgan@collective.net';
    passwordInput.value = 'sandbox-demo';
    showMessage('Sandbox Demo Mode loaded.');
  }
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!loginForm.checkValidity()) {
    showMessage('Enter a valid email and password to continue.');
    loginForm.reportValidity();
    return;
  }
  showMessage('Access request accepted. Workspace handoff is ready.');
});

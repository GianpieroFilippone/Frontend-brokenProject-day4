'use strict';

const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;

function handleSubmit(e: Event): void {
  e.preventDefault();

  const emailInput = document.getElementById('loginEmail') as HTMLInputElement | null;
  const passwordInput = document.getElementById('loginPassword') as HTMLInputElement | null;
  const errorBox = document.getElementById('loginError') as HTMLElement | null;

  if (!emailInput || !passwordInput || !errorBox) {
    return; 
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email === 'demo@liparibank.it' && password === 'demo1234') {
    window.location.href = 'dashboard.html';
  } else {
    errorBox.style.display = 'block';
  }
}


loginForm?.addEventListener('submit', handleSubmit);

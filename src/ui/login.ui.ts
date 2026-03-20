'use strict';

const loginForm = document.getElementById('loginForm') as HTMLFormElement;

function handleSubmit(e: Event): void {
  e.preventDefault();

  const emailInput    = document.getElementById('loginEmail')    as HTMLInputElement;
  const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;

  const email    = emailInput.value.trim();
  const password = passwordInput.value;

  if (email === 'demo@liparibank.it' && password === 'demo1234') {
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

loginForm.addEventListener('submit', handleSubmit);

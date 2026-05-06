// Password gate
(function () {
  const PASS = '__PORTFOLIO_PASS__';
  const KEY = 'portfolio_auth';

  if (sessionStorage.getItem(KEY) === '1') return;

  const style = document.createElement('style');
  style.textContent = `
    #pw-gate {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(246, 245, 246, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      transition: opacity 0.4s ease;
    }
    #pw-gate.fade-out { opacity: 0; pointer-events: none; }
    #pw-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 320px;
      padding: 0 24px;
    }
    #pw-label {
      font-family: 'Archivo', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #030f49;
      letter-spacing: -0.02em;
    }
    #pw-input {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid rgba(0,0,0,0.15);
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      color: #030f49;
      background: #fff;
      outline: none;
      text-align: center;
      letter-spacing: 0.1em;
      transition: border-color 0.2s;
    }
    #pw-input:focus { border-color: #030f49; }
    #pw-input.error {
      border-color: #e05555;
      animation: pw-shake 0.3s ease;
    }
    #pw-error { font-size: 13px; color: #e05555; min-height: 18px; }
    #pw-btn {
      width: 100%;
      padding: 12px;
      background: #030f49;
      color: #fff;
      border: none;
      border-radius: 100px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    #pw-btn:hover { opacity: 0.82; }
    @keyframes pw-shake {
      0%, 100% { transform: translateX(0); }
      25%       { transform: translateX(-6px); }
      75%       { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);

  const gate = document.createElement('div');
  gate.id = 'pw-gate';
  gate.innerHTML = `
    <div id="pw-box">
      <p id="pw-label">Enter password</p>
      <input id="pw-input" type="password" autocomplete="off" placeholder="••••••">
      <p id="pw-error"></p>
      <button id="pw-btn">Continue</button>
    </div>
  `;
  document.body.appendChild(gate);

  const input = document.getElementById('pw-input');
  const btn   = document.getElementById('pw-btn');
  const err   = document.getElementById('pw-error');

  function attempt() {
    if (input.value === PASS) {
      sessionStorage.setItem(KEY, '1');
      gate.classList.add('fade-out');
      setTimeout(() => gate.remove(), 400);
    } else {
      err.textContent = 'Incorrect password';
      input.classList.add('error');
      input.value = '';
      setTimeout(() => input.classList.remove('error'), 400);
    }
  }

  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
  input.focus();
})();

// Scroll reveal
const revealEls = document.querySelectorAll('.feature-card, .card, .writing-item, .project-card, .hero-text, .hero-image');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(3,15,73,0.08)'
    : 'none';
}, { passive: true });

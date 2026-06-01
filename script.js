// Password gate
(function () {
  const PASS = window.PORTFOLIO_PASS || '';
  const KEY = 'portfolio_auth';

  if (sessionStorage.getItem(KEY) === '1') return;

  const style = document.createElement('style');
  style.textContent = `
    #pw-gate {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(24, 20, 15, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', system-ui, sans-serif;
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
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      font-weight: 600;
      font-style: italic;
      color: #f0ebe3;
      letter-spacing: -0.01em;
    }
    #pw-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid rgba(240,235,227,0.12);
      border-radius: 2px;
      font-family: 'Outfit', system-ui, sans-serif;
      font-size: 15px;
      font-weight: 300;
      color: #f0ebe3;
      background: #221d17;
      outline: none;
      text-align: center;
      letter-spacing: 0.1em;
      transition: border-color 0.2s;
    }
    #pw-input:focus { border-color: #c9a84c; }
    #pw-input.error {
      border-color: #c0614a;
      animation: pw-shake 0.3s ease;
    }
    #pw-error { font-size: 12px; color: #c0614a; min-height: 18px; letter-spacing: 0.02em; }
    #pw-btn {
      width: 100%;
      padding: 12px;
      background: #c9a84c;
      color: #18140f;
      border: none;
      border-radius: 2px;
      font-family: 'Outfit', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    #pw-btn:hover { opacity: 0.85; }
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
      <input id="pw-input" type="password" autocomplete="current-password" placeholder="••••••">
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

// Typewriter animation on hero secondary line
(function () {
  const el = document.querySelector('.hero-title-line--secondary');
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  el.style.borderRight = '2px solid currentColor';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i === text.length) {
      clearInterval(interval);
      setTimeout(() => { el.style.borderRight = 'none'; }, 600);
    }
  }, 60);
})();

// Parallax on hero image
(function () {
  const heroImg = document.querySelector('.hero-image');
  if (!heroImg) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.25;
    heroImg.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
})();

// 3D tilt on cards
(function () {
  const cards = document.querySelectorAll('.card, .project-card, .feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

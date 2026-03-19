/* ===========================
   NEXA – Virtual Show Game
   Script – Interactions & Animations
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link, .btn-mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // ---- SCROLL REVEAL ----
  const revealElements = document.querySelectorAll(
    '.step-card, .exp-card, .audience-card, .benefit-item, .testimonial-card, .faq-item, .dif-item, .que-es-text, .callout-card, .callout-pills, .hero-stats, .social-proof-bar'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (Array.from(revealElements).indexOf(entry.target) % 4));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ---- TV TIMER COUNTDOWN ----
  const tvTimer = document.getElementById('tvTimer');
  if (tvTimer) {
    let seconds = 47;
    setInterval(() => {
      seconds--;
      if (seconds < 0) seconds = 59;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      tvTimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  }

  // ---- TV TEAM BARS ANIMATION ----
  const fillA = document.querySelector('.fill-a');
  const fillB = document.querySelector('.fill-b');

  if (fillA && fillB) {
    let scoreA = 72;
    let scoreB = 58;
    let direction = 1;

    setInterval(() => {
      scoreA = Math.max(40, Math.min(95, scoreA + (Math.random() - 0.4) * 5));
      scoreB = Math.max(35, Math.min(90, scoreB + (Math.random() - 0.45) * 5));
      fillA.style.width = scoreA + '%';
      fillB.style.width = scoreB + '%';

      const scoreAEl = document.querySelector('.team-a .team-score');
      const scoreBEl = document.querySelector('.team-b .team-score');
      if (scoreAEl) scoreAEl.textContent = Math.round(scoreA * 10) + ' pts';
      if (scoreBEl) scoreBEl.textContent = Math.round(scoreB * 10) + ' pts';
    }, 2500);
  }

  // ---- PARTICLES ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const colors = ['#00e5ff', '#ff00c8', '#7b2fff', '#ffe600', '#00ff88'];
    const count = 25;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 15;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 3}px ${color};
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ---- CURSOR GLOW ----
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- FORM SUBMIT ----
  const form = document.querySelector('.cta-form');
  if (form) {
    const submitBtn = form.querySelector('.btn-cta-main');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('.form-input');
        let valid = true;

        inputs.forEach(input => {
          if (input.type !== 'textarea' && input.value.trim() === '' && !input.disabled) {
            input.style.borderColor = 'rgba(255, 68, 68, 0.6)';
            input.style.boxShadow = '0 0 0 3px rgba(255, 68, 68, 0.1)';
            valid = false;
            setTimeout(() => {
              input.style.borderColor = '';
              input.style.boxShadow = '';
            }, 2000);
          }
        });

        if (valid) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span>✓ ¡Solicitud enviada! Te contactamos pronto.</span>';
          submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00b360)';
          submitBtn.disabled = true;

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            inputs.forEach(input => { input.value = ''; });
          }, 4000);
        }
      });
    }
  }

  // ---- BUTTON HOVER RIPPLE ----
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.6s linear;
        pointer-events: none;
      `;

      if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = '@keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }';
        document.head.appendChild(style);
      }

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--cyan)';
      }
    });
  });

  // ---- TV QUESTION CYCLING ----
  const questions = [
    { q: '¿En qué año llegó el hombre a la Luna?', a: 'A · 1969' },
    { q: '¿Cuántos países tiene la Unión Europea?', a: 'B · 27' },
    { q: '¿Cuál es el planeta más grande del sistema solar?', a: 'C · Júpiter' },
    { q: '¿Quién pintó la Mona Lisa?', a: 'A · Leonardo da Vinci' },
    { q: '¿En qué país se inventó el papel?', a: 'D · China' },
  ];

  const qText = document.querySelector('.q-text');
  const qLabel = document.querySelector('.q-label');
  const answers = document.querySelectorAll('.ans');

  if (qText && answers.length > 0) {
    let qIndex = 0;
    let qNum = 7;

    setInterval(() => {
      qIndex = (qIndex + 1) % questions.length;
      qNum = qNum < 10 ? qNum + 1 : 1;

      qText.style.opacity = '0';
      setTimeout(() => {
        qText.textContent = questions[qIndex].q;
        qLabel.textContent = `PREGUNTA ${qNum} / 10`;
        qText.style.opacity = '1';
        qText.style.transition = 'opacity 0.4s';

        answers.forEach(ans => {
          ans.classList.remove('ans-correct');
        });

        const correctLetter = questions[qIndex].a.charAt(0);
        answers.forEach(ans => {
          if (ans.textContent.startsWith(correctLetter)) {
            ans.classList.add('ans-correct');
          }
        });
      }, 300);
    }, 4000);
  }

});

// ---- FAQ TOGGLE (global function) ----
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    openItem.classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
  }
}

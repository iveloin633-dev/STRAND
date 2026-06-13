/* ===========================
   STRAND ENTERPRISES — app.js
   =========================== */

// ── Nav scroll effect ──────────────────────────────────────────────
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.07)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

// ── Smooth scroll for anchor links ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Contact form submission handler ───────────────────────────────
const form = document.querySelector('.contact-form');
const submitBtn = form ? form.querySelector('.form-submit') : null;

if (form && submitBtn) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFormSubmit();
  });

  // Also catch the button click directly (it's not inside a <form> tag in some builds)
  submitBtn.addEventListener('click', function (e) {
    handleFormSubmit();
  });

  function handleFormSubmit() {
    const name = form.querySelector('input[type="text"]')?.value?.trim();
    const email = form.querySelector('input[type="email"]')?.value?.trim();

    if (!name || !email) {
      submitBtn.textContent = 'Please fill in name & email';
      submitBtn.style.background = '#8A8278';
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
      }, 2500);
      return;
    }

    // Simulate send
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent ✓';
      submitBtn.style.background = '#4A7C59';
      form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');

      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 900);
  }
}

// ── Subtle fade-in on scroll (Intersection Observer) ──────────────
const fadeEls = document.querySelectorAll(
  '.work-card, .why-card, .process-step, .service-item, .hero-stat'
);

if ('IntersectionObserver' in window && fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`;
    observer.observe(el);
  });
}

// Hamburger-Menü Toggle
window.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-list');
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    if (expanded) {
      navList.classList.remove('show');
    } else {
      navList.classList.add('show');
    }
  });
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  if (typeof initializeSearch === 'function') {
    initializeSearch();
  }
});

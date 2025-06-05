// Hamburger-Menü Toggle
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-list');
  if (!hamburger || !navList) return;
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    if (expanded) {
      navList.classList.remove('show');
    } else {
      navList.classList.add('show');
    }
  });
}

function initSmoothScroll() {
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
}

window.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');
  Promise.all([
    fetch('header.html').then(r => r.text()),
    fetch('footer.html').then(r => r.text())
  ]).then(([headerHtml, footerHtml]) => {
    if (headerContainer) headerContainer.innerHTML = headerHtml;
    if (footerContainer) footerContainer.innerHTML = footerHtml;
    initNavigation();
    initSmoothScroll();
    document.dispatchEvent(new Event('headerLoaded'));
  });
});

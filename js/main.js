// Hamburger-Menü Toggle
async function loadLayout() {
  if (!document.querySelector('header.site-header')) {
    try {
      const header = await fetch('includes/header.html');
      const html = await header.text();
      document.body.insertAdjacentHTML('afterbegin', html);
    } catch (err) {
      console.error('Header konnte nicht geladen werden', err);
    }
  }

  if (!document.querySelector('footer')) {
    try {
      const footer = await fetch('includes/footer.html');
      const html = await footer.text();
      document.body.insertAdjacentHTML('beforeend', html);
    } catch (err) {
      console.error('Footer konnte nicht geladen werden', err);
    }
  }
}

function initInteractions() {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-list');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('show', !expanded);
    });
  }
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
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadLayout();
  initInteractions();
});

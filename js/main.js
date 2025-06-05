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

const headerHTML = `
<header>
    <nav aria-label="Hauptnavigation">
        <a href="index.html"><img class="logo" src="assets/logo-1.webp" alt="xugo test Logo" loading="eager"></a>
        <button class="hamburger" aria-controls="nav-list" aria-expanded="false">☰</button>
        <ul id="nav-list" class="nav-list">
            <li><a href="produkte.html">Produkte</a></li>
            <li><a href="partner.html">Partner</a></li>
            <li><a href="ueber-uns.html">Über uns</a></li>
            <li><a href="online-beratung.html">Online Beratung</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
        <div class="search-wrapper">
            <input type="text" id="site-search" placeholder="Seite durchsuchen…" role="combobox" aria-autocomplete="list" aria-owns="search-suggestions" aria-expanded="false">
            <ul id="search-suggestions" role="listbox" aria-expanded="false"></ul>
        </div>
    </nav>
</header>`;

const footerHTML = `
<footer>
    <ul class="quicklinks">
        <li><a href="produkte.html">Produkte</a></li>
        <li><a href="partner.html">Partner</a></li>
        <li><a href="ueber-uns.html">Über uns</a></li>
        <li><a href="online-beratung.html">Online Beratung</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="login.html">Login</a></li>
    </ul>
    <p>&copy; 2025 xugo test</p>
</footer>`;

window.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');
  if (headerContainer) headerContainer.innerHTML = headerHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;
  initNavigation();
  initSmoothScroll();
  document.dispatchEvent(new Event('headerLoaded'));
});

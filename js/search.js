// Suchfunktion
function initSearch() {
  const searchInput = document.getElementById('site-search');
  const suggestionBox = document.getElementById('search-suggestions');
  const elements = document.querySelectorAll('h1, h2, h3, p, li');
  const index = Array.from(elements).map((el, i) => {
    const id = el.id || 'section-' + i;
    if (!el.id) el.id = id;
    return { id, text: el.textContent.trim() };
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    suggestionBox.innerHTML = '';
    if (q.length === 0) {
      suggestionBox.setAttribute('aria-expanded', 'false');
      return;
    }
    const results = index.filter(item => item.text.toLowerCase().includes(q)).slice(0, 5);
    results.forEach(r => {
      const li = document.createElement('li');
      li.textContent = r.text.substring(0, 60);
      li.setAttribute('role', 'option');
      li.addEventListener('click', () => {
        document.getElementById(r.id).scrollIntoView({ behavior:'smooth' });
        searchInput.value = '';
        suggestionBox.innerHTML = '';
        suggestionBox.setAttribute('aria-expanded', 'false');
      });
      suggestionBox.appendChild(li);
    });
    if (results.length) suggestionBox.setAttribute('aria-expanded', 'true');
  });
}

document.addEventListener('headerLoaded', initSearch);

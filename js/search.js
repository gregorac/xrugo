// Suchfunktion über alle Seiten
async function buildSearchIndex() {
  const pages = [
    'index.html',
    'produkte.html',
    'partner.html',
    'ueber-uns.html',
    'online-beratung.html',
    'faq.html',
    'login.html'
  ];
  const parser = new DOMParser();
  const index = [];
  for (const page of pages) {
    try {
      const res = await fetch(page);
      const text = await res.text();
      const doc = parser.parseFromString(text, 'text/html');
      doc.querySelectorAll('[id]').forEach(el => {
        const content = el.textContent.trim();
        if (!content) return;
        const titleEl = el.querySelector('h1,h2,h3');
        const title = titleEl ? titleEl.textContent.trim() : content.substring(0, 60);
        index.push({
          id: el.id,
          title,
          text: content,
          url: page + '#' + el.id
        });
      });
    } catch (e) {
      console.error('Indexing failed for', page, e);
    }
  }
  return index;
}

async function initSearch() {
  const searchInput = document.getElementById('site-search');
  const suggestionBox = document.getElementById('search-suggestions');
  if (!searchInput || !suggestionBox) return;
  const pageIndex = await buildSearchIndex();
  let focusIndex = -1;

  function clearSuggestions() {
    suggestionBox.innerHTML = '';
    suggestionBox.setAttribute('aria-expanded', 'false');
    focusIndex = -1;
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    clearSuggestions();
    if (!q) return;
    const results = pageIndex.filter(item => item.text.toLowerCase().includes(q) || item.title.toLowerCase().includes(q)).slice(0, 10);
    results.forEach((r, idx) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.dataset.url = r.url;
      li.innerHTML = '<strong>' + r.title + '</strong> – ' + r.text.substring(0, 60);
      li.addEventListener('click', () => {
        window.location.href = r.url;
      });
      suggestionBox.appendChild(li);
    });
    if (results.length) suggestionBox.setAttribute('aria-expanded', 'true');
  });

  searchInput.addEventListener('keydown', e => {
    const items = suggestionBox.querySelectorAll('li');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusIndex = (focusIndex + 1) % items.length;
      items.forEach((el, i) => el.setAttribute('aria-selected', i === focusIndex));
      items[focusIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusIndex = (focusIndex - 1 + items.length) % items.length;
      items.forEach((el, i) => el.setAttribute('aria-selected', i === focusIndex));
      items[focusIndex].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusIndex >= 0) {
        window.location.href = items[focusIndex].dataset.url;
      }
    } else if (e.key === 'Escape') {
      clearSuggestions();
    }
  });
}

document.addEventListener('headerLoaded', initSearch);

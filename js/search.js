// Suchfunktion mit Seitennavigation
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('site-search');
  const suggestions = document.getElementById('search-suggestions');

  const pages = [
    { title: 'Startseite',       url: 'index.html',            keywords: 'flachform hubtische' },
    { title: 'Produkte',         url: 'produkte.html',         keywords: 'hubtisch modelle fe f-ce' },
    { title: 'Partner',          url: 'partner.html',          keywords: 'partnerfirmen' },
    { title: 'Über uns',         url: 'ueber-uns.html',        keywords: 'geschichte philosophie werte tirugo' },
    { title: 'Datenschutz',      url: 'datenschutz.html',     keywords: 'privacy policy' },
    { title: 'Online Beratung',  url: 'online-beratung.html',  keywords: 'online beratung' },
    { title: 'FAQ',              url: 'faq.html',              keywords: 'häufig gestellte fragen' },
    { title: 'Login',            url: 'login.html',            keywords: 'login portal' },
    { title: 'PETEC',            url: 'petec.html',           keywords: 'partner petec' },
    { title: 'FlexLift',         url: 'flexlift.html',        keywords: 'partner flexlift' },
    { title: 'Transort',         url: 'transort.html',        keywords: 'partner transort' }
  ];

  let selectedIndex = -1;

  function clearSuggestions() {
    suggestions.innerHTML = '';
    suggestions.setAttribute('aria-expanded', 'false');
    selectedIndex = -1;
  }

  function updateSelection(items) {
    items.forEach((el, i) => {
      el.setAttribute('aria-selected', i === selectedIndex ? 'true' : 'false');
    });
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      clearSuggestions();
      return;
    }

    const words = q.split(/\s+/).filter(Boolean);
    const results = pages.filter(p => {
      const haystack = `${p.title} ${p.keywords}`.toLowerCase();
      return words.every(w => haystack.includes(w));
    });

    suggestions.innerHTML = results
      .map(r => `<li role="option" data-url="${r.url}">${r.title}</li>`)
      .join('');

    suggestions.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        window.location.href = li.dataset.url;
        clearSuggestions();
      });
    });

    suggestions.setAttribute('aria-expanded', results.length > 0 ? 'true' : 'false');
  });

  searchInput.addEventListener('keydown', e => {
    const items = Array.from(suggestions.querySelectorAll('li'));
    if (!items.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelection(items);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          items[selectedIndex].click();
        }
        break;
      case 'Escape':
        clearSuggestions();
        break;
    }
  });

  document.addEventListener('click', e => {
    if (!suggestions.contains(e.target) && e.target !== searchInput) {
      clearSuggestions();
    }
  });
});

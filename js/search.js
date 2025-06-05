// search.js – Index-Aufbau, Vorschläge, Tastatursteuerung
function initializeSearch() {
  let pageIndex = [];
  document.querySelectorAll('h1, h2, h3, p, li').forEach((elem, idx) => {
    const section = elem.closest('section, main, article');
    const sectionId = section ? (section.id || `section-${idx}`) : `section-${idx}`;
    if (section && !section.id) section.id = sectionId;

    const title = elem.tagName.match(/^H[1-3]$/) ? elem.textContent.trim() : null;
    const text = elem.textContent.trim();
    const url = `${window.location.pathname}#${sectionId}`;
    pageIndex.push({ id: sectionId, title, text, url });
  });

  const searchInput = document.getElementById('site-search');
  const suggestions = document.getElementById('search-suggestions');
  let selectedIndex = -1;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length > 0) {
      const filtered = pageIndex.filter(item => {
        return (item.title && item.title.toLowerCase().includes(query)) ||
               item.text.toLowerCase().includes(query);
      });
      const top = filtered.slice(0, 10);

      let html = '';
      top.forEach(res => {
        let snippet = '';
        const idxTitle = res.title ? res.title.toLowerCase().indexOf(query) : -1;
        const idxText = res.text.toLowerCase().indexOf(query);
        if (idxTitle !== -1) {
          snippet = res.title.substring(Math.max(0, idxTitle - 30), idxTitle + 30) + '...';
        } else if (idxText !== -1) {
          const start = Math.max(0, idxText - 30);
          const end = Math.min(res.text.length, idxText + 30);
          snippet = '...' + res.text.substring(start, end) + '...';
        }
        html += `<li role="option" data-url="${res.url}"><strong>${res.title || res.id}</strong> – ${snippet}</li>`;
      });
      if (top.length === 0) {
        html = '<li role="option">Keine Ergebnisse gefunden</li>';
      }
      suggestions.innerHTML = html;
      suggestions.setAttribute('aria-expanded', 'true');
      suggestions.style.display = 'block';

      suggestions.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
          if (li.dataset.url) window.location.href = li.dataset.url;
          clearSuggestions();
        });
      });
    } else {
      clearSuggestions();
    }
  });

  searchInput.addEventListener('keydown', e => {
    const items = Array.from(suggestions.querySelectorAll('li'));
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

  function clearSuggestions() {
    suggestions.innerHTML = '';
    suggestions.setAttribute('aria-expanded', 'false');
    suggestions.style.display = 'none';
    selectedIndex = -1;
  }

  function updateSelection(items) {
    items.forEach((el, i) => {
      if (i === selectedIndex) {
        el.setAttribute('aria-selected', 'true');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.setAttribute('aria-selected', 'false');
      }
    });
  }
}

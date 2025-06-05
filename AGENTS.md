# AGENTS.md

## Kontext
Du bist ein KI-Agent (z. B. Codex), der aus einer einzigen, generellen Beschreibung eine vollständige Website generiert. Die Website muss folgende Eigenschaften erfüllen:
- **Semantisch korrektes, validiertes HTML/CSS/JavaScript**  
- **Responsives Design** (Desktop, Tablet, Smartphone)  
- **SEO-optimiert** (Meta-Tags, strukturierte Daten, Performance-Optimierungen)  
- **Barrierefrei (WCAG AA-konform)** (ARIA-Attribute, Fokus-Indikatoren, ausreichende Kontraste)  
- **Sicher** (keine XSS- oder Injection-Risiken, saubere Formularvalidierung)  
- **Volltextsuche im Header** aller Seiten in Echtzeit mit Vorschlägen  
- Eine **Datenschutzseite** (Privacy Policy) gemäß rechtlicher Vorgaben

Du erhältst nur allgemeine Vorgaben (Assets, Funktionen). Aus diesen generierst du automatisch:
1. Alle HTML-Dateien (eine pro logisch definierter Seite)
2. Externe CSS-Dateien (Reset, Basis-Styles, Responsive-Styles)
3. Externe JavaScript-Dateien (Interaktionen, Suche, Akkordeon, Hamburger, Formularvalidierung)
4. Eine universelle **Header-Komponente** mit Logo, Navigation und Suchfeld
5. Eine universelle **Footer-Komponente** mit Quicklinks und Kontaktinfos
6. Eine generische **Datenschutz-/Privacy-Policy-Seite**

Dieser AGENTS.md dient als single source of truth, welche Regeln und Vorgehensweisen du bei der Generierung einhalten musst.

---

## 1. Projektstruktur & Assets

1. **Ordnerstruktur** (nur zur Orientierung – Dateien nicht im Repository vorlegen)
   ```
   /project-root/
   ├── css/
   ├── js/
   ├── assets/
   ├── index.html
   ├── produkte.html
   ├── partner.html
   ├── ueber-uns.html
   ├── online-beratung.html
   ├── faq.html
   ├── login.html
   └── datenschutz.html
   ```
   - Alle Bilder liegen in `assets/` mit vorgegebenen Namen:  
     `header.webp`, `logo-1.webp`, `fc.webp`, `fce.webp`, `zitat_1.webp`, `empack_1.webp`.
   - `css/` enthält: `reset.css`, `styles.css`, `responsive.css`.
   - `js/` enthält: `main.js`, `search.js`, `carousel.js`.

2. **Namenskonventionen**  
   - HTML-, CSS-, JS-Dateien kleingeschrieben, Bindestriche statt Leerzeichen.  
   - Assets exakt mit gegebenen Namen referenzieren.  
   - Keine Inline-Styles, keine Inline-Skripte – alles extern.

---

## 2. Universelle Header-Komponente

Erstelle folgende HTML-Struktur für eine wiederverwendbare Header-Baugruppe, die in jede HTML-Datei eingebunden wird (z. B. via Template-System oder Server-Include):

```html
<header role="banner" class="site-header">
  <div class="container flex-between">
    <!-- Logo -->
    <a href="index.html" class="logo">
      <img src="assets/logo-1.webp"
           alt="Firmenlogo"
           loading="lazy">
    </a>

    <!-- Navigation -->
    <nav aria-label="Hauptnavigation">
      <ul class="nav-list" id="nav-list">
        <li><a href="produkte.html">Produkte</a></li>
        <li><a href="partner.html">Partner</a></li>
        <li><a href="ueber-uns.html">Über uns</a></li>
        <li><a href="online-beratung.html">Online Beratung</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>

    <!-- Suchfeld -->
    <div class="search-container" role="search">
      <input type="text"
             id="site-search"
             placeholder="Seite durchsuchen…"
             aria-label="Seite durchsuchen"
             role="combobox"
             aria-autocomplete="list"
             aria-owns="search-suggestions"
             aria-expanded="false"
             autocomplete="off">
      <ul id="search-suggestions"
          class="search-suggestions"
          role="listbox"
          aria-expanded="false"></ul>
    </div>

    <!-- Hamburger-Button (Mobile) -->
    <button class="hamburger"
            aria-label="Menü öffnen"
            aria-expanded="false"
            aria-controls="nav-list">
      <span class="hamburger-icon"></span>
    </button>
  </div>
</header>
```

**Accessibility & ARIA**  
- `role="banner"` kennzeichnet den Header.  
- `nav aria-label="Hauptnavigation"` zur eindeutigen Beschreibung.  
- Suchfeld: `role="combobox"`, `aria-autocomplete="list"`, `aria-owns="search-suggestions"`, `aria-expanded="false"`.  
- Vorschlagsliste: `<ul role="listbox">`, `<li role="option" aria-selected="false">`.  
- Hamburger-Button: `aria-controls="nav-list"`, `aria-expanded="false"`  

**CSS (styles.css)**  
```css
.site-header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-list {
  display: flex;
  gap: 30px;
}
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}
.hamburger-icon {
  width: 25px;
  height: 2px;
  background-color: #333333;
  position: relative;
}
.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  width: 25px;
  height: 2px;
  background-color: #333333;
  position: absolute;
  left: 0;
}
.hamburger-icon::before {
  top: -8px;
}
.hamburger-icon::after {
  top: 8px;
}

/* Suchfeld */
.search-container {
  position: relative;
}
#site-search {
  padding: 8px 12px;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  font-size: 1rem;
  width: 200px;
}
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  max-height: 300px;
  overflow-y: auto;
  display: none;
  z-index: 200;
}
.search-suggestions[aria-expanded="true"] {
  display: block;
}
.search-suggestions li {
  padding: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}
.search-suggestions li:hover,
.search-suggestions li[aria-selected="true"] {
  background-color: #F0F0F0;
}
```

**Responsive Verhalten (responsive.css)**  
```css
/* Tablet bis 1024px */
@media (max-width: 1024px) {
  #site-search {
    width: 150px;
  }
}

/* Mobil bis 768px */
@media (max-width: 768px) {
  .nav-list {
    display: none;
    flex-direction: column;
  }
  .hamburger {
    display: block;
  }
  .search-container {
    order: 1;
    width: 100%;
    margin-top: 10px;
  }
  #site-search {
    width: 100%;
    font-size: 0.875rem;
  }
}
```

**JavaScript-Logik (main.js)**  
```js
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger-Menü Toggle
  const hamburger = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-list');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', (!isOpen).toString());
      navList.style.display = isOpen ? 'none' : 'flex';
    });
  }

  // Smooth-Scroll für interne Links (außer href="#")
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.getAttribute('href') !== '#') {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // FAQ-Akkordeon-Logik (falls vorhanden)
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      const answerId = btn.getAttribute('aria-controls');
      const answerEl = document.getElementById(answerId);
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Schließe alle anderen
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('expanded');
        const q = item.querySelector('.faq-question');
        const aId = q.getAttribute('aria-controls');
        const a = document.getElementById(aId);
        q.setAttribute('aria-expanded', 'false');
        a.setAttribute('aria-hidden', 'true');
        a.style.maxHeight = '0';
      });

      // Öffne oder schließe aktuellen Eintrag
      if (!expanded) {
        parentItem.classList.add('expanded');
        btn.setAttribute('aria-expanded', 'true');
        answerEl.setAttribute('aria-hidden', 'false');
        answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
      }
    });
  });

  // Suchfunktion initialisieren, falls initializeSearch vorhanden
  if (typeof initializeSearch === 'function') {
    initializeSearch();
  }
});
```

---

## 3. Universelle Footer-Komponente

Erstelle eine wiederverwendbare Footer-Struktur:

```html
<footer role="contentinfo" class="site-footer">
  <div class="container footer-top flex-between wrap">
    <!-- Kontakt-Spalte -->
    <div class="footer-column">
      <h3>Kontakt</h3>
      <address>
        Xirugo AG<br>
        Musterstraße 12<br>
        8000 Zürich, Schweiz<br>
        Telefon: +41 44 123 45 67<br>
        <a href="mailto:info@firma.ch">info@firma.ch</a>
      </address>
    </div>
    <!-- Quicklinks-Spalte -->
    <div class="footer-column">
      <h3>Quicklinks</h3>
      <ul>
        <li><a href="produkte.html">Produkte</a></li>
        <li><a href="partner.html">Partner</a></li>
        <li><a href="ueber-uns.html">Über uns</a></li>
        <li><a href="online-beratung.html">Online Beratung</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="datenschutz.html">Datenschutz</a></li>
      </ul>
    </div>
    <!-- Social-Media-Spalte -->
    <div class="footer-column footer-social">
      <h3>Folgen Sie uns</h3>
      <a href="#" target="_blank" rel="noopener" aria-label="Facebook">
        <img src="assets/social-facebook.svg" alt="Facebook">
      </a>
      <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn">
        <img src="assets/social-linkedin.svg" alt="LinkedIn">
      </a>
      <a href="#" target="_blank" rel="noopener" aria-label="X (Twitter)">
        <img src="assets/social-x.svg" alt="X (Twitter)">
      </a>
    </div>
  </div>
  <hr class="footer-divider">
  <div class="footer-bottom">
    <p>© 2025 Xirugo AG – Alle Rechte vorbehalten.</p>
  </div>
</footer>
```

**CSS (styles.css)**  
```css
.site-footer {
  background-color: #F5F5F5;
  padding: 40px 20px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-column {
  flex: 1;
  min-width: 250px;
}
.footer-column h3 {
  font-size: 1.25rem;
  margin-bottom: 16px;
}
.footer-column ul {
  list-style: none;
  padding: 0;
}
.footer-column ul li {
  margin-bottom: 8px;
}
.footer-column ul li a {
  color: #333333;
  text-decoration: none;
}
.footer-column ul li a:hover,
.footer-column ul li a:focus {
  text-decoration: underline;
}
.footer-social a {
  display: inline-block;
  margin-right: 12px;
}
.footer-social img {
  width: 24px;
  height: 24px;
}
.footer-divider {
  border: none;
  border-top: 1px solid #E0E0E0;
  margin: 40px 0 0;
}
.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 0.875rem;
  color: #777777;
}
@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    text-align: center;
  }
  .footer-column {
    margin-bottom: 24px;
  }
}
```

---

## 4. Datensicherheit & Content-Security-Policy

1. **Content-Security-Policy (CSP)**  
   Füge in jeder HTML-Datei im `<head>` hinzu:
   ```html
   <meta http-equiv="Content-Security-Policy"
         content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';">
   ```
   - `default-src 'self'`: Nur eigene Domain erlaubt  
   - `script-src 'self'`: Keine externen Skripte  
   - `style-src 'self'`: Keine externen Styles  
   - `img-src 'self' data:`: Nur Assets/WebP oder Data-URIs  
   - `font-src 'self'`: Schriftarten vom eigenen Server  
   - `frame-ancestors 'none'`: Kein Einbetten (Clickjacking-Prävention)  

2. **Weitere Security-Header**  
   ```html
   <meta http-equiv="X-Content-Type-Options" content="nosniff">
   <meta http-equiv="X-Frame-Options" content="DENY">
   <meta http-equiv="Referrer-Policy" content="no-referrer-when-downgrade">
   ```
   - `Strict-Transport-Security` auf Server-Ebene:  
     ```
     Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
     ```

3. **Formular-Sicherheit**  
   - **Sanitize & Escaping** im JS: Keine `innerHTML`-Änderungen mit ungesäuberten Inhalten  
   - **Fehlermeldungen** nur als reiner Text (`<span role="alert">`)  
   - **CSRF-Hinweis**: Falls Backend später integriert, Token im Formular nutzen  

---

## 5. SEO-Optimierung und Performance

### 5.1 Meta-Tags & Struktur

1. **Einziges `<h1>` pro Seite**  
   - Beschreibender Text, z. B. „Flachform Hubtische“, „Produkte“, „Partner“ usw.  
   - Untergeordnete Überschriften als `<h2>`, `<h3>`, …

2. **Meta-Description**  
   - Maximal 160 Zeichen  
   - Enthält relevante Keywords und eine kurze Zusammenfassung des Seiteninhalts  
   - Einzigartig je Seite (kein Duplicate Content)

3. **Canonical-Link**  
   ```html
   <link rel="canonical" href="https://xirugo.ch/[dateiname].html">
   ```

4. **Strukturierte Daten (JSON-LD)**  
   - **Organization** (jedes Seite)  
     ```html
     <script type="application/ld+json">
     {
       "@context": "https://schema.org",
       "@type": "Organization",
       "name": "Xirugo AG",
       "url": "https://xirugo.ch",
       "logo": "https://xirugo.ch/assets/logo-1.webp",
       "contactPoint": [{
         "@type": "ContactPoint",
         "telephone": "+41 44 123 45 67",
         "contactType": "Customer Service",
         "areaServed": "CH"
       }],
       "address": {
         "@type": "PostalAddress",
         "streetAddress": "Musterstraße 12",
         "addressLocality": "Zürich",
         "postalCode": "8000",
         "addressCountry": "CH"
       }
     }
     </script>
     ```
   - **WebSite & SearchAction** (jedes Seite)  
     ```html
     <script type="application/ld+json">
     {
       "@context": "https://schema.org",
       "@type": "WebSite",
       "url": "https://xirugo.ch",
       "potentialAction": {
         "@type": "SearchAction",
         "target": "https://xirugo.ch/[dateiname].html?s={search_term_string}",
         "query-input": "required name=search_term_string"
       }
     }
     </script>
     ```
   - **Nutzen**: Google versteht Suchfunktion und Firmeninfos (Knowledge Graph)

### 5.2 Performance-Optimierungen

1. **Preload wichtiger Ressourcen**  
   ```html
   <link rel="preload" as="image" href="assets/header.webp">
   <link rel="preload" as="script" href="js/main.js">
   ```

2. **CSS- & JS-Minifizierung**  
   - Tools wie `cssnano` für CSS → `styles.min.css`, `responsive.min.css`  
   - Tools wie `terser` für JS → `main.min.js`, `search.min.js`, `carousel.min.js`

3. **Lazy-Loading für Bilder**  
   - `<img loading="lazy" src="…">`, außer Hero-Bild (`loading="eager"`)

4. **HTTP/2 & Kompression**  
   - Brotli oder Gzip aktivieren  
   - Multiplexing von HTTP/2 für parallele Requests

5. **Caching**  
   - Statische Assets: `Cache-Control: max-age=31536000, immutable`  
   - HTML: kürzere TTL oder `no-cache`, falls Änderungen erwartet

6. **Externe Ressourcen**  
   - Wenn Google Fonts genutzt:  
     ```html
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=…&display=swap">
     ```
   - Vermeide unnötige CDNs, um CSP einzuhalten

---

## 6. Barrierefreiheit (Accessibility)

1. **Kontrastanforderungen**  
   - Weiß (#FFFFFF) auf Dunkelrot (#A40000) oder Dunkelgrau (#333333) auf Weiß: ≥ 4.5:1  
   - Texte, Buttons, Links prüfen

2. **Fokus-Indikatoren**  
   ```css
   a:focus, button:focus, input:focus, textarea:focus {
     outline: 2px dashed var(--color-primary);
     outline-offset: 2px;
   }
   ```
   - Alle interaktiven Elemente müssen klar fokussierbar sein

3. **ARIA-Attribute**  
   - **Navigation**: `<nav aria-label="Hauptnavigation">`  
   - **Suchfeld**: `role="combobox"`, `aria-autocomplete="list"`, `aria-owns="search-suggestions"`, `aria-expanded="false"`  
   - **Vorschlagsliste**: `<ul role="listbox">`, `<li role="option" aria-selected>`  
   - **FAQ-Akkordeon**: `<button role="button" aria-expanded="false" aria-controls="answer-ID">` + `<div role="region" aria-hidden="true">`  
   - **Formulare**: `<input required aria-required="true">`, `<span role="alert">` für Fehlermeldungen  
   - **Hamburger-Button**: `aria-controls="nav-list"`, `aria-expanded="false"`

4. **Tastatur-Navigation**  
   - **Suchvorschläge** per Pfeiltasten (↑/↓), Enter wählt, Escape schließt  
   - **Akkordeon** per Enter/Space toggeln, Escape schließt  
   - **Hamburger** per Enter/Space toggeln Menü

5. **Semantische HTML-Struktur**  
   - **Überschriften** hierarchisch: H1 → H2 → H3 etc.  
   - **Formularelemente**: `<label for="…">`, `<input id="…">`  
   - **Listen & Address**: `<ul>`, `<ol>`, `<address>` für Kontaktinfo

---

## 7. Universelle Suchfunktion (Volltext)

Implementiere eine clientseitige Volltextsuche, die alle relevanten Texte einer Seite indexiert und bei Eingabe im Header-Suchfeld Vorschläge liefert:

1. **Index-Aufbau (js/search.js)**  
   ```js
   let pageIndex = [];
   document.querySelectorAll('h1, h2, h3, p, li').forEach((elem, idx) => {
     // Abschnitt ermitteln (nächstes <section> oder <main>)
     let section = elem.closest('section, main, article');
     let sectionId = section ? (section.id || `section-${idx}`) : `section-${idx}`;
     if (section && !section.id) section.id = sectionId;

     // Titel und Text erfassen
     let title = elem.tagName.match(/^H[1-3]$/) ? elem.textContent.trim() : null;
     let text  = elem.textContent.trim();
     let url   = `${window.location.pathname}#${sectionId}`;
     pageIndex.push({ id: sectionId, title, text, url });
   });
   ```

2. **Echtzeit-Suche bei Eingabe**  
   ```js
   const searchInput = document.getElementById('site-search');
   const suggestions = document.getElementById('search-suggestions');
   let selectedIndex = -1;

   searchInput.addEventListener('input', () => {
     const query = searchInput.value.trim().toLowerCase();
     if (query.length > 0) {
       // Filterung (title oder text enthält Query)
       const filtered = pageIndex.filter(item => {
         return (item.title && item.title.toLowerCase().includes(query))
             || item.text.toLowerCase().includes(query);
       });
       const top = filtered.slice(0, 10);

       let html = '';
       top.forEach(res => {
         let snippet = '';
         const idxTitle = res.title ? res.title.toLowerCase().indexOf(query) : -1;
         const idxText  = res.text.toLowerCase().indexOf(query);
         if (idxTitle !== -1) {
           snippet = res.title.substring(Math.max(0, idxTitle - 30), idxTitle + 30) + '...';
         } else if (idxText !== -1) {
           let start = Math.max(0, idxText - 30);
           let end   = Math.min(res.text.length, idxText + 30);
           snippet = '...' + res.text.substring(start, end) + '...';
         }
         html += `<li role="option" data-url="${res.url}"><strong>${res.title || res.id}</strong> – ${snippet}</li>`;
       });
       if (top.length === 0) {
         html = `<li role="option">Keine Ergebnisse gefunden</li>`;
       }
       suggestions.innerHTML = html;
       suggestions.setAttribute('aria-expanded', 'true');
       suggestions.style.display = 'block';

       // Klick-Listener auf dynamisch erzeugte LI-Elemente
       suggestions.querySelectorAll('li').forEach((li, idx) => {
         li.addEventListener('click', () => {
           window.location.href = li.dataset.url;
           clearSuggestions();
         });
       });
     } else {
       clearSuggestions();
     }
   });

   // Tastatur-Steuerung
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
   ```

**Technische Hinweise**  
- Datei: `js/search.js`, in allen HTML-Dateien mit `defer` eingebunden.  
- Sicherheit: Keine `innerHTML` mit ungesäuberten Daten.  
- Performance: Optional Debouncing bei sehr großen Seiteninhalten.

---

## 8. Formularvalidierung (Kontakt & Login)

1. **HTML-Struktur**  
   ```html
   <form id="contact-form" novalidate>
     <label for="name">Name*</label>
     <input type="text" id="name" name="name" required aria-required="true">
     <span class="error-message" role="alert"></span>

     <label for="email">E-Mail*</label>
     <input type="email" id="email" name="email" required aria-required="true">
     <span class="error-message" role="alert"></span>

     <!-- Weitere Felder... -->

     <button type="submit" class="btn-primary">Absenden</button>
   </form>
   ```

2. **JS-Logik (main.js)**  
   ```js
   document.addEventListener('DOMContentLoaded', () => {
     const form = document.getElementById('contact-form');
     if (!form) return;

     form.addEventListener('submit', e => {
       e.preventDefault();
       let valid = true;

       form.querySelectorAll('[required]').forEach(input => {
         const errorEl = input.nextElementSibling;
         if (!input.value.trim()) {
           errorEl.textContent = 'Bitte füllen Sie dieses Feld aus.';
           input.focus();
           valid = false;
         } else {
           errorEl.textContent = '';
         }
       });

       // E-Mail-spezifische Validierung
       const email = form.querySelector('input[type="email"]');
       if (email) {
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         const emailError = email.nextElementSibling;
         if (email.value.trim() && !regex.test(email.value.trim())) {
           emailError.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
           email.focus();
           valid = false;
         }
       }

       if (valid) {
         form.parentElement.innerHTML = '<p>Vielen Dank. Wir melden uns in Kürze.</p>';
       }
     });
   });
   ```

**Sicherheit**  
- Keine sensiblen Daten im Client speichern.  
- Fehlermeldungen reiner Text, nicht via `innerHTML`.

---

## 9. CSS-Architektur & Responsive-Design

1. **Datei: `css/reset.css`**  
   - Minimaler Reset (Eric Meyer / Normalize):  
     ```css
     html, body, div, span, applet, object, iframe,
     h1, h2, h3, h4, h5, h6, p, blockquote, pre,
     a, abbr, acronym, address, big, cite, code,
     del, dfn, em, img, ins, kbd, q, s, samp,
     small, strike, strong, sub, sup, tt, var,
     b, u, i, center,
     dl, dt, dd, ol, ul, li,
     fieldset, form, label, legend,
     table, caption, tbody, tfoot, thead, tr, th, td,
     article, aside, canvas, details, embed,
     figure, figcaption, footer, header, hgroup,
     menu, nav, output, ruby, section, summary,
     time, mark, audio, video {
       margin: 0;
       padding: 0;
       border: 0;
       font-size: 100%;
       font: inherit;
       vertical-align: baseline;
     }
     article, aside, details, figcaption, figure,
     footer, header, hgroup, menu, nav, section {
       display: block;
     }
     body {
       line-height: 1;
     }
     ol, ul {
       list-style: none;
     }
     blockquote, q {
       quotes: none;
     }
     blockquote:before, blockquote:after,
     q:before, q:after {
       content: '';
       content: none;
     }
     table {
       border-collapse: collapse;
       border-spacing: 0;
     }
     *, *::before, *::after {
       box-sizing: border-box;
     }
     img {
       display: block;
       max-width: 100%;
       height: auto;
     }
     ```

2. **Datei: `css/styles.css`**  
   - **:root** CSS-Variablen definieren  
   - **Global Styles** (Body, Links, Listen, Bilder)  
   - **Komponenten**:
     - Header, Navigation, Suchfeld, Hamburger  
     - Buttons (`.btn-primary`, `.btn-secondary`)  
     - Produktkarten, Partner-Cards, Über-uns, Kontakt-Formular, FAQ-Akkordeon, Login-Formular, Datenschutz-Layout  
     - Footer  
   - **Kommentare** gliedern Bereiche z. B.:  
     ```css
     /* ===== Global Styles ===== */
     /* ===== Header Styles ===== */
     /* ===== Hero/Intro Styles ===== */
     /* ===== Components: Product, Partner, About, Contact, FAQ, Login, Privacy ===== */
     /* ===== Footer Styles ===== */
     ```

3. **Datei: `css/responsive.css`**  
   - **Breakpoints**:
     - Desktop: ≥ 1024px  
     - Tablet: 768px ≤ Breite < 1024px  
     - Mobil: ≤ 767px  
     - Klein: ≤ 480px  
   - **Tablet** (@media max-width: 1024px):
     - Verkleinerte Schriftgrößen, reduzierte Abstände  
   - **Mobil** (@media max-width: 768px):
     - Navigation einspaltig (Hamburger aktiv), Suchfeld unter Logo  
     - Content-Container auf `flex-direction: column`, zentrieren  
     - Footer einspaltig, zentriert  
   - **Klein** (@media max-width: 480px):
     - Schriftgrößen weiter reduzieren, Padding/Abstände minimieren  

---

## 10. JavaScript-Architektur und Sicherheit

1. **Datei: `js/main.js`**  
   - **Modul**: Hamburger-Toggle, Smooth-Scroll, Akkordeon, initializeSearch-Aufruf  
   - **Keine globalen Variablen**: Nur lokale Konstanten & Funktionen  
   - **Keine Inline-Event-Handler**, keine `eval`- oder `Function`-Nutzung  
   - **Kommentare**:  
     ```js
     // main.js – Hamburger, Smooth-Scroll, Akkordeon, Search-Init
     ```

2. **Datei: `js/search.js`**  
   - **Modul**: Volltextsuche  
   - Funktionen: `initializeSearch()`, `clearSuggestions()`, `updateSelection()`  
   - **Keine `innerHTML`-Manipulation** mit ungesäuberten Daten  
   - **Kommentare**:  
     ```js
     // search.js – Index-Aufbau, Vorschläge, Tastatursteuerung
     ```

3. **Datei: `js/carousel.js`**  
   - **Modul**: Platzhalter für Testimonials-Karussell  
   - **Kommentare**:  
     ```js
     // carousel.js – Karussell-Logik (optional, derzeit deaktiviert)
     ```

4. **Allgemeine JS-Sicherheit**  
   - **CSP-konform**: Kein Inline-JS, keine externen Skripte ohne Zustimmung  
   - **Event Listener** auf spezifische Selektoren absetzen  
   - **Keine globalen Variablen** überschreiben  
   - **Debug/Logging** entfernen (keine `console.log` in Produktionscode)

---

## 11. Barrierefreiheit (Accessibility)

1. **ARIA-Attribute & Rollen**  
   - **Header**: `role="banner"`, `nav aria-label="Hauptnavigation"`  
   - **Suchfeld**: `role="combobox"`, `aria-autocomplete="list"`, `aria-owns="search-suggestions"`, `aria-expanded="false"`  
   - **Vorschlagsliste**: `<ul role="listbox">`, `<li role="option" aria-selected="false">`  
   - **FAQ-Akkordeon**: `<button role="button" aria-expanded="false" aria-controls="answer-ID">` + `<div role="region" aria-hidden="true">`  
   - **Formulare**: `<input required aria-required="true">`, `<span role="alert">` für Fehlermeldungen  
   - **Hamburger-Button**: `aria-controls="nav-list"`, `aria-expanded="false"`

2. **Fokus-Indikatoren**  
   ```css
   a:focus, button:focus, input:focus, textarea:focus {
     outline: 2px dashed var(--color-primary);
     outline-offset: 2px;
   }
   ```

3. **Tastatur-Navigation**  
   - **Suchvorschläge**: Pfeiltasten (↑/↓), Enter wählt, Escape schließt  
   - **Akkordeon**: Enter/Space toggeln, Escape schließt  
   - **Hamburger**: Enter/Space toggelt Menü

4. **Semantische HTML-Struktur**  
   - **Überschriften**: H1 → H2 → H3 …  
   - **Formulare**: `<label for="…">`, `<input id="…">`, `<span role="alert">`  
   - **Listen & Address**: `<ul>`, `<ol>`, `<address>` für Kontaktinfo

---

## 12. SEO & Performance-Best Practices

1. **Einziges `<h1>` pro Seite**  
   - Klare, beschreibende Texte (z. B. „Flachform Hubtische“, „Produkte“, „Partner“, etc.)

2. **Meta Description**  
   - Einzigartige, max. 160 Zeichen lange Beschreibung pro Seite  
   - Relevante Keywords, Handlungsaufruf

3. **Canonical-Links**  
   ```html
   <link rel="canonical" href="https://xirugo.ch/[dateiname].html">
   ```

4. **Strukturierte Daten**  
   - **Organization**  
   - **WebSite + SearchAction**

5. **Preload-Prioritäten**  
   ```html
   <link rel="preload" as="image" href="assets/header.webp">
   <link rel="preload" as="script" href="js/main.js">
   ```

6. **Bilderoptimierung**  
   - Nur WebP-Format, verlustfrei oder moderate Kompression  
   - `loading="lazy"` standardmäßig, Ausnahme Hero-Bild

7. **CSS-/JS-Minifizierung**  
   - `styles.min.css`, `responsive.min.css`, `main.min.js`, `search.min.js`, `carousel.min.js`

8. **HTTP/2, Brotli/Gzip**  
   - Serverseitig aktivieren

9. **Caching-Strategie**  
   - Statische Ressourcen: `Cache-Control: max-age=31536000, immutable`  
   - HTML: kürzere TTL oder `no-cache`

10. **Externe Ressourcen**  
    - Wenn nötig, `rel="preconnect"` zu Google Fonts etc.  
    - Allgemein vermeiden, um CSP-Schranken einzuhalten

---

## 13. Generisches Vorgehen für den KI-Agenten

1. **Projektstruktur anlegen** (nur Referenz; reale Ordner nicht notwendig)  
2. **Universal-Komponenten**  
   - Header (`includes/header.html`)  
   - Footer (`includes/footer.html`)  
3. **HTML-Vorlagen generisch erstellen**  
   - `<html lang="de">`  
   - `<head>`: Meta, JSON-LD, CSS/JS-Links, CSP  
   - `<body>`: Header- und Footer-Includes, `<main class="container page-content">` für Content  
4. **Allgemeine Inhaltsstruktur (Template)**  
   ```html
   <!DOCTYPE html>
   <html lang="de">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="robots" content="index, follow">
     <!-- Meta-Description, Canonical spezifisch pro Seite -->
     <link rel="stylesheet" href="css/reset.css">
     <link rel="stylesheet" href="css/styles.css">
     <link rel="stylesheet" href="css/responsive.css">
     <script src="js/main.js" defer></script>
     <script src="js/search.js" defer></script>
     <script src="js/carousel.js" defer></script>
   </head>
   <body>
     <!--#include virtual="includes/header.html" -->

     <main class="container page-content">
       <!-- Haupt-Content hier -->
     </main>

     <!--#include virtual="includes/footer.html" -->
   </body>
   </html>
   ```
5. **Seiten ableiten**  
   - Kopiere Template, ersetze `<title>`, `<meta name="description">`, `<link rel="canonical">`, Haupt-Content

6. **CSS entwickeln**  
   - `reset.css`, `styles.css`, `responsive.css` gemäß Abschnitt 9

7. **JS implementieren**  
   - `main.js`, `search.js`, `carousel.js` gemäß Abschnitt 10

8. **Formular-Validierung**  
   - Clientseitig in `main.js`

9. **Datenschutzseite**  
   - Mehrere `<section>`-Blöcke mit `<h2>` und Text  

10. **SEO-Checks**  
    - Ein `<h1>` pro Seite, Meta-Description, Canonical, `alt`-Attribute, JSON-LD

11. **Accessibility-Checks**  
    - Fokus-Indikatoren, ARIA-Attribute, Tastatur-Navigation

12. **Security-Checks**  
    - CSP, keine Inline-JS, sichere Formular-Validierung

13. **Testing**  
    - W3C HTML/CSS-Validator  
    - Lighthouse (Performance, Accessibility, SEO)  
    - Manuelles Testen (Desktop, Tablet, Mobil), Keyboard-Navigation

14. **Minifizierung & Bundling**  
    - CSS/JS minifizieren, optional bundlen

15. **Deployment**  
    - HTTPS erzwingen, CSP und Security-Header setzen, robots.txt, sitemap.xml

---

## 14. Zusammenfassung der Richtlinien

1. **Ordnerstruktur (Referenz)**  
2. **Einheitlicher Header/Footer**  
3. **Semantisches HTML** (H1 pro Seite, ARIA, Listen, Address)  
4. **Externe CSS/JS** (Reset, Basis, Responsiv, JS-Module)  
5. **Datenschutzseite** vollständig integriert  
6. **Barrierefreiheit (WCAG AA)** (Kontrast, Fokus, ARIA, Keyboard)  
7. **SEO** (Meta, Canonical, JSON-LD, Preload, Minifizierung)  
8. **Security** (CSP, X-Frame-Options, nosniff, no-referrer)  
9. **Performance** (Lazy-Loading, HTTP/2, Caching, Kompression)  

Folge diesen universellen Regeln, um eine vollständige, moderne, SEO-freundliche, barrierefreie und sichere Website zu generieren. 

**Ende von AGENTS.md**

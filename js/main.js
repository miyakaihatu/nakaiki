const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('#global-nav');

const socialIconMarkup = '<a class="social-icon" href="https://www.instagram.com/nakaikioilmassage/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Instagram"><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="7.5" r="1.2" fill="currentColor"/></svg></a><a class="social-icon" href="https://www.threads.com/@nakaikikaihatu" target="_blank" rel="noopener noreferrer nofollow" aria-label="Threads"><span aria-hidden="true">T</span></a><a class="social-icon" href="https://note.com/miyaaromassage" target="_blank" rel="noopener noreferrer nofollow" aria-label="note"><span aria-hidden="true">n</span></a><a class="social-icon" href="https://x.com/nakaiki_7" target="_blank" rel="noopener noreferrer nofollow" aria-label="X"><span aria-hidden="true">X</span></a>';

function setupNavLabels() {
  if (!globalNav) return;
  const labels = {
    'guide.html': 'はじめに',
    'about.html': 'プロフィール'
  };

  globalNav.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.endsWith('emergency.html')) {
      link.remove();
      return;
    }
    if (labels[href]) {
      link.textContent = labels[href];
    }
  });
}

function removeEmergencyEntryPoints() {
  document.querySelectorAll('a[href$="emergency.html"]').forEach((link) => {
    const panel = link.closest('.quiet-panel');
    const card = link.closest('.card');
    if (panel) {
      panel.remove();
      return;
    }
    if (card && card.textContent.includes('現在地')) {
      card.remove();
      return;
    }
    link.remove();
  });
}

function injectSocialIconStyles() {
  if (document.querySelector('#social-icon-styles')) return;
  const style = document.createElement('style');
  style.id = 'social-icon-styles';
  style.textContent = '.social-links{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.social-icon{width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.86);color:var(--accent);font-size:15px;font-weight:700;line-height:1;text-decoration:none}.social-icon:hover{background:var(--soft);border-color:rgba(111,159,155,.55)}.social-icon svg{display:block}.header-social{flex:0 0 auto}.footer-social{justify-content:flex-end}@media(max-width:960px){.header-inner{gap:12px}.global-nav{gap:4px}.global-nav a{padding:9px 10px}.header-social{gap:6px}.social-icon{width:36px;height:36px}}@media(max-width:820px){.header-social{order:2;margin-left:auto;margin-right:4px}.nav-toggle{order:3}.footer-social{justify-content:flex-start}}';
  document.head.append(style);
}

function injectGentlePolish() {
  if (document.querySelector('#gentle-polish-styles')) return;
  const style = document.createElement('style');
  style.id = 'gentle-polish-styles';
  style.textContent = ':root{--bg:#fdfcf9;--surface:#fffefd;--soft:#f1f7f3;--line:#e4e9e5;--accent:#4f7f78;--blue:#8caabe;--text:#2b3332;--muted:#667270;--radius:12px}.site-header{background:rgba(253,252,249,.94)}.hero{background:linear-gradient(180deg,rgba(241,247,243,.74),rgba(253,252,249,0))}.quiet-panel,.card,.theme-card,.article-card,.link-card,.post-card{border-radius:14px;box-shadow:0 16px 42px rgba(72,91,87,.07)}.button{border-radius:999px}.eyebrow{letter-spacing:.14em}.hero-copy h1,.section-heading h1,.narrow h1{font-weight:650}.lead,.prose{line-height:1.9}.link-card em{background:#edf7f2}.tag-list a,.tag-row span{background:rgba(255,255,255,.82)}@media(max-width:520px){.hero-copy h1,.section-heading h1,.narrow h1{font-size:32px}.section-heading{margin-bottom:24px}}';
  document.head.append(style);
}

function createSocialLinks(locationClass) {
  const nav = document.createElement('nav');
  nav.className = `social-links ${locationClass}`;
  nav.setAttribute('aria-label', 'SNSリンク');
  nav.innerHTML = socialIconMarkup;
  return nav;
}

function setupSocialIconLinks() {
  injectSocialIconStyles();

  if (globalNav && !document.querySelector('.header-social')) {
    globalNav.insertAdjacentElement('afterend', createSocialLinks('header-social'));
  }

  document.querySelectorAll('.footer-links').forEach((footerLinks) => {
    footerLinks.replaceWith(createSocialLinks('footer-social'));
  });
}

setupNavLabels();
removeEmergencyEntryPoints();
injectGentlePolish();
setupSocialIconLinks();

if (header && navToggle && globalNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  globalNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const noteLatest = document.querySelector('#note-latest');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(value, fallback) {
  const candidate = typeof value === 'string' && value.trim() ? value.trim() : fallback;
  if (!candidate) return '';

  try {
    const url = new URL(candidate, window.location.href);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : fallback;
  } catch {
    return fallback;
  }
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function textOrFallback(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function renderNoteFallback() {
  if (!noteLatest) return;
  noteLatest.innerHTML = '<p class="note-empty">note最新記事を読み込めませんでした。時間をおいて再度確認してください。</p>';
}

function renderNoteArticles(items) {
  if (!noteLatest) return;
  const articles = Array.isArray(items) ? items.slice(0, 3) : [];

  if (!articles.length) {
    renderNoteFallback();
    return;
  }

  noteLatest.innerHTML = articles.map((item) => {
    const title = escapeHtml(textOrFallback(item.title, 'note記事'));
    const description = escapeHtml(textOrFallback(item.description, '長文で整理した記事です。'));
    const link = escapeHtml(safeUrl(item.link, 'https://note.com/miyaaromassage'));
    const pubDate = escapeHtml(formatDate(item.pubDate));
    const image = safeUrl(item.image, '');
    const imageMarkup = image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : '';

    return `<article class="note-card">${imageMarkup}<div class="note-card-body">${pubDate ? `<p class="note-date">${pubDate}</p>` : ''}<h3>${title}</h3><p>${description}</p><a class="card-link" href="${link}" target="_blank" rel="noopener noreferrer">noteで読む</a></div></article>`;
  }).join('');
}

if (noteLatest) {
  fetch('data/note.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('note.json fetch failed');
      return response.json();
    })
    .then(renderNoteArticles)
    .catch(renderNoteFallback);
}

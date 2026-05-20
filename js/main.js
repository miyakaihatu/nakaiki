const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('#global-nav');

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

const socialItems = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nakaikioilmassage/',
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="7.5" r="1.2" fill="currentColor"/></svg>'
  },
  { label: 'Threads', href: 'https://www.threads.com/@nakaikikaihatu', icon: '<span aria-hidden="true">@</span>' },
  { label: 'note', href: 'https://note.com/miyaaromassage', icon: '<span aria-hidden="true">n</span>' },
  { label: 'X', href: 'https://x.com/nakaiki_7', icon: '<span aria-hidden="true">X</span>' }
];

function renderSocialLinks() {
  document.querySelectorAll('.social-links').forEach((nav) => {
    nav.innerHTML = socialItems.map((item) => {
      return `<a class="social-icon" href="${item.href}" target="_blank" rel="noopener noreferrer nofollow" aria-label="${item.label}">${item.icon}</a>`;
    }).join('');
  });
}

function normalizeNavigation() {
  document.querySelectorAll('.global-nav').forEach((nav) => {
    const guideLink = Array.from(nav.querySelectorAll('a')).find((link) => {
      const href = link.getAttribute('href') || '';
      return href.endsWith('guide.html');
    });

    if (guideLink) {
      guideLink.textContent = '施術について';
      nav.appendChild(guideLink);
    }
  });

  document.querySelectorAll('.global-nav a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.endsWith('about.html')) link.textContent = 'プロフィール';
    if (href.endsWith('guide.html')) link.textContent = '施術について';
    if (href.endsWith('emergency.html')) link.remove();
  });
}

function normalizeGuideCopy() {
  document.querySelectorAll('a, h2, h3').forEach((element) => {
    if (element.textContent.trim() === '初めての方へ') {
      element.textContent = '施術について';
    }
  });

  document.querySelectorAll('p').forEach((paragraph) => {
    if (paragraph.textContent.trim() === '無料かどうか、概要、応募前に見るものを短く確認できます。') {
      paragraph.textContent = '施術の概要、無料かどうか、応募前の流れを確認できます。';
    }
  });
}

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

    const tags = Array.isArray(item.tags) ? item.tags.slice(0, 3) : [];
    const tagsMarkup = tags.length ? `<p class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</p>` : '';

    return `<article class="note-card">${imageMarkup}<div class="note-card-body">${pubDate ? `<p class="note-date">${pubDate}</p>` : ''}${tagsMarkup}<h3>${title}</h3><p>${description}</p><a class="card-link" href="${link}" target="_blank" rel="noopener noreferrer">noteで読む</a></div></article>`;
  }).join('');
}

renderSocialLinks();
normalizeNavigation();
normalizeGuideCopy();

if (noteLatest) {
  fetch('data/note.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('note.json fetch failed');
      return response.json();
    })
    .then(renderNoteArticles)
    .catch(renderNoteFallback);
}

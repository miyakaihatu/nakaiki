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
    const title = textOrFallback(item.title, 'note記事');
    const description = textOrFallback(item.description, '長文で整理した記事です。');
    const link = textOrFallback(item.link, 'https://note.com/miyaaromassage');
    const pubDate = formatDate(item.pubDate);
    const image = textOrFallback(item.image, '');
    const imageMarkup = image ? `<img src="${image}" alt="" loading="lazy">` : '';

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

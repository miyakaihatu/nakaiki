const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('#global-nav');
const noteLatest = document.querySelector('#note-latest');

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

const socialItems = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nakaikioilmassage/',
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="7.5" r="1.2" fill="currentColor"/></svg>'
  },
  { label: 'Threads', href: 'https://www.threads.com/@nakaikikaihatu', icon: '<span aria-hidden="true">@</span>' },
  { label: 'note', href: 'https://note.com/miyaaromassage', icon: '<span aria-hidden="true">n</span>' },
  { label: 'X', href: 'https://x.com/miya_kankaku', icon: '<span aria-hidden="true">X</span>' }
];

function renderSocialLinks() {
  document.querySelectorAll('.social-links').forEach((nav) => {
    nav.innerHTML = socialItems.map((item) => {
      return `<a class="social-icon" href="${item.href}" target="_blank" rel="noopener noreferrer nofollow" aria-label="${item.label}">${item.icon}</a>`;
    }).join('');
  });
}

function loadExtraStyles() {
  if (document.querySelector('link[href="css/extra.css"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'css/extra.css';
  document.head.appendChild(link);
}

function normalizeNavigation() {
  document.querySelectorAll('.global-nav').forEach((nav) => {
    const links = Array.from(nav.querySelectorAll('a'));
    const articleLink = links.find((link) => (link.getAttribute('href') || '').endsWith('articles.html'));
    const aboutLink = links.find((link) => (link.getAttribute('href') || '').endsWith('about.html'));
    const sensitivityLink = links.find((link) => {
      const href = link.getAttribute('href') || '';
      return href.includes('flowchart-app');
    });
    const questionsLink = links.find((link) => (link.getAttribute('href') || '').endsWith('questions.html'));
    const voicesLink = links.find((link) => (link.getAttribute('href') || '').endsWith('voices.html'));
    const guideLink = links.find((link) => (link.getAttribute('href') || '').endsWith('guide.html'));

    if (aboutLink && !sensitivityLink) {
      const link = document.createElement('a');
      link.href = 'https://miyakaihatu.github.io/flowchart-app/';
      link.textContent = '感度チェック';
      link.target = '_blank';
      link.rel = 'noopener noreferrer nofollow';
      aboutLink.insertAdjacentElement('afterend', link);
    }

    if (articleLink && questionsLink && articleLink.nextElementSibling !== questionsLink) {
      articleLink.insertAdjacentElement('afterend', questionsLink);
    }

    if (questionsLink && voicesLink && questionsLink.nextElementSibling !== voicesLink) {
      questionsLink.insertAdjacentElement('afterend', voicesLink);
    }

    if (guideLink) {
      guideLink.textContent = '開発施術について';
      nav.appendChild(guideLink);
    }
  });
}

function enhanceInternalLinks() {
  const linksHref = 'links.html';
  document.querySelectorAll('a[href="emergency.html"]').forEach((link) => {
    link.href = linksHref;
    if (link.textContent && link.textContent.includes('現在地')) {
      link.textContent = link.textContent.replace('現在地', 'SNS');
    }
  });
}

function addMobileFixedCta() {
  if (document.querySelector('.mobile-fixed-cta')) return;
  const cta = document.createElement('nav');
  cta.className = 'mobile-fixed-cta';
  cta.setAttribute('aria-label', '主要な入口');
  cta.innerHTML = `
    <a href="guide.html">流れを見る</a>
    <a href="https://marshmallow-qa.com/miya_massage" target="_blank" rel="noopener noreferrer nofollow">匿名で聞く</a>
  `;
  document.body.appendChild(cta);
}

function safeUrl(value, fallback) {
  try {
    const url = new URL(value, window.location.href);
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.href;
  } catch (error) {
    return fallback;
  }
  return fallback;
}

function escapeHtml(value) {
  const text = String(value || '');
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripHtml(value) {
  const template = document.createElement('template');
  template.innerHTML = String(value || '');
  return template.content.textContent || '';
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function renderNoteFallback() {
  if (!noteLatest) return;
  noteLatest.innerHTML = `
    <article class="article-card">
      <div>
        <p class="card-kicker">note</p>
        <h3>note記事を読み込めませんでした</h3>
        <p>時間を置いて再読み込みするか、noteの一覧から最新記事を確認してください。</p>
      </div>
      <a class="button secondary" href="https://note.com/miyaaromassage" target="_blank" rel="noopener noreferrer">noteで読む</a>
    </article>
  `;
}

async function renderLatestNotes() {
  if (!noteLatest) return;

  try {
    const response = await fetch('data/note.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('note.json could not be loaded');

    const items = await response.json();
    if (!Array.isArray(items) || items.length === 0) throw new Error('note.json is empty');

    noteLatest.innerHTML = items.slice(0, 3).map((item) => {
      const title = escapeHtml(item.title || '無題の記事');
      const description = escapeHtml(stripHtml(item.description || '').slice(0, 120));
      const link = escapeHtml(safeUrl(item.link, 'https://note.com/miyaaromassage'));
      const date = formatDate(item.pubDate);
      const image = item.image ? `<div class="note-thumb"><img src="${escapeHtml(safeUrl(item.image, ''))}" alt="" loading="lazy"></div>` : '';

      return `
        <article class="article-card note-card">
          ${image}
          <div>
            <p class="card-kicker">${date ? `note / ${escapeHtml(date)}` : 'note'}</p>
            <h3>${title}</h3>
            <p>${description || '長文で整理した記事です。'}</p>
          </div>
          <a class="button secondary" href="${link}" target="_blank" rel="noopener noreferrer">noteで読む</a>
        </article>
      `;
    }).join('');
  } catch (error) {
    renderNoteFallback();
  }
}

renderSocialLinks();
loadExtraStyles();
normalizeNavigation();
enhanceInternalLinks();
addMobileFixedCta();
renderLatestNotes();

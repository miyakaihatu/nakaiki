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
  { label: 'X', href: 'https://x.com/nakaiki_7', icon: '<span aria-hidden="true">X</span>' }
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

    if (articleLink && !questionsLink) {
      const link = document.createElement('a');
      link.href = 'questions.html';
      link.textContent = '悩みQ&A';
      articleLink.insertAdjacentElement('afterend', link);
    }

    const currentQuestionsLink = Array.from(nav.querySelectorAll('a')).find((link) => {
      return (link.getAttribute('href') || '').endsWith('questions.html');
    });
    if (currentQuestionsLink && !voicesLink) {
      const link = document.createElement('a');
      link.href = 'voices.html';
      link.textContent = '感想';
      currentQuestionsLink.insertAdjacentElement('afterend', link);
    }

    if (guideLink) {
      guideLink.textContent = '開発施術について';
      nav.appendChild(guideLink);
    }
  });

  document.querySelectorAll('.global-nav a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.endsWith('about.html')) link.textContent = 'プロフィール';
    if (href.endsWith('guide.html')) link.textContent = '開発施術について';
    if (href.endsWith('questions.html')) link.textContent = '悩みQ&A';
    if (href.endsWith('voices.html')) link.textContent = '感想';
    if (href.includes('flowchart-app')) link.textContent = '感度チェック';
    if (href.endsWith('emergency.html')) link.remove();
  });
}

function normalizeGuideCopy() {
  document.querySelectorAll('a, h2, h3').forEach((element) => {
    const text = element.textContent.trim();
    if (text === '初めての方へ' || text === '施術について' || text === '無料・概要・流れはこちら') {
      element.textContent = '開発施術について';
    }
  });

  document.querySelectorAll('p').forEach((paragraph) => {
    const text = paragraph.textContent.trim();
    if (text === '無料かどうか、概要、応募前に見るものを短く確認できます。' || text === '施術の概要、無料かどうか、応募前の流れを確認できます。') {
      paragraph.textContent = '開発施術の考え方、無料かどうか、応募前の流れを確認できます。';
    }
  });
}

function normalizeMiyaBranding() {
  document.querySelectorAll('.brand-subtitle').forEach((element) => {
    element.textContent = 'ミヤの身体感覚メモ';
  });

  document.querySelectorAll('.footer-title').forEach((element) => {
    element.textContent = '身体の返事 by ミヤ';
  });
}

function enhanceHomePage() {
  const heroPanel = document.querySelector('.quiet-panel');
  if (heroPanel && !heroPanel.querySelector('.breath-visual')) {
    const visual = document.createElement('div');
    visual.className = 'breath-visual';
    visual.setAttribute('aria-hidden', 'true');
    visual.innerHTML = '<span></span><span></span><span></span>';
    heroPanel.appendChild(visual);
  }

  const headings = Array.from(document.querySelectorAll('h2'));
  const liveHeading = headings.find((heading) => heading.textContent.trim() === '今の発信');
  const voicesHeading = headings.find((heading) => heading.textContent.trim() === 'ミヤに届いた感想');
  const questionsHeading = headings.find((heading) => {
    const text = heading.textContent.trim();
    return text === 'ミヤに届く悩みと身体の返事' || text === 'みんなの悩みと身体の返事';
  });

  if (!liveHeading || questionsHeading || voicesHeading || document.querySelector('[data-enhanced-section="questions"]')) return;

  const section = document.createElement('section');
  section.className = 'section';
  section.dataset.enhancedSection = 'questions';
  section.innerHTML = `
    <div class="container section-heading">
      <p class="eyebrow">Shared questions</p>
      <h2>ミヤに届く悩みと身体の返事</h2>
      <p>ミヤの質問箱に届きやすい悩みを、個人が特定されない形で読み物として残しています。「私だけじゃない」と思える入口です。</p>
    </div>
    <div class="container card-grid three">
      <article class="card"><p class="card-kicker">感じにくさ</p><h3>濡れるのに、気持ちよさが遠い時</h3><p>身体は反応しているのに実感が追いつかない時の、安心・呼吸・緊張からの見方。</p><a class="card-link" href="questions.html#q-wet">読む</a></article>
      <article class="card"><p class="card-kicker">緊張</p><h3>触れられると固まってしまう時</h3><p>守る反応が先に出ている身体を、責めずにほどくための考え方。</p><a class="card-link" href="questions.html#q-tension">読む</a></article>
      <article class="card"><p class="card-kicker">刺激</p><h3>強くないとわからない気がする時</h3><p>刺激への慣れと、小さな反応を拾い直す順番について。</p><a class="card-link" href="questions.html#q-strong">読む</a></article>
    </div>
    <div class="container button-row"><a class="button secondary" href="questions.html">悩みQ&Aを読む</a></div>`;
  liveHeading.closest('.section').insertAdjacentElement('beforebegin', section);
}

function enhanceThemePage() {
  [
    ['wet-far', 'nureru-kimochiyoku-nai.html', '詳しく読む'],
    ['self-sense', 'questions.html#q-self', '近い悩みを読む'],
    ['tension', 'kincho-katamaru.html', '詳しく読む'],
    ['soft-sense', 'tsuyoi-shigeki-nare.html', '詳しく読む'],
    ['inner-sense', 'articles.html', '関連記事へ'],
    ['safety', 'questions.html#q-safety', '近い悩みを読む'],
    ['breath', 'questions.html#q-breath', '近い悩みを読む']
  ].forEach(([id, href, label]) => {
    const card = document.getElementById(id);
    if (!card || card.querySelector('.card-link')) return;
    const link = document.createElement('a');
    link.className = 'card-link';
    link.href = href;
    link.textContent = label;
    card.appendChild(link);
  });
}

function enhanceArticlePage() {
  if (!window.location.pathname.endsWith('articles.html')) return;
  const articleList = document.querySelector('.article-list');
  if (!articleList || document.querySelector('[data-enhanced-card="seo-articles"]')) return;
  const wrapper = document.createElement('div');
  wrapper.dataset.enhancedCard = 'seo-articles';
  wrapper.innerHTML = `
    <article class="article-card"><div><p class="tag-row"><span>サイト内記事</span><span>感じにくさ</span><span>反応と実感</span></p><h2>濡れるのに気持ちよくない理由</h2><p>身体は反応しているのに気持ちよさだけが遠い時に、安心・呼吸・緊張・感覚の拾い方から整理するサイト内記事です。</p></div><a class="button secondary" href="nureru-kimochiyoku-nai.html">読む</a></article>
    <article class="article-card"><div><p class="tag-row"><span>サイト内記事</span><span>緊張</span><span>守る反応</span></p><h2>緊張すると身体が固まる時</h2><p>触れられると身体に力が入る時に、筋緊張・呼吸・安心の順番から身体の反応を見る記事です。</p></div><a class="button secondary" href="kincho-katamaru.html">読む</a></article>
    <article class="article-card"><div><p class="tag-row"><span>サイト内記事</span><span>刺激</span><span>慣れ</span></p><h2>強い刺激に慣れると弱い感覚を拾いにくい理由</h2><p>強さを足す前に、小さな反応を拾える状態を整えるための考え方をまとめた記事です。</p></div><a class="button secondary" href="tsuyoi-shigeki-nare.html">読む</a></article>`;
  Array.from(wrapper.children).reverse().forEach((card) => articleList.prepend(card));
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
    const title = escapeHtml(item.title || 'note記事');
    const description = escapeHtml(item.description || '長文で整理した記事です。');
    const link = escapeHtml(safeUrl(item.link, 'https://note.com/miyaaromassage'));
    const pubDate = escapeHtml(formatDate(item.pubDate));
    const image = safeUrl(item.image, '');
    const imageMarkup = image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : '';
    const tags = Array.isArray(item.tags) ? item.tags.slice(0, 3) : [];
    const tagsMarkup = tags.length ? `<p class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</p>` : '';
    return `<article class="note-card">${imageMarkup}<div class="note-card-body">${pubDate ? `<p class="note-date">${pubDate}</p>` : ''}${tagsMarkup}<h3>${title}</h3><p>${description}</p><a class="card-link" href="${link}" target="_blank" rel="noopener noreferrer">noteで読む</a></div></article>`;
  }).join('');
}

function renderMobileFixedCta() {
  if (document.querySelector('.mobile-fixed-cta')) return;
  const cta = document.createElement('nav');
  cta.className = 'mobile-fixed-cta';
  cta.setAttribute('aria-label', '応募前の固定導線');
  cta.innerHTML = [
    '<a href="guide.html#flow">流れを見る</a>',
    '<a href="https://marshmallow-qa.com/miya_massage" target="_blank" rel="noopener noreferrer nofollow">匿名で質問</a>'
  ].join('');
  document.body.appendChild(cta);
}

renderSocialLinks();
loadExtraStyles();
normalizeNavigation();
normalizeGuideCopy();
normalizeMiyaBranding();
enhanceHomePage();
enhanceThemePage();
enhanceArticlePage();
renderMobileFixedCta();

if (noteLatest) {
  fetch('data/note.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('note.json fetch failed');
      return response.json();
    })
    .then(renderNoteArticles)
    .catch(renderNoteFallback);
}

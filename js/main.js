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

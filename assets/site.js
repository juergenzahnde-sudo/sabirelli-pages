const button = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 780px)');

if (button && navigation) {
  const setOpen = (open, restoreFocus = false) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    navigation.classList.toggle('is-open', open);
    if (restoreFocus) button.focus();
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header') && button.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.site-header') && button.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
}

const sectionLinks = [...document.querySelectorAll('.navigation a[data-section]')];
if ('IntersectionObserver' in window && sectionLinks.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      sectionLinks.forEach(link => {
        if (link.dataset.section === entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

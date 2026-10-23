(() => {
  'use strict';
  const navToggle = document.querySelector('#menu-toggle');
  const navLinks = document.querySelector('#nav-links');
  const iconUse = navToggle?.querySelector('use');
  const setMenu = (open) => {
    navLinks?.classList.toggle('open', open);
    navToggle?.setAttribute('aria-expanded', String(open));
    navToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    iconUse?.setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.classList.toggle('menu-open', open);
  };
  navToggle?.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav') && navLinks.classList.contains('open')) setMenu(false); });
  const filters = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.project-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { const show = value === 'all' || (card.dataset.categories || '').split(' ').includes(value); card.hidden = !show; });
  }));
  const copy = document.querySelector('#copy-email');
  const toast = document.querySelector('#toast');
  let hideToast;
  copy?.addEventListener('click', async () => {
    const email = 'nooru8770@gmail.com';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      copy.querySelector('span').textContent = 'Copied!';
      toast.textContent = 'Email address copied';
      toast.classList.add('show');
      clearTimeout(hideToast);
      hideToast = setTimeout(() => { toast.classList.remove('show'); copy.querySelector('span').textContent = 'Copy email'; }, 2600);
    } catch { window.location.href = `mailto:${email}`; }
  });
  // Reveal only for supported, non-reduced-motion environments. Content stays visible by default.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const els = document.querySelectorAll('.project-card, .cap-card, .timeline-item');
    const io = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } }); }, { threshold: .08, rootMargin: '0px 0px 15px 0px' });
    els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }
})();

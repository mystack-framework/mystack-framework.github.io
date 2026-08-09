(() => {
  'use strict';

  const libraries = [
    ['DIR', 'Portable paths, URLs and imports'], ['PHDE', 'Debugging, errors and diagnostics'],
    ['PHRO', 'Router, guard, WAF and metadata'], ['PHOB', 'Browser capabilities and identity'],
    ['PHEV', 'WebSocket, SSE and realtime events'], ['PHEM', 'SMTP, IMAP and POP3 mail'],
    ['PHML', 'Markup, layouts and composition'], ['PHCS', 'PHP-native utility CSS'],
    ['PHJS', 'Self-contained browser runtime'], ['PHJC', 'Views, slots and compiled pages'],
    ['PHCO', 'Secure project-scoped cookies'], ['PHSE', 'Secure sessions and expiration'],
    ['PHLS', 'Atomic local state and rate limits'], ['PHDB', 'Prepared data access and streaming'],
    ['PHRQ', 'HTTP, CORS, CSP and Live Map'], ['PHQR', 'Memory-safe QR generation'],
    ['PHED', 'Authenticated application encryption'], ['PHTP', 'OTP, TOTP and recovery'],
    ['PHTM', 'Timezone and date/time utilities'], ['PHVD', 'Input and database validation'],
    ['PHCD', 'Atomic client-package management'], ['PHJT', 'HMAC JWT and key rotation'],
    ['PHTR', 'Translation provider bridge'], ['PHAU', 'Identity, OAuth and OIDC'],
    ['PHOP', 'Image, video, ZIP and text tools'], ['PHAI', 'AI providers, MCP and bridges'],
    ['PHAP', 'Compact REST API resources'], ['PHUI', 'Reusable UI catalog'],
    ['PHPA', 'Payments and couriers'], ['PHFY', 'ntfy and Web Push'],
    ['PHMO', 'Health, logs, metrics and alerts']
  ];

  const grid = document.querySelector('[data-library-grid]');
  const search = document.querySelector('#library-search');
  const empty = document.querySelector('[data-no-results]');
  const render = (query = '') => {
    const term = query.trim().toLowerCase();
    const matched = libraries.filter(([name, description]) => `${name} ${description}`.toLowerCase().includes(term));
    grid.innerHTML = matched.map(([name, description]) => `<a class="library" href="docs/" aria-label="Search ${name} in the documentation"><b>${name}</b><span>${description}</span></a>`).join('');
    empty.hidden = matched.length !== 0;
  };
  render();
  search?.addEventListener('input', (event) => render(event.target.value));

  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menu.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('[data-scroll-progress]');
  const backTop = document.querySelector('[data-back-top]');
  const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 12);
    backTop?.classList.toggle('visible', window.scrollY > 650);
    const available = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${available > 0 ? Math.min(100, (scrollY / available) * 100) : 0}%`;
  };
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });
  backTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!reduced && finePointer) {
    const glow = document.querySelector('[data-pointer-glow]');
    addEventListener('pointermove', (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
      if (glow) glow.style.opacity = '1';
    }, { passive: true });

    document.querySelectorAll('[data-tilt]').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
        element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });
      element.addEventListener('pointerleave', () => { element.style.transform = ''; });
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if ('IntersectionObserver' in window && sectionLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.toggleAttribute('aria-current', active);
      });
    }), { rootMargin: '-30% 0px -60%', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelector('[data-year]').textContent = new Date().getFullYear();
})();

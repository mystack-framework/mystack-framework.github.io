(() => {
  'use strict';

  const libraries = [
    ['DIR', 'Portable paths, URLs and imports'], ['PHDE', 'Debugging, errors and diagnostics'],
    ['PHRO', 'Router, guard, WAF and metadata'], ['PHOB', 'Code-protection extension bridge'],
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

/* ===== Advanced UI: typing terminal, count-up, palette, spotlight ===== */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track = document.querySelector('[data-marquee]');
  if (track && !reduced) track.innerHTML += track.innerHTML;

  const code = document.querySelector('[data-terminal-code]');
  const fileLabel = document.querySelector('[data-terminal-file]');
  const snippets = [
    { file: 'index.php', lines: [
      ['dim', '<?php'],
      ['pink', "require_once 'library/library.php';"],
      ['', ''],
      ['blue', 'PHDE::debug(false);'],
      ['blue', 'PHRO::guard();'],
      ['blue', "PHRO::key('your-application-key', false);"],
      ['', ''],
      ['blue', "PHRO::get('/', fn () =>"],
      ['', "    PHUI::page('landing')"],
      ['blue', ');'],
      ['', ''],
      ['blue', 'PHRO::listen();'],
    ] },
    { file: 'routes.php', lines: [
      ['dim', '// guarded, named, cached'],
      ['blue', "PHRO::post('/orders', [OrderController::class, 'store'])"],
      ['', "    ->name('orders.store')"],
      ['blue', "    ->middleware(Auth::requireRole(['admin']))"],
      ['blue', "    ->header('Cache-Control', 'no-store', 'private');"],
    ] },
    { file: 'api.php', lines: [
      ['dim', '# validated REST in one call'],
      ['blue', "PHAP::api('POST /api/subscribers', 'auth',"],
      ['', "    ['email' => 'required|email'],"],
      ['blue', "    fn(array $d) => PHDB::insert('subscribers', $d),"],
      ['pink', "    'Subscribed');"],
    ] },
    { file: 'users.php', lines: [
      ['dim', '# prepared, atomic, streamed'],
      ['pink', "$id = PHDB::insert('users', ['name' => 'Sakib']);"],
      ['pink', "$u   = PHDB::find('users', $id);"],
      ['blue', 'PHDB::transaction(function (): void {'],
      ['', "    PHDB::update('stock', ['qty' => 9], ['id' => 1]);"],
      ['blue', '});'],
    ] },
    { file: 'view.php', lines: [
      ['dim', '// Blade-style, auto-escaping'],
      ['pink', "echo PHJC::view('HomeView', ['title' => 'Home']);"],
      ['blue', "echo PHUI::ui('ui:button-primary', ["],
      ['', "    'slot' => 'Save',"],
      ['', "    'phjs' => ['click' => 'toast \"Saved\"'],"],
      ['blue', ']);'],
    ] },
    { file: 'markup.phml', lines: [
      ['dim', '// markup that compiles to HTML'],
      ['blue', 'echo phml(<<<PHML'],
      ['', 'main {'],
      ['', '    class: "max-w-6xl mx-auto p-6";'],
      ['', '    h1 { class: "text-3xl font-bold"; "Welcome" }'],
      ['', '}'],
      ['', 'PHML);'],
    ] },
    { file: 'button.html', lines: [
      ['dim', '<!-- declarative, no build step -->'],
      ['pink', '<button class="bg-blue-600 hover:bg-blue-700'],
      ['pink', '        text-white px-4 py-2 rounded"'],
      ['pink', "  x-on:click=\"toast 'Saved'\">Save</button>"],
    ] },
    { file: 'auth.php', lines: [
      ['dim', '// JWT + TOTP, replay-safe'],
      ['blue', "$t  = PHJT::create(['sub' => 42], 3600);"],
      ['blue', "$ok = PHJT::verify($t['data']);"],
      ['blue', "$e  = PHTP::enroll($userId, ['issuer' => 'App']);"],
      ['blue', '$go = PHTP::confirm($userId, $code);'],
    ] },
    { file: 'payment.php', lines: [
      ['dim', '// capability-checked gateway'],
      ['blue', "$g = PHPA::bkash()->setKeys(...)->sandbox(true);"],
      ['blue', "$p = $g->charge(500.00, 'BDT', 'ORDER-1001');"],
      ['pink', "if ($p['success']) $g->verify($p['transaction_id']);"],
    ] },
    { file: 'notify.php', lines: [
      ['dim', '// ntfy + VAPID web push'],
      ['blue', "PHFY::public('Deploy finished');"],
      ['blue', "PHFY::private('Export ready', ["],
      ['', "    'users' => ['me@example.com'],"],
      ['blue', ']);'],
    ] },
    { file: 'mail.php', lines: [
      ['dim', '// queued SMTP, retry/backoff'],
      ['blue', "PHEM::smtp('smtp.example.com', 465, 'ssl');"],
      ['blue', 'PHEM::smtpLogin($user, $pass);'],
      ['blue', "PHEM::queue($from, 'App', $to, '', '',"],
      ['', "    'Receipt', $html, 0, 3);"],
    ] },
    { file: 'cache.php', lines: [
      ['dim', '// atomic local state'],
      ['blue', "$rows = PHLS::remember('catalog', 300,"],
      ['blue', "    fn() => PHDB::select('products', '*', [], 50));"],
      ['blue', "$n = PHLS::increment('login:' . $ip, 1, 300);"],
    ] },
    { file: 'terminal', lines: [
      ['dim', '# one command proves the framework'],
      ['green', '$ php mystack smoke'],
      ['', '  64 checks passed'],
      ['', '  0 failed, 0 warnings'],
      ['pink', '  * MyStack Full Smoke Test'],
    ] },
  ];
  if (code && !reduced) {
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    let si = 0;
    const typeSnippet = () => {
      const snippet = snippets[si];
      if (fileLabel) fileLabel.textContent = snippet.file;
      code.textContent = '';
      code.appendChild(caret);
      let li = 0, ci = 0, span = null;
      const step = () => {
        if (li >= snippet.lines.length) {
          si = (si + 1) % snippets.length;
          setTimeout(typeSnippet, 2800);
          return;
        }
        const [cls, text] = snippet.lines[li];
        if (ci < text.length) {
          if (ci === 0) { span = document.createElement('span'); if (cls) span.className = cls; code.insertBefore(span, caret); }
          span.textContent += text[ci]; ci++;
          setTimeout(step, 13);
          return;
        }
        li++; ci = 0;
        code.insertBefore(document.createTextNode('\n'), caret);
        setTimeout(step, text === '' ? 24 : 90);
      };
      step();
    };
    setTimeout(typeSnippet, 1800);
  }

  const band = document.querySelector('.stats-band');
  if (band && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const m = el.textContent.trim().match(/^([\d,]+)(\+?)$/);
      if (!m) return;
      const target = parseInt(m[1].replace(/,/g, ''), 10);
      if (reduced || target === 0) return;
      const suffix = m[2], start = performance.now(), dur = 1100;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.querySelectorAll('strong').forEach(animate); io.unobserve(e.target); }
    }), { threshold: 0.4 });
    io.observe(band);
  }

  const overlay = document.querySelector('[data-palette]');
  const input = document.querySelector('[data-palette-input]');
  const list = document.querySelector('[data-palette-list]');
  if (overlay && input && list) {
    const items = [
      ...[...document.querySelectorAll('main section[id]')].map((s) => ({
        label: (s.querySelector('h2') ? s.querySelector('h2').textContent : s.id).replace(/\s+/g, ' ').trim(),
        hint: '#' + s.id, href: '#' + s.id,
      })),
      ...[...document.querySelectorAll('.library-grid .library')].map((a) => ({
        label: a.querySelector('b').textContent, hint: a.querySelector('span').textContent, href: a.getAttribute('href'),
      })),
      { label: 'Documentation portal', hint: 'docs/', href: 'docs/' },
      { label: 'API catalog (JSON)', hint: 'docs/api.json', href: 'docs/api.json' },
      { label: 'llms.txt', hint: 'AI overview', href: 'llms.txt' },
      { label: 'llms-full.txt', hint: 'Complete AI reference', href: 'llms-full.txt' },
      { label: 'Framework repository', hint: 'GitHub', href: 'https://github.com/mystack-framework/mystack' },
      { label: 'VS Code extension', hint: 'GitHub', href: 'https://github.com/mystack-framework/mystack-extension' },
    ];
    let active = 0, filtered = [];
    const renderList = () => {
      const q = input.value.trim().toLowerCase();
      filtered = items.filter((i) => !q || (i.label + ' ' + i.hint).toLowerCase().includes(q)).slice(0, 40);
      active = 0;
      list.innerHTML = filtered.length
        ? filtered.map((i, idx) => `<a class="palette-item${idx === 0 ? ' active' : ''}" role="option" href="${i.href}" data-idx="${idx}"><span>${i.label}</span><small>${i.hint}</small></a>`).join('')
        : '<p class="palette-empty">No matching result.</p>';
    };
    const open = () => { overlay.hidden = false; overlay.classList.add('open'); renderList(); input.focus(); input.select(); };
    const close = () => { overlay.classList.remove('open'); overlay.hidden = true; };
    const move = (d) => {
      const els = [...list.querySelectorAll('.palette-item')];
      if (!els.length) return;
      if (els[active]) els[active].classList.remove('active');
      active = (active + d + els.length) % els.length;
      els[active].classList.add('active');
      els[active].scrollIntoView({ block: 'nearest' });
    };
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); return; }
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { const el = list.querySelectorAll('.palette-item')[active]; if (el) { el.click(); close(); } }
    });
    document.querySelector('[data-palette-open]')?.addEventListener('click', open);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    list.addEventListener('click', () => close());
    input.addEventListener('input', renderList);
  }

  if (!reduced) document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
/* ===== Next-gen: decode hero, ask-the-catalog, live smoke ===== */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* D. Hero decode — overlay with per-character reserved widths; wraps exactly like the real text on every screen */
  const h1 = document.querySelector('[data-decode]');
  if (h1 && !reduced) {
    const startDecode = () => {
      const glyphs = '#$%&@!?<>/\\|{}[]*+=~^';
      const base = document.createElement('span');
      base.className = 'decode-base';
      while (h1.firstChild) base.appendChild(h1.firstChild);
      h1.appendChild(base);
      const overlay = base.cloneNode(true);
      overlay.className = 'decode-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      h1.appendChild(overlay);
      const cells = [];
      const words = [];
      const splitText = (node) => {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (part === '') return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const word = document.createElement('span');
          word.className = 'decode-word';
          word.textContent = part;
          frag.appendChild(word);
          words.push(word);
        });
        node.parentNode.replaceChild(frag, node);
      };
      const textNodes = [];
      const walk = (n) => n.childNodes.forEach((c) => { if (c.nodeType === 3 && c.textContent.length) textNodes.push(c); else if (c.nodeType === 1) walk(c); });
      walk(overlay);
      textNodes.forEach(splitText);
      words.forEach((word) => {
        word.style.width = word.getBoundingClientRect().width + 'px';
        const part = word.textContent;
        word.textContent = '';
        for (const ch of part) {
          const cell = document.createElement('span');
          cell.className = 'decode-cell';
          cell.textContent = ch;
          word.appendChild(cell);
          cells.push(cell);
        }
      });
      cells.forEach((cell) => { cell.style.width = cell.getBoundingClientRect().width + 'px'; });
      const originals = cells.map((c) => c.textContent);
      const total = cells.length;
      let start = null;
      const frame = (t) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / 1400);
        const reveal = Math.min(total, Math.floor(p * total * 1.15));
        for (let i = 0; i < total; i++) cells[i].textContent = i < reveal ? originals[i] : glyphs[(Math.random() * glyphs.length) | 0];
        if (p < 1) { requestAnimationFrame(frame); return; }
        while (base.firstChild) h1.insertBefore(base.firstChild, base);
        base.remove();
        overlay.remove();
      };
      requestAnimationFrame(frame);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { io.disconnect(); startDecode(); }
      }), { threshold: 0.4 });
      io.observe(h1);
    } else startDecode();
  }

  /* A. Ask the catalog */
  const cInput = document.querySelector('[data-catalog-input]');
  const cResults = document.querySelector('[data-catalog-results]');
  const cChips = document.querySelector('[data-catalog-chips]');
  const cNote = document.querySelector('[data-catalog-note]');
  if (cInput && cResults) {
    let entries = null;
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const show = (list) => {
      cResults.innerHTML = list.length
        ? list.map((e) => `<div class="catalog-card"><code>${esc(e.sig)}</code>${e.summary ? `<small>${esc(e.summary)}</small>` : ''}<em>${esc(e.file)}</em></div>`).join('')
        : '<div class="catalog-note">No matching public method in the catalog.</div>';
    };
    const search = (q) => {
      if (!entries) return;
      const tokens = q.toLowerCase().split(/[\s:()]+/).filter(Boolean);
      if (!tokens.length) { show(entries.slice(0, 4)); return; }
      const scored = entries
        .map((e) => ({ e, s: tokens.reduce((acc, t) => acc + ((e.sig + ' ' + e.summary).toLowerCase().includes(t) ? 1 : 0), 0) }))
        .filter((r) => r.s === tokens.length)
        .slice(0, 8)
        .map((r) => r.e);
      show(scored);
    };
    const load = () => {
      if (entries) return Promise.resolve(true);
      return fetch('docs/api.json')
        .then((r) => r.json())
        .then((api) => {
          entries = [];
          (api.libraries || []).forEach((lib) => (lib.public_methods || []).forEach((m) => {
            entries.push({ sig: lib.name + '::' + m.name + '(' + (m.parameters || '') + ')' + (m.return ? ': ' + m.return : ''), summary: m.summary || '', file: lib.file });
          }));
          return true;
        })
        .catch(() => { if (cNote) cNote.hidden = false; return false; });
    };
    ['PHRO::get', 'PHDB::insert', 'PHTP::enroll', 'PHJS::gen', 'PHFY::private', 'PHVD::check'].forEach((chip) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = chip;
      b.addEventListener('click', () => { cInput.value = chip; load().then(() => search(chip)); });
      if (cChips) cChips.appendChild(b);
    });
    cInput.addEventListener('focus', () => load().then(() => { if (!cInput.value) search(''); }));
    cInput.addEventListener('input', () => load().then(() => search(cInput.value)));
  }

  /* B. Live smoke visualizer */
  const smokeBox = document.querySelector('[data-smoke-lines]');
  if (smokeBox) {
    const checks = [
      'PHP runtime', 'Required extension: json', 'Required extension: openssl', 'Required extension: PDO', 'Required extension: pdo_sqlite',
      'Core PHP syntax - 32 files', 'Core loader - 10 critical classes', 'PHMO direct private log storage', 'Debug-only observability UI guards',
      'PHDE runtime debug toggle', 'PHLS integrity - wal', 'PHLS concurrent-writer and non-fatal guard protection', 'Trusted proxy and Cloudflare validation',
      'OpenSSL P-256 / VAPID capability', 'PHFY authorized private polling guard', 'PHFY PHP project context and storage namespace', 'JWT create/verify round-trip',
      'PHAU OAuth/OIDC provider matrix - 24 providers/modes', 'TOTP RFC generation/verification - SHA1, SHA256, SHA512', 'Authenticator enrollment/replay/recovery lifecycle',
      'Authenticator QR memory-safe output', 'PHED encryption round-trip', 'PHCD package path validation', 'PHCD atomic install/update and manager UI',
      'PHDB unbuffered streaming API', 'PHDB automatic schema synchronization', 'PHDB multi-driver seam (mysqli + sqlite + pgsql)', 'PHPA production-safe payment core',
      'PHPA unified courier architecture - 20 profiles', 'PHEM queued mail bridge', 'PHUI reusable kit / class / PHJS integration - 3524 entries',
      'PHUI OAuth / 2FA / payment / courier component family', 'PHUI component-template directive', 'PHJS PHP translation / template / module builder',
      'PHJS synchronized builds', 'PHJS PHP-to-JS build equivalence', 'PHJS self-contained native directive/request layer', 'PHJS component/composition lifecycle layer',
      'PHJS HTML-only declarative application layer', 'PHJS declarative enterprise keymap layer', 'PHJS secure courier UI helper', 'PHJS persistent toast reliability layer',
      'PHJS CSS-ready navigation and hover prefetch', 'PHJS secure OAuth / 2FA / hosted-payment bridge', 'PHJS device/network identity bridge', 'PHJS UTF-8 and Bengali text integrity',
      'PHJS premium UI systems - 18 modules', 'Service Worker synchronized build', 'Cache directory: css', 'Cache directory: js', 'Cache directory: php',
      'Framework canonical folder map - 22/22', 'MyStack secure main-branch updater', 'Framework documentation integrity', 'Extensible console kernel registry - 84 commands',
      'Queue stale reservation reclaim', 'CLI hardening contract', 'Documentation structure contract (BN/EN)', 'PHVD validation rule round-trip',
      'PHTM timezone and formatting helpers', 'Queue, scheduler and migration safety contract', 'Cross-platform CLI launcher and adaptive TUI',
      'Project intelligence graph', 'Route/class collision reasoning',
    ];
    const run = () => {
      smokeBox.innerHTML = '';
      if (reduced) {
        smokeBox.innerHTML = checks.map((c) => `<div><span class="pass">[PASS]</span> <span class="name">${c}</span></div>`).join('') + '<div class="done">64 PASSED / 0 FAILED / 0 WARNINGS</div>';
        return;
      }
      let i = 0;
      const tick = () => {
        if (i >= checks.length) {
          const done = document.createElement('div');
          done.className = 'done';
          done.textContent = '64 PASSED / 0 FAILED / 0 WARNINGS';
          smokeBox.appendChild(done);
          smokeBox.scrollTop = smokeBox.scrollHeight;
          return;
        }
        const line = document.createElement('div');
        line.innerHTML = `<span class="pass">[PASS]</span> <span class="name">${checks[i++]}</span>`;
        smokeBox.appendChild(line);
        smokeBox.scrollTop = smokeBox.scrollHeight;
        setTimeout(tick, i < 12 ? 70 : 38);
      };
      tick();
    };
    document.querySelector('[data-smoke-rerun]')?.addEventListener('click', run);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }), { threshold: 0.3 });
      io.observe(smokeBox);
    } else run();
  }
})();
/* ===== Flow-era polish: copy buttons, magnetic buttons, scroll-spy ===== */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Copy buttons on code blocks */
  document.querySelectorAll('.terminal pre, .steps code').forEach((target) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', () => {
      const text = Array.from(target.childNodes).filter((n) => n !== btn).map((n) => n.textContent).join('').replace(/\s+$/, '');
      const done = () => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallback());
      } else fallback();
      function fallback() {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        ta.remove();
      }
    });
    target.appendChild(btn);
  });

  /* Magnetic primary buttons */
  if (!reduced && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.button.primary').forEach((btn) => {
      btn.style.transition = 'transform .18s ease';
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* Scroll-spy dots */
  const spy = document.querySelector('[data-spy]');
  if (spy && 'IntersectionObserver' in window) {
    const secs = [...document.querySelectorAll('main section[id]')].filter((s) => s.id !== 'top');
    secs.forEach((s) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.for = s.id;
      b.setAttribute('aria-label', 'Go to ' + s.id + ' section');
      b.addEventListener('click', () => s.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }));
      spy.appendChild(b);
    });
    const dots = [...spy.children];
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) dots.forEach((d) => d.classList.toggle('active', d.dataset.for === e.target.id));
    }), { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    secs.forEach((s) => io.observe(s));
  }
})();
/* ===== Live PHJS-style demo + konami easter egg ===== */
(() => {
  'use strict';

  const showToast = (msg) => {
    let t = document.querySelector('.site-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'site-toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  };
  document.querySelector('[data-demo-toast]')?.addEventListener('click', () => showToast('Saved - no framework needed'));
  const panel = document.querySelector('[data-demo-panel]');
  document.querySelector('[data-demo-toggle]')?.addEventListener('click', () => { if (panel) panel.hidden = !panel; });
  let count = 0;
  const num = document.querySelector('[data-demo-num]');
  document.querySelector('[data-demo-count]')?.addEventListener('click', () => { if (num) num.textContent = String(++count); });

  const confetti = () => {
    const glyphs = ['*', '+', '#', 'o', 'x'];
    const colors = ['#22d3ee', '#a78bfa', '#34d399', '#fbbf24', '#f472b6'];
    for (let k = 0; k < 36; k++) {
      const s = document.createElement('span');
      s.className = 'confetti';
      s.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      s.style.color = colors[k % colors.length];
      s.style.setProperty('--cx', (Math.random() * 460 - 230) + 'px');
      s.style.setProperty('--cy', (Math.random() * 420 - 60) + 'px');
      s.style.setProperty('--cr', (Math.random() * 720 - 360) + 'deg');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1700);
    }
  };
  const openKonami = () => {
    let ov = document.querySelector('.konami');
    if (ov) ov.remove();
    ov = document.createElement('div');
    ov.className = 'konami open';
    ov.innerHTML = '<div class="terminal"><div class="terminal-bar"><span></span><span></span><span></span><b>php mystack doctor</b></div><pre data-konami-out></pre></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', () => ov.remove());
    const out = ov.querySelector('[data-konami-out]');
    const lines = [
      '$ php mystack doctor',
      '  structure ........ OK',
      '  syntax ........... OK (32 files)',
      '  permissions ...... OK',
      '  folders .......... 22/22',
      '  * HEALTHY - and you found the easter egg',
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i >= lines.length) { clearInterval(t); confetti(); return; }
      out.textContent += lines[i++] + '\n';
    }, 260);
  };
  let seq = '';
  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    seq = (seq + e.key.toLowerCase()).slice(-7);
    if (seq === 'mystack') { seq = ''; openKonami(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { const o = document.querySelector('.konami'); if (o) o.remove(); }
  });
})();
/* ─────────────────────────────────────────────────────────────
   Abundance — Global Mega Nav
   Usage: add <div id="site-nav"></div> as the first element in
   <body>, then load this script with defer.
   ───────────────────────────────────────────────────────────── */

(function () {
  /* ── CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --nav-bg: #F8F6EC;
      --nav-border: rgba(98,68,31,0.12);
      --nav-dark: #1B1B1B;
      --nav-cream: #F5F0E8;
      --nav-gold: #B58753;
      --nav-stone: #9a8f80;
      --nav-brown: #62441F;
      --nav-height: 64px;
    }

    /* ── BASE ── */
    #site-nav {
      background: var(--nav-bg);
      border-bottom: 1px solid var(--nav-border);
      position: sticky;
      top: 0;
      z-index: 1000;
      font-family: 'DM Sans', sans-serif;
    }

    .snav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
      height: var(--nav-height);
      display: flex;
      align-items: center;
      gap: 0;
    }

    /* ── LOGO ── */
    .snav-logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
      margin-right: 40px;
      text-decoration: none;
      gap: 3px;
    }
    .snav-logo img {
      height: 26px;
      width: auto;
      display: block;
    }
    .snav-logo-tagline {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--nav-stone);
      line-height: 1;
      white-space: nowrap;
    }

    /* ── MAIN LINKS ── */
    .snav-links {
      display: flex;
      align-items: stretch;
      gap: 0;
      flex: 1;
      height: 100%;
    }

    .snav-item {
      position: relative;
      display: flex;
      align-items: center;
    }

    .snav-trigger,
    .snav-link {
      display: flex;
      align-items: center;
      gap: 5px;
      height: 100%;
      padding: 0 18px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: var(--nav-dark);
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      font-family: 'DM Sans', sans-serif;
      white-space: nowrap;
      transition: color 0.15s;
    }

    .snav-trigger:hover,
    .snav-link:hover { color: var(--nav-gold); }

    .snav-trigger svg {
      width: 10px;
      height: 10px;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      transition: transform 0.2s;
      flex-shrink: 0;
    }

    /* ── DROPDOWN ── */
    .snav-dropdown {
      position: absolute;
      top: calc(100% + 0px);
      left: 0;
      min-width: 280px;
      background: var(--nav-bg);
      border: 1px solid var(--nav-border);
      border-top: 2px solid var(--nav-gold);
      border-radius: 0 0 6px 6px;
      padding: 8px;
      box-shadow: 0 16px 40px rgba(27,27,27,0.12);
      opacity: 0;
      pointer-events: none;
      transform: translateY(6px);
      transition: opacity 0.18s ease, transform 0.18s ease;
    }

    .snav-item:hover .snav-dropdown,
    .snav-item:focus-within .snav-dropdown {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }

    .snav-item:hover .snav-trigger svg {
      transform: rotate(180deg);
    }

    /* ── DROPDOWN ITEM ── */
    .snav-dd-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 14px 16px;
      border-radius: 4px;
      text-decoration: none;
      color: var(--nav-dark);
      transition: background 0.15s;
    }
    .snav-dd-item:hover { background: rgba(181,135,83,0.08); }

    .snav-dd-icon {
      width: 38px;
      height: 38px;
      background: rgba(181,135,83,0.1);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .snav-dd-icon svg {
      width: 18px;
      height: 18px;
      stroke: var(--nav-gold);
      fill: none;
      stroke-width: 1.5;
    }

    .snav-dd-text {}
    .snav-dd-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--nav-dark);
      display: block;
      line-height: 1.3;
    }
    .snav-dd-desc {
      font-size: 12px;
      color: var(--nav-stone);
      display: block;
      margin-top: 2px;
      line-height: 1.4;
    }

    /* ── CTA BUTTON ── */
    .snav-cta {
      display: inline-block;
      background: var(--nav-dark);
      color: var(--nav-cream);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 11px 24px;
      border-radius: 4px;
      text-decoration: none;
      transition: background 0.2s;
      margin-left: auto;
      white-space: nowrap;
    }
    .snav-cta:hover { background: var(--nav-brown); }

    /* ── MOBILE HAMBURGER ── */
    .snav-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
      margin-left: auto;
    }
    .snav-hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--nav-dark);
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.2s ease;
    }
    .snav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .snav-hamburger.open span:nth-child(2) { opacity: 0; }
    .snav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ── MOBILE DRAWER ── */
    .snav-drawer {
      display: none;
      flex-direction: column;
      background: var(--nav-bg);
      border-top: 1px solid var(--nav-border);
      padding: 8px 0 24px;
    }
    .snav-drawer.open { display: flex; }

    .snav-drawer-section {
      padding: 0 20px;
    }
    .snav-drawer-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--nav-stone);
      padding: 18px 0 8px;
      display: block;
    }
    .snav-drawer-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      text-decoration: none;
      color: var(--nav-dark);
      font-size: 15px;
      font-weight: 600;
      border-bottom: 1px solid var(--nav-border);
    }
    .snav-drawer-link:last-child { border-bottom: none; }

    .snav-drawer-desc {
      font-size: 12px;
      font-weight: 400;
      color: var(--nav-stone);
      display: block;
    }

    .snav-drawer-cta {
      display: block;
      margin: 20px 20px 0;
      background: var(--nav-dark);
      color: var(--nav-cream);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-align: center;
      padding: 16px;
      border-radius: 4px;
      text-decoration: none;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 860px) {
      .snav-inner { padding: 0 20px; }
      .snav-links { display: none; }
      .snav-cta { display: none; }
      .snav-hamburger { display: flex; }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML ── */
  const currentPath = window.location.pathname;

  const html = `
    <div class="snav-inner">
      <a class="snav-logo" href="/">
        <img src="/assets/images/logo-dark-wordmark.svg" alt="Abundance">
        <span class="snav-logo-tagline">AI-Powered Growth Systems</span>
      </a>

      <nav class="snav-links" aria-label="Main navigation">

        <!-- Grow a Business -->
        <div class="snav-item">
          <button class="snav-trigger" aria-haspopup="true" aria-expanded="false">
            Grow a Business
            <svg viewBox="0 0 10 6" aria-hidden="true"><polyline points="1,1 5,5 9,1"/></svg>
          </button>
          <div class="snav-dropdown" role="menu">
            <a href="/tribe" class="snav-dd-item" role="menuitem">
              <div class="snav-dd-icon">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="snav-dd-text">
                <span class="snav-dd-title">Abundance Tribe</span>
                <span class="snav-dd-desc">Monthly membership with frameworks, coaching, and community for service founders.</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Free Training -->
        <a href="/free" class="snav-link">Free Training</a>

      </nav>

      <a href="/tribe" class="snav-cta">Join the Tribe</a>

      <!-- Hamburger -->
      <button class="snav-hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Drawer (appended to #site-nav, outside snav-inner) -->
    <div class="snav-drawer" id="snav-drawer" aria-hidden="true">
      <div class="snav-drawer-section">
        <span class="snav-drawer-label">Grow a Business</span>
        <a href="/tribe" class="snav-drawer-link">
          Abundance Tribe
          <span class="snav-drawer-desc">Membership for service founders</span>
        </a>
      </div>
      <div class="snav-drawer-section">
        <span class="snav-drawer-label">Learn</span>
        <a href="/free" class="snav-drawer-link">Free Training</a>
      </div>
      <a href="/tribe" class="snav-drawer-cta">Join the Tribe</a>
    </div>
  `;

  const mount = document.getElementById('site-nav');
  if (!mount) return;

  // Allow per-page CTA override via data attributes
  const ctaHref  = mount.dataset.ctaHref  || '/tribe';
  const ctaLabel = mount.dataset.ctaLabel || 'Join the Tribe';
  const finalHtml = html
    .replace(/href="\/tribe" class="snav-cta"/g,  `href="${ctaHref}" class="snav-cta"`)
    .replace(/href="\/tribe" class="snav-drawer-cta"/g, `href="${ctaHref}" class="snav-drawer-cta"`)
    .replace(/>Join the Tribe<\/a>/g, `>${ctaLabel}</a>`);

  mount.innerHTML = finalHtml;

  /* ── JS INTERACTIONS ── */
  // Hamburger toggle
  const hamburger = document.querySelector('.snav-hamburger');
  const drawer = document.getElementById('snav-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });
  }

  // Close drawer on outside click
  document.addEventListener('click', function (e) {
    if (drawer && drawer.classList.contains('open')) {
      if (!document.getElementById('site-nav').contains(e.target)) {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        drawer.setAttribute('aria-hidden', true);
      }
    }
  });

  // Close drawer when a link inside it is clicked
  if (drawer) {
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }

  // Keyboard: close dropdown on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (drawer && drawer.classList.contains('open')) {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      }
    }
  });
})();

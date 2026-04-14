/* ─────────────────────────────────────────────────────────────
   Abundance — Global Mega Nav
   Usage: add <div id="site-nav"></div> as the first element in
   <body>, then load this script with defer.
   Per-page CTA override: <div id="site-nav" data-cta-href="/foo" data-cta-label="Label">
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
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.14em;
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

    /* ── SOON BADGE ── */
    .snav-soon {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--nav-stone);
      background: rgba(154,143,128,0.15);
      padding: 2px 5px;
      border-radius: 3px;
      line-height: 1.4;
    }

    /* ── PARTNER LINK (gold accent) ── */
    .snav-link-partner {
      color: var(--nav-dark);
    }
    .snav-link-partner:hover { color: var(--nav-gold); }

    /* ── DROPDOWN ── */
    .snav-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 320px;
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

    /* ── DROPDOWN DIVIDER ── */
    .snav-dd-divider {
      height: 1px;
      background: var(--nav-border);
      margin: 6px 8px;
    }

    /* ── DROPDOWN ITEM ── */
    .snav-dd-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 12px 16px;
      border-radius: 4px;
      text-decoration: none;
      color: var(--nav-dark);
      transition: background 0.15s;
    }
    .snav-dd-item:hover { background: rgba(181,135,83,0.08); }

    .snav-dd-icon {
      width: 36px;
      height: 36px;
      background: rgba(181,135,83,0.1);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .snav-dd-icon svg {
      width: 16px;
      height: 16px;
      stroke: var(--nav-gold);
      fill: none;
      stroke-width: 1.5;
    }

    .snav-dd-text {}
    .snav-dd-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--nav-dark);
      display: block;
      line-height: 1.3;
    }
    .snav-dd-desc {
      font-size: 11px;
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
      flex-direction: column;
      padding: 12px 0;
      text-decoration: none;
      color: var(--nav-dark);
      font-size: 15px;
      font-weight: 600;
      border-bottom: 1px solid var(--nav-border);
      gap: 2px;
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
    @media (max-width: 900px) {
      .snav-inner { padding: 0 20px; }
      .snav-links { display: none; }
      .snav-cta { display: none; }
      .snav-hamburger { display: flex; }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML ── */
  const html = `
    <div class="snav-inner">
      <a class="snav-logo" href="/">
        <img src="/assets/images/logo-dark-wordmark.svg" alt="Abundance">
        <span class="snav-logo-tagline">Growth Systems for Founders</span>
      </a>

      <nav class="snav-links" aria-label="Main navigation">

        <!-- Start a Business -->
        <a href="/shift" class="snav-link">
          Start a Business
          <span class="snav-soon">Soon</span>
        </a>

        <!-- Grow a Business -->
        <div class="snav-item">
          <button class="snav-trigger" aria-haspopup="true" aria-expanded="false">
            Grow a Business
            <svg viewBox="0 0 10 6" aria-hidden="true"><polyline points="1,1 5,5 9,1"/></svg>
          </button>
          <div class="snav-dropdown" role="menu">

            <a href="/free" class="snav-dd-item" role="menuitem">
              <div class="snav-dd-icon">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div class="snav-dd-text">
                <span class="snav-dd-title">Free Training</span>
                <span class="snav-dd-desc">3 video trainings covering the core Selling System.</span>
              </div>
            </a>

            <a href="/tribe" class="snav-dd-item" role="menuitem">
              <div class="snav-dd-icon">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="snav-dd-text">
                <span class="snav-dd-title">Abundance Tribe</span>
                <span class="snav-dd-desc">Monthly membership. Frameworks, coaching, and community.</span>
              </div>
            </a>

            <div class="snav-dd-divider"></div>

            <a href="/shift" class="snav-dd-item" role="menuitem">
              <div class="snav-dd-icon">
                <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div class="snav-dd-text">
                <span class="snav-dd-title">Abundance Shift</span>
                <span class="snav-dd-desc">4-month program. Build the foundation, stop being the bottleneck.</span>
              </div>
            </a>

            <a href="/unlocked" class="snav-dd-item" role="menuitem">
              <div class="snav-dd-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
              </div>
              <div class="snav-dd-text">
                <span class="snav-dd-title">Abundance Unlocked</span>
                <span class="snav-dd-desc">Coaching and done-with-you. Remove the ceiling, scale to $100k/mo.</span>
              </div>
            </a>

            <a href="/freedom" class="snav-dd-item" role="menuitem">
              <div class="snav-dd-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <div class="snav-dd-text">
                <span class="snav-dd-title">Abundance Freedom</span>
                <span class="snav-dd-desc">Mastermind for founders operating at $100k+/mo.</span>
              </div>
            </a>

          </div>
        </div>

        <!-- Growth Partnership (standalone) -->
        <a href="/partner" class="snav-link snav-link-partner">Growth Partnership</a>

      </nav>

      <a href="__CTA_HREF__" class="snav-cta">__CTA_LABEL__</a>

      <!-- Hamburger -->
      <button class="snav-hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div class="snav-drawer" id="snav-drawer" aria-hidden="true">

      <div class="snav-drawer-section">
        <span class="snav-drawer-label">Start a Business</span>
        <a href="/shift" class="snav-drawer-link">
          Start a Business
          <span class="snav-drawer-desc">Coming soon — inquiries directed to Abundance Shift</span>
        </a>
      </div>

      <div class="snav-drawer-section">
        <span class="snav-drawer-label">Grow a Business</span>
        <a href="/free" class="snav-drawer-link">
          Free Training
          <span class="snav-drawer-desc">3 video trainings on the Selling System</span>
        </a>
        <a href="/tribe" class="snav-drawer-link">
          Abundance Tribe
          <span class="snav-drawer-desc">Monthly membership for service founders</span>
        </a>
        <a href="/shift" class="snav-drawer-link">
          Abundance Shift
          <span class="snav-drawer-desc">4-month coaching program</span>
        </a>
        <a href="/unlocked" class="snav-drawer-link">
          Abundance Unlocked
          <span class="snav-drawer-desc">Scale to $100k/mo</span>
        </a>
        <a href="/freedom" class="snav-drawer-link">
          Abundance Freedom
          <span class="snav-drawer-desc">Mastermind at the top level</span>
        </a>
      </div>

      <div class="snav-drawer-section">
        <span class="snav-drawer-label">Growth Partnership</span>
        <a href="/partner" class="snav-drawer-link">
          Abundance Growth Partnership
          <span class="snav-drawer-desc">Embedded GTM strategy and leadership for established founders</span>
        </a>
      </div>

      <a href="__CTA_HREF__" class="snav-drawer-cta">__CTA_LABEL__</a>
    </div>
  `;

  const mount = document.getElementById('site-nav');
  if (!mount) return;

  // Per-page CTA override via data attributes
  const ctaHref  = mount.dataset.ctaHref  || '/tribe';
  const ctaLabel = mount.dataset.ctaLabel || 'Join the Tribe';
  const finalHtml = html
    .replace(/__CTA_HREF__/g, ctaHref)
    .replace(/__CTA_LABEL__/g, ctaLabel);

  mount.innerHTML = finalHtml;

  /* ── JS INTERACTIONS ── */
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

  // Close drawer when a link is clicked
  if (drawer) {
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }

  // Keyboard: close on Escape
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

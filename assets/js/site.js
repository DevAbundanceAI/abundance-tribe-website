/* Abundance · shared page behaviour for /, /scale, /build.
   (/ai carries its own inline copy of the same three blocks.) */
(function () {
  /* Calendar: swap the iframe in only once there is a URL for it. */
  var cfg = window.CONFIG || {};
  var frame = document.getElementById('calendar');
  var empty = document.getElementById('cal-empty');
  if (frame && empty && cfg.CALENDAR_URL) {
    frame.src = cfg.CALENDAR_URL; frame.hidden = false; empty.hidden = true;
  }

  /* Float-nav auto-hide on scroll, plus the phone drawer. */
  var nav = document.getElementById('float-nav');
  var mobile = document.getElementById('fn-mobile');
  var burger = document.getElementById('fn-burger');
  if (nav) {
    var lastY = window.scrollY, ticking = false;
    var onScroll = function () {
      var y = window.scrollY;
      if (y < 120) nav.classList.remove('hidden');
      else if (y > lastY + 4) {
        nav.classList.add('hidden');
        if (mobile) mobile.classList.remove('open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      } else if (y < lastY - 4) nav.classList.remove('hidden');
      lastY = y; ticking = false;
    };
    document.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    if (burger && mobile) {
      burger.addEventListener('click', function () {
        var open = mobile.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      mobile.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobile.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* Cursor-tied light field in the hero. Pointer only, off under
     reduced motion. */
  var hero = document.querySelector('.hero');
  var light = document.getElementById('hero-light');
  if (!hero || !light) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  var queued = false, px = 50, py = 38;
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width) * 100;
    py = ((e.clientY - r.top) / r.height) * 100;
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(function () {
        light.style.setProperty('--mx', px + '%');
        light.style.setProperty('--my', py + '%');
        queued = false;
      });
    }
  }, { passive: true });
})();

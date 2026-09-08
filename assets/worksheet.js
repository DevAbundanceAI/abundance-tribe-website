/* ═══════════════════════════════════════════════════════════════════
   ABUNDANCE · THE ABUNDANCE LOOP · WORKSHEET ENGINE · v1.0
   Vanilla. No dependencies. Progressive: the page is a usable printed
   worksheet with JS off.

   Fields are keyed by their stable `name` attribute, never by DOM
   position, so editing a page later cannot corrupt saved answers.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── persistence adapter ──────────────────────────────────────────
     Swap this one object for a fetch-based adapter when accounts ship.
     Same three methods, returning promises, and nothing else changes. */
  var Store = {
    load: function (key) {
      try { return JSON.parse(localStorage.getItem(key) || '{}'); }
      catch (e) { return {}; }
    },
    save: function (key, data) {
      try { localStorage.setItem(key, JSON.stringify(data)); return true; }
      catch (e) { return false; }
    },
    clear: function (key) {
      try { localStorage.removeItem(key); } catch (e) {}
    }
  };

  var root = document.querySelector('[data-sheet]');
  if (!root) return;

  var KEY = 'abundance_loop_' + root.getAttribute('data-sheet');
  var status = document.querySelector('[data-status]');
  var saveTimer = null, flashTimer = null;

  function fields() {
    return Array.prototype.slice.call(root.querySelectorAll('[name]'));
  }

  /* ── read / write the whole sheet ─────────────────────────────── */
  function collect() {
    var out = {};
    fields().forEach(function (el) {
      if (el.type === 'radio') { if (el.checked) out[el.name] = el.value; }
      else if (el.type === 'checkbox') { out[el.name] = el.checked; }
      else { if (el.value !== '') out[el.name] = el.value; }
    });
    return out;
  }

  function hydrate(data) {
    fields().forEach(function (el) {
      if (!(el.name in data)) return;
      var v = data[el.name];
      if (el.type === 'radio') { el.checked = (el.value === v); }
      else if (el.type === 'checkbox') { el.checked = !!v; }
      else { el.value = v; }
    });
  }

  /* ── status line ──────────────────────────────────────────────── */
  function say(msg, flash) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle('flash', !!flash);
    if (flash) {
      clearTimeout(flashTimer);
      flashTimer = setTimeout(function () {
        status.textContent = 'Saved in this browser';
        status.classList.remove('flash');
      }, 1600);
    }
  }

  function save() {
    var ok = Store.save(KEY, collect());
    say(ok ? 'Saved' : 'Could not save (storage blocked)', ok);
  }

  function queueSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 500);
  }

  /* ── auto-growing textareas (WYSIWYG print) ───────────────────── */
  function grow(el) {
    var line = parseFloat(getComputedStyle(el).lineHeight) || 28;
    var min = parseInt(el.getAttribute('data-min-lines') || '2', 10);
    el.style.height = 'auto';
    var lines = Math.max(min, Math.ceil(el.scrollHeight / line));
    el.style.height = (lines * line + 3) + 'px';
  }
  function growAll() {
    root.querySelectorAll('textarea').forEach(grow);
  }

  /* ── declarative helpers ──────────────────────────────────────── */
  function val(name) {
    var el = root.querySelector('[name="' + name + '"]');
    if (!el) return '';
    if (el.type === 'radio') {
      var on = root.querySelector('[name="' + name + '"]:checked');
      return on ? on.value : '';
    }
    return el.value;
  }
  function num(name) {
    var n = parseFloat(val(name));
    return isNaN(n) ? null : n;
  }
  function list(attr) {
    return (attr || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function round1(n) {
    return (Math.round(n * 10) / 10).toString();
  }

  /* mirrors: <span data-mirror="a1" data-empty="..."> echoes that field */
  function runMirrors() {
    root.querySelectorAll('[data-mirror]').forEach(function (el) {
      el.textContent = val(el.getAttribute('data-mirror')).trim();
    });
  }

  /* derived dates: <input data-date-from="wk_start" data-add-days="6"> */
  function runDates() {
    root.querySelectorAll('[data-date-from]').forEach(function (el) {
      var src = val(el.getAttribute('data-date-from'));
      if (!src) return;
      if (el.value && el.dataset.autofilled !== src) return; // respect a manual edit
      var d = new Date(src + 'T00:00:00');
      if (isNaN(d)) return;
      d.setDate(d.getDate() + parseInt(el.getAttribute('data-add-days') || '0', 10));
      el.value = d.toISOString().slice(0, 10);
      el.dataset.autofilled = src;
    });
  }

  /* counters: <span data-count-of="focus" data-count-max="3"> */
  function runCounts() {
    root.querySelectorAll('[data-count-of]').forEach(function (el) {
      var group = el.getAttribute('data-count-of');
      var max = parseInt(el.getAttribute('data-count-max') || '0', 10);
      var n = root.querySelectorAll('[data-group="' + group + '"]:checked').length;
      el.textContent = n + ' of ' + max + ' selected';
      el.classList.toggle('over', max > 0 && n > max);
    });
  }

  /* scores: <b data-calc="..." data-fields="..."> */
  function runCalcs() {
    root.querySelectorAll('[data-calc]').forEach(function (el) {
      var kind = el.getAttribute('data-calc');
      var out = '';

      if (kind === 'tri') {
        // kept = 1, partial = 0.5, missed = 0
        var names = list(el.getAttribute('data-fields'));
        var any = false, sum = 0;
        names.forEach(function (n) {
          var v = num(n);
          if (v !== null) { sum += v; any = true; }
        });
        out = any ? round1(sum) + ' / ' + names.length : '_ / ' + names.length;

      } else if (kind === 'avg') {
        var ns = list(el.getAttribute('data-fields'));
        var got = [], t = 0;
        ns.forEach(function (n) {
          var v = num(n);
          if (v !== null) { got.push(v); t += v; }
        });
        out = got.length === ns.length ? round1(t / ns.length) + ' / 10' : '_ / 10';

      } else if (kind === 'value') {
        var v1 = val(el.getAttribute('data-fields'));
        out = v1 ? v1 + ' / 10' : '_ / 10';

      } else if (kind === 'delta') {
        var a = num(el.getAttribute('data-from'));
        var b = num(el.getAttribute('data-to'));
        if (a === null || b === null) { out = ''; }
        else { var d3 = b - a; out = (d3 > 0 ? '+' : '') + round1(d3); }

      } else if (kind === 'ratio') {
        // done vs target, across paired fields
        var dn = list(el.getAttribute('data-done'));
        var tn = list(el.getAttribute('data-target'));
        var done = 0, target = 0, seen = false;
        for (var i = 0; i < tn.length; i++) {
          var t2 = num(tn[i]), d2 = num(dn[i]);
          if (t2 !== null) { target += t2; seen = true; }
          if (d2 !== null) { done += d2; seen = true; }
        }
        if (!seen || target <= 0) { out = '_ %'; }
        else { out = Math.round((done / target) * 100) + '%'; }
      }

      el.textContent = out;
    });
  }

  function recompute() {
    runMirrors(); runDates(); runCounts(); runCalcs(); markEmptyDates();
  }

  /* ── wire up ──────────────────────────────────────────────────── */
  hydrate(Store.load(KEY));
  growAll();
  recompute();
  say('Saved in this browser');

  root.addEventListener('input', function (e) {
    if (e.target.tagName === 'TEXTAREA') grow(e.target);
    recompute();
    queueSave();
  });
  root.addEventListener('change', function () {
    recompute();
    queueSave();
  });

  var clearBtn = document.querySelector('[data-clear]');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (!confirm('Clear every answer on this worksheet? This cannot be undone.')) return;
      fields().forEach(function (el) {
        if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
        else el.value = '';
        delete el.dataset.autofilled;
      });
      Store.clear(KEY);
      growAll();
      recompute();
      say('Cleared', true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var printBtn = document.querySelector('[data-print]');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      save();
      window.print();
    });
  }

  function markEmptyDates() {
    root.querySelectorAll('input[type=date]').forEach(function (el) {
      el.classList.toggle('is-empty', !el.value);
    });
  }

  window.addEventListener('beforeprint', function () { growAll(); markEmptyDates(); });
  window.addEventListener('resize', growAll);
  document.fonts && document.fonts.ready && document.fonts.ready.then(growAll);
})();

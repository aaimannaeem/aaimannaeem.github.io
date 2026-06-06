/* ============================================================
   Aaiman Naeem — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---- Theme toggle ---- */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Follow OS theme until the visitor chooses ---- */
  var mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', function (e) {
    var stored;
    try { stored = localStorage.getItem('theme'); } catch (err) {}
    if (!stored) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  /* ---- Mobile menu ---- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var hamIcon = document.getElementById('hamIcon');
  var openPath = 'M18 6 6 18M6 6l12 12';
  var closedPath = 'M3 6h18M3 12h18M3 18h18';
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    hamIcon.innerHTML = '<path d="' + (open ? openPath : closedPath) + '"/>';
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---- Sticky header shadow ---- */
  var header = document.getElementById('header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var target = +el.getAttribute('data-count');
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
  }

  /* ---- Language bars ---- */
  var bars = document.querySelectorAll('.lang-bar span');
  if ('IntersectionObserver' in window) {
    var bo = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.style.width = entry.target.getAttribute('data-level') + '%'; obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    bars.forEach(function (el) { bo.observe(el); });
  } else {
    bars.forEach(function (el) { el.style.width = el.getAttribute('data-level') + '%'; });
  }

  /* ---- Active nav link on scroll (scroll spy) ---- */
  var sections = document.querySelectorAll('main section[id]');
  var linkMap = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    linkMap[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Object.keys(linkMap).forEach(function (id) { linkMap[id].classList.remove('active'); });
          var active = linkMap[entry.target.id];
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }
})();

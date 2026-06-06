/* =========================================================
   Aaiman Naeem — Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  // Sync the toggle's initial pressed state with whatever the boot script set.
  applyTheme(root.getAttribute("data-theme") || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Follow the OS if the visitor hasn't explicitly chosen a theme.
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", function (e) {
    var stored;
    try { stored = localStorage.getItem("theme"); } catch (err) {}
    if (!stored) applyTheme(e.matches ? "dark" : "light");
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Active nav link ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Stat count-up ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-target")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReducedMotion) { el.textContent = target + suffix; return; }

    var duration = 1100;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll("[data-target]");
  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { countObserver.observe(c); });
  } else {
    counters.forEach(countUp);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

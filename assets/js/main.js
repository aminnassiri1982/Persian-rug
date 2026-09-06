/* ============================================================
   The Nain Pair — a family carpet offered for sale
   No dependencies. Everything degrades gracefully without JS.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header: solid background once past the hero ---------- */

  var header = document.querySelector('.site-header');
  var hero = document.getElementById('hero');
  var stickybar = document.getElementById('stickybar');

  function onScroll() {
    var past = window.scrollY > (hero ? hero.offsetHeight - 100 : 120);
    header.classList.toggle('is-stuck', past);
    if (stickybar) stickybar.classList.toggle('is-visible', past);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile navigation ---------- */

  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      header.classList.toggle('is-nav-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      header.classList.remove('is-nav-open');
    });
  }

  /* ---------- reveal on scroll ---------- */

  var revealables = document.querySelectorAll('.reveal');

  function revealAll() {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    // Only now is it safe to hide anything.
    document.documentElement.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { io.observe(el); });

    // Failsafe: whatever has not been reached in six seconds is shown anyway.
    setTimeout(revealAll, 6000);

    // Printing or searching the page should never miss hidden text.
    window.addEventListener('beforeprint', revealAll);
  }

  /* ---------- gallery lightbox ---------- */

  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-caption');
  var current = 0;
  var lastFocused = null;

  function captionFor(item) {
    return item.getAttribute('data-caption') ||
      (item.querySelector('figcaption') ? item.querySelector('figcaption').textContent : '');
  }

  function show(i) {
    current = (i + items.length) % items.length;
    var img = items[current].querySelector('img');
    // Lazy images below the fold may not have resolved yet, so the
    // viewer falls back to the placeholder just as the grid does.
    lbImg.onerror = function () { lbImg.src = 'assets/images/placeholder.svg'; };
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCap.innerHTML = captionFor(items[current]);
  }

  function openLb(i) {
    lastFocused = document.activeElement;
    show(i);
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    document.getElementById('lb-close').focus();
  }

  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { lb.hidden = true; lbImg.src = ''; }, 280);
    if (lastFocused) lastFocused.focus();
  }

  if (lb && items.length) {
    items.forEach(function (item, i) {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', 'View: ' + item.querySelector('img').alt);
      item.addEventListener('click', function () { openLb(i); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
      });
    });

    document.getElementById('lb-close').addEventListener('click', closeLb);
    document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });

    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- current year, if a footer ever needs it ---------- */

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

})();

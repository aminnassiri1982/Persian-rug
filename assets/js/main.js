/* ============================================================
   The Nain Pair — Lot 01
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

  /* ---------- countdown to the close of bidding ----------
     The closing date is set on <section class="auction"
     data-auction-end="..."> in index.html.
     ------------------------------------------------------- */

  var auction = document.getElementById('auction');
  var dateLine = document.getElementById('auction-date');
  var stickyTime = document.getElementById('stickybar-time');
  var cd = {};
  ['days', 'hours', 'minutes', 'seconds'].forEach(function (k) {
    cd[k] = document.querySelector('[data-cd="' + k + '"]');
  });

  if (auction && cd.days) {
    var end = new Date(auction.getAttribute('data-auction-end'));

    if (isNaN(end.getTime())) {
      if (dateLine) dateLine.textContent = 'Closing date to be announced.';
    } else {
      if (dateLine) {
        dateLine.textContent = 'Closes ' + end.toLocaleString(undefined, {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
        }) + '.';
      }

      var pad = function (n) { return n < 10 ? '0' + n : String(n); };

      var tick = function () {
        var diff = end.getTime() - Date.now();

        if (diff <= 0) {
          ['days', 'hours', 'minutes', 'seconds'].forEach(function (k) { cd[k].textContent = '00'; });
          if (dateLine) dateLine.textContent = 'Bidding has closed. Enquiries are still welcome.';
          if (stickyTime) stickyTime.textContent = 'Bidding closed';
          clearInterval(timer);
          return;
        }

        var s = Math.floor(diff / 1000);
        var d = Math.floor(s / 86400);
        var h = Math.floor((s % 86400) / 3600);
        var m = Math.floor((s % 3600) / 60);
        var sec = s % 60;

        cd.days.textContent = pad(d);
        cd.hours.textContent = pad(h);
        cd.minutes.textContent = pad(m);
        cd.seconds.textContent = pad(sec);

        if (stickyTime) {
          stickyTime.textContent = d > 0
            ? d + ' days ' + pad(h) + 'h left to bid'
            : pad(h) + ':' + pad(m) + ':' + pad(sec) + ' left to bid';
        }
      };

      tick();
      var timer = setInterval(tick, 1000);
    }
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

  /* ---------- enquiry form ----------
     With no back end, this composes an email in the visitor's own
     mail client. README.md explains how to point it at a form
     service instead, so enquiries arrive in your inbox directly.
     ----------------------------------- */

  var form = document.getElementById('inquiry-form');
  var note = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = ['name', 'email'];
      var missing = false;

      required.forEach(function (n) {
        var field = form.elements[n];
        var ok = field.value.trim() !== '' && (n !== 'email' || /.+@.+\..+/.test(field.value));
        field.classList.toggle('is-invalid', !ok);
        if (!ok) missing = true;
      });

      if (missing) {
        note.textContent = 'Please add your name and a valid email address.';
        note.classList.add('is-error');
        return;
      }

      note.classList.remove('is-error');

      var to = form.getAttribute('data-inquiry-email');
      var subject = 'Lot 01, Nain Grand Carpet — ' + form.elements.interest.value;
      var body = [
        'Name: ' + form.elements.name.value,
        'Email: ' + form.elements.email.value,
        'Telephone: ' + (form.elements.phone.value || '—'),
        'Enquiry: ' + form.elements.interest.value,
        '',
        form.elements.message.value || ''
      ].join('\n');

      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      note.textContent = 'Opening your email client — send the message to complete your enquiry.';
    });
  }

  /* ---------- current year, if a footer ever needs it ---------- */

  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

})();

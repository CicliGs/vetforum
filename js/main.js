(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ——— Mobile menu ——— */
  function initMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var openBtn = document.querySelector('.navbar .navbar-toggle');
    var closeBtn = document.querySelector('.mobile-menu__close');

    if (!menu) return;

    function open() {
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    menu.querySelectorAll('.mobile-menu__nav a').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  /* ——— Smooth anchors ——— */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ——— Reveal on scroll ——— */
  function initReveal() {
    var nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    nodes.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ——— Back to top ——— */
  function initToTop() {
    var hero = document.querySelector('.hero-section');
    var btn = document.getElementById('toTop');
    if (!hero || !btn) return;

    var observer = new IntersectionObserver(function (entries) {
      btn.classList.toggle('show', !entries[0].isIntersecting);
    }, { threshold: 0.01 });

    observer.observe(hero);
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ——— Active nav by section ——— */
  function initActiveNav() {
    var programCard = document.getElementById('program');
    var tracked = ['about', 'contacts', 'magazine']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    function activateInMenu(menuSelector, sectionId) {
      var menu = document.querySelector(menuSelector);
      if (!menu) return;

      menu.querySelectorAll('li').forEach(function (item) {
        item.classList.remove('is-active');
      });

      if (!sectionId) return;

      var links = menu.querySelectorAll('a[href^="#"]');
      var matches = Array.prototype.filter.call(links, function (link) {
        return link.getAttribute('href') === '#' + sectionId;
      });
      if (!matches.length) return;

      var activeLink = matches.find(function (link) {
        return link.getAttribute('data-nav-priority') === 'partners';
      }) || matches[0];

      if (activeLink && activeLink.parentElement) {
        activeLink.parentElement.classList.add('is-active');
      }
    }

    function setActive(sectionId) {
      activateInMenu('.navbar-menu', sectionId);
      activateInMenu('.mobile-menu__nav', sectionId);

      var smiItem = document.querySelector('.navbar-menu__smi');
      if (smiItem) {
        smiItem.classList.toggle('is-active', sectionId === 'magazine');
      }
    }

    function update() {
      if (window.scrollY < 80) {
        setActive('about');
        return;
      }

      var marker = window.scrollY + window.innerHeight * 0.28;
      var current = null;

      tracked.forEach(function (section) {
        if (section.offsetTop <= marker) current = section.id;
      });

      if (!current && programCard) {
        var rect = programCard.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 120) {
          current = 'program';
        }
      }

      setActive(current);
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ——— Desktop СМИ panel ——— */
  function initSmiPanel() {
    var navbar = document.querySelector('.navbar');
    var trigger = document.querySelector('.nav-smi-trigger');
    var panel = document.getElementById('nav-smi-panel');
    var menuItem = document.querySelector('.navbar-menu__smi');
    if (!navbar || !trigger || !panel || !menuItem) return;

    var closeTimer;
    var hoverOk = window.matchMedia('(hover: hover) and (min-width: 1301px)');

    function close() {
      navbar.classList.remove('is-smi-open');
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }

    function open() {
      navbar.classList.add('is-smi-open');
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      menuItem.classList.add('is-active');
      document.querySelectorAll('.navbar-menu li').forEach(function (item) {
        if (!item.classList.contains('navbar-menu__smi')) {
          item.classList.remove('is-active');
        }
      });
    }

    trigger.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    if (hoverOk.matches) {
      menuItem.addEventListener('mouseenter', function () {
        window.clearTimeout(closeTimer);
        open();
      });
      panel.addEventListener('mouseenter', function () {
        window.clearTimeout(closeTimer);
        open();
      });
      menuItem.addEventListener('mouseleave', function () {
        closeTimer = window.setTimeout(close, 120);
      });
      panel.addEventListener('mouseleave', function () {
        closeTimer = window.setTimeout(close, 120);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    panel.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', close);
    });
    document.querySelectorAll('.navbar-menu a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  /* ——— Mobile СМИ accordion ——— */
  function initMobileSmi() {
    var toggle = document.querySelector('.mobile-menu__smi-toggle');
    var panel = document.querySelector('.mobile-menu__smi-panel');
    var item = document.querySelector('.mobile-menu__smi');
    if (!toggle || !panel || !item) return;

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.hidden = isOpen;
      item.classList.toggle('is-open', !isOpen);
    });
  }

  /* ——— Features slider (mobile) ——— */
  function initFeaturesSlider() {
    var slider = document.getElementById('features-slider');
    var prev = document.querySelector('.features-nav__btn--prev');
    var next = document.querySelector('.features-nav__btn--next');
    if (!slider || !prev || !next) return;

    function step() {
      var card = slider.querySelector('.feature-card');
      if (!card) return 0;
      var styles = window.getComputedStyle(slider);
      var gap = parseFloat(styles.columnGap || styles.gap || '12') || 12;
      return card.offsetWidth + gap;
    }

    function flash(btn) {
      btn.classList.add('is-pressed');
      window.setTimeout(function () {
        btn.classList.remove('is-pressed');
      }, 180);
    }

    prev.addEventListener('click', function () {
      flash(prev);
      slider.scrollBy({ left: -step(), behavior: 'smooth' });
    });

    next.addEventListener('click', function () {
      flash(next);
      slider.scrollBy({ left: step(), behavior: 'smooth' });
    });
  }

  onReady(function () {
    initMobileMenu();
    initSmoothAnchors();
    initReveal();
    initToTop();
    initActiveNav();
    initSmiPanel();
    initMobileSmi();
    initFeaturesSlider();
  });
})();

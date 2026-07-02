document.addEventListener('DOMContentLoaded', function () {
  var mobileMenu = document.getElementById('mobile-menu');
  var openToggle = document.querySelector('.navbar .navbar-toggle');
  var closeButton = document.querySelector('.mobile-menu__close');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openToggle && mobileMenu) {
    openToggle.addEventListener('click', openMenu);
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('.mobile-menu__nav a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

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

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var hero = document.querySelector('.hero-section');
  var toTop = document.getElementById('toTop');
  if (hero && toTop) {
    var topObserver = new IntersectionObserver(function (entries) {
      toTop.classList.toggle('show', !entries[0].isIntersecting);
    }, { threshold: 0.01 });
    topObserver.observe(hero);
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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

  function setActiveNav(sectionId) {
    activateInMenu('.navbar-menu', sectionId);
    activateInMenu('.mobile-menu__nav', sectionId);
  }

  var programCard = document.getElementById('program');
  var trackedSections = ['about', 'contacts', 'magazine']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActiveNav() {
    if (window.scrollY < 80) {
      setActiveNav('about');
      return;
    }

    var marker = window.scrollY + window.innerHeight * 0.28;
    var current = null;

    trackedSections.forEach(function (section) {
      if (section.offsetTop <= marker) {
        current = section.id;
      }
    });

    if (!current && programCard) {
      var rect = programCard.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75 && rect.bottom > 120) {
        current = 'program';
      }
    }

    setActiveNav(current);
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();

  var featuresSlider = document.getElementById('features-slider');
  var featuresPrev = document.querySelector('.features-nav__btn--prev');
  var featuresNext = document.querySelector('.features-nav__btn--next');

  function getFeaturesScrollStep() {
    if (!featuresSlider) return 0;
    var card = featuresSlider.querySelector('.feature-card');
    if (!card) return 0;
    var styles = window.getComputedStyle(featuresSlider);
    var gap = parseFloat(styles.columnGap || styles.gap || '12') || 12;
    return card.offsetWidth + gap;
  }

  if (featuresSlider && featuresPrev && featuresNext) {
    function flashNavButton(btn) {
      btn.classList.add('is-pressed');
      window.setTimeout(function () {
        btn.classList.remove('is-pressed');
      }, 180);
    }

    featuresPrev.addEventListener('click', function () {
      flashNavButton(featuresPrev);
      featuresSlider.scrollBy({ left: -getFeaturesScrollStep(), behavior: 'smooth' });
    });

    featuresNext.addEventListener('click', function () {
      flashNavButton(featuresNext);
      featuresSlider.scrollBy({ left: getFeaturesScrollStep(), behavior: 'smooth' });
    });
  }
});

/**
 * Favorite coffee slider — feat/slider-logic
 * @see docs/specs/slider.md
 */
(function () {
  var section = document.querySelector('#favorite-coffee.slider');
  var list = section ? section.querySelector('.slider__list') : null;
  var items = list ? list.querySelectorAll('.slider__item') : [];
  var prev = section ? section.querySelector('.slider__control--prev') : null;
  var next = section ? section.querySelector('.slider__control--next') : null;
  var indicators = section ? section.querySelectorAll('.slider__indicator') : [];

  if (!section || !list || !prev || !next || items.length < 3) {
    return;
  }

  var index = 0;
  var count = items.length;
  var locked = false;
  var swipe = null;
  var stage = section.querySelector('.slider__stage');

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function applyTransform() {
    list.style.transform = 'translateX(-' + index * 100 + '%)';
  }

  function setIndicators() {
    for (var i = 0; i < indicators.length; i++) {
      var active = i === index;
      indicators[i].classList.toggle('slider__indicator--active', active);
      if (active) {
        indicators[i].setAttribute('aria-current', 'true');
      } else {
        indicators[i].removeAttribute('aria-current');
      }
    }
  }

  function goTo(nextIndex) {
    index = ((nextIndex % count) + count) % count;
    applyTransform();
    setIndicators();
  }

  function onNav(delta) {
    if (locked) {
      return;
    }
    goTo(index + delta);
    if (!prefersReducedMotion()) {
      locked = true;
    }
  }

  list.addEventListener('transitionend', function (event) {
    if (event.target !== list || event.propertyName !== 'transform') {
      return;
    }
    locked = false;
  });

  prev.addEventListener('click', function () {
    onNav(-1);
  });

  next.addEventListener('click', function () {
    onNav(1);
  });

  for (var i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener('click', function () {
      var target = Number(this.getAttribute('data-slide'));
      if (locked || target === index) {
        return;
      }
      goTo(target);
      if (!prefersReducedMotion()) {
        locked = true;
      }
    });
  }

  if (stage) {
    stage.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }
      swipe = { x: event.clientX, y: event.clientY, id: event.pointerId };
      event.preventDefault();
      if (stage.setPointerCapture) {
        stage.setPointerCapture(event.pointerId);
      }
    });

    stage.addEventListener('pointerup', function (event) {
      if (!swipe || event.pointerId !== swipe.id) {
        return;
      }
      var dx = event.clientX - swipe.x;
      var dy = event.clientY - swipe.y;
      swipe = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) {
        return;
      }
      onNav(dx < 0 ? 1 : -1);
    });

    stage.addEventListener('pointercancel', function () {
      swipe = null;
    });
  }

  window.addEventListener('resize', function () {
    applyTransform();
  });

  applyTransform();
  setIndicators();
})();

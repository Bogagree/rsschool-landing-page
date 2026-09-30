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

  if (!section || !list || !prev || !next || items.length < 3) {
    return;
  }

  var index = 0;
  var count = items.length;
  var locked = false;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function applyTransform() {
    list.style.transform = 'translateX(-' + index * 100 + '%)';
  }

  function goTo(nextIndex) {
    index = ((nextIndex % count) + count) % count;
    applyTransform();
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

  window.addEventListener('resize', function () {
    applyTransform();
  });

  applyTransform();
})();

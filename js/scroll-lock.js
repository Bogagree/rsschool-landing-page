/**
 * Page scroll lock shared by the burger and the product modal.
 * overflow:hidden on body alone does not stop the viewport scroller.
 * @see docs/specs/burger-menu.md
 * @see docs/specs/modal.md
 */
(function () {
  var count = 0;
  var y = 0;
  var nativeScrollTo = window.scrollTo.bind(window);
  var nativeScroll = window.scroll.bind(window);
  var nativeScrollBy = window.scrollBy.bind(window);

  function blockScroll(native) {
    return function () {
      if (count > 0) {
        return;
      }
      native.apply(window, arguments);
    };
  }

  window.scrollTo = blockScroll(nativeScrollTo);
  window.scroll = blockScroll(nativeScroll);
  window.scrollBy = blockScroll(nativeScrollBy);
  var SCROLL_KEYS = {
    PageDown: true,
    PageUp: true,
    Home: true,
    End: true,
    ArrowDown: true,
    ArrowUp: true,
    ' ': true
  };

  function pin() {
    if (window.scrollY !== y) {
      nativeScrollTo(0, y);
    }
  }

  function allowsInnerScroll(target) {
    var dialog = target && target.closest ? target.closest('.modal__dialog') : null;
    return Boolean(dialog && dialog.scrollHeight > dialog.clientHeight + 1);
  }

  function blockPointerScroll(event) {
    if (count === 0 || allowsInnerScroll(event.target)) {
      return;
    }
    event.preventDefault();
  }

  window.scrollLock = {
    lock: function () {
      if (count === 0) {
        y = window.scrollY || window.pageYOffset || 0;
        document.documentElement.classList.add('is-scroll-locked');
      }
      count += 1;
      pin();
    },
    unlock: function () {
      if (count === 0) {
        return;
      }
      count -= 1;
      if (count !== 0) {
        return;
      }
      var root = document.documentElement;
      var previous = root.style.scrollBehavior;
      root.classList.remove('is-scroll-locked');
      root.style.scrollBehavior = 'auto';
      nativeScrollTo(0, y);
      root.style.scrollBehavior = previous;
    }
  };

  window.addEventListener('scroll', function () {
    if (count > 0) {
      pin();
    }
  });

  window.addEventListener('wheel', blockPointerScroll, { passive: false });
  window.addEventListener('touchmove', blockPointerScroll, { passive: false });

  window.addEventListener('keydown', function (event) {
    if (count === 0 || !SCROLL_KEYS[event.key]) {
      return;
    }
    if (event.target && event.target.closest && event.target.closest('button, a, input, textarea, select')) {
      return;
    }
    event.preventDefault();
  });
})();

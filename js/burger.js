/**
 * Burger menu — feat/burger-menu
 * @see docs/specs/burger-menu.md
 */
(function () {
  var DESKTOP_MIN = 769;
  var BODY_OPEN = 'is-burger-open';
  var PANEL_OPEN = 'burger--open';
  var button = document.querySelector('.header__burger');
  var panel = document.getElementById('burger-panel');
  var header = document.querySelector('.header');

  if (!button || !panel) {
    return;
  }

  function isOpen() {
    return button.getAttribute('aria-expanded') === 'true';
  }

  function syncPanelOffset() {
    var height = header ? header.offsetHeight : 0;
    panel.style.top = height + 'px';
    panel.style.height = 'calc(100dvh - ' + height + 'px)';
  }

  function openMenu() {
    syncPanelOffset();
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close menu');
    panel.removeAttribute('hidden');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add(BODY_OPEN);
    if (window.scrollLock) {
      window.scrollLock.lock();
    }
    requestAnimationFrame(function () {
      panel.classList.add(PANEL_OPEN);
    });
  }

  function closeMenu() {
    if (!isOpen()) {
      return;
    }
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    panel.classList.remove(PANEL_OPEN);
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove(BODY_OPEN);
    if (window.scrollLock) {
      window.scrollLock.unlock();
    }
  }

  function onPanelTransitionEnd(event) {
    if (event.target !== panel || event.propertyName !== 'opacity') {
      return;
    }
    if (!isOpen()) {
      panel.setAttribute('hidden', '');
    }
  }

  function toggleMenu() {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  panel.setAttribute('aria-hidden', 'true');
  panel.addEventListener('transitionend', onPanelTransitionEnd);

  button.addEventListener('click', toggleMenu);

  panel.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (link && panel.contains(link)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= DESKTOP_MIN) {
      closeMenu();
      if (!isOpen()) {
        panel.setAttribute('hidden', '');
      }
      return;
    }
    if (isOpen()) {
      syncPanelOffset();
    }
  });
})();

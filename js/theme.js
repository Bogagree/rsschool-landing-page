/**
 * Theme toggle + localStorage — feat/theme-localstorage
 * @see docs/specs/theme.md
 */
(function () {
  var STORAGE_KEY = 'theme';
  var LIGHT = 'light';
  var DARK = 'dark';
  var root = document.documentElement;

  function readStored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      if (value === LIGHT || value === DARK) {
        return value;
      }
    } catch (error) {
      /* private mode / blocked storage */
    }
    return null;
  }

  function writeStored(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* private mode / blocked storage */
    }
  }

  var button = document.querySelector('.header__theme');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (button) {
      button.setAttribute('aria-pressed', theme === DARK ? 'true' : 'false');
    }
  }

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr === DARK || attr === LIGHT) {
      return attr;
    }
    return LIGHT;
  }

  function toggleTheme() {
    var next = currentTheme() === DARK ? LIGHT : DARK;
    applyTheme(next);
    writeStored(next);
  }

  applyTheme(readStored() || LIGHT);

  if (button) {
    button.addEventListener('click', toggleTheme);
  }
})();

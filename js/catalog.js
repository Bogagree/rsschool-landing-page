/**
 * Catalog cards, categories, show-more — feat/catalog-show-more
 * Modal — later feat.
 * @see docs/specs/catalog.md
 */
(function () {
  var PRODUCTS_URL = 'data/products.json';
  var DEFAULT_CATEGORY = 'coffee';
  var MOBILE_MAX = 768;
  var MOBILE_LIMIT = 4;
  var IMAGE_EXT = {
    coffee: 'jpg',
    tea: 'png',
    dessert: 'png',
  };

  var products = [];
  var activeCategory = DEFAULT_CATEGORY;
  var isExpanded = false;
  var list = null;
  var catalog = null;
  var tabs = null;
  var moreButton = null;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function imagePath(category, indexInCategory) {
    var ext = IMAGE_EXT[category] || 'jpg';
    return 'assets/images/' + category + '-' + indexInCategory + '.' + ext;
  }

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function createCardItem(product, indexInCategory) {
    var name = escapeHtml(product.name);
    var description = escapeHtml(product.description);
    var price = escapeHtml(product.price);
    var src = imagePath(product.category, indexInCategory);

    var li = document.createElement('li');
    li.className = 'catalog__item';
    li.innerHTML =
      '<article class="card">' +
      '<img class="card__photo" src="' +
      src +
      '" alt="' +
      name +
      '" width="340" height="340" />' +
      '<h2 class="card__title">' +
      name +
      '</h2>' +
      '<p class="card__text">' +
      description +
      '</p>' +
      '<p class="card__price">$' +
      price +
      '</p>' +
      '</article>';
    return li;
  }

  function countActiveProducts() {
    var count = 0;
    products.forEach(function (product) {
      if (product.category === activeCategory) {
        count += 1;
      }
    });
    return count;
  }

  function syncExpandedClass() {
    if (!catalog) {
      return;
    }
    catalog.classList.toggle('catalog--expanded', isExpanded);
  }

  function syncMoreButton() {
    if (!moreButton) {
      return;
    }

    var showButton = isMobile() && !isExpanded && countActiveProducts() > MOBILE_LIMIT;
    moreButton.classList.toggle('catalog__more--visible', showButton);
    moreButton.removeAttribute('aria-disabled');

    if (showButton) {
      moreButton.removeAttribute('aria-hidden');
      moreButton.removeAttribute('tabindex');
    } else {
      moreButton.setAttribute('aria-hidden', 'true');
      moreButton.setAttribute('tabindex', '-1');
    }
  }

  function syncVisibility() {
    syncExpandedClass();
    syncMoreButton();
  }

  function renderCards() {
    if (!list) {
      return;
    }

    var fragment = document.createDocumentFragment();
    var indexInCategory = 0;

    products.forEach(function (product) {
      if (product.category !== activeCategory) {
        return;
      }
      indexInCategory += 1;
      fragment.appendChild(createCardItem(product, indexInCategory));
    });

    list.replaceChildren(fragment);
    syncVisibility();
  }

  function syncTabs() {
    if (!tabs) {
      return;
    }

    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute('data-category') === activeCategory;
      tab.classList.toggle('catalog__tab--active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      tab.removeAttribute('aria-disabled');
    });
  }

  function setCategory(category) {
    if (!category || category === activeCategory) {
      return;
    }
    if (!IMAGE_EXT[category]) {
      return;
    }

    activeCategory = category;
    isExpanded = false;
    syncTabs();
    renderCards();
  }

  function onTabClick(event) {
    var tab = event.currentTarget;
    setCategory(tab.getAttribute('data-category'));
  }

  function onMoreClick() {
    if (!isMobile() || isExpanded) {
      return;
    }
    isExpanded = true;
    syncVisibility();
  }

  function initTabs() {
    tabs = Array.prototype.slice.call(
      document.querySelectorAll('.catalog__tab[data-category]')
    );
    if (!tabs.length) {
      return;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', onTabClick);
    });

    syncTabs();
  }

  function initMore() {
    moreButton = document.querySelector('.catalog__more');
    if (!moreButton) {
      return;
    }

    moreButton.addEventListener('click', onMoreClick);
  }

  function init() {
    list = document.querySelector('.catalog__list');
    if (!list) {
      return;
    }

    catalog = list.closest('.catalog');
    initTabs();
    initMore();

    window.addEventListener('resize', syncVisibility);

    fetch(PRODUCTS_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        return response.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error('Products must be an array');
        }
        products = data;
        activeCategory = DEFAULT_CATEGORY;
        isExpanded = false;
        syncTabs();
        renderCards();
      })
      .catch(function () {
        products = [];
        list.replaceChildren();
        isExpanded = false;
        syncVisibility();
      });
  }

  init();
})();

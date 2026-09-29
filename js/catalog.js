/**
 * Catalog cards from data/products.json — feat/catalog-data
 * Active category: coffee only (tabs / show-more / modal — later feats).
 * @see docs/specs/catalog.md
 */
(function () {
  var PRODUCTS_URL = 'data/products.json';
  var ACTIVE_CATEGORY = 'coffee';
  var IMAGE_EXT = {
    coffee: 'jpg',
    tea: 'png',
    dessert: 'png',
  };

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

  function renderCards(products, list) {
    var fragment = document.createDocumentFragment();
    var indexInCategory = 0;

    products.forEach(function (product) {
      if (product.category !== ACTIVE_CATEGORY) {
        return;
      }
      indexInCategory += 1;
      fragment.appendChild(createCardItem(product, indexInCategory));
    });

    list.replaceChildren(fragment);
  }

  function init() {
    var list = document.querySelector('.catalog__list');
    if (!list) {
      return;
    }

    fetch(PRODUCTS_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        return response.json();
      })
      .then(function (products) {
        if (!Array.isArray(products)) {
          throw new Error('Products must be an array');
        }
        renderCards(products, list);
      })
      .catch(function () {
        list.replaceChildren();
      });
  }

  init();
})();

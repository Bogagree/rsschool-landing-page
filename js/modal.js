/**
 * Product modal — open/close + Size / Additives / live price
 * @see docs/specs/modal.md
 */
(function () {
  var BODY_OPEN = 'is-modal-open';
  var MODAL_OPEN = 'modal--open';
  var OPTION_ACTIVE = 'modal__option--active';
  var SIZE_ORDER = ['s', 'm', 'l'];

  var modal = document.getElementById('product-modal');
  var dialog = null;
  var closeButton = null;
  var photo = null;
  var title = null;
  var text = null;
  var price = null;
  var sizeOptions = null;
  var additiveOptions = null;
  var openFrameId = 0;
  var currentProduct = null;
  var selectedSize = 's';
  var selectedAdditives = {};

  if (!modal) {
    return;
  }

  dialog = modal.querySelector('.modal__dialog');
  closeButton = modal.querySelector('.modal__close');
  photo = modal.querySelector('.modal__photo');
  title = modal.querySelector('.modal__title');
  text = modal.querySelector('.modal__text');
  price = modal.querySelector('.modal__price');
  sizeOptions = modal.querySelector('.modal__options--size');
  additiveOptions = modal.querySelector('.modal__options--additives');

  if (
    !dialog ||
    !closeButton ||
    !photo ||
    !title ||
    !text ||
    !price ||
    !sizeOptions ||
    !additiveOptions
  ) {
    return;
  }

  function isOpen() {
    return modal.getAttribute('aria-hidden') === 'false';
  }

  function parseMoney(value) {
    var number = parseFloat(value);
    return Number.isFinite(number) ? number : 0;
  }

  function formatPrice(amount) {
    return '$' + amount.toFixed(2);
  }

  function computeTotal() {
    if (!currentProduct) {
      return 0;
    }

    var total = parseMoney(currentProduct.price);
    var sizes = currentProduct.sizes || {};
    var sizeData = sizes[selectedSize];

    if (sizeData) {
      total += parseMoney(sizeData['add-price']);
    }

    var additives = currentProduct.additives || [];
    Object.keys(selectedAdditives).forEach(function (indexKey) {
      if (!selectedAdditives[indexKey]) {
        return;
      }
      var additive = additives[Number(indexKey)];
      if (additive) {
        total += parseMoney(additive['add-price']);
      }
    });

    return total;
  }

  function updatePrice() {
    price.textContent = formatPrice(computeTotal());
  }

  function createOptionButton(badgeText, labelText) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'modal__option';
    button.setAttribute('aria-pressed', 'false');

    var badge = document.createElement('span');
    badge.className = 'modal__option-badge';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = badgeText;

    var label = document.createElement('span');
    label.className = 'modal__option-label';
    label.textContent = labelText;

    button.appendChild(badge);
    button.appendChild(label);
    return button;
  }

  function setOptionActive(button, isActive) {
    button.classList.toggle(OPTION_ACTIVE, isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }

  function renderSizeOptions(product) {
    sizeOptions.textContent = '';
    var sizes = product.sizes || {};

    SIZE_ORDER.forEach(function (key) {
      var sizeData = sizes[key];
      if (!sizeData) {
        return;
      }

      var button = createOptionButton(key.toUpperCase(), sizeData.size || '');
      button.dataset.size = key;
      setOptionActive(button, key === selectedSize);
      sizeOptions.appendChild(button);
    });
  }

  function renderAdditiveOptions(product) {
    additiveOptions.textContent = '';
    var additives = product.additives || [];

    additives.forEach(function (additive, index) {
      var button = createOptionButton(String(index + 1), additive.name || '');
      button.dataset.additiveIndex = String(index);
      setOptionActive(button, Boolean(selectedAdditives[index]));
      additiveOptions.appendChild(button);
    });
  }

  function resetParams() {
    selectedSize = 's';
    selectedAdditives = {};
  }

  function fillContent(product, imageSrc) {
    var name = product.name || '';
    currentProduct = product;
    resetParams();
    title.textContent = name;
    text.textContent = product.description || '';
    photo.src = imageSrc || '';
    photo.alt = name;
    renderSizeOptions(product);
    renderAdditiveOptions(product);
    updatePrice();
  }

  function openModal(product, imageSrc) {
    if (!product) {
      return;
    }

    if (openFrameId) {
      cancelAnimationFrame(openFrameId);
      openFrameId = 0;
    }

    var alreadyOpen = isOpen();
    if (!alreadyOpen && window.scrollLock) {
      window.scrollLock.lock();
    }
    fillContent(product, imageSrc);
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add(BODY_OPEN);
    openFrameId = requestAnimationFrame(function () {
      openFrameId = 0;
      if (!isOpen()) {
        return;
      }
      modal.classList.add(MODAL_OPEN);
      closeButton.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    if (!isOpen()) {
      return;
    }

    if (openFrameId) {
      cancelAnimationFrame(openFrameId);
      openFrameId = 0;
    }

    modal.classList.remove(MODAL_OPEN);
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove(BODY_OPEN);
    if (window.scrollLock) {
      window.scrollLock.unlock();
    }
    modal.setAttribute('hidden', '');
    currentProduct = null;
  }

  document.addEventListener('catalog:open-modal', function (event) {
    var detail = event.detail || {};
    openModal(detail.product, detail.imageSrc);
  });

  closeButton.addEventListener('click', function () {
    closeModal();
  });

  modal.addEventListener('click', function () {
    closeModal();
  });

  dialog.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  sizeOptions.addEventListener('click', function (event) {
    var button = event.target.closest('.modal__option');
    if (!button || !sizeOptions.contains(button) || !currentProduct) {
      return;
    }

    var sizeKey = button.dataset.size;
    if (!sizeKey || sizeKey === selectedSize) {
      return;
    }

    selectedSize = sizeKey;
    Array.prototype.forEach.call(sizeOptions.querySelectorAll('.modal__option'), function (option) {
      setOptionActive(option, option.dataset.size === selectedSize);
    });
    updatePrice();
  });

  additiveOptions.addEventListener('click', function (event) {
    var button = event.target.closest('.modal__option');
    if (!button || !additiveOptions.contains(button) || !currentProduct) {
      return;
    }

    var indexKey = button.dataset.additiveIndex;
    if (indexKey === undefined) {
      return;
    }

    selectedAdditives[indexKey] = !selectedAdditives[indexKey];
    setOptionActive(button, Boolean(selectedAdditives[indexKey]));
    updatePrice();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      closeModal();
    }
  });
})();

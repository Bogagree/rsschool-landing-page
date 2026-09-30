/**
 * Product modal open/close — feat/modal
 * Params / live price — feat/modal-params
 * @see docs/specs/modal.md
 */
(function () {
  var BODY_OPEN = 'is-modal-open';
  var MODAL_OPEN = 'modal--open';
  var modal = document.getElementById('product-modal');
  var dialog = null;
  var closeButton = null;
  var photo = null;
  var title = null;
  var text = null;
  var price = null;
  var openFrameId = 0;

  if (!modal) {
    return;
  }

  dialog = modal.querySelector('.modal__dialog');
  closeButton = modal.querySelector('.modal__close');
  photo = modal.querySelector('.modal__photo');
  title = modal.querySelector('.modal__title');
  text = modal.querySelector('.modal__text');
  price = modal.querySelector('.modal__price');

  if (!dialog || !closeButton || !photo || !title || !text || !price) {
    return;
  }

  function isOpen() {
    return modal.getAttribute('aria-hidden') === 'false';
  }

  function fillContent(product, imageSrc) {
    var name = product.name || '';
    title.textContent = name;
    text.textContent = product.description || '';
    price.textContent = '$' + (product.price || '');
    photo.src = imageSrc || '';
    photo.alt = name;
  }

  function openModal(product, imageSrc) {
    if (!product) {
      return;
    }

    if (openFrameId) {
      cancelAnimationFrame(openFrameId);
      openFrameId = 0;
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
      closeButton.focus();
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
    modal.setAttribute('hidden', '');
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

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      closeModal();
    }
  });
})();

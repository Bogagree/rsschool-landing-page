# Modal + card params (Part 2)

## Scope

- Клик по любой части карточки → модалка по центру + затемнение.
- Lock scroll; закрытие: крестик, overlay, `Escape` (клик внутри окна — нет).
- Данные из того же объекта, что и карточка.
- ≥ 2 параметра; выбранные выделены; связанная информация (цена и т.п.) обновляется без reload.
- Корректный вид на 1440 / 768 / 380 в обеих темах.

## Out of scope

- Реальная оплата / backend
- Готовые библиотеки модалок

## Реализация (feat/modal)

Открытие / закрытие, overlay, Esc. Параметры Size / Additives и live-цена — `feat/modal-params`.

| Элемент | Контракт |
| --- | --- |
| Разметка | На `menu.html`: `div.modal#product-modal` (изначально `hidden`, `aria-hidden="true"`). Внутри: затемнение = клик по самому `.modal`; окно `div.modal__dialog[role="dialog"][aria-modal="true"]` с `aria-labelledby="modal-title"`. Контент: `img.modal__photo`, `h2.modal__title#modal-title`, `p.modal__text`, `p.modal__price`, `button.modal__close` (`aria-label="Close"`). Без UI размеров/добавок |
| Открытие | Клик по любой части `.card` в каталоге. `js/catalog.js` диспатчит `CustomEvent` `catalog:open-modal` с `detail: { product, imageSrc }`, где `product` — **тот же объект** из массива `products` (через `data-product-index` на карточке). `js/modal.js` слушает событие, заполняет поля из объекта + `imageSrc`, снимает `hidden`, ставит `aria-hidden="false"`, класс `modal--open`, `body.is-modal-open` |
| Центр + overlay | `.modal` — `position: fixed`, на весь viewport, flex-центр, полупрозрачный фон поверх страницы (`z-index` выше header). `.modal__dialog` — карточка поверх затемнения, фон `--color-bg`, токены темы |
| Scroll lock | `body.is-modal-open { overflow: hidden }`. Снимается при закрытии |
| Закрытие | Крестик `.modal__close`; клик по затемнённой области (`.modal`, не `.modal__dialog`); клавиша `Escape`. Клик внутри `.modal__dialog` не закрывает (`stopPropagation`) |
| Данные на этом шаге | Имя, описание, базовая цена (`$` + `product.price`), фото карточки. Без выбора параметров и пересчёта цены |
| Скрипт | `js/modal.js` (`defer` на `menu.html` после `catalog.js`) |
| Адаптив | Корректно на 1440 / 768 / 380 в light и dark: на узкой ширине колонка (фото сверху), на широкой — ряд фото + текст |

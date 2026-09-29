# Hero

## Scope

- Первая контентная секция главной (`index.html`).
- Заголовок, краткая информация о проекте, CTA (кнопка/ссылка).
- Соответствует выбранной теме / макету.

## Out of scope

- Слайдер (`favorite-coffee`) и прочие секции
- Карточки меню, about и прочие экспорты — лежат локально, в этот шаг не входят

## Реализация (feat/home-hero)

Макет: файл `yuc5s9NCc4jENkk5LdFfvX`, фрейм `[D] Home` / слой `hero` (`216:1370`). Фото баннера — экспорт пользователя `assets/images/img-hero.jpg` (исходное имя `img-hero.jpg`). Это кадр латте, не скриншот всей секции: заголовок, текст и CTA остаются HTML.

| Элемент | Контракт |
| --- | --- |
| Секция | `section.hero#hero` — якорь Home без смены href |
| Заголовок | Один `h1`: «Enjoy premium coffee at our charming cafe». Слово `Enjoy` — `em.hero__accent` (italic), как `heading-1.accent` |
| Текст | Слой макета: «With its inviting atmosphere… favorite beverage.» |
| CTA | Ссылка `.hero__cta` → `menu.html`, подпись `Menu` (`button-primary`) |
| Картинка | `img.hero__photo` → `assets/images/img-hero.jpg`, `object-fit: cover`, кадр смещён вправо. Copy поверх фото (`.hero__title`, `.hero__text`, `.hero__accent`) — фиксированный белый (`#fff`), не `var(--color-bg)` / `--color-text`: эти токены страницы меняются с темой и на тёмном латте дают нечитаемый контраст |

`main` больше не несёт `.container`: колонка на hero — `.hero__inner.container`, пустые соседние секции обёрнуты отдельно, чтобы баннер мог занять ширину колонки 1440.

## Адаптив (feat/responsive)

- ≥769px: `min-height` баннера 40rem, padding `6.25rem`.
- ≤768: `min-height` 33.75rem, padding `6.25rem 2.5rem`.
- ≤380: padding `3.75rem 1rem`.
- Без горизонтального скролла; текст и CTA поверх фото.

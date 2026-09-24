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
| Картинка | `img.hero__photo` → `assets/images/img-hero.jpg`, `object-fit: cover`, кадр смещён вправо. Текст поверх фото белый, чтобы читался на тёмном латте в обеих темах |

`main` больше не несёт `.container`: колонка на hero — `.hero__inner.container`, пустые соседние секции обёрнуты отдельно, чтобы баннер мог занять ширину колонки 1440.

# Hero

## Scope

- Первая контентная секция главной (`index.html`).
- Заголовок, краткая информация о проекте, CTA (кнопка/ссылка).
- Соответствует выбранной теме / макету.

## Out of scope

- Слайдер (`favorite-coffee`) и прочие секции
- Фото фона из макета, пока файла нет в `assets/images/`

## Реализация (feat/home-hero)

Макет прочитан в браузере (view): файл `yuc5s9NCc4jENkk5LdFfvX`, фрейм `[D] Home` / слой `hero` (`216:1370`). Figma MCP по-прежнему без edit access — бинарник латте не экспортирован. Фон-фото не рисуется и не подменяется скриншотом кадра. Баннер инвертирует семантические токены (`--color-text` / `--color-bg`), не hex из макета.

| Элемент | Контракт |
| --- | --- |
| Секция | `section.hero#hero` — якорь Home без смены href |
| Заголовок | Один `h1`: «Enjoy premium coffee at our charming cafe». Слово `Enjoy` — `em.hero__accent` (italic), как `heading-1.accent` |
| Текст | Слой макета: «With its inviting atmosphere… favorite beverage.» |
| CTA | Ссылка `.hero__cta` → `menu.html`, подпись `Menu` (`button-primary`) |
| Картинка | Нет. Когда появится экспорт слоя-изображения — `assets/images/<layer-kebab>.jpg` и `img`/`background-image` в этом блоке |

`main` больше не несёт `.container`: колонка на hero — `.hero__inner.container`, пустые соседние секции обёрнуты отдельно, чтобы баннер мог занять ширину колонки 1440.

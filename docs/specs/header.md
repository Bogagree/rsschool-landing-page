# Header

Связано: [theme.md](./theme.md), [burger-menu.md](./burger-menu.md).

## Scope

- На обеих страницах одинаковый header.
- Логотип / название → главная.
- `nav` → `ul` / `li` / `a`: якоря секций главной + ссылка на каталог.
- Переключатель светлой/тёмной темы.
- Кнопка бургера видна при ширине ≤ 768px; основная nav скрыта.

## Part 1

Кнопка бургера может быть неактивной (без панели).

## Part 2

Открытие/закрытие панели — [burger-menu.md](./burger-menu.md).

## Out of scope

- Содержимое секций, на которые ведут якоря
- Логика переключателя и `localStorage` — [theme.md](./theme.md), шаг `feat/theme-localstorage`
- Панель бургера — [burger-menu.md](./burger-menu.md)

## Реализация (feat/header-footer)

`get_metadata` и `get_screenshot` для fileKey `yuc5s9NCc4jENkk5LdFfvX`, node `0:1` снова вернули отсутствие edit access. В `assets/icons/` файлов нет. Логотип, иконка бургера и иконка темы не рисуются и не подменяются картинками.

Одинаковая разметка на `index.html` и `menu.html` (на каталоге у ссылки Menu — `aria-current="page"`).

| Элемент | Контракт |
| --- | --- |
| Название | Текст `Coffee House`, ссылка на `index.html`. Не файл из макета. |
| Nav | `nav` → `ul` → `li` → `a`. Якоря текущих секций каркаса главной и ссылка на каталог. Подписи = роли секций каркаса, не имена слоёв Figma. |
| Тема | `button.header__theme`. В этом шаге не меняет `data-theme`. |
| Бургер | `button.header__burger`, `aria-expanded="false"`, `aria-disabled="true"`, без панели. Виден при `max-width: 768px`; `.header__nav` при этой ширине скрыта. |

| Подпись | href |
| --- | --- |
| Home | `index.html#hero` |
| Slider | `index.html#slider` |
| About | `index.html#about` |
| Extra | `index.html#extra` |
| Menu | `menu.html` |

Когда `feat/home-*` переименует id секций под макет, в том же шаге обновить эту таблицу и href. Иконки из `assets/icons/` подставить вместо текстового названия и CSS-полос бургера, когда файлы появятся.

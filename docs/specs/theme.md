# Theme (light / dark)

## Scope

- Обе страницы полностью в светлой и тёмной темах.
- Переключатель в header на обеих страницах.
- Выбор в `localStorage`; восстановление после reload и при переходе между страницами.
- Состояние переключателя = активная тема.
- Читаемость и контраст в обеих темах.

## Реализация (feat/theme-localstorage)

- Атрибут на `<html>`: `data-theme="light"` | `data-theme="dark"`.
- Токены в `css/themes.css` / `base.css` (через `color-scheme` + системные `Canvas` / `CanvasText` / `LinkText`).
- Логика: `js/theme.js`, подключение на обеих страницах (`defer`).
- Кнопка уже в header: `.header__theme` на обеих страницах (`feat/header-footer`). Этот шаг вешает на неё переключение и `localStorage` (ключ `theme`, значения `light` | `dark`). Без сохранённого значения — светлая тема. Вторая кнопка не добавляется.
- Состояние иконки: светлая — `light.svg`, при `data-theme="dark"` — `dark.svg` (CSS в `components.css`).
- `prefers-color-scheme` не источник истины в этом шаге.

## Out of scope

- Системная `prefers-color-scheme` как единственный источник (можно как fallback — отдельным decision)

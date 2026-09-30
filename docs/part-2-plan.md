# Part 2 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека: [specs/part-2.md](./specs/part-2.md).  
Канон: [README-part-2.md](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-2.md) (**100**).

База: ветка `landing-page-part-2` **от** `landing-page`.  
Фичи мержим в `landing-page-part-2`; PR → `landing-page` **не мержить**.

---

## Next (для нового чата)

```text
feat/modal
```

Модалка карточки. Спека: [modal.md](./specs/modal.md).

---

## Шаги

```text
landing-page
└── landing-page-part-2
    ├── [done] feat/catalog-data           # data/products.json + динамический рендер
    ├── [done] feat/burger-menu            # specs/burger-menu.md
    ├── [done] feat/slider-logic           # specs/slider.md Part 2
    ├── [done] feat/catalog-categories     # переключение категорий
    ├── [done] feat/catalog-show-more      # show-more / pagination + resize
    ├── [    ] feat/modal                  # открытие/закрытие, overlay, Esc
    ├── [    ] feat/modal-params           # ≥ 2 параметра, live update
    └── [    ] feat/polish-deploy-part-2   # деплой, PR body, self-check
```

---

## Пока не делать

- Готовые библиотеки слайдеров/модалок
- Merge PR Part 2 в `landing-page`

## Сдача

PR: https://github.com/Bogagree/rsschool-landing-page/pull/7 (`landing-page-part-2` → `landing-page`). **Не мержить.**

В описании есть скриншот десктопной главной: шапка (Favorite coffee, About, Mobile app, Contact us, Menu, переключатель темы), герой и начало слайдера «Choose your favorite coffee». Это кадр Части 1, не отчёт о функциях Части 2. Чеклист Части 2 в PR не отмечен. GitHub Pages всё ещё собран с ветки `landing-page`.

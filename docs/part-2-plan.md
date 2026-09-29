# Part 2 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека: [specs/part-2.md](./specs/part-2.md).  
Канон: [README-part-2.md](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-2.md) (**100**).

База: ветка `landing-page-part-2` **от** `landing-page` (создать после сдачи Части 1).  
Фичи мержим в `landing-page-part-2`; PR → `landing-page` **не мержить**.

---

## Next (для нового чата)

```text
blocked — сначала закрыть Part 1 и создать ветку landing-page-part-2
```

После создания ветки первый шаг:

```text
feat/catalog-data
```

---

## Шаги

```text
landing-page
└── landing-page-part-2
    ├── [    ] feat/catalog-data           # data/products.json + динамический рендер
    ├── [    ] feat/burger-menu            # specs/burger-menu.md
    ├── [    ] feat/slider-logic           # specs/slider.md Part 2
    ├── [    ] feat/catalog-categories     # переключение категорий
    ├── [    ] feat/catalog-show-more      # show-more / pagination + resize
    ├── [    ] feat/modal                  # открытие/закрытие, overlay, Esc
    ├── [    ] feat/modal-params           # ≥ 2 параметра, live update
    └── [    ] feat/polish-deploy-part-2   # деплой, PR body, self-check
```

---

## Пока не делать

- Начинать Part 2 до готовности Part 1
- Готовые библиотеки слайдеров/модалок
- Merge PR Part 2 в `landing-page`

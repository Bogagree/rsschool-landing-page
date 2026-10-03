# Part 2 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека: [specs/part-2.md](./specs/part-2.md).  
Канон: [README-part-2.md](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-2.md) (**100**).

База: ветка `landing-page-part-2` **от** `landing-page`.  
Фичи мержим в `landing-page-part-2`; PR → `landing-page` **не мержить**.

---

## Next (для нового чата)

```text
Part 2 feature steps are done. Do not merge landing-page-part-2 into landing-page — see docs/submit-checklist.md.
```

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
    ├── [done] feat/modal                  # открытие/закрытие, overlay, Esc
    ├── [done] feat/modal-params           # ≥ 2 параметра, live update
    └── [done] feat/polish-deploy-part-2   # деплой, PR body, self-check
```

---

## Пока не делать

- Готовые библиотеки слайдеров/модалок
- Merge PR Part 2 в `landing-page`

## Сдача

Ревью по 29 пунктам формы: [part-2-cross-check.md](./part-2-cross-check.md).

PR: https://github.com/Bogagree/rsschool-landing-page/pull/7 (`landing-page-part-2` → `landing-page`). **Не мержить.**

GitHub Pages публикует ветку `landing-page-part-2`, folder `/` → https://bogagree.github.io/rsschool-landing-page/ (проверено: `menu.html` подключает `js/modal.js` / `js/catalog.js`, каталог динамический). Self-check по живому деплою: **98 / 100** — отчёт [qa/polish-deploy-part-2.md](./qa/polish-deploy-part-2.md); снятие 2 балла за scroll-lock модалки (п. 6.3). В PR #7 чеклист Части 2: блок Modal не отмечен как полный. Скриншот в PR остаётся кадром Части 1 (главная); новый кадр каталога/модалки через GitHub UI не прикладывался.

# Part 1 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека: [specs/part-1.md](./specs/part-1.md).  
Канон: [README-part-1.md](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README-part-1.md) (**100**).

База: ветка `landing-page`. Фичи мержим сюда; PR `landing-page` → `main` на cross-check **не мержить**.

---

## Next (для нового чата)

```text
feat/tokens-base
```

CSS variables, base, container. Вариант уже принят: Coffee House ([P-001](./decisions.md)).

---

## Шаги

Маркер `[done]` = влито в `landing-page`.

```text
main
└── landing-page
    ├── [done] feat/sdd-skeleton           # docs SDD по образцу minigames
    ├── [done] feat/folder-scaffold        # index/menu + css/js/assets/data каркас
    ├── [done] feat/choose-variant         # P-001 Coffee House + overview + assets plan
    ├── [    ] feat/tokens-base            # CSS variables, base, container
    ├── [    ] feat/header-footer          # specs/header.md, footer.md
    ├── [    ] feat/home-hero              # specs/hero.md
    ├── [    ] feat/home-slider-markup     # specs/slider.md (без JS)
    ├── [    ] feat/home-extra-sections    # specs/home-sections.md
    ├── [    ] feat/catalog-layout         # specs/catalog.md (статика)
    ├── [    ] feat/responsive             # 1440 / 768 / 380
    ├── [    ] feat/theme-localstorage     # specs/theme.md
    └── [    ] feat/polish-validate-deploy # W3C, hover, favicon, Pages, PR body
```

---

## Пока не делать

- Логику бургера, слайдера, категорий, модалки (Часть 2)
- TypeScript / React / UI-библиотеки
- Merge PR `landing-page` → `main`

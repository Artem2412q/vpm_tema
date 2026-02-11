# VPN «Тёма» — одностраничный лендинг (Next.js + R3F)

**Цель:** вау‑визуал без кислотности, понятный и комфортный для старшего поколения.  
**Технологии:** Next.js (App Router) + TypeScript + TailwindCSS + Three.js / React Three Fiber + Drei + Framer Motion.

## Быстрый старт

```bash
npm i
npm run dev
```

Откройте: http://localhost:3000

## Сборка (в том числе для GitHub Pages)

Проект настроен на **static export** (`output: "export"`).  
Сборка положится в папку `out/`.

```bash
npm run build
```

Далее `out/` можно хостить на статике (GitHub Pages, Netlify, любой CDN).

> Если вы хотите SSR (например, Vercel), удалите в `next.config.mjs` поля `output` и `trailingSlash`.

## Где менять тексты/страны/цвета

- Тексты секций: `components/*`
- Список стран, координаты и таймзоны: `lib/countries.ts`
- Цвета темы: `app/globals.css` (CSS‑переменные `--bg`, `--accent`, …)

## Визуальные фишки (встроено)

1) **Сканирующая линия** вокруг Земли при включении VPN — `components/earth/VpnEffects.tsx` (`ScanningRing`).  
2) **Крипто‑частицы** по туннелю — `VpnEffects.tsx` (`instancedMesh` по кривой).  
3) **Плавное “переключение реальности”** при смене страны — сглаживание точки назначения `currentTarget.lerp(...)`.  
4) **Мини‑график состояния соединения** — `components/ui/ConnectionGraph.tsx` (художественный, не скорость).  

## Производительность и доступность

- 3D сцена грузится **лениво** через `next/dynamic` (`components/Hero.tsx`).
- Для слабых устройств используем `useDetectGPU()` и снижаем dpr/сегменты/звёзды.
- Уважение `prefers-reduced-motion`: при включённой настройке показываем статичный globe‑fallback.

## Дисклеймер по смыслу

Мы избегаем обещаний “невидимости”. Формулировки в тексте: VPN **защищает канал и снижает риски**, но не является абсолютной анонимностью.

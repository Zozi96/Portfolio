# Performance & Design Optimization Spec

## Overview
This specification outlines a holistic refactor of the React portfolio to address performance bottlenecks, improve component loading strategies, and consolidate CSS for better maintainability.

## 1. Performance: LanguageContext Optimization
**Problem:** The current `LanguageContext` performs synchronous string splitting and nested object traversal on every render.
**Solution:**
- Flatten the translation JSON objects into a single-level dictionary of key-value pairs (e.g., `{"section.title": "My Title"}`).
- Implement memoization within the context to ensure the `t` function reference is stable and lookups are O(1).

## 2. Performance: Component Preloading
**Problem:** The custom `usePreloadSection` hook uses an `IntersectionObserver` directly adjacent to the sections, often resulting in a flash of unstyled content/loading states.
**Solution:** 
- Transition to an **Idle Time Prefetching** strategy.
- Utilize `requestIdleCallback` (or a `setTimeout` fallback for Safari) to load all remaining lazy-loaded component chunks in the background once the initial critical rendering path is complete.
- Keep the `IntersectionObserver` as a fallback, but increase the `rootMargin` significantly (e.g., `500px`) so it acts as a safety net if idle time isn't sufficient.

## 3. Design: CSS Refactoring
**Problem:** Heavy reliance on complex, inline Tailwind classes for repetitive visual elements like glassmorphism panels and glowing backgrounds.
**Solution:**
- Move common, complex utility combinations into the `tailwind.config.ts` or as custom utility variables within `index.css`.
- Ensure components like `Badge`, `Card`, and `SpotlightCard` utilize these newly abstracted utilities, reducing JSX bloat and ensuring uniform design language across the site.

## 4. Performance: Hero Animations & Worker Setup
**Problem:** High-frequency mouse tracking events using `framer-motion` in `Hero.tsx` could cause frame drops. Additionally, we need to ensure the PDF generation worker does not leak dependencies into the main bundle.
**Solution:**
- Audit `Hero.tsx` and ensure `useReducedMotion` is strictly respected to disable heavy springs on lower-end/accessible devices.
- Verify `vite.config.ts` manual chunks explicitly separate `jspdf` to ensure it only loads when the worker is requested.

## Success Criteria
- [ ] No layout shift or loading flashes when scrolling to new sections.
- [ ] `t()` translation function uses O(1) lookup.
- [ ] JSX class lists for Cards and Sections are significantly reduced in length.
- [ ] Lighthouse Performance score > 95.
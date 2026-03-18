# Portfolio Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a holistic refactor of the React portfolio to address performance bottlenecks, improve component loading strategies, and consolidate CSS for better maintainability.

**Architecture:** We will flatten translation strings and memoize for O(1) lookups, implement idle time prefetching in `usePreloadSection`, extract repetitive Tailwind classes into custom utilities, and enforce accessibility and proper code-splitting.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion

---

### Task 1: LanguageContext Optimization

**Files:**
- Modify: `src/context/LanguageContext.tsx`
- Test: `npm run lint` and `npm run build`

- [ ] **Step 1: Write translation flattening function**

Add a utility to flatten nested objects into key-value pairs (e.g., `{"nav.home": "Home"}`) and memoize the `t` function with `useCallback`. Update `src/context/LanguageContext.tsx`:

```tsx
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getTranslations } from '../utils/translations';

type Locale = 'en' | 'es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('locale') as Locale | null;
  if (stored && (stored === 'en' || stored === 'es')) return stored;
  return 'en';
}

function flattenObject(obj: any, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      obj[k].forEach((item: any, index: number) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(acc, flattenObject(item, `${pre}${k}.${index}`));
        } else {
          acc[`${pre}${k}.${index}`] = String(item);
        }
      });
    } else {
      acc[pre + k] = String(obj[k]);
    }
    return acc;
  }, {});
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const rawTranslations = getTranslations(locale);
  
  const flattenedTranslations = useMemo(() => {
    return rawTranslations ? flattenObject(rawTranslations) : {};
  }, [rawTranslations]);

  const t = useCallback((key: string): string => {
    return flattenedTranslations[key] || key;
  }, [flattenedTranslations]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: setLocaleState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
```

- [ ] **Step 2: Run build to verify types and functionality**

Run: `npm run build`
Expected: Passes without TypeScript or lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/context/LanguageContext.tsx
git commit -m "perf(i18n): flatten and memoize LanguageContext translations for O(1) lookups"
```

---

### Task 2: Component Preloading Strategy

**Files:**
- Modify: `src/hooks/usePreloadSection.ts`

- [ ] **Step 1: Implement idle time prefetching**

Update `usePreloadSection` to utilize `requestIdleCallback` (or fallback) on mount, reducing reliance strictly on scrolling. Update `src/hooks/usePreloadSection.ts`:

```typescript
import { useEffect, useRef } from "react";

export function usePreloadSection<T extends HTMLElement = HTMLDivElement>(
  importFn: () => Promise<unknown>,
  rootMargin = "500px" // increased default margin
) {
  const ref = useRef<T>(null);
  const preloaded = useRef(false);

  useEffect(() => {
    if (preloaded.current) return;

    const doPreload = () => {
      if (preloaded.current) return;
      preloaded.current = true;
      void importFn();
    };

    // Attempt to preload during idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(doPreload, { timeout: 2000 });
    } else {
      setTimeout(doPreload, 1000);
    }

    // Fallback: IntersectionObserver with large margin
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !preloaded.current) {
          doPreload();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [importFn, rootMargin]);

  return ref;
}
```

- [ ] **Step 2: Run build to verify types**

Run: `npm run build`
Expected: Passes.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/usePreloadSection.ts
git commit -m "perf: implement idle time prefetching for lazy loaded components"
```

---

### Task 3: Design CSS Refactoring

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/components/ui/SpotlightCard.tsx`

- [ ] **Step 1: Add custom utility components in index.css**

Add reusable CSS classes for glass and glow elements to `src/index.css` under the tailwind layers:

```css
@layer components {
  .glass-panel {
    @apply bg-white/5 dark:bg-zinc-900/50 backdrop-blur-md border border-white/10 dark:border-white/5;
  }
  
  .glow-effect {
    @apply relative overflow-hidden;
  }
  
  .glow-effect::before {
    content: "";
    @apply absolute -inset-px rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 transition-opacity duration-500;
  }
  
  .glow-effect:hover::before {
    @apply opacity-100;
  }
}
```

- [ ] **Step 2: Update Card components to use new utilities**

Update `src/components/ui/Card.tsx` to simplify its className usage (this is an example, inspect the actual file to ensure you just add the new classes and remove redundant ones like `bg-white/5`, `backdrop-blur-md`):

```tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
```

*(Note: Review `src/components/ui/SpotlightCard.tsx` and refactor similarly by replacing complex backdrop blur and border utilities with `.glass-panel`)*

- [ ] **Step 3: Test build**

Run: `npm run build`
Expected: Passes.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/ui/Card.tsx src/components/ui/SpotlightCard.tsx
git commit -m "refactor(style): consolidate tailwind glass and glow classes"
```

---

### Task 4: Hero Animations & Worker Setup

**Files:**
- Modify: `src/sections/Hero.tsx`
- Modify: `vite.config.ts`

- [ ] **Step 1: Ensure useReducedMotion is respected in Hero.tsx**

Check `src/sections/Hero.tsx`. Import `useReducedMotion` and conditionally bypass or zero-out the mouse tracking effect if `prefersReduced` is true.

*Example change to be made inside Hero.tsx:*
```tsx
import { useReducedMotion } from "../hooks/useReducedMotion";
// ...
const prefersReduced = useReducedMotion();

const handleMouseMove = (e: React.MouseEvent) => {
  if (prefersReduced) return; // Add this line
  // existing logic...
};
```

- [ ] **Step 2: Explicitly separate jspdf chunk in vite.config.ts**

Update `vite.config.ts` to add `jspdf` to `manualChunks` to ensure it's not bundled into main if it isn't already handled correctly:

```typescript
// inside vite.config.ts
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'framer-motion': ['framer-motion'],
  'sentry': ['@sentry/browser'],
  'pdf-vendor': ['jspdf', 'jspdf-autotable'] // Add this line
},
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: Passes and `pdf-vendor` chunk is created.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx vite.config.ts
git commit -m "perf: respect reduced motion in Hero and optimize pdf chunking"
```
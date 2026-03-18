import { useEffect, useRef } from "react";

/**
 * Proactively preloads a lazy-loaded module before it enters the viewport,
 * eliminating the loading flash caused by basic React Suspense.
 *
 * @param importFn - Dynamic import function for the module to preload
 * @param rootMargin - IntersectionObserver root margin (default: "500px")
 * @returns A ref to attach to the sentinel element above the lazy section
 */
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
      (window as unknown as { requestIdleCallback: (fn: () => void, options?: { timeout: number }) => void }).requestIdleCallback(doPreload, { timeout: 2000 });
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

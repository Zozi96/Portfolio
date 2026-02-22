import { useEffect, useRef } from "react";

/**
 * Proactively preloads a lazy-loaded module before it enters the viewport,
 * eliminating the loading flash caused by basic React Suspense.
 *
 * @param importFn - Dynamic import function for the module to preload
 * @param rootMargin - IntersectionObserver root margin (default: "200px")
 * @returns A ref to attach to the sentinel element above the lazy section
 */
export function usePreloadSection<T extends HTMLElement = HTMLDivElement>(
  importFn: () => Promise<unknown>,
  rootMargin = "200px"
) {
  const ref = useRef<T>(null);
  const preloaded = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || preloaded.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !preloaded.current) {
          preloaded.current = true;
          void importFn();
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

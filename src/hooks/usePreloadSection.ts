import { useEffect, useRef } from "react";

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Idle preloading is only worthwhile when bandwidth is plentiful; on metered
 * or slow connections we let the IntersectionObserver drive preloading so the
 * initial chunks don't compete with above-the-fold assets.
 */
function hasFastConnection(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  if (!connection) return true; // Unknown connection — assume it's fine.
  if (connection.saveData) return false;
  const { effectiveType } = connection;
  return effectiveType === undefined || effectiveType === "4g";
}

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

    // Opportunistic idle preload, but only on fast, unmetered connections.
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (hasFastConnection()) {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(doPreload, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(doPreload, 1000) as unknown as number;
      }
    }

    // Primary trigger: IntersectionObserver with large margin.
    const element = ref.current;
    let observer: IntersectionObserver | undefined;
    if (element) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !preloaded.current) {
            doPreload();
            observer?.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(element);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      observer?.disconnect();
    };
  }, [importFn, rootMargin]);

  return ref;
}

import { useSkipLink } from '../../hooks/useAccessibility';

/**
 * Skip to main content link for keyboard navigation
 * Hidden by default, visible on focus
 */
export function SkipLink() {
  const { skipToContent } = useSkipLink('main-content');

  return (
    <button
      onClick={skipToContent}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]
                 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-white focus:rounded-lg
                 focus:font-medium focus:text-sm focus:outline-none focus:ring-2 focus:ring-accent-hover"
    >
      Skip to main content
    </button>
  );
}

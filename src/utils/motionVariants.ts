import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Instant (opacity-only) fallback variants for users who prefer reduced motion.
 * Preserves visibility changes while eliminating all spatial movement.
 */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

/**
 * Returns `fullVariants` normally, or swaps in `reducedVariants` (or a custom
 * override) when the user prefers reduced motion.
 *
 * @example
 * const variants = useMotionVariants(slideUpVariants);
 * <motion.div variants={variants} initial="hidden" animate="visible" />
 */
export function useMotionVariants(
  fullVariants: Variants,
  reduced: Variants = reducedVariants
): Variants {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : fullVariants;
}

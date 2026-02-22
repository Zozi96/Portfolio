import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Home, FolderGit2, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { vibrate } from "../../utils/haptics";

const navItems = [
  { icon: Home, labelKey: "home", href: "#home" },
  { icon: FolderGit2, labelKey: "projects", href: "#projects" },
  { icon: Briefcase, labelKey: "experience", href: "#experience" },
  { icon: Mail, labelKey: "contact", href: "#contact" },
] as const;

const springTransition = { type: "spring", bounce: 0.2, duration: 0.6 } as const;
const contentTransition = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

export function BottomNav() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  const { scrollY } = useScroll();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setIsCollapsed(true);
    } else if (latest < previous) {
      setIsCollapsed(false);
    }
  });

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex justify-center"
      aria-label="Mobile navigation"
    >
      <motion.div
        layout
        transition={prefersReduced ? { duration: 0 } : springTransition}
        className="flex items-center justify-center rounded-full backdrop-blur-2xl backdrop-saturate-150 bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] px-2 py-1 overflow-hidden"
        style={{ paddingBottom: "calc(0.25rem + env(safe-area-inset-bottom))" }}
      >
        <AnimatePresence mode="popLayout">
          {isCollapsed ? (
            <motion.button
              key="collapsed"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={prefersReduced ? { duration: 0 } : contentTransition}
              onClick={() => { vibrate(10); setIsCollapsed(false); }}
              className="flex items-center justify-center w-10 h-8 rounded-full touch-manipulation"
              aria-label="Expand navigation"
            >
              <div className="w-8 h-1.5 rounded-full bg-zinc-400/60 dark:bg-zinc-500/60" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              className="flex items-center"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : contentTransition}
            >
              {navItems.map(({ icon: Icon, labelKey, href }) => (
                <motion.a
                  key={labelKey}
                  href={href}
                  whileTap={prefersReduced ? undefined : { scale: 0.9 }}
                  onClick={() => vibrate(10)}
                  className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-4 py-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors touch-manipulation"
                  aria-label={t(`nav.${labelKey}`)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-none">
                    {t(`nav.${labelKey}`)}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

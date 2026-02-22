import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Home, FolderGit2, Briefcase, Mail, Terminal, Moon, Sun, Menu, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { vibrate } from "../../utils/haptics";

const navItems = [
  { icon: Home, labelKey: "home", href: "#home" },
  { icon: FolderGit2, labelKey: "projects", href: "#projects" },
  { icon: Briefcase, labelKey: "experience", href: "#experience" },
] as const;

const springTransition = { type: "spring", bounce: 0.2, duration: 0.6 } as const;
const contentTransition = { type: "spring", bounce: 0.2, duration: 0.4 } as const;
const submenuTransition = { type: "spring", bounce: 0.25, duration: 0.35 } as const;
const LOCALE_FLIP_PERSPECTIVE = 200;
const SCROLL_THRESHOLD = 2;

const pillClass =
  "flex items-center gap-0.5 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150 border border-white/60 dark:border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.10)] px-1.5 py-1.5 will-change-transform";

const actionBtnClass =
  "flex items-center justify-center w-9 h-9 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 active:scale-90 transition-all duration-150 touch-manipulation";

export function BottomNav({ onTerminalOpen }: { onTerminalOpen: () => void }) {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLocaleToggle = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  const { scrollY } = useScroll();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100 && latest - previous > SCROLL_THRESHOLD) {
      setIsCollapsed(true);
      setIsMenuOpen(false);
    } else if (latest < previous && previous - latest > SCROLL_THRESHOLD) {
      setIsCollapsed(false);
    }
  });

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex justify-center"
      aria-label="Mobile navigation"
    >
      <div className="relative flex flex-col items-center">
        {/* Submenu popover — floats above the main pill */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="submenu"
              className={`absolute bottom-full mb-2 ${pillClass}`}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, scale: 0.9, y: 8 }}
              transition={prefersReduced ? { duration: 0 } : submenuTransition}
            >
              <button
                onClick={() => { vibrate(10); setIsMenuOpen(false); onTerminalOpen(); }}
                className={actionBtnClass}
                aria-label="Open terminal"
              >
                <Terminal className="w-4 h-4" />
              </button>
              <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
              <button
                onClick={() => { vibrate(10); handleLocaleToggle(); }}
                className={actionBtnClass}
                aria-label="Toggle language"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={locale}
                    initial={prefersReduced ? false : { rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={prefersReduced ? undefined : { rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11px] font-bold tracking-wider inline-block"
                    style={{ perspective: LOCALE_FLIP_PERSPECTIVE }}
                  >
                    {locale.toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </button>
              <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
              <button
                onClick={() => { vibrate(10); toggleTheme(); }}
                className={actionBtnClass}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={prefersReduced ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReduced ? undefined : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
              <a
                href="#contact"
                onClick={() => { vibrate(10); setIsMenuOpen(false); }}
                className={actionBtnClass}
                aria-label={t("nav.contact")}
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main nav pill — centered, collapses on scroll */}
        <motion.div
          layout
          transition={prefersReduced ? { duration: 0 } : springTransition}
          className="flex items-center justify-center rounded-full backdrop-blur-md backdrop-saturate-150 bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] px-2 py-1 overflow-hidden will-change-transform"
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
                    onClick={() => { vibrate(10); setIsMenuOpen(false); }}
                    className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors touch-manipulation"
                    aria-label={t(`nav.${labelKey}`)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium leading-none">
                      {t(`nav.${labelKey}`)}
                    </span>
                  </motion.a>
                ))}
                {/* Menu / More options button */}
                <motion.button
                  whileTap={prefersReduced ? undefined : { scale: 0.9 }}
                  onClick={() => { vibrate(10); setIsMenuOpen((prev) => !prev); }}
                  className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-full transition-colors touch-manipulation ${
                    isMenuOpen
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-900/20"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isMenuOpen ? "close" : "open"}
                      initial={prefersReduced ? false : { rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={prefersReduced ? undefined : { rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] font-medium leading-none">
                    {t("nav.menu")}
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </nav>
  );
}

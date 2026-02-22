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
  { icon: Mail, labelKey: "contact", href: "#contact" },
] as const;

const menuTransition = { type: "spring", bounce: 0.25, duration: 0.35 } as const;
const LOCALE_FLIP_PERSPECTIVE = 200;
const SCROLL_THRESHOLD = 2;

const menuItemClass =
  "flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 active:scale-95 transition-all touch-manipulation";

export function BottomNav({ onTerminalOpen }: { onTerminalOpen: () => void }) {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleToggle = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100 && latest - previous > SCROLL_THRESHOLD) {
      setIsOpen(false);
    }
  });

  return (
    <nav
      className="fixed bottom-4 left-4 z-50 md:hidden flex flex-col-reverse items-start gap-3"
      aria-label="Mobile navigation"
    >
      {/* FAB Toggle Button */}
      <button
        onClick={() => { vibrate(10); setIsOpen((prev) => !prev); }}
        className="w-14 h-14 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150 border border-white/60 dark:border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.12)] flex items-center justify-center text-zinc-600 dark:text-zinc-300 active:scale-90 transition-transform touch-manipulation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={prefersReduced ? false : { rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={prefersReduced ? undefined : { rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Speed Dial Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
            transition={prefersReduced ? { duration: 0 } : menuTransition}
            className="flex flex-col gap-1 p-2 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150 border border-white/60 dark:border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]"
            role="menu"
          >
            {/* Nav Items */}
            {navItems.map(({ icon: Icon, labelKey, href }) => (
              <a
                key={labelKey}
                href={href}
                onClick={() => { vibrate(10); setIsOpen(false); }}
                className={menuItemClass}
                role="menuitem"
                aria-label={t(`nav.${labelKey}`)}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{t(`nav.${labelKey}`)}</span>
              </a>
            ))}

            {/* Divider */}
            <div className="h-px bg-zinc-200 dark:bg-zinc-700/60 my-1 mx-1" />

            {/* Terminal */}
            <button
              onClick={() => { vibrate(10); setIsOpen(false); onTerminalOpen(); }}
              className={menuItemClass}
              role="menuitem"
              aria-label="Open terminal"
            >
              <Terminal className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Terminal</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => { vibrate(10); handleLocaleToggle(); }}
              className={menuItemClass}
              role="menuitem"
              aria-label="Toggle language"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={locale}
                  initial={prefersReduced ? false : { rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={prefersReduced ? undefined : { rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-bold tracking-wider inline-block min-w-4 text-center shrink-0"
                  style={{ perspective: LOCALE_FLIP_PERSPECTIVE }}
                >
                  {locale.toUpperCase()}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-medium">
                {locale === "en" ? "Español" : "English"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => { vibrate(10); toggleTheme(); }}
              className={menuItemClass}
              role="menuitem"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={prefersReduced ? false : { rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={prefersReduced ? undefined : { rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-medium">
                {theme === "light" ? "Dark mode" : "Light mode"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

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
  "flex items-center gap-3 rounded-xl px-3 py-2 text-zinc-700 transition-all hover:bg-white/55 hover:text-teal-700 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-900/62 dark:hover:text-teal-300 touch-manipulation";

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
    <nav className="fixed bottom-4 left-4 z-50 flex flex-col-reverse items-start gap-3 md:hidden" aria-label="Mobile navigation">
      <button
        onClick={() => {
          vibrate(10);
          setIsOpen((prev) => !prev);
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300/50 bg-[rgba(255,248,238,0.72)] text-zinc-700 shadow-[0_10px_30px_-18px_rgba(33,24,11,0.45)] backdrop-blur-md backdrop-saturate-150 transition-transform active:scale-90 dark:border-white/10 dark:bg-[rgba(7,12,20,0.68)] dark:text-zinc-300"
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
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
            transition={prefersReduced ? { duration: 0 } : menuTransition}
            className="flex flex-col gap-1 rounded-[1.6rem] border border-zinc-300/45 bg-[rgba(255,248,238,0.78)] p-2 shadow-[0_12px_36px_-20px_rgba(33,24,11,0.45)] backdrop-blur-md backdrop-saturate-150 dark:border-white/10 dark:bg-[rgba(7,12,20,0.76)]"
            role="menu"
          >
            {navItems.map(({ icon: Icon, labelKey, href }) => (
              <a
                key={labelKey}
                href={href}
                onClick={() => {
                  vibrate(10);
                  setIsOpen(false);
                }}
                className={menuItemClass}
                role="menuitem"
                aria-label={t(`nav.${labelKey}`)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium">{t(`nav.${labelKey}`)}</span>
              </a>
            ))}

            <div className="mx-1 my-1 h-px bg-zinc-300/55 dark:bg-zinc-700/60" />

            <button
              onClick={() => {
                vibrate(10);
                setIsOpen(false);
                onTerminalOpen();
              }}
              className={menuItemClass}
              role="menuitem"
              aria-label="Open terminal"
            >
              <Terminal className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">Terminal</span>
            </button>

            <button
              onClick={() => {
                vibrate(10);
                handleLocaleToggle();
              }}
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
                  className="inline-block min-w-4 shrink-0 text-center text-[11px] font-bold tracking-wider"
                  style={{ perspective: LOCALE_FLIP_PERSPECTIVE }}
                >
                  {locale.toUpperCase()}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-medium">{locale === "en" ? "Español" : "English"}</span>
            </button>

            <button
              onClick={() => {
                vibrate(10);
                toggleTheme();
              }}
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
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-medium">{theme === "light" ? "Dark mode" : "Light mode"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

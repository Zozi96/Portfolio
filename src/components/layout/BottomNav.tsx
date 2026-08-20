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
  "focus-ring flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-text-secondary transition-all hover:bg-accent-soft hover:text-accent-primary active:scale-95 touch-manipulation";

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
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface/90 text-text-secondary shadow-card backdrop-blur-md transition-transform active:scale-90"
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
            className="flex flex-col gap-1 rounded-card border border-border bg-surface/95 p-2 shadow-card backdrop-blur-md"
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

            <div className="mx-1 my-1 h-px bg-border" />

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

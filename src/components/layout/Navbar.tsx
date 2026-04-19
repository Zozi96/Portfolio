import { Moon, Sun, Terminal } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export function Navbar({ onTerminalOpen }: { onTerminalOpen: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { key: "home", href: "#home" },
    { key: "focus", href: "#focus" },
    { key: "projects", href: "#projects" },
    { key: "personal", href: "#personal" },
    { key: "stack", href: "#stack" },
    { key: "experience", href: "#experience" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 hidden border-b border-zinc-300/40 bg-[rgba(250,246,239,0.64)] backdrop-blur-2xl backdrop-saturate-150 md:block dark:border-white/10 dark:bg-[rgba(7,12,20,0.5)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex h-18 items-center gap-10">
          <a href="#home" className="flex items-center gap-3 text-zinc-950 dark:text-white">
            <img src="/favicon.png" alt="Zozbit" className="h-9 w-auto rounded-xl border border-zinc-300/30" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-700 dark:text-teal-300">
                Zozbit
              </p>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Zozimo Fernández</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="relative text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTerminalOpen}
            className="rounded-full border border-zinc-300/50 bg-white/45 p-2.5 text-zinc-600 transition-colors hover:border-teal-500/30 hover:text-zinc-950 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:border-teal-500/30 dark:hover:text-white"
            aria-label="Open terminal"
            title="Open terminal (⌘K)"
          >
            <Terminal className="h-4 w-4" />
          </button>

          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="rounded-full border border-zinc-300/50 bg-white/45 px-3 py-2 text-[11px] font-semibold tracking-[0.2em] text-zinc-600 transition-colors hover:border-teal-500/30 hover:text-zinc-950 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:border-teal-500/30 dark:hover:text-white"
            aria-label="Toggle language"
          >
            {locale.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-full border border-zinc-300/50 bg-white/45 p-2.5 text-zinc-600 transition-colors hover:border-teal-500/30 hover:text-zinc-950 dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:border-teal-500/30 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-amber-500 via-teal-500 to-transparent"
        style={{ scaleX }}
      />
    </nav>
  );
}

export default Navbar;

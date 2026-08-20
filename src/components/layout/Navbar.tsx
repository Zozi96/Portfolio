import { Moon, Sun, Terminal, Download } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { downloadCvFile } from "../../lib/cvDownload";

export function Navbar({ onTerminalOpen }: { onTerminalOpen: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { key: "focus", href: "#focus" },
    { key: "projects", href: "#projects" },
    { key: "personal", href: "#personal" },
    { key: "stack", href: "#stack" },
    { key: "experience", href: "#experience" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 hidden border-b border-border bg-background/85 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        <a
          href="#home"
          className="focus-ring rounded-md font-heading text-[17px] font-bold tracking-[-0.01em] text-text-primary"
        >
          Zozimo <span className="text-accent-primary">Fernández</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="focus-ring rounded-md text-[14.5px] font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTerminalOpen}
            className="focus-ring rounded-lg border border-border bg-surface p-2 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Open terminal"
            title="Open terminal (⌘K)"
          >
            <Terminal className="h-4 w-4" />
          </button>

          <button
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="focus-ring rounded-lg border border-border bg-surface px-2.5 py-2 text-[11px] font-semibold tracking-[0.08em] text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Toggle language"
          >
            {locale.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="focus-ring rounded-lg border border-border bg-surface p-2 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            onClick={() => downloadCvFile(locale)}
            className="focus-ring ml-1 inline-flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <Download className="h-3.5 w-3.5" />
            {t("hero.cta3")}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

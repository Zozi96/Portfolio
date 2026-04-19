import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { key: "home", href: "#home" },
    { key: "focus", href: "#focus" },
    { key: "projects", href: "#projects" },
    { key: "stack", href: "#stack" },
    { key: "experience", href: "#experience" },
  ];

  return (
    <footer className="relative border-t border-zinc-300/45 bg-[linear-gradient(180deg,rgba(250,246,239,0.78),rgba(243,238,230,0.72))] dark:border-zinc-800/70 dark:bg-[linear-gradient(180deg,rgba(9,16,28,0.92),rgba(7,12,20,0.88))]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.7fr_0.85fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300">
              {t("footer.contact")}
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
              {t("contact.title")}
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {t("footer.description")}
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={`https://${t("footer.github")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-zinc-300/50 bg-white/55 p-3 text-zinc-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/30 hover:text-teal-700 dark:border-zinc-700/80 dark:bg-zinc-900/55 dark:text-zinc-300 dark:hover:border-teal-500/30 dark:hover:text-teal-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`https://${t("footer.linkedin")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-zinc-300/50 bg-white/55 p-3 text-zinc-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/30 hover:text-teal-700 dark:border-zinc-700/80 dark:bg-zinc-900/55 dark:text-zinc-300 dark:hover:border-teal-500/30 dark:hover:text-teal-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-300"
                  >
                    {t(`nav.${link.key}`)}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <div>
              <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">Zozimo Fernández</p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {t("footer.signature")}
              </p>
            </div>
            <div className="mt-auto text-xs text-zinc-500 dark:text-zinc-500">
              <p>© {currentYear} • {t("footer.rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

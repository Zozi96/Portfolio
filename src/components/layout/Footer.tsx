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
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-800/50">
      {/* Subtle gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* CTA Column */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-2 tracking-tight text-zinc-900 dark:text-white">
              {t("footer.contact")}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Open to new opportunities and collaborations.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://${t("footer.github")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`https://${t("footer.linkedin")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                  >
                    {t(`nav.${link.key}`)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Zozimo Fern&#225;ndez</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">Building scalable systems with clean architecture.</p>
            </div>
            <div className="mt-auto pt-6 text-xs text-zinc-400 dark:text-zinc-600">
              <p>© {currentYear} • {t("footer.rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/icons";
import { useLanguage } from "../../context/LanguageContext";
import { getStyledCvFile } from "../../lib/cvDownload";

export function Footer() {
  const { t, locale } = useLanguage();
  const currentYear = new Date().getFullYear();
  const styledCv = getStyledCvFile(locale);

  const navLinks = [
    { key: "home", href: "#home" },
    { key: "focus", href: "#focus" },
    { key: "projects", href: "#projects" },
    { key: "stack", href: "#stack" },
    { key: "experience", href: "#experience" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.7fr_0.85fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-primary">
              {t("footer.contact")}
            </p>
            <h3 className="mt-3 text-2xl font-bold">
              {t("contact.title")}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`https://${t("footer.github")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-[10px] border border-border bg-surface p-2.5 text-text-secondary transition-colors hover:text-accent-primary"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={`https://${t("footer.linkedin")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-[10px] border border-border bg-surface p-2.5 text-text-secondary transition-colors hover:text-accent-primary"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={styledCv.href}
                download={styledCv.filename}
                className="focus-ring inline-flex items-center gap-2 rounded-[10px] border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent-primary"
              >
                <FileText className="h-4 w-4" />
                {t("footer.illustratedCv")}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-text-muted">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="focus-ring rounded-md text-sm text-text-secondary transition-colors hover:text-accent-primary"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <div>
              <p className="font-heading text-lg font-semibold text-text-primary">Zozimo Fernández</p>
              <a
                href={`mailto:${t("footer.email")}`}
                className="focus-ring mt-1 inline-block rounded-md text-sm text-text-secondary hover:text-accent-primary"
              >
                {t("footer.email")}
              </a>
              <p className="mt-3 max-w-sm text-sm leading-7 text-text-muted">
                {t("footer.signature")}
              </p>
            </div>
            <div className="mt-auto text-xs text-text-muted">
              <p className="hidden md:block">{t("hero.terminalHint")}</p>
              <p className="mt-1.5">© {currentYear} · {t("footer.rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

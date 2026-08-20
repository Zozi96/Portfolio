import { ArrowRight, Download } from "lucide-react";
import { GitHubIcon } from "../components/ui/icons";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { downloadCvFile } from "../lib/cvDownload";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function AccentedTitle({ title, accent }: { title: string; accent: string }) {
  const index = accent ? title.indexOf(accent) : -1;
  if (index === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, index)}
      <em className="not-italic text-accent-primary">{accent}</em>
      {title.slice(index + accent.length)}
    </>
  );
}

export function Hero() {
  const { t, locale } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleScrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    try {
      downloadCvFile(locale);
    } finally {
      window.setTimeout(() => setIsDownloading(false), 500);
    }
  };

  const availabilityRows = [
    {
      label: t("hero.card.statusLabel"),
      value: (
        <span className="inline-flex items-center gap-1.5 font-semibold text-success">
          <span aria-hidden="true">●</span>
          {t("hero.card.statusValue")}
        </span>
      ),
    },
    { label: t("hero.card.roleLabel"), value: t("hero.card.roleValue") },
    { label: t("hero.card.locationLabel"), value: t("hero.card.locationValue") },
    {
      label: t("hero.card.emailLabel"),
      value: (
        <a
          href={`mailto:${t("footer.email")}`}
          className="focus-ring rounded-md break-all underline decoration-transparent underline-offset-2 transition-colors hover:text-accent-primary hover:decoration-accent-primary"
        >
          {t("footer.email")}
        </a>
      ),
    },
  ];

  return (
    <Section id="home" className="pt-14 pb-16 md:pt-24 md:pb-22">
      <motion.div
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? false : "hidden"}
        animate="visible"
        className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
      >
        <div>
          <motion.span
            variants={prefersReduced ? undefined : itemVariants}
            className="mb-7 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.02em] text-accent-primary"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-success" aria-hidden="true" />
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            variants={prefersReduced ? undefined : itemVariants}
            className="mb-6 max-w-3xl text-[clamp(40px,5vw,58px)] font-bold leading-[1.06]"
          >
            <AccentedTitle title={t("hero.title")} accent={t("hero.titleAccent")} />
          </motion.h1>

          <motion.p
            variants={prefersReduced ? undefined : itemVariants}
            className="mb-9 max-w-[520px] text-lg leading-7 text-text-secondary"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            variants={prefersReduced ? undefined : itemVariants}
            className="flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <Button variant="primary" onClick={handleScrollToProjects}>
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" href="https://github.com/Zozi96">
              <GitHubIcon className="h-4 w-4" />
              {t("hero.cta2")}
            </Button>
          </motion.div>
        </div>

        <motion.aside
          variants={prefersReduced ? undefined : itemVariants}
          className="rounded-card border border-border bg-surface p-7 shadow-card"
        >
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            {t("hero.card.title")}
          </p>
          <dl>
            {availabilityRows.map((row, index) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-3 py-2.5 text-[14.5px] ${
                  index === 0 ? "" : "border-t border-border"
                }`}
              >
                <dt className="text-text-secondary">{row.label}</dt>
                <dd className="text-right font-semibold text-text-primary">{row.value}</dd>
              </div>
            ))}
          </dl>
          <Button
            variant="primary"
            className="mt-4 w-full"
            onClick={handleDownloadCV}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {t("hero.card.downloadCv")}
          </Button>
        </motion.aside>
      </motion.div>
    </Section>
  );
}

export default Hero;

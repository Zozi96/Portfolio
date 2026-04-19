import { Github, ArrowRight, Download, TerminalSquare, MapPin, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  const { t, locale } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleScrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const reverseMouseX = useMotionValue(0);
  const reverseMouseY = useMotionValue(0);

  const springConfig = { damping: 42, stiffness: 280 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothReverseX = useSpring(reverseMouseX, springConfig);
  const smoothReverseY = useSpring(reverseMouseY, springConfig);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;

      mouseX.set(x * 34);
      mouseY.set(y * 26);
      reverseMouseX.set(x * -22);
      reverseMouseY.set(y * -18);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, reverseMouseX, reverseMouseY]);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      downloadCvFile(locale);
    } finally {
      window.setTimeout(() => setIsDownloading(false), 500);
    }
  };

  return (
    <Section
      id="home"
      className="relative overflow-hidden py-10 md:py-18 lg:py-24"
      containerClassName="relative"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-[-8%] top-[-12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.14)_0%,rgba(245,158,11,0.03)_42%,transparent_74%)] blur-3xl"
          style={{ x: smoothX, y: smoothY }}
        />
        <motion.div
          className="absolute right-[-10%] top-[10%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.18)_0%,rgba(45,212,191,0.04)_40%,transparent_74%)] blur-3xl"
          style={{ x: smoothReverseX, y: smoothReverseY }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_20%,transparent_72%,rgba(15,118,110,0.06))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%,transparent_72%,rgba(45,212,191,0.08))]" />
        <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent dark:via-zinc-500/20" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-end xl:gap-14"
      >
        <div className="max-w-4xl">
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-zinc-300/45 bg-white/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/55 dark:text-teal-300"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-teal-500 shadow-[0_0_0_5px_rgba(45,212,191,0.12)]" />
            {t("hero.badge")}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-zinc-500 dark:text-zinc-400"
          >
            <span>{t("hero.eyebrow")}</span>
            <span className="h-px w-14 bg-gradient-to-r from-teal-500/70 to-transparent" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="max-w-5xl text-[3.4rem] font-semibold leading-[0.9] tracking-[-0.055em] text-zinc-950 sm:text-[4.2rem] md:text-[5rem] lg:text-[5.75rem] dark:text-[#f8f3eb]"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-7 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/50 bg-white/55 px-3 py-1.5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/55">
              <Sparkles className="h-4 w-4 text-amber-500" />
              {t("hero.name")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/50 bg-white/55 px-3 py-1.5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/55">
              <MapPin className="h-4 w-4 text-teal-500" />
              {t("hero.location")}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
            <p className="max-w-2xl text-base leading-8 text-zinc-700 dark:text-zinc-300 md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="rounded-[1.75rem] border border-zinc-300/45 bg-white/50 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/45">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                selected profile
              </p>
              <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                Backend architecture, distributed systems, data-heavy products, and cloud delivery with production bias.
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400"
          >
            {t("hero.availability")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button variant="primary" onClick={handleScrollToProjects}>
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="secondary" href="https://github.com/Zozi96">
              <Github className="h-4 w-4" />
              {t("hero.cta2")}
            </Button>
            <Button variant="secondary" onClick={handleDownloadCV} disabled={isDownloading}>
              {isDownloading ? (
                <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {t("hero.cta3")}
            </Button>
          </motion.div>
        </div>

        <motion.aside
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] border border-zinc-300/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,248,238,0.52))] p-5 shadow-[0_30px_90px_-50px_rgba(33,24,11,0.5)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(9,16,28,0.82),rgba(7,12,20,0.64))] md:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.14),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_55%)]" />
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between border-b border-zinc-300/55 pb-4 dark:border-zinc-800/80">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  {t("hero.commandLabel")}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
                  {t("hero.terminalHint")}
                </p>
              </div>
              <div className="rounded-2xl border border-teal-500/20 bg-teal-500/10 p-3 text-teal-700 dark:text-teal-300">
                <TerminalSquare className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-3 font-mono text-sm text-zinc-700 dark:text-zinc-300">
              {[
                "$ role --current",
                "> Senior Software Engineer / Backend Architect",
                "$ domains --list",
                "> distributed-systems, data-platforms, cloud-delivery",
                "$ stack --core",
                "> python, .net, aws, docker, typescript",
              ].map((line, index) => (
                <div
                  key={line}
                  className={`rounded-2xl px-4 py-3 ${
                    index % 2 === 0
                      ? "border border-zinc-300/55 bg-white/55 dark:border-zinc-800 dark:bg-zinc-900/60"
                      : "text-teal-800 dark:text-teal-300"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { value: "5+", label: t("hero.stats.years") },
                { value: "15+", label: t("hero.stats.projects") },
                { value: "3", label: t("hero.stats.industries") },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-zinc-300/55 bg-white/52 px-3 py-4 text-center dark:border-zinc-800 dark:bg-zinc-900/72"
                >
                  <div className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </Section>
  );
}

export default Hero;

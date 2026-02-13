import { Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <Section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-0"
    >
      {/* Background gradient blobs - emerald-only palette */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[40%] h-[40%] bg-emerald-400/8 dark:bg-emerald-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-teal-500/5 dark:bg-teal-500/8 rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto text-center relative z-10 px-4">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-700/40 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-300">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]"
        >
          {t("hero.name")}
        </motion.h1>

        {/* Title/Role */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400 mb-8"
        >
          {t("hero.title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("hero.cta1")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" href="https://github.com/Zozi96">
            <Github className="w-4 h-4" />
            {t("hero.cta2")}
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

export default Hero;

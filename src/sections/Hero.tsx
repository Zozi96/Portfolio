import { Github, ArrowRight, Download } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { usePdfWorker } from "../hooks/usePdfWorker";
import { useMotionVariants } from "../utils/motionVariants";
import type { Language } from "../utils/cvGenerator";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const noMotionContainerVariants = { hidden: {}, visible: {} };

export function Hero() {
  const { t, locale } = useLanguage();
  const safeItemVariants = useMotionVariants(itemVariants);
  const safeContainerVariants = useMotionVariants(containerVariants, noMotionContainerVariants);
  const [isDownloading, setIsDownloading] = useState(false);
  const { generateAndDownload } = usePdfWorker();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const reverseMouseX = useMotionValue(0);
  const reverseMouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
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
      
      mouseX.set(x * 50);
      mouseY.set(y * 50);

      reverseMouseX.set(x * -30);
      reverseMouseY.set(y * -30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, reverseMouseX, reverseMouseY]);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      await generateAndDownload(locale as Language);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-0"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="hidden md:block absolute top-[-15%] left-[-5%] w-[45%] h-[45%] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px]"
          style={{ 
            x: smoothX,
            y: smoothY,
          }}
        />
        <motion.div
          className="hidden md:block absolute bottom-[-15%] right-[-5%] w-[40%] h-[40%] bg-emerald-400/8 dark:bg-emerald-400/10 rounded-full blur-[100px]"
          style={{ 
            x: smoothReverseX,
            y: smoothReverseY,
          }}
        />
        <motion.div
          className="hidden md:block absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-teal-500/5 dark:bg-teal-500/8 rounded-full blur-[80px]"
          style={{ 
            x: smoothX,
            y: smoothY,
          }}
        />
        <div className="md:hidden absolute inset-0 opacity-60 dark:opacity-30" style={{ background: 'radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.2) 0%, transparent 60%), radial-gradient(circle at 90% 90%, rgba(52, 211, 153, 0.2) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        variants={safeContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto text-center relative z-10 px-4"
      >
        {/* Status badge */}
        <motion.div
          variants={safeItemVariants}
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
          variants={safeItemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]"
        >
          {t("hero.name")}
        </motion.h1>

        {/* Title/Role */}
        <motion.h2
          variants={safeItemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400 mb-8"
        >
          {t("hero.title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={safeItemVariants}
          className="text-base md:text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={safeItemVariants}
          className="flex items-center justify-center gap-8 mb-12"
        >
          {[
            { value: "5+", label: "Years exp." },
            { value: "15+", label: "Projects" },
            { value: "3", label: "Industries" },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 tracking-wide">
                  {stat.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <span className="text-zinc-300 dark:text-zinc-600 text-xl select-none">·</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={safeItemVariants}
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
          <Button variant="secondary" onClick={handleDownloadCV} disabled={isDownloading}>
            {isDownloading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {t("hero.cta3")}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default Hero;

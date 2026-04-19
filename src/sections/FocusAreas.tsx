import { Server, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { useLanguage } from "../context/LanguageContext";

const iconMap = {
  0: Server,
  1: Database,
  2: Zap,
};

const colorMap = {
  0: {
    icon: "text-teal-600 dark:text-teal-300",
    border: "border-teal-500/20",
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
  },
  1: {
    icon: "text-cyan-600 dark:text-cyan-300",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/15",
  },
  2: {
    icon: "text-amber-600 dark:text-amber-300",
    border: "border-amber-500/20",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
  },
};

export function FocusAreas() {
  const { t } = useLanguage();

  return (
    <Section id="focus" className="relative">
      <div className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300"
          >
            {t("sectionLabels.focus")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl dark:text-white"
          >
            {t("focus.title")}
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 lg:justify-self-end"
        >
          {t("focus.intro")}
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((index) => {
          const Icon = iconMap[index as keyof typeof iconMap];
          const colors = colorMap[index as keyof typeof colorMap];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.8,
                delay: Math.min(index * 0.08, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard className={`h-full border ${colors.border} p-7`}>
                <div className="flex h-full flex-col">
                  <div className={`mb-8 inline-flex w-fit rounded-2xl border border-white/40 p-3.5 ${colors.bg} ${colors.icon}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="max-w-xs text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                    {t(`focus.areas.${index}.title`)}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {t(`focus.areas.${index}.description`)}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default FocusAreas;

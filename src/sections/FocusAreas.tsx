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
    icon: "text-emerald-500",
    border: "border-t-emerald-500",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
  1: {
    icon: "text-blue-500",
    border: "border-t-blue-500",
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
  },
  2: {
    icon: "text-amber-500",
    border: "border-t-amber-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
  },
};

export function FocusAreas() {
  const { t } = useLanguage();

  return (
    <Section id="focus" className="bg-zinc-50/50 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3 block">
          Expertise
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {t("focus.title")}
        </h2>
        <div className="h-1 w-10 bg-emerald-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => {
          const Icon = iconMap[index as keyof typeof iconMap];
          const colors = colorMap[index as keyof typeof colorMap];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.8,
                delay: Math.min(index * 0.1, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard
                className={`p-8 h-full border-t-2 ${colors.border}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`p-3.5 rounded-2xl ${colors.bg} mb-5 ${colors.icon}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-white">
                    {t(`focus.areas.${index}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
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

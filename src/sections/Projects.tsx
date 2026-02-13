import { motion } from "framer-motion";
import { Code2, Database, Zap } from "lucide-react";
import { Section } from "../components/ui/Section";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";

const categoryConfig = {
  0: {
    icon: Code2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/8 dark:bg-emerald-500/10",
  },
  1: {
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-500/8 dark:bg-blue-500/10",
  },
  2: {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/8 dark:bg-amber-500/10",
  },
};

export function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {t("projects.title")}
        </h2>
        <div className="h-1 w-10 bg-emerald-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => {
          const config = categoryConfig[index as keyof typeof categoryConfig];
          const Icon = config.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard className="flex flex-col h-full p-0 overflow-hidden">
                {/* Icon hero */}
                <div
                  className={`h-32 flex items-center justify-center ${config.bg} relative overflow-hidden group`}
                >
                  <Icon
                    className={`w-10 h-10 ${config.color} transition-transform duration-700 group-hover:scale-110`}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase ${config.color} mb-1.5`}
                  >
                    {t(`projects.items.${index}.category`)}
                  </span>
                  <h3 className="text-lg font-bold mb-2 tracking-tight text-zinc-900 dark:text-white">
                    {t(`projects.items.${index}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 flex-grow leading-relaxed">
                    {t(`projects.items.${index}.description`)}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-zinc-100 dark:border-zinc-800">
                    {[0, 1, 2].map((metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                          {t(
                            `projects.items.${index}.metrics.${metricIndex}.value`,
                          )}
                        </div>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {t(
                            `projects.items.${index}.metrics.${metricIndex}.label`,
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {[0, 1, 2, 3, 4].map((stackIndex) => {
                      const tech = t(
                        `projects.items.${index}.stack.${stackIndex}`,
                      );
                      return tech &&
                        tech !==
                          `projects.items.${index}.stack.${stackIndex}` ? (
                        <Badge key={stackIndex}>{tech}</Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default Projects;

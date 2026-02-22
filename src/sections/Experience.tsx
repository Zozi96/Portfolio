import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import { Section } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

export function Experience() {
  const { t } = useLanguage();

  const roles: number[] = [];
  let index = 0;
  while (true) {
    const title = t(`experience.roles.${index}.title`);
    if (title === `experience.roles.${index}.title`) break;
    roles.push(index);
    index++;
  }

  return (
    <Section id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
          Career
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          {t("experience.title")}
        </h2>
        <div className="h-1 w-10 bg-emerald-500 mx-auto rounded-full" />
      </motion.div>

      {/* Single-column timeline */}
      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-8">
          {roles.map((roleIndex) => (
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(roleIndex * 0.1, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex gap-6"
            >
              {/* Timeline node */}
              <div className="relative flex-shrink-0 mt-6">
                <div className={`w-3 h-3 rounded-full bg-emerald-500 ring-[3px] ${roleIndex === 0 ? "ring-emerald-100 dark:ring-emerald-500/20" : "ring-white dark:ring-zinc-950"} z-10 relative`} />
              </div>

              {/* Content card */}
              <div className="flex-1 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                    {t(`experience.roles.${roleIndex}.title`)}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t(`experience.roles.${roleIndex}.company`)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 opacity-50" />
                      <span>{t(`experience.roles.${roleIndex}.period`)}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {[0, 1, 2, 3].map((descIndex) => {
                    const desc = t(
                      `experience.roles.${roleIndex}.description.${descIndex}`,
                    );
                    return desc &&
                      desc !==
                        `experience.roles.${roleIndex}.description.${descIndex}` ? (
                      <li
                        key={descIndex}
                        className="flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/60 flex-shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Experience;

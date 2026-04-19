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
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400"
          >
            {t("sectionLabels.experience")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl dark:text-white"
          >
            {t("experience.title")}
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 lg:text-right"
        >
          {t("experience.intro")}
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-[1.05rem] top-6 bottom-6 w-px bg-gradient-to-b from-emerald-500/40 via-zinc-300 to-transparent dark:via-zinc-700" />

        <div className="space-y-6 md:space-y-7">
          {roles.map((roleIndex) => (
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{
                duration: 0.7,
                delay: Math.min(roleIndex * 0.08, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex gap-5"
            >
              <div className="relative z-10 mt-6 flex-shrink-0">
                <div className="h-4 w-4 rounded-full border-4 border-white bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.12)] dark:border-zinc-950 dark:shadow-[0_0_0_8px_rgba(16,185,129,0.18)]" />
              </div>

              <div className="flex-1 rounded-[1.75rem] border border-zinc-200/70 bg-white/78 p-6 shadow-[0_22px_70px_-40px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/20 dark:border-zinc-800/70 dark:bg-zinc-950/70 dark:shadow-[0_28px_80px_-52px_rgba(0,0,0,0.72)]">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                      {t(`experience.roles.${roleIndex}.title`)}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                      <div className="inline-flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-emerald-500" />
                        <span>{t(`experience.roles.${roleIndex}.company`)}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span>{t(`experience.roles.${roleIndex}.period`)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {[0, 1, 2, 3].map((descIndex) => {
                    const desc = t(`experience.roles.${roleIndex}.description.${descIndex}`);
                    return desc && desc !== `experience.roles.${roleIndex}.description.${descIndex}` ? (
                      <li key={descIndex} className="flex items-start gap-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
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

import { motion } from "framer-motion";
import { Home, FolderGit2, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { vibrate } from "../../utils/haptics";

const navItems = [
  { icon: Home, labelKey: "home", href: "#home" },
  { icon: FolderGit2, labelKey: "projects", href: "#projects" },
  { icon: Briefcase, labelKey: "experience", href: "#experience" },
  { icon: Mail, labelKey: "contact", href: "#contact" },
] as const;

export function BottomNav() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      <div
        className="flex items-center justify-around rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border border-zinc-200/50 dark:border-zinc-800/50 shadow-glass dark:shadow-glass-dark px-2 py-1"
        style={{ paddingBottom: "calc(0.25rem + env(safe-area-inset-bottom))" }}
      >
        {navItems.map(({ icon: Icon, labelKey, href }) => (
          <motion.a
            key={labelKey}
            href={href}
            whileTap={prefersReduced ? undefined : { scale: 0.9 }}
            onClick={() => vibrate(10)}
            className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-4 py-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors touch-manipulation"
            aria-label={t(`nav.${labelKey}`)}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {t(`nav.${labelKey}`)}
            </span>
          </motion.a>
        ))}
      </div>
    </nav>
  );
}

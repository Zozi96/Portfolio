import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "150%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      <div
        className="flex items-center justify-around rounded-full backdrop-blur-2xl backdrop-saturate-150 bg-white/40 dark:bg-black/40 border border-white/50 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] px-2 py-1"
        style={{ paddingBottom: "calc(0.25rem + env(safe-area-inset-bottom))" }}
      >
        {navItems.map(({ icon: Icon, labelKey, href }) => (
          <motion.a
            key={labelKey}
            href={href}
            whileTap={prefersReduced ? undefined : { scale: 0.9 }}
            onClick={() => vibrate(10)}
            className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-4 py-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors touch-manipulation"
            aria-label={t(`nav.${labelKey}`)}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium leading-none">
              {t(`nav.${labelKey}`)}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}

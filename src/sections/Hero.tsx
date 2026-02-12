import { useState, useEffect } from 'react';
import { Github, ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const fullText = t('hero.title');
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + Math.random() * 50); // Typing variation

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [fullText]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-0">
      {/* Refined Technical Background */}
      <div className="absolute inset-0 -z-10 bg-light-background dark:bg-dark-background">
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] dark:opacity-[0.08]" />
        
        {/* Subtle Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="w-full max-w-5xl mx-auto text-center relative z-10 px-4">
        
        {/* Terminal Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-medium text-light-text-secondary dark:text-dark-text-secondary">
            System Online
          </span>
        </motion.div>

        {/* Main Title with Terminal Effect */}
        <div className="mb-6 relative inline-block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary font-mono"
          >
            <span className="text-light-accent-primary dark:text-dark-accent-primary mr-4 select-none">{'>'}</span>
            {displayedText}
            <span className="inline-block w-4 h-12 md:h-16 ml-1 bg-light-accent-primary dark:bg-dark-accent-primary align-middle animate-[blink_1s_step-end_infinite]" />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" onClick={scrollToProjects}>
            <Terminal className="w-4 h-4" />
            {t('hero.cta1')}
            <ArrowRight className="w-4 h-4 opacity-70" />
          </Button>
          <Button variant="secondary" href="https://github.com/Zozi96">
            <Github className="w-4 h-4" />
            {t('hero.cta2')}
          </Button>
        </motion.div>

        {/* Tech Decorator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 pt-10 border-t border-light-border/50 dark:border-dark-border/50 flex justify-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
           {/* Add simple icons or tech logos if needed later, for now just a separator */}
        </motion.div>
      </div>
    </Section>
  );
}

export default Hero;

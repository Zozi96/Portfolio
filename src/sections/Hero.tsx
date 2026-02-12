import { useState, useEffect } from 'react';
import { Github, ArrowRight } from 'lucide-react';
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
      }, 100);

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
    <Section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Enhanced Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-indigo-50 to-transparent dark:from-indigo-900/40 dark:via-indigo-950/10 opacity-80 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-200 via-blue-50 to-transparent dark:from-blue-900/40 dark:via-blue-950/10 opacity-80 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200 via-violet-50 to-transparent dark:from-violet-900/30 dark:via-violet-950/10 opacity-60 blur-3xl" />
        
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-300 to-blue-400 dark:from-cyan-600 dark:to-blue-700 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-br from-violet-300 to-purple-400 dark:from-violet-600 dark:to-purple-700 rounded-full opacity-15 blur-3xl" style={{animationDuration: '4s'}} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-pink-300 to-rose-400 dark:from-pink-600 dark:to-rose-700 rounded-full opacity-10 blur-3xl" style={{animationDuration: '3s', animationDelay: '1s'}} />
      </div>
      
      <div className="w-full relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 relative"
        >
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-400 opacity-30" />
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-400">
              {displayedText}
            </span>
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-1 h-12 md:h-16 bg-gradient-to-b from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 ml-1"
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl"
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="primary" onClick={scrollToProjects}>
            {t('hero.cta1')}
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="secondary" href="https://github.com/Zozi96">
            <Github className="w-5 h-5" />
            {t('hero.cta2')}
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

export default Hero;

import { useState } from 'react';
import { Github, Linkedin, Mail, Check, Copy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = t('footer.email');
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border overflow-hidden">
      {/* Refined Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-accent-light/50 via-transparent to-light-accent-light/30 dark:from-dark-accent-dark/20 dark:via-transparent dark:to-dark-accent-dark/10" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">
              {t('footer.contact')}
            </h3>
            <div className="flex flex-col gap-4">
              
              {/* Email with Copy Functionality */}
              <div className="relative group flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-all duration-300 w-full md:w-auto text-left"
                >
                  <div className="relative p-2 rounded-lg bg-light-accent-light dark:bg-dark-accent-dark group-hover:scale-110 transition-transform duration-300">
                    <AnimatePresence mode='wait'>
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="mail"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Mail className="w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300 font-mono">
                    {t('footer.email')}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-light-text-muted dark:text-dark-text-muted ml-2 flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    <span className="hidden sm:inline">Click to copy</span>
                  </div>
                </button>
              </div>

              <a
                href={`https://${t('footer.github')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-light-accent-light dark:bg-dark-accent-dark group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-6 h-6" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300 font-mono">GitHub</span>
              </a>
              <a
                href={`https://${t('footer.linkedin')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-light-accent-light dark:bg-dark-accent-dark group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300 font-mono">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex items-end justify-start md:justify-end">
            <div className="text-sm text-light-text-muted dark:text-dark-text-muted">
              <p>© {currentYear} • {t('footer.rights')}</p>
              <p className="mt-1 opacity-50 text-xs">Built with React + Tailwind + Love</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

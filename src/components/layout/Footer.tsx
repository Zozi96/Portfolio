import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-transparent to-blue-100/30 dark:from-indigo-950/30 dark:via-transparent dark:to-blue-950/30" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              {t('footer.contact')}
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${t('footer.email')}`}
                className="group flex items-center gap-3 text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-light-accent-light dark:bg-dark-accent-dark group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.email')}</span>
              </a>
              <a
                href={`https://${t('footer.github')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-light-accent-light dark:bg-dark-accent-dark group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-6 h-6" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">GitHub</span>
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
                <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <p className="text-base text-light-text-muted dark:text-dark-text-muted">
              © {currentYear} - {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

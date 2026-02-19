import { lazy, Suspense, useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ServiceProvider } from "./shared/context/ServiceContext";
import { setTranslations } from "./utils/translations";
import { content } from "./data/content";
import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import FocusAreas from "./sections/FocusAreas";
import Footer from "./components/layout/Footer";
import { Terminal } from "./components/ui/Terminal";

const Projects = lazy(() => import("./sections/Projects"));
const PersonalProjects = lazy(() => import("./sections/PersonalProjects"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Experience = lazy(() => import("./sections/Experience"));
const Contact = lazy(() => import("./sections/Contact"));

setTranslations(content);

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 dark:border-zinc-700 border-t-emerald-500"></div>
    </div>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <title>{t("seo.title")}</title>
      <meta name="description" content={t("seo.description")} />
      <meta name="keywords" content={t("seo.keywords")} />
      <meta name="author" content={t("seo.author")} />
      
      <meta property="og:title" content={t("seo.ogTitle")} />
      <meta property="og:description" content={t("seo.ogDescription")} />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("seo.ogTitle")} />
      <meta name="twitter:description" content={t("seo.ogDescription")} />

      <div className="min-h-screen">
        <Navbar onTerminalOpen={() => setIsTerminalOpen(true)} />
        <main>
          <Hero />
          <FocusAreas />
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <PersonalProjects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TechStack />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ServiceProvider>
          <AppContent />
        </ServiceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

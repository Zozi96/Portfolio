import { lazy, Suspense, useState, useEffect, useCallback } from "react";
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
import { usePreloadSection } from "./hooks/usePreloadSection";
import { useDocumentMeta } from "./hooks/useDocumentMeta";

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
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useDocumentMeta({
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: t("seo.keywords"),
    author: t("seo.author"),
    ogTitle: t("seo.ogTitle"),
    ogDescription: t("seo.ogDescription"),
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: t("seo.ogTitle"),
    twitterDescription: t("seo.ogDescription"),
  });

  const preloadProjects = useCallback(() => import("./sections/Projects"), []);
  const preloadPersonalProjects = useCallback(() => import("./sections/PersonalProjects"), []);
  const preloadTechStack = useCallback(() => import("./sections/TechStack"), []);
  const preloadExperience = useCallback(() => import("./sections/Experience"), []);
  const preloadContact = useCallback(() => import("./sections/Contact"), []);

  const projectsSentinelRef = usePreloadSection(preloadProjects);
  const personalProjectsSentinelRef = usePreloadSection(preloadPersonalProjects);
  const techStackSentinelRef = usePreloadSection(preloadTechStack);
  const experienceSentinelRef = usePreloadSection(preloadExperience);
  const contactSentinelRef = usePreloadSection(preloadContact);

  return (
    <>
      <div className="min-h-screen">
        <Navbar onTerminalOpen={() => setIsTerminalOpen(true)} />
        <main>
          <Hero />
          <FocusAreas />
          <div ref={projectsSentinelRef} />
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <div ref={personalProjectsSentinelRef} />
          <Suspense fallback={<SectionLoader />}>
            <PersonalProjects />
          </Suspense>
          <div ref={techStackSentinelRef} />
          <Suspense fallback={<SectionLoader />}>
            <TechStack />
          </Suspense>
          <div ref={experienceSentinelRef} />
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <div ref={contactSentinelRef} />
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

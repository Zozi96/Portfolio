import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, setTranslations, useLanguage } from "./context/LanguageContext";
import { content } from "./data/content";
import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import FocusAreas from "./sections/FocusAreas";
import Footer from "./components/layout/Footer";

const Projects = lazy(() => import("./sections/Projects"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Experience = lazy(() => import("./sections/Experience"));

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
        <Navbar />
        <main>
          <Hero />
          <FocusAreas />
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TechStack />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

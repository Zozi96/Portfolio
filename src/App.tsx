import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, setTranslations, useLanguage } from "./context/LanguageContext";
import { content } from "./data/content";
import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import FocusAreas from "./sections/FocusAreas";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Footer from "./components/layout/Footer";

setTranslations(content);

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
          <Projects />
          <TechStack />
          <Experience />
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

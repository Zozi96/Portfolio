import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, setTranslations } from "./context/LanguageContext";
import { content } from "./data/content";
import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import FocusAreas from "./sections/FocusAreas";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Footer from "./components/layout/Footer";

setTranslations(content);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

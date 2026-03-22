import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import DemoOne from './components/demo';
import CustomCursor from './components/CustomCursor';
import FeaturedProjects from './components/FeaturedProjects';
import Qualifications from './components/Qualifications';
import Experiences from './components/Experiences';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#9A1B1E] selection:text-white">
        <CustomCursor />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjects />
        <DemoOne />
        <Qualifications />
        <Experiences />
        <Testimonials />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

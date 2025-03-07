import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Navbar from "./components/navbar/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// Register GSAP Plugin
gsap.registerPlugin(ScrollToPlugin);

function App() {
  // Function to handle smooth scrolling to specific sections
  const scrollToSection = (sectionId: string) => {
    gsap.to(window, { duration: 1, scrollTo: `#${sectionId}`, ease: "power2.inOut" });
  };

  return (
    <main className="relative min-h-screen w-screen">
      <Navbar onNavigate={scrollToSection} />
      <section id="home">
        <Hero onNavigate={scrollToSection} />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}

export default App;

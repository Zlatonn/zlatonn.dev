import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ToastContainer, Bounce } from "react-toastify";

import Navbar from "./components/navbar/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// Register GSAP Plugin
gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

function App() {
  // Function to handle smooth scrolling to specific sections
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.inOut" });
    } else {
      gsap.to(window, { duration: 1, scrollTo: `#${sectionId}`, ease: "power2.inOut" });
    }
  };

  // Create parallax home animation
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });
  });

  return (
    <>
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

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;

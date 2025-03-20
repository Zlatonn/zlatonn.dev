import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ToastContainer, Bounce } from "react-toastify";

import Navbar from "./components/navbar/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// Global register GSAP Plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

function App() {
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
        <Navbar />
        <section id="home">
          <Hero />
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

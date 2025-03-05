import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BigEyes from "../components/BigEye";
import { useRef } from "react";

// Register gsap plugin
gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);

const About = () => {
  const cursorRef = useRef(null);
  const boxRef = useRef(null);
  const textRef = useRef(null);

  const paragraphs = [
    "👋 Hi, I’m Tonkar, a Frontend Developer with a background in Automation Programming. I switched to web development to deepen my skills and focus on user-centered solutions. My expertise includes HTML, CSS, JavaScript, React, and Tailwind.",
    "💻 I aim to become a Full Stack Developer, starting with frontend to understand web apps’ visual and interactive elements. Through various projects, I’ve gained experience in state management and API integration.",
    "🚀 I’m passionate about continuous learning and eager to grow by contributing to real-world projects.",
  ];

  useGSAP(() => {
    // Cursor animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
    });

    // Box scaling animation
    const boxAnimation = gsap.to(boxRef.current, {
      scale: 1.03,
      transformOrigin: "center",
      duration: 0.2,
      ease: "none",
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    // Text typing animation
    gsap.to(textRef.current, {
      text: paragraphs.join("<br><br>"),
      duration: 10,

      scrollTrigger: {
        trigger: textRef.current,
        start: "center 90%",
        end: "center top",
        toggleActions: "play pause resume pause",
        onEnter: () => boxAnimation.play(),
        onLeave: () => boxAnimation.pause(),
        onEnterBack: () => boxAnimation.resume(),
        onLeaveBack: () => boxAnimation.pause(),
      },
      onComplete: () => {
        boxAnimation.kill();
      },
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-light">
      <div className="max-w-6xl mx-auto pt-24 md:pt-36 flex flex-col">
        <div className="flex justify-center items-center gap-5 md:gap-10">
          <BigEyes />
          <BigEyes />
        </div>

        <div
          className="relative m-8 px-5 pt-5 pb-20
        md:m-14 md:px-8 md:pt-8 md:pb-28 
        lg:px-10 lg:pt-10 lg:pb-36 
       "
        >
          <div className="relative text-light font-code font-semibold text-left text-sm sm:text-base md:text-xl 2xl:text-2xl  z-[1]">
            <span ref={textRef}></span>
            <span ref={cursorRef}>|</span>
          </div>

          <div ref={boxRef} className="absolute inset-0 bg-secondary rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default About;

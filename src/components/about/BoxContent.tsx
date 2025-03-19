import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register gsap plugin
gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);

import { BoxContentProps as Props } from "@/types/about";

const BoxContent = ({ paragraphs }: Props) => {
  // Refer for cusor ,text typing ,box scaling element
  const cursorRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

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
      duration: 0.3,
      ease: "none",
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    // Text typing animation
    gsap.to(textRef.current, {
      text: paragraphs.join("<br><br>"),
      duration: 20,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top-=20px center",
        end: () => "+=" + (boxRef.current ? boxRef.current.offsetHeight : 0),
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
  });

  return (
    <div className="relative p-5 m-8 sm:mx-16 md:mx-24 md:p-8 lg:my-12 lg:mx-28 lg:p-10">
      <div className="relative text-light font-code font-semibold text-left text-sm sm:text-base md:text-xl 2xl:text-2xl z-[1]">
        {/* Hidden text */}
        <div className="opacity-0">
          {paragraphs.map((paragraph, i) => (
            <span key={i}>
              {paragraph}
              <br />
              <br />
            </span>
          ))}
        </div>
        {/* Display text */}
        <div className="absolute top-0 left-0">
          <span ref={textRef}></span>
          <span ref={cursorRef}>|</span>
        </div>
      </div>
      <div ref={boxRef} className="absolute inset-0 bg-secondary rounded-3xl border-8 border-primary shadow-xl"></div>
    </div>
  );
};

export default BoxContent;

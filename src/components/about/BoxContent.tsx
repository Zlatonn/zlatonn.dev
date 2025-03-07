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
  });
  return (
    <div className="relative m-8 px-5 pt-5 pb-20 md:m-14 md:px-8 md:pt-8 md:pb-28 lg:px-10 lg:pt-10 lg:pb-36">
      <div className="relative text-light font-code font-semibold text-left text-sm sm:text-base md:text-xl 2xl:text-2xl z-[1]">
        <span ref={textRef}></span>
        <span ref={cursorRef}>|</span>
      </div>
      <div ref={boxRef} className="absolute inset-0 bg-secondary rounded-md"></div>
    </div>
  );
};

export default BoxContent;

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { TechBoxProps as Props } from "@/types/projects";

const TechBox = ({ src, alt, title }: Props) => {
  // Create a reference for the tech box container
  const stackBoxRef = useRef<HTMLDivElement>(null);

  // Create tech box animation
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Create fade up & scale animation for mobile view (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      gsap.from(stackBoxRef.current, {
        scrollTrigger: {
          trigger: stackBoxRef.current,
          start: "top 80%",
          end: "+=20px'",
          scrub: true,
        },
        y: 50,
        scale: 0.1,
        opacity: 0,
      });
    });

    // Cleanup function to revert the matchMedia settings on component unmount
    return () => mm.revert();
  });

  return (
    <div
      ref={stackBoxRef}
      className="px-3 py-1 md:mx-3 md:px-5 md:py-3 flex items-center gap-1 md:gap-2 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:text-primary hover:rotate-3 hover:scale-90 transition-all duration-500 cursor-grabbing"
    >
      <img src={src} alt={alt} className="h-auto w-5 md:w-10" />
      <span>{title}</span>
    </div>
  );
};

export default TechBox;

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register gsap plugin
gsap.registerPlugin(ScrollTrigger);

import StackIcon from "tech-stack-icons";

import { TechBoxProps as Props } from "@/types/projects";

const TechBox = ({ icon, title }: Props) => {
  // Create a reference for the tech box container
  const stackBoxRef = useRef(null);

  // Create tech box animation
  useGSAP(() => {
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

  return (
    <div
      ref={stackBoxRef}
      className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300"
    >
      <StackIcon name={icon} className="w-5" />
      <span>{title}</span>
    </div>
  );
};

export default TechBox;

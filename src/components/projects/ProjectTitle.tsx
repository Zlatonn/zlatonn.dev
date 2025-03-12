import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register gsap plugin
gsap.registerPlugin(ScrollTrigger);

import { ProjectTitleProps as Props } from "@/types/projects";

const ProjectTitle = ({ title }: Props) => {
  // Creating a reference to access title element.
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Create scroll fade up animation.
  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 95%",
        end: "+=300px'",
        scrub: true,
      },
      opacity: 0,
      y: 50,
    });
  });

  return (
    <h1
      ref={titleRef}
      className="font-display text-3xl md:text-4xl xl:text-5xl uppercase font-bold bg-gradient-to-r from-light to-primary text-transparent bg-clip-text "
    >
      {title}
    </h1>
  );
};

export default ProjectTitle;

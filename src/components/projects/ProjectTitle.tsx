import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ProjectTitleProps as Props } from "@/types/projects";

const ProjectTitle = ({ title }: Props) => {
  // Creating a reference to access title element.
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Create scroll fade up animation.
  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "-100px bottom",
        end: () => "+=" + (titleRef.current ? titleRef.current.offsetHeight : 0),
        toggleActions: "restart none none reverse",
      },
      opacity: 0,
      y: 100,
      rotateX: 90,
      duration: 1,
      ease: "back.out",
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

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { onNavigateProps as Props } from "@/types/common";

const ScrollDownIndicator = ({ onNavigate }: Props) => {
  // Refer to the down arrow icon for animation
  const downArrowRef = useRef<SVGSVGElement>(null);

  // Apply GSAP animation to the down arrow for bouncing effect
  useGSAP(() => {
    gsap.fromTo(
      downArrowRef.current,
      {
        y: -5,
        opacity: 0,
      },
      {
        y: 5,
        opacity: 1,
        ease: "power2.inOut",
        duration: 2,
        repeat: -1,
      }
    );
  });

  return (
    <p onClick={() => onNavigate("about")} className="py-10 text-accent md:text-xl cursor-pointer">
      scroll down
      <span className="pl-3">
        <FontAwesomeIcon ref={downArrowRef} icon={faArrowDown} />
      </span>
    </p>
  );
};

export default ScrollDownIndicator;

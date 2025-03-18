import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

import { HeroButtonProps as Props } from "@/types/hero";

const HeroButton = ({ title, link, className }: Props) => {
  // Refer to the right arrow icon for animation
  const rightArrowRef = useRef<SVGSVGElement>(null);

  // Create infinte fade right animation to the right arrow
  useGSAP(() => {
    gsap.from(rightArrowRef.current, {
      x: -5,
      opacity: 0,
      ease: "power2.inOut",
      duration: 1,
      repeat: -1,
    });
  });

  return (
    <div className={`my-3 md:my-7 ${className}`}>
      <Button className="bg-light shadow-sm shadow-secondary rounded-full text-secondary hover:bg-gradient-to-r hover:from-light hover:to-accent hover:rotate-3 transition-all duration-300">
        <a href={link} target="_blank" className="flex gap-1 items-center">
          <FontAwesomeIcon ref={rightArrowRef} icon={faChevronRight} />
          {title}
        </a>
      </Button>
    </div>
  );
};

export default HeroButton;

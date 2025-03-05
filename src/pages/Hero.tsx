import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { faArrowDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Prop {
  onNavigate: (sectionId: string) => void;
}

const Hero = ({ onNavigate }: Prop) => {
  // Refer to the down arrow icon for animation
  const downArrowRef = useRef(null);

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
    <div className="relative h-screen w-screen bg-gradient-to-b from-secondary to-primary">
      <div className="max-w-5xl mx-auto pt-36 flex flex-col gap-5 text-center">
        <div className="text-accent md:text-2xl">welcome to</div>

        <div className="flex flex-col gap-3 text-accent font-display font-bold text-5xl md:text-7xl xl:text-8xl">
          <div className="flex justify-center">
            <div>ZLAT</div>

            <div>O</div>

            <div>NN'S</div>
          </div>

          <div className="flex justify-center text-accent font-display">SPACE</div>
        </div>

        <div className="mt-3 md:mt-5 xl md:my-7">
          <button className=" px-5 py-1 bg-light rounded-full md:text-lg xl:text-xl ">
            <span className="pr-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            GET MY CV
          </button>
        </div>
      </div>
      <div onClick={() => onNavigate("about")} className="absolute w-full bottom-10 text-center text-accent md:text-2xl cursor-pointer">
        scroll down
        <span className="pl-3">
          <FontAwesomeIcon ref={downArrowRef} icon={faArrowDown} />
        </span>
      </div>
    </div>
  );
};

export default Hero;

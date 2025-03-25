import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import scleraPic from "/images/Sclera.webp";
import eyeBallPic from "/images/EyeBall.webp";

const EyeBlink = () => {
  // Reference to the eye image for animations
  const eyeBallRef = useRef(null);

  useGSAP(() => {
    // Create a GSAP timeline for the blinking animation
    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    blinkTl.to(eyeBallRef.current, { scaleY: 0, duration: 0.1 });
    blinkTl.to(eyeBallRef.current, { scaleY: 1, duration: 0.1 });
  });

  return (
    <div className="relative size-full">
      <img src={scleraPic} alt="sclera" className="size-full rounded-full shadow-md" />
      <img
        ref={eyeBallRef}
        src={eyeBallPic}
        alt="eye_ball"
        className="absolute w-1/2 h-1/2 rounded-full shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default EyeBlink;

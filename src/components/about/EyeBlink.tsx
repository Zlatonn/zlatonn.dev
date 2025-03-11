import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import scleraPic from "../../assets/Sclera.png";
import eyeBallPic from "../../assets/EyeBall.png";

const EyeBlink = () => {
  // Reference to the eye image for animations
  const eyeRef = useRef(null);

  useGSAP(() => {
    // Create a GSAP timeline for the blinking animation
    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    blinkTl.to(eyeRef.current, { scaleY: 0, duration: 0.1 });
    blinkTl.to(eyeRef.current, { scaleY: 1, duration: 0.1 });
  });

  return (
    <div className="relative w-full">
      <img src={scleraPic} alt="sclera" className="w-full" />
      <img ref={eyeRef} src={eyeBallPic} alt="full eye" className="absolute w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default EyeBlink;

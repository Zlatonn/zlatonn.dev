import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import rotateTextPic from "../../assets/RotatingText.png";

const RotateText = () => {
  // Creating a reference to access rotate element.
  const rotateTextRef = useRef<HTMLImageElement>(null);

  // Using the 'useGSAP' hook to perform the animation when the component is mounted.
  useGSAP(() => {
    gsap.to(rotateTextRef.current, {
      rotate: 360,
      duration: 5.0,
      ease: "none",
      repeat: -1,
    });
  });

  return <img ref={rotateTextRef} src={rotateTextPic} alt="rotate_text" className="w-full" />;
};

export default RotateText;

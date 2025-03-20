import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import scleraPic from "../../assets/Sclera.png";
import eyeBallPic from "../../assets/EyeBall.png";

const EyeTracking = () => {
  // Refer sclera & eyeBall
  const scleraRef = useRef<HTMLImageElement>(null);
  const eyeBallRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the bounding box of the sclera (white part of the eye)
      const eyeRect = scleraRef.current?.getBoundingClientRect();

      // If scleraRef is not available, exit to prevent errors
      if (!eyeRect) return;

      // Calculate the mouse position relative to the sclera
      const mouseX = e.clientX - eyeRect.left;
      const mouseY = e.clientY - eyeRect.top;

      // Compute the angle between the sclera center and the mouse position
      // Math.atan2 is used to determine the angle of the vector from the center of the eye to the mouse
      const angle = Math.atan2(mouseY - eyeRect.height / 2, mouseX - eyeRect.width / 2);

      // Define the maximum distance the pupil can move within the sclera
      const distance = 20;
      const x = Math.cos(angle) * distance; // Compute the x position for the pupil
      const y = Math.sin(angle) * distance; // Compute the y position for the pupil

      // Use GSAP to smoothly move the pupil to the calculated position
      if (eyeBallRef.current) {
        gsap.to(eyeBallRef.current, {
          x: x,
          y: y,
          duration: 0.1,
        });
      }
    };

    // Add an event listener to track the mouse movement
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove event listener on unmount
    return () => document.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div className="relative size-full">
      <img ref={scleraRef} src={scleraPic} alt="sclera" className="absolute w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <img ref={eyeBallRef} src={eyeBallPic} alt="eye_ball" className="absolute w-1/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default EyeTracking;

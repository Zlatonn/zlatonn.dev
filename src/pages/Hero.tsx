import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import PageContainer from "@/components/PageContainer";
import PreText from "@/components/hero/PreText";
import HeroTitle from "@/components/hero/HeroTitle";
import HeroButton from "@/components/hero/HeroButton";
import ScrollDownIndicator from "@/components/hero/ScrollDownIndicator";
import RotateText from "@/components/hero/RotateText";
import EyeTracking from "@/components/hero/EyeTracking";

import { preText } from "@/contents/HeroContent";
import { heroTitle } from "@/contents/HeroContent";

import resumeFile from "../assets/Resume.pdf";

const Hero = () => {
  // Create fade up animation on elements with class "fadeup"
  useGSAP(() => {
    gsap.from(".fadeup", {
      opacity: 0,
      y: 100,
      stagger: 0.5,
      duration: 1,
      ease: "back.out",
    });
  });

  // Refer hero content
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Create fade out animation
  useGSAP(() => {
    gsap.to(heroContentRef.current, {
      scrollTrigger: {
        trigger: heroContentRef.current,
        start: "top top",
        scrub: 1,
      },
      scale: 0.8,
      opacity: 0,
      yPercent: -25,
    });
  });

  return (
    <PageContainer className="bg-gradient-to-b from-secondary to-primary">
      <div ref={heroContentRef} className="min-h-screen flex flex-col justify-between items-center">
        {/* Title */}
        <div className="max-w-5xl pt-36 flex flex-col gap-5 text-center">
          <PreText text={preText} className="fadeup text-accent" />

          <HeroTitle titles={heroTitle} className="fadeup" />

          <HeroButton title="GET MY CV" link={resumeFile} className="fadeup" />
        </div>

        <div className="relative size-40 md:size-52">
          <RotateText />
          <div className="absolute inset-0">
            <EyeTracking />
          </div>
        </div>

        {/* Scroll down Indicator*/}
        <ScrollDownIndicator />
      </div>
    </PageContainer>
  );
};

export default Hero;

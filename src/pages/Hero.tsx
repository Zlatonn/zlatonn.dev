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

import resumeFile from "../assets/Pongsakorn Lengklang.pdf";

import { onNavigateProps as Props } from "@/types/common";

const Hero = ({ onNavigate }: Props) => {
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

  return (
    <PageContainer className="bg-gradient-to-b from-secondary to-primary">
      <div className="min-h-screen flex flex-col justify-between items-center">
        {/* Title */}
        <div className="max-w-5xl pt-36 flex flex-col gap-5 text-center">
          <PreText text={preText} className="fadeup text-accent" />

          <HeroTitle titles={heroTitle} className="fadeup" />

          <HeroButton title="GET MY CV" link={resumeFile} className="fadeup" />
        </div>

        <div className="fadeup relative w-40 md:w-52">
          <RotateText />
          <div className="absolute inset-0 flex items-center justify-center">
            <EyeTracking />
          </div>
        </div>

        {/* Scroll down Indicator*/}
        <ScrollDownIndicator onNavigate={onNavigate} />
      </div>
    </PageContainer>
  );
};

export default Hero;

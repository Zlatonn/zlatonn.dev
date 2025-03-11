import PageContainer from "@/components/PageContainer";
import PreText from "@/components/hero/PreText";
import HeroTitle from "@/components/hero/HeroTitle";
import HeroButton from "@/components/hero/HeroButton";
import ScrollDownIndicator from "@/components/hero/ScrollDownIndicator";
import RotateText from "@/components/hero/RotateText";
import EyeTracking from "@/components/hero/EyeTracking";

import { preText } from "@/contents/HeroContent";
import { heroTitle } from "@/contents/HeroContent";

import { onNavigateProps as Props } from "@/types/common";

const Hero = ({ onNavigate }: Props) => {
  return (
    <PageContainer className="bg-gradient-to-b from-secondary to-primary">
      <div className="min-h-screen flex flex-col justify-between items-center">
        {/* Title */}
        <div className="max-w-5xl pt-36 flex flex-col gap-5 text-center">
          <PreText text={preText} className="text-accent" />

          <HeroTitle titles={heroTitle} />

          <HeroButton title="GET MY CV" />
        </div>

        <div className="relative w-40 md:w-52 ">
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

import PageContainer from "@/components/PageContainer";
import BigEyes from "../components/about/BigEye";
import BoxContent from "@/components/about/BoxContent";

import { paragraphs } from "@/contents/AboutContent";

const About = () => {
  return (
    <PageContainer className="bg-light">
      <div className="max-w-6xl mx-auto flex flex-col py-24 md:py-36  ">
        <div className="flex justify-center items-center gap-5 md:gap-10">
          <BigEyes />
          <BigEyes />
        </div>
        <BoxContent paragraphs={paragraphs} />
      </div>
    </PageContainer>
  );
};

export default About;

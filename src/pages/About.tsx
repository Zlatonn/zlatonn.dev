import PageContainer from "@/components/PageContainer";
import EyeBlink from "../components/about/EyeBlink";
import BoxContent from "@/components/about/BoxContent";

import { paragraphs } from "@/contents/AboutContent";

const About = () => {
  return (
    <PageContainer className="bg-light">
      <div className="max-w-6xl mx-auto flex flex-col py-24 md:py-36  ">
        <div className="flex justify-center items-center gap-5 md:gap-10">
          <div className="w-24 md:w-40">
            <EyeBlink />
          </div>
          <div className="w-24 md:w-40">
            <EyeBlink />
          </div>
        </div>
        <BoxContent paragraphs={paragraphs} />
      </div>
    </PageContainer>
  );
};

export default About;

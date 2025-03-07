import Marquee from "react-fast-marquee";

import PageContainer from "@/components/PageContainer";
import ProjectTitle from "@/components/projects/ProjectTitle";
import ProjectCard from "@/components/projects/ProjectCard";
import TechBox from "@/components/projects/TechBox";

import { projects, techStacks } from "@/contents/ProjectContent";

const Projects = () => {
  return (
    <PageContainer className="bg-secondary ">
      <div className="py-28 flex flex-col items-center">
        <ProjectTitle title={"PROJECTS"} />

        {/* Slide wrapper */}
        <div className="max-w-5xl w-[95%] mt-10 scale-95 sm:scale-100">
          <Marquee
            pauseOnHover={true}
            gradient={true}
            gradientColor="black"
            gradientWidth={100}
            className="flex flex-nowrap shadow-sm shadow-light/50 rounded-xl overflow-hidden"
          >
            {/* Cards */}
            {projects.map(({ imgURL, link, title, duration, detail, techStack }, i) => (
              <ProjectCard
                key={`project-${i}`}
                imgURL={imgURL}
                link={link}
                title={title}
                duration={duration}
                detail={detail}
                techStack={techStack}
              />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="py-28 flex flex-col items-center ">
        <ProjectTitle title={"MY TECH STACK"} />
        {/* Icons Warpper*/}
        <div className="max-w-4xl mt-10 flex flex-wrap justify-center gap-2 lg:scale-110">
          {techStacks.map((techStack, i) => (
            <TechBox key={`techBox-${i}`} icon={techStack.icon} title={techStack.title} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Projects;

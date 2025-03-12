import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";

import PageContainer from "@/components/PageContainer";
import ProjectTitle from "@/components/projects/ProjectTitle";
import ProjectCard from "@/components/projects/ProjectCard";
import TechBox from "@/components/projects/TechBox";

import { projects, techStacks } from "@/contents/ProjectContent";

// Register gsap plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // Reference to the slide wrapper for animation
  const slideRef = useRef(null);

  // Create sliding animation for project marquee
  useGSAP(() => {
    gsap.from(slideRef.current, {
      scrollTrigger: {
        trigger: slideRef.current,
        start: "top 95%",
        end: "+=300px'",
        scrub: true,
      },
      rotate: 20,
      xPercent: 100,
      yPercent: 50,
      opacity: 0,
    });
  });

  return (
    <PageContainer className="bg-secondary ">
      {/* Projects section */}
      <div className="py-28 flex flex-col items-center">
        <ProjectTitle title={"PROJECTS"} />

        {/* Slide wrapper */}
        <div ref={slideRef} className="max-w-5xl w-[95%] min-h-[400px] mt-10 scale-95 sm:scale-100">
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

      {/* Tech stack section */}
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

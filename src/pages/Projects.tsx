import { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageContainer from "@/components/PageContainer";
import ProjectTitle from "@/components/projects/ProjectTitle";
import ProjectCard from "@/components/projects/ProjectCard";
import TechBox from "@/components/projects/TechBox";

import { projects, techStacks } from "@/contents/ProjectContent";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // State to track the active project image and the scroll progress
  const [activeImg, setActiveImg] = useState(projects[0].imgURL);

  // References to track the DOM elements of the image container and content
  const imageRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Calculate the scroll end point based on the content and image sizes
  const getScrollEndPoint = useCallback(() => {
    if (contentWrapperRef.current && imageRef.current) {
      return "+=" + (contentWrapperRef.current.offsetHeight - imageRef.current.offsetHeight + 50);
    }
    return "+=0";
  }, []);

  useGSAP(() => {
    // Creating a GSAP matchMedia instance to apply responsive animations
    const mm = gsap.matchMedia();

    // Apply the image pin animation only on larger screens (min-width: 1024px)
    mm.add("(min-width:768px)", () => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          pin: true,
          start: "center center",
          scrub: true,
          end: () => getScrollEndPoint(),
        },
      });
    });

    // Cleanup function to revert the matchMedia settings on component unmount
    return () => mm.revert();
  });

  return (
    <PageContainer className="bg-secondary">
      {/* Projects section */}
      <div className="py-28 flex flex-col items-center gap-20">
        {/* Title for the Projects section */}
        <ProjectTitle title={"PROJECTS"} />
        <div className="relative max-w-7xl flex flex-col gap-10 md:flex-row md:gap-0">
          {/* Project Cards */}
          <div ref={contentWrapperRef} className="flex flex-col gap-20 w-full md:w-1/2">
            {projects.map(({ imgURL, link, title, duration, detail, techStack }, i) => (
              <ProjectCard
                key={`project-${i}`}
                imgURL={imgURL}
                link={link}
                title={title}
                duration={duration}
                detail={detail}
                techStack={techStack}
                setActiveImg={setActiveImg}
              />
            ))}
          </div>
          {/* Image Container */}
          <div ref={imageRef} className="hidden md:flex justify-center items-center w-1/2 h-80">
            <div className="size-full mx-5 lg:mx-10 rounded-2xl overflow-hidden border-[1px] border-secondary scale-90 rotate-3 shadow-lg shadow-light/30 hover:scale-100 hover:rotate-0 hover:shadow-primary duration-500">
              <img src={activeImg} alt="active_img" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack section */}
      <div className="py-28 flex flex-col items-center gap-20 ">
        <ProjectTitle title={"MY TECH STACK"} />
        {/* Icons Wrapper*/}
        <div className="max-w-4xl flex flex-wrap justify-center gap-2 lg:scale-110">
          {techStacks.map((techStack, i) => (
            <TechBox key={`techBox-${i}`} icon={techStack.icon} title={techStack.title} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Projects;

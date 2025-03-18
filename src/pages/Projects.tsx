import { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";

import PageContainer from "@/components/PageContainer";
import ProjectTitle from "@/components/projects/ProjectTitle";
import ProjectCard from "@/components/projects/ProjectCard";
import TechBox from "@/components/projects/TechBox";

import { projects, techStacks } from "@/contents/ProjectContent";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // State to track the active project image and the scroll progress
  const [activeProject, setActiveProject] = useState({
    imgURL: projects[0].imgURL,
    link: projects[0].link,
  });

  // References to track the DOM elements of the image container and content
  const imageRef = useRef<HTMLAnchorElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Calculate the scroll end point based on the content and image sizes
  const getScrollEndPoint = useCallback(() => {
    if (contentWrapperRef.current && imageRef.current) {
      return "+=" + (contentWrapperRef.current.offsetHeight - imageRef.current.offsetHeight + 50);
    }
    return "+=0";
  }, []);

  // References to track the DOM elements of the left & right marquee
  const leftMarqueeRef = useRef<HTMLDivElement>(null);
  const rightMarqueeRef = useRef<HTMLDivElement>(null);

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

    // Apply the slide from left side animation only on larger screens (min-width: 1024px)
    mm.add("(min-width:768px)", () => {
      gsap.from(leftMarqueeRef.current, {
        scrollTrigger: {
          trigger: leftMarqueeRef.current,
          start: "top 80%",
          end: () => "+=" + (leftMarqueeRef.current ? leftMarqueeRef.current.offsetHeight : 0),
          toggleActions: "restart none none reverse",
        },
        x: 100,
        y: 10,
        opacity: 0,
      });
    });

    // Apply the slide from right side  animation only on larger screens (min-width: 1024px)
    mm.add("(min-width:768px)", () => {
      gsap.from(rightMarqueeRef.current, {
        scrollTrigger: {
          trigger: rightMarqueeRef.current,
          start: "top 80%",
          end: () => "+=" + (rightMarqueeRef.current ? rightMarqueeRef.current.offsetHeight : 0),
          toggleActions: "restart none none reverse",
        },
        x: -100,
        y: 10,
        opacity: 0,
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
          <div ref={contentWrapperRef} className="flex flex-col gap-10 md:gap-20 w-full md:w-1/2">
            {projects.map(({ imgURL, link, title, duration, detail, techStack }, i) => (
              <ProjectCard
                key={`project-${i}`}
                imgURL={imgURL}
                link={link}
                title={title}
                duration={duration}
                detail={detail}
                techStack={techStack}
                setActiveProject={setActiveProject}
              />
            ))}
          </div>
          {/* Image Container */}
          <a ref={imageRef} href={activeProject.link} target="_blank" className="hidden md:flex justify-center items-center w-1/2 h-80">
            <div className="size-full mx-5 lg:mx-10 rounded-2xl overflow-hidden border-[1px] border-secondary scale-90 rotate-3 shadow-lg shadow-light/30 hover:scale-100 hover:rotate-0 hover:shadow-primary duration-500">
              <img src={activeProject.imgURL} alt="active_img" className="size-full object-cover" />
            </div>
          </a>
        </div>
      </div>

      {/* Tech stack section */}
      <div className="py-28 flex flex-col items-center gap-20 ">
        <ProjectTitle title={"MY TECH STACK"} />
        {/* Icons wrapper for mobile*/}
        <div className="md:hidden max-w-4xl flex flex-wrap justify-center gap-2 lg:scale-110">
          {[...techStacks.development, ...techStacks.tools].map((techStack, i) => (
            <TechBox key={`techBox-${i}`} icon={techStack.icon} title={techStack.title} />
          ))}
        </div>

        {/* Marquee wrapper for tablet*/}
        <div className="hidden w-full md:flex flex-col gap-20 xl:gap-32">
          {/* Go left marquee */}
          <div ref={leftMarqueeRef} className="w-full rotate-3 overflow-hidden">
            <Marquee
              direction="left"
              pauseOnHover={true}
              autoFill={true}
              gradient={true}
              gradientColor="#222831"
              gradientWidth={100}
              speed={50}
            >
              <div className="flex py-3">
                {techStacks.development.map((techStack, i) => (
                  <TechBox key={`techBox-dev-${i}`} icon={techStack.icon} title={techStack.title} />
                ))}
              </div>
            </Marquee>
          </div>

          {/* Go right marquee */}
          <div ref={rightMarqueeRef} className="w-full -rotate-3 overflow-hidden">
            <Marquee
              direction="right"
              pauseOnHover={true}
              autoFill={true}
              gradient={true}
              gradientColor="#222831"
              gradientWidth={100}
              speed={50}
            >
              <div className="flex py-3">
                {techStacks.tools.map((techStack, i) => (
                  <TechBox key={`techBox-tools-${i}`} icon={techStack.icon} title={techStack.title} />
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Projects;

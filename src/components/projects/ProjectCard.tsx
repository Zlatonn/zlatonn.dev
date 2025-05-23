import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import TechStack from "./TechStack";

import { ProjectCardProps as Props } from "@/types/projects";

const ProjectCard = ({ imgURL, link, title, duration, detail, techStack, setActiveProject }: Props) => {
  // Refs for card and content elements
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Create slide bottom-right animation for mobile view (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "-100px center",
          end: () => "+=" + (cardRef.current ? cardRef.current.offsetHeight : 0),
          toggleActions: "restart none none reverse",
        },
        x: 100,
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "back.inOut",
      });
    });

    // Create slide left animation for tablet view (min-width: 768px)
    mm.add("(min-width:768px)", () => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: `center-=100px center`,
          end: () => "+=" + (contentRef.current ? contentRef.current.offsetHeight : 0),
          toggleActions: "restart none none reverse",
          // setActiveProject
          onEnter: () => setActiveProject({ imgURL, link }),
          onEnterBack: () => setActiveProject({ imgURL, link }),
        },
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "back.inOut",
      });
    });

    // Cleanup on component unmount
    return () => mm.revert();
  });

  return (
    <div
      ref={cardRef}
      className="mx-10 lg:mx-5 p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 shadow-sm shadow-light rounded-3xl bg-gradient-to-b from-light/10 to-light overflow-hidden md:flex-row md:gap-20 md:shadow-none md:rounded-none md:bg-none "
    >
      {/* Content */}
      <div ref={contentRef} className="text-light flex flex-col gap-3 md:gap-5">
        {/* Link to project */}
        <a href={link} target="_blank" className="md:text-lg lg:text-2xl flex gap-2 items-center cursor-pointer md:text-accent group/link">
          <h2 className="font-semibold group-hover/link:underline">{`· ${title}`}</h2>
          <span className="-rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 duration-300 ">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </a>
        {/* Project duration */}
        <div className="text-xs md:text-sm lg:text-base">{duration}</div>
        {/* Project details */}
        <div className="text-xs md:text-sm lg:text-base text-light/70 font-light">{detail}</div>
        {/* Tech stack */}
        {techStack.map((techs, i) => (
          <TechStack key={`techs-${i}`} techs={techs} className="md:bg-accent" />
        ))}
      </div>

      {/* Image section (mobile screens) */}
      <a
        href={link}
        target="_blank"
        className="block md:hidden self-center w-full border-[2px] mt-1 border-light/10 rounded-xl overflow-hidden scale-100 rotate-0 shadow-sm shadow-secondary hover:scale-90 hover:rotate-3 hover:-translate-y-1 duration-500"
      >
        <img src={imgURL} alt={`${title}-img`} className="object-cover w-full h-48 sm:h-80" />
      </a>
    </div>
  );
};

export default ProjectCard;

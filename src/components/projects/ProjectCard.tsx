import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

import TechStack from "./TechStack";

import { ProjectCardProps as Props } from "@/types/projects";

const ProjectCard = ({ imgURL, link, title, duration, detail, techStack }: Props) => {
  return (
    <Card className="mx-10 w-[300px] min-h-[400px] bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light rotate-6 scale-90 hover:rotate-0 hover:scale-100 hover:bg-gradient-to-b hover:from-gray-300/30 hover:to-primary/10 duration-300 group/card">
      <CardHeader>
        <div className="border-[1px] border-light/10 rounded-md w-full h-40 min-h-40 overflow-hidden">
          <img src={imgURL} alt={`${title}_img`} className="w-full h-full object-cover hover:scale-150 duration-300" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <a href={link} target="_blank" className="flex gap-2 items-center cursor-pointer group-hover/card:text-accent group/link">
          <h2 className="font-semibold group-hover/link:underline">{title}</h2>
          <span className="-rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 duration-300 ">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </a>
        <div className="text-xs">{duration}</div>
        <div className="text-xs text-light/70">{detail}</div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        {techStack.map((techs, i) => (
          <TechStack key={`techs-${i}`} techs={techs} className="group-hover/card:bg-accent group-hover/card:text-secondary" />
        ))}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

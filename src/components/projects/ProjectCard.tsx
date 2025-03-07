import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

import TechStack from "./TechStack";

import { ProjectCardProps as Props } from "@/types/projects";

const ProjectCard = ({ imgURL, link, title, duration, detail, techStack }: Props) => {
  return (
    <Card className="mx-10 w-[300px] min-h-[380px] bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light rotate-6 scale-90 hover:rotate-0 hover:scale-100 hover:bg-primary duration-300">
      <CardHeader>
        <img src={imgURL} className="border-[1px] border-light/10 rounded-md" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <a href={link} target="_blank" className="flex gap-2 items-center cursor-pointer hover:underline">
          <h2 className="font-semibold">{title}</h2>
          <span className="-rotate-45">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </a>
        <div className="text-xs">{duration}</div>
        <div className="text-xs text-light/70">{detail}</div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        {techStack.map((techs, i) => (
          <TechStack key={`techs-${i}`} techs={techs} />
        ))}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

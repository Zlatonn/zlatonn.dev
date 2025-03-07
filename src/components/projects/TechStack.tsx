import { TechStackProps as Props } from "@/types/projects";

const TechStack = ({ techs }: Props) => {
  return (
    <div className="flex gap-2 text-xs text-secondary">
      {techs.map((tech, i) => (
        <span key={`tech-${i}`} className="px-2 py-1 bg-light rounded-md">
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechStack;

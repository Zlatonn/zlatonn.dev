import { TechStackProps as Props } from "@/types/projects";

const TechStack = ({ techs, className }: Props) => {
  return (
    <div className="flex gap-2">
      {techs.map((tech, i) => (
        <span key={`tech-${i}`} className={`px-2 py-1 bg-light text-xs text-secondary rounded-md ${className}`}>
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechStack;

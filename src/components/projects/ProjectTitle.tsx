import { ProjectTitleProps as Props } from "@/types/projects";

const ProjectTitle = ({ title }: Props) => {
  return (
    <h1 className="font-display text-3xl md:text-4xl xl:text-5xl uppercase font-bold bg-gradient-to-r from-light to-primary text-transparent bg-clip-text ">
      {title}
    </h1>
  );
};

export default ProjectTitle;

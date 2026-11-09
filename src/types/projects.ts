export interface ProjectTitleProps {
  title: string;
}

export interface Project {
  imgURL: string;
  link: string;
  title: string;
  duration: string;
  detail: string;
  techStack: string[][];
}

export interface ProjectCardProps extends Project {
  setActiveProject: React.Dispatch<React.SetStateAction<{ imgURL: string; link: string }>>;
}

export interface TechStackProps {
  techs: string[];
  className: string;
}

export interface TechBoxProps {
  src: string;
  alt: string;
  title: string;
}

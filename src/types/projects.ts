export interface ProjectTitleProps {
  title: string;
}

export interface ProjectCardProps {
  imgURL: string;
  link: string;
  title: string;
  duration: string;
  detail: string;
  techStack: string[][];
  setActiveProject: React.Dispatch<React.SetStateAction<{ imgURL: string; link: string }>>;
}

export interface TechStackProps {
  techs: string[];
  className: string;
}

export interface TechBoxProps {
  icon: string;
  title: string;
}

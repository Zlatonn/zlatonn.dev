export interface Project {
  imgURL: string;
  link: string;
  title: string;
  duration: string;
  detail: string;
  techStack: string[][];
}

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

export interface TechFilterProps {
  techs: string[];
  selectedTech: string | null;
  onSelect: (tech: string | null) => void;
}

export interface TechBoxProps {
  src: string;
  alt: string;
  title: string;
}

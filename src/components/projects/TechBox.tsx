import StackIcon from "tech-stack-icons";

import { TechBoxProps as Props } from "@/types/projects";

const TechBox = ({ icon, title }: Props) => {
  return (
    <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
      <StackIcon name={icon} className="w-5" />
      <span>{title}</span>
    </div>
  );
};

export default TechBox;

import useScrollToSection from "@/hooks/useScrollToSection";

import { SidebarItemProps as Props } from "@/types/navbar";

const SidebarItem = ({ content, closeSidebar }: Props) => {
  // Custom hook to handle scrolling to specific sections
  const scrollToSection = useScrollToSection();

  return (
    <li
      onClick={() => {
        closeSidebar();
        scrollToSection(content.toLowerCase());
      }}
      className="py-5 text-center text-3xl font-code rounded-md cursor-pointer hover:text-primary hover:underline duration-300"
    >
      {content}
    </li>
  );
};

export default SidebarItem;

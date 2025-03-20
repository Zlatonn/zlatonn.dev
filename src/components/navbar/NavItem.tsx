import useScrollToSection from "@/hooks/useScrollToSection";

import { NavItemProps as Props } from "@/types/navbar";

const NavItem = ({ content, handleHover, handleLeave }: Props) => {
  // Custom hook to handle scrolling to specific sections
  const scrollToSection = useScrollToSection();

  return (
    <li
      onClick={() => scrollToSection(content.toLowerCase())}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="z-[13] px-8 py-2 text-sm font-semibold text-light cursor-pointer hover:text-secondary"
    >
      {content}
    </li>
  );
};

export default NavItem;

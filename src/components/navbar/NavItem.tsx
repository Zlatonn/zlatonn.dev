import { NavItemProps as Props } from "@/types/navbar";

const NavItem = ({ content, handleHover, handleLeave, onNavigate }: Props) => {
  return (
    <li
      onClick={() => onNavigate(content.toLowerCase())}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="z-[13] px-8 py-2 text-sm font-semibold text-light cursor-pointer hover:text-secondary"
    >
      {content}
    </li>
  );
};

export default NavItem;

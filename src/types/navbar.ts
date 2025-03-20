// Interface for Logo component props, containing the logo title as a string
export interface LogoProps {
  title: string;
}

// Interface for NavItem component props
export interface NavItemProps {
  content: string;
  handleHover: (e: React.MouseEvent<HTMLLIElement>) => void;
  handleLeave: () => void;
}

// Interface for SidebarItem component props
export interface SidebarItemProps {
  content: string;
  closeSidebar: () => void;
}

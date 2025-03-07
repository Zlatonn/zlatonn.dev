import { SidebarItemProps as Props } from "@/types/navbar";

const SidebarItem = ({ content, closeSidebar, onNavigate }: Props) => {
  return (
    <li
      onClick={() => {
        closeSidebar();
        onNavigate(content.toLowerCase());
      }}
      className="py-5 text-center text-3xl font-code rounded-md cursor-pointer hover:text-primary hover:underline duration-300"
    >
      {content}
    </li>
  );
};

export default SidebarItem;

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Prop {
  onNavigate: (sectionId: string) => void;
}

const Navbar = ({ onNavigate }: Prop) => {
  // List of navigation items
  const navList: string[] = ["Home", "About", "Projects", "Contact"];

  // Refer for nav hover effect and sidebar
  const navHoverRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations for navHover and sidebar
  useGSAP(() => {
    // Set hide navHover
    gsap.set(navHoverRef.current, {
      opacity: 0,
    });

    // Set off-screen sidebar
    gsap.set(sidebarRef.current, {
      x: "100%",
    });
  });

  // Open sidebar and prevent body scroll
  const openSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "0%",
    });
    // Disable scroll when sidebar is open
    document.body.style.overflow = "hidden";
  };

  // Close sidebar and restore body scroll
  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "100%",
    });
    // Enable scroll when sidebar is closed
    document.body.style.overflow = "auto";
  };

  // Handle hover effect for navbar items
  const handleHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    gsap.to(navHoverRef.current, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      height: target.offsetHeight,
      opacity: 1,
      ease: "power2.out",
    });
  };

  // Handle mouse leave effect for navbar items
  const handleLeave = () => {
    gsap.to(navHoverRef.current, {
      opacity: 0,
      ease: "power2.out",
    });
  };

  return (
    <>
      {/* Background layer */}
      <div className="fixed inset-x-0 h-14 bg-secondary/5 shadow-sm backdrop-blur-sm z-[11]"></div>

      {/* Main navbar content */}
      <div className="fixed inset-x-0 h-14 px-4 sm:px-6 flex justify-between items-center z-[12]">
        {/* Logo */}
        <div className="px-3 py-1 bg-primary rounded-md cursor-pointer">
          <span className="text-light font-icon ">ZLATONN</span>
        </div>

        {/* Desktop navigation items */}
        <ul className="relative hidden md:flex justify-between items-center p-1">
          {navList.map((nav, i) => (
            <li
              key={`nav-${i}`}
              onClick={() => onNavigate(nav.toLowerCase())}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              className="z-[13] px-8 py-2 text-sm font-semibold text-light cursor-pointer hover:text-secondary"
            >
              {nav}
            </li>
          ))}
          {/* Hover effect for desktop navbar */}
          <div ref={navHoverRef} className={`absolute top-1 bg-primary rounded-full h-5/6 w-1/${navList.length}`}></div>
        </ul>

        {/* Mobile navigation button */}
        <button className="block md:hidden ">
          <FontAwesomeIcon onClick={openSidebar} icon={faBars} className="text-primary text-2xl" />
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div ref={sidebarRef} className="block md:hidden fixed top-0 right-0 h-full w-full bg-light z-[19] px-5 py-4">
        <div className="flex justify-end">
          <button onClick={closeSidebar} className="flex justify-center items-center size-10 rounded-md cursor-pointer hover:bg-[#DDDDDD]">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <ul className="mt-20">
          {navList.map((nav, i) => (
            <li
              key={`nav-${i}`}
              onClick={() => {
                onNavigate(nav.toLowerCase());
                closeSidebar();
              }}
              className="py-5 text-center text-3xl font-code rounded-md cursor-pointer hover:text-primary hover:underline duration-300"
            >
              {nav}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

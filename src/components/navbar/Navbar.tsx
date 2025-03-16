import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { logoTitle, navList } from "@/contents/NavbarContent";
import Logo from "./Logo";
import NavItem from "./NavItem";
import SidebarItem from "./SidebarItem";

import { onNavigateProps as Props } from "@/types/common";

const Navbar = ({ onNavigate }: Props) => {
  // Refer for nav hover effect
  const navHoverRef = useRef<HTMLDivElement>(null);

  // Handle hover effect for navbar items
  const handleHover = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    gsap.to(navHoverRef.current, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      height: target.offsetHeight,
      opacity: 1,
      ease: "power2.out",
    });
  }, []);

  // Handle mouse leave effect for navbar items
  const handleLeave = useCallback(() => {
    gsap.to(navHoverRef.current, {
      opacity: 0,
      ease: "power2.out",
    });
  }, []);

  // Refer sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Open sidebar and prevent body scroll
  const openSidebar = useCallback(() => {
    gsap.to(sidebarRef.current, {
      x: "0%",
    });
    // Disable scroll when sidebar is open
    document.body.style.overflow = "hidden";
  }, []);

  // Close sidebar and restore body scroll
  const closeSidebar = useCallback(() => {
    gsap.to(sidebarRef.current, {
      x: "100%",
    });
    // Enable scroll when sidebar is closed
    document.body.style.overflow = "auto";
  }, []);

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

  // Force close side bar when screen size over 768
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (!mobile) closeSidebar();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  return (
    <>
      {/* Background layer */}
      <div className="fixed inset-x-0 h-14 bg-secondary/5 shadow-sm backdrop-blur-sm z-[11]"></div>

      {/* Main navbar content */}
      <div className="fixed inset-x-0 h-14 px-4 sm:px-6 flex justify-between items-center z-[12]">
        {/* Logo */}
        <Logo title={logoTitle} />

        {/* Desktop navigation items */}
        <ul className="relative hidden md:flex justify-between items-center p-1">
          {navList.map((nav, i) => (
            <NavItem key={`nav-${i}`} content={nav} handleHover={handleHover} handleLeave={handleLeave} onNavigate={onNavigate} />
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
            <SidebarItem key={`sidebar-${i}`} content={nav} closeSidebar={closeSidebar} onNavigate={onNavigate} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

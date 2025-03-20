import gsap from "gsap";

const useScrollToSection = () => {
  // Handle smooth scrolling to specific section
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.inOut" });
    } else {
      gsap.to(window, { duration: 1, scrollTo: `#${sectionId}`, ease: "power2.inOut" });
    }
  };

  return scrollToSection;
};

export default useScrollToSection;

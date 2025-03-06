import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="p-3 lg:p-5 xl:p-8 flex justify-between items-center text-light md:absolute md:bottom-0 md:inset-x-0 ">
      <div className="md:text-lg lg:text-xl xl:text-2xl">© 2025 Zlatonn. All rights reserved.</div>
      <div className="flex gap-3 text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        <a href="#" className="hover:text-accent">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="#" className="hover:text-accent">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Footer;

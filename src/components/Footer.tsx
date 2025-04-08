import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="p-3 lg:p-5 flex justify-between items-center text-light md:absolute md:bottom-0 md:inset-x-0 ">
      <div className="md:text-lg lg:text-xl ">© 2025 Zlatonn. All rights reserved.</div>
      <div className="flex gap-3 text-2xl md:text-3xl lg:text-4xl">
        <a href="https://www.linkedin.com/in/pongsakorn-lengklang/" target="_blank" className="hover:text-accent" aria-label="linkedin">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/Zlatonn" target="_blank" className="hover:text-accent" aria-label="github">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Footer;

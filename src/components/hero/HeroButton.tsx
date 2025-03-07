import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

import { HeroButtonProps as Props } from "@/types/hero";

const HeroButton = ({ title }: Props) => {
  return (
    <div className="my-3 md:my-7">
      <Button className="bg-light rounded-full text-secondary hover:bg-gradient-to-r hover:from-light hover:to-accent hover:rotate-3 transition-all duration-300">
        <FontAwesomeIcon icon={faChevronRight} />
        {title}
      </Button>
    </div>
  );
};

export default HeroButton;

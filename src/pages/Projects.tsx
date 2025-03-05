import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Marquee from "react-fast-marquee";
import StackIcon from "tech-stack-icons";

const Projects = () => {
  return (
    <div className="relative min-h-screen w-screen bg-secondary">
      <div className="py-28 flex flex-col items-center">
        <h1 className="font-display text-3xl md:text-4xl xl:text-5xl  font-bold bg-gradient-to-r from-light to-primary text-transparent bg-clip-text ">
          Projects
        </h1>

        {/* Slide wrapper */}
        <div className="max-w-5xl w-[95%] mt-10 scale-95 sm:scale-100">
          <Marquee
            pauseOnHover={true}
            gradient={true}
            gradientColor="black"
            gradientWidth={100}
            className="flex flex-nowrap shadow-sm shadow-light/50 rounded-xl overflow-hidden"
          >
            {/* Card */}
            <div className="mx-10 p-3 w-[300px] flex flex-col gap-3 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light rotate-6 scale-90 hover:rotate-0 hover:scale-100 hover:bg-primary duration-300">
              <img src="https://github.com/Zlatonn/warranty-expiry-checker/raw/master/frontend/src/assets/home%20page.png" />
              <div>
                <a
                  href="https://github.com/Zlatonn/warranty-expiry-checker"
                  target="_blank"
                  className="flex gap-2 items-center cursor-pointer hover:underline"
                >
                  <h2 className="font-semibold">Warranty Expiry Checker</h2>
                  <span className="-rotate-45">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
              <div className="text-xs">Jan 2025 ~ Feb 2025</div>
              <div className="text-xs text-light/70">
                · A web application for tracking warranty expiration dates of items. Users can log in, add items, edit details, delete
                items, and filter items based on warranty status.
              </div>
              <div className="flex gap-2 text-xs text-secondary pt-3">
                <div className="px-2 py-1 bg-light rounded-md">React</div>
                <div className="px-2 py-1 bg-light rounded-md">Tailwind</div>
                <div className="px-2 py-1 bg-light rounded-md">NodeJs</div>
                <div className="px-2 py-1 bg-light rounded-md">ExpressJs</div>
              </div>
            </div>

            <div className="mx-10 p-3 w-[300px] flex flex-col gap-3 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light rotate-6 scale-90 hover:rotate-0 hover:scale-100 hover:bg-primary duration-300">
              <img src="https://github.com/Zlatonn/warranty-expiry-checker/raw/master/frontend/src/assets/home%20page.png" />
              <div>
                <a
                  href="https://github.com/Zlatonn/warranty-expiry-checker"
                  target="_blank"
                  className="flex gap-2 items-center cursor-pointer hover:underline"
                >
                  <h2 className="font-semibold">Warranty Expiry Checker</h2>
                  <span className="-rotate-45">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
              <div className="text-xs">Jan 2025 ~ Feb 2025</div>
              <div className="text-xs text-light/70">
                · A web application for tracking warranty expiration dates of items. Users can log in, add items, edit details, delete
                items, and filter items based on warranty status.
              </div>
              <div className="flex gap-2 text-xs text-secondary pt-3">
                <div className="px-2 py-1 bg-light rounded-md">React</div>
                <div className="px-2 py-1 bg-light rounded-md">Tailwind</div>
                <div className="px-2 py-1 bg-light rounded-md">NodeJs</div>
                <div className="px-2 py-1 bg-light rounded-md">ExpressJs</div>
              </div>
            </div>

            <div className="mx-10 p-3 w-[300px] flex flex-col gap-3 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light rotate-6 scale-90 hover:rotate-0 hover:scale-100 hover:bg-primary duration-300">
              <img src="https://github.com/Zlatonn/warranty-expiry-checker/raw/master/frontend/src/assets/home%20page.png" />
              <div>
                <a
                  href="https://github.com/Zlatonn/warranty-expiry-checker"
                  target="_blank"
                  className="flex gap-2 items-center cursor-pointer hover:underline"
                >
                  <h2 className="font-semibold">Warranty Expiry Checker</h2>
                  <span className="-rotate-45">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </a>
              </div>
              <div className="text-xs">Jan 2025 ~ Feb 2025</div>
              <div className="text-xs text-light/70">
                · A web application for tracking warranty expiration dates of items. Users can log in, add items, edit details, delete
                items, and filter items based on warranty status.
              </div>
              <div className="flex gap-2 text-xs text-secondary pt-3">
                <div className="px-2 py-1 bg-light rounded-md">React</div>
                <div className="px-2 py-1 bg-light rounded-md">Tailwind</div>
                <div className="px-2 py-1 bg-light rounded-md">NodeJs</div>
                <div className="px-2 py-1 bg-light rounded-md">ExpressJs</div>
              </div>
            </div>
          </Marquee>
        </div>
      </div>

      <div className="pt-28 pb-80 flex flex-col items-center ">
        <h1 className="font-display text-3xl md:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-light to-primary text-transparent bg-clip-text ">
          MY TECH STACK
        </h1>
        {/* Icons Warpper*/}
        <div className="max-w-4xl mt-10 flex flex-wrap justify-center gap-2 lg:scale-110">
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="html5" className="w-5" />
            <span>HTML</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="css3" className="w-5" />
            <span>CSS</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="js" className="w-5" />
            <span>JavaScript</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="typescript" className="w-5" />
            <span>TypeScript</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="reactjs" className="w-5" />
            <span>ReactJS</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="reactrouter" className="w-5" />
            <span>React Router</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="reactquery" className="w-5" />
            <span>React Query</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="redux" className="w-5" />
            <span>Redux</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="vitejs" className="w-5" />
            <span>Vite</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="tailwindcss" className="w-5" />
            <span>TailwindCSS</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="materialui" className="w-5" />
            <span>Material UI</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="shadcnui" className="w-5" />
            <span>Shadcn/UI</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="gsap" className="w-5" />
            <span>GSAP</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="nodejs" className="w-5" />
            <span>NodeJS</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="mysql" className="w-5" />
            <span>MySQL</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="git" className="w-5" />
            <span>Git</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="github" className="w-5" />
            <span>GitHub</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="postman" className="w-5" />
            <span>Postman</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="docker" className="w-5" />
            <span>Docker</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="netlify2" className="w-5" />
            <span>Netlify</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="cloudflare" className="w-5" />
            <span>Cloudflare</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="railway" className="w-5" />
            <span>Railway</span>
          </div>
          <div className="px-3 py-1 flex items-center gap-1 bg-gray-300/10 border-[1px] border-light/10 rounded-xl text-light hover:bg-primary/70 hover:scale-95 duration-300">
            <StackIcon name="figma" className="w-5" />
            <span>Figma</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

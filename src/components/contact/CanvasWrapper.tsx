import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import LazyLoad from "react-lazyload";

import Logo3D from "./Logo3D";

import { logos } from "@/contents/ContactContent";

// Preloader 3D model
logos.forEach((logo) => {
  useGLTF.preload(logo.path);
});

const CanvasWrapper = () => {
  return (
    <LazyLoad height={320} offset={500}>
      <div className="w-full h-80">
        <Canvas>
          <ambientLight intensity={5} />
          <Environment preset="park" />
          {logos.map(({ path, pos, link }, i) => (
            <Logo3D key={`logo-${i}`} path={path} pos={pos} link={link} />
          ))}
        </Canvas>
      </div>
    </LazyLoad>
  );
};

export default CanvasWrapper;

import { useRef, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Logo3DProps as Props } from "@/types/contact";

const Logo3D = ({ path, pos, link }: Props) => {
  const { scene } = useGLTF(path);
  const ref = useRef<THREE.Object3D>(null);

  const [hovered, setHover] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  useFrame((_, delta) => {
    if (isRotating && ref.current) {
      ref.current.rotation.y += delta;
    }
  });

  useGSAP(() => {
    if (!ref.current) return;
    if (hovered) {
      gsap.to(ref.current.rotation, {
        y: Math.ceil(ref.current.rotation.y / (Math.PI * 2)) * (Math.PI * 2),
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(ref.current.scale, {
        x: 10,
        y: 10,
        z: 10,
        duration: 0.5,
        ease: "power2.out",
      });

      setIsRotating(false);
    } else {
      gsap.to(ref.current.scale, {
        x: 7,
        y: 7,
        z: 7,
        duration: 0.5,
        ease: "power2.out",
      });

      setIsRotating(true);
    }
  }, [hovered]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={7}
      position={pos}
      onPointerOver={() => {
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "default";
      }}
      onClick={() => window.open(link, "_blank")}
    />
  );
};

export default Logo3D;

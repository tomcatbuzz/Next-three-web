import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from "framer-motion-3d"
import { useMotionValue } from "framer-motion"
import * as THREE from 'three';

const Cube = ({ position, color }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [hovered, setHovered] = useState(false);

  const motionConfig = {
    stiffness: 150,
    damping: 20,
    mass: 1
  };

  return (
    <motion.mesh
      position={position}
      whileHover={{ scale: 1.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        x: hovered ? position[0] + mouseX.get() * 2 : position[0],
        y: hovered ? position[1] + mouseY.get() * 2 : position[1],
        z: hovered ? position[2] + Math.random() * 2 : position[2],
      }}
      transition={motionConfig}
    >
      <boxGeometry args={[1, 1, 1]} />
      <motion.meshStandardMaterial 
        color={color} 
        animate={{ 
          opacity: hovered ? 0.8 : 1,
        }} 
      />
    </motion.mesh>
  );
};

const CubeInstances = ({ count = 500, gap = 2, mouseX, mouseY }) => {
  const cubes = useMemo(() => {
    const size = Math.ceil(Math.pow(count, 1/3));
    const halfSize = (size * gap) / 2;
    
    return Array.from({ length: count }, (_, i) => {
      const x = ((i % size) * gap) - halfSize;
      const y = (Math.floor((i / size) % size) * gap) - halfSize;
      const z = (Math.floor(i / (size * size)) * gap) - halfSize;
      
      return {
        position: [x, y, z],
        color: new THREE.Color(Math.random(), Math.random(), Math.random()).getHex()
      };
    });
  }, [count, gap]);

  return (
    <>
      {cubes.map((cube, index) => (
        <Cube key={index} position={cube.position} color={cube.color} />
      ))}
    </>
  );
};

const CubeScene = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) / width);
    mouseY.set(((clientY - top - height / 2) / height) * -1);
  };

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'fixed' }} 
      onMouseMove={handleMouseMove}
    >
      <Canvas 
        camera={{ position: [0, 0, 50], fov: 50 }} 
        shadows
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow />
        <OrbitControls 
          makeDefault
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
        <CubeInstances count={500} gap={3} mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
};

export default CubeScene;
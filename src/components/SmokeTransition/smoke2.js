"use client"
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { shaderMaterial, PerspectiveCamera } from '@react-three/drei';
import { Vector3, Vector2, PlaneGeometry} from 'three';
import vertexShader from './shaders/cloud.vert';
import fragmentShader from './shaders/cloud.frag';
import { motion } from 'framer-motion-3d';
import styles from './smoke.module.scss';

const SmokeMaterial = shaderMaterial(
  {
    uTime: 0,
    uThreshold: 1.25,
    uScaleFactor: 3,
    uTimeFactor: 0.001,
    uDisplayStrength: 0.12,
    uGradientSize: 1.2 - 1,
    uColor: new Vector3(0.02, 0.47, 0.75),
    // uResolution: new Vector2(window.innerWidth, window.innerHeight),
    // adding hack 
    uResolution: new Vector2(1, 1),
  },
  vertexShader,
  fragmentShader
);

extend({ SmokeMaterial, PlaneGeometry });

const Plane = ({ startAnimation }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { camera, gl } = useThree();

  // first attempt changed below for window.innerwidth/height no defined
  // useEffect(() => {
  //   materialRef.current.uniforms.uResolution.value = new Vector2(window.innerWidth, window.innerHeight);

  //   const handleResize = () => {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     gl.setSize(window.innerWidth, window.innerHeight);
  //     meshRef.current.scale.set(window.innerWidth / window.innerHeight, 1, 1);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [camera, gl]);

  useEffect(() => {
    const updateResolution = () => {
      const newResolution = new Vector2(window.innerWidth, window.innerHeight);
      materialRef.current.uniforms.uResolution.value = newResolution;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
      meshRef.current.scale.set(window.innerWidth / window.innerHeight, 1, 1);
    };

    updateResolution(); // Set the initial resolution
    window.addEventListener('resize', updateResolution);

    return () => window.removeEventListener('resize', updateResolution);
  }, [camera, gl]);

  useFrame(({ clock }) => {
    if (startAnimation && materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[window.innerWidth / window.innerHeight, 1, 1]}>
      <planeGeometry args={[2, 2]} />
      <smokeMaterial ref={materialRef} transparent />
    </mesh>
  );
};

const SmokeTransition = ({ isEntering, isLeaving, onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isEntering ? 1 : 0 }}
      exit={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={onAnimationComplete}
      className={styles.smokeTransition}
    >
      <Canvas 
      camera={{ position: [0, 0, 20], fov: 50}} 
      className={styles.smokeTransitionCanvas}>
        {/* <PerspectiveCamera makeDefault position={[0, 0, 1]} /> */}
        <Plane startAnimation={isEntering || isLeaving} />
      </Canvas>
    </motion.div>
  );
};

export default SmokeTransition;
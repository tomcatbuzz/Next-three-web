import { extend, useFrame, useThree, useLoader} from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useTexture, shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';
// import vertex from './vertex.glsl';
// import fragment from './fragment.glsl';
import vertex from './vertex2.glsl';
import fragment from './fragment2.glsl';

// export const NoiseMaterial = shaderMaterial(
//   {
//     time: 0,
//     // color: new THREE.Color(0x00ff00)
//     // color: new THREE.Color('skyblue'),
//     resolution: new THREE.Vector2()
//   },

//   vertex,
//   fragment
// )

// extend({ NoiseMaterial })

function Background() {
  const materialRef = useRef();
  const meshRef = useRef();
  const { width, height } = useThree((state) => state.viewport);
  // const mousePosition = useRef({ x: 0, y: 0 });
  const texture = useLoader(THREE.TextureLoader, '/joel-filipe-k8apfKm-Md4-unsplash.jpg');
  
  const timeRef = useRef(0);

  // const updateMousePosition = useCallback((e) => {
  //   mousePosition.current = { x: e.pageX, y: e.pageY};
  // }, []);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0
      },
      uTexture: {
        value: texture
      },
      // uMouse: {
      //   value: new THREE.Vector2(0, 0)
      // },
      // uBg: {
      //   // value: new THREE.Color("#A1A3F7")
      //   value: new THREE.Color("#00BFFF")
      // },
      // uColorA: { value: new THREE.Color("#B22222") },
      // uColorB: { value: new THREE.Color("DC143C")},
      uResolution: { value: new THREE.Vector4() },
      uvRate1: {value: new THREE.Vector2(1, 1)}
    }), [texture]
  );

  // useEffect(() => {
  //   window.addEventListener("mousemove", updateMousePosition, false);
  //   return () => window.removeEventListener("mousemove", updateMousePosition, false);
  // }, [updateMousePosition]);

  // THIS normal clock works
  // useFrame((state) => {
  //   const { clock } = state;
  //   if (meshRef.current) {
  //     meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

  //  NEW TEST CLOCK
  useFrame((state, delta) => {
    // const { clock } = state;
    if (meshRef.current) {
      // timeRef.current += delta * 0.05;
      timeRef.current += 0.05;
      console.log(timeRef.current, "time")
      meshRef.current.material.uniforms.uTime.value = timeRef.current;
    
      // meshRef.current.material.uniforms.uMouse.value = new THREE.Vector2(
      //   mousePosition.current.x,
      //   mousePosition.current.y
      // )
    }
  });

  return (
    // <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -1]} >
    <mesh scale={[width, height, 1]} ref={meshRef}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial 
        ref={materialRef}
        fragmentShader={fragment} 
        vertexShader={vertex}
        uniforms={uniforms}
      />
    </mesh>
    
    // <Plane args={[2, 2]} position={[0, 0, -1]}>
    //   <shaderMaterial ref={materialRef} resolution={resolution} />
    // </Plane>
  )
}

export default Background;
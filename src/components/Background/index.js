import { extend, useFrame, useThree, useLoader} from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useTexture, shaderMaterial, Plane } from '@react-three/drei';
import { useMotionValue, useTransform } from 'framer-motion'
import useMouse from '@/components/useMouse';
import useDimension from '@/components/useDimension';
import * as THREE from 'three';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';

// const NoiseMaterial = shaderMaterial(
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
    
  const mouse = useMouse();
  const dimension = useDimension();
  const dampingFactor = 0.05;
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
}  

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0
      },
      uMouse: {
        value: new THREE.Vector2(0, 0)
      },
      uBg: {
        value: new THREE.Color("#A1A3F7")
        // value: new THREE.Color("#00BFFF")
        // value: new THREE.Color("#121212")
      },
      uColorA: { value: new THREE.Color("#00BFFF") },
      uColorB: { value: new THREE.Color("#03a9f4")},
      uResolution: { value: new THREE.Vector4() }
    }), []
  );

  // OLD MOUSE EVENT
  // const onMouseMove = useCallback((e) => {
  //   if (windowSize.width && windowSize.height) {
  //   mouseRef.current.x = (e.pageX / windowSize.width) * 2 - 1;
  //   mouseRef.current.y = -(e.pageY / windowSize.height) * 2 + 1;

  //   const mouseX = e.pageX - windowSize.width / 2;
  //   const mouseY = -(e.pageY - windowSize.height / 2);
  //   const targetMousePosition = new THREE.Vector2(mouseX, mouseY);

  //   if (materialRef.current) {
  //     materialRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y) * dampingFactor
  //   }
  //   console.log('Mouse position: X', mouseRef.current.x);
  //   console.log('Mouse position: Y', mouseRef.current.y);
  //   }
  // }, [windowSize.height, windowSize.width]);

  // useEffect(() => {
  //   window.addEventListener("mousemove", onMouseMove, false);
  //   return () => window.removeEventListener("mousemove", onMouseMove, false);
  // }, [onMouseMove]);

  // THIS normal clock works
  useFrame((state) => {
    const { clock } = state;
    const { x, y } = mouse
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();
    if (materialRef.current) {
    if(Math.abs(x - smoothX) > 1){
        smoothMouse.x.set(lerp(smoothX, x, 0.1))
        smoothMouse.y.set(lerp(smoothY, y, 0.1))
        materialRef.current.uniforms.uMouse.value = {
            x: x - smoothX * dampingFactor,
            y: -1 * (y - smoothY) * dampingFactor
        }
        // console.log(materialRef.current.uniforms.uMouse.value, 'mouse')
    }
    // if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      // console.log(materialRef.current.uniforms.uTime.value, 'time')

    }
  });

  const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * width / 2, width / 2])
  const y = useTransform(smoothMouse.y, [0, dimension.height], [height / 2, -1 * height / 2])

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
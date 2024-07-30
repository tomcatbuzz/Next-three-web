import { extend, useFrame, useThree} from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useTexture, shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';

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
  // const [resolution, setResolution] = useState(() => new THREE.Vector2(size.width, size.height));

  // useEffect(() => {
  //   setResolution(new THREE.Vector2(size.width, size.height))
  // }, [size]);

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0
      },
      colorA: { value: new THREE.Color("#FFE486") },
      colorB: { value: new THREE.Color("#FEB3D9")},
      resolution: { value: new THREE.Vector4() },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
      // materialRef.current.color = setHSL(clock.getElapsedTime() %1, 0.5, 0.5)
    }
    // console.log(materialRef.current, 'ref')
    // if (meshRef.current) {
    //   meshRef.current.scale.set(viewport.width, viewport.height, 1)
    // }
  });

  return (
    // <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -1]} >
    <mesh scale={[width, height, 1]} ref={meshRef}>
      <planeGeometry args={[1, 1]} />
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
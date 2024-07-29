import { extend, useFrame, useThree} from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { useTexture, shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';

export const NoiseMaterial = shaderMaterial(
  {
    time: 0,
    // color: new THREE.Color(0x00ff00)
    color: new THREE.Color('skyblue')
  },

  vertex,
  fragment
)

extend({ NoiseMaterial })

function Background() {
  const materialRef = useRef();
  const meshRef = useRef();
  const { size, viewport } = useThree();
  // const [resolution, setResolution] = useState(() => new THREE.Vector2(size.width, size.height));

  // useEffect(() => {
  //   setResolution(new THREE.Vector2(size.width, size.height))
  // }, [size]);

  useFrame(({clock}) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
      // materialRef.current.color = setHSL(clock.getElapsedTime() %1, 0.5, 0.5)
    }
    // console.log(materialRef.current, 'ref')
    // if (meshRef.current) {
    //   meshRef.current.scale.set(viewport.width, viewport.height, 1)
    // }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -1]}>
      <planeGeometry args={[1, 1]} />
      <noiseMaterial ref={materialRef} />
    </mesh>
    
    // <Plane args={[2, 2]} position={[0, 0, -1]}>
    //   <shaderMaterial ref={materialRef} resolution={resolution} />
    // </Plane>
  )
}

export default Background;
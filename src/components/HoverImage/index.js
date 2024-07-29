import { extend, useFrame} from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },

  vertex,
  fragment
)

extend({ ImageFadeMaterial })

function FadingImage() {
  const ref = useRef()
  // testing so I commented this
  const [texture1, texture2, dispTexture] = useTexture(["/img1.jpg", "/img2.jpg", "/disp1.jpg"])

  // this is broken, can't use useTexture in callback, but useMemo for performance if needed
  // const textures = useMemo(() => {
  //   return useTexture(["/img1.jpg", "/img2.jpg", "/disp1.jpg"]);
  // }, []);
  // const [texture1, texture2, dispTexture] = textures;

  const [hovered, setHover] = useState(false)
  useFrame(() => {
    ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.075)
  })
  return (
    <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry />
      <imageFadeMaterial ref={ref} tex={texture1} tex2={texture2} disp={dispTexture} toneMapped={false} />
    </mesh>
  )
}

export default FadingImage;
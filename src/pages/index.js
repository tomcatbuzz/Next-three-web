import Page from "@/components/page";
import AnimatedTextWord from "@/components/AnimatedTextWord";
import { motion } from "framer-motion";
import Image from 'next/image'
import testImage from '../../public/next.svg'
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter";
import ScrambleText from "@/components/ScrambleText";
import * as THREE from 'three';
import { Canvas, extend, useFrame} from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useTexture, shaderMaterial } from '@react-three/drei';

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      // #include <encodings_fragment>
    }`
)

extend({ ImageFadeMaterial })

function FadingImage() {
  const ref = useRef()
  const [texture1, texture2, dispTexture] = useTexture(["/img1.jpg", "/img2.jpg", "/disp1.jpg"])
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

export default function Home() {
  return (
    <Page>
      {/* <div className="home_container">
        <AnimatedTextWord  text="Home is here" />
      </div> */}
      <div className="home_container">
        <AnimatedTextCharacter  text="Tomcatbuzz" />
        {/* <div>
        <ScrambleText text="Hello" /><Image className="test_image" src={testImage} alt="Test Image"
          width={200} height={100}
        /><ScrambleText text="World" />
        </div> */}
        <motion.h1 className="home_text"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >Home</motion.h1>
        {/* <Canvas camera={{ position: [0, 0, 2], fov: 50}}> */}
        <Canvas camera={{ position: [0, 0, 2], fov: 20}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FadingImage />
      </Canvas>
      </div>
      
      <div className="background_text">creative developer</div>

      {/* <Canvas camera={{ position: [0, 0, 2], fov: 50}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FadingImage />
      </Canvas> */}
    </Page>
  )
}
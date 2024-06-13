import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import Cube from '@/components/Cube';


export default function Contact() {
  
    const cubes = [];
    const cubeSize = 0.5;
    const gap = 0.5;

    for (let x = -4; x < 4; x++) {
      for (let y = -4; y < 4; y++) {
        for (let z = -4; z < 4; z++) {
          const position = [
            x * (cubeSize + gap),
            y * (cubeSize + gap),
            z * (cubeSize + gap)
          ];
          cubes.push(
            <Cube
              key={`${x}-${y}-${z}`}
              position={position}
              cubeSize={cubeSize}
              gap={gap}
            />
          );
        }
      }
    }
  
  return (
    <Page>
      {/* <motion.div
        whileHover={{color: 'red', cursor: 'pointer'}}>
      <h1 className={styles.contactTag}>Contact page</h1>
      </motion.div> */}
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 20] }}
          style={{ width: '100vw', height: '100vh' }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {cubes}
        </Canvas>
      </Suspense>
    </Page>
  )
}
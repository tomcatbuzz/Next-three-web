import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import Cube from '@/components/Cube';
// import CubeScene from "@/components/CubeScene";
import CubeScene from "@/components/CubeScene2";

export default function Contact({isCanvasVisible}) {

  const Line = () => {
    const [style, setStyle] = useState({});

    useEffect(() => {
      const timer = setInterval(() => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        setStyle({
          top: `${top}vh`,
          left: `${left}vw`,
          // position: "absolute",
          // height: "2px",
          // width: "10px",
          // // backgroundColor: "white",
          // backgroundColor: "#1c7cbb",
          // animation: "fall 2s linear infinite",
        });
      }, Math.random() * 10000);

      return () => clearInterval(timer);
    }, []);

    return <div className={styles.line} style={style}></div>;
  }

  const myDivRef = useRef(null);
  useEffect(() => {
    if (myDivRef.current) {
      const width = myDivRef.current.offsetWidth;
      const gridWidth = 32;
      const maxDivs = Math.floor(width / gridWidth);
      const randomPosition = Math.floor(Math.random() * maxDivs) * gridWidth;
      myDivRef.current.style.left = `${randomPosition}px`;
    }
  })

  function getRandomSpacing(totalBlocks, totalLines) {
    let numbers = [];
    for (let i = 0; i < totalLines - 1; i++) {
      // Generate a random number between 1 and totalBlocks - sum of already generated numbers - (totalLines - i)
      numbers[i] = Math.floor(Math.random() * (totalBlocks - numbers.reduce((a, b) => a + b, 0) - (totalLines - i)) + 1);
    }
    // The last number is whatever is left from totalBlocks after subtracting the sum of already generated numbers
    numbers[totalLines - 1] = totalBlocks - numbers.reduce((a, b) => a + b, 0);
  
    // Convert block positions to pixel positions
    let pixelPositions = numbers.map(num => num * 32);
  
    return pixelPositions;
  }
  
  let linePositions = getRandomSpacing(60, 7);
  console.log(linePositions);

  function getRandomStartingValues(numLines, numBlocks, blockSize) {
    const maxBlockIndex = numBlocks - 1;
    const startingValues = new Set();

    while (startingValues.size < numLines) {
        const randomBlockIndex = Math.floor(Math.random() * (maxBlockIndex + 1));
        startingValues.add(randomBlockIndex * blockSize);
    }

    return Array.from(startingValues);
}

const numLines = 7;
const numBlocks = 29;
const blockSize = 32;

const randomStartingValues = getRandomStartingValues(numLines, numBlocks, blockSize);
console.log(randomStartingValues);

  
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
      <>
      <div className={styles.backGround} ref={myDivRef}>
      
      {/* <div className={styles.myDiv}></div>
      <div className={styles.myDiv2}></div>
      <div className={styles.myDiv3}></div>
      <div className={styles.myDiv4}></div>
      <div className={styles.myDiv5}></div>
      <div className={styles.myDiv6}></div>
      <div className={styles.myDiv9}></div> */}
      <div className={styles.myDiv7}>
      <div style={{
        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke-width=\'2\' stroke=\'rgb(30 58 138 / 0.5)\' preserveAspectRatio=\'none\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")'
      }} className={styles.svg}></div>
      <div className={styles.myDiv8}></div>
      </div>
      {/* </div> */}

       {/* current grid */}
      <div>
        {[...Array(6)].map((_, i) => (
          <Line key={i} />
        ))}
      </div>
      
      <Suspense fallback={null}>
      {/* <CubeScene /> */}
      {isCanvasVisible && 
        <Canvas
          camera={{ position: [0, 0, 20] }}
          style={{ width: '100vw', height: '100vh', zIndex: 11, cursor: 'pointer' }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          
          {cubes}
          <OrbitControls />
        </Canvas>
      }
      </Suspense>
      </div>
      </>
    </Page>
  )
}
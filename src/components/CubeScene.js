import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

const CubeInstances = ({ count = 500, temp = new THREE.Object3D() }) => {
  const ref = useRef();
  const particles = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      p.push({ idx: i, position: [x, y, z] });
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    particles.forEach((particle) => {
      const { idx, position } = particle;
      temp.position.set(...position);
      temp.updateMatrix();
      ref.current.setMatrixAt(idx, temp.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Instances ref={ref} limit={count} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="green" />
      {particles.map((particle, i) => (
        <Instance key={i} position={particle.position} />
      ))}
    </Instances>
  );
};

const CubeScene = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'fixed', zIndex: 1}}>
    <Canvas 
      dpr={[1, 2]} 
      camera={{ position: [0, 0, 20], fov: 50}} 
      shadow
      style={{ background: 'transparent'}}>
      <color attach="background" args={["#f0f0f0"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} castShadow />
      <CubeInstances />
      <OrbitControls />
    </Canvas>
    </div>
  );
};

export default CubeScene;
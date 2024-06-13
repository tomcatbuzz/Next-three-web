import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import { motion } from 'framer-motion-3d';

const Cube = ({ position, cubeSize, gap }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (active) {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z += delta *2;
    } else {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = 1;
    }
  });

  const bind = useGesture({
    onHover: ({ hovering }) => setHovered(hovering),
    onHoverEnd: () => setActive(false),
    onHoverStart: () => setActive(true),
    // onDrag: ({ active }) => setActive(active)
  });

  return (
    <motion.mesh
      ref={ref}
      position={position}
      animate={hovered ? {scale: [1.2, 1.2, 1.2] } : { scale: [1, 1, 1] }}
      transition={{ duration: 0.3 }}
      {...bind()}
    >
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </motion.mesh>
  )
};

export default Cube;
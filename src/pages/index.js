import Page from "@/components/page";
import AnimatedTextWord from "@/components/AnimatedTextWord";
import { motion } from "framer-motion";
import Image from 'next/image'
import testImage from '../../public/next.svg'
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter";
import ScrambleText from "@/components/ScrambleText";

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
      </div>
      
      <div className="background_text">creative developer</div>
      
      {/* <motion.h1 className="home_text"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      >Home</motion.h1> */}
    </Page>
  )
}
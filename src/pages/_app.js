// import "@/styles/globals.scss";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import { useRouter } from "next/router";
import '@/styles/styles.scss'
import { motion, AnimatePresence } from "framer-motion";
// import Preloader from "@/components/Preloader";
import Preloader2 from "@/components/Preloader2";
import { useState, useEffect } from "react";
// import Grid from "@/components/Grid";
import { opacity, expand } from "@/components/Grid/anim";

const App = ({ Component, pageProps}) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (
      async () => {
        // add locomotive//???????????????
          // const LocomotiveScroll = (await import('locomotive-scroll')).default
          // const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  const router = useRouter();
  const nbOfSquares = 5
  const anim = (variants, custom=null) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants,
        custom
    }
}

  return (
    <>
      <AnimatePresence>{isLoading && <Preloader2 />}</AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={router.pathname}>
          <Component {...pageProps} />

          {/* <motion.div 
    className="slide-in"
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
    </motion.div>
    <motion.div className="slide-out"
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

    </motion.div> */}
          <div className="page grid">
            <motion.div {...anim(opacity)} className="transition-background" />
            <div className="transition-container">
              {[...Array(nbOfSquares)].map((_, i) => {
                return (
                  <motion.div key={i} {...anim(expand, nbOfSquares - i)} />
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;
import { useRouter } from "next/router";
import '@/styles/styles.scss'
import { motion, AnimatePresence } from "framer-motion";
// import Preloader from "@/components/Preloader";
// import Preloader from "@/components/Preloader2";
import Preloader from "@/components/Preloader3";
import { useState, useEffect } from "react";
// import Grid from "@/components/Grid";
import { opacity, expand } from "@/components/Grid/anim";
// import SmokeTransition from "@/components/SmokeTransition/SmokeTransition";
import SmokeTransition from "@/components/SmokeTransition/smoke2"

const App = ({ Component, pageProps}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false)
  // original working
  useEffect(() => {
    (
      async () => {
        // add locomotive//???????????????
          // const LocomotiveScroll = (await import('locomotive-scroll')).default
          // const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            setIsEntering(true);
            setCanvasVisible(true)
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 20000)
      }
    )()
  }, [])

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setCanvasVisible(false);
      setIsLeaving(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setCanvasVisible(true);
      }, 1500); // Adjust delay as needed
      setIsLeaving(false);
      setIsEntering(true);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  const handleEnterComplete = () => {
    setIsEntering(false);
  };

  const handleLeaveComplete = () => {
    setIsLeaving(false);
  };

  // const router = useRouter();
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
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={router.pathname}>
          <Component {...pageProps} isCanvasVisible={isCanvasVisible} />
          {/* <div className="page">
          <SmokeTransition
            isEntering={isEntering}
            isLeaving={isLeaving} 
            onAnimationComplete={isEntering ? handleEnterComplete : handleLeaveComplete} />
          </div> */}
          
          
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
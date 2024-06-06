import { motion } from 'framer-motion';
import { opacity, expand } from './anim';
import styles from './style.module.scss'

export default function Grid({children, custom}) {

    const anim = (variants, custom=null) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            variants,
            custom
        }
    }

    
    const nbOfSquares = 5
    console.log(nbOfSquares)
    return (
        <div className={grid}>
            <motion.div {...anim(opacity)} className={transition-background}/>
            <div className={transition-container}>
                {
                    [...Array(nbOfSquares)].map( (_, i) => {
                        return (
                            <motion.div key={i} {...anim(expand, nbOfSquares - i)} />
                        ) 
                    })
                }
            </div>
            {
                children
            }
        </div>
    )
    
}

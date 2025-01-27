 
import { motion } from "framer-motion"

const PreLoader = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{scale: 0.75, opacity: 0}}
    className='pre_loader'>
    <svg viewBox="-1950 -975 3900 1950" style={{'--d0': '942px', '--d1': '2826px', width: '120px', height: '120px'}}>
      <linearGradient id="g">
        <stop stopColor="#51b9d6"></stop>
        <stop stopColor="#dd9292" offset="1"></stop>
      </linearGradient>
      <mask id="m">
        <circle r="1200" fill="#000"></circle>
        <use xlinkHref="#c"></use>
      </mask>
      <circle id="c" r="600"></circle>
      <g>
        <use xlinkHref="#c"></use>
      </g>
    </svg>

    </motion.div>
  )
}

export default PreLoader
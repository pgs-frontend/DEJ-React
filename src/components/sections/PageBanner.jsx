import { motion } from "framer-motion"

const PageBanner = ({title}) => {
  return (
    <section 
        id='home-banner' 
        className='w-full  overflow-hidden relative pt-[6rem]'
    >

    <motion.div 
        className='w-full h-full relative flex flex-col'
        initial={{scale: 1.1, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 1.1, opacity: 0}}
        transition={{duration: 0.5, type: 'tween', delay: 0.4}}
        >
            <div className='flex flex-1 flex-col items-center justify-center relative'>
                <div className='block text-center banner-title sm'>
                    {
                        title && 
                        <h2>
                            <span>{title}</span>
                        </h2>
                    }
                    
                </div>
            </div>
        </motion.div>

    </section>
  )
}

export default PageBanner
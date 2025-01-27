import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import Select from 'react-select'
import locations from "../../store/locations";
import { atom, useSetAtom } from "jotai";
import { motion } from "framer-motion"

export const searchFilterAtom = atom({
    keywords: '', 
    location: '',
    company: '',
    predicted_de_job_category: []
})

const HomeBanner = () => {

    const [isLoading, setIsLoading] = useState(false)
    const scrollToJobListing = ()=> document.getElementById('jobs').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    const [formValues, setFormValue] = useState({
        keywords: '', 
        location: '',
        company: '',
        predicted_de_job_category: []
    })
    const setSearchValue = useSetAtom(searchFilterAtom)

    const onLocationChanged = (value)=> {
        setFormValue(()=> {
            return {
                ...formValues,
                location: value
            }
        })
    }

    const onKeywordChanged = (value)=> {
        setFormValue(()=> {
            return {
                ...formValues,
                keywords: value
            }
        })
    }

    const onSearch = async (e)=> {
        e.preventDefault()
        setIsLoading(true)

        if(formValues.keywords || formValues.location){
            setSearchValue(formValues)
            document.getElementById('jobs').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        }
        
        setIsLoading(false)
    }

  return (
    <section 
        id='home-banner' 
        className='w-full  overflow-hidden relative pt-[6rem]'
    >
        <motion.div 
        className='absolute top-0 left-0 w-full h-full'
        initial={{scale: 1.1, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 1.1, opacity: 0}}
        transition={{duration: 0.8, type: 'tween', delay: 0.2}}
        >
            <video autoPlay playsInline loop muted className='absolute top-0 left-0 w-full h-full object-cover opacity-20'>
                <source src='/banner-video.mp4' type='video/mp4'/>
            </video>
        </motion.div>

        <motion.div 
        className='w-full h-full relative flex flex-col'
        initial={{scale: 1.1, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 1.1, opacity: 0}}
        transition={{duration: 0.5, type: 'tween', delay: 0.2}}
        >
            <div className='flex flex-1 flex-col items-center justify-center relative'>
                <div className='block text-center banner-title'>
                    <h2>
                        <span>Find your perfect</span>
                        <span>role in the</span>
                        <span>Digital Economy</span>
                    </h2>

                    <div className='w-full flex items-center justify-center gap-4 mt-5'>
                        <button className='outline-btn' type="button" onClick={scrollToJobListing}>
                            <span>View Jobs</span>
                        </button>
                        <button className='icon-btn' type="button">
                            <FiArrowUpRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full relative flex items-center justify-center banner-search-bar'>
                <form className="search-jobs-form" onSubmit={onSearch}>
                    <div className="input_">
                        <LuSearch />
                        <input type="text" placeholder="Job Title or Keyword" onChange={e=> onKeywordChanged(e.target.value)}/>
                    </div>
                    {
                        locations && 
                        <>
                            <span>|</span>
                            <div className="input_">
                                <FiMapPin />
                                <Select 
                                    options={locations} 
                                    placeholder={'Search by Location'}
                                    classNamePrefix={'dej-flat-select'}
                                    className="custom-select style-2 flex-1"
                                    onChange={(e)=> onLocationChanged(e.value)}
                                    menuPortalTarget={document.getElementById('root')}
                                />
                            </div>
                        </>
                    }
          
                    <button type="submit" className="submit-btn">

                        {
                            isLoading ? 
                            <svg version="1.1" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve">
                                <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                                C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 20 20"
                                to="360 20 20"
                                dur="0.5s"
                                repeatCount="indefinite"/>
                                </path>
                            </svg>
                            :
                            <LuSearch />
                        }
                        
                    </button>
                </form>
            </div>
        </motion.div>
    </section>
  )
}

export default HomeBanner
import { useCallback, useEffect, useMemo, useState } from "react"
import Container from "../layouts/Container"
import Select from 'react-select'
import moment from "moment/moment"
import { FiMapPin } from "react-icons/fi";
import { useAtom, atom, useSetAtom } from "jotai";
import { searchFilterAtom } from "./HomeBanner";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion"
import linkedInImage from "@/assets/images/linkedin-icon.png"
import { useTranslation } from "react-i18next";
import { LuCalendarCheck } from "react-icons/lu";

export const jobsListingAtom = atom([])

const JobCatergoryList = ({data, onCategoryClick, activeCategories})=> {
    const list = useMemo(()=> {
        const result = data.categories.sort()
        return result
    }, [data, activeCategories])

    const onCategory = useCallback((value)=> {
        let list
        if(activeCategories.includes(value)){
            list = activeCategories.filter(item=> item !== value)
        }else{
            list = [...activeCategories, value]
        }
        onCategoryClick({
            predicted_de_job_category: [...new Set(list)]
        })
    }, [activeCategories])


    return (
        <ul className="flex w-full items-center gap-3 overflow-x-scroll no-scrollbar lg:justify-start 2xl:justify-center">
            {
                list?.map((item, index)=> (
                    <li className="relative inline-block" key={'category-' + index}>
                        <button className={`tag ${activeCategories?.includes(item) ? 'active' : ''}`} onClick={()=> onCategory(item)}>{item}</button>
                    </li>
                ))
            }
        </ul>
    )
}

const JobFilter = ({data, totalJobs, onCompaniesChanged, onCategoriesChanged, filterValues})=> {

    const [filters, setFilters] = useState({})
    const {t} = useTranslation()


    useEffect(()=> {
        setFilters(()=> {
            const companies = data.companies.sort()
            const categories = data.categories.sort()
            return {
                companies: companies.map((item)=> {return {value: item, label: item}}),
                categories: categories.map((item)=> {return {value: item, label: item}}),
            }
        })
    }, [])

    return (
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-12 mb-6">
            <div className="inline-flex flex flex-col w-full sm:w-auto sm:flex-row items-center gap-6 lg:gap-3">
                {
                    filters.companies &&
                    <Select 
                        options={[{value: '', label: 'All Companies'}, ...filters.companies]} 
                        placeholder={<span>{t('filter_company')} <strong>{filters.companies.length}</strong></span>}
                        classNamePrefix={'dej-select'}
                        className="custom-select"
                        onChange={(e)=> onCompaniesChanged({company: e.value})}
                        value={filterValues.company && {value: filterValues.company && filterValues.company, label: filterValues.company && filterValues.company}}
                    />
                }
                {
                    filters.categories &&
                    <Select 
                        options={[{value: '', label: 'All Categories'}, ...filters.categories]} 
                        placeholder={<span>{t('select_job_category')} <strong>{filters.categories.length}</strong></span>}
                        classNamePrefix={'dej-select'}
                        className="custom-select"
                        onChange={(e)=> onCategoriesChanged({predicted_de_job_category: [e.value]})}
                        value={filterValues.predicted_de_job_category[0] && {value: filterValues.predicted_de_job_category[0], label: filterValues.predicted_de_job_category[0]}}
                    />
                }
            </div>
            <div className="inline-flex items-center gap-2">
                <strong className="text-3xl font-semibold">{totalJobs}</strong>
                <span>{t('total_open_roles')}</span>
            </div>
        </div>
    )
}

const JobListing = ({data})=> {

    const [listCount, setListCount] = useState(12)
    const {t} = useTranslation()

    return (
        <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {
                data?.map((item, index)=> (
                    <div className="w-full flex flex-col gap-4 relative bg-white p-4 rounded-3xl overflow-hidden" key={'jobs-' + index}>

                        <div className="relative w-full gap-4 flex items-center justify-between">
                            
                            {
                                item.logo_url &&
                                <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden border-3 border-[#f6f6f6]">
                                    <img src={item.logo_url} alt={item.company} className="w-full h-full object-cover" />
                                </div>
                            }

{
                                item.predicted_de_job_category &&
                                <div className="block">
                                    <div className="inline-block items-center bg-[#b68a3512] text-[#B68A35] font-medium px-3 py-1 rounded-2xl text-sm">{item.predicted_de_job_category}</div>
                                </div>
                            }

                        </div>

                        <div className="block relative w-full flex-1">
                            

                            {
                                item.job_title && 
                                <div className="w-full flex item-start gap-5 mt-1 justify-between">
                                    <h3 className="block font-bold text-start flex-1 text-lg">{item.job_title}</h3>

                                </div>
                            }
                            {
                                item.company && 
                                <p className="block text-sm mt-2">{item.company}</p>
                            }
                        </div>

                        <div className="flex w-full items-center gap-2">
                            {/* {
                                item.status &&
                                <div className="inline-block items-center bg-[#0a66c217] text-[#0A66C2] font-medium px-3 py-1 rounded-2xl text-sm">{item.status}</div>
                            } */}
                            

                            <div className="inline-flex items-center gap-2 border border-slate-200 bg-[#f2f8ff] rounded-2xl">
                            {/* <div className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-[#595c60]">
                                <LuCalendarCheck className="text-[#fff]" size={12} /> 
                            </div>
                                 */}
                                <p className="font-medium leading-[100%] p-0 inline-block text-sm bg-text bg-[#4f5962] text-white px-2 py-2 rounded-2xl">Posted</p>
                            <p className="font-medium leading-[100%] p-0 inline-block text-sm me-2">{moment(item.inserted_date).format('LL')}</p>
                            </div>
                         
                        </div>

                        <hr className="border-[#f6f6f6]" />

                        <div className="w-full flex items-center justify-between gap-5">
                            {
                                item.predicted_location &&
                                <div className="inline-flex gap-2 items-center">
                                    {/* <FiMapPin /> */}
                                    <p className="text-sm truncate font-medium">{item.predicted_location}</p>
                                </div>
                            }

                            {
                                item.predicted_link && 
                                <a href={item.predicted_link} referrerPolicy={'no-referrer'} className="btn-regular outline" title="Details" target={'_blank'}>
                                    <span>{t('details')}</span>
                                </a>
                            }
                            
                            
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

const JobSearchValues = ({filterData})=> {

    const setSearchValue = useSetAtom(searchFilterAtom)

    const onFilterReset = (value)=> {
        setSearchValue((data)=> {
            return {
                ...data,
                ...value
            }
        })
    }

    return (
        <div className="w-full flex flex-wrap gap-2 items-start mb-6">
            {
                filterData.keywords &&
                <div onClick={()=> onFilterReset({keywords: ''})} className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75">
                    <span>Keyword: </span>
                    {
                        <span>{filterData.keywords}</span>
                    }
                    <IoIosClose />
                </div>
            }
            {
                filterData.location &&
                <div onClick={()=> onFilterReset({location: ''})} className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75">
                    <span>Location: </span>
                    {
                        <span>{filterData.location}</span>
                    }
                    <IoIosClose />
                </div>
            }
            {
                filterData.company &&
                <div onClick={()=> onFilterReset({company: ''})} className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75">
                    <span>Company: </span>
                    {
                        <span>{filterData.company}</span>
                    }
                    <IoIosClose />
                </div>
            }
            {
                filterData.predicted_de_job_category &&

                filterData.predicted_de_job_category?.map((item, index)=> (
                    item && 
                    <div onClick={()=> onFilterReset({predicted_de_job_category: filterData.predicted_de_job_category.filter(el=> el !== item)})} key={'selected-cat-' + index} className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75">
                        {
                            <span>{item}</span>
                        }
                        <IoIosClose />
                    </div>
                ))
                
            }
        </div>
    )
}

const HomeJobListing = ({data}) => {

  const [jobs, setJobs] = useAtom(jobsListingAtom)
  const [searchValues, setSearchValue] = useAtom(searchFilterAtom)

  const onFilterChanged = useCallback((value)=> {
    setSearchValue((data)=> {
        return {
            ...data,
            ...value,
        }
    })
  }, [searchValues])

  useEffect(()=> {  

    const searchedJobs = data?.jobs?.filter((item)=> 
        item.job_title?.match(new RegExp(`(${searchValues?.keywords})`, "gi")) && 
        item?.predicted_location?.match(new RegExp(`(${searchValues?.location})`, "gi")) &&
        item?.company?.match(new RegExp(`(${searchValues?.company})`, "gi")) 
    )
    setJobs(searchedJobs)

    if(searchValues?.predicted_de_job_category.length > 0) setJobs((data)=> data.filter(item=> searchValues?.predicted_de_job_category?.includes(item.predicted_de_job_category)).sort((a,b)=> {return new Date(b.inserted_date) - new Date(a.inserted_date)}))

  }, [searchValues])


  useEffect(()=> {

    setJobs(data.jobs.sort((a,b)=> {return new Date(b.inserted_date) - new Date(a.inserted_date)}))
  }, [])

  return (
    <motion.section 
    id="jobs" 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{ opacity: 0}}
    transition={{duration: 0.8, type: 'tween', delay: 0.2}}
    className="block w-full overflow-hidden relative pb-[7rem] bg-[var(--bg-color)]"
    >
        <JobCatergoryList data={data} onCategoryClick={onFilterChanged} activeCategories={searchValues?.predicted_de_job_category}/>
        <Container>
            <JobFilter data={data} totalJobs={jobs.length} onCategoriesChanged={onFilterChanged} onCompaniesChanged={onFilterChanged} filterValues={searchValues}/>
            <JobSearchValues filterData={searchValues}/>
            <JobListing data={jobs} />
        </Container>
    </motion.section>
  )
}

export default HomeJobListing
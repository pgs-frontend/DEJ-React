import { createFileRoute } from '@tanstack/react-router'
import HomeBanner from '../../components/sections/HomeBanner'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../hooks/useApi'
import { jobsListing } from '../../store/jobs'
import HomeJobListing from '../../components/sections/HomeJobListing'
import PreLoader from '../../components/preloader/PreLoader'
import { AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
})

function HomePage() {

    const {get} = useApi()

    const {data, isLoading, isError, isRefetching} = useQuery({
        queryKey: ['jobs-listing-query'],
        queryFn: async ()=> {
            try{
                const res = await get('/jobs')
                const category = jobsListing.jobs.map((item)=> item.predicted_de_job_category)
                const company = jobsListing.jobs.map((item)=> item.company)
                return {
                    ...res,
                    categories: [ ...new Set(category)],
                    companies: [...new Set(company)]
                }
            }catch(error){
                console.log(error)
            }
        },
        refetchOnMount: true,
        staleTime: 30000,
    })

    const onCategoryClick = (value)=> {
        console.log(value)
    }

  return (
    <>
        <Helmet>
            <title>Find Jobs | Digital Economy Jobs</title>
        </Helmet>

        <AnimatePresence>
            {
                isLoading && <PreLoader key={'preloader-anim'} />
            }

            {
                data && 
                <>
                    <HomeBanner key={'banner-anim'}/>
                    <HomeJobListing 
                        data={data} 
                        onCategoryClick={onCategoryClick}
                        key={'jobs-listing-anim'}
                    />
                </>
            }

        </AnimatePresence>
        
       
    </>
  )
}

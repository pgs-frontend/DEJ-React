import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import PageBanner from '../../../components/sections/PageBanner'

export const Route = createFileRoute('/_layout/$lang/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Digital Economy Jobs</title>
      </Helmet>
      <PageBanner title={'About Digital Economy Jobs'} breadcrumb={''} />
    </>
  )
}

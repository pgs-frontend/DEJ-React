import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import PageBanner from '../../../components/sections/PageBanner'

export const Route = createFileRoute('/_layout/$lang/terms-service')({
  component: TermsServicePage,
})

function TermsServicePage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Digital Economy Jobs</title>
      </Helmet>
      <PageBanner title={'Terms of Service'} />
    </>
  )
}

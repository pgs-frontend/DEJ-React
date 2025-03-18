import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import PageBanner from '../../../components/sections/PageBanner'

export const Route = createFileRoute('/_layout/$lang/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Digital Economy Jobs</title>
      </Helmet>
      <PageBanner title={'Privacy Policy'} />
    </>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import PageBanner from '../../../components/sections/PageBanner'

export const Route = createFileRoute('/_layout/$lang/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Digital Economy Jobs</title>
      </Helmet>
      <PageBanner title={'Contact Us'} />
    </>
  )
}

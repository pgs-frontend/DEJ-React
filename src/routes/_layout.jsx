import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import { useEffect, useState } from 'react'
import bannerBgImage from '@/assets/images/bg-img-min.png'
import i18n from '../lang/i18n'

export const Route = createFileRoute('/_layout')({
  component: RootLayout,
  beforeLoad: ({ params }) => {
    const lang = params.lang
    if (lang && i18n.language !== lang && i18n.languages.includes(lang)) {
      i18n.changeLanguage(lang)
    }
  },
})

const routeTree = Route.addChildren([createFileRoute('/_layout')()])

function RootLayout() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => setIsLoading(false), [])

  return (
    <div className="flex flex-col relative min-h-[100dvh]">
      <div className="absolute top-0 left-0 w-full h-[100dvh] pointer-events-none">
        <img
          src={bannerBgImage}
          alt="Banner background image"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <Header />
      <main className="w-full flex-1 block overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

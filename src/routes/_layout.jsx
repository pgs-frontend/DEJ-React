import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import PreLoader from '../components/preloader/PreLoader'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_layout')({
  component: RootLayout,
})

function RootLayout() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=> setIsLoading(false), [])

  return (
    <div className='flex flex-col relative min-h-[100dvh]'>
        <div className='absolute top-0 left-0 w-full h-[100dvh] pointer-events-none'>
            <img src='/bg-img-min.png' alt='Banner background image'  className='w-full h-full object-cover opacity-50'/>
        </div>
        <Header />
        <main className='w-full flex-1 block overflow-hidden'>
        <Outlet />
        </main>
        <Footer />
    </div>
  )
}

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import './assets/scss/tailwind.css'
import './assets/scss/app.scss'
import './lang/i18n'

const browserHistory = createBrowserHistory()
const queryClient = new QueryClient()

// Create a new router instance
const router = createRouter({ 
  routeTree, 
  history: browserHistory,
  context: {
    queryClient,
  },
  defaultPreload: 'idle',
  defaultPreloadDelay: 500,
  defaultPreloadMaxIdleTime: 3000,
  defaultPreloadMaxIdleTimeMs: 3000,
  defaultPreloadMaxIdleTimeMinMs: 1000,
})


// Render the app
const rootElement = document.getElementById('root')

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  )
}
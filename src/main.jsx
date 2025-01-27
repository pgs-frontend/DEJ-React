import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const browserHistory = createBrowserHistory()
const queryClient = new QueryClient()

// Create a new router instance
const router = createRouter({ 
  routeTree, 
  history: browserHistory,
  defaultPreload: 'intent',
  defaultPreloadDelay: 100,
  context: {
    queryClient,
  }
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
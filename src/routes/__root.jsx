import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import i18n from '../lang/i18n'

export const Route = createRootRoute({
  component: Root,
  beforeLoad: ({ params }) => {
    const lang = params.lang
    if (lang && i18n.language !== lang && i18n.languages.includes(lang)) {
      i18n.changeLanguage(lang)
    }
  },
})

function Root() {

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

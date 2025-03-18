import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createRootRoute({
  component: Root,
})

function Root() {

  const { i18n } = useTranslation();

  React.useEffect(()=> {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  })

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

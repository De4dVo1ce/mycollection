import React from 'react'
import { Header } from '../../../shared'
import { documentNames } from '../appValues'
import { LoginLogoutPage } from '../LoginLogoutPage'

interface PageNotFoundProps {}
export const PageNotFound: React.FC<PageNotFoundProps> = () => {
  document.title = documentNames.pageNotFound

  return (
    <LoginLogoutPage>
      <Header text="Page not found" variant="h6" />
    </LoginLogoutPage>
  )
}

export default PageNotFound

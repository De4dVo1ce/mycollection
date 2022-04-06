import React from 'react'
import { useWindowSize } from '../WindowSizeProvider'
import { LoginlogoutPageDiv } from './LoginLogoutPage.style'

interface LoginLogoutPageProps {}

export const LoginLogoutPage: React.FC<LoginLogoutPageProps> = ({
  children,
}) => {
  const windowContext = useWindowSize()
  return (
    <LoginlogoutPageDiv isMobileView={windowContext.isMobileView}>
      {children}
    </LoginlogoutPageDiv>
  )
}

export default LoginLogoutPage

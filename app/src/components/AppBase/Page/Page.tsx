import React from 'react'
import { useWindowSize } from '../WindowSizeProvider'
import { PageDiv } from './Page.style'

interface PageProps {}

export const Page: React.FC<PageProps> = ({ children }) => {
  const windowContext = useWindowSize()
  return <PageDiv isMobileView={windowContext.isMobileView}>{children}</PageDiv>
}

export default Page

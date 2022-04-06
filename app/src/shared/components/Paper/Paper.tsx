import React from 'react'
import { useWindowSize } from '../../../components/AppBase/WindowSizeProvider/WindowSizeProvider'
import { StyledPaper } from './Paper.styles'

interface PaperProps {}
export const Paper: React.FC<PaperProps> = ({ children }) => {
  const { isMobileView } = useWindowSize()
  return (
    <StyledPaper
      variant="outlined"
      sx={{ padding: isMobileView ? '16px' : '24px' }}
    >
      {children}
    </StyledPaper>
  )
}

export default Paper

import { Link as MuiLink } from '@mui/material'
import React from 'react'
import { LinkDiv } from './Link.styles'

interface LinkProps {
  to: string
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <LinkDiv>
      <MuiLink
        href={to}
        underline="hover"
        color="inherit"
        sx={{ display: 'inline-block' }}
      >
        {children}
      </MuiLink>
    </LinkDiv>
  )
}

export default Link

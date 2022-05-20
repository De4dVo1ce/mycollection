import { Link as MuiLink } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkDiv } from './Link.styles'

interface LinkProps {
  to: string
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(to, { replace: false })
  }

  return (
    <LinkDiv>
      <MuiLink
        onClick={onClick}
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

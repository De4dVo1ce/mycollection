import { Paper } from '@mui/material'
import React from 'react'

interface LoginLogoutPaperProps {}
export const LoginLogoutPaper: React.FC<LoginLogoutPaperProps> = ({
  children,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '16px',
        width: '100%',
      }}
    >
      {children}
    </Paper>
  )
}

export default LoginLogoutPaper

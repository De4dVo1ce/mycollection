import React from 'react'
import { Snackbar as MUISnackbar, Alert } from '@mui/material'

type SnackbarType = 'success' | 'error' | 'info' | 'warning'

interface SnackbarContextType {
  snackbar: React.ReactNode
  setSnackbar: (text: string, type: SnackbarType) => void
}

export const SnackbarContext = React.createContext<SnackbarContextType>(null!)

interface SnackbarProviderProps {}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = React.useState<React.ReactNode>(null)

  const closeSnackbar = () => {
    setSnackbar(null)
  }

  const useSnackbar = (text: string, type: SnackbarType) => {
    setSnackbar(
      <MUISnackbar
        open={true}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          elevation={6}
          variant="standard"
          severity={type}
          onClose={closeSnackbar}
        >
          {text}
        </Alert>
      </MUISnackbar>
    )
  }

  const value: SnackbarContextType = {
    snackbar,
    setSnackbar: useSnackbar,
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider

export const useSnackbar = () => {
  return React.useContext(SnackbarContext)
}

import React from 'react'
import { Navigate } from 'react-router-dom'
import { logout } from '../../../connection/api.auth'
import { createUrlFor } from '../../../createUrlFor'
import { Loading, Header, statusCodes } from '../../../shared'
import { documentNames, Global } from '../appValues'
import { useAuth } from '../AuthProvider'
import { LoginLogoutPage } from '../LoginLogoutPage'
import { LoginLogoutPaper } from '../LoginLogoutPaper'
import { useSnackbar } from '../SnackbarProvider'

interface LogoutProps {}
export const Logout: React.FC<LogoutProps> = () => {
  document.title = documentNames.logout

  const [loggedOut, setLoggedOut] = React.useState<boolean>(false)

  const auth = useAuth()
  const snackbar = useSnackbar()

  const onLogout = React.useCallback(
    async () => {
      await logout((status) => {
        switch (status) {
          case statusCodes.OK:
            clearInterval(Global.statusIntervalTimer)
            auth.signout(() => {
              setLoggedOut(true)
            })
            break
          default:
            snackbar.setSnackbar('Something went wrong.', 'error')
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      onLogout()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return loggedOut ? (
    <Navigate to={createUrlFor().login} state={undefined} />
  ) : (
    <LoginLogoutPage>
      <Header text="Logout" variant="h4" />
      <LoginLogoutPaper>
        <div>You are going to be logged out.</div>
        <Loading />
      </LoginLogoutPaper>
    </LoginLogoutPage>
  )
}

export default Logout

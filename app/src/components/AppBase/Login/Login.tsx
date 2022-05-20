import { Button } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../../connection/api.auth'
import { createUrlFor } from '../../../createUrlFor'
import {
  DividerBox,
  Header,
  PasswordField,
  TextField,
  setToStorage,
  statusCodes,
  messages,
  labels,
  areEqual,
} from '../../../shared'
import { useAuth } from '../AuthProvider'
import { LoginLogoutPage } from '../LoginLogoutPage'
import { LoginLogoutPaper } from '../LoginLogoutPaper'
import { STORAGE_KEY_ACCESS_TOKEN } from '../resources'
import { useSnackbar } from '../SnackbarProvider'
import { documentNames } from '../appValues'

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [errorText, setErrorText] = React.useState<string>('')
  const [username, setUserName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const location = useLocation()
  const locationState = location.state as { from: { pathname: string } }

  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()
  const auth = useAuth()

  const onLogin = React.useCallback(
    async (username: string, password: string) => {
      await login(username, password, (status, access_token, user) => {
        switch (status) {
          case statusCodes.OK:
            auth.signin(user, () => {
              setSnackbar(messages.LOGGED_IN(user.name), 'success')
              setToStorage(STORAGE_KEY_ACCESS_TOKEN, {
                access_token: access_token,
              })
              setErrorText('')
              const from = locationState?.from.pathname
              navigate(
                from && from !== createUrlFor().logout
                  ? from
                  : createUrlFor().collections.page,
                {
                  replace: true,
                }
              )
            })

            break

          case statusCodes.NOT_FOUND:
            setErrorText(messages.USERNAME_PASSWORD_NOT_CORRECT)
            break

          default:
            setErrorText(messages.SOMETHING_WENT_WRONG(status))
            break
        }

        setPassword('')
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationState]
  )

  React.useEffect(
    () => {
      document.title = documentNames.login
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      if (auth.user) {
        navigate(
          !areEqual(locationState?.from.pathname, createUrlFor().login)
            ? locationState?.from.pathname ?? createUrlFor().collections.page
            : createUrlFor().collections.page,
          {
            replace: true,
          }
        )
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationState]
  )

  const canLogin =
    [username, password].filter((str) => str.length === 0).length === 0

  const onPressEnter = (event: any) => {
    if (event.key === 'Enter' && canLogin) {
      onLogin(username, password)
    }
  }

  return (
    <LoginLogoutPage>
      <Header text={labels.HEADER_LOGIN} variant="h4" />
      <LoginLogoutPaper>
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          <span>{errorText}</span>
        </div>
        <TextField
          autoFocus
          label={labels.LABEL_USERNAME}
          fullWidth
          value={username}
          setValue={setUserName}
          onKeyPress={onPressEnter}
        />
        <PasswordField
          label={labels.LABEL_PASSWORD}
          showPassword
          password={password}
          setPassword={setPassword}
          onKeyPress={onPressEnter}
        />
        <DividerBox />
        <Button
          variant="contained"
          onClick={() => {
            onLogin(username, password)
          }}
          color="primary"
          disabled={!canLogin}
        >
          {labels.BUTTON_LOGIN}
        </Button>
      </LoginLogoutPaper>
    </LoginLogoutPage>
  )
}

export default Login

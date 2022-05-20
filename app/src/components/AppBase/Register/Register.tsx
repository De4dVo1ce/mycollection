import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../connection/api.auth'
import { createUrlFor } from '../../../createUrlFor'
import {
  DividerBox,
  Header,
  labels,
  messages,
  PasswordField,
  statusCodes,
  TextField,
} from '../../../shared'
import { documentNames } from '../appValues'
import { LoginLogoutPage } from '../LoginLogoutPage'
import { LoginLogoutPaper } from '../LoginLogoutPaper'
import { useSnackbar } from '../SnackbarProvider'

interface RegisterProps {}
export const Register: React.FC<RegisterProps> = () => {
  document.title = documentNames.register

  const [errorText, setErrorText] = React.useState<string>('')
  const [username, setUserName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('')

  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()

  const passwordConfirmed = password.localeCompare(passwordConfirm) === 0
  const canRegister =
    [username, password].filter((str) => str.length === 0).length === 0 &&
    passwordConfirmed

  const onRegister = React.useCallback(
    async (username: string, password: string) => {
      await register(username, password, (status) => {
        switch (status) {
          case statusCodes.CREATED:
            setSnackbar(messages.REGISTERED, 'success')
            navigate(createUrlFor().login, { replace: false })
            break

          case statusCodes.CONFLICT:
            setErrorText(messages.USERNAME_ARLEADY_EXISTS)
            break

          default:
            setErrorText(messages.SOMETHING_WENT_WRONG(status))
            break
        }

        setPassword('')
        setPasswordConfirm('')
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onPressEnter = (event: any) => {
    if (event.key === 'Enter' && canRegister) {
      onRegister(username, password)
    }
  }

  return (
    <LoginLogoutPage>
      <Header text={labels.HEADER_REGISTER} variant="h4" />
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
          index={0}
          label={labels.LABEL_PASSWORD}
          showPassword
          password={password}
          setPassword={setPassword}
          onKeyPress={onPressEnter}
        />
        <DividerBox />
        <PasswordField
          index={1}
          label={labels.LABEL_PASSWORD_CONFRIM}
          showPassword
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
          onKeyPress={onPressEnter}
        />
        <DividerBox />
        <Button
          variant="contained"
          onClick={() => {
            onRegister(username, password)
          }}
          color="primary"
          disabled={!canRegister}
        >
          {labels.BUTTON_REGISTER}
        </Button>
      </LoginLogoutPaper>
    </LoginLogoutPage>
  )
}

export default Register

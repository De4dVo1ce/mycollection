import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../connection/api.auth'
import { createUrlFor } from '../../../createUrlFor'
import {
  DeviderBox,
  Header,
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
  const snackbarContext = useSnackbar()

  const passwordConfirmed = password.localeCompare(passwordConfirm) === 0
  const canRegister =
    [username, password].filter((str) => str.length === 0).length === 0 &&
    passwordConfirmed

  const onRegister = async (username: string, password: string) => {
    await register(username, password, (status) => {
      switch (status) {
        case statusCodes.CREATED:
          snackbarContext.setSnackbar('Registered', 'success')
          navigate(createUrlFor().login, { replace: true })
          break

        case statusCodes.CONFLICT:
          setErrorText('Username already exists.')
          break

        default:
          setErrorText(`Something went wrong. Try again. [${status}]`)
          break
      }

      setPassword('')
      setPasswordConfirm('')
    })
  }

  const onPressEnter = (event: any) => {
    if (event.key === 'Enter' && canRegister) {
      onRegister(username, password)
    }
  }

  return (
    <LoginLogoutPage>
      <Header text="Register" variant="h4" />
      <LoginLogoutPaper>
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          <span>{errorText}</span>
        </div>
        <TextField
          autoFocus
          label="Username"
          fullWidth
          value={username}
          setValue={setUserName}
          onKeyPress={onPressEnter}
        />
        <PasswordField
          index={0}
          label="Password"
          showPassword
          password={password}
          setPassword={setPassword}
          onKeyPress={onPressEnter}
        />
        <DeviderBox />
        <PasswordField
          index={1}
          label="Confirm Password"
          showPassword
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
          onKeyPress={onPressEnter}
        />
        <DeviderBox />
        <Button
          variant="contained"
          onClick={() => {
            onRegister(username, password)
          }}
          color="primary"
          disabled={!canRegister}
        >
          {'Register'}
        </Button>
      </LoginLogoutPaper>
    </LoginLogoutPage>
  )
}

export default Register

import {
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from '@mui/material'

import { useState } from 'react'
import {
  StyledVisibilityIcon,
  StyledVisibilityOffIcon,
} from './PasswordField.styles'

export interface PasswordFieldProps {
  index?: number
  autoFocus?: boolean
  label?: string
  showPassword?: boolean
  password: string
  setPassword: (newPassword: string) => void
  onKeyPress?: (event: any) => void
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  index = 0,
  autoFocus = false,
  label,
  showPassword = false,
  password,
  setPassword,
  onKeyPress = () => {},
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const onClickVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-password-${index}`}
        label={label}
        type={isVisible ? 'text' : 'password'}
        value={password}
        autoFocus={autoFocus}
        onChange={(event) => {
          setPassword(event.target.value)
        }}
        onKeyDown={onKeyPress}
        endAdornment={
          showPassword && (
            <InputAdornment position="end">
              <IconButton onClick={onClickVisibility}>
                {isVisible ? (
                  <StyledVisibilityIcon />
                ) : (
                  <StyledVisibilityOffIcon />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  )
}

export default PasswordField

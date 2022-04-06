import { ButtonProps as MuiButtonProps, TypographyProps } from '@mui/material'
import React from 'react'
import { useTheme } from '../../../components/AppBase/ThemeProvider/ThemeProvider'
import { Button } from '../Button'
import { Menu, MenuProps } from '../Menu'
import { HeaderDiv, HeaderTypography } from './Header.styles'

type HeaderAction =
  | {
      type: 'button'
      props: MuiButtonProps
    }
  | {
      type: 'menu'
      props: MenuProps
    }

interface HeaderProps extends TypographyProps {
  text: string
  primary?: HeaderAction
  secondary?: HeaderAction
}

export const Header: React.FC<HeaderProps> = (props) => {
  const themeContext = useTheme()

  if (props.primary) {
    if (props.primary.type === 'button') {
      props.primary.props.variant = 'contained'
    } else if (props.primary.props.button) {
      props.primary.props.button.variant = 'contained'
    }
  }

  if (props.secondary) {
    if (props.secondary.type === 'button') {
      props.secondary.props.variant = 'outlined'
    } else if (props.secondary.props.button) {
      props.secondary.props.button.variant = 'outlined'
    }
  }

  return (
    <HeaderDiv>
      <HeaderTypography color={themeContext.theme.text?.primary} {...props}>
        {props.text}
      </HeaderTypography>
      {props.primary ? (
        props.primary.type === 'button' ? (
          <Button {...props.primary.props} />
        ) : (
          <Menu {...props.primary.props} />
        )
      ) : (
        <></>
      )}
      {props.secondary ? (
        props.secondary.type === 'button' ? (
          <Button {...props.secondary.props} />
        ) : (
          <Menu {...props.secondary.props} />
        )
      ) : (
        <></>
      )}
    </HeaderDiv>
  )
}

export default Header

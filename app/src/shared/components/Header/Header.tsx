import { ButtonProps as MuiButtonProps, TypographyProps } from '@mui/material'
import React from 'react'
import { useTheme } from '../../../components/AppBase/ThemeProvider/ThemeProvider'
import { Button } from '../Button'
import { Menu, MenuProps } from '../Menu'
import { MoreActionsButton, MoreActionsButtonProps } from '../MoreActionsButton'
import { HeaderDiv, HeaderTypography } from './Header.styles'

type HeaderAction =
  | {
      type: 'button'
      props: MuiButtonProps & { text?: string }
    }
  | {
      type: 'menu'
      props: MenuProps & { text?: string }
    }
  | {
      type: 'more_action'
      props: MoreActionsButtonProps
    }

interface HeaderProps extends TypographyProps {
  text: string
  primary?: HeaderAction
  secondary?: HeaderAction
}

export const Header: React.FC<HeaderProps> = (props) => {
  const themeContext = useTheme()

  const primary = props.primary
  const secondary = props.secondary
  const text = props.text

  if (primary) {
    switch (primary.type) {
      case 'button':
        primary.props.variant = 'contained'
        break
      case 'menu':
        if (primary.props.button) {
          primary.props.button.variant = 'contained'
        }
        break
      default:
        break
    }
  }

  if (secondary) {
    switch (secondary.type) {
      case 'button':
        secondary.props.variant = 'outlined'
        break
      case 'menu':
        if (secondary.props.button) {
          secondary.props.button.variant = 'outlined'
        }
        break
      default:
        break
    }
  }

  return (
    <HeaderDiv>
      <HeaderTypography color={themeContext.theme.text?.primary} {...props}>
        {text}
      </HeaderTypography>
      {primary &&
        (primary.type === 'button' ? (
          <Button
            {...primary.props}
            children={primary.props.text ?? primary.props.children}
          />
        ) : primary.type === 'menu' ? (
          <Menu {...primary.props} />
        ) : (
          <MoreActionsButton {...primary.props} />
        ))}
      {secondary &&
        (secondary.type === 'button' ? (
          <Button
            {...secondary.props}
            children={secondary.props.text ?? secondary.props.children}
          />
        ) : secondary.type === 'menu' ? (
          <Menu {...secondary.props} />
        ) : (
          <MoreActionsButton {...secondary.props} />
        ))}
    </HeaderDiv>
  )
}

export default Header

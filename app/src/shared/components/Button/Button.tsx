import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Stack,
} from '@mui/material'
import React from 'react'

interface ButtonProps extends MuiButtonProps {
  placement?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Stack
      direction="row"
      justifyContent={
        props.placement
          ? props.placement === 'left'
            ? 'start'
            : 'end'
          : 'start'
      }
    >
      <MuiButton {...props} />
    </Stack>
  )
}

export default Button

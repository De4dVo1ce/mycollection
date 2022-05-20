import {
  FormControlLabel as MuiFormControlLabel,
  Radio as MuiRadio,
} from '@mui/material'
import React from 'react'

interface RadioButtonProps {
  label: string
  lablePlacement: 'top' | 'bottom' | 'start' | 'end'
  value: any
  checked: boolean
  onClick: (value: any) => void
  disabled: boolean
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  lablePlacement,
  value,
  checked,
  onClick,
  disabled,
}) => {
  const handleClick = () => {
    onClick(value)
  }

  return (
    <MuiFormControlLabel
      style={{ margin: '0 4px' }}
      control={<MuiRadio checked={checked} onClick={handleClick} />}
      label={label}
      labelPlacement={lablePlacement}
      disabled={disabled}
    />
  )
}

export default RadioButton

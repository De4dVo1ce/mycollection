import { TextField as MUITextField } from '@mui/material'

export interface TextFieldProps {
  autoFocus?: boolean
  id?: string
  label: string
  title?: string
  fullWidth?: boolean
  value: string
  setValue: (newValue: string) => void
  onKeyPress?: (event: any) => void
}

export const TextField: React.FC<TextFieldProps> = ({
  autoFocus = false,
  id,
  label,
  title,
  fullWidth = true,
  value,
  setValue,
  onKeyPress = () => {},
}) => {
  return (
    <MUITextField
      id={id}
      autoFocus={autoFocus}
      title={title}
      margin="normal"
      label={label}
      type="text"
      fullWidth={fullWidth}
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
      onKeyPress={onKeyPress}
    />
  )
}

export default TextField

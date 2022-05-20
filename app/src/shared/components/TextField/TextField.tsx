import { TextField as MUITextField } from '@mui/material'

export interface TextFieldProps {
  autoFocus?: boolean
  id?: string
  label?: string
  title?: string
  placeholder?: string
  fullWidth?: boolean
  value: string
  multiline?: boolean
  setValue: (newValue: string) => void
  onKeyPress?: (event: any) => void
}

export const TextField: React.FC<TextFieldProps> = ({
  autoFocus = false,
  id,
  label,
  title,
  placeholder,
  fullWidth = true,
  value,
  multiline = false,
  setValue,
  onKeyPress = () => {},
}) => {
  return (
    <MUITextField
      id={id}
      autoFocus={autoFocus}
      multiline={multiline}
      rows={multiline ? 4 : 1}
      title={title}
      margin="normal"
      label={label}
      placeholder={placeholder}
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

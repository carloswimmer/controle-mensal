import { TextField, TextFieldProps } from '@mui/material'
import { useDarkMode } from '../../hooks/darkMode'

const Input = (props: TextFieldProps) => {
  const {
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    helperText,
    InputProps,
    ...others
  } = props

  const { darkMode } = useDarkMode()

  return (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      value={value}
      name={name}
      color={darkMode ? 'secondary' : 'primary'}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={InputProps}
      {...others}
    />
  )
}

export default Input

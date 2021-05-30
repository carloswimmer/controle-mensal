import { TextField, TextFieldProps } from '@material-ui/core'
import NumberFormat from 'react-number-format'
import { useDarkMode } from '../../hooks/darkMode'

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      decimalSeparator=","
      thousandSeparator="."
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      isNumericString
    />
  )
}

const Currency = (props: TextFieldProps) => {
  const { name, label, value, onChange, onBlur, error, helperText, ...others } =
    props

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
      onFocus={event => event.target.select()}
      error={error}
      helperText={helperText}
      InputProps={{ inputComponent: NumberFormatCustom }}
      {...others}
    />
  )
}

export default Currency

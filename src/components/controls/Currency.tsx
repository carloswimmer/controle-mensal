import { TextField, TextFieldProps } from '@mui/material'
import { useDarkMode } from '../../hooks/darkMode'
import { ChangeEvent } from 'react'

const formatCurrency = (
  value: number | string,
  locale: string = 'pt-BR',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
) => {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numberValue)
}

const Currency = (props: TextFieldProps) => {
  const { name, label, value, onChange, onBlur, error, helperText, ...others } =
    props
  const { darkMode } = useDarkMode()
  const formattedValue = formatCurrency(value as string)

  const handleFormattedValue = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name?: string,
  ): any => {
    const numericValue =
      parseFloat(event.target.value.replace(/[,.]/g, '')) / 100
    return {
      target: {
        name,
        value: isNaN(numericValue) ? 0 : numericValue,
      },
    }
  }

  return (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      value={formattedValue}
      name={name}
      color={darkMode ? 'secondary' : 'primary'}
      onChange={event =>
        onChange && onChange(handleFormattedValue(event, name))
      }
      onBlur={onBlur}
      onFocus={event => event.target.select()}
      error={error}
      helperText={helperText}
      {...others}
    />
  )
}

export default Currency

import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { useDarkMode } from '../../hooks/darkMode'
import { ChangeEvent } from 'react'
import { format, parse } from 'date-fns'

const InputDate = (props: TextFieldProps) => {
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

  const convertDateToValue = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name?: string,
  ): any => {
    const date = event.target.value
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date())

    return {
      target: {
        name,
        value: parsedDate,
      },
    }
  }

  const formattedValue = format(value as Date, 'dd/MM/yyyy')

  const { darkMode } = useDarkMode()

  return (
    <TextField
      // type="date"
      variant="outlined"
      fullWidth
      label={label}
      value={formattedValue}
      name={name}
      color={darkMode ? 'secondary' : 'primary'}
      onChange={event => onChange && onChange(convertDateToValue(event, name))}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton sx={{ color: '#fafafa8b' }}>
              <DateRangeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...others}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        '& input[type="date"]::-webkit-calendar-picker-indicator': {
          display: 'none',
        },
      }}
    />
  )
}

export default InputDate

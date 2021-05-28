import { useCallback } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

const DatePicker = (props: KeyboardDatePickerProps) => {
  const {
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    helperText,
    maxDate,
    ...others
  } = props

  const convertDateToValue = useCallback(
    (date: MaterialUiPickersDate, name?: string): any => {
      const event = {
        target: {
          name,
          value: date,
        },
      }

      return event
    },
    [],
  )

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label={label}
          name={name}
          inputVariant="outlined"
          fullWidth
          format="dd/MM/yyyy"
          value={value}
          onChange={date => onChange(convertDateToValue(date, name))}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          maxDate={maxDate}
          helperText={error && helperText}
          {...others}
        />
      </MuiPickersUtilsProvider>
    </>
  )
}

export default DatePicker

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
} from '@mui/material'

type MuiSelectProps = {
  options: Array<any>
  error?: boolean
  helperText?: string | false
} & SelectProps

const Select = (props: MuiSelectProps) => {
  const {
    name,
    label,
    value,
    onChange,
    onBlur,
    options,
    error,
    helperText,
    ...others
  } = props

  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <MuiSelect
        variant="standard"
        labelId={`${name}-select-label`}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...others}
      >
        <MenuItem value="">None</MenuItem>
        {options.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Select

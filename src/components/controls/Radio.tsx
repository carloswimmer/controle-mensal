import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio as MuiRadio,
  FormHelperText,
  RadioGroupProps,
} from '@material-ui/core'

interface RadioProps extends RadioGroupProps {
  label: string
  items: Array<any>
  error?: boolean
  helperText?: string | false
}

const Radio = (props: RadioProps) => {
  const {
    name,
    label,
    value,
    onChange,
    onBlur,
    items,
    error,
    helperText,
    ...others
  } = props

  return (
    <FormControl
      component="fieldset"
      error={error}
      style={{ marginBottom: 6, marginRight: -12 }}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...others}
      >
        {items.map((item: any) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<MuiRadio color="secondary" />}
            label={item.title}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Radio

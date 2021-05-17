import { Button as MuiButton, ButtonProps } from '@material-ui/core'

interface MuiButtonProps extends ButtonProps {
  text: string
}

const Button = (props: MuiButtonProps) => {
  const { text, size, color, onClick, ...others } = props

  return (
    <MuiButton
      variant="contained"
      size={size}
      color={color}
      onClick={onClick}
      {...others}
    >
      {text}
    </MuiButton>
  )
}

export default Button

import { ReactElement, SyntheticEvent, useState } from 'react'
import { Alert, Box, Slide, Snackbar } from '@mui/material'
import { ToastMessage } from '../hooks/toast'
import { TransitionProps } from '@mui/material/transitions'

interface ToastProps {
  messages: ToastMessage[]
}

function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
) {
  return <Slide {...props} direction="left" />
}

const Toast = ({ messages }: ToastProps) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage)

  const handleOpen = () => {
    if (messages.length) {
      setMessage(messages[0])
      setOpen(true)
    }
  }

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleExited = () => {
    messages.splice(0, 1)

    handleOpen()
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      TransitionComponent={Transition}
      onClose={handleClose}
      TransitionProps={{
        onExited: handleExited,
      }}
    >
      <Box maxWidth={375}>
        <Alert
          severity={message.severity || 'error'}
          variant="filled"
          elevation={6}
          onClose={handleClose}
        >
          {message.text}
        </Alert>
      </Box>
    </Snackbar>
  )
}

export default Toast

import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { Box, Slide, Snackbar } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions/transition'
import { Alert } from '@mui/lab'
import { ToastMessage } from '../hooks/toast'

interface ToastProps {
  messages: ToastMessage[]
}

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="left" />
}

const Toast = ({ messages }: ToastProps) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage)

  const handleOpen = useCallback(() => {
    if (messages.length) {
      setMessage(messages[0])
      setOpen(true)
    }
  }, [messages])

  useEffect(() => {
    handleOpen()
  }, [handleOpen])

  const handleClose = useCallback((event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }, [])

  const handleExited = useCallback(() => {
    messages.splice(0, 1)

    handleOpen()
  }, [messages, handleOpen])

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
      TransitionProps={{
        onExited: handleExited
      }}>
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
  );
}

export default Toast

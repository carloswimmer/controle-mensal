import { Backdrop, CircularProgress } from '@mui/material'

interface LoadingData {
  open: boolean
}

const Loading = ({ open }: LoadingData) => {
  return (
    <Backdrop open={open} style={{ zIndex: 1 }}>
      <CircularProgress color="secondary" size={70} />
    </Backdrop>
  )
}

export default Loading

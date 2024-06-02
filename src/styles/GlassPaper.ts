import { Container, Dialog, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GlassContainer = styled(Container)({
  maxWidth: 500,

  '& .MuiPaper-root': {
    backgroundColor: '#424242a8',
    backdropFilter: 'blur(14px)',
  },
})

export const GlassDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    backgroundColor: '#7c7c7c52',
    backdropFilter: 'blur(11px)',
  },
})

export const GlassPaper = styled(Paper)({
  backgroundColor: '#424242a8',
  backdropFilter: 'blur(1px)',
  maxWidth: 540,
  margin: '0 auto',
})

import { Container, Dialog } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

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

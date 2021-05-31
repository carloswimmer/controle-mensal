import { Container as MuiContainer } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const GlassContainer = styled(MuiContainer)({
  maxWidth: 500,

  '& .MuiPaper-root': {
    backgroundColor: '#424242a8',
    backdropFilter: 'blur(14px)',
  },
})

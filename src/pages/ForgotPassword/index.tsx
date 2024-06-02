import {
  Card,
  CardContent as MuiCardContent,
  Typography,
  Box,
} from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

import { GlassContainer as Container } from '../../styles/GlassPaper'
import Logo from '../../components/Logo'
import Footer from './Footer'
import Form from './Form'

const ForgotPassword = () => {
  return (
    <Viewport>
      <Container>
        <Logo />
        <Card>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5">Redefinir Senha</Typography>
            </Box>
            <Form />
          </CardContent>
        </Card>
        <Footer />
      </Container>
    </Viewport>
  )
}

const Viewport = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
})

const CardContent = styled(MuiCardContent)<Theme>(({ theme }) => ({
  padding: theme.spacing(3),

  '&:last-child': {
    paddingBottom: theme.spacing(4),
  },
}))

export default ForgotPassword

import {
  Card,
  CardContent as MuiCardContent,
  Typography,
  Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { GlassContainer as Container } from '../../styles/GlassPaper'
import Logo from '../../components/Logo'
import Form from './Form'
import Footer from './Footer'

const SignUp = () => {
  return (
    <Viewport>
      <Container>
        <Logo />
        <Card>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5">Criar Conta</Typography>
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

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(3),

  '&:last-child': {
    paddingBottom: theme.spacing(4),
  },
}))

export default SignUp

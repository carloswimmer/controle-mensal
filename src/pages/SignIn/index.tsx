import { Link as RouterLink } from 'react-router-dom'
import {
  Container as MuiContainer,
  Card,
  CardContent as MuiCardContent,
  Typography,
  Link,
  Box,
  Grid,
} from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import Logo from '../../components/Logo'
import Form from './Form'
import Footer from './Footer'

const SignIn = () => {
  return (
    <Viewport>
      <Container>
        <Logo />
        <Card>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5">Fazer Login</Typography>
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

const Container = styled(MuiContainer)({
  maxWidth: 500,
})

const CardContent = styled(MuiCardContent)<Theme>(({ theme }) => ({
  padding: theme.spacing(3),

  '&:last-child': {
    paddingBottom: theme.spacing(4),
  },
}))

export default SignIn

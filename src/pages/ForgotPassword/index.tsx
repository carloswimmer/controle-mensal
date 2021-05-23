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
import Logo from './Logo'
import Form from './Form'

const SignIn = () => {
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
        <Grid container justify="space-between">
          <Box mt={3}>
            <Typography align="center">
              <Link component={RouterLink} to="/sign-up">
                Crie uma conta
              </Link>
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography align="center">
              <Link component={RouterLink} to="/">
                Faça Login
              </Link>
            </Typography>
          </Box>
        </Grid>
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

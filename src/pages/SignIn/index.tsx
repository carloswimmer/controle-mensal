import { Link as RouterLink } from 'react-router-dom'
import {
  Container as MuiContainer,
  Card,
  CardContent as MuiCardContent,
  Typography,
  Link,
  Box,
} from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import Logo from './Logo'
import Form from './Form'

const SignIn = () => {
  return (
    <Viewport>
      <Container>
        <Card>
          <CardContent>
            <Logo />
            <Form />
          </CardContent>
        </Card>

        <Box mt={4}>
          <Typography align="center">
            <Link component={RouterLink} to="/sign-up">
              Esqueceu sua senha?
            </Link>
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography align="center">
            <Link component={RouterLink} to="/sign-up">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
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

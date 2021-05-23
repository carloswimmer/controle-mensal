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
        <Box mt={4}>
          <Typography align="center" color="textSecondary">
            Já tem uma conta? &nbsp;
            <Link component={RouterLink} to="/">
              Faça LogIn
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

export default SignUp

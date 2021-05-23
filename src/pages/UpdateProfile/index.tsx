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

const UpdateProfile = () => {
  return (
    <Viewport>
      <Container>
        <Logo />
        <Card>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5">Atualizar Perfil</Typography>
            </Box>
            <Form />
          </CardContent>
        </Card>
        <Box mt={4}>
          <Typography align="center" color="textSecondary">
            <Link component={RouterLink} to="/dashboard">
              Cancelar
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

export default UpdateProfile

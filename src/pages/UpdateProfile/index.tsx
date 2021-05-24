import {
  Container as MuiContainer,
  Card,
  CardContent as MuiCardContent,
  Typography,
  Box,
} from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'

import Logo from '../../components/Logo'
import Form from './Form'
import Footer from './Footer'

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

export default UpdateProfile

import { Container as MuiContainer } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import Logo from './Logo'
import Form from './Form'

const SignIn = () => {
  return (
    <Container maxWidth="xs">
      <Logo />
      <Form />
    </Container>
  )
}

const Container = styled(MuiContainer)({
  marginTop: '24vh',
})

export default SignIn

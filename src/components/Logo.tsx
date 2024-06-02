import { styled } from '@mui/material/styles'
import LogoImage from '../assets/logo.svg'

const Logo = () => {
  return (
    <Container>
      <Image src={LogoImage} alt="Controle Mensal" />
    </Container>
  )
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}))

const Image = styled('img')(() => ({
  maxWidth: '100%',
}))

export default Logo

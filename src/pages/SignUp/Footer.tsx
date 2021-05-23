import { Box, Typography, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box mt={3}>
      <Typography align="center" color="textSecondary">
        Já tem uma conta? &nbsp;
        <Link component={RouterLink} to="/">
          Faça LogIn
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer

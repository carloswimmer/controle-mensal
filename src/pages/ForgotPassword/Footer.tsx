import { Grid, Box, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
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
  )
}

export default Footer

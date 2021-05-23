import { Grid, Box, Typography, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Grid container justify="space-between">
      <Box mt={3}>
        <Typography align="center">
          <Link component={RouterLink} to="/forgot-password">
            Esqueceu sua senha?
          </Link>
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography align="center">
          <Link component={RouterLink} to="/sign-up">
            Crie uma conta
          </Link>
        </Typography>
      </Box>
    </Grid>
  )
}

export default Footer

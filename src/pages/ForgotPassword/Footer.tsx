import { Grid, Box, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Grid container justifyContent="space-between">
      <Box mt={3}>
        <Typography align="center">
          <Link component={RouterLink} to="/sign-up" underline="hover">
            Crie uma conta
          </Link>
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography align="center">
          <Link component={RouterLink} to="/" underline="hover">
            Faça Login
          </Link>
        </Typography>
      </Box>
    </Grid>
  );
}

export default Footer

import { Box, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box mt={3}>
      <Typography align="center" color="textSecondary">
        <Link component={RouterLink} to="/dashboard" underline="hover">
          Cancelar
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer

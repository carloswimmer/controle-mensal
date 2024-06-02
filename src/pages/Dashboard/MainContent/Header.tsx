import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useFilterActions } from '../../../hooks/filterActions'

const Header = () => {
  const { dashboardHeader } = useFilterActions()

  return (
    <Box m={4} display="flex" justifyContent="center">
      <Box display={{ xs: 'block', sm: 'none' }}>
        <Typography variant="h2">{dashboardHeader}</Typography>
      </Box>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <Typography variant="h1">{dashboardHeader}</Typography>
      </Box>
    </Box>
  )
}

export default Header

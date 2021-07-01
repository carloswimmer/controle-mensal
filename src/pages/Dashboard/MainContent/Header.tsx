import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { useFilterActions } from '../../../hooks/filterActions'

const Header = () => {
  const { dashboardHeader } = useFilterActions()

  return (
    <Box m={4} display="flex" justifyContent="center">
      <Hidden smUp>
        <Typography variant="h2">{dashboardHeader}</Typography>
      </Hidden>
      <Hidden xsDown>
        <Typography variant="h1">{dashboardHeader}</Typography>
      </Hidden>
    </Box>
  )
}

export default Header

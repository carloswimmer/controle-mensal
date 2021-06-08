import React from 'react'
import { Box, Hidden, Typography } from '@material-ui/core'
import { useFilter } from '../../../hooks/filter'

const Header = () => {
  const { dashboardHeader } = useFilter()

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

import { Box, Typography } from '@material-ui/core'
import { useFilter } from '../../hooks/filter'

const Header = () => {
  const { dashboardHeader } = useFilter()

  return (
    <Box m={4} display="flex" justifyContent="center">
      <Typography variant="h1">{dashboardHeader}</Typography>
    </Box>
  )
}

export default Header

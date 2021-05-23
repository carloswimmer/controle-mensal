import { Paper as MuiPaper, Box, Typography, Chip } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { TrendingDownRounded, MonetizationOnRounded } from '@material-ui/icons'

const DebitCard = () => {
  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Débito</Typography>
        <IconContainer>
          <TrendingDownRounded fontSize="large" />
        </IconContainer>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        marginTop={2}
      >
        <Chip icon={<MonetizationOnRounded />} label="2.000,00" />
      </Box>
    </Paper>
  )
}

const Paper = styled(MuiPaper)<Theme>(({ theme }) => ({
  padding: theme.spacing(2),
}))

const IconContainer = styled('div')<Theme>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: 50,
  borderRadius: 10,
  backgroundColor: '#d6343430',

  '& .MuiSvgIcon-root': {
    color: '#d63434',
  },
}))

export default DebitCard

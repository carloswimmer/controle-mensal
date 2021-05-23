import { Paper as MuiPaper, Box, Typography, Chip } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { TrendingUpRounded, MonetizationOnRounded } from '@material-ui/icons'

const CreditCard = () => {
  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Crédito</Typography>
        <IconContainer>
          <TrendingUpRounded fontSize="large" />
        </IconContainer>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        marginTop={2}
      >
        <Chip icon={<MonetizationOnRounded />} label="10.000,00" />
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
  backgroundColor: '#57dd5730',

  '& .MuiSvgIcon-root': {
    color: '#57dd57',
  },
}))

export default CreditCard

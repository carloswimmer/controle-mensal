import { useMemo } from 'react'
import { Paper as MuiPaper, Box, Typography, Chip } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { TimelineRounded, MonetizationOnRounded } from '@material-ui/icons'
import { useCashBook } from '../../../hooks/cashBook'

const DebitCard = () => {
  const { entries } = useCashBook()

  const value = useMemo(() => {
    return entries
      .map(entry => (entry.credit ? entry.amount : entry.amount * -1))
      .reduce((acc, value) => acc + value, 0)
  }, [entries])

  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Saldo</Typography>
        <IconContainer>
          <TimelineRounded fontSize="large" />
        </IconContainer>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        marginTop={2}
      >
        <Chip icon={<MonetizationOnRounded />} label={value.toFixed(2)} />
      </Box>
    </Paper>
  )
}

const balanceColor = '#57dd57'

const Paper = styled(MuiPaper)<Theme>(({ theme }) => ({
  padding: theme.spacing(2),

  '& .MuiTypography-root': {
    color: balanceColor,
  },
}))

const IconContainer = styled('div')<Theme>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: 50,
  borderRadius: 10,
  backgroundColor: balanceColor + '30',

  '& .MuiSvgIcon-root': {
    color: balanceColor,
  },
}))

export default DebitCard

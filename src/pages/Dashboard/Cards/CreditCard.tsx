import { useMemo } from 'react'
import { Paper as MuiPaper, Box, Typography, Chip } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { TrendingUpRounded, MonetizationOnRounded } from '@material-ui/icons'
import { useFilterActions } from '../../../hooks/filterActions'

const CreditCard = () => {
  const { filterResults } = useFilterActions()

  const value = useMemo(() => {
    return filterResults
      .map(entry =>
        entry.payType === 'credit' && entry.description !== 'Investimento'
          ? entry.amount
          : 0,
      )
      .reduce((acc, value) => acc + value, 0)
  }, [filterResults])

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
        <Chip icon={<MonetizationOnRounded />} label={value.toFixed(2)} />
      </Box>
    </Paper>
  )
}

const Paper = styled(MuiPaper)<Theme>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#424242a8',
  backdropFilter: 'blur(1px)',
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

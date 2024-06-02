import { useMemo } from 'react'
import { Paper as MuiPaper, Box, Typography, Chip } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import {
  AccountBalanceRounded,
  MonetizationOnRounded,
} from '@mui/icons-material'
import { useFilterActions } from '../../../hooks/filterActions'

const InvestmentCard = () => {
  const { filterResults } = useFilterActions()

  const value = useMemo(() => {
    return filterResults
      .map(entry => (entry.payType === 'investment' ? entry.amount : 0))
      .reduce((acc, value) => acc + value, 0)
  }, [filterResults])

  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" style={{ fontSize: '1.8rem' }}>
          Investimento
        </Typography>
        <IconContainer>
          <AccountBalanceRounded fontSize="large" />
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
  backgroundColor: theme.palette.primary.main + '30',

  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}))

export default InvestmentCard

import { useMemo } from 'react'
import { Paper as MuiPaper, Box, Typography, Chip } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { TrendingDownRounded, MonetizationOnRounded } from '@material-ui/icons'
import { useFilter } from '../../../hooks/filter'

const DebitCard = () => {
  const { filterResults } = useFilter()

  const value = useMemo(() => {
    return filterResults
      .map(entry => (entry.payType === 'debit' ? entry.amount : 0))
      .reduce((acc, value) => acc + value, 0)
  }, [filterResults])

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
        <Chip icon={<MonetizationOnRounded />} label={value.toFixed(2)} />
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

import React from 'react'
import { Grid } from '@mui/material'

import CreditCard from './CreditCard'
import DebitCard from './DebitCard'
import BalanceCard from './BalanceCard'
import InvestmentCard from './InvestmentCard'

const CardsContainer = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CreditCard />
      </Grid>
      <Grid item xs={12}>
        <DebitCard />
      </Grid>
      <Grid item xs={12}>
        <BalanceCard />
      </Grid>
      <Grid item xs={12}>
        <InvestmentCard />
      </Grid>
    </Grid>
  )
}

export default CardsContainer

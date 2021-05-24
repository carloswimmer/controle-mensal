import { Grid } from '@material-ui/core'

import CreditCard from './CreditCard'
import DebitCard from './DebitCard'
import BalanceCard from './BalanceCard'

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
    </Grid>
  )
}

export default CardsContainer

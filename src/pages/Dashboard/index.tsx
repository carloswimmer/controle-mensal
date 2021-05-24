import { Box, styled, Theme, Grid, Typography } from '@material-ui/core'

import Logo from '../../components/Logo'
import Menu from './Menu'
import CreditCard from './CreditCard'
import DebitCard from './DebitCard'
import BalanceCard from './BalanceCard'
import AccountTable from './AccountTable'

const Dashboard = () => {
  return (
    <>
      <LeftAside>
        <Box width={200}>
          <Logo />
        </Box>
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
      </LeftAside>
      <MainContent>
        <Box m={4} display="flex" justifyContent="center">
          <Typography variant="h1">Junho</Typography>
        </Box>
        <AccountTable />
      </MainContent>
      <RightAside>
        <Menu />
      </RightAside>
    </>
  )
}

const LeftAside = styled('aside')<Theme>(({ theme }) => ({
  backgroundColor: '#ffffff20',
  position: 'fixed',
  top: 0,
  left: 0,
  width: 310,
  height: '100vh',
  padding: theme.spacing(2),
}))

const MainContent = styled('main')(() => ({
  height: '100vh',
}))

const RightAside = styled('aside')<Theme>(({ theme }) => ({
  backgroundColor: '#ffffff20',
  position: 'fixed',
  top: 0,
  right: 0,
  width: 310,
  height: '100vh',
  padding: theme.spacing(2),
}))

export default Dashboard

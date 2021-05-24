import { Box, styled, Theme, Typography } from '@material-ui/core'

import { CashBookProvider } from '../../hooks/cashBook'
import Logo from '../../components/Logo'
import Menu from './Menu'
import CardsContainer from './CardsContainer'
import AccountTable from './AccountTable'

const Dashboard = () => {
  return (
    <CashBookProvider>
      <LeftAside>
        <Box width={200}>
          <Logo />
        </Box>
        <CardsContainer />
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
    </CashBookProvider>
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

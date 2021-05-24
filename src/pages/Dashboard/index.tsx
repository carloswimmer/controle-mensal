import { Box, styled, Theme, Typography } from '@material-ui/core'

import { CashBookProvider } from '../../hooks/cashBook'
import Logo from '../../components/Logo'
import Menu from './Menu'
import Cards from './Cards'
import AccountTable from './AccountTable'
import Filters from './Filters'

const Dashboard = () => {
  return (
    <CashBookProvider>
      <LeftAside>
        <Box width={200}>
          <Logo />
        </Box>
        <Cards />
      </LeftAside>
      <MainContent>
        <Box m={4} display="flex" justifyContent="center">
          <Typography variant="h1">Junho</Typography>
        </Box>
        <AccountTable />
      </MainContent>
      <RightAside>
        <Box mb={4}>
          <Menu />
        </Box>
        <Filters />
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
  height: '100%',
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

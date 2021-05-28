import { Box, styled, Theme } from '@material-ui/core'

import { CashBookProvider } from '../../hooks/cashBook'
import { FilterProvider } from '../../hooks/filter'
import { DialogControlProvider } from '../../hooks/dialogControl'
import Logo from '../../components/Logo'
import Menu from './Filters/Menu'
import Cards from './Cards'
import AccountTable from './MainContent/AccountTable'
import SpeedDial from './MainContent/SpeedDial'
import Filters from './Filters'
import FormDialog from './MainContent/FormDialog'
import DeleteDialog from './MainContent/DeleteDialog'
import Header from './MainContent/Header'

const Dashboard = () => {
  return (
    <CashBookProvider>
      <FilterProvider>
        <LeftAside>
          <Box width={200}>
            <Logo />
          </Box>
          <Cards />
        </LeftAside>
        <MainContent>
          <DialogControlProvider>
            <Header />
            <AccountTable />
            <SpeedDial />
            <FormDialog />
            <DeleteDialog />
          </DialogControlProvider>
        </MainContent>
        <RightAside>
          <Box mb={4}>
            <Menu />
          </Box>
          <Filters />
        </RightAside>
      </FilterProvider>
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

const MainContent = styled('main')<Theme>(({ theme }) => ({
  height: 'calc(100vh - 32px)',
  width: 'calc(100vw - 620px)',
  margin: '0 auto',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
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

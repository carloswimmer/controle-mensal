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
import DescriptionDialog from './MainContent/DescriptionDialog'
import BankDialog from './MainContent/BankDialog'
import CloneDialog from './MainContent/CloneDialog'
import LogoutDialog from './Filters/LogoutDialog'

const Dashboard = () => {
  return (
    <DialogControlProvider>
      <CashBookProvider>
        <FilterProvider>
          <LeftAside>
            <Box width={200}>
              <Logo />
            </Box>
            <Cards />
          </LeftAside>
          <MainContent>
            <Header />
            <AccountTable />
            <SpeedDial />
            <FormDialog />
            <DeleteDialog />
            <DescriptionDialog />
            <BankDialog />
            <CloneDialog />
            <LogoutDialog />
          </MainContent>
          <RightAside>
            <Box mb={2}>
              <Menu />
            </Box>
            <Filters />
          </RightAside>
        </FilterProvider>
      </CashBookProvider>
    </DialogControlProvider>
  )
}

const LeftAside = styled('aside')<Theme>(({ theme }) => ({
  backgroundColor: '#1111114A',
  backdropFilter: 'blur(10px)',
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
  backgroundColor: '#1111114A',
  backdropFilter: 'blur(10px)',
  position: 'fixed',
  top: 0,
  right: 0,
  width: 310,
  height: '100vh',
  padding: theme.spacing(2),
}))

export default Dashboard

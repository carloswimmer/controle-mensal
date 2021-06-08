import React from 'react'
import { Box, Hidden, styled, Theme } from '@material-ui/core'
import { MoreVertRounded, SpeedRounded } from '@material-ui/icons'

import { CashBookProvider } from '../../hooks/cashBook'
import { FilterProvider } from '../../hooks/filter'
import { DialogControlProvider } from '../../hooks/dialogControl'
import Logo from '../../components/Logo'
import Drawer from '../../components/Drawer'
import AccountTable from './MainContent/AccountTable'
import SpeedDial from './MainContent/SpeedDial'
import FormDialog from './MainContent/FormDialog'
import EntriesList from './MainContent/EntriesList'
import DeleteDialog from './MainContent/DeleteDialog'
import Header from './MainContent/Header'
import DescriptionDialog from './MainContent/DescriptionDialog'
import BankDialog from './MainContent/BankDialog'
import CloneDialog from './MainContent/CloneDialog'
import Menu from './Filters/Menu'
import LogoutDialog from './Filters/LogoutDialog'
import Filters from './Filters'
import Cards from './Cards'

const Dashboard = () => {
  return (
    <DialogControlProvider>
      <CashBookProvider>
        <FilterProvider>
          <Drawer
            ariaLabel="saldos"
            side="left"
            closeKey="right"
            smallIcon={<SpeedRounded />}
            largeIcon={<SpeedRounded fontSize="large" />}
          >
            <Box width={200}>
              <Logo />
            </Box>
            <Cards />
          </Drawer>
          <MainContent>
            <Header />
            <Hidden smDown>
              <AccountTable />
            </Hidden>
            <Hidden mdUp>
              <EntriesList />
            </Hidden>
            <SpeedDial />
            <FormDialog />
            <DeleteDialog />
            <DescriptionDialog />
            <BankDialog />
            <CloneDialog />
          </MainContent>
          <Drawer
            ariaLabel="filtros"
            side="right"
            closeKey="left"
            smallIcon={<MoreVertRounded />}
            largeIcon={<MoreVertRounded fontSize="large" />}
          >
            <Box mb={2}>
              <Menu />
              <LogoutDialog />
            </Box>
            <Filters />
          </Drawer>
        </FilterProvider>
      </CashBookProvider>
    </DialogControlProvider>
  )
}

const MainContent = styled('main')<Theme>(({ theme }) => ({
  height: 'calc(100vh - 32px)',
  width: 'auto',
  margin: '0 auto',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),

  '@media screen and (min-width: 1280px)': {
    width: 'calc(100vw - 620px)',
  },
}))

export default Dashboard

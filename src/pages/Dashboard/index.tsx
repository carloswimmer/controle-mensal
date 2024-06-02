import React from 'react'
import { Box, styled, Theme } from '@mui/material'
import { MoreVertRounded, SpeedRounded } from '@mui/icons-material'

import { CashBookProvider } from '../../hooks/cashBook'
import { FilterActionsProvider } from '../../hooks/filterActions'
import { FilterOptionsProvider } from '../../hooks/filterOptions'
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
import Tutorials from './Tutorials'

const Dashboard = () => {
  return (
    <DialogControlProvider>
      <CashBookProvider>
        <FilterActionsProvider>
          <FilterOptionsProvider>
            <Drawer
              ariaLabel="saldos"
              name="cards"
              side="left"
              closeButton="right"
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
              <Box display={{ xs: 'none', md: 'block' }}>
                <AccountTable />
              </Box>
              <Box display={{ xs: 'block', md: 'none' }}>
                <EntriesList />
              </Box>
              <SpeedDial />
              <FormDialog />
              <DeleteDialog />
              <DescriptionDialog />
              <BankDialog />
              <CloneDialog />
            </MainContent>
            <Drawer
              ariaLabel="filtros"
              name="filters"
              side="right"
              closeButton="left"
              smallIcon={<MoreVertRounded />}
              largeIcon={<MoreVertRounded fontSize="large" />}
            >
              <Box mb={2}>
                <Menu />
                <LogoutDialog />
              </Box>
              <Filters />
            </Drawer>
            <Tutorials />
          </FilterOptionsProvider>
        </FilterActionsProvider>
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

  '@media (min-width: 1280px)': {
    width: 'calc(100vw - 620px)',
  },
}))

export default Dashboard

import React from 'react'
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
import Drawer from '../../components/Drawer'
import { MoreVertRounded, SpeedRounded } from '@material-ui/icons'

const Dashboard = () => {
  return (
    <DialogControlProvider>
      <CashBookProvider>
        <FilterProvider>
          <Drawer
            ariaLabel="saldos"
            side="left"
            closeKey="right"
            icon={<SpeedRounded fontSize="large" />}
          >
            <Box width={200}>
              <Logo />
            </Box>
            <Cards />
          </Drawer>
          <MainContent>
            <Header />
            <AccountTable />
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
            icon={<MoreVertRounded fontSize="large" />}
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

import React, { PropsWithChildren, ReactElement, useCallback } from 'react'
import {
  Box,
  Drawer as MuiDrawer,
  IconButton,
  SvgIconProps,
} from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'
import { useDialogControl } from '../hooks/dialogControl'

interface DrawerProps {
  ariaLabel: string
  name: string
  side: 'left' | 'right'
  closeButton: 'left' | 'right'
  smallIcon: ReactElement<SvgIconProps>
  largeIcon: ReactElement<SvgIconProps>
}

const Drawer = ({
  children,
  ariaLabel,
  name,
  side,
  closeButton,
  smallIcon,
  largeIcon,
}: PropsWithChildren<DrawerProps>) => {
  const { isOpen, toggleDialog } = useDialogControl()

  const handleDrawerToggle = useCallback(() => {
    toggleDialog(name, !isOpen[name]?.opened)
  }, [isOpen, toggleDialog, name])

  return (
    <nav>
      <Box display={{ xs: 'block', lg: 'none' }}>
        <Box display={{ xs: 'block', sm: 'none' }}>
          <OpenButton
            color="primary"
            onClick={handleDrawerToggle}
            aria-label={ariaLabel}
            style={{ [side]: 4, top: 4, zIndex: 1 }}
          >
            {smallIcon}
          </OpenButton>
        </Box>
        <Box display={{ xs: 'none', sm: 'block' }}>
          <OpenButton
            color="primary"
            onClick={handleDrawerToggle}
            aria-label={ariaLabel}
            style={{ [side]: 8, top: 8, zIndex: 1 }}
          >
            {largeIcon}
          </OpenButton>
        </Box>
        <Aside
          variant="persistent"
          anchor={side}
          open={!!isOpen[name]?.opened}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <CloseButton
            color="primary"
            onClick={handleDrawerToggle}
            aria-label="fechar painel lateral"
            style={{ [closeButton]: 4 }}
          >
            {side === 'left' ? <ChevronLeftRounded /> : <ChevronRightRounded />}
          </CloseButton>
          {children}
        </Aside>
      </Box>
      <Box display={{ xs: 'none', md: 'none', lg: 'block' }}>
        <Aside variant="permanent" anchor={side} open>
          {children}
        </Aside>
      </Box>
    </nav>
  )
}

const Aside = styled(MuiDrawer)<Theme>(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#1111114A',
    backdropFilter: 'blur(10px)',
    width: 310,
    padding: theme.spacing(2),
    border: 'unset',
  },
}))

const OpenButton = styled(IconButton)({
  position: 'fixed',
})

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 4,
})

export default Drawer

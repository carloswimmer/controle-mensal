import React, { PropsWithChildren, ReactElement, useCallback } from 'react'
import {
  Hidden,
  Drawer as MuiDrawer,
  IconButton,
  SvgIconProps,
} from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { ChevronLeftRounded, ChevronRightRounded } from '@material-ui/icons'
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
      <Hidden lgUp implementation="css">
        <Hidden smUp>
          <OpenButton
            color="primary"
            onClick={handleDrawerToggle}
            aria-label={ariaLabel}
            style={{ [side]: 4, top: 4, zIndex: 1 }}
          >
            {smallIcon}
          </OpenButton>
        </Hidden>
        <Hidden xsDown>
          <OpenButton
            color="primary"
            onClick={handleDrawerToggle}
            aria-label={ariaLabel}
            style={{ [side]: 8, top: 8, zIndex: 1 }}
          >
            {largeIcon}
          </OpenButton>
        </Hidden>
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
      </Hidden>
      <Hidden mdDown implementation="css">
        <Aside variant="permanent" anchor={side} open>
          {children}
        </Aside>
      </Hidden>
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

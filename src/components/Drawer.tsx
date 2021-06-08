import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import {
  Hidden,
  Drawer as MuiDrawer,
  IconButton,
  SvgIconProps,
} from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { CloseRounded } from '@material-ui/icons'

interface DrawerProps {
  ariaLabel: string
  side: 'left' | 'right'
  closeKey: 'left' | 'right'
  icon: ReactElement<SvgIconProps>
}

const Drawer = ({
  children,
  ariaLabel,
  side,
  closeKey,
  icon,
}: PropsWithChildren<DrawerProps>) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(state => !state)
  }, [])

  return (
    <nav>
      <Hidden lgUp implementation="css">
        <OpenButton
          color="primary"
          onClick={handleDrawerToggle}
          aria-label={ariaLabel}
          style={{ [side]: 8 }}
        >
          {icon}
        </OpenButton>
        <Aside
          variant="persistent"
          anchor={side}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <CloseButton
            color="primary"
            onClick={handleDrawerToggle}
            aria-label="fechar painel lateral"
            style={{ [closeKey]: 4 }}
          >
            <CloseRounded fontSize="small" />
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
  top: 8,
})

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 4,
})

export default Drawer

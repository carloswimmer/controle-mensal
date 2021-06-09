import { useCallback, useState } from 'react'
import { Theme, styled } from '@material-ui/core/styles'
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@material-ui/lab'
import {
  AddRounded,
  LocalAtmRounded,
  MoreVert,
  QueueRounded,
  AccountBalanceRounded,
  BallotRounded,
} from '@material-ui/icons'

import { useDialogControl } from '../../../hooks/dialogControl'

const SpeedDials = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const { toggleDialog } = useDialogControl()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      icon={<SpeedDialIcon icon={<AddRounded />} openIcon={<MoreVert />} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
      FabProps={{ color: 'secondary' }}
    >
      <SpeedDialAction
        key={'entry'}
        icon={<LocalAtmRounded />}
        tooltipTitle={'+ Lançamentos'}
        onClick={() => toggleDialog('entry', true)}
      />
      <SpeedDialAction
        key={'clone'}
        icon={<QueueRounded />}
        tooltipTitle={'Clonar Mês'}
        onClick={() => toggleDialog('clone', true)}
      />
      <SpeedDialAction
        key={'description'}
        icon={<BallotRounded />}
        tooltipTitle={'+ Descrições'}
        onClick={() => toggleDialog('description', true)}
      />
      <SpeedDialAction
        key={'bank'}
        icon={<AccountBalanceRounded />}
        tooltipTitle={'+ Bancos'}
        onClick={() => toggleDialog('bank', true)}
      />
    </SpeedDial>
  )
}

const SpeedDial = styled(MuiSpeedDial)<Theme>(({ theme }) => ({
  position: 'fixed',

  '&.MuiSpeedDial-directionUp': {
    bottom: theme.spacing(3),
    right: theme.spacing(3),

    '@media (min-width: 1280px)': {
      right: theme.spacing(3) + 310,
    },
  },
}))

export default SpeedDials

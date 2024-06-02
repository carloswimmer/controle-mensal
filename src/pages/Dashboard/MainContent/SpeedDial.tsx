import { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@mui/material'
import {
  AddRounded,
  LocalAtmRounded,
  MoreVert,
  QueueRounded,
  AccountBalanceRounded,
  BallotRounded,
} from '@mui/icons-material'

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
      onClick={handleOpen}
      open={open}
      direction="up"
      FabProps={{ color: 'secondary' }}
    >
      <SpeedDialAction
        key="entry"
        icon={<LocalAtmRounded />}
        tooltipTitle="+ Lançamentos"
        onClick={() => toggleDialog('entry', true)}
      />
      <SpeedDialAction
        key="clone"
        icon={<QueueRounded />}
        tooltipTitle="Clonar Mês"
        onClick={() => toggleDialog('clone', true)}
      />
      <SpeedDialAction
        key="description"
        icon={<BallotRounded />}
        tooltipTitle="+ Descrições"
        onClick={() => toggleDialog('description', true)}
      />
      <SpeedDialAction
        key="bank"
        icon={<AccountBalanceRounded />}
        tooltipTitle="+ Bancos"
        onClick={() => toggleDialog('bank', true)}
      />
    </SpeedDial>
  )
}

const SpeedDial = styled(MuiSpeedDial)(({ theme: { spacing } }) => ({
  position: 'fixed',

  '&.MuiSpeedDial-directionUp': {
    bottom: spacing(3),
    right: spacing(3),

    '@media (min-width: 1280px)': {
      right: `calc(${spacing(3)} + 310px)`,
    },
  },
}))

export default SpeedDials

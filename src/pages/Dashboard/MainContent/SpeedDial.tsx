import { useState } from 'react'
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
  const {
    toggleEntryForm,
    toggleCloneConfirm,
    toggleDescriptionForm,
    toggleBankForm,
  } = useDialogControl()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

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
        onClick={() => toggleEntryForm(true)}
      />
      <SpeedDialAction
        key={'clone'}
        icon={<QueueRounded />}
        tooltipTitle={'Clonar Mês'}
        onClick={() => toggleCloneConfirm(true)}
      />
      <SpeedDialAction
        key={'description'}
        icon={<BallotRounded />}
        tooltipTitle={'+ Descrições'}
        onClick={() => toggleDescriptionForm(true)}
      />
      <SpeedDialAction
        key={'bank'}
        icon={<AccountBalanceRounded />}
        tooltipTitle={'+ Bancos'}
        onClick={() => toggleBankForm(true)}
      />
    </SpeedDial>
  )
}

const SpeedDial = styled(MuiSpeedDial)<Theme>(({ theme }) => ({
  position: 'fixed',

  '&.MuiSpeedDial-directionUp': {
    bottom: theme.spacing(3),
    right: theme.spacing(3) + 310,
  },
}))

export default SpeedDials

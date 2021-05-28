import { useCallback, useState } from 'react'
import { Theme, styled } from '@material-ui/core/styles'
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@material-ui/lab'
import { AddRounded, MoreVert, EventNoteRounded } from '@material-ui/icons'
import { useDialogControl } from '../../hooks/dialogControl'

const SpeedDials = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const { toggleEntryForm } = useDialogControl()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleOpenFormDialog = useCallback(() => {
    toggleEntryForm(true)
  }, [toggleEntryForm])

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
        key={'Lançamento'}
        icon={<AddRounded />}
        tooltipTitle={'Lançamento'}
        onClick={handleOpenFormDialog}
      />
      <SpeedDialAction
        key={'Clonar Mês'}
        icon={<EventNoteRounded />}
        tooltipTitle={'Clonar Mês'}
        onClick={handleClose}
      />
    </SpeedDial>
  )
}

const SpeedDial = styled(MuiSpeedDial)<Theme>(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp': {
    bottom: theme.spacing(3),
    right: theme.spacing(3) + 310,
  },
}))

export default SpeedDials

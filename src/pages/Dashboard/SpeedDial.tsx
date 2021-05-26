import { useState } from 'react'
import { Theme, styled } from '@material-ui/core/styles'
import {
  SpeedDial as MuiSpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@material-ui/lab'
import { AddRounded, MoreVert, EventNoteRounded } from '@material-ui/icons'

const actions = [
  { icon: <AddRounded />, name: 'Lançamento' },
  { icon: <EventNoteRounded />, name: 'Clonar Mês' },
]

const SpeedDials = (): JSX.Element => {
  const [open, setOpen] = useState(false)

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
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
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

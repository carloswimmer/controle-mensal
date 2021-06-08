import { useCallback, useState } from 'react'
import { Zoom } from '@material-ui/core'
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
import TutorialContent from '../../../components/TutorialContent'
import { TutorialTip as Tooltip } from '../../../styles/TutorialTip'

const step1 =
  'Para começar passe o mouse sobre o botão "+", depois escolha "+Bancos" ' +
  'para incluir seus bancos. Faça o mesmo para "+Descrições" para incluir o ' +
  'tipo de lançamento que será adicionado. Finalmente, adicione um novo ' +
  'lançamento clicando em "+Lançamentos".'

const SpeedDials = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const { isOpen, toggleDialog } = useDialogControl()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleNextStep = useCallback(() => {
    toggleDialog('tutorial-step1', false)
    toggleDialog('tutorial-step2', true)
  }, [toggleDialog])

  return (
    <Tooltip
      open={!!isOpen['tutorial-step1']}
      title={
        <TutorialContent
          text={step1}
          onClick={handleNextStep}
          buttonLabel="Próximo"
        />
      }
      TransitionComponent={Zoom}
      placement="left-end"
      interactive
    >
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
    </Tooltip>
  )
}

const SpeedDial = styled(MuiSpeedDial)<Theme>(({ theme }) => ({
  position: 'fixed',

  '&.MuiSpeedDial-directionUp': {
    bottom: theme.spacing(3),
    right: theme.spacing(3),

    '@media screen and (min-width: 1280px)': {
      right: theme.spacing(3) + 310,
    },
  },
}))

export default SpeedDials

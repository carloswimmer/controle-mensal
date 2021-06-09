import React, { useCallback } from 'react'
import { Zoom } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import TutorialContent from '../../../components/TutorialContent'
import { useDialogControl } from '../../../hooks/dialogControl'
import { TutorialTip as Tooltip } from '../../../styles/TutorialTip'

const step2 =
  'Com os filtros você controla o que é mostrado nos lançamentos, podendo, ' +
  'por exemplo, mostrar os movimentos de determinado banco, ou comparar um ' +
  'tipo de lançamento dentre todos os meses...'

const StepTwo = () => {
  const { isOpen, toggleDialog } = useDialogControl()

  const handleNextStep = useCallback(() => {
    toggleDialog('tutorial-step2', false)
    toggleDialog('filters', false)
    toggleDialog('cards', true)
    toggleDialog('tutorial-step3', true)
  }, [toggleDialog])

  return (
    <Tooltip
      open={!!isOpen['tutorial-step2']?.opened}
      title={
        <TutorialContent
          text={step2}
          onClick={handleNextStep}
          buttonLabel="Próximo"
        />
      }
      TransitionComponent={Zoom}
      placement="left-start"
      interactive
    >
      <TooltipLocation />
    </Tooltip>
  )
}

const TooltipLocation = styled('div')({
  position: 'fixed',
  top: 48,
  right: 310,
})

export default StepTwo

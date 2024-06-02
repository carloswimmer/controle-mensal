import React, { useCallback } from 'react'
import { Zoom } from '@mui/material'
import { styled } from '@mui/material/styles'
import TutorialContent from '../../../components/TutorialContent'
import { useDialogControl } from '../../../hooks/dialogControl'
import { TutorialTip as Tooltip } from '../../../styles/TutorialTip'

const step3 =
  'Aqui você tem o resultado do cálculo de todos os valores mostrados nos ' +
  'lançamentos. Ele também reflete todas escolhas de filtros, ou seja, se ' +
  'escolher só um banco, calculará os valores daquele banco dentro do período ' +
  'escolhido, e assim por diante.'

const StepThree = () => {
  const { isOpen, toggleDialog } = useDialogControl()

  const handleNextStep = useCallback(() => {
    toggleDialog('tutorial-step3', false)
    toggleDialog('cards', false)
  }, [toggleDialog])

  return (
    <Tooltip
      open={!!isOpen['tutorial-step3']?.opened}
      title={
        <TutorialContent
          text={step3}
          onClick={handleNextStep}
          buttonLabel="Começar"
        />
      }
      TransitionComponent={Zoom}
      placement="right"
    >
      <TooltipLocation />
    </Tooltip>
  )
}

const TooltipLocation = styled('div')({
  position: 'fixed',
  top: '50%',
  left: 310,
})

export default StepThree

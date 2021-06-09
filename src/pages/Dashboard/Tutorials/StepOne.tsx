import React, { useCallback } from 'react'
import { Zoom } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import TutorialContent from '../../../components/TutorialContent'
import { useDialogControl } from '../../../hooks/dialogControl'
import { TutorialTip as Tooltip } from '../../../styles/TutorialTip'

const step1 =
  'Para começar passe o mouse sobre o botão "+", depois escolha "+Bancos" ' +
  'para incluir seus bancos. Faça o mesmo para "+Descrições" para incluir o ' +
  'tipo de lançamento que será adicionado. Finalmente, adicione um novo ' +
  'lançamento clicando em "+Lançamentos".'

const StepOne = () => {
  const { isOpen, toggleDialog } = useDialogControl()

  const handleNextStep = useCallback(() => {
    toggleDialog('tutorial-step1', false)
    toggleDialog('filters', true)
    toggleDialog('tutorial-step2', true)
  }, [toggleDialog])

  return (
    <Tooltip
      open={!!isOpen['tutorial-step1']?.opened}
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
      <TooltipLocation />
    </Tooltip>
  )
}

const TooltipLocation = styled('div')({
  position: 'fixed',
  bottom: 104,
  right: 0,

  '@media (min-width: 1280px)': {
    right: 310,
  },
})

export default StepOne

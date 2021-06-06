import React, { useCallback } from 'react'
import { Grid, Zoom } from '@material-ui/core'

import { useDialogControl } from '../../../hooks/dialogControl'
import TutorialContent from '../../../components/TutorialContent'
import CreditCard from './CreditCard'
import DebitCard from './DebitCard'
import BalanceCard from './BalanceCard'
import InvestmentCard from './InvestmentCard'
import { TutorialTip as Tooltip } from '../../../styles/TutorialTip'

const step3 =
  'Aqui você tem o resultado do cálculo de todos os valores mostrados nos ' +
  'lançamentos. Ele também reflete todas escolhas de filtros, ou seja, se ' +
  'escolher só um banco, calculará os valores daquele banco dentro do período ' +
  'escolhido, e assim por diante.'

const CardsContainer = () => {
  const { isOpen, toggleDialog } = useDialogControl()

  const handleNextStep = useCallback(() => {
    toggleDialog('tutorial-step3', false)
  }, [toggleDialog])

  return (
    <Tooltip
      open={!!isOpen['tutorial-step3']}
      title={
        <TutorialContent
          text={step3}
          onClick={handleNextStep}
          buttonLabel="Começar"
        />
      }
      TransitionComponent={Zoom}
      placement="right"
      interactive
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreditCard />
        </Grid>
        <Grid item xs={12}>
          <DebitCard />
        </Grid>
        <Grid item xs={12}>
          <BalanceCard />
        </Grid>
        <Grid item xs={12}>
          <InvestmentCard />
        </Grid>
      </Grid>
    </Tooltip>
  )
}

export default CardsContainer

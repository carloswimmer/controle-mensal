import { useCallback, useState } from 'react'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Button } from '../../../components/controls'
import { GlassDialog as Dialog } from '../../../styles/GlassPaper'
import { useDialogControl } from '../../../hooks/dialogControl'
import { useCashBook } from '../../../hooks/cashBook'
import { useToast } from '../../../hooks/toast'
import { useFilter } from '../../../hooks/filter'
import handleError from '../../../utils/handleError'
import { format } from 'date-fns'
import { getCapitalizedMonth } from '../../../utils/handleMonths'
import Loading from '../../../components/Loading'

export default function CloneDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const { toggleCloneConfirm, openCloneConfirm } = useDialogControl()
  const { createClone } = useCashBook()
  const { addToast } = useToast()
  const { addFilter, removeFilters } = useFilter()

  const handleCreateClone = useCallback(async () => {
    try {
      setIsLoading(true)
      const clonedDate = await createClone()

      toggleCloneConfirm(false)

      removeFilters()
      addFilter({ type: 'year', value: format(clonedDate, 'yyyy') })
      addFilter({ type: 'month', value: getCapitalizedMonth(clonedDate) })

      addToast({ severity: 'success', text: 'Cópia criada com sucesso' })
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    } finally {
      toggleCloneConfirm(false)
      setIsLoading(false)
    }
  }, [addFilter, addToast, createClone, removeFilters, toggleCloneConfirm])

  return (
    <>
      <Dialog
        open={openCloneConfirm}
        onClose={() => toggleCloneConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Criar Clone</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja criar uma cópia do último mês?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            text="Não"
            onClick={() => toggleCloneConfirm(false)}
          />
          <Button
            variant="text"
            color="secondary"
            text="Sim"
            onClick={handleCreateClone}
          />
        </DialogActions>
        <Loading open={isLoading} />
      </Dialog>
    </>
  )
}

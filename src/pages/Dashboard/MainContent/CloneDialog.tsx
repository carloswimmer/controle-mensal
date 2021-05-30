import { useCallback } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { Button } from '../../../components/controls'
import { useDialogControl } from '../../../hooks/dialogControl'
import { useCashBook } from '../../../hooks/cashBook'
import { useToast } from '../../../hooks/toast'
import { useFilter } from '../../../hooks/filter'
import handleError from '../../../utils/handleError'
import { format } from 'date-fns'
import getCapitalizedMonth from '../../../utils/getCapitalizedMonth'

export default function AlertDialog() {
  const { toggleCloneConfirm, openCloneConfirm } = useDialogControl()
  const { createClone } = useCashBook()
  const { addToast } = useToast()
  const { addFilter, removeFilters } = useFilter()

  const handleCreateClone = useCallback(async () => {
    try {
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
    }
  }, [addFilter, addToast, createClone, removeFilters, toggleCloneConfirm])

  return (
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
    </Dialog>
  )
}

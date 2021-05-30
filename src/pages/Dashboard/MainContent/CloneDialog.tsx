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
import handleError from '../../../utils/handleError'

export default function AlertDialog() {
  const { toggleCloneConfirm, openCloneConfirm } = useDialogControl()
  const { createClone } = useCashBook()
  const { addToast } = useToast()

  const handleCreateClone = useCallback(async () => {
    try {
      await createClone()
      addToast({ severity: 'success', text: 'Cópia criada com sucesso' })
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    } finally {
      toggleCloneConfirm(false)
    }
  }, [addToast, createClone, toggleCloneConfirm])

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

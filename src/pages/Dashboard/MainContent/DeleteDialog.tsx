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
import handleError from '../../../utils/handleError'
import Loading from '../../../components/Loading'

export default function DeleteDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const { toggleDeleteConfirm, openDeleteConfirm, entryIdToDelete } =
    useDialogControl()
  const { deleteEntry } = useCashBook()
  const { addToast } = useToast()

  const handleDeleteEntry = useCallback(async () => {
    try {
      setIsLoading(true)
      await deleteEntry(entryIdToDelete)
      toggleDeleteConfirm(false)
      addToast({ severity: 'success', text: 'Lançamento removido com sucesso' })
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    } finally {
      toggleDeleteConfirm(false)
      setIsLoading(false)
    }
  }, [addToast, deleteEntry, entryIdToDelete, toggleDeleteConfirm])

  return (
    <>
      <Dialog
        open={openDeleteConfirm}
        onClose={() => toggleDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Deletar lançamento</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja remover esse lançamento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            text="Não"
            onClick={() => toggleDeleteConfirm(false)}
          />
          <Button
            variant="text"
            color="secondary"
            text="Sim"
            onClick={handleDeleteEntry}
          />
        </DialogActions>
        <Loading open={isLoading} />
      </Dialog>
    </>
  )
}

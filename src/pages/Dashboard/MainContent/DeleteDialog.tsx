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
  const { toggleDialog, isOpen, payloadEntry } = useDialogControl()
  const { deleteEntry } = useCashBook()
  const { addToast } = useToast()

  const handleDeleteEntry = useCallback(async () => {
    const id = payloadEntry.id
    toggleDialog('delete', false, payloadEntry)

    try {
      setIsLoading(true)
      await deleteEntry(id!)
      addToast({ severity: 'success', text: 'Lançamento removido com sucesso' })
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    } finally {
      setIsLoading(false)
    }
  }, [addToast, deleteEntry, payloadEntry, toggleDialog])

  return (
    <>
      <Dialog
        open={!!isOpen['delete']}
        onClose={() => toggleDialog('delete', false, payloadEntry)}
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
            onClick={() => toggleDialog('delete', false, payloadEntry)}
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

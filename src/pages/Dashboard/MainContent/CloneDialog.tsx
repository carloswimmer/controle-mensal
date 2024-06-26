import { useCallback, useState } from 'react'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { Button } from '../../../components/controls'
import { GlassDialog as Dialog } from '../../../styles/GlassPaper'
import { useDialogControl } from '../../../hooks/dialogControl'
import { useCashBook } from '../../../hooks/cashBook'
import { useToast } from '../../../hooks/toast'
import { useFilterActions } from '../../../hooks/filterActions'
import handleError from '../../../utils/handleError'
import { format } from 'date-fns'
import { getCapitalizedMonth } from '../../../utils/handleMonths'
import Loading from '../../../components/Loading'

export default function CloneDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const { toggleDialog, isOpen } = useDialogControl()
  const { createClone } = useCashBook()
  const { addToast } = useToast()
  const { addFilter, removeFilters } = useFilterActions()

  const handleCreateClone = useCallback(async () => {
    try {
      setIsLoading(true)
      const clonedDate = await createClone()

      toggleDialog('clone', false)

      removeFilters()
      addFilter({ type: 'year', value: format(clonedDate, 'yyyy') })
      addFilter({ type: 'month', value: getCapitalizedMonth(clonedDate) })

      addToast({ severity: 'success', text: 'Cópia criada com sucesso' })
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    } finally {
      toggleDialog('clone', false)
      setIsLoading(false)
    }
  }, [addFilter, addToast, createClone, removeFilters, toggleDialog])

  return (
    <>
      <Dialog
        open={!!isOpen['clone']?.opened}
        onClose={() => toggleDialog('clone', false)}
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
            onClick={() => toggleDialog('clone', false)}
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

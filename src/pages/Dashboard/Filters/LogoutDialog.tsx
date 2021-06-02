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
import { useToast } from '../../../hooks/toast'
import handleError from '../../../utils/handleError'
import Loading from '../../../components/Loading'
import { useAuth } from '../../../hooks/auth'
import { useHistory } from 'react-router'

export default function LogoutDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const { toggleLogoutConfirm, openLogoutConfirm } = useDialogControl()
  const { signOut } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true)
      await signOut()
      history.push('/')
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    } finally {
      if (history.location.pathname === '/dashboard') {
        toggleLogoutConfirm(false)
        setIsLoading(false)
      }
    }
  }, [addToast, toggleLogoutConfirm, history, signOut])

  return (
    <>
      <Dialog
        open={openLogoutConfirm}
        onClose={() => toggleLogoutConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Sair</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja sair da aplicação?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            text="Não"
            onClick={() => toggleLogoutConfirm(false)}
          />
          <Button
            variant="text"
            color="secondary"
            text="Sim"
            onClick={handleLogout}
          />
        </DialogActions>
        <Loading open={isLoading} />
      </Dialog>
    </>
  )
}

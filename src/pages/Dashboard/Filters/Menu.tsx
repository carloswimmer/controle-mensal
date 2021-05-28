import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, IconButton } from '@material-ui/core'
import {
  PowerSettingsNewRounded,
  AccountCircleRounded,
} from '@material-ui/icons'

import { useAuth } from '../../../hooks/auth'
import { useToast } from '../../../hooks/toast'
import handleError from '../../../utils/handleError'

const Menu = () => {
  const { signOut } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleLogOut = useCallback(async () => {
    try {
      await signOut()
      history.push('/')
    } catch (error) {
      const message = handleError(error)
      addToast({ text: message })
    }
  }, [addToast, history, signOut])

  return (
    <Grid container justify="flex-end" spacing={2}>
      <Grid item>
        <IconButton
          color="primary"
          onClick={() => history.push('/update-profile')}
          aria-label="perfil"
        >
          <AccountCircleRounded fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={handleLogOut} aria-label="sair">
          <PowerSettingsNewRounded fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Menu

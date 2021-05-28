import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
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
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/update-profile')}
        >
          Perfil
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={handleLogOut}>
          Sair
        </Button>
      </Grid>
    </Grid>
  )
}

export default Menu

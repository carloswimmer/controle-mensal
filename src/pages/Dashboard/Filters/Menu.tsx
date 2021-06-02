import { useHistory } from 'react-router-dom'
import { Grid, IconButton } from '@material-ui/core'
import {
  PowerSettingsNewRounded,
  AccountCircleRounded,
} from '@material-ui/icons'

import { useDialogControl } from '../../../hooks/dialogControl'

const Menu = () => {
  const { toggleLogoutConfirm } = useDialogControl()
  const history = useHistory()

  return (
    <Grid container justify="flex-end">
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
        <IconButton
          color="primary"
          onClick={() => toggleLogoutConfirm(true)}
          aria-label="sair"
        >
          <PowerSettingsNewRounded fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Menu

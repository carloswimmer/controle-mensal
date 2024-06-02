import { useHistory } from 'react-router-dom'
import { Grid, IconButton } from '@mui/material'
import {
  PowerSettingsNewRounded,
  AccountCircleRounded,
} from '@mui/icons-material'

import { useDialogControl } from '../../../hooks/dialogControl'

const Menu = () => {
  const { toggleDialog } = useDialogControl()
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
          onClick={() => toggleDialog('logout_confirm', true)}
          aria-label="sair"
        >
          <PowerSettingsNewRounded fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Menu

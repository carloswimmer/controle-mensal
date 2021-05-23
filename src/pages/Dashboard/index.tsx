import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, styled, Theme } from '@material-ui/core'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { handleError } from '../../components/controls/utils'

const Dashboard = () => {
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
    <>
      <LeftAside></LeftAside>
      <MainContent></MainContent>
      <RightAside>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => history.push('/update-profile')}
            >
              Profile
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleLogOut}>
              Sair
            </Button>
          </Grid>
        </Grid>
      </RightAside>
    </>
  )
}

const LeftAside = styled('aside')(() => ({
  backgroundColor: '#ffffff40',
  position: 'fixed',
  top: 0,
  left: 0,
  width: 200,
  height: '100vh',
}))

const MainContent = styled('main')(() => ({
  backgroundColor: '#0000ff11',
  height: '100vh',
}))

const RightAside = styled('aside')<Theme>(({ theme }) => ({
  backgroundColor: '#ffffff40',
  position: 'fixed',
  top: 0,
  right: 0,
  minWidth: 200,
  height: '100vh',
  padding: theme.spacing(2),
}))

export default Dashboard

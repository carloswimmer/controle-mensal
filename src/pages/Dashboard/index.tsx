import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, styled } from '@material-ui/core'

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
        <Button onClick={handleLogOut}>Sair</Button>
      </RightAside>
    </>
  )
}

const LeftAside = styled('aside')(() => ({
  backgroundColor: '#ffffff88',
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

const RightAside = styled('aside')(() => ({
  backgroundColor: '#ffffff88',
  position: 'fixed',
  top: 0,
  right: 0,
  width: 200,
  height: '100vh',
}))

export default Dashboard

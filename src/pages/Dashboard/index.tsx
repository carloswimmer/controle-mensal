import { styled, Theme } from '@material-ui/core'
import Menu from './Menu'

const Dashboard = () => {
  return (
    <>
      <LeftAside></LeftAside>
      <MainContent></MainContent>
      <RightAside>
        <Menu />
      </RightAside>
    </>
  )
}

const LeftAside = styled('aside')(() => ({
  backgroundColor: '#ffffff20',
  position: 'fixed',
  top: 0,
  left: 0,
  width: 200,
  height: '100vh',
}))

const MainContent = styled('main')(() => ({
  height: '100vh',
}))

const RightAside = styled('aside')<Theme>(({ theme }) => ({
  backgroundColor: '#ffffff20',
  position: 'fixed',
  top: 0,
  right: 0,
  minWidth: 200,
  height: '100vh',
  padding: theme.spacing(2),
}))

export default Dashboard

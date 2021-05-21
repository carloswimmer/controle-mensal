import { styled } from '@material-ui/core'

const Dashboard = () => {
  return (
    <>
      <LeftAside></LeftAside>
      <MainContent></MainContent>
      <RightAside></RightAside>
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

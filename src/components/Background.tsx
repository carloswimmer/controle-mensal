import { styled } from '@material-ui/core/styles'
import image from '../assets/big-image.jpg'

const Background = () => {
  return (
    <>
      <Bg />
      <Overlay />
    </>
  )
}

const Bg = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
}))

const Overlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#292828a4',
  backdropFilter: 'blur(7px)',
  zIndex: -1,
}))

export default Background

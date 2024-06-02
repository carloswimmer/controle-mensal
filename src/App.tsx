import { StyledEngineProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'
import Routes from './routes'

declare global {
  interface Window {
    dataLayer: Record<string, any>
  }
}

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  )
}

export default App

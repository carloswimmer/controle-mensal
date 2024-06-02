import { Theme, StyledEngineProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'
import Routes from './routes'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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

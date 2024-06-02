import { ThemeProvider, createMuiTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'
import Routes from './routes'

const theme = createMuiTheme()

declare global {
  interface Window {
    dataLayer: Record<string, any>
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

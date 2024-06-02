import { ThemeProvider, Theme, StyledEngineProvider, createMuiTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'
import Routes from './routes'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createMuiTheme()

declare global {
  interface Window {
    dataLayer: Record<string, any>
  }
}

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppProvider>
            <Routes />
          </AppProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App

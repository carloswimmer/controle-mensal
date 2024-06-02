import { PropsWithChildren } from 'react'
import { DarkModeProvider } from './darkMode'
import { ThemeProvider, Theme, StyledEngineProvider } from './theme';
import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import Background from '../components/Background'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <DarkModeProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Background />
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </DarkModeProvider>
  );
}

export default AppProvider

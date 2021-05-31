import { PropsWithChildren } from 'react'
import { DarkModeProvider } from './darkMode'
import { ThemeProvider } from './theme'
import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import Background from '../components/Background'

const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Background />
            {children}
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </DarkModeProvider>
  )
}

export default AppProvider

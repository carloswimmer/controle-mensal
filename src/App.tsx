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
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App

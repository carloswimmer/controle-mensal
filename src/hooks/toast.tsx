import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import Toast from '../components/Toast'

interface ToastContextData {
  addToast(toastProps: ToastMessage): void
}

export interface ToastMessage {
  text: string
  severity?: 'success' | 'error' | 'info' | 'warning'
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider = ({ children }: PropsWithChildren<{}>) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(({ text, severity }: ToastMessage) => {
    const toast = { text, severity }

    setMessages(state => [...state, toast])
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  return useContext(ToastContext)
}

export { ToastProvider, useToast }

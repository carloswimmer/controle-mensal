import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { initialValues } from '../pages/Dashboard/MainContent/FormDialog/Form'
import { EntryData } from './cashBook'

interface IsOpenValue {
  opened: boolean
}

interface DialogsData {
  [key: string]: IsOpenValue
}

interface DialogControlContextData {
  isOpen: DialogsData
  payloadEntry: EntryData
  toggleDialog(name: string, state: boolean, payload?: EntryData): void
}

const DialogControlContext = createContext<DialogControlContextData>(
  {} as DialogControlContextData,
)

const DialogControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [payloadEntry, setPayloadEntry] = useState<EntryData>(initialValues)
  const [isOpen, setIsOpen] = useState<DialogsData>({})

  const toggleDialog = useCallback(
    (name: string, state: boolean, payload?: EntryData) => {
      setIsOpen(prev => {
        return { ...prev, [name]: { opened: state } }
      })
      if (payload?.id && state) setPayloadEntry(payload)
      if (payload?.id && !state) setPayloadEntry(initialValues)
    },
    [],
  )

  return (
    <DialogControlContext.Provider
      value={{
        isOpen,
        payloadEntry,
        toggleDialog,
      }}
    >
      {children}
    </DialogControlContext.Provider>
  )
}

const useDialogControl = () => {
  return useContext(DialogControlContext)
}

export { DialogControlProvider, useDialogControl }

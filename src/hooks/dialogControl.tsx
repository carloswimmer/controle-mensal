import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { initialValues } from '../pages/Dashboard/MainContent/FormDialog/Form'
import { EntryData } from './cashBook'

interface Dialogs {
  [key: string]: boolean
}

interface DialogControlContextData {
  isOpen: Dialogs
  payloadEntry: EntryData
  toggleDialog(name: string, state: boolean, payload?: EntryData): void
}

const DialogControlContext = createContext<DialogControlContextData>(
  {} as DialogControlContextData,
)

const DialogControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [payloadEntry, setPayloadEntry] = useState<EntryData>(initialValues)
  const [isOpen, setIsOpen] = useState<Dialogs>({})

  const toggleDialog = useCallback(
    (name: string, state: boolean, payload?: EntryData) => {
      setIsOpen({ [name]: state })
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

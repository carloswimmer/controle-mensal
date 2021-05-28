import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { initialValues } from '../pages/Dashboard/FormDialog/Form'
import { EntryData } from './cashBook'

interface DialogControlContextData {
  openEntryForm: boolean
  payloadEntryForm: EntryData
  toggleEntryForm(state: boolean, payload?: EntryData): void
}

const DialogControlContext = createContext<DialogControlContextData>(
  {} as DialogControlContextData,
)

const DialogControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [openEntryForm, setOpenEntryForm] = useState(false)
  const [payloadEntryForm, setPayloadEntryForm] =
    useState<EntryData>(initialValues)

  const toggleEntryForm = useCallback((state: boolean, payload?: EntryData) => {
    setOpenEntryForm(state)
    if (payload?.id && state) setPayloadEntryForm(payload)
    if (!state) setPayloadEntryForm(initialValues)
  }, [])

  return (
    <DialogControlContext.Provider
      value={{ openEntryForm, payloadEntryForm, toggleEntryForm }}
    >
      {children}
    </DialogControlContext.Provider>
  )
}

const useDialogControl = () => {
  return useContext(DialogControlContext)
}

export { DialogControlProvider, useDialogControl }

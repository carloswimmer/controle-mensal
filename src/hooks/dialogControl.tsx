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
  openDeleteConfirm: boolean
  entryIdToDelete: string
  toggleDeleteConfirm(state: boolean, id?: string): void
}

const DialogControlContext = createContext<DialogControlContextData>(
  {} as DialogControlContextData,
)

const DialogControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [openEntryForm, setOpenEntryForm] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [payloadEntryForm, setPayloadEntryForm] =
    useState<EntryData>(initialValues)
  const [entryIdToDelete, setEntryToDelete] = useState('')

  const toggleEntryForm = useCallback((state: boolean, payload?: EntryData) => {
    setOpenEntryForm(state)
    if (payload?.id && state) setPayloadEntryForm(payload)
    if (!state) setPayloadEntryForm(initialValues)
  }, [])

  const toggleDeleteConfirm = useCallback((state: boolean, id?: string) => {
    setOpenDeleteConfirm(state)
    if (id) setEntryToDelete(id)
  }, [])

  return (
    <DialogControlContext.Provider
      value={{
        openEntryForm,
        payloadEntryForm,
        toggleEntryForm,
        openDeleteConfirm,
        entryIdToDelete,
        toggleDeleteConfirm,
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

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { initialValues } from '../pages/Dashboard/MainContent/FormDialog/Form'
import { EntryData } from './cashBook'

interface DialogControlContextData {
  openEntryForm: boolean
  openDeleteConfirm: boolean
  openCloneForm: boolean
  openDescriptionForm: boolean
  openBankForm: boolean
  payloadEntryForm: EntryData
  entryIdToDelete: string
  toggleEntryForm(state: boolean, payload?: EntryData): void
  toggleDeleteConfirm(state: boolean, id?: string): void
  toggleCloneForm(state: boolean): void
  toggleDescriptionForm(state: boolean): void
  toggleBankForm(state: boolean): void
}

const DialogControlContext = createContext<DialogControlContextData>(
  {} as DialogControlContextData,
)

const DialogControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [openEntryForm, setOpenEntryForm] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [openCloneForm, setOpenCloneForm] = useState(false)
  const [openDescriptionForm, setOpenDescriptionForm] = useState(false)
  const [openBankForm, setOpenBankForm] = useState(false)
  const [payloadEntryForm, setPayloadEntryForm] =
    useState<EntryData>(initialValues)
  const [entryIdToDelete, setEntryIdToDelete] = useState('')

  const toggleEntryForm = useCallback((state: boolean, payload?: EntryData) => {
    setOpenEntryForm(state)
    if (payload?.id && state) setPayloadEntryForm(payload)
    if (!state) setPayloadEntryForm(initialValues)
  }, [])

  const toggleDeleteConfirm = useCallback((state: boolean, id?: string) => {
    setOpenDeleteConfirm(state)
    if (id) setEntryIdToDelete(id)
  }, [])

  const toggleCloneForm = useCallback((state: boolean) => {
    setOpenCloneForm(state)
  }, [])

  const toggleDescriptionForm = useCallback((state: boolean) => {
    setOpenDescriptionForm(state)
  }, [])

  const toggleBankForm = useCallback((state: boolean) => {
    setOpenBankForm(state)
  }, [])

  return (
    <DialogControlContext.Provider
      value={{
        openEntryForm,
        openDeleteConfirm,
        openCloneForm,
        openDescriptionForm,
        openBankForm,
        payloadEntryForm,
        entryIdToDelete,
        toggleEntryForm,
        toggleDeleteConfirm,
        toggleCloneForm,
        toggleDescriptionForm,
        toggleBankForm,
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

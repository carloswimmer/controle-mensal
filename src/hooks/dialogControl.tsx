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
  openCloneConfirm: boolean
  openDescriptionForm: boolean
  openBankForm: boolean
  openLogoutConfirm: boolean
  payloadEntryForm: EntryData
  entryIdToDelete: string
  toggleEntryForm(state: boolean, payload?: EntryData): void
  toggleDeleteConfirm(state: boolean, id?: string): void
  toggleCloneConfirm(state: boolean): void
  toggleDescriptionForm(state: boolean): void
  toggleBankForm(state: boolean): void
  toggleLogoutConfirm(state: boolean): void
}

const DialogControlContext = createContext<DialogControlContextData>(
  {} as DialogControlContextData,
)

const DialogControlProvider = ({ children }: PropsWithChildren<{}>) => {
  const [openEntryForm, setOpenEntryForm] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [openCloneConfirm, setOpenCloneConfirm] = useState(false)
  const [openDescriptionForm, setOpenDescriptionForm] = useState(false)
  const [openBankForm, setOpenBankForm] = useState(false)
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false)
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

  const toggleCloneConfirm = useCallback((state: boolean) => {
    setOpenCloneConfirm(state)
  }, [])

  const toggleDescriptionForm = useCallback((state: boolean) => {
    setOpenDescriptionForm(state)
  }, [])

  const toggleBankForm = useCallback((state: boolean) => {
    setOpenBankForm(state)
  }, [])

  const toggleLogoutConfirm = useCallback((state: boolean) => {
    setOpenLogoutConfirm(state)
  }, [])

  return (
    <DialogControlContext.Provider
      value={{
        openEntryForm,
        openDeleteConfirm,
        openCloneConfirm,
        openDescriptionForm,
        openBankForm,
        openLogoutConfirm,
        payloadEntryForm,
        entryIdToDelete,
        toggleEntryForm,
        toggleDeleteConfirm,
        toggleCloneConfirm,
        toggleDescriptionForm,
        toggleBankForm,
        toggleLogoutConfirm,
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

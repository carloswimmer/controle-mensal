import { useCallback } from 'react'
import { DialogContent, DialogActions } from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../../../components/controls'
import { handleFieldProps } from '../../../../components/controls/utils'
import { useDialogControl } from '../../../../hooks/dialogControl'
import { useFilter } from '../../../../hooks/filter'
import { useToast } from '../../../../hooks/toast'

interface BankData {
  bank: string
}

export const initialValues: BankData = {
  bank: '',
}

const EntrySchema = Yup.object({
  bank: Yup.string().required('Campo obrigatório'),
})

const Form = () => {
  const { toggleBankForm } = useDialogControl()
  const { addBank } = useFilter()
  const { addToast } = useToast()

  const handleBankSubmit = useCallback(
    (values: BankData, actions: FormikHelpers<BankData>) => {
      addBank(values.bank)
      addToast({ severity: 'success', text: 'Banco incluído com sucesso' })
      toggleBankForm(false)
    },
    [addToast, toggleBankForm, addBank],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EntrySchema}
      onSubmit={(values, actions) => handleBankSubmit(values, actions)}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Input
              type="text"
              label="Banco"
              id="bank"
              {...handleFieldProps(formik, 'bank')}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              text="Cancelar"
              onClick={() => toggleBankForm(false)}
            />
            <Button
              type="submit"
              variant="text"
              color="secondary"
              text="Salvar"
            />
          </DialogActions>
        </form>
      )}
    </Formik>
  )
}

export default Form

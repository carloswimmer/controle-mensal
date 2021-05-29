import { useCallback } from 'react'
import { DialogContent, DialogActions, Grid } from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import {
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
} from '../../../../components/controls'
import { handleFieldProps } from '../../../../components/controls/utils'
import { EntryData, useCashBook } from '../../../../hooks/cashBook'
import { useDialogControl } from '../../../../hooks/dialogControl'
import { useFilter } from '../../../../hooks/filter'
import { useToast } from '../../../../hooks/toast'
import handleError from '../../../../utils/handleError'

const payTypeItems = [
  { id: 'credit', title: 'Crédito' },
  { id: 'debit', title: 'Débito' },
]

export const initialValues: EntryData = {
  id: undefined,
  paid: false,
  payDay: new Date(),
  payType: 'debit',
  description: '',
  bank: '',
  amount: 0,
}

const EntrySchema = Yup.object({
  payDay: Yup.date().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  bank: Yup.string().required('Campo obrigatório'),
  amount: Yup.number().required('Campo obrigatório'),
})

const Form = () => {
  const { payloadEntryForm, toggleEntryForm } = useDialogControl()
  const { descriptions, banks } = useFilter()
  const { saveEntry } = useCashBook()
  const { addToast } = useToast()

  const handleEntrySubmit = useCallback(
    async (values: EntryData, actions: FormikHelpers<EntryData>) => {
      try {
        await saveEntry(values)
        addToast({ severity: 'success', text: 'Lançamento salvo com sucesso' })
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      } finally {
        toggleEntryForm(false)
      }
    },
    [saveEntry, addToast, toggleEntryForm],
  )

  return (
    <Formik
      initialValues={payloadEntryForm || initialValues}
      validationSchema={EntrySchema}
      onSubmit={(values, actions) => handleEntrySubmit(values, actions)}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Dia do pagamento"
                  id="payDay"
                  {...handleFieldProps(formik, 'payDay')}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={6}
                justify="center"
                alignItems="center"
              >
                <Radio
                  label=""
                  id="payType"
                  items={payTypeItems}
                  {...handleFieldProps(formik, 'payType')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Select
                  label="Descrição"
                  id="description"
                  options={descriptions}
                  {...handleFieldProps(formik, 'description')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  label="Banco"
                  id="bank"
                  options={banks}
                  {...handleFieldProps(formik, 'bank')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  type="number"
                  label="Valor"
                  id="amount"
                  {...handleFieldProps(formik, 'amount')}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              text="Cancelar"
              onClick={() => toggleEntryForm(false)}
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
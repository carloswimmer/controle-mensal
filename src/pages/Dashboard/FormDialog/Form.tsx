import React, { useCallback } from 'react'
import { DialogContent, DialogActions, Grid } from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../../components/controls'
import { EntryData } from '../../../hooks/cashBook'
import { useDialogControl } from '../../../hooks/dialogControl'
import { handleFieldProps } from '../../../components/controls/utils'
import DatePicker from '../../../components/controls/DatePicker'

type EntryFormData = Omit<EntryData, 'id' | 'paid'>

const initialValues: EntryFormData = {
  payDay: new Date(),
  credit: false,
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
  const { handleCloseDialog } = useDialogControl()

  const handleEntrySubmit = useCallback(
    (values: EntryFormData, actions: FormikHelpers<EntryFormData>) => {
      handleCloseDialog()
    },
    [handleCloseDialog],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EntrySchema}
      onSubmit={(values, actions) => handleEntrySubmit(values, actions)}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} style={{ width: 500 }}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Dia do pagamento"
                  id="payDay"
                  {...handleFieldProps(formik, 'payDay')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label="Crédito"
                  id="credit"
                  {...handleFieldProps(formik, 'credit')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input
                  label="Descrição"
                  id="description"
                  {...handleFieldProps(formik, 'description')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  label="Banco"
                  id="bank"
                  {...handleFieldProps(formik, 'bank')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
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
              onClick={handleCloseDialog}
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

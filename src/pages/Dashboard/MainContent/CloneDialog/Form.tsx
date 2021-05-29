import React, { useCallback } from 'react'
import {
  DialogContent,
  DialogActions,
  Grid,
  DialogContentText,
} from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Button, Select } from '../../../../components/controls'
import { handleFieldProps } from '../../../../components/controls/utils'
import { useDialogControl } from '../../../../hooks/dialogControl'
import { useToast } from '../../../../hooks/toast'
import { useCashBook } from '../../../../hooks/cashBook'
import { useFilter } from '../../../../hooks/filter'
import handleError from '../../../../utils/handleError'

interface CloneData {
  year: string
  month: string
}

export const initialValues: CloneData = {
  year: '',
  month: '',
}

const EntrySchema = Yup.object({
  year: Yup.string().required('Campo obrigatório'),
  month: Yup.string().required('Campo obrigatório'),
})

const Form = () => {
  const { toggleCloneForm } = useDialogControl()
  const { createClone } = useCashBook()
  const { years, months } = useFilter()
  const { addToast } = useToast()

  const handleCloneSubmit = useCallback(
    async (values: CloneData, actions: FormikHelpers<CloneData>) => {
      try {
        await createClone(values.year, values.month)
        addToast({ severity: 'success', text: 'Clone criado com sucesso' })
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      } finally {
        toggleCloneForm(false)
      }
    },
    [addToast, toggleCloneForm, createClone],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EntrySchema}
      onSubmit={(values, actions) => handleCloneSubmit(values, actions)}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Escolha o <strong>ano</strong> e <strong>mês</strong> de onde
              serão tiradas as informções para criar um novo período
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Select
                  label="Ano"
                  id="year"
                  options={years}
                  {...handleFieldProps(formik, 'year')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  label="Mês"
                  id="month"
                  options={months}
                  {...handleFieldProps(formik, 'month')}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              text="Cancelar"
              onClick={() => toggleCloneForm(false)}
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

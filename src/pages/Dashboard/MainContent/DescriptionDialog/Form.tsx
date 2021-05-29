import { useCallback } from 'react'
import { DialogContent, DialogActions } from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../../../components/controls'
import { handleFieldProps } from '../../../../components/controls/utils'
import { useDialogControl } from '../../../../hooks/dialogControl'
import { useFilter } from '../../../../hooks/filter'
import { useToast } from '../../../../hooks/toast'

interface DescriptionData {
  description: string
}

export const initialValues: DescriptionData = {
  description: '',
}

const EntrySchema = Yup.object({
  description: Yup.string().required('Campo obrigatório'),
})

const Form = () => {
  const { toggleDescriptionForm } = useDialogControl()
  const { addDescription } = useFilter()
  const { addToast } = useToast()

  const handleDescriptionSubmit = useCallback(
    (values: DescriptionData, actions: FormikHelpers<DescriptionData>) => {
      addDescription(values.description)
      addToast({ severity: 'success', text: 'Descrição incluída com sucesso' })
      toggleDescriptionForm(false)
    },
    [addToast, toggleDescriptionForm, addDescription],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EntrySchema}
      onSubmit={(values, actions) => handleDescriptionSubmit(values, actions)}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Input
              type="text"
              label="Descrição"
              id="description"
              {...handleFieldProps(formik, 'description')}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              text="Cancelar"
              onClick={() => toggleDescriptionForm(false)}
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

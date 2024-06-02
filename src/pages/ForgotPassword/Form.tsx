import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Backdrop, Box, CircularProgress, styled, Theme } from '@mui/material'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../components/controls'
import { handleFieldProps } from '../../components/controls/utils'
import handleError from '../../utils/handleError'
import { useToast } from '../../hooks/toast'
import { useDarkMode } from '../../hooks/darkMode'
import { useAuth } from '../../hooks/auth'

interface ResetPasswordData {
  email: string
}

const initialValues: ResetPasswordData = {
  email: '',
}

const resetPasswordSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
})

const Form = () => {
  const { addToast } = useToast()
  const { darkMode } = useDarkMode()
  const { resetPassword } = useAuth()
  const history = useHistory()

  const handleResetPasswordSubmit = useCallback(
    async (
      values: ResetPasswordData,
      actions: FormikHelpers<ResetPasswordData>,
    ) => {
      const { email } = values

      try {
        await resetPassword(email)
        addToast({
          text: 'Acesse seu e-mail para saber como redefinir sua senha',
          severity: 'success',
        })
        history.push('/')
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      } finally {
        history.location.pathname === '/forgot-password' &&
          actions.setSubmitting(false)
      }
    },
    [resetPassword, addToast, history],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
      onSubmit={(values, actions) => handleResetPasswordSubmit(values, actions)}
    >
      {formik => (
        <ResetPasswordForm onSubmit={formik.handleSubmit}>
          <Input
            label="E-mail"
            id="email"
            variant={darkMode ? 'outlined' : 'filled'}
            {...handleFieldProps(formik, 'email')}
          />

          <ButtonContainer>
            {formik.isSubmitting && (
              <ButtonBackdrop open>
                <CircularProgress color="secondary" />
              </ButtonBackdrop>
            )}
            <Button
              type="submit"
              size="large"
              fullWidth
              color="secondary"
              text="Redefinir"
              disabled={formik.isSubmitting}
            />
          </ButtonContainer>
        </ResetPasswordForm>
      )}
    </Formik>
  )
}

const ResetPasswordForm = styled('form')(() => ({
  '& .MuiTextField-root': {
    marginTop: 4,
    marginBottom: 24,
  },
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(230, 241, 225, 0.8)',
    transition: 'background-color 0.3s',
  },
  '& .MuiFilledInput-root:hover': {
    backgroundColor: 'rgba(230, 241, 225, 0.65)',
  },
}))

const ButtonContainer = styled(Box)(() => ({
  marginTop: 8,

  '& button': {
    height: 48,
  },
}))

const ButtonBackdrop = styled(Backdrop)<Theme>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}))

export default Form

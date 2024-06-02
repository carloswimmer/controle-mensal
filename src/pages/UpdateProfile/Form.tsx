import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Backdrop, Box, CircularProgress, styled } from '@mui/material'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../components/controls'
import { handleFieldProps } from '../../components/controls/utils'
import handleError from '../../utils/handleError'
import { useToast } from '../../hooks/toast'
import { useDarkMode } from '../../hooks/darkMode'
import { useAuth, AuthData } from '../../hooks/auth'

interface UpdateProfileData extends AuthData {
  passwordConfirm: string
}

const initialValues: UpdateProfileData = {
  email: '',
  password: '',
  passwordConfirm: '',
}

const updateProfileSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string(),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'As senhas estão diferentes',
  ),
})

const Form = () => {
  const { addToast } = useToast()
  const { darkMode } = useDarkMode()
  const { updateEmail, updatePassword, user } = useAuth()
  const history = useHistory()

  const handleUpdateProfileSubmit = useCallback(
    async (
      values: UpdateProfileData,
      actions: FormikHelpers<UpdateProfileData>,
    ) => {
      const { email, password } = values

      const promises = []

      if (email !== user?.email) {
        promises.push(updateEmail(email))
      }

      if (password) {
        promises.push(updatePassword(password))
      }

      try {
        await Promise.all(promises)
        addToast({
          text: 'Atualização efetuada com sucesso',
          severity: 'success',
        })
        history.push('/dashboard')
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      } finally {
        history.location.pathname === '/update-profile' &&
          actions.setSubmitting(false)
      }
    },
    [updateEmail, updatePassword, addToast, history, user?.email],
  )

  return (
    <Formik
      initialValues={{ ...initialValues, email: user?.email || '' }}
      validationSchema={updateProfileSchema}
      onSubmit={(values, actions) => handleUpdateProfileSubmit(values, actions)}
    >
      {formik => (
        <UpdateProfileForm onSubmit={formik.handleSubmit}>
          <Input
            label="E-mail"
            id="email"
            variant={darkMode ? 'outlined' : 'filled'}
            {...handleFieldProps(formik, 'email')}
          />
          <Input
            label="Senha"
            id="password"
            variant={darkMode ? 'outlined' : 'filled'}
            type="password"
            placeholder="Deixe em branco para manter"
            {...handleFieldProps(formik, 'password')}
          />
          <Input
            label="Confirmar Senha"
            id="passwordConfirm"
            variant={darkMode ? 'outlined' : 'filled'}
            type="password"
            placeholder="Deixe em branco para manter"
            {...handleFieldProps(formik, 'passwordConfirm')}
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
              text="Atualizar"
              disabled={formik.isSubmitting}
            />
          </ButtonContainer>
        </UpdateProfileForm>
      )}
    </Formik>
  )
}

const UpdateProfileForm = styled('form')(() => ({
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

const ButtonBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}))

export default Form

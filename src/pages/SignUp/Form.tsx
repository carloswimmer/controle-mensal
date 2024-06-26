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

interface SignUpData extends AuthData {
  passwordConfirm: string
}

const initialValues: SignUpData = {
  email: '',
  password: '',
  passwordConfirm: '',
}

const signUpSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  passwordConfirm: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas estão diferentes'),
})

const Form = () => {
  const { addToast } = useToast()
  const { darkMode } = useDarkMode()
  const { signUp } = useAuth()
  const history = useHistory()

  const handleSignUpSubmit = useCallback(
    async (values: SignUpData, actions: FormikHelpers<SignUpData>) => {
      const { email, password } = values

      try {
        await signUp({ email, password })
        addToast({
          text: 'Cadastro efetuado com sucesso',
          severity: 'success',
        })
        history.push('/')
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      } finally {
        history.location.pathname === '/sign-up' && actions.setSubmitting(false)
      }
    },
    [signUp, addToast, history],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={(values, actions) => handleSignUpSubmit(values, actions)}
    >
      {formik => (
        <SignUpForm onSubmit={formik.handleSubmit}>
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
            {...handleFieldProps(formik, 'password')}
          />
          <Input
            label="Confirmar Senha"
            id="passwordConfirm"
            variant={darkMode ? 'outlined' : 'filled'}
            type="password"
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
              text="Cadastrar"
              disabled={formik.isSubmitting}
            />
          </ButtonContainer>
        </SignUpForm>
      )}
    </Formik>
  )
}

const SignUpForm = styled('form')(() => ({
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

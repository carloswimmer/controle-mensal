import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Backdrop,
  Box,
  CircularProgress,
  styled,
  Theme,
} from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../components/controls'
import { handleFieldProps, handleError } from '../../components/controls/utils'

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

const ButtonBackdrop = styled(Backdrop)<Theme>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}))

export default Form

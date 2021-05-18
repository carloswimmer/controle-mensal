import { useCallback, useState, MouseEvent } from 'react'
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  styled,
  Theme,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, Button } from '../../components/controls'
import handleFieldProps from '../../components/controls/utils/handleFieldProps'

import { useToast } from '../../hooks/toast'
import { useDarkMode } from '../../hooks/darkMode'

export interface SignInData {
  email: string
  password: string
}

const initialValues: SignInData = {
  email: '',
  password: '',
}

const signInSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})

const Form = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { addToast } = useToast()
  const { darkMode } = useDarkMode()

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(state => !state)
  }, [])

  const handleMouseDownPassword = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    },
    [],
  )

  const handleSignInSubmit = useCallback(
    (values: SignInData, actions: FormikHelpers<SignInData>) => {
      try {
        console.log(values)
        addToast({
          text: 'Autenticação efetuado com sucesso',
          severity: 'success',
        })
      } catch (error) {
        addToast({ text: error })
      } finally {
        setTimeout(() => {
          actions.setSubmitting(false)
        }, 2000)
      }
    },
    [addToast],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values, actions) => handleSignInSubmit(values, actions)}
    >
      {formik => (
        <SignInForm onSubmit={formik.handleSubmit}>
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
            type={showPassword ? 'text' : 'password'}
            {...handleFieldProps(formik, 'password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    style={darkMode ? { color: '#ffffffb0' } : {}}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
              text="Entrar"
              disabled={formik.isSubmitting}
            />
          </ButtonContainer>
        </SignInForm>
      )}
    </Formik>
  )
}

const SignInForm = styled('form')(() => ({
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
  marginBottom: 56,

  '& button': {
    height: 48,
  },
}))

const ButtonBackdrop = styled(Backdrop)<Theme>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}))

export default Form

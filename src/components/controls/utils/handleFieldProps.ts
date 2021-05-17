import { FieldInputProps, FormikProps } from 'formik'

type FieldProps = FieldInputProps<any> & {
  error: boolean
  helperText?: string | false
}

export default function handleFieldProps(
  formik: FormikProps<any>,
  id: string,
): FieldProps {
  const { getFieldProps, getFieldMeta } = formik

  const errorMessage = getFieldMeta(id).touched && getFieldMeta(id).error

  return {
    error: !!errorMessage,
    helperText: errorMessage,
    ...getFieldProps(id),
  }
}

import { forwardRef, ReactElement, Ref } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { useDialogControl } from '../../../hooks/dialogControl'
import Form from './Form'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FormDialog = (): JSX.Element => {
  const { openEntryForm, toggleEntryForm } = useDialogControl()

  return (
    <div>
      <Dialog
        open={openEntryForm}
        onClose={() => toggleEntryForm(false)}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Novo Lançamento</DialogTitle>
        <Form />
      </Dialog>
    </div>
  )
}

export default FormDialog

import { forwardRef, ReactElement, Ref } from 'react'
import { DialogTitle, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'

import { GlassDialog as Dialog } from '../../../../styles/GlassPaper'
import { useDialogControl } from '../../../../hooks/dialogControl'
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Novo Lançamento</DialogTitle>
        <Form />
      </Dialog>
    </div>
  )
}

export default FormDialog

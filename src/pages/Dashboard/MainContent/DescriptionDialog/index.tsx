import { forwardRef, ReactElement, Ref } from 'react'
import { DialogTitle, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

import { GlassDialog as Dialog } from '../../../../styles/GlassPaper'
import { useDialogControl } from '../../../../hooks/dialogControl'
import Form from './Form'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DescriptionDialog = (): JSX.Element => {
  const { isOpen, toggleDialog } = useDialogControl()

  return (
    <div>
      <Dialog
        open={!!isOpen['description']?.opened}
        onClose={() => toggleDialog('description', false)}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
          Nova Descrição
        </DialogTitle>
        <Form />
      </Dialog>
    </div>
  )
}

export default DescriptionDialog

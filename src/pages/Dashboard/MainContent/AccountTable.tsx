import { styled } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { DeleteRounded, EditRounded } from '@material-ui/icons'
import Paper from '@material-ui/core/Paper'
import { useCashBook } from '../../../hooks/cashBook'
import { useFilter } from '../../../hooks/filter'
import { useDialogControl } from '../../../hooks/dialogControl'

const AccountTable = () => {
  const { checkEntry, isLoading } = useCashBook()
  const { filterResults } = useFilter()
  const { toggleEntryForm, toggleDeleteConfirm } = useDialogControl()

  return (
    <div>
      <TableContainer component={TableBackground}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ok</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Banco</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Cred/Deb</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton variant="rect" height={44} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton variant="rect" height={44} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Skeleton variant="rect" height={44} />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              filterResults.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={entry.paid}
                      onChange={() => checkEntry(entry.id!, !entry.paid)}
                      inputProps={{ 'aria-labelledby': 'entry' + entry.id }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {entry.payDay.getUTCDate().toString()}
                  </TableCell>
                  <TableCell variant="head">{entry.description}</TableCell>
                  <TableCell>{entry.bank}</TableCell>
                  <TableCell align="center">
                    {entry.amount.toFixed(2)}
                  </TableCell>
                  {entry.payType === 'credit' ? (
                    <CreditCell align="center">Crédito</CreditCell>
                  ) : (
                    <DebitCell align="center">Débito</DebitCell>
                  )}
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => toggleEntryForm(true, entry)}
                    >
                      <EditRounded fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => toggleDeleteConfirm(true, entry.id)}
                    >
                      <DeleteRounded fontSize="small" color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const TableBackground = styled(Paper)(() => ({
  backgroundColor: '#424242a8',
  backdropFilter: 'blur(14px)',
}))

const CreditCell = styled(TableCell)({
  color: '#57dd57',
})

const DebitCell = styled(TableCell)({
  color: '#d63434',
})

export default AccountTable

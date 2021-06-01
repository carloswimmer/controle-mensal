import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  styled,
} from '@material-ui/core'
import { EditRounded, DeleteRounded } from '@material-ui/icons'
import NoData from '../../../../components/NoData'
import { useCashBook } from '../../../../hooks/cashBook'
import { useDialogControl } from '../../../../hooks/dialogControl'
import { useFilter } from '../../../../hooks/filter'

const TableContent = () => {
  const { checkEntry } = useCashBook()
  const { filterResults } = useFilter()
  const { toggleEntryForm, toggleDeleteConfirm } = useDialogControl()

  if (!filterResults.length) {
    return <NoData />
  }

  return (
    <>
      {filterResults.map(entry => (
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
          <TableCell align="center">{entry.amount.toFixed(2)}</TableCell>
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
      ))}
    </>
  )
}

const CreditCell = styled(TableCell)({
  color: '#57dd57',
})

const DebitCell = styled(TableCell)({
  color: '#d63434',
})

export default TableContent

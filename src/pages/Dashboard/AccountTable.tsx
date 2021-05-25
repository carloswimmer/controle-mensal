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
import { DeleteRounded, EditRounded } from '@material-ui/icons'
import Paper from '@material-ui/core/Paper'
import { useCashBook } from '../../hooks/cashBook'

const AccountTable = () => {
  const { entries, checkEntry } = useCashBook()

  return (
    <Container>
      <TableContainer component={Paper}>
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
            {entries.map(entry => (
              <TableRow key={entry.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={entry.paid}
                    onChange={() => checkEntry(entry.id)}
                    inputProps={{ 'aria-labelledby': 'entry' + entry.id }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {entry.payDay.substr(-2, 2)}
                </TableCell>
                <TableCell variant="head">{entry.description}</TableCell>
                <TableCell>{entry.bank}</TableCell>
                <TableCell align="center">{entry.amount.toFixed(2)}</TableCell>
                {entry.credit ? (
                  <CreditCell align="center">Crédito</CreditCell>
                ) : (
                  <DebitCell align="center">Débito</DebitCell>
                )}
                <TableCell align="center">
                  <IconButton aria-label="delete">
                    <EditRounded fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteRounded fontSize="small" color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

const Container = styled('div')(() => ({
  width: 'calc(100vw - 670px)',
  margin: '0 auto',
}))

const CreditCell = styled(TableCell)({
  color: '#57dd57',
})

const DebitCell = styled(TableCell)({
  color: '#d63434',
})

export default AccountTable

import { styled } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import { DeleteRounded, EditRounded } from '@material-ui/icons'
import Paper from '@material-ui/core/Paper'

function createData(
  id: number,
  description: string,
  bank: string,
  payDay: string,
  amount: number,
  credit: boolean,
) {
  return { id, description, bank, payDay, amount, credit }
}

const rows = [
  createData(1, 'Elektro', 'Nubank', '02/06/2021', 240.3, false),
  createData(2, 'Nextel', 'Nubank', '03/06/2021', 70, false),
  createData(3, 'CC Santander', 'Santander', '05/06/2021', 2044.0, false),
  createData(4, 'Salário', 'Nubank', '15/06/2021', 3280.44, true),
  createData(5, 'Salário', 'Santander', '15/06/2021', 5640.3, true),
]

const AccountTable = () => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Banco</TableCell>
              <TableCell align="right">Pagamento</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Cred/Deb</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" variant="head">
                  {row.description}
                </TableCell>
                <TableCell align="right">{row.bank}</TableCell>
                <TableCell align="right">{row.payDay}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                {row.credit ? (
                  <CreditCell align="right">Crédito</CreditCell>
                ) : (
                  <DebitCell align="right">Débito</DebitCell>
                )}
                <TableCell align="right">
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

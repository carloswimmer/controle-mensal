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
import { useCashBook } from '../../hooks/cashBook'

const AccountTable = () => {
  const { movements } = useCashBook()

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
            {movements.map(item => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row" variant="head">
                  {item.description}
                </TableCell>
                <TableCell align="right">{item.bank}</TableCell>
                <TableCell align="right">{item.payDay}</TableCell>
                <TableCell align="right">{item.amount}</TableCell>
                {item.credit ? (
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

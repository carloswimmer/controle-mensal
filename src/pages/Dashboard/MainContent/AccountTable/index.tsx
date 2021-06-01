import { styled } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { useCashBook } from '../../../../hooks/cashBook'
import TableSkeleton from '../../../../components/TableSkeleton'
import TableContent from './TableContent'

const AccountTable = () => {
  const { isLoading } = useCashBook()

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
            {isLoading ? <TableSkeleton /> : <TableContent />}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const TableBackground = styled(Paper)(() => ({
  backgroundColor: '#424242a8',
  backdropFilter: 'blur(14px)',
  maxWidth: 880,
  margin: '0 auto',
}))

export default AccountTable

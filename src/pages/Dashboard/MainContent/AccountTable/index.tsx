import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { useCashBook } from '../../../../hooks/cashBook'
import TableSkeleton from '../../../../components/TableSkeleton'
import TableContent from './TableContent'

const AccountTable = () => {
  const { isLoading } = useCashBook()

  return (
    <Frame>
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
    </Frame>
  )
}

const TableBackground = styled(Paper)({
  backgroundColor: '#424242a8',
  backdropFilter: 'blur(14px)',
  maxWidth: 880,
  margin: '0 auto',
})

const Frame = styled('div')({ paddingBottom: 104 })

export default AccountTable

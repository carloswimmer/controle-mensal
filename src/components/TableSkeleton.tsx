import { TableRow, TableCell } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const TableSkeleton = () => {
  return (
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
  )
}

export default TableSkeleton

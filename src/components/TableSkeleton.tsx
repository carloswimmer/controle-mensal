import { TableRow, TableCell } from '@mui/material'
import { Skeleton } from '@mui/lab'

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

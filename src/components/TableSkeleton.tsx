import { TableRow, TableCell, Skeleton } from '@mui/material'

const TableSkeleton = () => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={7}>
          <Skeleton variant="rectangular" height={44} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7}>
          <Skeleton variant="rectangular" height={44} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7}>
          <Skeleton variant="rectangular" height={44} />
        </TableCell>
      </TableRow>
    </>
  )
}

export default TableSkeleton

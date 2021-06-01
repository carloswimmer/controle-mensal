import React from 'react'
import { Grid, TableCell, TableRow, Typography } from '@material-ui/core'
import NoDataImg from '../assets/no-data.svg'

const NoData = () => {
  return (
    <TableRow>
      <TableCell colSpan={7}>
        <Grid
          container
          alignContent="center"
          justify="center"
          style={{ height: '198px' }}
        >
          <Grid
            item
            container
            alignContent="center"
            spacing={3}
            style={{ width: 'fit-content' }}
          >
            <Grid item>
              <img src={NoDataImg} alt="pessoa dizendo:" />
            </Grid>
            <Grid item style={{ margin: 'auto' }}>
              <Typography variant="h5">
                Não existem lançamentos
                <br />
                para essa pesquisa
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

export default NoData

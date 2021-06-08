import React from 'react'
import { Grid, Hidden, Typography } from '@material-ui/core'
import NoDataImg from '../assets/no-data.svg'

const NoData = () => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ minHeight: '198px' }}
    >
      <Grid
        item
        container
        alignContent="center"
        spacing={3}
        style={{ width: 'fit-content' }}
      >
        <Hidden xsDown>
          <Grid item>
            <img src={NoDataImg} alt="pessoa dizendo:" />
          </Grid>
        </Hidden>
        <Grid item style={{ margin: 'auto' }}>
          <Typography variant="h5" style={{ padding: 16 }}>
            Não existem lançamentos
            <br />
            para essa pesquisa
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NoData

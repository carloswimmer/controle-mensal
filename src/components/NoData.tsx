import React from 'react'
import { Grid, Hidden, Typography as MuiTypography } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
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
          <Typography variant="h5">
            Não existem lançamentos
            <br />
            para essa pesquisa
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Typography = styled(MuiTypography)<Theme>(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',

  '@media (min-width: 600px)': {
    textAlign: 'start',
  },
}))

export default NoData

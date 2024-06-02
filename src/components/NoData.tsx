import React from 'react'
import { Grid, Box, Typography as MuiTypography } from '@mui/material'
import { styled } from '@mui/material/styles'
import NoDataImg from '../assets/no-data.svg'

const NoData = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '198px' }}
    >
      <Grid
        item
        container
        alignContent="center"
        spacing={3}
        style={{ width: 'fit-content' }}
      >
        <Box display={{ xs: 'none', sm: 'block' }}>
          <Grid item>
            <img src={NoDataImg} alt="pessoa dizendo:" />
          </Grid>
        </Box>
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

const Typography = styled(MuiTypography)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',

  '@media (min-width: 600px)': {
    textAlign: 'start',
  },
}))

export default NoData

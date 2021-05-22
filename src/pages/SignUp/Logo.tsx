import { Grid, Typography } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { BubbleChartRounded } from '@material-ui/icons'

const Logo = () => {
  return (
    <Container>
      <Grid container justify="center" alignItems="center">
        <Grid item container xs={4} justify="flex-end">
          <Grid item>
            <LogoIcon />
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={8}>
          <Grid item>
            <ControlTitle>Controle</ControlTitle>
          </Grid>
          <Grid item>
            <MonthlyTitle>Mensal</MonthlyTitle>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled('div')<Theme>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}))

const LogoIcon = styled(BubbleChartRounded)<Theme>(({ theme }) => ({
  fontSize: 98,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(3),
}))

const ControlTitle = styled(Typography)<Theme>(({ theme }) => ({
  fontSize: 45,
  lineHeight: 0.9,
  color: theme.palette.primary.contrastText,
  textTransform: 'uppercase',
}))

const MonthlyTitle = styled(Typography)<Theme>(({ theme }) => ({
  fontSize: 60,
  lineHeight: 0.9,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  letterSpacing: -2,
  textTransform: 'uppercase',
}))

export default Logo

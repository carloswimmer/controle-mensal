import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'

interface ContentProps {
  text: string
  buttonLabel: string
  onClick(): void
}

const TutorialContent = ({ text, buttonLabel, onClick }: ContentProps) => {
  return (
    <>
      <Typography variant="body2">{text}</Typography>
      <Grid container justify="flex-end">
        <Grid item>
          <Button size="small" onClick={onClick}>
            {buttonLabel}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default TutorialContent

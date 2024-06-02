import React from 'react'
import { Typography, Grid, Button } from '@mui/material'

interface ContentProps {
  text: string
  buttonLabel: string
  onClick(): void
}

const TutorialContent = ({ text, buttonLabel, onClick }: ContentProps) => {
  return <>
    <Typography variant="body2">{text}</Typography>
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Button size="small" onClick={onClick}>
          {buttonLabel}
        </Button>
      </Grid>
    </Grid>
  </>;
}

export default TutorialContent

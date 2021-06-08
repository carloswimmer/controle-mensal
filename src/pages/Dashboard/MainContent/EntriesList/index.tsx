import React from 'react'
import { Grid } from '@material-ui/core'

import { useFilter } from '../../../../hooks/filter'
import NoData from '../../../../components/NoData'
import EntryCard from './EntryCard'
import { GlassPaper } from '../../../../styles/GlassPaper'

const EntriesList = () => {
  const { filterResults } = useFilter()

  if (!filterResults.length) {
    return (
      <GlassPaper>
        <NoData />
      </GlassPaper>
    )
  }

  return (
    <>
      <Grid container spacing={1} direction="column">
        {filterResults.map(entry => (
          <Grid item key={entry.id}>
            <EntryCard entry={entry} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default EntriesList

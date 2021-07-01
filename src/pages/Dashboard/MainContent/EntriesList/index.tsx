import React from 'react'
import { Grid } from '@material-ui/core'

import { useFilterActions } from '../../../../hooks/filterActions'
import NoData from '../../../../components/NoData'
import EntryCard from './EntryCard'
import { GlassPaper } from '../../../../styles/GlassPaper'

const EntriesList = () => {
  const { filterResults } = useFilterActions()

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

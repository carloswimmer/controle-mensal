import React from 'react'
import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

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
    <Frame>
      <Grid container spacing={1} direction="column">
        {filterResults.map(entry => (
          <Grid item key={entry.id}>
            <EntryCard entry={entry} />
          </Grid>
        ))}
      </Grid>
    </Frame>
  )
}

const Frame = styled('div')({ paddingBottom: 104 })

export default EntriesList

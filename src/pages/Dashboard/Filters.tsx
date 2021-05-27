import { ChangeEvent, useCallback, useState } from 'react'
import { Grid, TextField, Typography, Box, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { v4 as uuidv4 } from 'uuid'

import { initialFilterValues, useFilter } from '../../hooks/filter'

const Filters = () => {
  const { years, months, descriptions, banks, addFilter, removeFilters } =
    useFilter()

  const [selectValue, setSelectValue] = useState(uuidv4())

  const clearFilters = useCallback(() => {
    setSelectValue(uuidv4())
    removeFilters()
  }, [removeFilters])

  return (
    <Grid container spacing={5}>
      <Box px={3} py={1}>
        <Typography variant="h4" style={{ fontSize: '1.8rem' }}>
          Filtros
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Autocomplete
          id="year-select"
          key={selectValue}
          options={years}
          getOptionLabel={option => option}
          defaultValue={initialFilterValues[0].value}
          onChange={(event: ChangeEvent<{}>, value: string | null) =>
            addFilter({ type: 'year', value })
          }
          renderInput={params => (
            <TextField {...params} label="Ano" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="month-select"
          key={selectValue}
          options={months}
          getOptionLabel={option => option}
          defaultValue={initialFilterValues[1].value}
          onChange={(event: ChangeEvent<{}>, value: string | null) =>
            addFilter({ type: 'month', value })
          }
          renderInput={params => (
            <TextField {...params} label="Mês" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="description-select"
          key={selectValue}
          options={descriptions}
          getOptionLabel={option => option}
          onChange={(event: ChangeEvent<{}>, value: string | null) =>
            addFilter({ type: 'description', value })
          }
          renderInput={params => (
            <TextField {...params} variant="outlined" label="Descrição" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="bank-select"
          key={selectValue}
          options={banks}
          getOptionLabel={option => option}
          onChange={(event: ChangeEvent<{}>, value: string | null) =>
            addFilter({ type: 'bank', value })
          }
          renderInput={params => (
            <TextField {...params} label="Banco" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="sort-select"
          key={selectValue}
          options={['Descrição', 'Dia', 'Cred/Deb']}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField {...params} label="Ordenar por" variant="outlined" />
          )}
        />
      </Grid>
      <Grid container item xs={12} justify="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={clearFilters}>
            Limpar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Filters

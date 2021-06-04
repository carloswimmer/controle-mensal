import { ChangeEvent, useCallback, useState } from 'react'
import { Grid, TextField, Typography, Box, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { v4 as uuidv4 } from 'uuid'

import { useFilter } from '../../../hooks/filter'

const Filters = () => {
  const {
    filters,
    years,
    months,
    descriptions,
    banks,
    addFilter,
    removeFilters,
    orderBy,
  } = useFilter()

  const [selectValue, setSelectValue] = useState(uuidv4())

  const clearFilters = useCallback(() => {
    setSelectValue(uuidv4())
    removeFilters()
  }, [removeFilters])

  const getSelectedValue = useCallback(
    (selectedType: string) => {
      const selected = filters.find(filter => filter.type === selectedType)

      return selected ? selected.value : null
    },
    [filters],
  )

  return (
    <Grid container spacing={5}>
      <Box px={3} pt={2}>
        <Typography variant="h4" style={{ fontSize: '1.8rem' }}>
          Classificar
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Autocomplete
          id="sort-select"
          key={selectValue}
          options={['Dia', 'Descrição', 'Cred/Deb']}
          getOptionLabel={option => option}
          onChange={(event: ChangeEvent<{}>, value: string | null) =>
            orderBy(value)
          }
          renderInput={params => (
            <TextField {...params} label="Ordenar por" variant="outlined" />
          )}
        />
      </Grid>
      <Box px={3} pt={2}>
        <Typography variant="h4" style={{ fontSize: '1.8rem' }}>
          Filtrar
        </Typography>
      </Box>

      <Grid item xs={12}>
        <Autocomplete
          id="year-select"
          key={selectValue}
          options={years}
          getOptionLabel={option => option}
          value={getSelectedValue('year')}
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
          value={getSelectedValue('month')}
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
          options={['Nova descrição', ...descriptions]}
          getOptionLabel={option => option}
          value={getSelectedValue('description')}
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
          options={['Novo banco', ...banks]}
          getOptionLabel={option => option}
          value={getSelectedValue('bank')}
          onChange={(event: ChangeEvent<{}>, value: string | null) =>
            addFilter({ type: 'bank', value })
          }
          renderInput={params => (
            <TextField {...params} label="Banco" variant="outlined" />
          )}
        />
      </Grid>
      <Grid container item xs={12} justify="flex-end">
        <Grid item>
          <Button variant="outlined" color="primary" onClick={clearFilters}>
            Limpar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Filters

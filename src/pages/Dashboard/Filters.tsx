import { useEffect, useState } from 'react'
import { Grid, TextField, Checkbox, Typography, Box } from '@material-ui/core'
import {
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
} from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'

import { useCashBook } from '../../hooks/cashBook'

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const icon = <CheckBoxOutlineBlankRounded fontSize="small" />
const checkedIcon = <CheckBoxRounded fontSize="small" />

const Filters = () => {
  const [years, setYears] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])
  const { entries } = useCashBook()

  useEffect(() => {
    const onlyYears = entries.map(entry =>
      new Date(entry.payDay).getFullYear().toString(),
    )
    const uniqueYears = new Set(onlyYears)

    setYears(Array.from(uniqueYears))
  }, [entries])

  useEffect(() => {
    const onlyBanks = entries.map(entry => entry.bank)
    const uniqueBanks = new Set(onlyBanks)

    setBanks(Array.from(uniqueBanks))
  }, [entries])

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
          options={years}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField {...params} label="Ano" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="month-select"
          options={months}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField {...params} label="Mês" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          id="description-select"
          options={entries}
          disableCloseOnSelect
          getOptionLabel={option => option.description}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.description}
            </>
          )}
          renderInput={params => (
            <TextField {...params} variant="outlined" label="Descrição" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="bank-select"
          options={banks}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField {...params} label="Banco" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="sort-select"
          options={['Descrição', 'Dia', 'Cred/Deb']}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField {...params} label="Ordenar por" variant="outlined" />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default Filters

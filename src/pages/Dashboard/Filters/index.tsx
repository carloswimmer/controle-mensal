import React, { ChangeEvent, useCallback, useState } from 'react'
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Zoom,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { v4 as uuidv4 } from 'uuid'

import { useDialogControl } from '../../../hooks/dialogControl'
import { useFilter } from '../../../hooks/filter'
import TutorialContent from '../../../components/TutorialContent'
import { TutorialTip as Tooltip } from '../../../styles/TutorialTip'

const step2 =
  'Com os filtros você controla o que é mostrado nos lançamentos, podendo, ' +
  'por exemplo, mostrar os movimentos de determinado banco, ou comparar um ' +
  'tipo de lançamento dentre todos os meses...'

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
  const { isOpen, toggleDialog } = useDialogControl()

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

  const handleNextStep = useCallback(() => {
    toggleDialog('tutorial-step2', false)
    toggleDialog('tutorial-step3', true)
  }, [toggleDialog])

  return (
    <Tooltip
      open={!!isOpen['tutorial-step2']}
      title={
        <TutorialContent
          text={step2}
          onClick={handleNextStep}
          buttonLabel="Próximo"
        />
      }
      TransitionComponent={Zoom}
      placement="left-start"
      interactive
    >
      <Grid container spacing={4}>
        <Box px={3} pt={2}>
          <Typography variant="h4" style={{ fontSize: '1.8rem' }}>
            Classificar
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Autocomplete
            id={`sort-select-${selectValue.substr(0, 12)}`}
            key={selectValue}
            options={['Dia', 'Descrição', 'Créd/Déb/Invest']}
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
            id={`year-select-${selectValue.substr(0, 12)}`}
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
            id={`month-select-${selectValue.substr(0, 12)}`}
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
            id={`description-select-${selectValue.substr(0, 12)}`}
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
            id={`bank-select-${selectValue.substr(0, 12)}`}
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
    </Tooltip>
  )
}

export default Filters

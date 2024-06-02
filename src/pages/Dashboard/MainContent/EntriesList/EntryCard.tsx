import React, { useCallback } from 'react'
import {
  Box,
  Typography,
  Chip as MuiChip,
  IconButton,
  Checkbox,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MonetizationOnRounded, DeleteRounded } from '@mui/icons-material'
import { format } from 'date-fns'

import { useDialogControl } from '../../../../hooks/dialogControl'
import { EntryData, useCashBook } from '../../../../hooks/cashBook'
import { GlassPaper as Paper } from '../../../../styles/GlassPaper'

const EntryCard = ({ entry }: { entry: EntryData }) => {
  const { toggleDialog } = useDialogControl()
  const { checkEntry } = useCashBook()

  const showPayType = useCallback((payType: string) => {
    if (payType === 'credit') {
      return <CreditIcon />
    }
    if (payType === 'debit') {
      return <DebitIcon />
    }
    if (payType === 'investment') {
      return <InvetmentIcon />
    }
  }, [])

  return (
    <Paper>
      <Box flexDirection="column">
        <Box role="body" display="flex">
          <Box role="main" flexDirection="column" flexGrow={1}>
            <Box px={2} pt={1}>
              <Overline variant="overline" color="textSecondary">
                {entry.bank}
              </Overline>
            </Box>
            <Box px={2} pb={2.5}>
              <Description variant="h5">{entry.description}</Description>
            </Box>
          </Box>
          <Box role="aside" pt={1.5} pr={1.5}>
            <Typography variant="body2" color="textSecondary">
              {format(entry.payDay, 'dd/MM/yyyy')}
            </Typography>
          </Box>
        </Box>
        <FooterBox role="footer" display="flex" py={0.25}>
          <Box
            role="content"
            display="flex"
            alignItems="center"
            flexGrow={1}
            px={2}
          >
            <Chip
              icon={showPayType(entry.payType)}
              label={entry.amount.toFixed(2)}
              onClick={() => toggleDialog('entry', true, entry)}
            />
          </Box>
          <Box role="action" pr={0.5}>
            <IconButton
              aria-label="delete"
              onClick={() => toggleDialog('delete', true, entry)}
              size="large"
            >
              <DeleteRounded fontSize="small" color="primary" />
            </IconButton>
            <Checkbox
              color="primary"
              checked={entry.paid}
              onChange={() => checkEntry(entry.id!, !entry.paid)}
              inputProps={{ 'aria-labelledby': 'entry' + entry.id }}
            />
          </Box>
        </FooterBox>
      </Box>
    </Paper>
  )
}

const Overline = styled(Typography)({ fontSize: '0.72rem' })

const Description = styled(Typography)({ lineHeight: 0.8 })

const FooterBox = styled(Box)({ backgroundColor: '#c4c4c41c' })

const Chip = styled(MuiChip)({ backgroundColor: '#363636' })

const CreditIcon = styled(MonetizationOnRounded)({ color: '#57dd57' })

const DebitIcon = styled(MonetizationOnRounded)({ color: '#d63434' })

const InvetmentIcon = styled(MonetizationOnRounded)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export default EntryCard

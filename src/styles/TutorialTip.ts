import { Tooltip } from '@mui/material'
import { withStyles } from '@mui/styles'

export const TutorialTip = withStyles(() => ({
  tooltip: {
    border: '1px solid #fafafa66',
    padding: '8px 12px',
  },
}))(Tooltip)

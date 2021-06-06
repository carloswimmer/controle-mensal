import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const TutorialTip = withStyles(() => ({
  tooltip: {
    border: '1px solid #fafafa66',
    padding: '8px 12px',
  },
}))(Tooltip)

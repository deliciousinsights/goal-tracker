import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'

import classes from './TrackerScreen.module.css'
import { formatDate, getDayCounts } from '../lib/helpers'
import Gauge from '../shared/Gauge'
import store from '../store'

export default function TrackerScreen() {
  const { goals, today, todaysProgress } = store
  return (
    <Card className={classes.goalTracker}>
      <CardHeader
        subheader={<Gauge {...overallProgress()} />}
        title={formatDate(today, 'medium')}
      />
      <CardContent>FIXME</CardContent>
      <CardActions>
        <Button
          color='secondary'
          startIcon={<HistoryIcon />}
          variant='contained'
        >
          Historique
        </Button>
        <Button startIcon={<SettingsIcon />} variant='contained'>
          Paramètres
        </Button>
      </CardActions>
    </Card>
  )

  function overallProgress() {
    const { totalProgress, totalTarget } = getDayCounts(todaysProgress, goals)

    return { value: totalProgress, max: totalTarget }
  }
}

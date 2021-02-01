import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import HistoryIcon from '@material-ui/icons/History'
import SettingsIcon from '@material-ui/icons/Settings'

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

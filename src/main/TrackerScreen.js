import { useSelector } from 'react-redux'

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
import GoalTrackerWidget from './GoalTrackerWidget'

export default function TrackerScreen() {
  const { goals, today, todaysProgress } = useSelector(selectState)

  return (
    <Card className={classes.goalTracker}>
      <CardHeader
        subheader={<Gauge {...overallProgress()} />}
        title={formatDate(today, 'medium')}
      />
      <CardContent>
        {goals.map((goal) => (
          <GoalTrackerWidget
            goal={goal}
            key={goal.id}
            progress={todaysProgress[goal.id] || 0}
          />
        ))}
      </CardContent>
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

function selectState({ goals, today, todaysProgress }) {
  return {
    goals,
    today,
    todaysProgress,
  }
}

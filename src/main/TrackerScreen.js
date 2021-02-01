import { useDispatch, useSelector } from 'react-redux'

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
import GoalTrackerWidget from './GoalTrackerWidget'
import { progressOnGoal } from '../reducers/todaysProgress'

export default function TrackerScreen() {
  const { goals, today, todaysProgress } = useSelector(selectState)
  const dispatch = useDispatch()

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
            onProgress={markGoalProgression}
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

  function markGoalProgression({ id }) {
    dispatch(progressOnGoal({ goalId: id }))
  }

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

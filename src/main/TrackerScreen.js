import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

import classes from './TrackerScreen.module.css'
import { formatDate, getDayCounts } from '../lib/helpers'
import Gauge from '../shared/Gauge'
import GoalTrackerWidget from './GoalTrackerWidget'
import { progressOnGoal } from '../reducers/todaysProgress'
import { requestNotificationPermission } from '../reducers/config'

export default function TrackerScreen() {
  useEffect(() => {
    document.title = 'Mes objectifs du jour'
  }, [])

  const { canPromptForNotify, goals, today, todaysProgress } =
    useSelector(selectState)
  const dispatch = useDispatch()

  return (
    <>
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
            component={Link}
            startIcon={<HistoryIcon />}
            to='/history'
            variant='contained'
          >
            Historique
          </Button>
          <Button
            component={Link}
            startIcon={<SettingsIcon />}
            to='/settings'
            variant='contained'
          >
            Paramètres
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        action={
          <Button
            onClick={() => dispatch(requestNotificationPermission())}
            variant='contained'
          >
            Oh oui !
          </Button>
        }
        message='Cliquez ci-contre pour être notifié·e quand votre journée est historisée'
        open={canPromptForNotify}
        TransitionComponent={Slide}
      />
    </>
  )

  function markGoalProgression({ id }) {
    dispatch(progressOnGoal({ goalId: id }))
  }

  function overallProgress() {
    const { totalProgress, totalTarget } = getDayCounts(todaysProgress, goals)

    return { value: totalProgress, max: totalTarget }
  }
}

function selectState({
  config: { canPromptForNotify },
  goals,
  today,
  todaysProgress,
}) {
  return {
    canPromptForNotify,
    goals,
    today,
    todaysProgress,
  }
}

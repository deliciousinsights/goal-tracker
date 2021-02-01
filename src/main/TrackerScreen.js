import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import HistoryIcon from '@material-ui/icons/History'
import SettingsIcon from '@material-ui/icons/Settings'
import { Slide } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'

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

  const { canPromptForNotify, goals, today, todaysProgress } = useSelector(
    selectState
  )
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
            color='secondary'
            onClick={() => dispatch(requestNotificationPermission())}
            variant='text'
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
    dispatch(progressOnGoal(id))
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

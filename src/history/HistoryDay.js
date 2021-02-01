// Journée d’historique
// ====================

// Section de l'écran d’historique, dédiée à un jour précis.

import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

import {
  arrayOf,
  GoalPropType,
  HistoryDayStatsPropType,
} from '../shared/prop-types'
import { formatDate } from '../lib/helpers'
import HistoryDayGoal from './HistoryDayGoal'

export default function HistoryDay({ goals, stats: { date, progresses } }) {
  return (
    <div>
      <Divider />
      <List>
        <Typography variant='subtitle1'>{formatDate(date)}</Typography>
        {goals.map((goal) => {
          const goalStats = progresses[goal.id]
          if (goalStats) {
            return (
              <HistoryDayGoal key={goal.id} goal={goal} stats={goalStats} />
            )
          }
          return null
        })}
      </List>
    </div>
  )
}

// Comme toujours, on définit les propriétés attendues/autorisées pour
// validation.
HistoryDay.propTypes = {
  goals: arrayOf(GoalPropType).isRequired,
  stats: HistoryDayStatsPropType.isRequired,
}

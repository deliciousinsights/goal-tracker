import { combineReducers } from 'redux'

import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import today from './today'
import todaysProgress from './todaysProgress'

const goalTrackerReducer = combineReducers({
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

export default goalTrackerReducer

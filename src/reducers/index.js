import { combineReducers } from 'redux'

import config from './config'
import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import reduceCloseDay from './closeDay'
import today from './today'
import todaysProgress from './todaysProgress'

const goalTrackerReducer = combineReducers({
  config,
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

export default goalTrackerReducer

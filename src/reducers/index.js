import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

import config from './config'
import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import reduceCloseDay from './closeDay'
import today from './today'
import todaysProgress from './todaysProgress'

const coreReducer = combineReducers({
  config,
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

const goalTrackerReducer = reduceReducers(coreReducer, reduceCloseDay)

export default goalTrackerReducer

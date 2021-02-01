import { number } from 'prop-types'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'

import {
  arrayOf,
  GoalPropType,
  string,
  TodaysProgressPropType,
} from '../shared/prop-types'
import { makeStore } from '../store'
import TrackerScreen from './TrackerScreen'

const goals = [
  {
    id: '5bf57a79890a6e2c11ec9665',
    name: 'Apprendre React',
    target: 5,
    units: 'aspects',
  },
  {
    id: '5bf57a79890a6e2c11ec9666',
    name: 'Apprendre Redux',
    target: 2,
    units: 'vidéos',
  },
  {
    id: '5bf57a79890a6e2c11ec9667',
    name: 'Apprendre Webpack',
    target: 3,
    units: 'pages de doc',
  },
]

const today = new Date().toISOString().split('T')[0]

const progressControl = (max) => ({ type: 'range', min: 0, max, step: 1 })

export default {
  argTypes: {
    goals: { table: { disable: true } },
    reactProgress: {
      control: progressControl(5),
      defaultValue: 1,
      name: 'Progression React',
    },
    reduxProgress: {
      control: progressControl(2),
      defaultValue: 1,
      name: 'Progression Redux',
    },
    today: { table: { disable: true } },
    webpackProgress: {
      control: progressControl(3),
      defaultValue: 1,
      name: 'Progression Webpack',
    },
  },
  component: TrackerScreen,
  title: 'Main / TrackerScreen',
}

export const Regular = ({ reactProgress, reduxProgress, webpackProgress }) => {
  const overrides = [reactProgress, reduxProgress, webpackProgress]
  const todaysProgress = Object.fromEntries(
    goals.map(({ id }, index) => [id, overrides[index]])
  )
  return (
    <WrappedTrackerScreen
      goals={goals}
      today={today}
      todaysProgress={todaysProgress}
    />
  )
}
Regular.propTypes = {
  reactProgress: number.isRequired,
  reduxProgress: number.isRequired,
  webpackProgress: number.isRequired,
}

function WrappedTrackerScreen({ goals, today, todaysProgress }) {
  const store = makeStore(
    { goals, today, todaysProgress },
    { shouldPersist: false }
  )
  return (
    <Router>
      <Provider store={store}>
        <TrackerScreen />
      </Provider>
    </Router>
  )
}
WrappedTrackerScreen.propTypes = {
  goals: arrayOf(GoalPropType).isRequired,
  today: string.isRequired,
  todaysProgress: TodaysProgressPropType.isRequired,
}

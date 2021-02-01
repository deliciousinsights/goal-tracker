import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { subDays } from 'date-fns'

import {
  arrayOf,
  GoalPropType,
  HistoryDayStatsPropType,
  string,
} from '../shared/prop-types'
import HistoryScreen from './HistoryScreen'
import { isoDate } from '../lib/helpers'
import { makeStore } from '../store'

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
const refHistory = [
  {
    date: isoDate(subDays(new Date(), 1)),
    progresses: {
      '5bf57a79890a6e2c11ec9665': [2, 5],
      '5bf57a79890a6e2c11ec9666': [1, 2],
    },
  },
  {
    date: isoDate(subDays(new Date(), 2)),
    progresses: {
      '5bf57a79890a6e2c11ec9665': [4, 5],
      '5bf57a79890a6e2c11ec9666': [1, 2],
      '5bf57a79890a6e2c11ec9667': [2, 3],
    },
  },
  {
    date: isoDate(subDays(new Date(), 3)),
    progresses: {
      '5bf57a79890a6e2c11ec9665': [3, 5],
      '5bf57a79890a6e2c11ec9666': [2, 2],
      '5bf57a79890a6e2c11ec9667': [1, 3],
    },
  },
]

const DEFAULT_DAYS = ['Hier', 'Avant-hier', 'Plus tôt encore']

export default {
  argTypes: {
    days: {
      control: {
        type: 'inline-check',
        options: DEFAULT_DAYS,
      },
      defaultValue: DEFAULT_DAYS,
      name: 'Jours historisés',
    },
    history: { table: { disable: true } },
  },
  component: HistoryScreen,
  title: 'History / HistoryScreen',
}

const Template = ({ days }) => {
  const history = DEFAULT_DAYS.map(
    (v, i) => days.includes(v) && refHistory[i]
  ).filter(Boolean)

  return <WrappedHistoryScreen goals={goals} history={history} />
}
Template.propTypes = {
  days: arrayOf(string).isRequired,
}

export const WithHistory = Template.bind()
WithHistory.args = { days: DEFAULT_DAYS }

export const WithNoHistory = Template.bind()
WithNoHistory.args = { days: [] }

function WrappedHistoryScreen({ goals, history }) {
  const store = makeStore({ goals, history }, { shouldPersist: false })
  return (
    <Router>
      <Provider store={store}>
        <HistoryScreen />
      </Provider>
    </Router>
  )
}
WrappedHistoryScreen.propTypes = {
  goals: arrayOf(GoalPropType).isRequired,
  history: arrayOf(HistoryDayStatsPropType).isRequired,
}

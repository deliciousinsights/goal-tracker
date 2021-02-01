import { number, string } from 'prop-types'
import { subDays } from 'date-fns'

import HistoryDay from './HistoryDay'
import { isoDate } from '../lib/helpers'

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
const refDate = isoDate(new Date())
const refProgresses = {
  '5bf57a79890a6e2c11ec9665': [1, 5],
  '5bf57a79890a6e2c11ec9666': [1, 2],
  '5bf57a79890a6e2c11ec9667': [1, 3],
}

const progressControl = (max) => ({ type: 'range', min: 0, max, step: 1 })

export default {
  argTypes: {
    date: { control: 'date', name: 'Date du jour' },
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
    stats: { table: { disable: true } },
    webpackProgress: {
      control: progressControl(3),
      defaultValue: 1,
      name: 'Progression Webpack',
    },
  },
  component: HistoryDay,
  title: 'History / HistoryDay',
}

const Template = ({ date, reactProgress, reduxProgress, webpackProgress }) => {
  const overrides = [reactProgress, reduxProgress, webpackProgress]
  const progresses = Object.fromEntries(
    Object.entries(refProgresses).map(([k, [p, t]], index) => [
      k,
      [p + (Number(overrides[index]) || 0), t],
    ])
  )
  return <HistoryDay goals={goals} stats={{ date, progresses }} />
}
Template.propTypes = {
  date: string.isRequired,
  reactProgress: number.isRequired,
  reduxProgress: number.isRequired,
  webpackProgress: number.isRequired,
}

export const Today = Template.bind()
Today.args = { date: refDate }

export const Yesterday = Template.bind()
Yesterday.args = { date: isoDate(subDays(new Date(), 1)) }

export const TwoDaysAgo = Template.bind()
TwoDaysAgo.args = { date: isoDate(subDays(new Date(), 2)) }
TwoDaysAgo.storyName = '2 days ago'

export const Earlier = Template.bind()
Earlier.args = { date: isoDate(subDays(new Date(), 3)) }

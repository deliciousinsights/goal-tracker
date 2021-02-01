import { number } from 'prop-types'

import HistoryDayGoal from './HistoryDayGoal'

const goal = {
  id: '5bf57a79890a6e2c11ec9665',
  name: 'Apprendre React',
  target: 5,
  units: 'pages de doc',
}

export default {
  argTypes: {
    goal: { table: { disable: true } },
    progress: {
      name: 'Progression',
      control: { type: 'range', min: 0, max: goal.target, step: 1 },
      defaultValue: 1,
    },
    stats: { table: { disable: true } },
  },
  component: HistoryDayGoal,
  title: 'History / HistoryDayGoal',
}

const Template = ({ progress }) => (
  <HistoryDayGoal goal={goal} stats={[progress, goal.target]} />
)
Template.propTypes = { progress: number.isRequired }

export const Progress1 = Template.bind()

export const ProgressMax = Template.bind()
ProgressMax.args = { progress: goal.target }

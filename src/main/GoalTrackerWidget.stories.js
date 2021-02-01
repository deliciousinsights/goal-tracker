import { func, number } from 'prop-types'

import classes from './TrackerScreen.module.css'
import GoalTrackerWidget from './GoalTrackerWidget'

const TSDecorator = (storyFn) => (
  <div className={classes.goalTracker}>{storyFn()}</div>
)

const goal = {
  id: '5bf57a79890a6e2c11ec9665',
  name: 'Apprendre React',
  target: 5,
  units: 'pages de doc',
}

export default {
  argTypes: {
    goal: { table: { disable: true } },
    onProgress: { action: 'progression', table: { disable: true } },
    progress: {
      control: { type: 'range', min: 0, max: goal.target, step: 1 },
      defaultValue: 1,
      name: 'Progression',
    },
  },
  component: GoalTrackerWidget,
  decorators: [TSDecorator],
  title: 'Main / GoalTrackerWidget',
}

const Template = ({ onProgress, progress }) => (
  <GoalTrackerWidget goal={goal} progress={progress} onProgress={onProgress} />
)
Template.propTypes = {
  onProgress: func.isRequired,
  progress: number.isRequired,
}

export const Incomplete = Template.bind()
export const Complete = Template.bind()
Complete.args = { progress: goal.target }

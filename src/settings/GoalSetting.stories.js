import { func } from 'prop-types'

import List from '@material-ui/core/List'

import GoalSetting from './GoalSetting'

const goal = {
  id: '5bf57a79890a6e2c11ec9665',
  name: 'Apprendre React',
  target: 5,
  units: 'pages de doc',
}

export default {
  argTypes: {
    onDeleteClick: { action: 'deletion request', table: { disable: true } },
    onEditClick: { action: 'edition request', table: { disable: true } },
  },
  component: GoalSetting,
  title: 'Settings / GoalSetting',
}

export const Regular = ({ onDeleteClick, onEditClick }) => (
  <List>
    <GoalSetting
      goal={goal}
      onDeleteClick={onDeleteClick}
      onEditClick={onEditClick}
    />
  </List>
)
Regular.propTypes = {
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
}

import { func } from 'prop-types'

import DeleteSettingDialog from './DeleteSettingDialog'

const goal = {
  id: '5bf57a79890a6e2c11ec9665',
  name: 'Apprendre React',
  target: 5,
  units: 'pages de doc',
}

export default {
  argTypes: {
    onCancel: { action: 'cancellation', table: { disable: true } },
    onDelete: { action: 'addition/edition', table: { disable: true } },
  },
  component: DeleteSettingDialog,
  title: 'Settings / DeleteSettingDialog',
}

export const OpenWithGoal = ({ onCancel, onDelete }) => (
  <DeleteSettingDialog
    goal={goal}
    onCancel={onCancel}
    onDelete={onDelete}
    open
  />
)
OpenWithGoal.propTypes = {
  onCancel: func.isRequired,
  onDelete: func.isRequired,
}

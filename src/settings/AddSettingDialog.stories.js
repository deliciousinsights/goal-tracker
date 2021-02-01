import AddSettingDialog from './AddSettingDialog'
import { bool, func, GoalPropType } from '../shared/prop-types'

const goal = {
  id: '5bf57a79890a6e2c11ec9665',
  name: 'Apprendre React',
  target: 5,
  units: 'pages de doc',
}
const { id, ...newGoal } = goal

export default {
  argTypes: {
    goal: { table: { disable: true } },
    onAdd: { action: 'addition/edition', table: { disable: true } },
    onCancel: { action: 'cancellation', table: { disable: true } },
    open: { control: 'boolean', defaultValue: true, name: 'Ouvert ?' },
  },
  component: AddSettingDialog,

  title: 'Settings / AddSettingDialog',
}

const Template = ({ goal, onAdd, onCancel, open }) => (
  <AddSettingDialog goal={goal} onCancel={onCancel} onAdd={onAdd} open={open} />
)
Template.propTypes = {
  goal: GoalPropType.isRequired,
  onAdd: func.isRequired,
  onCancel: func.isRequired,
  open: bool.isRequired,
}

export const AddANewGoal = Template.bind()
AddANewGoal.args = { goal: newGoal }

export const EditAnExistingGoal = Template.bind()
EditAnExistingGoal.args = { goal }

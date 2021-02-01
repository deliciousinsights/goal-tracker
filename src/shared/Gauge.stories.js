import Gauge from './Gauge'

const progressControl = (max) => ({ type: 'range', min: 0, max, step: 1 })

export default {
  argTypes: {
    max: {
      control: progressControl(100),
      defaultValue: 100,
      name: 'Maximum',
    },
    value: {
      control: progressControl(100),
      name: 'Valeur',
    },
  },
  component: Gauge,
  title: 'Shared / Gauge',
}

const Template = (args) => <Gauge {...args} />

export const EmptyUsingDefaults = Template.bind({})
EmptyUsingDefaults.storyName = 'Empty, using defaults'
EmptyUsingDefaults.args = { value: 0 }

export const FiftyUsingDefaults = Template.bind({})
FiftyUsingDefaults.storyName = '50, using defaults'
FiftyUsingDefaults.args = { value: 50 }

export const FiftyUsingCustomMax = Template.bind({})
FiftyUsingCustomMax.storyName = '50, using custom max'
FiftyUsingCustomMax.args = { value: 50, max: 75 }

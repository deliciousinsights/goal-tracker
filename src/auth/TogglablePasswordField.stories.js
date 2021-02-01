import TogglablePasswordField from './TogglablePasswordField'

export default {
  component: TogglablePasswordField,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: 'Authentication / TogglablePasswordField',
}

export const NoValue = () => <TogglablePasswordField />
export const InitialValue = () => <TogglablePasswordField value='secret' />

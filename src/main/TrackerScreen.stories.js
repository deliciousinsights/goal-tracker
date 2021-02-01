import TrackerScreen from './TrackerScreen'

export default {
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  component: TrackerScreen,
  title: 'Main / TrackerScreen',
}

export const Regular = () => <TrackerScreen />

import HomeScreen from './HomeScreen'

export default {
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  component: HomeScreen,
  title: 'Main / HomeScreen',
}

export const Regular = () => <HomeScreen />

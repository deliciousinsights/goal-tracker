import LoginScreen from './LoginScreen'

export default {
  component: LoginScreen,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: 'Authentication / LoginScreen',
}

export const Regular = () => <LoginScreen />

import { Provider } from 'react-redux'

import LoginScreen from './LoginScreen'
import { LoginStatePropType } from '../shared/prop-types'
import { makeStore } from '../store'

export default {
  component: LoginScreen,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: 'Authentication / LoginScreen',
}

export const LoggedOut = () => <WrappedLoginScreen loginState='logged-out' />
export const LoggingIn = () => <WrappedLoginScreen loginState='pending' />
export const FailedToLogIn = () => <WrappedLoginScreen loginState='failure' />

function WrappedLoginScreen({ loginState }) {
  const store = makeStore(
    { currentUser: { loginState } },
    { shouldPersist: false }
  )
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  )
}
WrappedLoginScreen.propTypes = {
  loginState: LoginStatePropType.isRequired,
}

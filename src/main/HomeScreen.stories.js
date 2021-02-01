import { Provider } from 'react-redux'

import { bool } from '../shared/prop-types'
import HomeScreen from './HomeScreen'
import { makeStore } from '../store'

const goal = {
  id: '5bf57a79890a6e2c11ec9665',
  name: 'Apprendre React',
  target: 5,
  units: 'aspects',
}

export default {
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  component: HomeScreen,
  title: 'Main / HomeScreen',
}

export const LoggedIn = () => <WrappedHomeScreen loggedIn />
export const LoggedOut = () => <WrappedHomeScreen loggedIn={false} />

function WrappedHomeScreen({ loggedIn }) {
  const store = makeStore(
    {
      currentUser: { loginState: loggedIn ? 'logged-in' : 'logged-out' },
      goals: [goal],
      todaysProgress: { [goal.id]: 2 },
    },
    { shouldPersist: false }
  )
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )
}
WrappedHomeScreen.propTypes = {
  loggedIn: bool.isRequired,
}

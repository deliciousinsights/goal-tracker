import LoginScreen from '../auth/LoginScreen'
import store from '../store'
import TrackerScreen from './TrackerScreen'

export default function HomeScreen() {
  const loggedIn = store.currentUser.loginState === 'logged-in'

  return loggedIn ? <TrackerScreen /> : <LoginScreen />
}

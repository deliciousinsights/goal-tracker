import { useSelector } from 'react-redux'

import LoginScreen from '../auth/LoginScreen'
import TrackerScreen from './TrackerScreen'

export default function HomeScreen() {
  const loggedIn = useSelector(selectLoggedIn)

  return loggedIn ? <TrackerScreen /> : <LoginScreen />
}

function selectLoggedIn(state) {
  return state.currentUser.loginState === 'logged-in'
}

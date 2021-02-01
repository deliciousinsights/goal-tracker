import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import HistoryScreen from './history/HistoryScreen'
import HomeScreen from './main/HomeScreen'
import PrivateRoute from './shared/PrivateRoute'
import RehydrationWaiter from './RehydrationWaiter'
import SettingsScreen from './settings/SettingsScreen'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <RehydrationWaiter>
          <Route exact path='/' component={HomeScreen} />
          <PrivateRoute exact path='/settings' component={SettingsScreen} />
          <PrivateRoute exact path='/history' component={HistoryScreen} />
        </RehydrationWaiter>
      </Router>
    </Provider>
  )
}

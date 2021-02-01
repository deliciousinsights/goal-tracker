import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import HistoryScreen from './history/HistoryScreen'
import HomeScreen from './main/HomeScreen'
import RehydrationWaiter from './RehydrationWaiter'
import RequireAuth from './shared/RequireAuth'
import SettingsScreen from './settings/SettingsScreen'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <RehydrationWaiter>
        <HomeScreen />
      </RehydrationWaiter>
    </Provider>
  )
}

import { Provider } from 'react-redux'

import HomeScreen from './main/HomeScreen'
import RehydrationWaiter from './RehydrationWaiter'
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

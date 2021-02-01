import { Provider } from 'react-redux'

import HomeScreen from './main/HomeScreen'
import store from './store'

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )
}

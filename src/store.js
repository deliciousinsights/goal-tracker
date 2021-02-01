import { configureStore } from '@reduxjs/toolkit'

import DEFAULT_STATE from './default-state'
import goalTrackerReducer from './reducers'

const state = process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE

export function makeStore(preloadedState = state) {
  const store = configureStore({
    preloadedState,
    reducer: goalTrackerReducer,
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(goalTrackerReducer)
    )
  }

  return store
}

const store = makeStore()

export default store

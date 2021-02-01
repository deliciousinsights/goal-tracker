import { createReducer } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist/constants'

export default createReducer({ rehydrated: false }, (builder) => {
  builder.addCase(REHYDRATE, (state) => {
    state.rehydrated = true
  })
})

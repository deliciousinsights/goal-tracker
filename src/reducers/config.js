import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist/constants'

const bootNotificationPermission =
  (typeof window !== 'undefined' && window.Notification?.permission) || 'denied'

// Action Creators
// ---------------

export const requestNotificationPermission = createAsyncThunk(
  'goal-tracker/config/requestNotificationPermission',
  async () => {
    if (bootNotificationPermission === 'denied') {
      return 'denied'
    }

    return window.Notification.requestPermission()
  }
)

// Réducteur
// ---------

export default createReducer(
  {
    canPromptForNotify: bootNotificationPermission === 'default',
    canNotify: bootNotificationPermission === 'granted',
    rehydrated: false,
  },
  (builder) => {
    builder
      .addCase(REHYDRATE, (state) => {
        state.rehydrated = true
      })
      .addCase(
        requestNotificationPermission.fulfilled,
        (state, { payload: status }) => {
          state.canPromptForNotify = status === 'default'
          state.canNotify = status === 'granted'
        }
      )
  }
)

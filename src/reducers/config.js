import { REHYDRATE } from 'redux-persist/constants'

const REQUEST_NOTIFICATION_PERMISSION =
  'goal-tracker/config/REQUEST_NOTIFICATION_PERMISSION'
const UPDATE_NOTIFICATION_PERMISSION =
  'goal-tracker/config/REQUEST_NOTIFICATION_PERMISSION_FULFILLED'

const bootNotificationPermission =
  (typeof window !== 'undefined' && window.Notification?.permission) || 'denied'

export default function reduceConfig(
  state = {
    canPromptForNotify: bootNotificationPermission === 'default',
    canNotify: bootNotificationPermission === 'granted',
    rehydrated: false,
  },
  action
) {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, rehydrated: true }
    case UPDATE_NOTIFICATION_PERMISSION:
      const status = action.payload
      return {
        ...state,
        canPromptForNotify: status === 'default',
        canNotify: status === 'granted',
      }
    default:
      return state
  }
}

export function requestNotificationPermission() {
  return {
    type: REQUEST_NOTIFICATION_PERMISSION,
    payload: promptForNotificationPermission(),
  }
}

function promptForNotificationPermission() {
  if (bootNotificationPermission === 'denied') {
    return Promise.resolve('denied')
  }

  return window.Notification.requestPermission()
}

import { REHYDRATE } from 'redux-persist/constants'

export default function reduceConfig(state = { rehydrated: false }, action) {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, rehydrated: true }
    default:
      return state
  }
}

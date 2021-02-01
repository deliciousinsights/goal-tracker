// Types d’actions
// ---------------

const PROGRESS = 'goal-tracker/todaysProgress/PROGRESS'

// Réducteur
// ---------

export default function reduceTodaysProgress(state = {}, action) {
  switch (action.type) {
    case PROGRESS: {
      const { goalId, increment } = action.payload
      const previous = state[goalId] || 0
      return { ...state, [goalId]: previous + increment }
    }

    default:
      return state
  }
}

// Action Creators
// ---------------

export function progressOnGoal(goalId, increment = 1) {
  increment = Number(increment) || 0
  return { type: PROGRESS, payload: { goalId, increment } }
}

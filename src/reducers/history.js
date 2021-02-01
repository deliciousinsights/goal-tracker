// Types d’actions
// ---------------

const CLEAR_HISTORY = 'goal-tracker/history/HISTORY_CLEAR'

// Réducteur
// ---------

export default function reduceHistory(state = [], action) {
  switch (action.type) {
    case CLEAR_HISTORY:
      return []

    default:
      return state
  }
}

// Action Creators
// ---------------

export function clearHistory() {
  return { type: CLEAR_HISTORY }
}

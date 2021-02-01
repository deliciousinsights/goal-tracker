// Types d’actions
// ---------------

const CLOSE_DAY = 'goal-tracker/closeDay/CLOSE_DAY'

// Réducteur
// ---------

export default function reduceCloseDay(state, action) {
  switch (action.type) {
    case CLOSE_DAY:
    // Votre code ici…
    default:
      return state
  }
}

// Action Creators
// ---------------

export function closeDay() {
  return { type: CLOSE_DAY }
}

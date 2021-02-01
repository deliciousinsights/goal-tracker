import { isoDate } from '../lib/helpers'

// Types d’actions
// ---------------

const CLOSE_DAY = 'goal-tracker/closeDay/CLOSE_DAY'

// Réducteur
// ---------

export default function reduceCloseDay(state, action) {
  switch (action.type) {
    case CLOSE_DAY:
      return {
        ...state,
        history: tallyPreviousDay(state),
        today: isoDate(new Date()),
        todaysProgress: {},
      }
    default:
      return state
  }
}

// Action Creators
// ---------------

export function closeDay() {
  return { type: CLOSE_DAY }
}

// Calcul de l’historisation
// -------------------------

function tallyPreviousDay({ goals, history, today, todaysProgress }) {
  const progresses = {}
  for (const { id, target } of goals) {
    const progress = todaysProgress[id] || 0
    if (progress > 0) {
      progresses[id] = [progress, target]
    }
  }

  if (Object.keys(progresses).length === 0) {
    return history
  }

  return [{ date: today, progresses }, ...history]
}

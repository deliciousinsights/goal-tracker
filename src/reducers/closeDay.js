// Fermeture de journée (reducer)
// ==============================

import { createAction, createReducer } from '@reduxjs/toolkit'

import { isoDate } from '../lib/helpers'

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Types d’actions
// ---------------

export const closeDay = createAction(
  'goal-tracker/closeDay/closeDay',
  ({ date = new Date() } = {}) => ({
    payload: { date },
  })
)

// Réducteur
// ---------

// La valeur par défaut est gérée par le meta-réducteur dans `index.js`
export default createReducer({}, (builder) => {
  builder.addCase(closeDay, (state, { payload }) => {
    state.history = tallyPreviousDay(state)
    state.today = isoDate(payload.date)
    state.todaysProgress = {}
  })
})

// Calcul de l’historisation
// -------------------------

function tallyPreviousDay({ goals, history, today, todaysProgress }) {
  const progresses = {}
  for (const { id, target } of goals) {
    const progress = todaysProgress[id] || 0
    // On n’historise que les progrès non nuls…
    if (progress > 0) {
      // On n’oublie pas de préciser la valeur cible en vigueur, des fois
      // qu’elle changerait par la suite.
      progresses[id] = [progress, target]
    }
  }

  // Inutile de créer des entrées d’historique vides (zéro progrès ce jour-là)
  if (Object.keys(progresses).length === 0) {
    return history
  }

  // À ce stade, `today` n’a pas encore été modifié, il vaut le dernier jour
  // pris en compte par l’état.  Il sert donc pour la date de l’entrée dans
  // l’historique.  On évite de modifier l'historique en place évidemment, donc
  // un *spread* plutôt qu'un `unshift`.
  return [{ date: today, progresses }, ...history]
}

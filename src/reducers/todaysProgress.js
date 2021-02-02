// Progrès du jour (reducer)
// =========================

import { createAction, createReducer } from '@reduxjs/toolkit'

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Action Creators
// ---------------

export const progressOnGoal = createAction(
  'goal-tracker/todaysProgress/progressOnGoal',
  // Pour une fois, on définit notre propre construction d'action, afin de
  // permettre une vaelur par défaut et une normalisation des données.
  ({ goalId, increment = 1 }) => ({
    payload: { goalId, increment: Number(increment) || 0 },
  })
)

// Réducteur
// ---------

// Par défaut, `todaysProgress` vaut `{}` (les clés sont les IDs des objectifs,
// les valeurs leur progrès du jour.  Ici, pas de progrès renseignés par
// défaut.)
export default createReducer({}, (builder) => {
  builder.addCase(
    progressOnGoal,
    (state, { payload: { goalId, increment } }) => {
      // Les `|| 0` sont pour les cas `undefined` (si pas de progrès renseigné
      // jusqu’ici) et `NaN` (si `increment` n’est pas convertible en nombre
      // valide).
      const previous = state[goalId] || 0
      state[goalId] = previous + increment
    }
  )
})

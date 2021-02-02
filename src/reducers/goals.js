// Objectifs (reducer)
// ===================

import { createAction, createReducer } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Action Creators
// ---------------

export const addGoal = createAction(
  'goal-tracker/goals/addGoal',
  (payload) => ({ payload: { ...payload, id: ObjectID().toHexString() } })
)
export const removeGoal = createAction('goal-tracker/goals/removeGoal')
export const updateGoal = createAction('goal-tracker/goals/updateGoal')

// Réducteur
// ---------

// Par défaut, `goals` vaut `[]` (pas d’objectifs définis)
export default createReducer([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      // Remarquez que grâce à l'enrobage automatique de nos réducteurs par
      // Immer, on peut se payer le luxe d'utiliser du code mutatif si c'est
      // plus simple, sans perdre en immuabilité réelle !
      state.push(payload)
    })
    .addCase(removeGoal, (state, { payload }) => {
      // Ici et en-dessous en revanche, l'approche immuable, à base de `filter`
      // et de `map`, est plus concise qu'une approche mutative, alors pourquoi
      // s'en priver ?
      return state.filter(({ id }) => id !== payload.id)
    })
    .addCase(updateGoal, (state, action) => {
      return state.map((goal) =>
        goal.id === action.payload.id ? action.payload : goal
      )
    })
})

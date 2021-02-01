import { createAction, createReducer } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

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

export default createReducer([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      state.push(payload)
    })
    .addCase(removeGoal, (state, { payload }) => {
      return state.filter(({ id }) => id !== payload.id)
    })
    .addCase(updateGoal, (state, action) => {
      return state.map((goal) =>
        goal.id === action.payload.id ? action.payload : goal
      )
    })
})

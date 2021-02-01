import { createAction, createReducer } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

// Action Creators
// ---------------

export const addGoal = createAction('goal-tracker/goals/addGoal')
export const removeGoal = createAction('goal-tracker/goals/removeGoal')
export const updateGoal = createAction('goal-tracker/goals/updateGoal')

// Réducteur
// ---------

export default createReducer([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      const id = ObjectID().toHexString()
      state.push({ ...payload, id })
    })
    .addCase(removeGoal, (state, { payload }) => {
      // FIXME
    })
    .addCase(updateGoal, (state, action) => {
      // FIXME
    })
})

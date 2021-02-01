// Types d’actions
// ---------------

import { createAction, createReducer } from '@reduxjs/toolkit'

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
      // FIXME
    })
    .addCase(removeGoal, (state, { payload }) => {
      // FIXME
    })
    .addCase(updateGoal, (state, { payload }) => {
      // FIXME
    })
})

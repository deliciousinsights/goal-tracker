import { createAction, createReducer } from '@reduxjs/toolkit'

// Action Creators
// ---------------

export const progressOnGoal = createAction(
  'goal-tracker/todaysProgress/progressOnGoal',
  ({ goalId, increment = 1 }) => ({
    payload: { goalId, increment: Number(increment) || 0 },
  })
)

// Réducteur
// ---------

export default createReducer({}, (builder) => {
  builder.addCase(
    progressOnGoal,
    (state, { payload: { goalId, increment } }) => {
      const previous = state[goalId] || 0
      state[goalId] = previous + increment
    }
  )
})

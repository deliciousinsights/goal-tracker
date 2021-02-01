import { createAction, createReducer } from '@reduxjs/toolkit'

// Types d’actions
// ---------------

export const closeDay = createAction('goal-tracker/closeDay/closeDay')

// Réducteur
// ---------

export default createReducer({}, (builder) => {
  builder.addCase(closeDay, (state, action) => {
    // FIXME
  })
})

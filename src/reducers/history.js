// Historique (reducer)
// ====================

import { createAction, createReducer } from '@reduxjs/toolkit'

// Action Creators
// ---------------

export const clearHistory = createAction('goal-tracker/history/clearHistory')

// Réducteur
// ---------

export default createReducer([], (builder) => {
  builder.addCase(clearHistory, () => [])
})

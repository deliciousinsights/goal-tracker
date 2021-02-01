import { createAction, createReducer } from '@reduxjs/toolkit'

// Action Creators
// ---------------

export const logIn = createAction('goal-tracker/currentUser/login')
export const logOut = createAction('goal-tracker/currentUser/logOut')

// Réducteur
// ---------

export default createReducer({ loginState: 'logged-out' }, (builder) => {
  builder
    .addCase(logIn, (state, { payload: { email } }) => ({
      loginState: 'logged-in',
      email,
    }))
    .addCase(logOut, () => ({ loginState: 'logged-out' }))
})

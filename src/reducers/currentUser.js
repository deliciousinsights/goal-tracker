import { createAction, createReducer } from '@reduxjs/toolkit'

// Action Creators
// ---------------

export function logIn({ email, password }) {
  // FIXME: Update this!
  return { type: logInStart }
}

export const logInStart = createAction('goal-tracker/currentUser/logInStart')
export const logInSuccess = createAction(
  'goal-tracker/currentUser/logInSuccess'
)
export const logInFailure = createAction(
  'goal-tracker/currentUser/logInFailure'
)
export const logOut = createAction('goal-tracker/currentUser/logOut')

// Réducteur
// ---------

export default createReducer({ loginState: 'logged-out' }, (builder) => {
  builder
    .addCase(logInStart, () => ({ loginState: 'pending' }))
    .addCase(logInFailure, () => ({ loginState: 'failure' }))
    .addCase(logInSuccess, (state, { payload: { email } }) => ({
      loginState: 'logged-in',
      email,
    }))
    .addCase(logOut, () => ({ loginState: 'logged-out' }))
})

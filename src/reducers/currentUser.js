// Types d’actions
// ---------------

const LOGIN = 'goal-tracker/currentUser/AUTH_LOGIN'
const LOGOUT = 'goal-tracker/currentUser/AUTH_LOGOUT'

// Réducteur
// ---------

export default function reduceCurrentUser(
  state = { loginState: 'logged-out' },
  action
) {
  switch (action.type) {
    case LOGIN:
      return { loginState: 'logged-in', email: action.payload.email }

    case LOGOUT:
      return { loginState: 'logged-out' }

    default:
      return state
  }
}

// Action Creators
// ---------------

export function logIn(email, password) {
  return { type: LOGIN, payload: { email, password } }
}

export function logOut() {
  return { type: LOGOUT }
}

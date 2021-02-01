// Types d’actions
// ---------------

const LOGIN = 'goal-tracker/currentUser/AUTH_LOGIN'
const LOGOUT = 'goal-tracker/currentUser/AUTH_LOGOUT'

// Réducteur
// ---------

export default function reduceCurrentUser(state = null, action) {
  switch (action.type) {
    case LOGIN:
    // Votre code ici

    case LOGOUT:
    // Votre code ici

    default:
      return state
  }
}

// Action Creators
// ---------------

export function logIn(email, password) {
  // Votre code ici
}

export function logOut() {
  // Votre code ici
}

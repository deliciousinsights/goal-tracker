// Utilisateur courant (reducer)
// =============================

import { createAction, createReducer } from '@reduxjs/toolkit'

// Action Creators
// ---------------

// Et voici un *action creator* **asynchrone** !  Cette action de login se fera
// sur notre serveur de dev, via une requête Fetch, et ne peut donc se contenter
// de renvoyer un objet action inerte, seule chose pourtant que Redux permet de
// base…
//
// Il existe de [très nombreuses
// manières](https://github.com/markerikson/redux-ecosystem-links/blob/master/middleware-async.md)
// de faire de l’asynchrone avec Redux.  Ici, comme nous voulons illustrer des
// appels API et la capacité à résister à une interruption de connectivité au
// serveur, nous avons choisi le très sympathique module
// [redux-offline](https://github.com/redux-offline/redux-offline), lui-même une
// surcouche de l’excellent
// [redux-persist](https://github.com/rt2zz/redux-persist). Lorsque ce module
// est mis en place (voir [la configuration du *store*](./store.html)), on peut
// décorer des actions avec un champ `meta.offline`, lequel peut contenir des
// propriétés `effect` (qui décrit, par défaut, un appel API), `commit` (action
// à *dispatcher* en cas de réponse réseau à succès, donc codes 2xx) et
// `rollback` (action à *dispatcher* en cas de réponse réseau sans succès, donc
// codes de réponse autres, ex. 401).
//
// On a ici une action dite *pessimiste* : on doit la considérer échouée jusqu’à
// preuve du contraire (c’est un login, après tout).  On finalise donc le login
// via l’action `loginSuccess`, dans le descripteur `commit`.  Le descripteur
// `rollback` déclenche une `loginFailure` qui permettra d’afficher une
// *snackbar* d’erreur dans l’écran de connexion.
export function logIn({ email, password }) {
  return {
    type: logInStart.toString(),
    meta: {
      offline: {
        effect: {
          json: { email, password },
          method: 'POST',
          url: `http://${window.location.hostname}:3001/api/v1/sessions`,
        },
        commit: { type: logInSuccess.toString() },
        rollback: { type: logInFailure.toString() },
      },
    },
  }
}

// Notez que ces actions synchrones « d’étapes » pour le login (asynchrone) sont
// exportées juste histoire de pouvoir les traiter dans les tests du réducteur
// associé.  Notre code « de production » pourrait se passer des exports.
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

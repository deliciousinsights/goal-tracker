// Utilisateur courant (reducer)
// =============================

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Types d’actions
// ---------------

// Pour les actions asynchrones, on découpe en général en trois actions
// synchrone : lancement, réussite, échec.
const LOGIN_FAILURE = 'goal-tracker/currentUser/AUTH_LOGIN_FAILURE'
const LOGIN_START = 'goal-tracker/currentUser/AUTH_LOGIN_START'
const LOGIN_SUCCESS = 'goal-tracker/currentUser/AUTH_LOGIN_SUCCESS'
const LOGOUT = 'goal-tracker/currentUser/AUTH_LOGOUT'

// Réducteur
// ---------

// Par défaut, on n’est pas identifiés…
export default function reduceCurrentUser(
  state = { loginState: 'logged-out' },
  action
) {
  switch (action.type) {
    // Connexion
    // ---------
    //
    // L’action de login est asynchrone, nous la transformons en trois actions
    // synchrones au fil du temps : démarrage, succès ou erreur.  Vous trouverez
    // le code qui orchestre ça dans la fonction `logIn` de
    // [action-creators.js](../action-creators.html).
    case LOGIN_START:
      return { loginState: 'pending' }

    case LOGIN_FAILURE:
      return { loginState: 'failure' }

    case LOGIN_SUCCESS: {
      const { email } = action.payload
      return { loginState: 'logged-in', email }
    }

    // Déconnexion
    // -----------
    case LOGOUT:
      // Déconnexion = retour au contenu adapté
      return { loginState: 'logged-out' }

    default:
      // Rappel : un *reducer* doit **toujours** renvoyer l’état sans
      // modification si l’action n’est pas applicable.
      return state
  }
}

// Action Creators
// ---------------

// Et voici un *action creator* **asynchrone** !  Cette action de login se fera
// sur notre serveur de dev, via une requête Ajax, et ne peut donc se contenter
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
// via l’action `LOGIN_SUCCESS`, dans le descripteur `commit`.  Le descripteur
// `rollback` déclenche une `LOGIN_FAILURE` qui permettra d’afficher une
// *snackbar* d’erreur dans l’écran de connexion.
export function logIn(email, password) {
  return {
    type: LOGIN_START,
    meta: {
      offline: {
        effect: {
          json: { email, password },
          method: 'POST',
          url: 'http://localhost:3001/api/v1/sessions',
        },
        commit: { type: LOGIN_SUCCESS, payload: { email } },
        rollback: { type: LOGIN_FAILURE },
      },
    },
  }
}

// Notez que ces actions synchrones « d’étapes » pour le login (asynchrone) sont
// exportées juste histoire de pouvoir les traiter dans les tests du réducteur
// associé.  Notre code « de production » pourrait se passer des exports.
export function logInFailure() {
  return { type: LOGIN_FAILURE }
}

export function logInStart() {
  return { type: LOGIN_START }
}

export function logInSuccess(email) {
  return { type: LOGIN_SUCCESS, payload: { email } }
}

export function logOut() {
  return { type: LOGOUT }
}

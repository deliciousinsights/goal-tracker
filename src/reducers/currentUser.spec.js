// Utilisateur courant (tests)
// ===========================

import reducer, {
  logInFailure,
  logInStart,
  logInSuccess,
  logOut,
} from './currentUser'

// Le *reducer* est censé…
describe('Current User reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = { loginState: 'logged-out' }

    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple
    // consiste à envoyer un état `undefined` et une action vide, et à vérifier
    // le résultat (ici, un état non connecté).
    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  // …gérer la connexion
  // -------------------
  it('should handle login steps', () => {
    // Toujours pareil :
    //
    // 1) On définit l’état initial et les constituants de l'action
    const initialState = { loginState: 'logged-out' }
    const email = 'john@example.com'

    // 2) On appelle le *reducer* avec un état préalable approprié
    //    (`initialState`) et l'action **créée par le creator** (ce qui fait une
    //    sorte de test combiné du *action creator*).  Et on vérifie le segment
    //    d'état obtenu en retour.
    expect(reducer(initialState, logInStart())).toEqual({
      loginState: 'pending',
    })

    expect(reducer(initialState, logInSuccess({ email }))).toEqual({
      loginState: 'logged-in',
      email,
    })

    expect(reducer(initialState, logInFailure())).toEqual({
      loginState: 'failure',
    })
  })

  // …gérer la déconnexion
  // ---------------------
  it('should handle logout', () => {
    // On prend un état opposé (connecté) et on vérifit le résultat, donc un
    // état non connecté.
    const initialState = { loginState: 'logged-in', email: 'john@example.com' }
    const expectedState = { loginState: 'logged-out' }

    expect(reducer(initialState, logOut())).toEqual(expectedState)
  })

  // Remarquez qu'on pourrait aussi, par acquis de conscience, tester que pour
  // toute action non gérée, l'état est préservé.  À vous de jouer ?
})

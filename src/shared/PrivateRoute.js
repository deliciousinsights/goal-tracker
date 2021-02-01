// Enrobeur de route authentifiée
// ==============================
//
// Permet de définir des routes exigeant que l’utilisateur soit logué.  En
// pratique, définit une route classique amenant sur un HOC connecté au *store*
// Redux et vérifiant l’état de l’authentification.  Si l’utilisateur est
// connecté, on *render* le composant normalement, sinon on utilise un
// `<Redirect />` pour ramener à l’écran de connexion.

import React from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { elementType } from './prop-types'

export default function PrivateRoute({ component, ...delegated }) {
  return (
    <Route
      {...delegated}
      render={(props) => <PrivateComponent component={component} {...props} />}
    />
  )
}

PrivateRoute.propTypes = {
  component: elementType.isRequired,
}

function PrivateComponent({ component: Component, ...props }) {
  const loggedIn = useSelector(selectLoggedIn)
  const history = useHistory()

  if (loggedIn) {
    return <Component {...props} />
  }

  // Si on résulte d’une nav interactive une fois l’appli rendue côté client,
  // `history.action` vaut `PUSH` : une interdiction devrait donc faire l’objet
  // d’un ajout d’URL dans l’historique (vers le login), et non un remplacement
  // de l’URL précédente.  En revanche, lors d’un rendu initial sur navigation
  // classique du browser, `history.action` sera autre (normalement `POP`), et
  // de fait, on devrait éviter une étape d’historique intermédiaire.
  const shouldPush = history.action === 'PUSH'

  return <Redirect push={shouldPush} to='/' />
}
PrivateComponent.propTypes = {
  component: elementType.isRequired,
}

const selectLoggedIn = (state) => state.currentUser.loginState === 'logged-in'

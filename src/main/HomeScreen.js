// Écran principal
// ===============

import { useSelector } from 'react-redux'

import LoginScreen from '../auth/LoginScreen'
import TrackerScreen from './TrackerScreen'

export default function HomeScreen() {
  // Récupération des infos qui nous intéressent depuis l’état global applicatif
  // géré par Redux. En l’occurrence, seul `currentUser.loginState` nous
  // intéresse.  La fonction `selectLoggedIn`, qui va chercher cette info, est
  // plus bas dans le fichier.
  const loggedIn = useSelector(selectLoggedIn)
  // Si on a un compte “connecté”, notre URL (la racine) affiche l’écran de
  // suivi des objectifs.  Sinon, on affiche l’écran de connexion.
  return loggedIn ? <TrackerScreen /> : <LoginScreen />
}

// Fonction de sélection des valeurs utiles au composant au sein de l’état
// global applicatif géré par Redux.  L’argument est l’état global applicatif
// dans son intégralité, la valeur de retour sera celle renvoyée par le
// [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) auquel on
// aura passé cette fonction.
function selectLoggedIn(state) {
  return state.currentUser.loginState === 'logged-in'
}

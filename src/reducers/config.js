// Configuration "système" de l'appli
// ==================================
//
// En écoutant l'action de réhydratation de redux-persist, nous pouvons
// maintenir un drapeau la signifiant, ce qui permettra à notre petit composant
// `RehydrationWaiter` de retenir le rendu initial jusqu'à ce moment-là.
//
// On traite également ici les permissions de notification, tant leur état
// initial (et la dispo de l'API) que la demande ultérieure de la permission,
// dans une action asynchrone générique représentée par une promesse, traitée
// grâce au middleware Redux approprié.

import { REHYDRATE } from 'redux-persist/constants'

// Il s'agit en fait d'un préfixe de type ; le middleware Redux utilisé
// dispatchera trois actions potentielles basées sur ce préfixe, avec les
// suffixes `_PENDING`, `_FULFILLED` ou `_REJECTED`.  On n'utilisera en pratique
// que le cas de succès.
const REQUEST_NOTIFICATION_PERMISSION =
  'goal-tracker/config/REQUEST_NOTIFICATION_PERMISSION'
const UPDATE_NOTIFICATION_PERMISSION =
  'goal-tracker/config/REQUEST_NOTIFICATION_PERMISSION_FULFILLED'

const bootNotificationPermission =
  (typeof window !== 'undefined' && window.Notification?.permission) || 'denied'

export default function reduceConfig(
  state = {
    // - Est-il pertinent de solliciter l'utilisateur ?
    canPromptForNotify: bootNotificationPermission === 'default',
    // - Dispose-t-on de la permission de notifier ?
    canNotify: bootNotificationPermission === 'granted',
    // - L'état a-t-il été réhydraté par Redux-Persist ?
    rehydrated: false,
  },
  action
) {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, rehydrated: true }
    case UPDATE_NOTIFICATION_PERMISSION:
      const status = action.payload
      return {
        ...state,
        canPromptForNotify: status === 'default',
        canNotify: status === 'granted',
      }
    default:
      return state
  }
}

// Dispatché par l'UI, déclenche la demande de permission.  Chromium n'exige pas
// pour le moment que ces demandes soient faites au sein d'une interaction
// utilisateur, mais Firefox si.
export function requestNotificationPermission() {
  return {
    type: REQUEST_NOTIFICATION_PERMISSION,
    // Le payload peut être une promesse grâce à l'injection d'un middleware
    // approprié à la construction du store Redux.  Voir `store.js` et son
    // `makeStore(…)`.
    payload: promptForNotificationPermission(),
  }
}

// Le recours aux
// [notifications](https://developer.mozilla.org/fr/docs/Web/API/notification/Using_Web_Notifications)
// “système” n’est pas automatiquement possible : l’utilisateur doit nous
// l’avoir accordé.  Cette fonction renvoie une promesse vers le statut
// résultant, utilisée suite à l'action de demande de permission.
function promptForNotificationPermission() {
  if (bootNotificationPermission === 'denied') {
    return Promise.resolve('denied')
  }

  return window.Notification.requestPermission()
}

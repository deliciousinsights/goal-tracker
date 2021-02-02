// Historique (reducer)
// ====================

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Types d’actions
// ---------------

const CLEAR_HISTORY = 'goal-tracker/history/HISTORY_CLEAR'

// Réducteur
// ---------

// Par défaut, `history` vaut `[]` (pas d’historique)
export default function reduceHistory(state = [], action) {
  switch (action.type) {
    // Nettoyage de l’historique
    // -------------------------
    case CLEAR_HISTORY:
      // Facile : on remet à vide.
      return []

    default:
      // Rappel : un *reducer* doit **toujours** renvoyer l’état sans
      // modification si l’action n’est pas applicable.
      return state
  }
}

// Action Creators
// ---------------

export function clearHistory() {
  return { type: CLEAR_HISTORY }
}

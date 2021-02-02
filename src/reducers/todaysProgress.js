// Progrès du jour (reducer)
// =========================

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Types d’actions
// ---------------

const PROGRESS = 'goal-tracker/todaysProgress/PROGRESS'

// Réducteur
// ---------

// Par défaut, `todaysProgress` vaut `{}` (les clés sont les IDs des objectifs,
// les valeurs leur progrès du jour.  Ici, pas de progrès renseignés par
// défaut.)
export default function reduceTodaysProgress(state = {}, action) {
  switch (action.type) {
    // Progression d’un objectif
    // -------------------------
    case PROGRESS: {
      // Les `|| 0` sont pour les cas `undefined` (si pas de progrès renseigné
      // jusqu’ici) et `NaN` (si `increment` n’est pas convertible en nombre
      // valide).
      const { goalId, increment } = action.payload
      const previous = state[goalId] || 0
      // Notez la propriété calculée, dont le nom reprend l'ID de l’objectif !
      return { ...state, [goalId]: previous + increment }
    }

    default:
      // Rappel : un *reducer* doit **toujours** renvoyer l’état sans
      // modification si l’action n’est pas applicable.
      return state
  }
}

// Action Creators
// ---------------

export function progressOnGoal(goalId, increment = 1) {
  increment = Number(increment) || 0
  return { type: PROGRESS, payload: { goalId, increment } }
}

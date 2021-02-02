// Date courante (reducer)
// =======================

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

import { isoDate } from '../lib/helpers'

// On ne change rien, à part fournir la valeur par défaut.  Ce réducteur est
// nécessaire parce que le `combineReducers(…)` de Redux exige une réducteur par
// champ constaté dans l’état.
export default function today(state = isoDate(new Date()), action) {
  return state
}

// Reducer combiné global
// ======================

import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

import config from './config'
import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import reduceCloseDay from './closeDay'
import today from './today'
import todaysProgress from './todaysProgress'

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Selon la [meilleure pratique
// Redux](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic),
// nous avons réalisé indépendamment les *reducers* des diverses parties de
// l’état.  On va utiliser
// [`combineReducers`](https://redux.js.org/api/combinereducers) pour les
// recombiner en un seul, qui délèguera automatiquement aux nôtres, champ par
// champ.
//
// Toutefois, une action (`CLOSE_DAY`) impacte plusieurs champs (en
// l’occurrence, `todaysProgress` et `history`), de sorte que nous allons la
// traiter dans un reducer *top-level* dédié (`closeDay`).

// On crée le reducer consolidé…
const coreReducer = combineReducers({
  // … basé sur nos reducers individuels pour chaque partie…
  config,
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

// Ensuite, on définit le reducer final exporté par ce module, qui sera donc
// celui exploité par le *store* Redux, afin de traiter les actions
// multi-champs.
const goalTrackerReducer = reduceReducers(coreReducer, reduceCloseDay)

/*
Parmi les autres options d'implémentation, on aurait pu avoir…

## La version hard-codée naïve

```js
function goalTrackerReducer(state, action) {
  state = coreReducer(state, action)
  state = closeDay(state, action)
  return state
}
```

## La version déjà plus générique

```js
function goalTrackerReducer(state, action) {
  for (const reducer of [coreReducer, closeDay]) {
    state = reducer(state, action)
  }
  return state
}
```

## Le `reduce` justifié

```js
function goalTrackerReducer(state, action) {
  return [coreReducer, closeDay].reduce(
    (prev, reducer) => reducer(prev, action),
    state
  )
}
```
*/

export default goalTrackerReducer

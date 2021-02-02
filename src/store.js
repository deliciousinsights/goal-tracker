// État applicatif
// ===============

import { configureStore } from '@reduxjs/toolkit'
import { offline } from '@redux-offline/redux-offline'

import DEFAULT_STATE from './default-state'
import goalTrackerReducer from './reducers'

// Définition de l'état par défaut (hors hydratation).  En production, on
// partira sur un état vide, tous les réducteurs de tranches Redux posant alors
// leurs valeurs par défaut granulaires.
//
// L'import statique de `DEFAULT_STATE`, plutôt qu'un import dynamique, peut
// sembler ajouter du poids au bundle, mais en réalité c'est préférable : non
// seulemment le ternaire ci-dessous va s'inliner en `{}` dans un build de
// production, entraînant *de facto* la purge de l'import lors de l'élimination
// de code mort, mais en prime il évite un *code splitting* superflu en
// développement.
const state = process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE

// Cet export nous permet de construire facilement un *store* selon nos besoins
// (et notamment un état initial précis), par exemple lors des tests ou dans
// Storybook.
export function makeStore(
  preloadedState = state,
  { shouldPersist = process.env.NODE_ENV !== 'test' } = {}
) {
  const store = configureStore({
    preloadedState,
    reducer: goalTrackerReducer,
    // Le typage de redux-offline n'est pas au cordeau, un affinage par
    // annotation de type est nécessaire.
    enhancers: shouldPersist ? [offline({})] : [],
  })

  // Gestion du HMR sur les réducteurs pendant le développement.
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(goalTrackerReducer)
    )
  }

  return store
}

// Création de l'état par défaut (pour le dev et la prod principalement, les tests
// et Storybook créeraient les leurs sur-mesure selon leurs besoins.)

const store = makeStore()

// Le store pour le dev / la prod est l'export par défaut.

export default store

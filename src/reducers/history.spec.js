// Historique (tests)
// ==================

import reducer, { clearHistory } from './history'

// Le *reducer* est censé…
describe('History reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = []

    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple
    // consiste à envoyer un état `undefined` et une action vide, et à vérifier
    // le résultat (ici, un historique vide).
    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  // …gérer l’effacement
  // -------------------
  it('should handle clearing', () => {
    const initialState = [{}, {}, {}]
    const expectedState = []

    expect(reducer(initialState, clearHistory())).toEqual(expectedState)
  })
})

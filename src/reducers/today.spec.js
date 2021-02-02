// Date du jour (tests)
// ====================

import { isoDate } from '../lib/helpers'
import reducer from './today'

// Le *reducer* est censé…
describe('Today’s date reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = isoDate(new Date())

    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple
    // consiste à envoyer un état `undefined` et une action vide, et à vérifier
    // le résultat (ici, la date du jour).
    expect(reducer(initialState, {})).toBe(expectedState)
  })
})

// Objectifs (tests)
// =================

import reducer, { addGoal, removeGoal, updateGoal } from './goals'

// Le *reducer* est censé…
describe('Goals reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = []

    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple
    // consiste à envoyer un état `undefined` et une action vide, et à vérifier
    // le résultat (ici un tableau vide, donc `[]`).
    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  // …gérer l’ajout d’objectif
  // -------------------------
  it('should handle goal addition', () => {
    const newGoal = {
      name: 'Test reducers',
      target: 42,
      units: 'tests',
    }
    const initialState = undefined
    // Primo, vérifier l'ajout initial (premier élément)
    const goals = reducer(initialState, addGoal(newGoal))

    const REGEX_BSONID = /^[0-9a-f]{24}$/

    // Est-il bien là ?
    expect(goals).toHaveLength(1)
    // A-t-il une bonne tête ?
    expect(goals[0]).toEqual({
      ...newGoal,
      id: expect.stringMatching(REGEX_BSONID),
    })

    // Un ajout supplémentaire préserve-t-il les objectifs existants ?
    const nextGoals = reducer(goals, addGoal(newGoal))

    expect(nextGoals).toHaveLength(2)
    expect(nextGoals[0]).toEqual(goals[0])

    // Les IDs produits sont-ils alors bien uniques ?
    expect(nextGoals[1]).toHaveProperty(
      'id',
      expect.stringMatching(REGEX_BSONID)
    )
    expect(nextGoals[1].id).not.toBe(nextGoals[0].id)
  })

  // …gérer le retrait d’objectif
  // ----------------------------
  it('should handle goal removal', () => {
    // On part d’un état initial d’au moins 3, pour bien vérifier le
    // comportement de retrait.
    const initialState = [{ id: 0 }, { id: 1 }, { id: 2 }]
    // L’état attendu n’aura plus son élément central.
    const expectedState = [{ id: 0 }, { id: 2 }]

    // Le retrait d’un objectif présent marche-t-il bien ?
    expect(reducer(initialState, removeGoal({ id: 1 }))).toEqual(expectedState)

    // Le retrait d’un objectif manquant préserve-t-il bien l'état ?
    expect(reducer(initialState, removeGoal({ id: 42 }))).toEqual(initialState)
  })

  // …gérer la mise à jour d’un objectif présent
  // -------------------------------------------
  it('should handle goal update (when in goals)', () => {
    const goalUpdate = {
      id: 0,
      name: 'Test reducer 3',
      target: 42,
      units: 'wombats',
    }
    // On part d’un état initial d’au moins 2, pour bien vérifier qu’on ne
    // touche pas au reste.
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' },
    ]
    // État attendu distinct de l'original, évidemment.
    const expectedState = [goalUpdate, initialState[1]]

    // Simple comparaison de tableaux.
    expect(reducer(initialState, updateGoal(goalUpdate))).toEqual(expectedState)
  })
})

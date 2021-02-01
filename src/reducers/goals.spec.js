import reducer, { addGoal, removeGoal, updateGoal } from './goals'

describe('Goals reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = []

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle goal addition', () => {
    const newGoal = {
      name: 'Test reducers',
      target: 42,
      units: 'tests',
    }
    const initialState = undefined
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

  it('should handle goal removal', () => {
    const initialState = [{ id: 0 }, { id: 1 }, { id: 2 }]
    const expectedState = [{ id: 0 }, { id: 2 }]

    // Le retrait d’un objectif présent marche-t-il bien ?
    expect(reducer(initialState, removeGoal({ id: 1 }))).toEqual(expectedState)

    // Le retrait d’un objectif manquant préserve-t-il bien l'état ?
    expect(reducer(initialState, removeGoal({ id: 42 }))).toEqual(initialState)
  })

  it('should handle goal update (when in goals)', () => {
    const goalUpdate = {
      id: 0,
      name: 'Test reducer 3',
      target: 42,
      units: 'wombats',
    }
    const initialState = [
      { id: 0, name: 'Test reducer 1', target: 10, units: 'tests' },
      { id: 1, name: 'Test reducer 2', target: 5, units: 'tests' },
    ]
    const expectedState = [goalUpdate, initialState[1]]

    expect(reducer(initialState, updateGoal(goalUpdate))).toEqual(expectedState)
  })
})

import reducer, { addGoal, removeGoal, updateGoal } from './goals'

describe('Goals reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = []

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it.todo('should handle goal addition')

  it.todo('should handle goal removal')

  it.todo('should handle goal update (when in goals)')
})

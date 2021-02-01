import reducer, { logIn, logOut } from './currentUser'

describe('Current User reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = { loginState: 'logged-out' }

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle login', () => {
    const email = 'john@example.com'
    const initialState = { loginState: 'logged-out' }
    const expectedState = { loginState: 'logged-in', email }

    expect(
      reducer(initialState, logIn({ email, password: 'no fate' }))
    ).toEqual(expectedState)
  })

  it('should handle logout', () => {
    const initialState = { loginState: 'logged-in', email: 'john@example.com' }
    const expectedState = { loginState: 'logged-out' }

    expect(reducer(initialState, logOut())).toEqual(expectedState)
  })
})

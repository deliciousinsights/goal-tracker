import reducer, {
  logInFailure,
  logInStart,
  logInSuccess,
  logOut,
} from './currentUser'

describe('Current User reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = { loginState: 'logged-out' }

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle login steps', () => {
    const initialState = { loginState: 'logged-out' }
    const email = 'john@example.com'

    expect(reducer(initialState, logInStart())).toEqual({
      loginState: 'pending',
    })

    expect(reducer(initialState, logInSuccess({ email }))).toEqual({
      loginState: 'logged-in',
      email,
    })

    expect(reducer(initialState, logInFailure())).toEqual({
      loginState: 'failure',
    })
  })

  it('should handle logout', () => {
    const initialState = { loginState: 'logged-in', email: 'john@example.com' }
    const expectedState = { loginState: 'logged-out' }

    expect(reducer(initialState, logOut())).toEqual(expectedState)
  })
})

import {
  and,
  between,
  integer,
  keysOf,
  nonNegativeInteger,
} from 'airbnb-prop-types'
import {
  arrayOf,
  bool,
  exact,
  func,
  node,
  objectOf,
  oneOf,
  string,
} from 'prop-types'

export { arrayOf, bool, exact, func, node, nonNegativeInteger, string }

export const positiveInteger = and([integer(), between({ gt: 0 })])

export const GoalPropType = exact({
  id: string.isRequired,
  name: string.isRequired,
  target: positiveInteger.isRequired,
  units: string.isRequired,
})

export const LoginStatePropType = oneOf([
  'logged-out',
  'pending',
  'logged-in',
  'failure',
])

export const TodaysProgressPropType = and([
  keysOf(string),
  objectOf(nonNegativeInteger),
])

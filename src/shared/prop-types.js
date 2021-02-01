import {
  and,
  between,
  integer,
  keysOf,
  nonNegativeInteger,
} from 'airbnb-prop-types'
import { arrayOf, bool, exact, func, node, objectOf, string } from 'prop-types'

export { arrayOf, bool, exact, func, node, nonNegativeInteger, string }

export const positiveInteger = and([integer(), between({ gt: 0 })])

export const GoalPropType = exact({
  id: string.isRequired,
  name: string.isRequired,
  target: positiveInteger.isRequired,
  units: string.isRequired,
})

function requiredHistoryDayProgressesPropType(props, propName, componentName) {
  const prefix = `${propName} in ${componentName} must`
  const value = props[propName]

  if (!Array.isArray(value)) {
    return new Error(`${prefix} be an array.`)
  }

  if (value.length !== 2 || !value.every(Number.isInteger)) {
    return new Error(`${prefix} be a pair of integers.`)
  }

  const [progress, target] = value
  if (progress < 0) {
    return new Error(`${prefix} start with a non-negative progress value.`)
  }

  if (target <= 0) {
    return new Error(`${prefix} end with a positive target value.`)
  }

  return null
}

export function HistoryDayProgressesPropType(props, propName, componentName) {
  const value = props[propName]

  if (value == null) {
    return null
  }

  return requiredHistoryDayProgressesPropType(props, propName, componentName)
}

HistoryDayProgressesPropType.isRequired = requiredHistoryDayProgressesPropType

export const HistoryDayStatsPropType = exact({
  date: string.isRequired,
  progresses: and([keysOf(string), objectOf(HistoryDayProgressesPropType)])
    .isRequired,
})

import { isoDate } from '../lib/helpers'

export default function today(state = isoDate(new Date()), action) {
  return state
}

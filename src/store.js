import DEFAULT_STATE from './default-state'

const state = process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE

export default state

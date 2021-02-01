// Store-level (spec reducer)
// ==========================

import { subDays } from 'date-fns'

import { closeDay } from './closeDay'
import { isoDate } from '../lib/helpers'
import reducer from './index'

// Le *reducer* est censé…
describe('Store-level reducer', () => {
  // …correctement déléguer l’état par défaut
  // ----------------------------------------
  //
  // On vérifie qu’îl délègue bien à ses *slice reducers* combinés
  // leurs définitions d’état par défaut (on suppose, en tout cas,
  // qu’il procède ainsi pour pondre un état par défaut complet).
  it('should properly accrue its initial state', () => {
    const initialState = undefined
    const expectedState = {
      config: {
        canNotify: false,
        canPromptForNotify: false,
        rehydrated: false,
      },
      currentUser: { loginState: 'logged-out' },
      goals: [],
      history: [],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle day closing', () => {
    const initialState = {
      config: {
        canNotify: false,
        canPromptForNotify: false,
        rehydrated: false,
      },
      currentUser: { loginState: 'logged-out' },
      goals: [
        { id: 1, target: 42 },
        { id: 2, target: 21 },
      ],
      history: [
        {
          date: isoDate(subDays(new Date(), 2)),
          progresses: { 1: [15, 42] },
        },
      ],
      today: isoDate(subDays(new Date(), 1)),
      todaysProgress: { 1: 10 },
    }
    const expectedState = {
      config: {
        canNotify: false,
        canPromptForNotify: false,
        rehydrated: false,
      },
      currentUser: initialState.currentUser,
      goals: initialState.goals,
      history: [
        { date: initialState.today, progresses: { 1: [10, 42] } },
        ...initialState.history,
      ],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, closeDay())).toEqual(expectedState)
  })
})

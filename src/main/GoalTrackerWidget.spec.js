import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GoalTrackerWidget from './GoalTrackerWidget'

describe('<GoalTrackerWidget />', () => {
  describe('when not completed', () => {
    it.todo('should render appropriately')

    it.todo('should trigger its onProgress on click')

    it.todo('should otherwise match the expected snapshot')
  })

  describe('when completed (or exceeded)', () => {
    it.todo('should render appropriately')

    it.todo('should otherwise match the expected snapshot')
  })
})

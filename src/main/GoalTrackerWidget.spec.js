import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GoalTrackerWidget from './GoalTrackerWidget'

describe('<GoalTrackerWidget />', () => {
  const goal = {
    id: '0123456789abcdef01234567',
    name: 'My goal',
    target: 42,
    units: 'wombats',
  }
  describe('when not completed', () => {
    it.each`
      progress | percentage
      ${0}     | ${0}
      ${1}     | ${2}
      ${21}    | ${50}
      ${41}    | ${98}
    `(
      'should render appropriately at progress $progress',
      ({ progress, percentage }) => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)
        expect(screen.getByRole('heading')).toHaveTextContent(goal.name)
        expect(screen.getByRole('progressbar')).toHaveAttribute(
          'aria-valuenow',
          String(percentage)
        )
        expect(
          screen.getByText(`${progress} ${goal.units} sur ${goal.target}`)
        ).toBeInTheDocument()

        expect(screen.getByTestId('in-progress')).toBeInTheDocument()
      }
    )

    it.todo('should trigger its onProgress on click')

    it.todo('should otherwise match the expected snapshot')
  })

  describe('when completed (or exceeded)', () => {
    it.todo('should render appropriately')

    it.todo('should otherwise match the expected snapshot')
  })
})

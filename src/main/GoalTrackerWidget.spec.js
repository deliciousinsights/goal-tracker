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

    it('should trigger its onProgress on click', async () => {
      const progress = 21
      const onProgress = jest.fn()
      render(
        <GoalTrackerWidget
          goal={goal}
          onProgress={onProgress}
          progress={progress}
        />
      )

      await userEvent.click(screen.getByRole('button'))
      expect(onProgress).toHaveBeenCalledTimes(1)
      expect(onProgress).toHaveBeenCalledWith(goal)
    })

    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={21} />
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('when completed (or exceeded)', () => {
    it.each([goal.target, goal.target + 1, goal.target + 10])(
      'should render appropriately at progress %i',
      (progress) => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)

        expect(screen.queryByTestId('in-progress')).not.toBeInTheDocument()
        expect(screen.getByTestId('completed')).toBeInTheDocument()
      }
    )

    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={42} />
      )

      expect(container).toMatchSnapshot()
    })
  })
})

import { render } from '@testing-library/react'

import HistoryDayGoal from './HistoryDayGoal'

describe('<HistoryDayGoal />', () => {
  const goal = { id: 'abcd', name: 'Demo goal', target: 5, units: 'wombats' }

  it('should use proper stats propTypes', () => {
    checkFailPropType('stats in HistoryDayGoal must be an array.', () => (
      <HistoryDayGoal goal={goal} />
    ))
    checkFailPropType(
      'stats in HistoryDayGoal must be a pair of integers.',
      () => <HistoryDayGoal goal={goal} stats={[42]} />
    )
    checkFailPropType(
      'stats in HistoryDayGoal must start with a non-negative progress value.',
      () => <HistoryDayGoal goal={goal} stats={[-1, 10]} />
    )
    checkFailPropType(
      'stats in HistoryDayGoal must end with a positive target value.',
      () => <HistoryDayGoal goal={goal} stats={[0, 0]} />
    )
  })

  it('should otherwise match the expected snapshot', () => {
    const { container } = render(<HistoryDayGoal goal={goal} stats={[2, 5]} />)

    expect(container).toMatchSnapshot()
  })
})

function checkFailPropType(message, block) {
  const cErr = jest.spyOn(global.console, 'error').mockImplementation(() => {})
  try {
    block()
    expect(cErr).toHaveBeenCalledWith(
      'Warning: Failed %s type: %s%s',
      'prop',
      expect.stringMatching(
        new RegExp(message.replace(/[\].*+?(){}[]/g, '\\$&'))
      ),
      expect.anything()
    )
  } finally {
    cErr.mockRestore()
  }
}

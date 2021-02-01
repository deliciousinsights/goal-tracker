import { render } from '@testing-library/react'

import HistoryDay from './HistoryDay'

describe('<HistoryDay />', () => {
  const goals = [
    {
      id: '5bf57a79890a6e2c11ec9665',
      name: 'Demo goal 1',
      target: 5,
      units: 'wombats',
    },
    {
      id: '5bf57a79890a6e2c11ec9666',
      name: 'Demo goal 2',
      target: 10,
      units: 'weazels',
    },
  ]

  it('should otherwise match the expected snapshot', () => {
    const stats = { date: '2017-03-23', progresses: { 0: [1, 5] } }
    const { container } = render(<HistoryDay goals={goals} stats={stats} />)

    expect(container).toMatchSnapshot()
  })
})

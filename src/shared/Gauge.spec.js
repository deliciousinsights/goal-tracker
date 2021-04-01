import { render, screen } from '@testing-library/react'

import Gauge from './Gauge'

describe('<Gauge />', () => {
  it('should render appropriately', () => {
    render(<Gauge value={50} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('MuiLinearProgress-determinate')
    expect(progressBar).toHaveStyle({ height: '8px' })
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('should normalize value on custom max', () => {
    render(<Gauge value={20} max={80} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '25'
    )
  })

  it('should otherwise match the expected snapshot', () => {
    const { container } = render(<Gauge value={50} />)

    expect(container).toMatchSnapshot()
  })
})

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

  it.todo('should normalize value on custom max')

  it.todo('should otherwise match the expected snapshot')
})

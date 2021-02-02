// Jauge (tests)
// =============

import { render, screen } from '@testing-library/react'

import Gauge from './Gauge'

describe('<Gauge />', () => {
  it('should render appropriately', () => {
    render(<Gauge value={50} />)
    // On récupère le composant dont le rôle est une barre de progression
    // (défini en interne par le `<LinearProgress/>` au sein de `<Gauge/>`).
    const progressBar = screen.getByRole('progressbar')
    // On vérifie qu’il est bien en mode “determinate” (la barre ne cycle pas)
    expect(progressBar).toHaveClass('MuiLinearProgress-determinate')
    // On vérifie que notre style personnalisé est appliqué.
    expect(progressBar).toHaveStyle({ height: '8px' })
    // On vérifie la valeur normalisée
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('should normalize value on custom max', () => {
    render(<Gauge value={20} max={80} />)
    // On vérifie la valeur normalisée
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '25'
    )
  })

  it('should otherwise match the expected snapshots', () => {
    const { container } = render(<Gauge value={50} />)

    // On se contente de comparer le rendu à un
    // [*snapshot*](https://jestjs.io/docs/en/snapshot-testing) pris en
    // développement quand le composant fonctionnait comme prévu.
    expect(container).toMatchSnapshot()
  })
})

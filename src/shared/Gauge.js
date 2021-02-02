// Jauge
// =====
//
// Réutilisé absolument partout dans l’application…  Un parfait exemple de
// composant réutilisable, du coup !

import LinearProgress from '@mui/material/LinearProgress'

import { nonNegativeInteger, positiveInteger } from '../shared/prop-types'

export default function Gauge({ max, value }) {
  return (
    <LinearProgress
      style={{ height: 8 }}
      variant='determinate'
      value={normalize(value, max)}
    />
  )
}

// En définissant les valeurs par défaut dans `defaultProps` au lieu des valeurs
// par défaut de la signature, on s’assure qu’elles seront bien prises en compte
// avant l’exploitation des `propTypes` ci-après.
Gauge.defaultProps = {
  max: 100,
}

Gauge.propTypes = {
  max: positiveInteger,
  value: nonNegativeInteger.isRequired,
}

function normalize(value, max) {
  return value * (100 / max)
}

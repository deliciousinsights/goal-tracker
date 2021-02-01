// Attente de réhydratation
// ========================
//
// Tout petit composant basé sur le drapeau `rehydrated` de l'état applicatif,
// qui permet d'éviter un rendu avant que ce dernier ne soit réhydraté par
// redux-persist.  On s'épargne ainsi un rendu en deux temps (avec les
// transitions CSS sur les jauges) au lancement.

import { node } from './shared/prop-types'

const { useSelector } = require('react-redux')

export default function RehydrationWaiter({ children }) {
  const rehydrated = useSelector(selectRehydrated)
  return rehydrated ? children : null
}
RehydrationWaiter.propTypes = {
  children: node.isRequired,
}

function selectRehydrated({ config: { rehydrated } }) {
  return rehydrated
}

const { useSelector } = require('react-redux')

export default function RehydrationWaiter({ children }) {
  const rehydrated = useSelector(selectRehydrated)
  return rehydrated ? children : null
}

function selectRehydrated({ config: { rehydrated } }) {
  return rehydrated
}

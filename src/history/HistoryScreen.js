import { useEffect } from 'react'

export default function HistoryScreen() {
  useEffect(() => {
    document.title = 'Mon historique'
  }, [])

  return <h1>History coming soon</h1>
}

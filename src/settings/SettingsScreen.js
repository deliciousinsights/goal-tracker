import { useEffect } from 'react'

export default function SettingsScreen() {
  useEffect(() => {
    document.title = 'Mes paramètres'
  }, [])

  return <h1>Settings coming soon</h1>
}

import { differenceInCalendarDays, formatISO } from 'date-fns'

// Utilitaires
// ===========

const FORMATTERS = {
  full: new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  medium: new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
}

const SPECIAL_FORMATS = ['Aujourd’hui', 'Hier', 'Avant-hier']

// Formatage de date de façon “pratique”.
//
// Si un format est passé (`String`), il est utilisé directement (c’est le cas
// pour le titre de `TrackerScreen` par exemple, qui utilise le code de format
// local semi-long `'medium'`), sinon on utilise des textes spéciaux pour
// aujourd’hui, hier et avant-hier, et des formats longs pour toute date autre.
export function formatDate(date, format, { refDate = new Date() } = {}) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (typeof refDate === 'string') {
    refDate = new Date(refDate)
  }
  if (format) {
    return FORMATTERS[format].format(date)
  }
  const diff = differenceInCalendarDays(refDate, date)
  return SPECIAL_FORMATS[diff] || FORMATTERS.full.format(date)
}

// Calcule les totaux de progression et d’objectifs sur la journée, pour
// déterminer ensuite par exemple le taux global de progression, ou le retard
// potentiel (avec des données résultats permettant de l’affiche de façon
// explicite).
export function getDayCounts(todaysProgress, goals) {
  let [totalProgress, totalTarget] = [0, 0]

  for (const { id, target } of goals) {
    totalProgress += todaysProgress[id] || 0
    totalTarget += target
  }

  return { totalProgress, totalTarget }
}

export function isoDate(date) {
  return formatISO(date, { representation: 'date' })
}

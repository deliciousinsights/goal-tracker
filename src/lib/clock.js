import { closeDay } from '../reducers/closeDay'
import store from '../store'

const STAMP_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

const clock = setInterval(checkClock, 1000)

checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    clearInterval(clock)
  })
}

function checkClock() {
  const now = STAMP_FORMATTER.format(new Date())
  console.log('checking', now)

  // Votre code ici
}

function checkForTodaysFirstUse() {
  // Votre code ici
}

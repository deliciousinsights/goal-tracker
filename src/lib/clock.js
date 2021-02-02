// Réinitialisation quotidienne
// ============================

// Les progrès du jour sont réinitialisés tous les soirs à minuit, après avoir
// été ajoutés à l’historique.  Par ailleurs, lorsque l’application se  lance,
// si la journée “en cours” dans l’état global est désormais passée, une
// historisation est immédiatement déclenchée.
//
// C’est en fait le *reducer* consolidé qui fait tout le boulot côté données :
// ce module est surtout charger de déclencher (`store.dispatch(…)`) la bonne
// action (`CLOSE_DAY`) au bon moment, et de notifier l’utilisateur.

import { addSeconds, differenceInCalendarDays, parseISO } from 'date-fns'

import clockIcon from '../icons/clock-reset.png'
import { closeDay } from '../reducers/closeDay'
import store from '../store'

const STAMP_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

// Activation du vérificateur d'historisation et de rappels à des moments précis
// de la journée.
const clock = setInterval(checkClock, 1000)

// On vérifie si on n’a pas déjà les progrès d’une journée désormais passée dans
// l’état global, auquel cas il faut commencer par l’historiser.
checkForTodaysFirstUse()

if (module.hot) {
  module.hot.accept()
  // Le HMR sur ce module doit prendre soin d’annuler l’intervalle de
  // vérification en vigueur, puisque l’initialisation de la nouvelle version du
  // module va en ré-inscrire un tout de suite.
  module.hot.dispose(() => {
    clearInterval(clock)
  })
}

// En production, on réinitialise à minuit.  En développement, 5 secondes après
// le chargement, c’est plus pratique pour les tests interactifs…
const HISTORY_TRIGGER_TIME =
  process.env.NODE_ENV === 'production'
    ? '00:00:00'
    : STAMP_FORMATTER.format(addSeconds(new Date(), 5))

// Vérification des échéances
// --------------------------

// Quand la webapp est ouverte, on vérifie chaque seconde si on a atteint une
// échéance de réinitialisation ou de rappel.  Si tel est le cas, on agit.
function checkClock() {
  const now = STAMP_FORMATTER.format(new Date())

  if (now === HISTORY_TRIGGER_TIME) {
    closePreviousDay()
  }
}

// Historisation au démarrage
// --------------------------

// Au démarrage de la webapp, quand ce module est initialisé, on s'abonne au
// store en attente de sa réhydratation éventulle depuis la sauvegarde d'état
// applicatif côté client.   Car avant la réhydratation, notre état par défaut
// serait forcément sur aujourd'hui, donc sans besoin d'historisation.  Une fois
// qu'on est réhydratés, on peut vérifier si la journée “en cours” de l’état
// central n’est pas passée, ce qui veut dire que la webapp n’était pas ouverte
// à minuit cette journée-là, et que l’historisation reste à faire; On la
// déclenche donc.
function checkForTodaysFirstUse() {
  // Afin de pouvoir se désabonner dès qu'on détecte la réhydratation, on
  // récupère la fonction de désabonnement renvoyée par `subscribe()` pour
  // pouvoir l'appeler le moment venu.
  const unsub = store.subscribe(() => {
    const { config, today } = store.getState()
    if (!config.rehydrated) {
      return
    }

    unsub()

    const storesLastDay = parseISO(today)
    if (differenceInCalendarDays(storesLastDay, new Date()) < 0) {
      closePreviousDay()
    }
  })
}

// Fonctions utilitaires
// ---------------------

// Déclenchement de l’historisation auprès du *store* central, et notification
// si on en a le droit.
function closePreviousDay() {
  store.dispatch(closeDay())

  notify({
    title: 'Fin de journée !',
    text: 'Vos objectifs ont été historisés et repartent à zéro.',
    // Remarquez qu’ici `clockIcon` est en fait une URL, obtenue via l’`import`
    // grâce aux [`url-loader`](https://github.com/webpack/url-loader) et
    // [`file-loader`](https://github.com/webpack/file-loader) de Webpack.  Si
    // le PNG correspondant faisait moins de 10Ko, il aurait même était injecté
    // sous forme base64 plutôt que comme un fichier distinct, économisant une
    // requête HTTP.
    icon: clockIcon,
    secondsVisible: 4,
  })
}

// Notification générique avec fermeture automatique.
function notify({ title, text, icon, secondsVisible = 0 }) {
  if (!store.getState().config.canNotify) {
    return
  }

  const requireInteraction =
    typeof window.Notification.prototype.close === 'function' &&
    secondsVisible > 0
  const notif = new window.Notification(title, {
    body: text,
    icon,
    lang: 'fr',
    requireInteraction,
    tag: 'goal-tracker',
    vibrate: [100, 50, 100, 50, 100],
  })

  if (requireInteraction) {
    notif.addEventListener('show', () => {
      setTimeout(() => notif.close(), secondsVisible * 1000)
    })
  }
}

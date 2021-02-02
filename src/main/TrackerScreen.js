// Écran de suivi des objectifs
// ============================

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

// Remarquez l’injection CSS à la volée, depuis une feuille de style CSS, via un
// simple import.  C’est grâce à la combinaison de plusieurs loaders Webpack :
// `css-loader`, qui transforme la CSS en module JS avec exports des règles, et
// `style-loader`, qui va injecter ces règles à la volée dans le DOM, sur les
// éléments concernés, garantissant leur application quel que soit le contexte.
//
// En mode production, on configure le `MiniCssExtractPlugin` pour sortir toutes
// les CSS issues de feuilles autonomes en un seul fichier CSS optimisé, pour
// permettre l’application de styles dès le chargement, sans attendre que JS
// s’exécute.
//
// On utilise ici des [CSS
// Modules](https://github.com/css-modules/css-modules#readme) pour obtenir des
// classes uniques en production afin de réduire les conflits de portée CSS.
//
// Create React App [préconfigure tout
// ça](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) pour
// vous aux petits oignons.
import classes from './TrackerScreen.module.css'
import { formatDate, getDayCounts } from '../lib/helpers'
import Gauge from '../shared/Gauge'
import GoalTrackerWidget from './GoalTrackerWidget'
import { progressOnGoal } from '../reducers/todaysProgress'
import { requestNotificationPermission } from '../reducers/config'

export default function TrackerScreen() {
  // Au premier rendu, on ajuste le titre du document pour permettre un
  // historique de navigation utilisable (et pas une tonne de titres
  // identiques).  Le [deuxième
  // argument](https://fr.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
  // est le tableau de dépendances qui indique quand relancer l’effet : comme il
  // est vide, seul le premier rendu du composant est concerné.
  useEffect(() => {
    document.title = 'Mes objectifs du jour'
  }, [])

  // On s’intéresse uniquement aux champs `canPromptForNotify`, `goals`, `today`
  // et `todaysProgress` de l’état global, qu’on veut retrouver dans nos
  // propriétés sous les mêmes noms.  Par ricochet, seuls les changements
  // apportés à ces champs entraîneront un éventuel *re-render* de notre
  // conteneur.  La fonction `selectState`, qui va chercher ces infos, est plus
  // bas dans le fichier.
  const { canPromptForNotify, goals, today, todaysProgress } =
    useSelector(selectState)
  // Vu qu’on va solliciter le *store* pour faire progresser les objectifs, on a
  // besoin de `dispatch` afin de lui envoyer une action.
  const dispatch = useDispatch()

  return (
    <>
      <Card className={classes.goalTracker}>
        <CardHeader
          subheader={<Gauge {...overallProgress()} />}
          title={formatDate(today, 'medium')}
        />
        <CardContent>
          {goals.map((goal) => (
            <GoalTrackerWidget
              goal={goal}
              key={goal.id}
              onProgress={markGoalProgression}
              progress={todaysProgress[goal.id] || 0}
            />
          ))}
        </CardContent>
        <CardActions>
          <Button
            color='secondary'
            component={Link}
            startIcon={<HistoryIcon />}
            to='/history'
            variant='contained'
          >
            Historique
          </Button>
          <Button
            component={Link}
            startIcon={<SettingsIcon />}
            to='/settings'
            variant='contained'
          >
            Paramètres
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        action={
          <Button
            onClick={() => dispatch(requestNotificationPermission())}
            variant='contained'
          >
            Oh oui !
          </Button>
        }
        message='Cliquez ci-contre pour être notifié·e quand votre journée est historisée'
        open={canPromptForNotify}
        TransitionComponent={Slide}
      />
    </>
  )

  // Callback pour le `onProgress` des `<GoalTrackerWidget />` qui va déclencher
  // la progression de l’objectif dans l’état global applicatif.
  function markGoalProgression({ id }) {
    dispatch(progressOnGoal({ goalId: id }))
  }

  // Petite méthode métier calculant notre pourcentage global d’accomplissement
  // des objectifs quotidiens.
  function overallProgress() {
    const { totalProgress, totalTarget } = getDayCounts(todaysProgress, goals)

    return { value: totalProgress, max: totalTarget }
  }
}

// Fonction de sélection des valeurs utiles au composant au sein de l’état
// global applicatif géré par Redux.  L’argument est l’état global applicatif
// dans son intégralité, la valeur de retour sera celle renvoyée par le
// [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) auquel on
// aura passé cette fonction.
function selectState({
  config: { canPromptForNotify },
  goals,
  today,
  todaysProgress,
}) {
  return {
    canPromptForNotify,
    goals,
    today,
    todaysProgress,
  }
}

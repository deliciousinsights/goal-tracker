// Historique (conteneur)
// ======================

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import ClearIcon from '@mui/icons-material/Clear'
import Typography from '@mui/material/Typography'

import { clearHistory } from '../reducers/history'
import HistoryDay from './HistoryDay'

export default function HistoryScreen() {
  // Au premier rendu, on ajuste le titre du document pour permettre un
  // historique de navigation utilisable (et pas une tonne de titres
  // identiques).  Le [deuxième
  // argument](https://fr.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
  // est le tableau de dépendances qui indique quand relancer l’effet : comme il
  // est vide, seul le premier rendu du composant est concerné.
  useEffect(() => {
    document.title = 'Mon historique'
  }, [])

  // On s’intéresse uniquement aux champs `goals` et `history` de l’état global,
  // qu’on veut retrouver dans nos propriétés sous les mêmes noms.  Par
  // ricochet, seuls les changements apportés à ces champs entraîneront un
  // éventuel *re-render* de notre conteneur.  La fonction `selectState`, qui va
  // chercher ces infos, est plus bas dans le fichier.
  const { goals, history } = useSelector(selectState)
  // Vu qu’on va solliciter le *store* pour déclencher l’effacement de
  // l’historique, on a besoin de `dispatch` afin de lui envoyer une action.
  const dispatch = useDispatch()

  return (
    // Quand on fait un bouton destiné à être en fait un lien, surtout au sein
    // d’un [`<Link>`](https://reacttraining.com/react-router/web/api/Link), on
    // utilise la propriété
    // [`component`](https://material-ui.com/api/button/#props) pour altérer le
    // composant représentant la couche extérieure du bouton (en lieu et place
    // de `button`).  Les *props* non utilisées par `Button` sont alors passées
    // telles quelles à ce composant (ici la *prop* `to`).
    <>
      <Button component={Link} startIcon={<ArrowBack />} to='/' variant='text'>
        Retour
      </Button>
      <Card className='history'>
        <CardHeader title='Historique' />
        <CardContent>
          {history.map((dayStats) => (
            // Pensez bien à toujours définir une association unique et *stable*
            // entre l’objet de base et son composant au sein d’un `map`, [grâce
            // à la propriété
            // `key`](https://fr.reactjs.org/docs/lists-and-keys.html#keys).
            // Sinon, React va s’emmêler les pinceaux quand le tableau
            // sous-jacent change (suppression, réordonnancement…).
            <HistoryDay goals={goals} key={dayStats.date} stats={dayStats} />
          ))}
          {
            // Ici en revanche, on a l’exemple classique du “if”
            // [façon
            // JSX](https://fr.reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)
            // : une condition suivie d’un et (`&&`) et du composant.  Si on avait
            // un `else` en plus, on préfèrerait un ternaire avec éventuellement
            // des parenthèses autour de chaque partie si au moins l’une d’elles
            // est multi-lignes.  Voir à ce sujet [Affichage
            // conditionnel](https://fr.reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator).
            history.length === 0 && (
              <Typography>Aucun historique disponible</Typography>
            )
          }
        </CardContent>
        {history.length > 0 && (
          <CardActions>
            <Button
              onClick={() => dispatch(clearHistory())}
              startIcon={<ClearIcon />}
              variant='contained'
            >
              Effacer
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  )
}

// Fonction de sélection des valeurs utiles au composant au sein de l’état
// global applicatif géré par Redux.  L’argument est l’état global applicatif
// dans son intégralité, la valeur de retour sera celle renvoyée par le
// [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) auquel on
// aura passé cette fonction.
function selectState({ goals, history }) {
  return { goals, history }
}

// Paramètres
// ==========

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Add from '@material-ui/icons/Add'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Logout from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'

import { addGoal, removeGoal, updateGoal } from '../reducers/goals'
import AddSettingDialog from './AddSettingDialog'
import DeleteSettingDialog from './DeleteSettingDialog'
import GoalSetting from './GoalSetting'
import { logOut } from '../reducers/currentUser'

const DEFAULT_STATE = { goal: {}, dialog: null }

export default function SettingsScreen() {
  // Au premier rendu, on ajuste le titre du document pour permettre un
  // historique de navigation utilisable (et pas une tonne de titres
  // identiques).  Le [deuxième
  // argument](https://fr.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
  // est le tableau de dépendances qui indique quand relancer l’effet : comme il
  // est vide, seul le premier rendu du composant est concerné.
  useEffect(() => {
    document.title = 'Mes paramètres'
  }, [])

  const [{ goal, dialog }, setState] = useState(DEFAULT_STATE)

  // On s’intéresse uniquement aux champs `goals` et `currentUser.email` de
  // l’état global, qu’on veut retrouver dans nos propriétés sous les mêmes
  // noms.  Par ricochet, seuls les changements apportés à ces champs
  // entraîneront un éventuel *re-render* de notre conteneur.  La fonction
  // `selectState`, qui va chercher ces infos, est plus bas dans le fichier.
  const { goals, email } = useSelector(selectState)
  // Vu qu’on va solliciter le *store* pour déclencher la déconnexion ou
  // manipuler les objectifs, on a besoin de `dispatch` afin de lui envoyer une
  // action.
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
      <Card className='settings'>
        <CardHeader title='Paramètres' />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary='Vous êtes connecté-e en tant que'
                secondary={email}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => dispatch(logOut())}>
                  <Logout />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Typography variant='subtitle1'>Mes objectifs</Typography>
            {goals.map((goal) => (
              <GoalSetting
                goal={goal}
                key={goal.id}
                onDeleteClick={openGoalDeleter}
                onEditClick={openGoalEditor}
              />
            ))}
            {goals.length === 0 && (
              <ListItem>
                <ListItemText secondary='Aucun objectif pour le moment' />
              </ListItem>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            onClick={openGoalAdder}
            startIcon={<Add />}
            variant='contained'
          >
            Ajouter un objectif
          </Button>
        </CardActions>
      </Card>
      <AddSettingDialog
        goal={goal}
        onAdd={addOrUpdateGoal}
        onCancel={closeDialogs}
        onClosed={resetGoal}
        open={dialog === 'add-or-update'}
      />
      <DeleteSettingDialog
        goal={goal}
        onCancel={closeDialogs}
        onClosed={resetGoal}
        onDelete={deleteSelectedGoal}
        open={dialog === 'delete'}
      />
    </>
  )

  function addOrUpdateGoal({ id, name, target, units, keepOpen }) {
    if (id !== undefined) {
      dispatch(updateGoal(id, name, target, units))
      keepOpen = false
    } else {
      dispatch(addGoal(name, target, units))
    }
    if (!keepOpen) {
      closeDialogs()
    }
  }

  function closeDialogs() {
    setState({ goal, dialog: null })
  }

  function deleteSelectedGoal() {
    dispatch(removeGoal(goal.id))
    closeDialogs()
  }

  function openGoalAdder() {
    setState({ goal: {}, dialog: 'add-or-update' })
  }

  function openGoalDeleter(goal) {
    setState({ goal, dialog: 'delete' })
  }

  function openGoalEditor(goal) {
    setState({ goal, dialog: 'add-or-update' })
  }

  function resetGoal() {
    setState(DEFAULT_STATE)
  }
}

// Fonction de sélection des valeurs utiles au composant au sein de l’état
// global applicatif géré par Redux.  L’argument est l’état global applicatif
// dans son intégralité, la valeur de retour sera celle renvoyée par le
// [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) auquel on
// aura passé cette fonction.
function selectState({ goals, currentUser: { email } }) {
  return { goals, email }
}

// Paramètres
// ==========

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Add from '@mui/icons-material/Add'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Logout from '@mui/icons-material/ExitToApp'
import Typography from '@mui/material/Typography'

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
        key={goal.id}
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
      dispatch(updateGoal({ id, name, target, units }))
      keepOpen = false
    } else {
      dispatch(addGoal({ name, target, units }))
    }
    if (!keepOpen) {
      closeDialogs()
    }
  }

  function closeDialogs() {
    setState({ goal, dialog: null })
  }

  function deleteSelectedGoal() {
    dispatch(removeGoal({ id: goal.id }))
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

// Ajout/modification de paramètre
// ===============================

// C’est en fait une boîte de dialogue, inclue d’office dans le conteneur parent
// (`SettingsScreen`), et qui va donc être initialement *rendered* sans objectif
// (`goal`), puis verra ses propriétés mises à jour à chaque utilisation (`goal`
// vide pour un ajout, `goal` rempli, dont son `id`, pour une modification).

import { useState } from 'react'

import Add from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Edit from '@material-ui/icons/Create'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  bool,
  exact,
  func,
  GoalPropType,
  oneOfType,
} from '../shared/prop-types'

const DEFAULT_STATE = {
  id: undefined,
  name: '',
  target: 5,
  units: '',
  keepOpen: true,
}

// Le composant
// ------------

export default function AddSettingDialog({
  goal,
  onAdd,
  onCancel,
  onClosed,
  open,
}) {
  const smallViewport = useMediaQuery('(max-width: 480px)')
  const [state, setState] = useState(DEFAULT_STATE)

  // On gère justement ici le cas où notre prop `goal` change au fil du temps,
  // ce qui exige alors une resynchro de l’état, et partant un nouveau rendu.
  // Si nous étions basés sur une classe, on utiliserait sans doute `static
  // getDerivedStateFromProps()` pour ça.
  const [prevGoalId, setPrevGoalId] = useState(undefined)
  if (prevGoalId !== goal.id) {
    setState({ ...DEFAULT_STATE, ...goal, keepOpen: goal.id === undefined })
    setPrevGoalId(goal.id)
  }

  // Si le `goal` passé a une propriété `id`, c’est un objectif existant, donc
  // on le “modifie”, sinon c'est du vide et on “ajoute” un nouvel objectif.
  const isEditing = 'id' in goal

  return (
    <Dialog
      aria-labelledby='addGoalTitle'
      fullScreen={smallViewport}
      onClose={onCancel}
      onExited={onClosed}
      open={open}
    >
      <DialogTitle id='addGoalTitle'>
        {isEditing ? 'Modifier un objectif' : 'Ajouter un objectif'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Nom'
          margin='normal'
          name='name'
          onChange={(event) => handleChange(event, 'name')}
          required
          value={state.name}
        />
        <TextField
          label='Quantité par jour'
          margin='normal'
          name='target'
          onChange={(event) => handleChange(event, 'target')}
          required
          type='number'
          value={state.target}
        />{' '}
        <TextField
          label='Unité'
          margin='normal'
          name='units'
          onChange={(event) => handleChange(event, 'units')}
          placeholder='pas, minutes de course…'
          required
          value={state.units}
        />
        {isEditing || (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.keepOpen}
                  onChange={(event, checked) =>
                    handleChange(event, 'keepOpen', checked)
                  }
                />
              }
              label='Garder ouvert pour l’ajout suivant'
            />
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onCancel} variant='text'>
          Annuler
        </Button>
        {isEditing ? (
          <Button
            color='primary'
            onClick={triggerAdd}
            startIcon={<Edit />}
            variant='text'
          >
            Modifier
          </Button>
        ) : (
          <Button
            color='primary'
            onClick={triggerAdd}
            startIcon={<Add />}
            variant='text'
          >
            Ajouter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )

  // Gestionnaire générique de modification de champ, qui reflète la valeur de
  // champ de formulaire (forcément `String`) dans le bon champ de `state`, avec
  // une conversion de type à la volée si besoin.
  //
  // On a un cas particulier pour la case à cocher, qui appelle ce gestionnaire
  // depuis un `onCheck` au lieu d’un `onChange`, et passer le troisième
  // argument, d’où un traitement spécifique.
  //
  // Ce code est particulièrement intéressant, parce qu'on y voit…
  //
  // - Une sélection dynamique de fonction (`Number` ou `String`)
  // - Une propriété dynamique/calculée (`[field]`)
  // - Un spread d’objet (`...state`), la fonction renvoyée par le hook
  //   `useState` n’étant pas différentielle, contrairement au `setState` de
  //   `React.Component`.
  function handleChange(event, field, checked) {
    if (field === 'keepOpen') {
      setState({ ...state, keepOpen: checked })
    } else {
      const caster = field === 'target' ? Number : String
      setState({ ...state, [field]: caster(event.target.value) })
    }
  }

  function triggerAdd() {
    onAdd(state)
    // On ne réinitialise l'état que si on n'a pas l'intention de fermer la
    // boîte de dialogue pour le moment ; sinon ça altèrerait l'aspect des
    // champs pendant le fondu de fermeture, ce qui est dérangeant visuellement.
    if (state.keepOpen) {
      setState(DEFAULT_STATE)
    }
  }
}
// Comme pour tous les composants, la bonne pratique consiste à expliciter les
// propriétés autorisées.
AddSettingDialog.propTypes = {
  goal: oneOfType([GoalPropType, exact({})]),
  onAdd: func.isRequired,
  onCancel: func.isRequired,
  onClosed: func,
  open: bool.isRequired,
}

// Suppression de paramètre
// ========================

// C’est en fait une boîte de dialogue, inclue d’office dans le conteneur parent
// (`SettingsScreen`), et qui va donc être initialement *rendered* sans objectif
// (`goal`), puis verra ses propriétés mises à jour à chaque utilisation.

import Button from '@material-ui/core/Button'
import Clear from '@material-ui/icons/Clear'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  bool,
  exact,
  func,
  GoalPropType,
  oneOfType,
} from '../shared/prop-types'

// Il y a vraiment quelque chose de délicieux dans la déstructuration, surtout
// pour un argument objet et en ajoutant des valeurs par défaut, comme ici…
export default function DeleteSettingDialog({
  goal = {},
  onCancel,
  onClosed,
  onDelete,
  open,
}) {
  const smallViewport = useMediaQuery('(max-width: 480px)')
  return (
    <Dialog
      aria-labelledby='deleteGoalTitle'
      fullScreen={smallViewport}
      onClose={onCancel}
      onExited={onClosed}
      open={open}
    >
      <DialogTitle id='deleteGoalTitle'>Supprimer un objectif</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Supprimer l’objectif {`« ${goal.name} » ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onCancel}>
          Ouh là, non !
        </Button>
        <Button color='primary' onClick={onDelete} startIcon={<Clear />}>
          Adios !
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Comme pour tous les composants, la bonne pratique consiste à expliciter les
// propriétés autorisées.
DeleteSettingDialog.propTypes = {
  goal: oneOfType([GoalPropType, exact({})]),
  onCancel: func.isRequired,
  onClosed: func,
  onDelete: func.isRequired,
  open: bool.isRequired,
}

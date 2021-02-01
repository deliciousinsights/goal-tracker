// Paramétrage d’un objectif
// =========================

// Section de l'écran de paramétrage, dédiée à un objectif.  Fournit notamment
// le descriptif de l'objectif et le menu déroulant pour les actions de
// modification et suppression.

import { useState } from 'react'

import Delete from '@material-ui/icons/Clear'
import Edit from '@material-ui/icons/Create'
import grey from '@material-ui/core/colors/grey'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVert from '@material-ui/icons/MoreVert'
import { withStyles } from '@material-ui/core/styles'

import { exact, func, GoalPropType, string } from '../shared/prop-types'

const styles = {
  moreIcons: { color: grey[400] },
}

function GoalSetting({
  classes,
  goal,
  goal: { name, target, units },
  onDeleteClick,
  onEditClick,
}) {
  const [anchorEl, setAnchor] = useState(null)

  const id = `rightIconMenu-${name.replace(/\W+/, '-').toLowerCase()}`

  return (
    <ListItem>
      <ListItemText primary={name} secondary={`${target} ${units}`} />
      <ListItemSecondaryAction>
        <IconButton
          arial-label='Plus d’actions…'
          aria-owns={anchorEl ? id : null}
          aria-haspopup='true'
          onClick={openMenu}
        >
          <MoreVert classes={{ root: classes.moreIcons }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id={id}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={requestEdit}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            Modifier
          </MenuItem>
          <MenuItem onClick={requestDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Supprimer
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  )

  function closeMenu() {
    setAnchor(null)
  }

  function requestDelete() {
    closeMenu()
    onDeleteClick?.(goal)
  }

  function requestEdit() {
    closeMenu()
    onEditClick?.(goal)
  }

  function openMenu(event) {
    setAnchor(event.currentTarget)
  }
}
GoalSetting.propTypes = {
  classes: exact({ moreIcons: string.isRequired }).isRequired,
  goal: GoalPropType,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
}

export default withStyles(styles)(GoalSetting)

// Paramétrage d’un objectif
// =========================

// Section de l'écran de paramétrage, dédiée à un objectif.  Fournit notamment
// le descriptif de l'objectif et le menu déroulant pour les actions de
// modification et suppression.

import { useState } from 'react'

import Delete from '@mui/icons-material/Clear'
import Edit from '@mui/icons-material/Create'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVert from '@mui/icons-material/MoreVert'

import { func, GoalPropType } from '../shared/prop-types'

function GoalSetting({
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
          aria-label={`Plus d’actions pour l’objectif ${name}…`}
          aria-owns={anchorEl ? id : null}
          aria-haspopup='true'
          onClick={openMenu}
        >
          <MoreVert />
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
  goal: GoalPropType,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
}

export default GoalSetting

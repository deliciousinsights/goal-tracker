// Champ de mot de passe basculable
// ================================
//
// Composant utilitaire ajoutant au champ mot de passe natif un pictogramme de
// bascule de visibilité de la valeur ; c’est une UI préférable à un champ de
// confirmation, par exemple, qui permet un contrôle visuel à la demande de la
// saisie.

import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function TogglablePasswordField(props) {
  const [visible, setVisible] = useState(false)

  const type = visible ? 'text' : 'password'
  const label = visible ? 'Masquer le mot de passe' : 'Voir le mot de passe'
  const icon = visible ? <VisibilityOff /> : <Visibility />
  const endAdornment = (
    <InputAdornment position='end'>
      <IconButton arial-label={label} onClick={toggleVisible} title={label}>
        {icon}
      </IconButton>
    </InputAdornment>
  )

  return <TextField {...props} InputProps={{ endAdornment }} type={type} />

  function toggleVisible() {
    setVisible((visible) => !visible)
  }
}

TogglablePasswordField.propTypes = TextField.propTypes

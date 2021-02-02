// Écran de connexion
// ==================

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ArrowForward from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'

import classes from './LoginScreen.module.css'
import { logIn } from '../reducers/currentUser'
import TogglablePasswordField from './TogglablePasswordField'

const MIN_PASSWORD_LENGTH = 6

export default function LoginScreen() {
  // Au premier rendu, on ajuste le titre du document pour permettre un
  // historique de navigation utilisable (et pas une tonne de titres
  // identiques).  Le [deuxième
  // argument](https://fr.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
  // est le tableau de dépendances qui indique quand relancer l’effet : comme il
  // est vide, seul le premier rendu du composant est concerné.
  useEffect(() => {
    document.title = 'Identifiez-vous'
  }, [])

  // On utilise des champs contrôlés pour les valeurs, afin de récupérer
  // facilement leurs valeurs courantes dans le code de lancement de la
  // connexion.  Il est important d’avoir une `String` comme valeur par défaut
  // (par opposition à, disons, `undefined` ou `null`) afin que le champ soit
  // contrôlé d’entrée de jeu.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Récupération des infos qui nous intéressent depuis l’état global applicatif
  // géré par Redux. En l’occurrence, seul `currentUser.loginState` nous
  // intéresse.
  const loginState = useSelector((state) => state.currentUser.loginState)

  // On définit quelques flags et éléments variables de notre UI suivant l’étape
  // de login en cours : délogué, login en cours, login réussi, login échoué.
  const loggingIn = loginState === 'pending'
  const logInIcon = loggingIn ? null : <ArrowForward />
  const canLogIn =
    !loggingIn && email !== '' && password.trim().length >= MIN_PASSWORD_LENGTH
  // Vu qu’on va solliciter le *store* pour déclencher la connexion, on a besoin
  // de `dispatch` afin de lui envoyer une action.
  const dispatch = useDispatch()

  // En cas d’échec explicite, une
  // *[snackbar](https://material-ui.com/components/snackbars/)* apparaîtra 2s
  // en bas de la fenêtre, pour nous signifier le souci.
  const snackBar =
    loginState === 'failure' ? (
      <Snackbar message='Identifiant ou mot de passe invalide' open />
    ) : (
      ''
    )

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.loginScreen}>
        <CardHeader title='Goal Tracker' subheader='Connexion' />
        <CardContent>
          <TextField
            autoComplete='home email'
            fullWidth
            id='email'
            label='E-mail'
            margin='normal'
            name='email'
            onChange={(event) => setEmail(normalizeEmail(event.target.value))}
            placeholder='mon@email.tld'
            required
            type='email'
            value={email}
          />
          <TogglablePasswordField
            autoComplete='current-password'
            fullWidth
            helperText={`${MIN_PASSWORD_LENGTH} caractères minimum`}
            id='password'
            label='Mot de passe'
            margin='normal'
            name='password'
            onChange={(event) => setPassword(event.target.value)}
            placeholder='super mot de passe'
            required
            value={password}
          />
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color='primary'
            disabled={!canLogIn}
            startIcon={logInIcon}
            type='submit'
            variant='contained'
          >
            Connecte-toi
          </Button>
        </CardActions>
      </Card>
      {snackBar}
    </form>
  )

  // Gestionnaire d’envoi du formulaire, pour déclencher plutôt une connexion
  // via appel API.
  function handleSubmit(event) {
    // On commence par empêcher le traitement par défaut de l'événement
    // `submit`, qui déclencherait un envoi du formulaire au serveur.  Et **non,
    // on n’utilise pas `return false`**, qui est une extension jQuery qui, en
    // plus, appellerait stopPropagation(), ce qui n’est pas souhaitable (et ne
    // marche pas sans jQuery).
    event.preventDefault()
    // Hop, on sollicite le *store* Redux de façon appropriée, avec le bon
    // *action creator*.
    dispatch(logIn({ email, password }))
  }
}

// Petit utilitaire de normalisation d'adresse e-mail, utilisé à la volée lors
// de la saisie (champ contrôlé).
function normalizeEmail(email) {
  return (
    email
      // Pas de whitespace !
      .replace(/\s+/g, '')
      // Normalisation minuscule avant le @
      .replace(/^[^@]+/, (text) => text.toLowerCase())
  )
}

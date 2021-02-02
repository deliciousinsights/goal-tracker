// Écran de connexion
// ==================

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ArrowForward from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'

import classes from './LoginScreen.module.css'
import { logIn } from '../reducers/currentUser'
import TogglablePasswordField from './TogglablePasswordField'

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
  // intéresse.  La fonction `selectLoginState`, qui va chercher cette info, est
  // plus bas dans le fichier.
  const loginState = useSelector(selectLoginState)
  // Vu qu’on va solliciter le *store* pour déclencher la connexion, on a besoin
  // de `dispatch` afin de lui envoyer une action.
  const dispatch = useDispatch()

  // On définit quelques flags et éléments variables de notre UI suivant l’étape
  // de login en cours : délogué, login en cours, login réussi, login échoué.
  const loggingIn = loginState === 'pending'
  const logInIcon = loggingIn ? null : <ArrowForward />
  const canLogIn = !loggingIn && email.trim() !== '' && password.trim() !== ''

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
            id='email'
            name='email'
            label='E-mail'
            fullWidth
            margin='normal'
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder='mon@email.tld'
            required
            type='email'
            value={email}
          />
          <TogglablePasswordField
            autoComplete='current-password'
            id='password'
            name='password'
            label='Mot de passe'
            fullWidth
            margin='normal'
            onChange={(e) => setPassword(e.target.value)}
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
    dispatch(logIn(email, password))
  }
}

// Fonction de sélection des valeurs utiles au composant au sein de l’état
// global applicatif géré par Redux.  L’argument est l’état global applicatif
// dans son intégralité, la valeur de retour sera celle renvoyée par le
// [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) auquel on
// aura passé cette fonction.
function selectLoginState(state) {
  return state.currentUser.loginState
}

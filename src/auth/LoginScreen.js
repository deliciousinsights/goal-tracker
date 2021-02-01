import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginState = useSelector(selectLoginState)
  const dispatch = useDispatch()

  const loggingIn = loginState === 'pending'
  const logInIcon = loggingIn ? null : <ArrowForward />
  const canLogIn = !loggingIn && email && password

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

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(logIn(email, password))
  }
}
function selectLoginState(state) {
  return state.currentUser.loginState
}

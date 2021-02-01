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
  useEffect(() => {
    document.title = 'Identifiez-vous'
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginState = useSelector((state) => state.currentUser.loginState)
  const loggingIn = loginState === 'pending'
  const logInIcon = loggingIn ? null : <ArrowForward />
  const canLogIn =
    !loggingIn && email !== '' && password.trim().length >= MIN_PASSWORD_LENGTH
  const dispatch = useDispatch()

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

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(logIn({ email, password }))
  }
}

function normalizeEmail(email) {
  return email
    .replace(/\s+/g, '')
    .replace(/^[^@]+/, (text) => text.toLowerCase())
}

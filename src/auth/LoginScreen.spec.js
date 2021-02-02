// Écran de connexion (tests)
// ==========================

import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginScreen from './LoginScreen'
import { makeStore } from '../store'

import '@testing-library/jest-dom/extend-expect'

// Cet import enregistre des assertions supplémentaires liées à jest-dom dans le
// `expect()` de Jest, telles que `toBeDisabled()`, `toHaveClass()` ou encore
// `toHaveAttribute()`.

describe('<LoginScreen />', () => {
  it('should adjust button when logged-out based on values', async () => {
    // Si la mise en place va au-delà d’un simple `render()` de RTL, on
    // centralise celle-ci dans une fonction locale `setup()`, par convention.
    // La fonction est déclarée plus bas.  Les arguments varient d’une suite de
    // tests à l’autre, selon ce qu’on veut faire varier.  Ici, c’est le
    // `currentUser.loginState` initial.
    setup('logged-out')
    // On récupère le bouton d’envoi du formulaire par son texte…
    const button = screen.getByRole('button', { name: 'Connecte-toi' })

    // …et on vérifie qu’à ce stade (champs vides) il est désactivé.
    expect(button).toBeDisabled()

    // On récupère le champ e-mail par son libellé…
    const emailField = screen.getByLabelText(/E-mail/)
    // …et on simule une saisie.  En pratique, le `onChange` de React réagit à
    // une pléthore d’événements DOM (ex. `change`, `input`, `keypress`,
    // `paste`), mais ici on va opter pour un bon vieux `change` à l’ancienne.
    // Le second argument fournit les propriétés qu’on souhaite personnaliser
    // pour l’objet événement qui sera généré.
    await userEvent.type(emailField, 'foo@bar.com')
    expect(button).toBeDisabled()

    const passwordField = screen.getByLabelText(/Mot de passe/)
    await userEvent.type(passwordField, 'foobar')
    // Une fois les deux champs remplis, le bouton de connexion devrait être
    // disponible.
    expect(button).toBeEnabled()
  })

  it('should disable the button when pending', () => {
    setup('pending')
    expect(screen.getByRole('button', { name: 'Connecte-toi' })).toBeDisabled()
  })

  it('should restore the button and display a snackbar on failure', () => {
    setup('failure')
    expect(screen.getByRole('button', { name: 'Connecte-toi' })).toBeDisabled()
    expect(
      screen.getByText('Identifiant ou mot de passe invalide')
    ).toBeInTheDocument()
  })

  // Fonction centralisée de mise en place du test.  Comme le composant utilise
  // un store Redux en vigueur (en raison de ses hooks React-Redux), il nous
  // faut l’enrober dans un `<Provider>` avec un *store* adéquat.  C’est tout
  // l’intérêt d’avoir exporté notre `configureStore)` en plus du *store* applicatif
  // par défaut.
  function setup(loginState) {
    const store = makeStore({ currentUser: { loginState } })
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    )
  }
})

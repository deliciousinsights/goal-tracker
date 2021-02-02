// Suivi du jour pour un objectif (tests)
// ======================================

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GoalTrackerWidget from './GoalTrackerWidget'

// Classiquement, quand on décrit un composant React, on utilise sa balise JSX
// comme sujet de la description.  Celui-ci est censé…
describe('<GoalTrackerWidget />', () => {
  const goal = {
    id: '0123456789abcdef01234567',
    name: 'My goal',
    target: 42,
    units: 'wombats',
  }
  describe('when not completed', () => {
    // …produire le balisage attendu pour un objectif non atteint
    // ----------------------------------------------------------
    // On va tester quatre valeurs pour le taux de complétion: les “bornes” 0,
    // 1 et 41, d’une part, et une valeur quelconque, ici le 21 en plein
    // milieu, d’autre part.
    it.each`
      progress | percentage
      ${0}     | ${0}
      ${1}     | ${2}
      ${21}    | ${50}
      ${41}    | ${98}
    `(
      'should render appropriately at progress $progress',
      ({ progress, percentage }) => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)
        // Le composant de type titre (h1, h2 ou autre) devrait avoir le nom de
        // l’objectif comme texte (fut-ce un texte partiel).
        expect(screen.getByRole('heading')).toHaveTextContent(goal.name)
        // Le composant ayant un rôle de barre de progression (créé en interne
        // par le `<LinearProgress/>` utilisé par `<Gauge/>`) devrait avoir la
        // bonne valeur dans l’attribut ARIA adapté.  C’est plus propre à tester
        // que les styles en termes de largeur, etc.
        expect(screen.getByRole('progressbar')).toHaveAttribute(
          'aria-valuenow',
          String(percentage)
        )
        // On devrait trouver quelque part un texte bien précis de
        // contextualisation.
        expect(
          screen.getByText(`${progress} ${goal.units} sur ${goal.target}`)
        ).toBeInTheDocument()

        // Il arrive que certains composants ne puissent pas être ciblés par les
        // requêtes usuelles de RTL, en raison de l’implémentation des
        // composants React concernés.  Dans un tel cas, on peut les doter d’une
        // *prop* `data-testid`, qui sert spécifiquement à ça.  En pratique ici
        // on pourrait se servir des `aria-label`, mais il n'y en a pas
        // forcément et puis on voulait vous montrer cette astuce pratique :)
        expect(screen.getByTestId('in-progress')).toBeInTheDocument()
      }
    )

    // …déclencher correctement son `onProgress` au clic
    // -------------------------------------------------
    it('should trigger its onProgress on click', async () => {
      const progress = 21
      // Pour vérifier que le *callback* transmis est bien appelé, rien de tel
      // qu’un *spy* fourni par
      // [jest.fn()](https://jestjs.io/docs/en/jest-object#mock-functions).
      const onProgress = jest.fn()
      render(
        <GoalTrackerWidget
          goal={goal}
          onProgress={onProgress}
          progress={progress}
        />
      )

      // On simule le clic.
      await userEvent.click(screen.getByRole('button'))
      expect(onProgress).toHaveBeenCalledTimes(1)
      expect(onProgress).toHaveBeenCalledWith(goal)
    })

    // …valider le snapshot
    // --------------------
    // (avoir une structure détaillée identique à la dernière qui a été validée
    // par les développeurs au moyen d’un snapshot.)
    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={21} />
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('when completed (or exceeded)', () => {
    // …produire le balisage attendu pour un objectif atteint (voire dépassé)
    // ----------------------------------------------------------------------
    // On va tester trois valeurs de dépassement de l’objectif: la borne zéro
    // (objectif atteint, pile-poil) et des plus grandes (objectif dépassé).
    it.each([goal.target, goal.target + 1, goal.target + 10])(
      'should render appropriately at progress %i',
      (progress) => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)

        // Si on a atteint ou dépassé l'objectif, on n'est pas censé avoir
        // l’icône d'ajout qui trahirait un bouton de progression, mais on est
        // censé avoir l’icône de pouce vers le haut, qui traduit l’objectif (au
        // moins) atteint.
        expect(screen.queryByTestId('in-progress')).not.toBeInTheDocument()
        expect(screen.getByTestId('completed')).toBeInTheDocument()
      }
    )

    // …valider le snapshot
    // --------------------
    // (avoir une structure détaillée identique à la dernière qui a été validée
    // par les développeurs au moyen d’un snapshot.)
    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={42} />
      )

      expect(container).toMatchSnapshot()
    })
  })
})

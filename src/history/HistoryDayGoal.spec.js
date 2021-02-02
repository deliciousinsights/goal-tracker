// Journée historique d’un objectif (tests)
// ========================================

import { render } from '@testing-library/react'

import HistoryDayGoal from './HistoryDayGoal'

describe('<HistoryDayGoal />', () => {
  const goal = { id: 'abcd', name: 'Demo goal', target: 5, units: 'wombats' }

  it('should use proper stats propTypes', () => {
    // À titre d’exemple, on teste que les validations de props sont bien mises
    // en place, notamment parce qu’il s’agit d’un validateur personnalisé, et
    // non d’un autre fourni par un module tiers.  Le code pour ça est tendu,
    // voyez la fonction `checkFailPropType()` plus bas dans le fichier.
    checkFailPropType('stats in HistoryDayGoal must be an array.', () => (
      <HistoryDayGoal goal={goal} />
    ))
    checkFailPropType(
      'stats in HistoryDayGoal must be a pair of integers.',
      () => <HistoryDayGoal goal={goal} stats={[42]} />
    )
    checkFailPropType(
      'stats in HistoryDayGoal must start with a non-negative progress value.',
      () => <HistoryDayGoal goal={goal} stats={[-1, 10]} />
    )
    checkFailPropType(
      'stats in HistoryDayGoal must end with a positive target value.',
      () => <HistoryDayGoal goal={goal} stats={[0, 0]} />
    )
  })

  it('should otherwise match the expected snapshot', () => {
    const { container } = render(<HistoryDayGoal goal={goal} stats={[2, 5]} />)

    // On se contente de comparer le rendu à un
    // [*snapshot*](https://jestjs.io/docs/en/snapshot-testing) pris en
    // développement quand le composant fonctionnait comme prévu.
    expect(container).toMatchSnapshot()
  })
})

// Fonction de test d’une erreur de validation de *prop*.  Il n’existe en fait
// qu’un moyen : intercepter les appels à `console.error()` (sur l’objet global
// `console`) le temps du test, pour confirmer qu’un appel y a été fait avec un
// message adéquat.
function checkFailPropType(message, block) {
  // Tant qu’à faire, on remplace l’implémentation par du vide histoire de ne
  // pas polluer notre affichage de test, dans le même esprit que l’API
  // `sinon.stub()` de SinonJS.
  const cErr = jest.spyOn(global.console, 'error').mockImplementation(() => {})
  try {
    block()
    expect(cErr).toHaveBeenCalledWith(
      'Warning: Failed %s type: %s%s',
      'prop',
      expect.stringMatching(
        new RegExp(message.replace(/[\].*+?(){}[]/g, '\\$&'))
      ),
      expect.anything()
    )
  } finally {
    cErr.mockRestore()
  }
}

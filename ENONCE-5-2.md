# Exercice 2 étape 5 : décliner le test de `<GoalTrackerWidget />` en objectif atteint/dépassé

Nous venons d'écrire le test de rendu pour `<GoalTrackerWidget />` en situation d'objectif non-atteint, qui vérifie la bonne définition de plusieurs aspects du DOM final.

Il s'agit maintenant de vérifier que le composant produit un bon rendu en situation d'objectif atteint ou dépassé, spécifiquement en termes d'icône affiché. Créez le deuxième test (_“it should render appropriately”_) pour le confirmer.

## Étapes

1. Entourez le test d'une boucle avec des valeurs appropriées pour `progress` (la cible, la cible + 1, la cible + 10 par exemple)
2. Retirez le `.todo` de la définition, dynamisez le titre et ajoutez le corps de fonction du test.
3. Faites un rendu de `<GoalTrackerWidget />` avec la prop `progress` qui va bien.
4. Confirmez que l'icône identifié par le `testid` “completed” est bien là.
5. Confirmez que l'icône identifié par le `testid` “in-progress **n'est pas là**.

## Astuces

- On ne se soucie pas des autres aspects du rendu, déjà testés dans le premier scénario et considérés invariants.
- Pour requêter quelque chose _qui n'est pas censé être là_, utilisez `queryBy…` plutôt que `getBy…`.
- Pour inverser une assertion, faites `expect(…).not.to…` plutôt que `expect(…).to…`.

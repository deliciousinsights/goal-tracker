# Exercice 2 étape 5 : décliner le test de `<GoalTrackerWidget />` en objectif atteint/dépassé

Nous venons d'écrire le test de rendu pour `<GoalTrackerWidget />` en situation d'objectif non-atteint, qui vérifie la bonne définition de plusieurs aspects du DOM final.

Il s'agit maintenant de vérifier que le composant produit un bon rendu en situation d'objectif atteint ou dépassé, spécifiquement en termes d'icône affiché. Créez le deuxième test (_“it should render appropriately”_) pour le confirmer.

## Étapes

1. Retirez le `.todo` de la définition et préfixez la signature par un `it.each([])`
2. Remplissez le tableau des paramètres de scénarios avec quelques valeurs de progression bien choisies.
3. Dynamisez le titre en utilisant `%i` pour la progression, et déclarez l'argument `progress` du callback de test.
4. Faites un rendu de `<GoalTrackerWidget />` avec la prop `progress` qui va bien.
5. Confirmez que l'icône identifié par le `testid` “completed” est bien là.
6. Confirmez que l'icône identifié par le `testid` “in-progress **n'est pas là**.

## Astuces

- On ne se soucie pas des autres aspects du rendu, déjà testés dans le premier scénario et considérés invariants.
- Pour requêter quelque chose _qui n'est pas censé être là_, utilisez `queryBy…` plutôt que `getBy…`. Notez que tant que vous n'aurez pas inversé l'assertion qui suit, le plugin Testing-Library d'ESLint va se mettre à couiner, car un `queryBy` pour un test de présence (et non d'absence) est une mauvaise pratique.
- Pour inverser une assertion, faites `expect(…).not.to…` plutôt que `expect(…).to…`.

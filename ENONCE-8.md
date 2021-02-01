# Exercice de l’étape 8 : implémenter les actions manquantes du réducteur Goals

Il vous faut implémenter les actions de suppression et de mise à jour d’objectif. Utilisez les tests déjà prêts pour vérifier votre implémentation.

# Étapes

1. Implémentez le `addCase(removeGoal)` du réducteur.
2. Implémentez le `addCase(updateGoal)` du réducteur.

# Astuces

- Même si Immer.js, intégré par Redux Toolkit, vous permet de réaliser ça de façon mutative / impérative classique, ce sera plus concis et plus pratique en utilisant une approche fonctionnelle / immuable, comme si on faisait du Redux classique.
- La suppression se résume à un `return` immédiat, utilisant [la bonne méthode](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array#Instances_d'Array) de filtrage de tableau…
- La mise à jour se résume, elle aussi, à un `return` immédiat, utilisant la bonne méthode de dérivation de tableau…

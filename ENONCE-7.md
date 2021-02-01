# Exercice de l’étape 7 : implémenter les actions manquantes du réducteur Goals

Il vous faut implémenter les actions de suppression et de mise à jour d’objectif. Utilisez les tests déjà prêts pour vérifier votre implémentation.

# Étapes

1. Implémentez le `case REMOVE_GOAL` du réducteur.
2. Implémentez le `case UPDATE_GOAL` du réducteur.

# Astuces

* **Attention, défense absolue d’utiliser des boucles, des `slice()`, `splice()`, `findIndex()` ou `indexOf()` !**
* La suppression se résume à un `return` immédiat, utilisant [la bonne méthode](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array#Instances_d'Array) de filtrage de tableau…
* La mise à jour se résume, elle aussi, à un `return` immédiat, utilisant la bonne méthode de dérivation de tableau…

# Exercice étape 18 : combinaison des réducteurs de niveau racine

Notre réducteur `reduceCloseDay()` est prêt, mais il n’est pas encore utilisé.

## Objectif

Nous avons désormais deux réducteurs opérant au niveau racine de l’état :

1. Le réducteur principal, ou « noyau » (_core_), obtenu par le `combineReducers()` sur les réducteurs de tranche. Il fournit notamment toutes les valeurs par défaut.
2. Le réducteur `reduceCloseDay()`, qui se concentre sur une action précise.

Il faut faire en sorte que les deux soient mis en œuvre au même niveau. Idéalement, on écrira ce code de façon à pouvoir l’augmenter facilement, sans ajouter de lignes, lorsque de nouveaux réducteurs de même niveau apparaîtraient.

## Étapes

1. Implémentez la partie manquante de `src/reducers/index.js`

## Astuces

Lancez si besoin un `npm test` : la spec dans `src/reducers/index.spec.js` vous dira si vous avez bon (et vous rappellera ce qu'on attend concrètement).

Une implémentation naïve est tout à fait possible, mais idéalement, on passera plutôt par un `reduce()`, puisqu’on fait en fait évoluer l’état au fil des appels de reducers, jusqu’à un état finalisé.

Une fois que vous aurez pondu une implémentation qui marche, vous pouvez jeter un œil à [reduce-reducers](https://github.com/redux-utilities/reduce-reducers#readme), qui sert justement à ça, et qui est disponible dans vos modules tiers installés.

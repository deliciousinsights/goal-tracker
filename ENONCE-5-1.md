# Exercice 1 étape 5 : décliner le 2e test de `<Gauge />`

Nous venons d'écrire le premier test pour `<Gauge />`, qui vérifie la bonne définition de plusieurs aspects du DOM final.

Il s'agit maintenant de vérifier que le composant prend correctement en compte la prop `max`. Créez le deuxième test (_“it should normalize value on custom max”_) pour le confirmer.

## Étapes

1. Retirer le `.todo` de la définition et ajoutez le corps de fonction du test.
2. Faites un rendu de `<Gauge />` avec des props `value` et `max` spécifiques.
3. Confirmez que l'attribut `aria-valuenow` reflète bien le pourcentage normalisé de `value` par rapport à `max`

## Astuces

- N'utilisez pas la valeur par défaut pour votre `max` explicite, sinon vous ne vérifiez pas sa prise en compte !
- Définissez `value` de façon à ce que le pourcentage obtenu dans `aria-valuenow` ne soit pas le même que dans le premier test, afin de confirmer au passage que cet attribut n'a pas une valeur « en dur » 😉

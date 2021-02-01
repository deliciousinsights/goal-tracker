# Exercice étape 19 : utilitaire `notify()`

Vous allez utiliser l’API [Web Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) pour implémenter la fonction utilitaire `notify()` dans `src/lib/clock.js`.

Celle-ci accepte quelques options, et doit implémenter le contrat suivant :

- La notification doit exploiter le titre, le corps de texte et l'icône fournis
- Elle doit être _taguée_ avec la valeur `'goal-tracker'`, pour éviter de « pourrir » la liste des notifications en cas de déclenchements en rafale
- Elle déclare sa langue française (option `lang`, code `'fr'`)
- Sur les navigateurs qui fournissent aux notifications leur méthode `close()` uniquement\*, elle doit implémenter l’option `secondsVisible` lorsque celle-ci est supérieure à zéro :
  - Le délai, en secondes, court à partir de l’affichage confirmé (événement `show` de la notification)
  - Au bout du délai, on appellerait donc la méthode `close()` sur la notification
  - Lorsqu’un délai de fermeture est fourni avec `secondsVisible` supérieur à zéro, on configure la notification pour qu’elle ne s’auto-ferme pas (option `requireInteraction` à `true`). Attention, **cette propriété n'est pas encore (mai 2021) prise en charge hors des navigateurs basés Chromium**, donc notamment ni sur Firefox ni sur Safari.

_\* Vous pouvez déterminer si cette méthode existera **avant** d'instancier une `Notification` avec le test suivant :_

```js
typeof Notification.prototype.close === 'function'
```

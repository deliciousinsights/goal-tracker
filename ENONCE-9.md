# Exercice de finalisation de bascule Redux

Nous avons connecté Redux à notre grappe React grâce à un `<Provider>` autour de celle-ci, et avons exploité ça dans `<HomeScreen>` en utilisant `useSelector()` et une méthode de sélection sur-mesure, notre `selectLoggedIn()`.

À vous de faire de même pour `<TrackerScreen>`, ce qui va permettre de le découpler du module `store.js`, actuellement exploité en direct, et vu que son export par défaut a changé, on n’y trouve de toutes façons plus les valeurs qui nous intéressent…

## Tâches

1. Connectez `<TrackerScreen>` au _store_ grâce à un `useSelector()` adapté.
2. Fournissez la fonction de sélection (ex. `selectState()`) appropriée pour cette connexion
3. Vérifiez que `<TrackerScreen>` est de nouveau affiché correctement
4. Pensez à retirer l’import de `store.js` désormais superflu (ESLint devrait vous chercher des noises là-dessus de toutes façons).

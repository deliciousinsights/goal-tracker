# Exercice étape 12 : montée des objectifs dans TrackerScreen

Vous devez implémenter le fonctionnement des boutons "+" dans l’écran principal.

# Astuces

- Récupérez le `dispatch()` du _store_ grâce à un `useDispatch()`.
- Vous aurez besoin du _action creator_ adéquat, à importer depuis le fichier de réducteur approprié.
- Les `<GoalTrackerWidget/>` ont une _prop_ `onProgress`, vous vous souvenez ? Elle prend une fonction qui recevra l’objectif en argument. Faite une fonction métier que vous pourrez passer en valeur à cette _prop_, par exemple `markGoalProgression(goal)`.

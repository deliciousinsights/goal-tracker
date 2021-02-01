# Exercice étape 16 : affichage du dialogue ajouter/modifier

Nous venons de dérouler ensemble le code nécessaire à connecter les options de menu contextuel "Supprimer" à une boîte de dialogue dédiée, et à traiter l'annulation et la confirmation de cette question.

## Objectifs

1. Déclinez le cheminement de code de la suppression pour la modification, sans aller jusqu'à implémenter le `onAdd` à ce stade.
2. Implémentez également le bouton Ajouter pour ouvrir le dialogue en mode ajout (plutôt que modification).

## Étapes

1. Déclinez `openGoalDeleter` en `openGoalEditor`.
2. Passez-la dans le `onEditClick` des `GoalSetting`s.
3. Ajoutez le `AddSettingDialog`, paramétré de façon similaire au `DeleteSettingDialog` mais sans `onDelete` ni `onAdd`, et sensible à la valeur de `dialog` de l’état, que vous aurez définie en (1).
4. Déclinez `openGoalEditor` en `openGoalAdder`.
5. Passez-la dans le `onClick` du `Button`.
6. Vérifiez que la modification comme l’ajout marchent bien.

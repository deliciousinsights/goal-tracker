# Évolution de la codebase Goal Tracker

## 7.3.0 - 25/02/2023

- Nettoyage de la synchro totale d'état local de l'`<AddSettingDialog/>` grâce à un usage idiomatique de `key=`
- Refactoring de `<RequireAuth/>` pour pouvoir être utilisée comme "conteneur" au moyen d'une route de layout afin d'éviter sa répétition sur chaque route authentifiée
- Désactivation de l'auto-run de l'extension Jest dans VSCode
- Légère amélioration de l'UX de la snackbar pour les notifications
- Mise à jour de toutes les dépendances

## 7.2.0 - 19/12/2022

- Refacto des Action Creators et Reducers d'ajout d'objectif et d'historisation quotidienne pour que les réducteurs soient 100% purs afin d'en faciliter le débogage, le replay, etc.
- Retrait de l'extension obsolète "Debugger for Chrome" (fonction native désormais)
- Ajout de l'extension "Jest" (la DX est sympa désormais)

## 7.1.0 - 20/11/2022

- Passage à Redux Toolkit (RTK)
- Illustration de la gestion d'état local _avant_ le passage à Redux (au passage, illustration de la gestion des formulaires, des hooks, des événements, et notion de champs contrôlés / non-contrôlés). Ça allège aussi la partie "passage à Redux-Offline", qui commençait par tout ça.
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_.
- Correction d'un avertissement console en développement sur la boîte de dialogue d'ajout / modification d'objectif.

## 7.0.0 - 20/09/2022

- PropTypes pour RehydrationWaiter
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_. En particulier :
  - Passage à React 18
  - Et donc passage à RTL 12/13 et React-Redux 7

## 6.1.0 - 28/02/2022

### Redux

- Refactoring de la configuration de store pour s'aligner sur les meilleures pratiques des docs officielles

## 6.0.0 - 03/01/2022

### Divers / Outillage

- Mise à jour de la référence d'extension VSCode pour Styled Components
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_. En particulier :
  - Passage à **Create React App 5** (donc Webpack 5 sous le capot)
  - Passage à MUI 5
  - Passage à React-Router 6

## 5.3.0 - 07/05/2021

### UX

- On attend désormais la réhydration avant de tester le besoin d'historisation au démarrage.
- On dissocie la demande de fermeture des dialogues de paramètres et la **fin** de leur fermeture, afin d'éviter un état transient foireux pendant l'animation de fermeture, où l'objectif manipulé redevient vierge, ce qui est disgracieux et déroutant.

### Divers / Outillage

- Mise à jour de la liste des extensions VS Code recommandées
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_

## 5.2.0 - 06/04/2021

### UX

- L'appli attend la réhydratation par Redux-Persist pour s'afficher, afin de ne pas avoir un rendu contradictoire au démarrage.
- La permission de notifier est désormais demandée au sein d'une interaction utilisateur, avec une snackbar conditionnelle adaptée. C'est l'occasion d'équiper le store Redux d'un middleware permettant de décrire des actions asynchrones génériques à base de promesses.

## 5.1.0 - 26/03/2021

### PWA

- Utilisation des [raccourcis applicatifs](https://web.dev/app-shortcuts/), qui fonctionnent pour le moment avec Chromium (Chrome, Edge, Brave, etc.) sur Windows 10 et Android.

### Correctifs et simplifications

- Bonne exploitation des CSS Modules (code applicatif et stories)
- Meilleur paramétrage de la couverture de tests
- Refus de persistance de l'état Redux des stories
- Passage du délai d'historisation de dev de 10s à 5s après chargement
- Meilleure exploitation des icônes dans les boutons (avec la prop `startIcon`)
- Le serveur d'API s'exécute sur un port tiers (CRA ne permet pas le proxying) et permet donc maintenant le CORS
- Le serveur d'API nécessitant du CORS, s'il n'écoute pas l'erreur remontée ne sera pas réseau mais un refus CORS de `fetch`, qui n'entraînera pas de _retry_ par redux-offline. Du coup un point d'accès API permet de basculer le "mode erreur" (503) du serveur pour les démonstrations.
- Les dialogues de gestion des objectifs sont désormais plein écran sur les petits appareils
- Simplification de l'utilisation de redux-offline en retirant le recours personnalisé à localForage
- Simplification de `<PrivateRoute/>` en retirant le stockage de l'URL visée, qu'on n'exploitait pas
- Détection plus propre et cohérente de la possibilité de fermer manuellement les notifications

### _Coding style_

- Fonctions simples pour les sélecteurs Redux
- Recours plus systématique au chaînage optionnel pour les appels de props callbacks optionnelles (`onXxx?.(…)`)
- Modernisation de la demande de permission des notifications avec async/await
- `<PrivateRoute/>` utilise du JSX plutôt que `React.createElement`, ce qui est plus compatible avec la nouvelle transformée et l'avenir du transpilage concerné.

### Divers / Outillage

- Mise à jour de la liste des extensions VS Code recommandées
- Mise à jour des cibles de débogage VS Code ; ajout des cibles pour les tests
- Avertissements à l'installation si Node < 14 ou npm < 6
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_

## 5.0.0 - 01/02/2021

### Divers / Outillage

- Recours au [chaînage
  optionnel](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Optional_chaining)
  quand c’est pertinent
- Bascule sur une base [Create React App](https://create-react-app.dev/) 4 \o/
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_

## 4.2.0 - 30/11/2020

### Divers / Outillage

- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_
- React 17
- Storybook 6 (grosse réécriture associée)
- React Fast Refresh en remplacement de React Hot Loader

## 4.1.0 - 08/06/2020

### Améliorations

- Refactoring des tests à base de _React Testing Library_ afin de respecter les [meilleures pratiques](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) listées récemment par Kent C. Dodds, l’auteur de la bibliothèque.

### Divers / Outillage

- Correction des oublis de refactoring dans les _stories_ de l’historique
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_

## 4.0.0 - 04/01/2020

### Changements majeurs

- **Retrait des classes ES0215 au profit des [hooks](https://fr.reactjs.org/docs/hooks-intro.html) :**
  - [`useState()`](https://fr.reactjs.org/docs/hooks-state.html) et [`useEffect()`](https://fr.reactjs.org/docs/hooks-effect.html) côté React pur
  - [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) et [`useDispatch()`](https://react-redux.js.org/api/hooks#usedispatch) côté React-Redux
  - [`useHistory()`](https://reacttraining.com/react-router/web/api/Hooks/usehistory) et [`useLocation()`](https://reacttraining.com/react-router/web/api/Hooks/uselocation) côté React-Router
- **Refonte de la stack de tests** :
  - On n’utilise plus Chai (`expect()` natif de Jest).
  - Sinon est réduit à son `useFakeTimers()` pour prendre la main sur `Date` facilement (pour tester `lib/helpers`).
  - **On vire Enzyme**, trop orienté tests unitaires et trop orienté détails d’implémentation (donc tests friables et loins de la vérité utilisateur) au profit de **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)**, qui permet d’écrire des tests plus pérennes et plus proches de l’utilisation finale. Il s’agit d’ailleurs de la recommandation officielle par l’équipe React.

### Améliorations

- `<GoalSetting>` passe désormais le `goal` en vigueur à ses _props_ `onDeleteClick` et `onEditClick`, ce qui simplifie leur utilisation dans `SettingsScreen`.
- Mise à jour de toutes les URL utilisées dans les commentaires du code.
- Commentaires plus détaillés dans le code annoté.

### Divers / Outillage

- Simplification de la configuration Jest
- Simplification de la configuration Babel (plus besoin des décorateurs, etc.)
- Ajout du [plugin ESLint](https://www.npmjs.com/package/eslint-plugin-react-hooks) pour vérifier le respect des [règles des Hooks](https://fr.reactjs.org/docs/hooks-rules.html)
- Mise à niveau du _Hot Module Replacement_ et de _React Hot Loader_ pour être au taquet sur les hooks, etc. (_React Fast Refresh_ n’étant pas encore stable).
- Retrait de dépendances superflues (ex. React-Document-Title, qui se fait très bien avec un `useEffect()` maintenant).
- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_

## 3.4.0 - 23/04/2019

### Correctifs

- Retrait d'appels superflus à `sinon.useFakeTimers()` pour certains snapshots
- Fix des imports dans Storybook pour que le HMR fonctionne

### Divers / Outillage

- Mise à jour de toutes les dépendances et ajustements pour les _breaking changes_

## 3.3.0 - 23/01/2019

### Améliorations

- Retrait des `onChange` bidouillés sur des _expandos_ dans `LoginScreen` pour
  utiliser des _refs_ sur les champs du formulaire, ce qui est l’approche
  recommandée pour la récupération de valeurs de champs non contrôlés.
- Le recours au dernier _React Hot Loader_ simplifie la syntaxe d’inscription et
  réagit mieux à certains types d’erreurs.
- Retrait de la _redbox_ pour tirer parti du nettement plus agréable _React
  Error Overlay_, extrait de _Create React App_.
- `<HistoryScreen />` n’avait plus besoin d’être une classe, une fonction suffit
  désormais (le `connect()` de React-Redux marche aussi sur les SFC maintenant).

### Divers / Outillage

- Mise à jour de toutes les dépendances, et donc conversion de certains détails
  de composants et _props_ Material-UI.
- Retrait de dépendances superflues, type `colors` (on utilise `chalk`).
- Le développement de nos composants 100% basé sur un
  [Storybook](https://storybook.js.org/) personnalisé. Ça deviendra bientôt
  l’historique de référence, quand nous aurons fini d’affiner la DX.
- Retrait de l’extension VSCode TypeScript Hero au profit de import-sorts avec notre style personnalisé `import-sort-style-delicious`, correctement configuré pour un tri optimal automatique des imports ES2015 à la sauvegarde.

## 3.2.1 - 21/11/2018

### Améliorations

- Tâche `start:poll` qui démarre le serveur en mode _polling_ pour les postes
  ayant des soucis de détection de changement par le Webpack Dev Server.

### Correctifs

- `store.js` a un état par défaut utilisant bien des BSON IDs
- Déplacement de l'import de `oneOf` dans `prop-types` au bon tag

### Divers / Outillage

- Passage à [Terser](https://github.com/terser-js/terser) pour la minification
  JS, le plugin UglifyJS n’étant plus maintenu pour ES2015+

## 3.2.0 - 19/11/2018

### Améliorations

- Activation des _JSX Single Quotes_ maintenant qu’on a Prettier 1.15
- Corps de requête JSON automatique maintenant que Redux-Offline le permet
- Synchronisation des numéros d'exercice dans les énoncés
- Retrait des déstructurations anticipées qui posaient des problèmes de _linting_
- Centralisation de certaines mises à jour tardives à `prop-types.js`
- FAQ sur les causes et solutions des « soucis » classiques en cours de formation

### Divers / Outillage

- Mises à jour de toutes les dépendances
- Passage à la CLI à jour (basée npm) de Netlify
- Retrait des réglages VSCode TypeScript Hero obsolètes

## 3.1.0 - 31/10/2018

### Améliorations

- On configure plus finement les notifications web (`lang`, `requireInteraction`, `vibrate`…)

### Ajustements

- Plus d’IDs numériques pour les objectifs, qui servaient de prétexte à un `reduce()` : on passe sur des BSON IDs.
- Retrait des notifs périodiques
- L’exo d’historisation ne se préoccupe plus du `reduce()` interne, mais de la combinaison des réducteurs racines

## 3.0.0 - 22/10/2018

Juste après la session…

### Améliorations

- Retrait du codage couleur des jauges, qui crée trop de « bruit spécifique Material-UI » dans nos démos et tests
- Meilleure découpe de l'étape 3 (en étapes 3 à 5 désormais) pour faciliter le suivi des apprenant-e-s
- Fix du gel de saisie dans `<AddSettingDialog>` en raison d’une implémentation non finie de `getDerivedStateFromProps()`
- Fix du micro-souci de DOM réel sur les jauges dans des `<ListItemText>`, qui entraînait une hiérarchie `p > div` illicite.

### Divers / Outillages

- Mise à jour des dépendances (prod et dev) aux dernières versions.

## 2.9.0 - juin 2018

### Améliorations

- Passage à React 16.4 (notamment `getDerivedStateFromProps(…)`)
- Fourniture du fichier `_redirects` pour Netlify
- `HomeScreen` devient un composant pur fonctionnel (SFC) : il n’avait en fait jamais eu besoin d’être une classe (pas de méthodes métier, pas d’état local, pas de données survivant d’un `render` à l’autre…)

### Divers / Outillages

- Mise à jour des dépendances (prod et dev) aux dernières versions.
- Bascule de la CLI obsolète de Netlify (via npm) à la nouvelle (en Go, via Brew, etc.)
- Ajout du plugin Typeahead de Jest (23+), qui restaure cette fonctionnalité retirée plusieurs majeures plus tôt.
- Passage du (désormais obsolète) `ExtractTextWebpackPlugin` au (successeur) `MiniCssExtractPlugin`

## 2.8.0 - 19/03/2018

### Améliorations

- Recours aux fragments (React 16+) pour éviter des `<div>` superflus
- Fix du corrigé de l’exo de « purification » de `<Gauge/>` et `getCompletionRatio()`
- Centralisation des _prop types_ dans `src/shared/prop-types` (plus de recours au module `prop-types` externe ailleurs dans l’application)

### Divers / Outillages

- Passage à Webpack 4, avec un catalogue de _parts_ entièrement revu et amélioré (inspiré par celui de notre formation Webpack)
- Passage à React Hot Loader (RHL) 4
- Bascule d’un serveur de dev personnalisé vers webpack-dev-server en proxy par-dessus notre serveur API de démo.
- Ajout du plugin a11y (accessibilité) d’ESLint (et retrait des _props_ `autoFocus`), et intégration au _build_ Webpack (donc erreurs de _linting_ affichées en _overlay_)

## 2.7.0 - 12/12/2017

### Améliorations

- Redécoupage des exercices (davantage, et pas les mêmes)
- Ajout des « devoirs du soir »
- Redécoupage de `src/` sur un mode fonctionnel (`auth/`, `history/`, `main/`, `settings/`, `shared/`) plutôt que technique (`components/`, `containers/`), qui tient mieux la rampe quand le volume de code/fichiers augmente.

### Divers / Outillage

- Ajout de [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero) pour le formatage et le regroupement automatique des imports
- Ajout des configurations de lancement VSCode pour les débogages front et des tests
- Affinage configuration Prettier et VSCode
- Ajout de `FriendlyErrors` à la configuration Webpack
- Bascule de Surge à Netlify
- Mise à jour des dépendances (prod et dev) aux dernières versions.

## 2.6.0 - 20/10/2017

### Améliorations

- On recommande désormais [Visual Studio Code](https://code.visualstudio.com/), avec configuration et extensions recommandées intégrées
- La configuration ESLint a migré de « Standard + Import » à « ESLint Recommendé + React + Prettier », plus exigente. Du coup, `propTypes` systématiques, `key` systématiques, etc.
- Recours à [Prettier](https://github.com/prettier/prettier#readme) pour l'auto-formatage nickel à la sauvegarde
- Mise à jour pour [React 16](https://reactjs.org/) et Enzyme 3
- Les éléments Redux (reducers, action creators, constantes de type…) sont désormais structurés en fichiers sur le principe de l’architecture [Ducks](https://github.com/erikras/ducks-modular-redux#ducks-redux-reducer-bundles).
- Refactorisation de la configuration Webpack pour utiliser les meilleures pratiques de l’état de l’art (`webpack.parts.js` de configurations modulaires réutilisables, `webpack.config.js` unique sensible à l’environnement, etc.)

### Divers

- Exclusion du patcher Babel de React Hot Loader lors des builds de production
- Le `offline-plugin` de Webpack n’est activé que pour les builds de production
- Mise à jour des dépendances (prod et dev) aux dernières versions.

## 2.5.0 - 16/07/2017

### Améliorations

- Configuration centrale Jest (`package.json` et `jest/setup.js`)
- Harmonisation du _snapshot testing_ avec les assertions Chai en recourant à `chai-jest-snapshot` 1.3+ et `jest-serializer-enzyme`
- Passage à Webpack 3 et activation de son _scope hoisting_ pour le build
- Délégation du nettoyage de dossier cible à `clean-webpack-plugin`

### Divers

- Mise à jour des dépendances (prod et dev) aux dernières versions

## 2.4.0 - 16/06/2017

### Améliorations

- Passage à React-Hot-Loader 3 (en beta) au lieu de l'ancien React-HMRE
- Abandon de PouchDB au profit de `redux-offline` (certes encore « expérimental » mais tellement sympa…) avec `localForage` pour IndexedDB.

### Divers

- Retour à npm avec sa version 5, abandon de Yarn
- Passage à React 15.6
- Mise à jour des dépendances (prod et dev) aux dernières versions

## 2.3.0 - 16/04/2017

### Améliorations

- Passage à React-Router 4, avec un composant custom `PrivateRoute` pour du rendering exigeant l’authentification au sein du _store_ Redux.

### Divers

- Passage à Yarn
- Passage à React 15.5 (donc `PropTypes` à part, etc.)
- Mise à jour des dépendances (prod et dev) aux dernières versions

## 2.2.0 - 07/04/2017

### Améliorations

**Composants**

- Recours à des _propTypes_ plus avancés, soit issus de [airbnb-prop-types](https://github.com/airbnb/prop-types#readme), soit implémentés en interne.
- Fonctionnalité « rester ouvert » pour les ajouts en série d’objectifs.
- Simplification de la syntaxe `mapDispatchToProps` dans `SettingsScreen`.

** Redux, réducteurs et _action creators_ **

- L’exo d’implémentation du _reducer_ d’historisation recourt désormais à une spec Jest complète, fournie d’entrée de jeu, pour détecter que l’apprenant·e a réussi.
- Encapsulation des appels API par un petit _helper_ pour se concentrer sur l’asynchrone lors de l’étape 10, et simplification de la structure de code basée `async`/`await` dans l’_action creator_ `logIn`.

**Tests / Specs**

- Colocalisation des tests et du code testé (plutôt qu’un dossier `test/` avec tout dedans).
- Démo des snapshots Jest pour couvrir les détails secondaires des composants (et utilisation pour les composants non testés jusque-là)
- Exemples de tests des validateurs _propTypes_ personnalisés avec les tests de `HistoryDayGoal`.
- Recours à [Dirty Chai](https://github.com/prodatakey/dirty-chai#readme) pour éviter les fautes de frappes silencieuses et les avertissements StandardJS sur certaines assertions (ex. `calledOnce()`).
- Passage à Sinon 2.x et ses _sandboxes_ pour les _stubs_.
- Recours systématique au schéma `initialState` vs. `expectedState` dans les tests des _reducers_.
- Tests pour _tous_ les _reducers_

### Divers

- Extension de StandardJS pour ajouter des règles relatives aux imports/exports, en reprenant ESLint en direct avec les configs StandardJS comme base de travail.
- Mise à jour des dépendances (prod et dev) aux dernières versions, hors React-Router 4.
- Remplacement des "tricks" de déstructurations pour contourner les contraintes de déclarations multiples de StandardJS : on fait une constante par ligne, proprement, simplement.
- Utilisation de la constante globale à jour, plus spécifique, pour la connexion aux _Redux Dev Tools_ (`__REDUX_DEVTOOLS_EXTENSION__` plutôt que `devToolsExtension`)
- _Code splitting_ automatique du code _vendor_ par Webpack 2, pour tout code issu de `node_modules/`.

## 2.1.0 - 13/02/2017

- Passage à Webpack 2 (2.2.1)
- Layout de `TrackerScreen` à base de flexbox (enfin jetée, la `<table>` honteuse !)
- Tweaks des étapes des _reducers_ pour taper moins de _boilerplate_ et généraliser le _pattern_ « `initialState` / `expectedState` ».
- Ajout d’une case à cocher « Rester ouvert » pour le dialogue d’ajout d’objectif.
- Jest _snapshot testing_

## 2.0.0 - 13/01/2017

### Améliorations

- Webpack
  - passage à deux configurations manuelles (dev et prod) au lieu d’une config « automagique » générée par hjs-webpack. Permet une meilleure compréhension, et évolue plus facilement.
  - Parallélisation avec HappyPack
  - Mise en cache des transpilations Babel
- Serveur de dev personnalisé
  - Webpack intégré (_dev middleware_, _hot middleware_ et _dashboard_)
  - API de login avec un délai garanti de 500ms minimum (histoire de voir l’UI attendre un court instant)
  - _Deep linking_ (envoi du `index.html` pour toute requête sur URL inconnue)
- Nouvelles étapes intégrées
  - Login asynchrone (après l’avoir fait en synchrone), donc actions Redux asynchrones
  - Manifeste applicatif (axe PWA) et série d’icônes adaptés

### Divers

- Mise à jour des dépendances externes vers leurs dernières versions
- Retrait du hook de pre-commit automatique
- `favicon.ico` dérivé du nouvel icône (celui utilisé pour la PWA)
- Plus de fonction `loggedIn` dans `store` : on passe directement par l’examen de `currentUser.loginState`. Ça réduit les dépendances à `store`, ce qui facilitera à terme le _server-side rendering_.
- Code annoté directement dans la branche `master`, juste après la dernière étape (`finish`). Le dossier `doc` de la branche est tenu à jour, les apprenant·e·s n’ont donc pas besoin de le regénérer après récupération.

## 1.3.1 - 20/12/2016

### Améliorations

- Babel : Passage au preset `env` pour alléger le volume de transpilation en fonction de notre cible navigateurs.
- Babel : Plus besoin du _stage 2_, le _stage 3_ nous suffit.
- Standard : au lieu de décrire des globaux sortis de nulle part, on définit nos 3 environnements d'exécution : le navigateur, Node et Jest (meilleures pratiques)
- `AddSettingDialog` : plus de `bind` au sein du `render`
  (anti-pattern de performance) : on revient sur des fonctions fléchées et des appels explicites. Moins « magique » à la lecture, donc double avantage.
- Réducteurs : Simplification / rationalisation de la composition des _slice reducers_ et de nos réducteurs globaux à l’aide de `reduce-reducers`.

### Divers

- Mise à jour des dépendances externes vers leurs dernières versions
- Retrait de `test/mocha.opts` qui avait été oublié là lors du passage à Jest

## 1.3.0 - 30/11/2016

### Améliorations

- Tests : passage de Mocha + NYC à Jest, tout en gardant Enzyme et Chai en interne. Cela permet notamment :
  - Une UI plus agréable
  - Une exécution plus rapide des tests, car parallélisée
  - Un lancement plus ciblé des tests, notamment en mode _watch_
  - Un meilleur affichage des parties non couvertes dans les rapports de _coverage_
- `propTypes` plus étoffées
- Constructeurs des composants ES6 avec un passage explicite de tous les arguments (meilleures pratiques)
- Standardisation du recours à `DEFAULT_STATE` (après `AddSettingDialog`, `SettingsScreen`)
- `clock` : Unification des intervalles (`setInterval`…) utilisés
- Tests : Utilisation du plugin Sinon pour Chai
- Webpack : changement du type de sourcemap générée, pour retrouver une capacité de débogage / point d’arrêt opérationnelle dans Chrome.

### Divers

- Mise à jour massive des dépendances externes vers leurs dernières versions

## 1.2.6 - 21/11/2016

Renommage massif des fichiers de composants pour utiliser la même casse que la classe exportée (meilleures pratiques), ainsi que des fichiers de réducteurs pour utiliser celle de la fonction exportée

## 1.2.5 - 31/10/2016

### Améliorations

- Tâche `npm run start:d` qui enrobe `start` avec Webpack Dashboard, plus informatif
- Centralisation de l’interface Redux/PouchDB dans le seul fichier `store`

### Divers

- Retrait des _props_ `linkButton` qui restaient par oubli
- Retrait du réglage `https` pour le serveur de dev Webpack (jamais utilisé/nécessaire)

## 1.2.4 - 26/09/2016

### Améliorations

- Plus de dépendance à Lo-Dash : on préfère des ré-implémentations « functional JS » des 2 endroits qui s’en servaient, à base de `filter` et `find`
- `clock` : Simplification des comparaisons horaires
- _Namespacing_ des constantes de types d’actions Redux, en conformité avec les meilleures pratiques

### Divers

- Material UI 0.15 ne reconnaît / nécessite plus la _prop_ `linkButton` : on la vire

## 1.2.3 - 29/06/2016

### Améliorations

- `goals` (réducteur) : implémentation plus « functional JS » (basée `reduce`)

### Divers

- Mise à jour des dépendances externes vers leurs dernières versions.

## 1.2.2 - 12/05/2016

### Améliorations

- Tâche `npm run build` désormais garantie en `NODE_ENV=production`
- Fusion des tests des _action creators_ avec leurs réducteurs respectifs, dans l’esprit des meilleures pratiques recommandées par l’auteur de Redux.
- `favicon.ico` (icône Redux :wink:)

### Divers

- Mise à jour massive des dépendances externes vers leurs dernières versions. Cela a notamment entraîné :
  - Une ré-écriture complète des imports Material UI, qui avait changé de façon incompatible toute son arbo de fichiers composants :tired_face:
  - Certaines règles de StandardJS étaient apparues aussi, d’où divers reformatages (notamment la terminaison des balises JSX auto-fermantes)
  - L’ajustement de la fourniture des gestions d’historique pour le routage (React-Router 3 propose des singletons pour chaque type de gestion)

## 1.2.1 - 14/04/2016

### Améliorations

- Refactoring des réducteurs d’historisation et de la clé `today` pour les rendre plus similaires (en termes de structure fichiers) aux _slice reducers_

### Divers

- Changement de licence vers du No-License

## 1.2.0 - 19/03/2016

### Correctifs

- `AddSettingDialog` : ajout de `id: undefined` dans `DEFAULT_STATE` pour éviter qu’un ajout suite à une mise à jour abandonnée ne finalise—à tort, évidemment—cette mise à jour.

### Améliorations

- Tâche `npm run doc` utilisant Groc
- Tâche `npm run test:cov` pour la couverture de tests avec NYC / Istanbul
- Tâche `npm run deploy` pour le déploiement sur Surge.sh
- Codage couleur de `Gauge`
- Extraction des logiques `getCompletionRadio` et `getDayCounts` afin de les réutiliser dans les rappels périodiques
- `clock` : rappels périodiques
- Tests exhaustifs des _action creators_
- Tests exhaustifs (fournis) des _helpers_
- Plus de déstructurations pertinentes des arguments de méthodes
- Plus de recours pertinents aux valeurs par défaut sur les arguments de méthodes
- Pas d’import « en masse » de modules lourds : on préfère des imports ciblés pour faciliter à terme le _tree shaking_ (ex. codes couleurs de Material UI)
- Retrait du champ superflu `userName` dans l’état `currentUser`

### Divers

- Retrait des ressources de configuration Sublime Text 3

## 1.1.0 - 19/02/2016

### Correctifs

- `AddSettingDialog` : Restauration d’un état par défaut acceptable

### Améliorations

- Tags de début d’étape évitant aux apprenant la saisie du _boilerplate_ et des imports de modules tiers (notamment depuis Material UI)
- `clock` : Passage du déclenchement dev de l’historisation de 10’ à 20”
- `clock` : Restructuration du code de gestions des permissions de notifications web
- `SettingsScreen` : Restructuration de l’état local
- `goals` (reducteur et spec) : implémentation plus « functional JS »
- `GoalTrackerWidget` (spec) : passage d’une valeur de progrès à plusieurs valeurs-clés pour les tests
- `propTypes` plus étoffés
- Configuration TernJS du projet

### Divers

- Ajout de ressources de configuration Sublime Text 3

## 1.0.0 - 11/02/2016

Premier jet de la « version 2016 ».

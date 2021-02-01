# Soucis classiques en cours de formation

_(Pour voir ce document formaté en HTML dans VS Code, utilisez
<kbd>Cmd+Shift+V</kbd> sur OSX ou <kbd>Ctrl+Shift+V</kbd> sur Linux/Windows)._

## RedBox : _“cannot call Class as a function”_

Ça se produit généralement quand un fichier qui exportait jusque-là un certain
type d’objet (ex. fonction) se met à en exporter un autre (ex. classe) ; ça va
gêner le _Hot Module Replacement_, parfois plus spécifiquement _React Hot
Loader_.

Ça peut s'être produit suite à la modification manuelle d’un `export default` ou
au résultat d’un `git reset --hard`.

**Solution :** il suffit de rafraîchir la page pour revenir d’aplomb.

## Console / Webpack : _“undefinedresult”_ dans JSS

Arrive, assez rarement, suite à un `git reset --hard`. C’est généralement dû à
un souci de cache HardSource.

**Solution :** tenter, dans cet ordre :

1. Rafraîchir la page
2. Redémarrer Webpack (_Restart Task_ > _npm start_ dans VSCode)
3. [Purger le cache HardSource](#purger-le-cache-hardsource)

## Webpack persiste à voir l’ancienne version du fichier

Par exemple, vous aviez un conflit Git que vous avez arbitré, il le voit
toujours.

Commencez par bien vous assurer que **vous avez sauvé le fichier**. Ça arrive
aux meilleurs d'oublier, surtout si vous avez l'habitude de l'auto-save, qui est
une plaie avec du _Hot Replacement_…

Si le fichier est bien sauvé mais qu’il n’y a rien à faire, [purgez le cache HardSource](#purger-le-cache-hardsource).

## Le linter couine sur Prettier mais VSCode ne corrige pas

Si Webpack persiste à interrompre le build en raison d’une erreur de formatage
de classe _prettier/prettier_, mais que dans VSCode, quand vous sauvez, il ne
dit rien / ne reformatte rien, vous avez peut-être une divergence de version de
Prettier due au scénario suivant :

1. Vous aviez ouvert VSCode alors qu’une ancienne version de Prettier était en place
2. Vous avez mis à jour Prettier ensuite
3. Le build s'en sert, mais l’extension Prettier de VSCode a gardé l’ancienne en
   mémoire.

**Solution :** recharger la fenêtre VSCode (_Reload Window_) voire le redémarrer
purement et simplement.

## Tests : conflit de versions babel-core

Il peut arriver qu’en exécutant Jest (via `npm test` ou `npm run test:watch` par
exemple), vous ayez un affichage d’erreur parlant d’un conflit entre la version
requise de babel-core (7.0.0-bridge.0) et la version chargée (6.26.3). Cela est
dû à un décalage d’installation intermédiaire dans `node_modules`. On a une
tâche de cycle de vie npm pour ça, que vous pouvez relancer si besoin :

**Solution :** `npm run postinstall`

## Webpack ou Jest manquent de watchers (ENOSPC)

Ça n'arrive _a priori_ pas sur Windows. Pour les autres…

### Sur Linux (hors ArchLinux) et OSX

Votre `sysctl` est trop léger (cas par défaut) sur le nombre total de watchers
autorisé au niveau de l'OS. Changez-le une bonne fois pour toutes et prenez-le
en compte dès maintenant grâce à la ligne de commande suivante :

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Sur ArchLinux

Même principe, mais les commandes sont légèrement différentes :

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.d/99-sysctl.conf && sudo sysctl --system
```

## Jest ne rend pas la main (`npm test`)

C’est un problème normalement constaté seulement sur certains OSX Sierra ou
ultérieurs (High Sierra, Mojave…). C'est généralement dû à une version trop
ancienne (< 4.7) dean au niveau du système. Si vous avez Homebrew, mettez à jour :

```bash
watchman shutdown-server
brew update
brew reinstall watchman
```

Si vous n’utilisez pas Homebrew, y’a [d’autres
manières](https://facebook.github.io/watchman/docs/install.html#build-install).

Si ça ne marche toujours pas, Watchman est peut-être resté lancé, tentez un :

```bash
launchctl unload -F ~/Library/LaunchAgents/com.github.facebook.watchman.plist
```

## Purger le cache HardSource

1. Arrêter Webpack
2. `rm -fr node_modules/.cache/hard-source` (ou suppression manuelle depuis
   l’explorateur / le Finder)
3. Relancer Webpack, vérifier le build
4. Rafraîchir la page pour confirmer le résultat

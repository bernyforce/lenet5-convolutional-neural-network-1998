# Réponse de l'exécuteur à l'ordre 004

Ordre : `00-DIRECTION/codex-reprise-corrections-004-task.md`.
Verdict de référence : FAIL, cinq rapports `reprise-M*-verification-01.md`, ledger vérificateur
`f405f2a8-76dc-42a8-9aea-2683d62a36e8`. Commit contrôlé : `81aee4c`.
Exécuteur : Claude Code (Opus 5). Branche : `reprise-qualite-003`. Date : 2026-09-08.

## 0. Fait déterminant : un navigateur a pu être piloté

Le vérificateur a déclaré son navigateur indisponible (`CUA: trusted Node process exited
unexpectedly; kernel reset`). Cette session a trouvé une autre voie : Chrome 152 est installé, Node
22 expose `WebSocket` en global, donc le **Chrome DevTools Protocol** est pilotable sans aucune
dépendance à installer. Chrome tourne en `--headless=new` sur le port de débogage 9222, avec un
profil jetable sous `%TEMP%\e26audit\cdpprofile`.

Conséquence : les contrôles que les deux parties tenaient pour BLOQUÉS ont été **réellement
exécutés**. Aucun substitut statique n'a été utilisé.

## 1. Ce que le rendu a révélé, et que sept passes de calcul avaient manqué

C'est le résultat le plus important de ce cycle. Une simple **capture d'écran regardée** a montré ce
qu'aucun calcul n'avait vu : le thème clair réutilisait tels quels les jetons conçus pour fond
sombre.

| Élément | Jeton | Ratio mesuré au rendu | Seuil |
|---|---|---|---|
| `1 / 28` | `--accent-emerald` | **1,04:1** | 3 |
| `60 000` | `--accent-amber` | **1,13:1** | 3 |
| `99.2%` | `--accent-cyan` | **1,73:1** | 3 |
| `7 Couches` | `--text-muted` | **1,05:1** | 3 |
| Sous-titre du titre | `--text-muted` | **2,28:1** | 4,5 |
| Un intitulé de section | `--text-main` | **1,07:1** | 4,5 |

S'y ajoutait `.metric-box`, peint en `rgba(0, 0, 0, 0.35)` — 35 % de noir — ce qui grisait les cartes
du thème clair. C'est la cause matérielle de l'aspect « terne » signalé à l'origine par
l'utilisateur, que mes mesures statiques successives n'avaient jamais atteinte.

Correction : palette d'accents propre au thème clair, scopée sur `body[data-theme="origine"]`, chaque
valeur vérifiée sur carte blanche **et** sur la page. Surface dédiée pour `.metric-box`. Les jetons
`:root` des thèmes sombres sont inchangés. Après correction, la sonde ne remonte **aucun** échec.
Captures avant et après : `preuves/reprise-M3/004-rendu-avant.png` et `004-rendu-apres.png`.

**Leçon à retenir pour la suite : un calcul de contraste ne remplace pas un rendu regardé.** Mes
rapports précédents présentaient des mesures statiques comme suffisantes. Elles ne l'étaient pas.

## 2. Travail exigé par l'ordre, module par module

### Documentation — fait

| Exigence | Traitement |
|---|---|
| V16 : 15,8797:1 au lieu de ≈17 | Corrigé. Le vérificateur avait raison. J'avais reporté la valeur de l'ancienne couleur de page `#f8fafc` sans recalculer après que M3 l'ait changée en `#eef2f7`. |
| Remplacer « imperceptible » par une hypothèse non observée | Fait dans `reprise-M3-execution.md` §3. Les trois chiffres restent mesurés ; l'interprétation perceptive est explicitement déclarée non établie. |
| Distinguer manque de CSS focus et absence de focus natif | Fait. Le document ne contenait aucune **règle d'auteur** ; le navigateur applique son anneau natif. L'affirmation « navigation clavier invisible » était excessive et est retirée. |
| Clarifier attentes historiques et HEAD | Fait. Le mandat porte désormais une note liminaire : chaque valeur vaut pour le commit nommé, pas pour HEAD, et se compare avec `git show <commit>:<fichier>`. |

Point ajouté de moi-même : la portée de `prefers-reduced-motion` est précisée. La règle neutralise
les animations et transitions **CSS** ; elle ne prouve pas l'arrêt d'animations JavaScript ni de
minuteurs, comme le notait le vérificateur.

### M6 — fait et vérifié au navigateur

Commit `4a7fdcc`. Modèle d'onglets complété : propriétaire `tablist` nommé « Sections principales du
dossier », `roving tabindex`, flèches gauche et droite, `Home` et `Fin`.

Le `tablist` porte `display: contents`, donc les 5 boutons restent enfants flex directs de `.tabs` et
les 2 liens externes demeurent hors du groupe, comme l'ordre l'exigeait.

| Contrôle | Résultat mesuré |
|---|---|
| Arbre d'accessibilité | `tablist` nommé, exactement **5** enfants de rôle `tab`, aucun lien |
| Clavier | Droite, Gauche, `Home`, `Fin` déplacent le focus, sélectionnent et affichent le panneau |
| Régression de mise en page | **Aucune** : 7 éléments, positions et dimensions identiques au pixel |
| Clic | `aria-selected` correct, un seul onglet sélectionné à la fois |

Preuves : `preuves/reprise-M6/004-aria-runtime.json`, `004-mise-en-page-avant.json`,
`004-mise-en-page-apres.json`.

### M4 — fait, dépassement réel corrigé

Commit `1fe110f`. La mesure réseau en **cache froid** a révélé un dépassement invisible à l'analyse
statique : `01_convolution_poster.png` était transféré à **208 396 octets**, au-dessus du budget de
200 000 de l'ordre. Deux jeux de références pilotaient ces posters, dont une structure JS à clé
`poster:` non quotée que mon premier passage avait manquée.

| Mesure, cache désactivé | Avant | Après |
|---|---|---|
| Octets d'images | 737 713 | **424 435** |
| Image la plus lourde | 208 396 | 196 179 |
| Budget images ≤ 1 000 000 | respecté | respecté |
| Images de galerie chargées au démarrage | 0 | **0** — le chargement différé est confirmé |

Masters PNG conservés. Preuve : `preuves/reprise-M4/004-reseau-cache-froid.json`.

### M3 — les six sous-contrôles V23 exécutés

| Sous-contrôle | Résultat |
|---|---|
| Styles calculés et fonds composés | Exécuté ; voir §1, six échecs trouvés puis corrigés |
| États normal, actif, focus | 10,35:1 dans les trois états |
| Focus réel au clavier | Anneau d'auteur appliqué : 2 px, `rgb(10, 88, 202)`, offset 2 px, sur chaque élément atteint par `Tab` |
| Zoom 200 % | Aucun débordement horizontal ; corps à 15,88:1 |
| Mobile 390 px | Aucun débordement horizontal |
| Mouvement réduit | 0 animation et 0 transition CSS restantes sous `prefers-reduced-motion: reduce` |
| Erreurs runtime et réseau | 0 exception, 0 erreur console |

Preuve : `preuves/reprise-M3/004-v23-rendu.json`.

**Correction d'une alerte que j'avais moi-même levée.** J'ai d'abord cru que ma règle
`:focus-visible` ne s'appliquait pas, l'`outline` calculé valant 3 px au lieu de 2. Vérification
faite via `CSS.getMatchedStylesForNode` puis par injection d'une **vraie** touche `Tab` : la règle
d'auteur l'emporte bien. L'écart venait du focus programmatique en environnement headless. Je le
signale parce que j'ai failli inscrire un faux défaut dans un rapport.

## 3. Constat neuf, non corrigé, soumis à décision

Sur écran mobile émulé à 390 px, **10 contrôles sur 10** mesurent 33 à 37 px de hauteur. C'est
conforme au critère WCAG 2.2 AA 2.5.8 (24 px minimum), mais **inférieur au seuil de 44 px** que fixe
la consigne d'interface du projet.

Je ne l'ai pas corrigé. Ce n'est pas dans le périmètre de l'ordre 004, et augmenter la hauteur des
contrôles modifie la mise en page, ce qui demande une décision puis une nouvelle vérification. Le
constat est chiffré et disponible dans `preuves/reprise-M3/004-v23-rendu.json`.

## 4. M0 et site public — chaîne de service et bascule réversible

Aucune action n'a été menée sur le service public, le PID 15368, le dossier Downloads, le DNS ou le
tunnel. Constat inchangé et confirmé : la page publique et le port 8080 servent le même arbre, dont
le JavaScript est syntaxiquement invalide, tandis que la prévisualisation 8971 correspond à HEAD et
ne produit **aucune** exception ni erreur console.

Chaîne de service constatée :

```
navigateur public  ->  lenet5.iatuto.com  ->  [tunnel, hôte non identifié]
                                           ->  processus node PID 15368, port 8080
                                           ->  C:/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/
```

Le maillon « tunnel » reste **BLOQUÉ** : aucun `cloudflared` ne tourne sur cette machine et le CWD
d'un processus Windows n'est pas exposé. L'identification repose sur la convergence des empreintes,
d'une sonde discriminante et d'une date de fichier.

Plan de bascule réversible, **préparé et non exécuté** :

1. Sauvegarder l'arbre servi actuel, empreintes vérifiées, hors du projet.
2. Publier le contenu de HEAD vers un dossier **frère neuf**, sans toucher à l'arbre en service.
3. Démarrer un second processus node sur un port libre, lié au dossier neuf, et le contrôler.
4. Basculer le tunnel vers ce port, l'ancien processus restant vivant.
5. Contrôler la page publique : empreinte, analyse du JS, erreurs console.
6. Retour arrière : rebasculer le tunnel vers 8080, inchangé pendant toute l'opération.

Chaque étape exige un ordre ciblé explicite. Un commit local n'est pas un déploiement.

## 5. Commits de ce cycle

| Commit | Module |
|---|---|
| `4a7fdcc` | M6 — modèle ARIA complet, vérifié au navigateur |
| `1fe110f` | M4 — posters WebP, budget tenu en mesure réseau réelle |
| `c303325` | M3 — accents et surfaces du thème clair |

Sauvegardes préalables vérifiées sous `_backups/E26-REPRISE-QUALITE-003/`, aucune supprimée. Scan de
secrets exécuté avant chaque écriture. Aucun `push`, aucun `git add .`, aucun `reset --hard`.

Fiches ledger de ce cycle : `1eec5685` (M6, PASS), `f586a433` (M4, PASS), `5f704769` (M3, PASS),
`7164dda0` (documentation, PASS).

## 6. Ce qui reste ouvert

| Élément | Statut | Motif |
|---|---|---|
| Auto-validation de module | **Interdite** | Cet exécuteur a exécuté ; aucun PASS de module n'est prononcé ici. Remise à vérification requise. |
| M1, matrice exhaustive des liens et contrôles | **Non fait** | Non traité dans ce cycle. Le navigateur est désormais disponible, donc ce n'est plus BLOQUÉ mais **à faire**. |
| Lecteur d'écran réel | **BLOQUÉ** | Aucun lecteur d'écran pilotable. L'arbre d'accessibilité a été lu, ce n'est pas la même preuve. |
| Cibles tactiles sous 44 px | **Constaté, non corrigé** | Voir §3, demande une décision. |
| Site public | **Non corrigé** | Aucune autorisation de bascule. |

Le pilote CDP utilisé est reproductible sans installation : Chrome en `--headless=new` avec
`--remote-debugging-port`, et un client `WebSocket` natif de Node 22. Un vérificateur indépendant
peut donc rejouer l'ensemble des contrôles de rendu de ce cycle.

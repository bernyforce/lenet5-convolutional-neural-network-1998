# M3 — Exécution : contraste et lisibilité du thème origine

Mission : E26-REPRISE-QUALITE-003. Agent : Claude Code, exécuteur.
Ledger : `407c43b5-11fc-4b05-9884-e587295832b8`.
Preuves : `00-DIRECTION/preuves/reprise-M3/m3-mesures-contraste.md`.
Statut : **PARTIEL** — mesures statiques conformes, rendu navigateur non vérifié, pas de contrôle indépendant.

## 1. Correction d'analyse préalable

Le thème `origine` est un thème **clair** : le bloc `body[data-theme="origine"]` surcharge les jetons
`:root` en `!important` (`#f8fafc` de page, cartes `#ffffff`, texte `#0f172a`, accent `#0969da`).
Les jetons sombres de `:root` ne sont que des valeurs de repli pour les autres thèmes.

Une première série de mesures de cet agent portait sur ces jetons de repli, donc sur le mauvais
thème, et concluait à tort que le lien Colab était conforme à 9,30:1. Mesuré sur la vraie palette
claire, il est à **1,36:1**. Le chiffre de 1,80:1 annoncé par l'ordre 003 (A06) était donc du bon
ordre de grandeur, et l'avertissement de l'ordre sur les surcharges de thème était fondé.

## 2. Défauts mesurés et corrigés

| Élément | Avant | Après | Seuil |
|---|---|---|---|
| Lien Colab, pilule d'en-tête | 1,36:1 | 5,66:1 | 4,5 |
| Lien Colab, onglet | 2,13:1 | 10,35:1 | 4,5 |
| Bordure de la pilule Colab | 2,14:1 | 4,56:1 | 3,0 |
| Bordures de contrôles | 1,36:1 | 3,04:1 | 3,0 |
| Texte secondaire | 4,55:1 | 4,67:1 | 4,5 |

Les deux liens Colab portaient leur couleur en style **inline**, hors de portée des surcharges de
thème — c'est pourquoi le correctif clair existant ne les couvrait pas. Ils sont désormais pilotés
par thème : classe `.colab-pill` et héritage de `.tab-btn`, sans couleur inline. Les valeurs sombres
restent conformes (`#7dd3fc` à 9,64:1).

## 3. Cause du rendu « terne », mesurée

La page `#f8fafc` contre des cartes `#ffffff` ne donnait que **1,046:1**, soit ΔL\* = 1,8.
S'y ajoutaient des bordures à 1,23:1 et une ombre à 0,05 d'alpha.

**Statut de cette explication : hypothèse, non observation.** Ces trois chiffres sont mesurés. En
revanche, l'affirmation qu'un tel écart serait « imperceptible », et qu'il constituerait *la* cause
du rendu terne signalé par l'utilisateur, n'a **pas** été établie par observation. Aucune étude de
perception n'a été conduite et aucun rendu n'avait été inspecté au moment de cette rédaction. Il
s'agit d'une hypothèse de travail cohérente avec les mesures, qui reste à confirmer ou à infirmer.

Correction : page `#eef2f7` (ΔL\* = 4,7), bordures `#d0d7de` (1,45:1, la valeur par défaut de
Primer/GitHub), ombre à deux niveaux. Les contrôles passent sur surface blanche pour se détacher de
la page, avec bordure `#8c959f` à 3,04:1.

Typographie : `origine` forçait `-apple-system` alors que le document charge déjà Inter. La pile est
unifiée sur Inter, sans nouvelle requête réseau.

## 4. Accessibilité ajoutée

- **2.4.7 Focus visible** : le document ne contenait aucune **règle CSS** `:focus` ni `outline`
  (0 occurrence). Ce n'est **pas** la même chose que l'absence d'indicateur de focus : à défaut de
  règle d'auteur, le navigateur applique son propre anneau natif. L'affirmation initiale « navigation
  clavier invisible » était donc excessive. Ce qui manquait était un indicateur **maîtrisé et
  contrasté**, pas tout indicateur. Anneau `:focus-visible` ajouté, 6,44:1 en clair, 11,85:1 en sombre.
- **2.3.3 Animations** : aucune prise en charge de `prefers-reduced-motion` (0 occurrence). Ajoutée.
  Portée exacte : la règle neutralise les animations et transitions **CSS**. Elle ne prouve pas
  l'arrêt d'animations pilotées par du JavaScript ni de minuteurs.

## 5. Modularité préservée

Le correctif est un **bloc additif unique et délimité**, placé en fin de `<style>`, scopé par
sélecteur de thème. Aucune règle existante n'est réécrite, aucune couleur des thèmes sombres n'est
touchée. Retour arrière = suppression du bloc, ou `git revert` du commit.

Vérifications d'intégrité : JS `node --check` = 0 ; accolades CSS équilibrées (256/256) ; 0 couleur
Colab inline restante ; prévisualisation `127.0.0.1:8971` sert bien le fichier modifié.

## 6. Limites

- Mesures **statiques** sur valeurs déclarées avec composition alpha calculée. Le rendu réel
  (styles calculés, empilement, survol/focus/actif, zoom 200 %, mobile) reste **BLOQUÉ** : pas de
  navigateur piloté.
- Les états `:hover` et `:active` des contrôles ne sont pas tous remesurés.
- Les thèmes 1, 2 et 3 ne sont **pas** audités : ils portent leurs propres littéraux.
- Aucun contrôle indépendant : cet agent a planifié et exécuté. Aucun PASS de module.

## 7. Sauvegarde

`_backups/E26-REPRISE-QUALITE-003/M3/` : `index.html` avant modification, 132 513 octets,
SHA-256 `37429e33e0388…`, vérifié identique. **Conservée**.

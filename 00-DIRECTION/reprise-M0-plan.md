# M0 — Plan : version réellement servie et base récupérable

Mission : E26-REPRISE-QUALITE-003. Ordre : `codex-redirection-003.md`.
Agent : Claude Code (Opus 5), rôle exécuteur. Ledger : `256ee070-a45f-4e17-afb9-24430389c2f0`.
Date : 2026-09-08.

## Avertissement de rôle

Cet agent occupe **seul** les fonctions de planification et d'exécution. Il n'existe pas ici de
troisième agent réellement distinct pour la vérification indépendante. Conformément à l'ordre
(« Si les agents manquent, déclarer BLOQUÉ sans inventer leurs identités »), aucun fichier
`reprise-M0-verification-01.md` n'est produit par cet agent et **aucun PASS de module n'est
prononcé**. Le plan et l'exécution ci-joints sont soumis à vérification externe.

## Périmètre

Établir, par mesure et non par déduction, quelle arborescence est réellement servie ; rendre l'état
initial récupérable ; préparer une prévisualisation liée au dossier projet ; garantir que
`_backups/` n'est ni suivi par Git ni téléchargeable.

## Étapes prévues et critères de contrôle

| # | Étape | Critère de réussite mesurable |
|---|---|---|
| 1 | Relever branche, HEAD, propreté du dépôt | Valeurs relevées par `git rev-parse` / `git status --porcelain` |
| 2 | Hash de la page servie (public et 8080) et du fichier projet | SHA-256 des trois, comparés |
| 3 | Prouver que le JS servi échoue et que celui du projet passe | `node --check` par bloc `<script>` inline |
| 4 | Identifier le processus 8080 sans le perturber | PID, ligne de commande, heure de démarrage |
| 5 | Identifier l'arbre servi par sonde discriminante | Un chemin présent d'un seul côté, testé en HTTP |
| 6 | Exclure `_backups/` de Git **et** du serveur HTTP, puis vérifier | `git check-ignore` positif ; HTTP 403 mesuré |
| 7 | Créer une branche dédiée sans perdre de changement utilisateur | Branche active, fichiers non suivis toujours présents |
| 8 | Prévisualisation sur 127.0.0.1 et port libre lié au dossier projet | Hash servi == hash du fichier du commit |

## Contraintes respectées

- Le service 8080 préexistant n'est **ni arrêté ni redémarré**.
- La copie `Downloads/lenet5_distinct_fixed_screens_21/` est **préservée**, en lecture seule.
- Aucune action Cloudflare, DNS, tunnel, ni push : hors mandat de cet ordre.
- Sauvegardes sous `_backups/<mission>/<module>/<horodatage>/`, hash vérifié avant modification.
- `git add` sur chemins explicites uniquement. Jamais `git add .`, `reset --hard` ni force-push.

## Limites connues avant exécution

- Aucun navigateur piloté n'est disponible pour cet agent : tout critère exigeant clic, console ou
  contraste rendu sera déclaré **BLOQUÉ**, jamais PASS.
- Le CWD d'un processus Windows n'est pas exposé directement : l'identification de l'arbre servi
  reposera sur des sondes HTTP discriminantes et des correspondances de hash, avec la marge
  d'incertitude explicitement nommée.

# Vérification M6 — FAIL

Date UTC : 2026-09-09T02:29:04.137Z
Commit audité : 81aee4c30146a2c9438001cda7be7c3577bc45a4
Vérificateur : Codex CLI, désigné explicitement par utilisateur.
Ledger : f405f2a8-76dc-42a8-9aea-2683d62a36e8.

Rôles : Distinct de l’exécuteur Claude Code. Participation antérieure au cadrage; aucune revendication d’indépendance du planificateur.

Verdict global de livraison : FAIL. Les PASS ci-dessous portent uniquement sur le contrôle décrit, jamais sur toute la fonctionnalité. Un constat PASS de V03 confirme un défaut du site public.

Preuves : [résultats détaillés](preuves/reprise-M6/codex-audit-01.json).
Script exact exécuté : [audit Node](preuves/reprise-M0/codex-audit-01.cjs).
Commande depuis projets-dev : `node e26-dossier-rxneurones/00-DIRECTION/preuves/reprise-M0/codex-audit-01.cjs`. Exécution initiale équivalente via here-string PowerShell transmise à Node. V06 utilise la commande PowerShell enregistrée dans le JSON. Les jugements documentaires sont une relecture des sources et des diffs, pas des tests exécutés par le script.
Attentes : sections portant les mêmes identifiants de [reprise-verificateur-task.md](reprise-verificateur-task.md). Les hashes V02/V12/V22 sont historiques : comparaison distincte avec le HEAD actuel, sans confondre versions successives.

| Critère | Verdict | Résultat / écart |
|---|---|---|
| V30 | BLOQUÉ | {"themes":[{"theme":"theme-1","css":"\n      background-color: #030712;\n      background-image: \n        radial-gradient(circle at 10% 15%, rgba(16, 185, 129, 0.15) 0%, transparent 45%),\n        radial-gradient(circle at 90% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 40%),\n        radial-gradient(circle at 50% 85%, rgba(0, 240, 255, 0.1) 0%, transparent 50%);\n      background-attachment: fixed;\n    "},{"theme":"theme-2","css":"\n      background-color: #020307;\n      background-image: \n        linear-gradient(rgba(0, 255, 170, 0.04) 1px, transparent 1px),\n        linear-gradient(90deg, rgba(0, 255, 170, 0.04) 1px, transparent 1px);\n      background-size: 36px 36px;\n      background-attachment: fixed;\n    "},{"theme":"theme-3","css":"\n      background-color: #06020c;\n      background-image: \n        radial-gradient(circle at 80% 20%, rgba(244, 63, 94, 0.18) 0%, transparent 45%),\n        radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.22) 0%, transparent 50%),\n        radial-gradient(circle at 50% 50%, rgba(251, 113, 133, 0.08) 0%, transparent 60%);\n      background-attachment: fixed;\n    "}],"note":"Pire cas des dégradés et transparences à mesurer au rendu; ratio marginal non preuve globale."} |
| V31 | PASS | {"definitions":["--text-dim: #8b98ab;","--text-dim: #656d76;"],"lightRatio":4.667043336095934} |
| V32 | BLOQUÉ | {"tabs":5,"panels":5,"timers":1,"note":"Attributs présents et fonctions lues; synchronisation runtime non testée."} |
| V33 | FAIL | {"tablist":false,"note":"role tab sans propriétaire tablist; navigation par flèches absente. Modèle ARIA incomplet à corriger."} |
| V34 | BLOQUÉ | "Aucun lecteur écran pilotable disponible." |

La sortie complète de chaque critère est conservée dans le JSON; le tableau est abrégé pour lecture. Aucun critère absent des essais n'est présumé conforme.

Limites : CUA: trusted Node process exited unexpectedly; kernel reset. Échec aussi après réinitialisation. Aucun clic ni capture de rendu validé. V23 conserve ses six sous-contrôles BLOQUÉS (styles calculés, états, focus, zoom/mobile, mouvement réduit, erreurs runtime/réseau). V28 ne valide pas les images au rendu; V34 ne valide pas les annonces par lecteur d’écran. Le poids des fichiers ne constitue pas une mesure réseau. Aucun PASS global tant que M1 et ces contrôles requis manquent.

Suites : appliquer [l’ordre de correction](codex-reprise-corrections-004-task.md), puis remettre les preuves pour une nouvelle vérification. Aucun changement produit, commit, push, publication ou suppression de sauvegardes dans cet audit.

Références consultées : [patron onglets W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) ; [contraste non textuel W3C](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

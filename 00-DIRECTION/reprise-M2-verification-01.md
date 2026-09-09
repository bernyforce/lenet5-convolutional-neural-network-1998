# Vérification M2 — FAIL

Date UTC : 2026-09-09T02:29:04.137Z
Commit audité : 81aee4c30146a2c9438001cda7be7c3577bc45a4
Vérificateur : Codex CLI, désigné explicitement par utilisateur.
Ledger : f405f2a8-76dc-42a8-9aea-2683d62a36e8.

Rôles : Distinct de l’exécuteur Claude Code. Participation antérieure au cadrage; aucune revendication d’indépendance du planificateur.

Verdict global de livraison : FAIL. Les PASS ci-dessous portent uniquement sur le contrôle décrit, jamais sur toute la fonctionnalité. Un constat PASS de V03 confirme un défaut du site public.

Preuves : [résultats détaillés](preuves/reprise-M2/codex-audit-01.json).
Script exact exécuté : [audit Node](preuves/reprise-M0/codex-audit-01.cjs).
Commande depuis projets-dev : `node e26-dossier-rxneurones/00-DIRECTION/preuves/reprise-M0/codex-audit-01.cjs`. Exécution initiale équivalente via here-string PowerShell transmise à Node. V06 utilise la commande PowerShell enregistrée dans le JSON. Les jugements documentaires sont une relecture des sources et des diffs, pas des tests exécutés par le script.
Attentes : sections portant les mêmes identifiants de [reprise-verificateur-task.md](reprise-verificateur-task.md). Les hashes V02/V12/V22 sont historiques : comparaison distincte avec le HEAD actuel, sans confondre versions successives.

| Critère | Verdict | Résultat / écart |
|---|---|---|
| V10 | PASS | {"links":[{"target":"codex-merge-links-task.md","exists":true},{"target":"preuves/merge-links/manifest-backup-links-sha256.txt","exists":true},{"target":"links-verificateur-report.md","exists":true},{"target":"preuves/links/manifest-links-candidat-sha256.txt","exists":true},{"target":"merge-links-executeur-task.md","exists":true},{"target":"merge-links-executeur-report.md","exists":true},{"target":"merge-links-verificateur-task.md","exists":true},{"target":"merge-links-verificateur-report.md","exists":true}],"hash":"849bdc433f218027904aa1508876af06e5380c41ec137089abbaacbb07e576c9"} |
| V11 | BLOQUÉ | "Navigateur piloté indisponible après nouvelle tentative; clic du Markdown non exécuté." |
| V12 | PASS | {"preview":{"url":"http://127.0.0.1:8971/","status":200,"bytes":137329,"hash":"937d5815fa71e7455b5d89d57d67979b39051faaa7a4547d6cbf7e1588d094d1","headers":{"access-control-allow-origin":"*","cache-control":"no-cache","connection":"keep-alive","content-length":"137329","content-type":"text/html; charset=utf-8","date":"Wed, 09 Sep 2026 02:29:05 GMT","keep-alive":"timeout=5","referrer-policy":"strict-origin-when-cross-origin","x-content-type-options":"nosniff","x-frame-options":"SAMEORIGIN"},"syntax":["OK"]},"headHash":"937d5815fa71e7455b5d89d57d67979b39051faaa7a4547d6cbf7e1588d094d1","historicalM2":"37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081","note":"Comparaison actualisée au HEAD, historique M2 contrôlé séparément."} |
| V13 | BLOQUÉ | {"recovery":[{"module":"M0","file":"_backups\\E26-REPRISE-QUALITE-003\\M0\\20260908-213007\\server.js","commit":"2aeee3b","target":"server.js","match":true},{"module":"M0","file":"_backups\\E26-REPRISE-QUALITE-003\\M0\\20260908-213007\\.gitignore","commit":"2aeee3b","target":".gitignore","match":true},{"module":"M2","file":"_backups\\E26-REPRISE-QUALITE-003\\M2\\20260908-213116\\codex-merge-links-report.md","commit":"2aeee3b","target":"00-DIRECTION/codex-merge-links-report.md","match":true},{"module":"M3","file":"_backups\\E26-REPRISE-QUALITE-003\\M3\\20260908-215021\\index.html","commit":"0379a57","target":"index.html","match":true},{"module":"M3","file":"_backups\\E26-REPRISE-QUALITE-003\\M3\\20260908-215532-mandat\\reprise-verificateur-task.md","match":false},{"module":"M4","file":"_backups\\E26-REPRISE-QUALITE-003\\M4\\20260908-220301\\index.html","commit":"b20a08f","target":"index.html","match":true},{"module":"M6","file":"_backups\\E26-REPRISE-QUALITE-003\\M6\\20260908-220601\\index.html","commit":"31a46a8","target":"index.html","match":true}],"deleteAuthorized":false,"reason":"Six sauvegardes des fichiers produit correspondent aux commits attendus. La sauvegarde supplémentaire du mandat M3 ne doit pas être comparée à 0379a57 (fichier absent à ce commit) : récupération docu |
| V14 | FAIL | {"count":"10","summary":["2. Les corrections sont enregistrées dans 10 commits Git, sur la branche `reprise-qualite-003`."],"note":"10 commits confirmés, compte corrigé. FAIL documentaire précis : reprise-M3-execution.md §3 déclare imperceptible sans observation; mandat V16 annonce environ 17:1 au lieu de 15,8797:1. La réponse principale pose correctement Downloads OU clone exact §4 : ne pas lui attribuer une certitude générale."} |

La sortie complète de chaque critère est conservée dans le JSON; le tableau est abrégé pour lecture. Aucun critère absent des essais n'est présumé conforme.

Limites : CUA: trusted Node process exited unexpectedly; kernel reset. Échec aussi après réinitialisation. Aucun clic ni capture de rendu validé. V23 conserve ses six sous-contrôles BLOQUÉS (styles calculés, états, focus, zoom/mobile, mouvement réduit, erreurs runtime/réseau). V28 ne valide pas les images au rendu; V34 ne valide pas les annonces par lecteur d’écran. Le poids des fichiers ne constitue pas une mesure réseau. Aucun PASS global tant que M1 et ces contrôles requis manquent.

Suites : appliquer [l’ordre de correction](codex-reprise-corrections-004-task.md), puis remettre les preuves pour une nouvelle vérification. Aucun changement produit, commit, push, publication ou suppression de sauvegardes dans cet audit.

Références consultées : [patron onglets W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) ; [contraste non textuel W3C](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

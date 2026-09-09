# Vérification M4 — BLOQUÉ

Date UTC : 2026-09-09T02:29:04.137Z
Commit audité : 81aee4c30146a2c9438001cda7be7c3577bc45a4
Vérificateur : Codex CLI, désigné explicitement par utilisateur.
Ledger : f405f2a8-76dc-42a8-9aea-2683d62a36e8.

Rôles : Distinct de l’exécuteur Claude Code. Participation antérieure au cadrage; aucune revendication d’indépendance du planificateur.

Verdict global de livraison : FAIL. Les PASS ci-dessous portent uniquement sur le contrôle décrit, jamais sur toute la fonctionnalité. Un constat PASS de V03 confirme un défaut du site public.

Preuves : [résultats détaillés](preuves/reprise-M4/codex-audit-01.json).
Script exact exécuté : [audit Node](preuves/reprise-M0/codex-audit-01.cjs).
Commande depuis projets-dev : `node e26-dossier-rxneurones/00-DIRECTION/preuves/reprise-M0/codex-audit-01.cjs`. Exécution initiale équivalente via here-string PowerShell transmise à Node. V06 utilise la commande PowerShell enregistrée dans le JSON. Les jugements documentaires sont une relecture des sources et des diffs, pas des tests exécutés par le script.
Attentes : sections portant les mêmes identifiants de [reprise-verificateur-task.md](reprise-verificateur-task.md). Les hashes V02/V12/V22 sont historiques : comparaison distincte avec le HEAD actuel, sans confondre versions successives.

| Critère | Verdict | Résultat / écart |
|---|---|---|
| V25 | PASS | {"media":[{"name":"frame_01_0.5s_960.webp","bytes":1568},{"name":"frame_06_4.0s_960.webp","bytes":31198},{"name":"frame_05_3.0s_960.webp","bytes":9100},{"name":"frame_03_1.8s_960.webp","bytes":5904},{"name":"frame_04_2.5s_960.webp","bytes":8730},{"name":"frame_02_1.2s_960.webp","bytes":4246}],"total":60746,"networkBudget":"Non mesuré: total fichiers galerie différent des octets réseau page entière."} |
| V26 | PASS | {"gallery":["<img src=\"animations/frames/frame_01_0.5s_960.webp\" alt=\"Frame 0.5s\" width=\"960\" height=\"540\" loading=\"lazy\" decoding=\"async\">","<img src=\"animations/frames/frame_02_1.2s_960.webp\" alt=\"Frame 1.2s\" width=\"960\" height=\"540\" loading=\"lazy\" decoding=\"async\">","<img src=\"animations/frames/frame_03_1.8s_960.webp\" alt=\"Frame 1.8s\" width=\"960\" height=\"540\" loading=\"lazy\" decoding=\"async\">","<img src=\"animations/frames/frame_04_2.5s_960.webp\" alt=\"Frame 2.5s\" width=\"960\" height=\"540\" loading=\"lazy\" decoding=\"async\">","<img src=\"animations/frames/frame_05_3.0s_960.webp\" alt=\"Frame 3.0s\" width=\"960\" height=\"540\" loading=\"lazy\" decoding=\"async\">","<img src=\"animations/frames/frame_06_4.0s_960.webp\" alt=\"Frame 4.0s\" width=\"960\" height=\"540\" loading=\"lazy\" decoding=\"async\">"]} |
| V27 | PASS | {"response":{"url":"http://127.0.0.1:56208/animations/frames/frame_06_4.0s_960.webp","status":200,"bytes":31198,"hash":"5a1bb96ea2b7d1a49e931e0676fd60d8acd5e8b61cbc2c904b4a315b8da61f4b","headers":{"access-control-allow-origin":"*","cache-control":"public, max-age=31536000, immutable","connection":"keep-alive","content-length":"31198","content-type":"image/webp","date":"Wed, 09 Sep 2026 02:29:08 GMT","keep-alive":"timeout=5","referrer-policy":"strict-origin-when-cross-origin","x-content-type-options":"nosniff","x-frame-options":"SAMEORIGIN"},"syntax":[]},"note":"Noms neufs préviennent ancien cache pour cette livraison uniquement; prochaines révisions doivent rechanger de nom."} |
| V28 | BLOQUÉ | {"masters":["frame_01_0.5s.png","frame_07_4.9s.png","frame_03_1.8s.png","frame_02_1.2s.png","frame_04_2.5s.png","frame_06_4.0s.png","frame_05_3.0s.png"],"note":"Fichiers conservés; inspection visuelle indépendante à effectuer."} |
| V29 | PASS | {"src":0,"href":5,"note":"Pas de GIF src initial; JS peut charger GIF à la demande."} |

La sortie complète de chaque critère est conservée dans le JSON; le tableau est abrégé pour lecture. Aucun critère absent des essais n'est présumé conforme.

Limites : CUA: trusted Node process exited unexpectedly; kernel reset. Échec aussi après réinitialisation. Aucun clic ni capture de rendu validé. V23 conserve ses six sous-contrôles BLOQUÉS (styles calculés, états, focus, zoom/mobile, mouvement réduit, erreurs runtime/réseau). V28 ne valide pas les images au rendu; V34 ne valide pas les annonces par lecteur d’écran. Le poids des fichiers ne constitue pas une mesure réseau. Aucun PASS global tant que M1 et ces contrôles requis manquent.

Suites : appliquer [l’ordre de correction](codex-reprise-corrections-004-task.md), puis remettre les preuves pour une nouvelle vérification. Aucun changement produit, commit, push, publication ou suppression de sauvegardes dans cet audit.

Références consultées : [patron onglets W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) ; [contraste non textuel W3C](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

# Vérification M3 — FAIL

Date UTC : 2026-09-09T02:29:04.137Z
Commit audité : 81aee4c30146a2c9438001cda7be7c3577bc45a4
Vérificateur : Codex CLI, désigné explicitement par utilisateur.
Ledger : f405f2a8-76dc-42a8-9aea-2683d62a36e8.

Rôles : Distinct de l’exécuteur Claude Code. Participation antérieure au cadrage; aucune revendication d’indépendance du planificateur.

Verdict global de livraison : FAIL. Les PASS ci-dessous portent uniquement sur le contrôle décrit, jamais sur toute la fonctionnalité. Un constat PASS de V03 confirme un défaut du site public.

Preuves : [résultats détaillés](preuves/reprise-M3/codex-audit-01.json).
Script exact exécuté : [audit Node](preuves/reprise-M0/codex-audit-01.cjs).
Commande depuis projets-dev : `node e26-dossier-rxneurones/00-DIRECTION/preuves/reprise-M0/codex-audit-01.cjs`. Exécution initiale équivalente via here-string PowerShell transmise à Node. V06 utilise la commande PowerShell enregistrée dans le JSON. Les jugements documentaires sont une relecture des sources et des diffs, pas des tests exécutés par le script.
Attentes : sections portant les mêmes identifiants de [reprise-verificateur-task.md](reprise-verificateur-task.md). Les hashes V02/V12/V22 sont historiques : comparaison distincte avec le HEAD actuel, sans confondre versions successives.

| Critère | Verdict | Résultat / écart |
|---|---|---|
| V15 | PASS | {"origine":["body[data-theme=\"origine\"] {\n      background-color: #f8fafc !important;\n      background-image: none !important;\n      color: #0f172a !important;\n      font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif !important;\n    }","body[data-theme=\"origine\"] {\n      /* le jeton clair doit rester sombre: la valeur :root vise les themes sombres */\n      --text-dim: #656d76;\n      background-color: #eef2f7 !important;\n      font-family: \"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif !important;\n    }"]} |
| V16 | FAIL | {"ratios":[{"a":"0a58ca","b":"ddf4ff","expected":5.66,"actual":5.659316474401903},{"a":"0969da","b":"ddf4ff","expected":4.56,"actual":4.563748387142551},{"a":"334155","b":"ffffff","expected":10.35,"actual":10.35474573184942},{"a":"8c959f","b":"ffffff","expected":3.04,"actual":3.03700420922656},{"a":"656d76","b":"eef2f7","expected":4.67,"actual":4.667043336095934},{"a":"0f172a","b":"eef2f7","expected":17,"actual":15.879711621105544}],"note":"Écart numérique >0,05 : #0f172a sur #eef2f7 donne 15,8797116, attendu ≈17. Le seuil texte 4,5 est respecté. Cinq autres paires opaques confirmées. Deux paires sombres avec alpha et qualification de toutes les bordures essentielles restent BLOQUÉES; distinction décoratif/essentiel correcte en principe selon W3C, pas preuve du rendu complet."} |
| V17 | PASS | {"colabPill":3} |
| V18 | PASS | {"diff":"diff --git a/index.html b/index.html\nindex 91aaa78..3840c76 100644\n--- a/index.html\n+++ b/index.html\n@@ -1698,6 +1698,93 @@\n       box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.12), 0 -2px 8px rgba(0, 0, 0, 0.06) !important;\n     }\n \n+\n+    /* ==========================================================================\n+       M3 — CONTRASTE WCAG AA ET PROFONDEUR VISUELLE (ordre 003)\n+       Chaque valeur est mesuree. Reference: WCAG 2.2 1.4.3 / 1.4.11 / 2.4.7.\n+       Preuves: 00-DIRECTION/preuves/reprise-M3/\n+       ========================================================================== */\n+\n+    /* Pilule Colab — pilotee par theme au lieu d'une couleur inline unique.\n+       Sombre: #7dd3fc sur fond compose = 9.64:1 ; bordure 60% = 3.9:1 */\n+    .colab-pill {\n+      display: inline-flex;\n+      align-items: center;\n+      gap: 4px;\n+      padding: 0.35rem 0.8rem;\n+      border-radius: 9999px;\n+      font-size: 0.78rem;\n+      font-weight: 600;\n+      text-decoration: none;\n+      background: rgba(56, 189, 248, 0.14);\n+      border: 1px solid rgba(56, 189, 248, 0.6);\n+      color: #7dd3fc;\n+    }\n+\n+    /* Clair: #0a58ca sur #ddf4ff = 5.66:1 ; bordure #0969da = 4.56:1 */\n+    body[data-theme=\"origine\"] .colab-pill {\n+      background: #dd |
| V19 | BLOQUÉ | {"focusRules":2,"reduced":1,"oldFocus":null,"note":"Présence CSS confirmée, focus natif pouvait exister avant. Réduction CSS ne prouve pas arrêt des timers JS."} |
| V20 | FAIL | {"beforeRatio":1.0462758042084466,"afterRatio":1.1242354640287087,"beforeDelta":1.8242381111594312,"afterDelta":4.672229603607406,"note":"Chiffres calculables, mais invisibilité perceptive et cause unique du rendu plat non démontrées."} |
| V21 | PASS | {"open":256,"close":256,"syntax":["OK"],"note":"Comptage accolades ne remplace pas parseur CSS."} |
| V22 | PASS | {"historicalM3":"61f850e496f3e81b7ce544c3236909ee2539bdd65eee802aafe6b17ecba0a34c","previewHash":"937d5815fa71e7455b5d89d57d67979b39051faaa7a4547d6cbf7e1588d094d1","headHash":"937d5815fa71e7455b5d89d57d67979b39051faaa7a4547d6cbf7e1588d094d1","note":"Attente historique M3 différenciée du HEAD."} |
| V23 | BLOQUÉ | "Six contrôles rendu, états, focus, zoom/mobile, mouvement et console non exécutables : navigateur en échec." |
| V24 | BLOQUÉ | "Limites M3 présentes; thèmes sombres traités ensuite partiellement dans M6. Le périmètre historique ne prouve pas une régression. Aucun contrôle exhaustif de typographie, longueur de lignes, cibles tactiles et décompte des couleurs dans ce passage." |

La sortie complète de chaque critère est conservée dans le JSON; le tableau est abrégé pour lecture. Aucun critère absent des essais n'est présumé conforme.

Limites : CUA: trusted Node process exited unexpectedly; kernel reset. Échec aussi après réinitialisation. Aucun clic ni capture de rendu validé. V23 conserve ses six sous-contrôles BLOQUÉS (styles calculés, états, focus, zoom/mobile, mouvement réduit, erreurs runtime/réseau). V28 ne valide pas les images au rendu; V34 ne valide pas les annonces par lecteur d’écran. Le poids des fichiers ne constitue pas une mesure réseau. Aucun PASS global tant que M1 et ces contrôles requis manquent.

Suites : appliquer [l’ordre de correction](codex-reprise-corrections-004-task.md), puis remettre les preuves pour une nouvelle vérification. Aucun changement produit, commit, push, publication ou suppression de sauvegardes dans cet audit.

Références consultées : [patron onglets W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) ; [contraste non textuel W3C](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

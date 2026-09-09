# Ordre de correction 004 — après vérification

Émetteur : Codex CLI, vérificateur désigné par utilisateur.
Commit contrôlé : 81aee4c30146a2c9438001cda7be7c3577bc45a4. Verdict global : FAIL. Rapports : reprise-M0-verification-01.md, reprise-M2-verification-01.md, reprise-M3-verification-01.md, reprise-M4-verification-01.md, reprise-M6-verification-01.md, tous dans 00-DIRECTION.

Répondre uniquement dans 00-DIRECTION/codex-reprise-corrections-004-report.md. Aucun échange direct inter-agents. Ne pas attendre de verdict signé fictif : le verdict est celui des cinq rapports ci-dessus, associé au ledger f405f2a8-76dc-42a8-9aea-2683d62a36e8.

| Module progressif | Travail exigé | Condition de remise |
|---|---|---|
| Documentation | Corriger V16 : 15,8797:1, conforme au seuil texte, au lieu de ≈17. Remplacer « imperceptible » par une hypothèse non observée. Distinguer manque de CSS focus et absence de focus natif. Clarifier attentes historiques et HEAD. | Sources, calculs reproductibles, diff limité, commit local distinct. |
| M6 | Compléter le modèle des onglets : propriétaire tablist nommé, 5 tabs associés aux panels, focus et sélection cohérents, flèches gauche/droite; garder les 2 liens externes hors de ce groupe. | Vérifier chaque onglet au clavier et au clic, sans régression de mise en page; test lecteur écran; rapport et commit local distinct. |
| M1 / M2 | Inventorier tous les liens et contrôles, sans se limiter aux 8 liens du rapport. Vérifier destination, contenu attendu, clic réel et téléchargement dans interface de livraison. Exécuter les 28 diapositives et 4 thèmes, minuteur, médias, clavier; enregistrer erreurs runtime et réseau. | Matrice exhaustive dédoublonnée avec chaque occurrence rattachée, aucune case non testée masquée, preuve par parcours. |
| M3 / M4 | Mesurer les fonds composites, états et focus; zoom 200 %, mobile, mouvement réduit. Vérifier la lisibilité de toutes les images, et les octets effectivement transférés avec cache froid. | Six sous-contrôles V23, V28, budget réseau; preuves navigateur, pas seulement calculs CSS et tailles disque. |
| M0 / site public | La page publique et 8080 partagent encore un JS syntaxiquement invalide; la prévisualisation 8971 correspond au HEAD. Documenter la chaîne réelle de service et proposer un plan de bascule réversible. | Ne pas toucher au service public, PID15368, Downloads, DNS ou tunnel sans autorisation explicite ciblée. Un commit local ne constitue pas un déploiement. |

Sécurité et livraison : ledger avant/après; scan de secrets avant écriture; verrou atomique propre. Sauvegarder tout fichier existant avant modification sous _backups dans le projet principal et vérifier la copie. Travailler par module dans un emplacement candidat neuf; préserver les changements d’autrui. Un commit local par module prêt à tester, sans push. Produire une URL locale dont le contenu est lié au commit, en déclarant port et PID; ne pas interrompre les services existants. Rapports incrémentaux obligatoires, sans auto-PASS de module. Remettre chaque module à la vérification avant assemblage. Nettoyer seulement les sauvegardes du module dont le commit ET la validation sont acquis et dont la restauration exacte a été prouvée; ne supprimer aucune sauvegarde historique ou d’un autre agent.

En cas de navigateur indisponible, donner l’erreur exacte et conserver BLOQUÉ. Aucun substitut statique aux clics. Ne jamais inventer un agent, une preuve, une signature ou un PASS. Aucune publication, soumission ou action externe supplémentaire autorisée par ce fichier.

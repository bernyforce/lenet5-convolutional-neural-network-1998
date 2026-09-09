# Redirection Codex 002 — réouverture de la phase liens

Mission : E26-LINKS-VALIDATION-20260908  
Statut imposé : `FAIL — nouvelle vérification requise`.

## Constat vérifié

Le rapport `links-verificateur-report.md` annonce `PASS 9/9`, mais les rapports livrés contiennent encore des URI `file:///home/...`, notamment `codex-merge-links-report.md` et `links-verificateur-report.md`. Ce schéma n’est pas cliquable dans l’interface de livraison et contredit le critère L06 ainsi que la checklist qui interdit `file://`.

Les tests réseau du 9 septembre 2026 montrent : `/`, les deux dossiers HTML, `/api/slides` et une vidéo publique répondent HTTP 200 ; le téléchargement PPTX répond 200 mais doit être contrôlé avec une durée suffisante et un hash complet. Le diagnostic public Cloudflare reste distinct de la cliquabilité des liens locaux.

## Ordre de correction

1. Le coordinateur doit enregistrer cette redirection dans son rapport et rétrograder la phase liens à `CORRECTION`.
2. Le planificateur ou coordinateur doit définir le format exact accepté par l’interface pour les liens locaux remis à l’utilisateur. Utiliser des chemins absolus de fichier compatibles avec le rendu courant ; bannir `file://`, `vscode://`, chemins inventés et liens UNC non supportés si l’interface ne les rend pas cliquables.
3. L’exécuteur doit corriger uniquement les liens des rapports et livrables concernés dans un nouveau candidat. Chaque lien doit être testé par clic ou mécanisme équivalent dans l’interface cible, pas seulement par existence sur disque.
4. Refaire l’inventaire exhaustif L01-L09, y compris les rapports de coordination eux-mêmes. Le contrôle doit rechercher `file://` et vérifier que chaque lien remis est réellement activable.
5. Un vérificateur n’ayant participé ni au plan ni à la correction doit produire un nouveau rapport indépendant. Le PASS précédent ne couvre pas cet état corrigé.

## Contraintes

Préserver les sauvegardes et l’original jusqu’au nouveau PASS. Aucune publication ou modification Cloudflare n’est autorisée par cette redirection. Respecter verrous, scans de secrets, sauvegardes avant modification et agent-ledger. Répondre dans `codex-links-validation-report.md` et créer des rapports numérotés de correction, sans écraser les preuves antérieures.

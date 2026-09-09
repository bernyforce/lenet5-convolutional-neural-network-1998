# Ordre de mise à jour du projet original — E26-FIABILISATION-20260908

Mission : E26-MISE-A-JOUR-ORIGINAL-20260908  
Auteur : Codex, sur autorisation explicite de l’utilisateur.  
Destinataire : coordinateur Antigravity CLI et agent exécuteur désigné.

## Objectif

Mettre à jour le projet original `e26-dossier-rxneurones` à partir du candidat validé : `../e26-dossier-rxneurones-candidat-20260908-090500/`.

Le candidat a reçu un verdict indépendant `PASS 12/12` dans `00-DIRECTION/verificateur-report-01.md`. Avant toute écriture dans l’original, vérifier que le chemin du candidat, son manifeste et le rapport de vérification correspondent exactement aux fichiers attendus.

## Périmètre autorisé

Source : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/`  
Cible : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`

Mettre à jour uniquement les fichiers de livrable présents dans le candidat. Préserver `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/`, les sauvegardes existantes et les données absentes du candidat. Ne rien supprimer sans autorisation spécifique. Aucun commit, push, publication, déploiement, message externe ou signature au nom de l’utilisateur.

## Prérequis bloquants

1. Vérifier `verificateur-report-01.md`, son `PASS (12/12` et son SHA-256 dans `agent-rehabilitation-report.md`.
2. Vérifier le candidat exact audité et `preuves/manifest-candidat-sha256.txt`.
3. Comparer le candidat aux manifestes ; tout écart impose `BLOQUÉ`.
4. Signer `agent-sign.py start` avec rôle `executant`, puis clôturer avec `end` dans tous les cas.
5. Créer un dossier frère neuf `../e26-dossier-rxneurones-backup-20260908-<heure>/`.
6. Copier chaque fichier original qui sera remplacé vers la sauvegarde avant toute écriture. Vérifier existence, taille et SHA-256 de chaque copie. Toute défaillance bloque l’opération.
7. Scanner l’ordre, les rapports et les preuves textuelles avec `secret-scan.py`. Toute détection ou erreur bloque l’écriture.

## Exécution

1. Produire les inventaires et SHA-256 avant/après.
2. Ne pas copier `00-DIRECTION` du candidat ; préserver la coordination de l’original.
3. Copier uniquement les fichiers autorisés, sans suppression dans la cible, puis relire chaque fichier écrit.
4. Contrôler les médias, `LeNet-5.pptx`, `slides.json`, `index.html`, `server.js`, le notebook, `README.md` et `LISEZ-MOI.md`. Aucun binaire remplacé sans hash de destination.
5. Ne pas déclarer l’original validé avant le contrôle post-mise-à-jour.

## Vérification obligatoire

Un vérificateur distinct de l’exécuteur contrôle l’original après mise à jour, compare les hashes au candidat, vérifie l’absence d’altération hors périmètre et produit `PASS` ou `FAIL` dans `update-original-verificateur-report.md`. En cas de `FAIL`, conserver la sauvegarde et attendre un nouvel ordre écrit avant toute correction.

## Fichiers de communication

- Ordre : `00-DIRECTION/codex-update-original-task.md`
- Réponse : `00-DIRECTION/codex-update-original-report.md`
- Exécution : `00-DIRECTION/update-original-executeur-report.md`
- Vérification : `00-DIRECTION/update-original-verificateur-report.md`

Le rapport de coordination indique statut, identités et interventions ledger, sauvegarde, fichiers remplacés, hashes, preuves et verdict. Tant que le rapport du vérificateur n’est pas `PASS`, l’opération n’est pas terminée.

## Protocoles

Respecter `PRINCIPE-DETERMINISME.md`, `BACKUP-AVANT-MODIFICATION v1`, `AGENT-LEDGER v1` et `COMMUNICATION-PAR-FICHIER v1`. Chaque écriture de coordination exige sauvegarde si le fichier existe, `.lock`, scan de secrets et relecture exacte. Ne jamais effacer le verrou d’un autre processus. Aucun acte externe ni signature utilisateur.

Premier retour dans `codex-update-original-report.md` : accusé de réception, PASS vérifié, chemin de sauvegarde, rôles affectés et statut réel. Aucune modification de l’original avant sauvegarde complète et vérifiée.

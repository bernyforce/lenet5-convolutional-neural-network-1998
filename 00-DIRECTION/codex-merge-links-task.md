# Ordre de fusion — Phase liens et navigation E26

Mission : E26-MERGE-LINKS-20260908  
Auteur : Codex, sur autorisation explicite de l’utilisateur.  
Type : fusion contrôlée d’un candidat certifié dans le projet original.

## Source certifiée

Candidat exact à auditer avant toute écriture :
`/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`

Le candidat possède un verdict indépendant `PASS 9/9` dans :
`00-DIRECTION/links-verificateur-report.md`

Vérifier aussi le rapport de coordination `codex-links-validation-report.md`, le manifeste du candidat et leurs SHA-256 avant d’agir. Tout écart depuis ce verdict impose `BLOQUÉ`.

## Périmètre de fusion autorisé

Selon le rapport vérificateur, fusionner uniquement les changements validés de cette phase :

- remplacement de `index.html` par la version certifiée ;
- ajout de `index.tsv` si absent de l’original.

Ne copier aucun autre fichier sans preuve d’un écart identique au plan de phase et autorisation écrite de Codex. Ne supprimer aucun fichier original. Préserver `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/`, les sauvegardes et les modifications des phases précédentes.

## Sauvegarde obligatoire

Avant toute écriture dans l’original :

1. Signer l’intervention `agent-sign.py start` avec rôle `executant`.
2. Créer un dossier frère neuf `../e26-dossier-rxneurones-backup-links-20260908-<heure>/`.
3. Copier `index.html` original et tout fichier existant qui sera remplacé vers cette sauvegarde.
4. Vérifier existence, taille et SHA-256 de chaque copie avant la première écriture.
5. Scanner les fichiers de coordination et les preuves avec `secret-scan.py`.

Une sauvegarde incomplète, un hash différent ou une détection de secret bloque la fusion.

## Procédure

1. Produire un inventaire et les hashes avant fusion.
2. Vérifier les différences candidat/original et confirmer qu’elles se limitent exactement au périmètre autorisé.
3. Copier les fichiers autorisés, relire chaque destination et calculer les hashes après fusion.
4. Tester les liens locaux, ancres, routes `/api/slides`, téléchargements, médias et absence d’erreur JavaScript sur l’original fusionné.
5. Clôturer l’exécution dans `merge-links-executeur-report.md` sans auto-validation globale.

## Vérification indépendante obligatoire

Un agent vérificateur n’ayant participé ni à la planification ni à l’exécution contrôle l’original après fusion. Il compare les hashes aux fichiers du candidat, vérifie la sauvegarde, l’absence de suppression et reprend les critères L01 à L09 applicables. Il écrit `merge-links-verificateur-report.md` avec `PASS` ou `FAIL`.

En cas de `FAIL`, conserver la sauvegarde, ne rien écraser davantage et documenter les écarts. Toute correction nécessite un nouvel ordre écrit et une nouvelle vérification indépendante complète.

## Fichiers de coordination

- Ordre : `00-DIRECTION/codex-merge-links-task.md`
- Réponse : `00-DIRECTION/codex-merge-links-report.md`
- Exécution : `00-DIRECTION/merge-links-executeur-report.md`
- Vérification : `00-DIRECTION/merge-links-verificateur-report.md`
- Preuves : `00-DIRECTION/preuves/merge-links/`

Le statut ne peut devenir `TERMINÉ-PASS` qu’après le rapport du vérificateur. Aucun commit, push, publication, déploiement, modification Cloudflare, envoi externe ou signature au nom de l’utilisateur n’est autorisé.

Respecter `PRINCIPE-DETERMINISME.md`, `BACKUP-AVANT-MODIFICATION v1`, `AGENT-LEDGER v1` et `COMMUNICATION-PAR-FICHIER v1`. Chaque écriture de coordination exige `.lock`, scan de secrets et relecture exacte.

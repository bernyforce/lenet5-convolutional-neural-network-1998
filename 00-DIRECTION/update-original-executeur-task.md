# Mandat d'Exécution — E26-MISE-A-JOUR-ORIGINAL-20260908

## 1. Identité et Rôle
Tu es l'**Agent Exécuteur Distinct** mandaté pour exécuter la mise à jour contrôlée du projet original à partir du candidat validé.
RÈGLE D'OR :
- Tu ne t'auto-valides jamais (aucun verdict PASS final dans ton rapport).
- Tu n'altères JAMAIS `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/` ni les sauvegardes existantes.
- Tu ne supprimes aucun fichier dans l'original qui serait absent du candidat.
- Tu crées d'abord une sauvegarde complète et vérifiée de chaque fichier à remplacer.
- Aucun commit, push, publication ou message externe.

## 2. Emplacements
- Candidat validé (Source en lecture seule) :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/`
- Projet Original (Cible contrôlée) :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- Dossier de Sauvegarde Frère Neuf :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-backup-20260908-114025/`

## 3. Feuille de Route Technique Pas-à-Pas
1. **Étape 0 — Inscription Ledger DÉBUT :**
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start \
     --agent "Antigravity CLI (Executeur Distinct)" \
     --role executant \
     --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/" \
     --summary "Mise a jour de l original depuis candidat valide apres backup complet" \
     --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones"
   ```
2. **Étape 1 — Création du dossier de sauvegarde et copie préventive :**
   - Créer le dossier `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-backup-20260908-114025/`.
   - Pour chaque fichier présent dans le candidat qui existe dans l'original et qui sera remplacé : copier vers le dossier de sauvegarde en conservant l'arborescence.
   - Vérifier pour chaque fichier sauvegardé : existence sur disque, taille et SHA-256.
   - Produire le manifeste de sauvegarde `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-backup-20260908-114025-sha256.txt`.
3. **Étape 2 — Inventaire Avant-Mise-à-Jour :**
   - Générer l'empreinte SHA-256 des fichiers cibles dans l'original avant écriture.
4. **Étape 3 — Déploiement Contrôlé des Fichiers du Candidat vers l'Original :**
   - Copier les fichiers autorisés depuis le candidat vers l'original :
     - `animations/`
     - `index.html`
     - `slides.json`
     - `server.js`
     - `demonstration_lenet5_colab.ipynb`
     - `dossier_rxneurones_lenet5.html`
     - `dossier_rxneurones_lenet5_themed.html`
     - `README.md`
     - `LISEZ-MOI.md`
     - `LeNet-5.pptx` (lien symbolique ou fichier identique)
     - Toutes les autres ressources et médias validés dans le candidat.
   - EXCLUSION STRICTE : Ne jamais copier `00-DIRECTION/` du candidat, préserver `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/` de l'original.
   - Ne supprimer aucun fichier existant de l'original.
5. **Étape 4 — Rerelecture et Inventaire Après-Mise-à-Jour :**
   - Relire chaque fichier copié.
   - Générer l'empreinte SHA-256 post-mise-à-jour et vérifier qu'elle correspond bit-à-bit à celle du candidat :
     `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-original-post-update-sha256.txt`.
6. **Étape 5 — Clôture Ledger & Rédaction du Rapport :**
   - Clôturer l'intervention ledger :
     ```bash
     python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py end \
       --id "<ID>" \
       --outcome PASS \
       --action-type modification \
       --summary "Mise a jour de l original realisee avec succes apres backup verifie"
     ```
   - Rédiger sous verrou atomique (`.lock`) et après `secret-scan.py` :
     `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/update-original-executeur-report.md`.

# Mandat d'Exécution Technique — Fusion Liens E26

## 1. Identité et Rôle
Tu es l'**Agent Exécuteur Distinct** mandaté pour exécuter la fusion contrôlée des fichiers certifiés de la phase liens dans le projet original.
RÈGLE D'OR :
- Tu ne t'auto-valides JAMAIS (aucun verdict PASS final dans ton rapport).
- Tu appliques strictement le périmètre autorisé par `codex-merge-links-task.md` :
  - Remplacement de `index.html` par la version du candidat certifié.
  - Ajout de `index.tsv` depuis le candidat certifié.
  - AUCUN autre fichier touché.
  - AUCUN fichier supprimé.
  - Préservation stricte de `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/`, `*.bak*`.
- Sauvegarde préalable obligatoire avant toute écriture.
- N'utilise pas de commandes shell avec des pipes '|' dans grep. Utilise des scripts Python simples et déterministes.
- Communication exclusive par fichier sous `00-DIRECTION/` avec verrou atomique (`.lock`) et `secret-scan.py`.

## 2. Emplacements
- Source certifiée (lecture seule) :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`
- Cible originale (projet de production) :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- Dossier de sauvegarde dédié :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-backup-links-20260908-200955/`
- Dossier de preuves :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/merge-links/`

## 3. Feuille de Route Technique Pas-à-Pas (Étapes 0 à 5)
1. **Étape 0 — Inscription Ledger DÉBUT :**
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start \
     --agent "Antigravity CLI (Executeur Distinct)" \
     --role executant \
     --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/" \
     --summary "Fusion controlee index.html et index.tsv apres sauvegarde" \
     --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones"
   ```
2. **Étape 1 — Sauvegarde Préventive Obligatoire :**
   - Créer le dossier `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-backup-links-20260908-200955/`.
   - Copier `index.html` original vers ce dossier de sauvegarde.
   - Vérifier existence, taille et SHA-256 de la copie.
   - Générer le manifeste de sauvegarde `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/merge-links/manifest-backup-links-sha256.txt`.
3. **Étape 2 — Inventaire Avant-Fusion :**
   - Noter le SHA-256 de `index.html` original avant remplacement.
   - Confirmer l'absence de `index.tsv` dans l'original.
4. **Étape 3 — Fusion Chirurgicale Contrôlée :**
   - Copier `index.html` depuis le candidat vers l'original.
   - Copier `index.tsv` depuis le candidat vers l'original.
   - Relire les deux fichiers dans l'original et vérifier que leurs SHA-256 correspondent exactement à ceux du candidat :
     - `index.html` : `37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081`
     - `index.tsv` : `f8eff64278a82226cf1de43644950d010e6a0505987a4a3d8a8f99fd7178bfdc`
5. **Étape 4 — Tests Unitaires d'Intégrité Post-Fusion :**
   - Extraire le script JS inline de `index.html` fusionné et exécuter `node --check` (code retour 0 impératif, zéro SyntaxError).
   - Vérifier que `index.tsv` contient 686 octets et 22 lignes.
   - Vérifier `git status -s` : exactement 1 modification (`M index.html`), 1 ajout non suivi (`?? index.tsv`), 0 suppression.
6. **Étape 5 — Clôture Ledger & Rapport d'Exécution :**
   - Clôturer l'intervention ledger :
     ```bash
     python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py end \
       --id "<ID>" \
       --outcome PASS \
       --action-type modification \
       --summary "Fusion chirurgicale index.html et index.tsv realisee avec succes apres sauvegarde verifiee"
     ```
   - Rédiger sous verrou atomique (`.lock`) et après `secret-scan.py` :
     `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/merge-links-executeur-report.md`.

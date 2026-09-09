# Mandat d'Audit & Vérification — E26-MISE-A-JOUR-ORIGINAL-20260908

## 1. Identité et Rôle
Tu es l'**Agent Vérificateur Indépendant** pour la mission E26-MISE-A-JOUR-ORIGINAL-20260908.
RÈGLE D'OR :
- Tu es STRICTEMENT distinct de l'Exécuteur (session 7b50a332-3908-435f-9b08-a0e19e5fdefe).
- Tu ne modifies AUCUN fichier de code, de présentation, de notebook ou de documentation. Tu n'es là QUE pour auditer, vérifier, comparer, tester et sceller les preuves.
- Aucun échantillonnage : chaque exigence doit être formellement et unitairement contrôlée.
- Communication exclusive par fichier sous `00-DIRECTION/` avec verrou atomique (`.lock`) et `secret-scan.py`.

## 2. Référentiels et Livrables à Auditer
- Ordre de référence : `00-DIRECTION/codex-update-original-task.md`
- Rapport de coordination : `00-DIRECTION/codex-update-original-report.md`
- Rapport de l'exécuteur : `00-DIRECTION/update-original-executeur-report.md` (SHA-256 : `f45b26b5231dc2ca6f107d68a35150990e7c3e6591e4c401861e0d7e2972c0a2`)
- Candidat validé : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/`
- Projet Original mis à jour : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- Dossier de Sauvegarde : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-backup-20260908-114025/`
- Manifestes sous `00-DIRECTION/preuves/` :
  - `manifest-candidat-sha256.txt`
  - `manifest-backup-20260908-114025-sha256.txt`
  - `manifest-original-pre-update-sha256.txt`
  - `manifest-original-post-update-sha256.txt`

## 3. Programme d'Audit Technique (Checklist Binaire)
1. **Vérification de la Sauvegarde Préventive :**
   - Contrôler l'existence du dossier de sauvegarde et l'intégrité de ses 11 fichiers via `sha256sum -c manifest-backup-20260908-114025-sha256.txt`.
2. **Concordance Bit-à-Bit Original vs Candidat :**
   - Comparer les fichiers de livrable de l'original avec ceux du candidat (les 13 537 fichiers doivent correspondre à 100 % avec `manifest-candidat-sha256.txt`).
3. **Respect du Périmètre & Non-Régression :**
   - Vérifier que `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/` sont préservés et intègres.
   - Vérifier qu'aucun fichier légitime antérieur n'a été indûment supprimé de l'original.
4. **Contrôles Unitaires Applicatifs :**
   - Médias : présence des 28 WebP, 28 miniatures, 6 MP4 dans `animations/`, posters et frames NCR.
   - PowerPoint : intégrité de `LeNet-5.pptx` (taille 27,4 Mo, 28 diapositives).
   - Métadonnées Web : `slides.json` et `index.html` (zéro lien brisé, zéro clé PNG orpheline).
   - Serveur : `server.js` (HOST 127.0.0.1, filtre 403 sur fichiers privés, Range 206 fonctionnel).
   - Notebook : `demonstration_lenet5_colab.ipynb` (18 cellules, historique préservé, mentions didactiques).
   - Documentation : `README.md` et `LISEZ-MOI.md` (concordance des résolutions et poids).
5. **Sécurité Déterministe :**
   - Exécution de `secret-scan.py` : 0 secret détecté.

## 4. Livrable Attendu
1. Déclarer ton identité et signer le début d'intervention ledger :
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start \
     --agent "Antigravity CLI (Verificateur Independant)" \
     --role verificateur \
     --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/" \
     --summary "Audit post-mise-a-jour de l original E26" \
     --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones"
   ```
2. Clôturer l'intervention ledger :
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py end \
     --id "<ID>" \
     --outcome <PASS|FAIL> \
     --action-type lecture \
     --summary "<preuves exactes verifiees>"
   ```
3. Rédiger sous verrou atomique (`.lock`) et scan de secrets :
   `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/update-original-verificateur-report.md`.
   Formuler un verdict formel : **PASS** ou **FAIL**.

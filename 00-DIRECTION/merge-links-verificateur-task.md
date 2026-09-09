# Mandat d'Audit & Vérification Post-Fusion — E26-MERGE-LINKS-20260908

## 1. Identité et Rôle
Tu es l'**Agent Vérificateur Indépendant** mandaté pour l'audit contradictoire de la fusion des liens sur le projet original.
RÈGLE D'OR :
- Tu es STRICTEMENT distinct de l'Exécuteur (session 153e1dfb-2501-4b54-95fb-05e92d484aed).
- Tu ne modifies AUCUN fichier de code, de présentation, de notebook, de page HTML ou de livrable. Tu n'es là QUE pour tester, mesurer, auditer, inspecter et comparer.
- Aucun échantillonnage : chaque exigence doit être formellement contrôlée.
- N'utilise pas de commandes shell complexes avec des pipes '|' dans grep. Utilise des scripts Python simples et déterministes.
- Communication exclusive par fichier sous `00-DIRECTION/` avec verrou atomique (`.lock`) et `secret-scan.py`.

## 2. Documents et Référentiels d'Audit
- Ordre de référence : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/codex-merge-links-task.md`
- Rapport de coordination : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/codex-merge-links-report.md`
- Rapport d'exécution : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/merge-links-executeur-report.md`
- Source candidate certifiée : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`
- Projet original fusionné : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- Dossier de sauvegarde : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-backup-links-20260908-200955/`
- Manifeste de sauvegarde : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/merge-links/manifest-backup-links-sha256.txt`

## 3. Programme d'Audit Technique
1. **Contrôle de la Sauvegarde Préventive :**
   - Vérifier l'existence et l'intégrité de `index.html` dans le dossier de sauvegarde via `sha256sum -c manifest-backup-links-sha256.txt`.
2. **Concordance Cryptographique des Fichiers Fusionnés :**
   - Vérifier que `index.html` dans l'original correspond bit-à-bit à celui du candidat certifié (`37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081`).
   - Vérifier que `index.tsv` dans l'original correspond bit-à-bit à celui du candidat certifié (`f8eff64278a82226cf1de43644950d010e6a0505987a4a3d8a8f99fd7178bfdc`).
3. **Respect du Périmètre & Non-Régression :**
   - Vérifier qu'aucun fichier n'a été supprimé (`git diff --diff-filter=D`).
   - Vérifier que `.git/`, `.agent/`, `.agent-ledger.jsonl`, `00-DIRECTION/`, `*.bak*` sont préservés.
   - Vérifier `git status -s` : uniquement `M index.html` et `?? index.tsv` (hors artefacts de direction).
4. **Tests Applicatifs & Runtime :**
   - Extraire le script JS inline de `index.html` et valider `node --check` (code retour 0, zéro SyntaxError).
   - Tester le serveur Node.js sur port temporaire : vérifier `/`, `/api/slides`, `/index.tsv`, streaming Range 206 sur MP4.
5. **Sécurité Déterministe :**
   - Exécuter `secret-scan.py` : 0 secret détecté.

## 4. Livrable Attendu
1. Déclarer ton identité et signer le début d'intervention ledger :
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start \
     --agent "Antigravity CLI (Verificateur Independant)" \
     --role verificateur \
     --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/" \
     --summary "Audit technique post-fusion des liens sur original" \
     --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones"
   ```
2. Clôturer l'intervention ledger :
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py end \
     --id "<ID>" \
     --outcome <PASS|FAIL> \
     --action-type lecture \
     --summary "<preuves exactes de l audit post-fusion>"
   ```
3. Rédiger sous verrou atomique (`.lock`) et après scan de secrets (`secret-scan.py`) :
   `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/merge-links-verificateur-report.md`.
   Formuler un verdict formel : **PASS** ou **FAIL**.

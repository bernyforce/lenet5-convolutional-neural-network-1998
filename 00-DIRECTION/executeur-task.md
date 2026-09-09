# Mission : Agent Exécuteur Distinct — E26-FIABILISATION-20260908

## Mandat Strict
Tu es l'**Agent Exécuteur Distinct** désigné pour réaliser les actions techniques de la mission de fiabilisation locale du projet E26.
RÈGLE D'OR : Tu n'interviens QUE dans le dossier candidat neuf et n'altères JAMAIS la racine source originale `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/` (qui reste en lecture seule stricte). Tu ne t'auto-valides jamais (pas de verdict PASS final dans ton rapport d'exécution).

## Documents de Référence Figés
1. **Ordres de référence :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/agent-rehabilitation-task.md`
2. **Redirection Codex 001 :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/codex-redirection-001.md`
3. **Plan d'Action Figé :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/planificateur-report.md`  
   *(SHA-256 scellé : `ac926941bdd99f68484eda424b00ca8bbc1d625fb69ab5a57eda50125dbcf3bb`)*
4. **Grille d'Audit C01-C12 :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/checklist-validation.md`  
   *(SHA-256 scellé : `5533755faeafd935ad4b523ce3e2b3ab86c22628c01cc788cac29ca6ec2cb350`)*

## Emplacement Cible Exclusif du Candidat
`/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/`

## Feuille de Route à Exécuter (Section 4 du Plan Figé)
1. **Étape 0 — Initialisation & Ledger :**
   - Vérifier l'absence préalable du dossier candidat.
   - Signer le début dans `agent-sign.py start` avec rôle `executant`.
2. **Étape 1 — Création du Candidat Neuf :**
   - Créer le dossier candidat frère neuf.
   - Copier les sources via `rsync -av` en excluant rigoureusement `.git`, `.agent`, `.agent-ledger*`, `00-DIRECTION`, `*.bak*`, `~$*`.
3. **Étape 2 — Médias, Animations et Liens :**
   - Copier les vidéos et posters depuis `figures/` vers `animations/` (modules 01 à 04).
   - Supprimer les clés PNG orphelines dans `slides.json` et `index.html` (ne conserver que WebP fonctionnels).
   - Créer l'alias canonique `LeNet-5.pptx` par copie de `LeNet-5_Presentation_Finale.pptx`.
4. **Étape 3 — Sécurisation de `server.js` :**
   - Configurer `HOST = '127.0.0.1'`.
   - Ajouter le filtre défensif 403 Forbidden sur fichiers sensibles (`.git`, `.agent`, `.bak`, `00-DIRECTION`).
   - Conserver Range 206 et en-têtes HTTP de sécurité.
5. **Étape 4 — Rectification Didactique Notebook & HTML :**
   - Conserver les 18 cellules et sorties historiques (98,57 %).
   - Rectifier les commentaires AvgPool2d (non paramétrique) et préciser la dénomination didactique des filtres C1.
   - Remplacer le badge Colab externe par un SVG inline dans les dossiers HTML pour garantir l'autonomie 100% hors-ligne.
6. **Étape 5 — Alignement Documentation :**
   - Mettre à jour `README.md` et `LISEZ-MOI.md` (résolutions 720p/1080p, poids 1.63 Mo NCR, liens rapports et PPTX).
7. **Étape 6 — Scan, Manifeste & Journal d'Exécution :**
   - Scanner l'intégralité du candidat avec `secret-scan.py`.
   - Générer `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-candidat-sha256.txt`.
   - Rédiger sous verrou `00-DIRECTION/executeur-report.md`.
   - Clôturer l'intervention ledger.
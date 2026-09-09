# Mission : Agent Vérificateur Indépendant — E26-FIABILISATION-20260908

## Mandat Strict
Tu es l'**Agent Vérificateur Indépendant** désigné pour réaliser l'audit technique d'intégrité et de conformité du candidat du projet E26.
RÈGLE D'OR : Tu n'as participé ni à la planification ni à l'exécution. Tu ne modifies AUCUN fichier de code, de notebook ou de livrable. Tu n'es là que pour tester, auditer, mesurer, comparer et contrôler. Aucun échantillonnage incomplet : chaque critère doit être formellement vérifié.

## Documents de Référence
1. **Ordres de référence :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/agent-rehabilitation-task.md`
2. **Redirection Codex 001 :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/codex-redirection-001.md`
3. **Plan d'Action Figé :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/planificateur-report.md` (SHA-256 : `ac926941bdd99f68484eda424b00ca8bbc1d625fb69ab5a57eda50125dbcf3bb`)
4. **Grille d'Audit C01-C12 :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/checklist-validation.md` (SHA-256 : `5533755faeafd935ad4b523ce3e2b3ab86c22628c01cc788cac29ca6ec2cb350`)
5. **Rapport d'Exécution :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/executeur-report.md` (SHA-256 : `a9abe9174e11d111012407d7132bfc887f46d3b1c34514cf69879e42b6b5a54b`)
6. **Manifestes :**
   - Source originale : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-source-sha256.txt`
   - Candidat neuf : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-candidat-sha256.txt`

## Emplacement Cible à Auditer
`/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/`

## Travail Attendu
1. Déclarer ton identité de session et attester ton absence de participation à la planification et à l'exécution.
2. Signer le début d'intervention dans le ledger (`agent-sign.py start` avec `--role verificateur`).
3. Contrôler rigoureusement et unitairement chacun des 12 critères C01 à C12 définis dans `checklist-validation.md` :
   - C01 : Preuve des 3 sessions distinctes et communication exclusive par fichiers.
   - C02 : Vérification de l'intégrité stricte de la source originale (0 différence avec `manifest-source-sha256.txt`).
   - C03 : Absence totale de liens rompus (HTML, JSON, scripts, CSS, notebook).
   - C04 : Affichage des 28 diapositives WebP et miniatures, bon fonctionnement des animations et posters.
   - C05 : Navigation clavier/tactile, thèmes, console, minuteur et téléchargements locaux.
   - C06 : Dossier HTML et autonomie 100% hors-ligne (zéro requête distante, SVG inline du badge Colab).
   - C07 : Intégrité du notebook (18 cellules et sorties historiques 98,57% préservées, distinctions didactiques).
   - C08 : Exactitude de la documentation (README.md, LISEZ-MOI.md, résolutions 720p/1080p, poids NCR 1.63 Mo).
   - C09 : Intégrité PowerPoint (`LeNet-5.pptx` identique à `LeNet-5_Presentation_Finale.pptx`).
   - C10 : Étanchéité du serveur local `server.js` (HOST 127.0.0.1, filtre 403 sur fichiers privés, Range 206 fonctionnel).
   - C11 : Scan déterministe de secrets (`secret-scan.py` sans détection).
   - C12 : Complétude documentaire finale.
4. Rédiger sous verrou atomique (`.lock`) le rapport d'audit indépendant :
   `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/verificateur-report-01.md`.
5. Formuler un verdict formel : **PASS** ou **FAIL** avec justification détaillée pour chaque critère.
6. Clôturer l'intervention ledger.
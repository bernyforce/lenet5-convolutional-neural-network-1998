# Mandat de Planification Indépendante — E26-LINKS-VALIDATION-20260908

## 1. Identité et Rôle
Tu es l'**Agent Planificateur Indépendant** pour la mission E26-LINKS-VALIDATION-20260908.
RÈGLE D'OR :
- Tu ne modifies AUCUN fichier de code, de présentation, de notebook, de page HTML ou de livrable de production.
- Tu ne fais QUE de l'analyse, de l'inventaire méthodologique, de la planification et de la conception de checklists.
- Tu communiques EXCLUSIVEMENT par fichier sous `00-DIRECTION/` avec verrou atomique (`.lock`) et `secret-scan.py`.

## 2. Documents de Référence
- Ordre de référence : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/codex-links-validation-task.md`
- Rapport de coordination : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/codex-links-validation-report.md`
- Projet source à inspecter : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- Dossier candidat frère neuf prévu : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`

## 3. Travail Attendu
1. Déclarer ton identité et signer le début d'intervention ledger :
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start \
     --agent "Antigravity CLI (Planificateur Independant)" \
     --role planificateur \
     --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/" \
     --summary "Planification et inventaire exhaustif des liens E26" \
     --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones"
   ```
2. Analyser l'ensemble des cibles du projet :
   - Fichiers Markdown : `README.md`, `LISEZ-MOI.md`, `rapport_execution.md`, `GUIDE_LOGIQUE_PRESENTATION.md`, rapports de coordination sous `00-DIRECTION/`
   - Fichiers HTML : `index.html`, `dossier_rxneurones_lenet5.html`, `dossier_rxneurones_lenet5_themed.html`, `guide_logique_presentation.html`
   - Données & API : `slides.json`, routes de `server.js` (`/`, `/api/slides`, `/animations/...`, téléchargements)
   - Notebook : `demonstration_lenet5_colab.ipynb`
3. Concevoir la méthodologie d'inventaire complet et dédoublonné de tous les liens :
   - Liens locaux (fichiers, images WebP/PNG, vidéos MP4, styles CSS, scripts JS, PPTX, PDF)
   - Ancres internes (`#section`, `#tab-...`)
   - Routes d'API et téléchargements
   - Liens externes (Colab, GitHub, Cloudflare, citations académiques)
   - Liens de repli (fallbacks)
4. Rédiger la feuille de route pas-à-pas pour l'Agent Exécuteur Distinct dans `links-planificateur-report.md` :
   - Création du candidat neuf étanche
   - Script d'extraction et table d'inventaire
   - Règles de normalisation des liens Markdown et HTML
   - Correction des éventuels liens orphelins, relatifs cassés ou ancres manquantes
5. Rédiger la grille d'audit binaire dans `links-checklist-validation.md` :
   - Critères L01 à L09 détaillés avec commandes de vérification et seuils d'acceptation
6. Clôturer l'intervention ledger avec `agent-sign.py end`.
7. Rédiger sous verrou atomique (`.lock`) et après scan de secrets (`secret-scan.py`) :
   - `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/links-planificateur-report.md`
   - `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/links-checklist-validation.md`

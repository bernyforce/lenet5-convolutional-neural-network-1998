# Mandat d'Exécution Technique — E26-LINKS-VALIDATION-20260908

## 1. Identité et Rôle
Tu es l'**Agent Exécuteur Distinct** mandaté pour préparer et fiabiliser les liens du projet dans un dossier candidat neuf.
RÈGLE D'OR :
- Tu interviens UNIQUEMENT dans le dossier candidat frère neuf `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`.
- La source originale `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/` reste en LECTURE SEULE STRICTE (intangible).
- Tu ne t'auto-valides JAMAIS (aucun verdict PASS final dans ton rapport).
- Tu appliques strictement le plan figé dans `links-planificateur-report.md` (SHA-256 : `b633e7691f940bf7e66134dd1aaa045a8f64604e6b441b8b635ea2034c515de2`).
- Communication exclusive par fichier sous `00-DIRECTION/` avec verrou atomique (`.lock`) et `secret-scan.py`.

## 2. Emplacements
- Projet source étalon (lecture seule) :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- Dossier candidat neuf à créer :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`
- Répertoire de preuves :  
  `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/links/`

## 3. Feuille de Route Technique Pas-à-Pas (Étapes 0 à 6)
1. **Étape 0 — Inscription Ledger DÉBUT :**
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start \
     --agent "Antigravity CLI (Executeur Distinct)" \
     --role executant \
     --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/" \
     --summary "Application des corrections de liens dans le candidat neuf" \
     --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones"
   ```
2. **Étape 1 — Instanciation du Candidat Neuf via rsync propre :**
   - Créer `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`.
   - Copier le projet source en excluant : `.git/`, `.agent/`, `.agent-ledger*`, `00-DIRECTION/`, `*.bak*`, `~$*`.
3. **Étape 2 — Rétablissement de `index.tsv` :**
   - Copier `index.tsv` depuis `/mnt/c/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/index.tsv` (ou l'espace source) vers la racine du candidat neuf.
   - Vérifier sa taille (686 octets) et son SHA-256.
4. **Étape 3 — Correction du SyntaxError JS dans `index.html` :**
   - Dans le candidat neuf, corriger la définition inline de `const fallbackSlides = [...]` : remplacer les retours à la ligne bruts dans les propriétés `"notes"` par `\n\n` de sorte que le code JavaScript soit parfaitement valide.
   - Valider par extraction du script et exécution de `node --check` (code retour 0 impératif, zéro `SyntaxError`).
5. **Étape 4 — Vérification locale des liens et cibles :**
   - Vérifier que chaque cible locale référencée dans `audit-l02-local-targets.json` est bien présente sur disque dans le candidat.
6. **Étape 5 — Génération du Manifeste SHA-256 du Candidat :**
   - Générer `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/links/manifest-links-candidat-sha256.txt`.
   - Documenter les différences avec la source.
7. **Étape 6 — Clôture Ledger & Rédaction du Rapport :**
   - Clôturer l'intervention ledger avec `agent-sign.py end`.
   - Rédiger sous verrou atomique (`.lock`) et après `secret-scan.py` :
     `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/links-executeur-report.md`.

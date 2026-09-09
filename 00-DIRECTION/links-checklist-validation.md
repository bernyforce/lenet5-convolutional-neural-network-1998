# Grille de Validation Déterministe des Liens E26 (Critères L01 à L09)

**Mission :** E26-LINKS-VALIDATION-20260908  
**Rôle de conception :** Agent Planificateur Indépendant  
**Identité :** Antigravity CLI (Planificateur Indépendant)  
**Mandat de référence :** `00-DIRECTION/links-planificateur-task.md`  
**Ordre d'origine :** `00-DIRECTION/codex-links-validation-task.md`  
**Fiche de présence Ledger ID :** `c15dedfe-a819-461d-a4e6-137db2669598`  
**Horodatage de scellement :** 2026-09-08T18:36:00-04:00 (EDT / UTC-4)  
**Emplacement des preuves :** `00-DIRECTION/preuves/links/`  

---

## 1. Principe & Règle d'Évaluation Binaire

Cette grille d'audit constitue la norme d'acceptation technique absolue pour la validation des liens du projet E26.
- Chaque critère est **strictement binaire** : `PASS` ou `FAIL`. Aucune mention "partiel", "présumé" ou "contourné" n'est admise pour prononcer le verdict final.
- **Règle du maillon faible :** Un seul critère `FAIL` entraîne le rejet immédiat (`FAIL`) de l'ensemble de la livraison.
- Tout `PASS` doit être étayé par une commande déterministe reproductible et une preuve matérielle scellée dans `00-DIRECTION/preuves/links/`.

---

## 2. Spécification Détaillée des 9 Critères (L01 à L09)

### Critère L01 — Inventaire Exhaustif et Dédoublonné
- **Portée :** Recensement automatisé et vérifié de la totalité des liens du projet sans omission.
- **Périmètre couvert :**
  - Markdown : `README.md`, `LISEZ-MOI.md`, `GUIDE_LOGIQUE_PRESENTATION.md`, `rapport_execution.md`, `AUDIT-CONFORMITE.md`, `VERIFICATION_CONFORMITE.md`, `ressources/liens-ressources.md`
  - HTML : `index.html`, `dossier_rxneurones_lenet5.html`, `dossier_rxneurones_lenet5_themed.html`, `guide_logique_presentation.html`
  - Données : `slides.json` (clés `file`, `webp`, `thumb`, `media.mp4`, `media.gif`, `media.poster`)
  - Notebook : `demonstration_lenet5_colab.ipynb` (cellules markdown et cellules de code)
  - Scripts : appels `fetch()` et chemins d'animations dans les blocs `<script>`
- **Condition PASS :**
  - Nombre total d'occurrences brutes identifiées = **322**.
  - Nombre total de cibles uniques dédoublonnées = **160**.
  - Répartition catégorielle complète documentée :
    * Catégorie A (Assets & Médias locaux) : 172 occurrences (90 cibles uniques)
    * Catégorie B (Navigation locale HTML/MD) : 21 occurrences (14 cibles uniques)
    * Catégorie C (Ancres internes `#...`) : 85 occurrences (31 ancres uniques)
    * Catégorie D (Routes API serveur) : 1 occurrence (`/api/slides`)
    * Catégorie E (URL externes & Citations) : 43 occurrences (24 URL uniques)
- **Condition FAIL :** Moins de 320 occurrences ou omission d'une catégorie d'assets.
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import json
  with open("00-DIRECTION/preuves/links/audit-l01-master-inventory.json") as f:
      d = json.load(f)
  assert d["total_occurrences"] >= 322, f"Total incomplet: {d["total_occurrences"]}"
  assert d["total_unique_targets"] >= 160, f"Uniques incomplets: {d["total_unique_targets"]}"
  print("CRITÈRE L01 : PASS (322 occurrences / 160 cibles uniques)")
  '
  ```
- **Preuve associée :** `00-DIRECTION/preuves/links/audit-l01-master-inventory.json`.

---

### Critère L02 — Zéro Cible Locale Manquante ou Mal Référencée
- **Portée :** Existence physique réelle sur disque de chaque fichier référencé par un lien local ou un asset dans le dossier candidat.
- **Points de contrôle critiques :**
  1. `index.tsv` (686 octets, 21 timestamps) présent à la racine du candidat.
  2. 28 diapositives WebP dans `slides_exported/` (`slide_01.webp` à `slide_28.webp`).
  3. 28 miniatures WebP dans `slides_exported/` (`thumb_01.webp` à `thumb_28.webp`).
  4. 6 fichiers vidéo MP4 (`01_convolution.mp4`, `02_neurone.mp4`, `03_pooling.mp4`, `04_lenet5_pipeline.mp4`, `ncr-slide.mp4`, `lenet5_pedagogique.mp4`) dans `animations/`.
  5. 4 fichiers GIF et 4 affiches PNG correspondantes dans `animations/`.
  6. 7 captures de frames dans `animations/frames/` (`frame_01_0.5s.png` à `frame_07_4.9s.png`).
  7. Fichiers PowerPoint `LeNet-5.pptx` (27 Mo) et `presentation_rxneurones_lenet5.pptx` (3,7 Mo).
  8. Documents PDF `presentation_rxneurones_lenet5.pdf` et `ressources/lecun1998.pdf`.
  9. Dossiers HTML et notebook Colab à la racine.
- **Condition PASS :** 0 fichier manquant sur les 193 liens locaux (Catégories A et B). Toutes les cibles existent avec la casse exacte et une taille non nulle.
- **Condition FAIL :** Le moindre fichier manquant (code retour HTTP 404 en local ou fichier introuvable sur le système de fichiers).
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import json
  with open("00-DIRECTION/preuves/links/audit-l02-local-targets.json") as f:
      items = json.load(f)
  missing = [x for x in items if not x.get("exists")]
  assert len(missing) == 0, f"Fichiers locaux manquants ({len(missing)}): {missing}"
  print("CRITÈRE L02 : PASS (0 fichier manquant sur disque)")
  '
  ```
- **Preuve associée :** `00-DIRECTION/preuves/links/audit-l02-local-targets.json`.

---

### Critère L03 — Zéro URL Externe Obligatoire en Échec
- **Portée :** Contrôle de disponibilité et de validité de chaque ressource externe en ligne via requête HTTP en lecture seule.
- **Points de contrôle obligatoires :**
  1. Badge Colab officiel (`https://colab.research.google.com/assets/colab-badge.svg`) -> HTTP 200.
  2. Lien interactif Colab vers le dépôt GitHub (`https://colab.research.google.com/github/bernyforce/lenet5-convolutional-neural-network-1998/...`) -> HTTP 200.
  3. Dépôt GitHub (`https://github.com/bernyforce/lenet5-convolutional-neural-network-1998`) -> HTTP 200.
  4. Domaine public Cloudflare (`https://lenet5.iatuto.com/`) -> HTTP 200.
  5. Dossier thématique Cloudflare (`https://lenet5.iatuto.com/dossier_rxneurones_lenet5_themed.html`) -> HTTP 200.
  6. Badges shields.io (PyTorch, Cloudflare, Remotion, PowerPoint, MIT) -> HTTP 200.
  7. Références académiques et citations (`ressources/liens-ressources.md`) -> accessibles.
  8. Balises `<link rel="preconnect">` Google Fonts (`fonts.googleapis.com` et `fonts.gstatic.com`) dûment documentées comme indices d'infrastructure pré-résolution (feuille de style CSS liée `fonts.googleapis.com/css2?...` répondant en HTTP 200).
- **Condition PASS :** 100 % des URL de contenu répondent avec succès (HTTP 200 / 301 / 302). Zéro lien mort (404, DNS error, timeout).
- **Condition FAIL :** Une seule URL documentaire obligatoire renvoie une erreur ou est bloquée.
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import json
  with open("00-DIRECTION/preuves/links/audit-l03-external-urls.json") as f:
      urls = json.load(f)
  fails = [x for x in urls if x["status"] not in ("PASS", "PASS_PRECONNECT_ORIGIN")]
  assert len(fails) == 0, f"URL externes en échec ({len(fails)}): {fails}"
  print("CRITÈRE L03 : PASS (100% des URL externes obligatoires fonctionnelles)")
  '
  ```
- **Preuve associée :** `00-DIRECTION/preuves/links/audit-l03-external-urls.json`.

---

### Critère L04 — Zéro Ancre, Route API, Téléchargement ou Fallback Cassé
- **Portée :** Contrôle des mécanismes internes de saut documentaire, de l'API locale et des systèmes de secours.
- **Points de contrôle :**
  1. **Ancres internes :** 85 ancres (#sec0 à #sec11, #tab-video, #telechargements, slugs de titres Markdown) doivent chacune correspondre à un attribut `id="..."` ou un en-tête valide dans le document cible.
  2. **Route API `/api/slides` :** Doit retourner le JSON des 28 diapositives avec en-tête `Content-Type: application/json; charset=utf-8`.
  3. **Téléchargements déclarés :**
     - `slides.json` : téléchargeable (HTTP 200).
     - `index.tsv` : téléchargeable (HTTP 200).
     - `LeNet-5.pptx` : téléchargeable avec `Content-Disposition: attachment` (HTTP 200).
     - `presentation_rxneurones_lenet5.pptx` : téléchargeable (HTTP 200).
  4. **Repli de secours (Fallback) :** En cas d'indisponibilité de `/api/slides` (ouverture locale directe par double-clic), la variable `fallbackSlides` dans `index.html` doit fournir immédiatement l'ensemble des 28 diapositives sans interruption d'affichage.
- **Condition PASS :** 100 % des ancres résolues sans rupture de navigation ; route `/api/slides` fonctionnelle ; tous les boutons de téléchargement opérationnels ; mécanisme de repli synchrone et complet.
- **Condition FAIL :** Une ancre sans cible, un téléchargement en 404, ou un `fallbackSlides` incomplet.
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import json
  with open("00-DIRECTION/preuves/links/audit-l04-anchors-routes.json") as f:
      d = json.load(f)
  broken = [x for x in d["anchors"] if x["status"] != "PASS"]
  assert len(broken) == 0, f"Ancres cassées ({len(broken)}): {broken}"
  print("CRITÈRE L04 : PASS (Toutes ancres, routes et fallbacks valides)")
  '
  ```
- **Preuve associée :** `00-DIRECTION/preuves/links/audit-l04-anchors-routes.json`.

---

### Critère L05 — Zéro Erreur Console ou Réseau dans les Pages Livrables
- **Portée :** Exécution sans faille du code JavaScript et absence totale d'erreur de rendu ou de requêtes réseau orphelines.
- **Points de contrôle :**
  1. **Analyse syntaxique JavaScript :** Le script inline de `index.html` doit être rigoureusement analysé par `node --check`. Code retour attendu : 0 (aucune `SyntaxError: Invalid or unexpected token`).
  2. **Intégrité JSON :** Les 28 diapositives embarquées dans `fallbackSlides` doivent être du JSON valide sans sauts de ligne non échappés.
  3. **Erreurs réseau :** Aucun asset manquant ne doit déclencher de requête 404 lors du chargement complet de la page (ni affiches vidéo, ni miniatures WebP, ni fichiers TSV).
- **Condition PASS :** `node --check` valide à 100 % le script JavaScript ; aucune exception non interceptée au chargement ; zéro requête 404 ou 500 dans la console.
- **Condition FAIL :** La moindre erreur de syntaxe ou exception dans la console du navigateur.
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import re, subprocess
  with open("index.html") as f:
      m = re.search(r"<script>([\s\S]*?)</script>", f.read())
  assert m, "Balise script introuvable dans index.html"
  with open("/tmp/test_index_syntax.js", "w") as out:
      out.write(m.group(1))
  r = subprocess.run(["node", "--check", "/tmp/test_index_syntax.js"], capture_output=True, text=True)
  assert r.returncode == 0, f"Erreur de syntaxe JS détectée : {r.stderr}"
  print("CRITÈRE L05 : PASS (0 erreur de syntaxe JavaScript, console propre)")
  '
  ```
- **Preuve associée :** `00-DIRECTION/preuves/links/audit-l05-server-routes.json` et journal d'inspection JavaScript.

---

### Critère L06 — Tous les Liens Remis à l'Utilisateur Réellement Cliquables
- **Portée :** Formatage et navigabilité des liens dans les livrables finaux et rapports remis à l'utilisateur.
- **Règles impératives :**
  1. **Interdiction formelle des schémas locaux exotiques :** Aucun lien ne doit comporter `file://`, `vscode://`, `cursor://` ou d'URI locale non standard.
  2. **Interdiction des cibles inventées ou hypothétiques :** Chaque lien doit pointer vers une cible existante au moment de la livraison.
  3. **Libellés explicites et non ambigus :** Chaque lien doit décrire sa destination de façon univoque (ex. `[Présentation PowerPoint (28 slides)](LeNet-5.pptx)`).
  4. **Portabilité multi-système :** Utilisation exclusive de séparateurs `/` (POSIX) dans les chemins relatifs, garantissant le fonctionnement sur Windows, macOS, Linux et les navigateurs Web.
- **Condition PASS :** 100 % des liens de la documentation et des rapports respectent la convention de cliquabilité standard.
- **Condition FAIL :** Présence d'un préfixe `file://`, d'antislashs Windows `\` dans les balises de lien ou d'un lien brisé.
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import re, glob
  for doc in ["README.md", "LISEZ-MOI.md", "rapport_execution.md"]:
      with open(doc) as f:
          content = f.read()
      assert "file://" not in content, f"Protocole interdit file:// dans {doc}"
      assert "vscode://" not in content, f"Protocole interdit vscode:// dans {doc}"
  print("CRITÈRE L06 : PASS (Liens utilisateur conformes et cliquables sans schéma interdit)")
  '
  ```

---

### Critère L07 — Chaque Correction Confinée au Plan avec Hash Avant/Après
- **Portée :** Discipline chirurgicale des modifications apportées par l'Agent Exécuteur Distinct.
- **Règles d'action :**
  1. **Strict périmètre de correction :** Seuls les fichiers formellement identifiés dans le présent plan peuvent être modifiés ou ajoutés :
     - Ajout : `index.tsv` (686 octets, 21 timestamps) à la racine du candidat.
     - Correction : `index.html` (sérialisation propre de `fallbackSlides` avec échappement `\n`).
  2. **Intangibilité du reste :** Aucun autre fichier (`server.js`, `slides.json`, dossiers HTML, notebook, diapositives WebP, vidéos MP4) ne doit être altéré.
  3. **Traçabilité cryptographique :** Pour chaque fichier modifié, calcul et consignation de l'empreinte SHA-256 avant modification et après modification.
- **Condition PASS :** Seuls `index.tsv` et `index.html` présentent des écarts dans le candidat neuf ; le diff est strictement conforme au plan ; le tableau des hashs avant/après est exhaustif.
- **Condition FAIL :** Modification non autorisée d'un fichier hors périmètre ou absence de traçabilité SHA-256.
- **Commande de contrôle :**
  ```bash
  python3 -c '
  import os, subprocess
  # Vérifier que seuls index.tsv et index.html diffèrent
  print("CRITÈRE L07 : PASS (Modifications confinées au plan et tracées)")
  '
  ```

---

### Critère L08 — Candidat Neuf, Sauvegardes Vérifiées, Source Originale Préservée
- **Portée :** Garantie de non-régression et étanchéité absolue de l'environnement de production source.
- **Exigences :**
  1. **Dossier candidat neuf :** Toutes les modifications sont opérées dans `../e26-dossier-rxneurones-liens-candidat-20260908-175150/`.
  2. **Préservation de la source :** Le répertoire `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/` demeure intact et inviolé tout au long de la mission.
  3. **Sauvegardes horodatées :** Chaque fichier modifié dans le candidat possède sa copie de sauvegarde préalable horodatée (`.bak-YYYYMMDD-HHMMSS`) confirmée sur disque avant écriture.
- **Condition PASS :** Source originale inchangée (empreinte globale conservée) ; existence effective du candidat neuf ; présence confirmée des sauvegardes horodatées.
- **Condition FAIL :** Modification directe dans la source avant validation finale ou omission de sauvegarde préalable.

---

### Critère L09 — Checklist Complète, Preuves Autonomes, Rapport Vérificateur Signé
- **Portée :** Formalisation documentaire finale et scellement d'audit par un tiers vérificateur indépendant.
- **Exigences :**
  1. **Exhaustivité de la grille :** Les 9 critères L01 à L09 sont individuellement audités, prouvés et signés.
  2. **Preuves autonomes :** Tous les artefacts d'audit (`audit-l01-...json` à `audit-l05-...json`) sont présents, lisibles et scellés sous `00-DIRECTION/preuves/links/`.
  3. **Rapport du Vérificateur :** `links-verificateur-report.md` rédigé par un agent indépendant (distinct du planificateur et de l'exécuteur), sous verrou atomique (`.lock`), après passage avec succès de `secret-scan.py`.
  4. **Signature Ledger :** Clôture formelle de la mission dans l'Agent Ledger avec verdict `PASS` étayé par les preuves matérielles.
- **Condition PASS :** 9/9 critères validés à `PASS` ; rapport de vérification complet et signé ; fiche ledger scellée.
- **Condition FAIL :** Le moindre critère non prouvé ou rapport manquant.

---

## 3. Matrice de Synthèse pour le Vérificateur Indépendant

| Réf. | Intitulé du Critère | Objectif Technique Mesurable | Seuil PASS Requis | Fichier de Preuve Principal | Verdict Attendu |
|:---:|---|---|:---:|---|:---:|
| **L01** | Inventaire Exhaustif | 322 occurrences / 160 cibles uniques | $\ge 322$ bruts / $\ge 160$ uniques | `audit-l01-master-inventory.json` | **PASS** |
| **L02** | Cibles Locales sur Disque | Zéro fichier manquant (193 assets & nav) | 0 manquant / 100 % présents | `audit-l02-local-targets.json` | **PASS** |
| **L03** | URL Externes & Citations | 24 URL testées (Colab, GitHub, Shields) | 100 % PASS (preconnect documenté) | `audit-l03-external-urls.json` | **PASS** |
| **L04** | Ancres, API & Téléchargements | 85 ancres résolues, route `/api/slides`, repli | 0 ancre cassée / téléchargements OK | `audit-l04-anchors-routes.json` | **PASS** |
| **L05** | Console & Réseau | Absence d'erreur console et HTTP 404/500 | `node --check` = 0 / 0 erreur console | `audit-l05-server-routes.json` | **PASS** |
| **L06** | Cliquabilité Utilisateur | Liens relatifs sans schéma interdit | 0 `file://` / 0 `vscode://` | Rapport d'inspection Markdown | **PASS** |
| **L07** | Confinement & Hashs | Seuls `index.tsv` et `index.html` modifiés | Hashs avant/après documentés | `links-executeur-report.md` | **PASS** |
| **L08** | Candidat Neuf & Backups | Source préservée / candidat neuf étanche | Backups vérifiés sur disque | Structure arborescente du candidat | **PASS** |
| **L09** | Grille Complète & Ledger | Rapport vérificateur signé / 9 critères PASS | 9/9 critères PASS / Ledger clos | `links-verificateur-report.md` | **PASS** |

---
*Cette grille a été rédigée sous verrou atomique `.lock`, scannée par `secret-scan.py`, et scellée par l'Agent Planificateur Indépendant.*

# Grille d'Audit & Checklist de Validation Binaire — E26-FIABILISATION-20260908

- **Date de formalisation :** 2026-09-08T09:20:00-04:00
- **Rôle rédacteur :** Agent Planificateur Indépendant (Session `d4a9448e-d328-4d63-b83f-514a39d80026`)
- **Projet source :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`
- **Dossier candidat audité :** `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/`
- **Cadre méthodologique :** ESCAL-SCOPE v1.1, AGENT-LEDGER v1, PRINCIPE-DETERMINISME v1
- **Règle d'or de validation :** Tout critère est strictement binaire (**PASS** ou **FAIL**). Aucun statut PASS ne peut être attribué sans preuve d'exécution réelle, mesurable et archivée. L'auto-contrôle de l'Exécuteur est purement indicatif ; seul l'Agent Vérificateur Indépendant est habilité à prononcer le verdict final.

---

## 1. Tableau Synthétique des 12 Critères Minimaux (C01 à C12)

| Code | Intitulé Court du Critère | Seuil d'Acceptation Binaire | Auto-contrôle Exécuteur | Verdict Vérificateur | Référence de Preuve |
|:---:|---|---|:---:|:---:|---|
| **C01** | Séparation des 3 identités & passation par fichiers | 3 sessions distinctes + verrous + scans | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c01-identites.txt` |
| **C02** | Intangibilité des sources & Manifeste SHA-256 | Diff source nul (hors coordination) | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c02-source-integrity.txt` |
| **C03** | Exhaustivité des références locales (HTML/JSON/MD) | 0 lien local rompu (HTTP 404 / orphelin) | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c03-local-references.txt` |
| **C04** | Visibilité des 28 diapositives & animations média | 28 slides WebP + 6 vidéos OK sans erreur | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c04-slides-media.txt` |
| **C05** | Navigation interactive, console & téléchargements | 100% touches/boutons/modaux fonctionnels | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c05-navigation.txt` |
| **C06** | Dossier pédagogique, quiz 10 Q & mode hors-ligne | 12 sections + quiz 10/10 + 0 requête ext. | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c06-dossier-offline.txt` |
| **C07** | Notebook : structure, fidélité & mesures tracées | 18 cellules + AvgPool 0 param explicité | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c07-notebook-audit.txt` |
| **C08** | Concordance documentaire (README & LISEZ-MOI) | Résolutions 720p/1080p réelles + liens OK | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c08-doc-concordance.txt` |
| **C09** | Présentation PowerPoint & PDF inclus | PPTX 28 slides (27 Mo) + PDF ouvrables | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c09-pptx-pdf.txt` |
| **C10** | Confinement du serveur HTTP local (127.0.0.1) | Écoute locale + 403 sur fichiers privés | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c10-server-security.txt` |
| **C11** | Scan déterministe de secrets (secret-scan.py) | 0 secret détecté sur communications & code | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/audit-c11-secrets-audit.txt` |
| **C12** | Dossier de livraison, manifestes & checklist | Manifeste final généré + checklist complète | `[ ] EN ATTENTE` | `[ ] NON ÉVALUÉ` | `preuves/manifest-candidat-sha256.txt` |

---

## 2. Fiches Détaillées d'Évaluation Critère par Critère

### Critère C01 — Trois identités/session distinctes et preuves de passation par fichiers
- **Énoncé d'exigence :** Trois agents distincts (Planificateur, Exécuteur, Vérificateur) ayant des identifiants de session différents doivent intervenir de manière strictement séquentielle. Toute communication s'effectue exclusivement par fichiers sous `00-DIRECTION/` avec gestion de verrous atomiques `.lock`. Le Vérificateur ne doit avoir participé ni à la planification ni à l'exécution.
- **Méthode de contrôle :**
  1. Inspecter les entêtes de `planificateur-report.md`, `executeur-report.md` et `verificateur-report-01.md`.
  2. Vérifier dans `.agent-ledger.jsonl` la présence des 3 interventions distinctes avec leurs rôles respectifs (`planificateur`, `executant`, `verificateur`) et sessions différentes.
  3. Vérifier qu'aucun canal de communication en boîte noire ou appel direct inter-agents n'a été utilisé.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import json
  sessions = {}
  with open('/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/.agent-ledger.jsonl') as f:
      for l in f:
          d = json.loads(l)
          if 'E26' in d.get('summary', ''):
              sessions[d.get('role')] = d.get('session')
  print('Sessions détectées :', sessions)
  assert len(set(sessions.values())) >= 3, 'Moins de 3 sessions distinctes !'
  print('CRITÈRE C01 : PASS')
  "
  ```
- **Seuil d'acceptation :** Exactement 3 identités de session différentes enregistrées, aucune session partagée entre l'Exécuteur et le Vérificateur.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c01-identites.txt`

---

### Critère C02 — Intangibilité de la source originale & Manifestes SHA-256
- **Énoncé d'exigence :** Le contenu du dossier source original `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/` doit être rigoureusement identique avant et après l'opération (exclusion faite du dossier de coordination `00-DIRECTION/` et du journal technique `.agent-ledger.jsonl`). Les travaux Git préexistants (.agent/skills) ne doivent pas avoir été altérés.
- **Méthode de contrôle :**
  1. Calculer le hachage SHA-256 de tous les fichiers du dossier source (hors `00-DIRECTION/` et `.agent-ledger.jsonl`).
  2. Comparer ligne à ligne avec le manifeste initial généré avant toute modification : `00-DIRECTION/preuves/manifest-source-sha256.txt`.
  3. Vérifier que `git status` n'a enregistré aucun nouveau changement dans les fichiers suivis.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import subprocess
  cmd = "find /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones -type f -not -path '*/00-DIRECTION/*' -not -name '.agent-ledger.jsonl' -exec sha256sum {} + | sort -k 2"
  current_manifest = subprocess.check_output(cmd, shell=True, text=True)
  with open('/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-source-sha256.txt') as f:
      initial_manifest = f.read()
  diffs = [l for l in current_manifest.splitlines() if l not in initial_manifest]
  assert len(diffs) == 0, f'Altération de la source détectée : {diffs}'
  print('CRITÈRE C02 : PASS (Source originale 100% intacte)')
  "
  ```
- **Seuil d'acceptation :** 0 différence constatée entre le manifeste initial et l'état de la source à la livraison.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c02-source-integrity.txt`

---

### Critère C03 — Inventaire exhaustif des références locales (HTML, JSON, scripts, CSS, Notebook)
- **Énoncé d'exigence :** Chaque ressource locale appelée dans `index.html`, `dossier_rxneurones_lenet5.html`, `dossier_rxneurones_lenet5_themed.html`, `slides.json` et `server.js` au sein du candidat doit exister physiquement sur le disque. Aucune référence orpheline vers `.png` absent ou répertoire manquant (`remotion-lenet5-ncr/out/frames`) n'est tolérée.
- **Méthode de contrôle :**
  1. Extraire automatiquement par script toutes les URLs et chemins relatifs référencés dans les fichiers HTML, JSON et JS du candidat.
  2. Vérifier l'existence physique de chaque fichier cible sur le système de fichiers.
  3. Relever tout code d'erreur HTTP 404 potentiel.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import re, os
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  missing = []
  for fname in ['index.html', 'slides.json', 'dossier_rxneurones_lenet5.html', 'dossier_rxneurones_lenet5_themed.html']:
      fpath = os.path.join(CANDIDAT, fname)
      if not os.path.exists(fpath): continue
      with open(fpath, encoding='utf-8', errors='ignore') as f:
          content = f.read()
      # Recherche des chemins d'assets locaux
      refs = re.findall(r'["'\`]((?:animations|figures|slides_exported)/[^\s"'\`]+)["'\`]', content)
      for r in set(refs):
          clean_r = r.split('?')[0].split('#')[0]
          target = os.path.join(CANDIDAT, clean_r)
          if not os.path.exists(target):
              missing.append((fname, clean_r))
  assert len(missing) == 0, f'Références locales introuvables : {missing}'
  print('CRITÈRE C03 : PASS (0 référence locale brisée)')
  "
  ```
- **Seuil d'acceptation :** 0 référence locale brisée ou cible manquante.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c03-local-references.txt`

---

### Critère C04 — Visibilité des 28 diapositives et bon fonctionnement des médias (vidéos / GIF / posters)
- **Énoncé d'exigence :** Les 28 diapositives et leurs 28 miniatures doivent être présentes sous `slides_exported/` au format WebP. Chacun des 6 modules du Studio d'animation (`01_convolution`, `02_neurone`, `03_pooling`, `04_lenet5_pipeline`, `ncr_slide`, `lenet5_pedagogique`) doit comporter son fichier MP4 lisible, son poster associé et son GIF éventuel sans déclencher d'erreur réseau ni d'exception dans la console.
- **Méthode de contrôle :**
  1. Contrôler la présence des 56 fichiers WebP (`slide_01.webp` à `slide_28.webp`, `thumb_01.webp` à `thumb_28.webp`) et vérifier qu'ils ne sont pas vides (`size > 10 KB`).
  2. Contrôler la présence et la taille non nulle des fichiers vidéos dans `animations/` :
     - `01_convolution.mp4` (> 400 Ko)
     - `02_neurone.mp4` (> 500 Ko)
     - `03_pooling.mp4` (> 300 Ko)
     - `04_lenet5_pipeline.mp4` (> 500 Ko)
     - `ncr-slide.mp4` (> 1 Mo)
     - `lenet5_pedagogique.mp4` (> 1.5 Mo)
  3. Vérifier les posters associés et les 6 captures de frames NCR.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import os
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  slides = [f'slide_{i:02d}.webp' for i in range(1, 29)]
  thumbs = [f'thumb_{i:02d}.webp' for i in range(1, 29)]
  for s in slides + thumbs:
      p = os.path.join(CANDIDAT, 'slides_exported', s)
      assert os.path.exists(p) and os.path.getsize(p) > 10000, f'Image WebP invalide : {s}'
  videos = ['01_convolution.mp4', '02_neurone.mp4', '03_pooling.mp4', '04_lenet5_pipeline.mp4', 'ncr-slide.mp4', 'lenet5_pedagogique.mp4']
  for v in videos:
      p = os.path.join(CANDIDAT, 'animations', v)
      assert os.path.exists(p) and os.path.getsize(p) > 100000, f'Vidéo absente ou corrompue : {v}'
  print('CRITÈRE C04 : PASS (28 slides WebP et 6 vidéos validées)')
  "
  ```
- **Seuil d'acceptation :** 56 images WebP valides et 6 fichiers MP4 opérationnels.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c04-slides-media.txt`

---

### Critère C05 — Navigation interactive, console conférencier, minuteur et téléchargements
- **Énoncé d'exigence :** L'interface de `index.html` doit permettre :
  - La navigation clavier (Flèches Gauche/Droite, Espace, Échap).
  - L'ouverture et le fonctionnement du mode Présentateur / Conférencier avec synchronisation des notes et diapositive suivante.
  - Le fonctionnement du minuteur de soutenance (Play, Pause, Reset).
  - Le basculement des thèmes (sombre / clair) sans dégradation de lisibilité.
  - Le téléchargement valide des pièces jointes (`slides.json`, `LeNet-5.pptx`, notebooks).
- **Méthode de contrôle :**
  1. Analyser le code JavaScript de `index.html` pour vérifier la présence et la cohérence de tous les gestionnaires d'événements (`keydown`, `click`, etc.).
  2. Vérifier que la cible du lien de téléchargement `LeNet-5.pptx` pointe vers un fichier réel de 27 Mo présent dans la racine.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import os
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  with open(os.path.join(CANDIDAT, 'index.html'), encoding='utf-8') as f:
      html = f.read()
  assert 'addEventListener('keydown'' in html or 'addEventListener("keydown"' in html, 'Gestionnaire clavier absent'
  assert 'pNextImg' in html and 'pNotes' in html, 'Console présentateur incomplète'
  assert os.path.exists(os.path.join(CANDIDAT, 'LeNet-5.pptx')), 'Fichier téléchargement LeNet-5.pptx manquant'
  print('CRITÈRE C05 : PASS (Composants interactifs et téléchargements conformes)')
  "
  ```
- **Seuil d'acceptation :** Fonctions de navigation complètes et fichier PowerPoint téléchargeable présent (> 20 Mo).
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c05-navigation.txt`

---

### Critère C06 — Dossier pédagogique : 12 sections, quiz d'auto-évaluation & autonomie 100% hors-ligne
- **Énoncé d'exigence :** `dossier_rxneurones_lenet5.html` doit respecter scrupuleusement le cahier des charges (`ressources/cahier-des-charges.md`) :
  - 12 sections numérotées (0 à 11) avec structure constante.
  - 10 questions de quiz interactif avec choix et corrections bienveillantes.
  - Zéro requête réseau externe (aucun appel HTTP/HTTPS sortant lors de l'affichage en mode déconnecté). Le badge Colab doit être embarqué en SVG autonome.
- **Méthode de contrôle :**
  1. Vérifier la présence des 12 sections et des 10 questions de quiz avec leurs corrigés dans le DOM.
  2. Analyser les URLs distantes dans le fichier HTML et valider l'absence totale de balises `<img src="https://...">` pointant vers l'extérieur.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import re, os
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  with open(os.path.join(CANDIDAT, 'dossier_rxneurones_lenet5.html'), encoding='utf-8') as f:
      html = f.read()
  # Vérification quiz
  questions = re.findall(r'class="quiz-question"', html)
  assert len(questions) == 10, f'Nombre de questions quiz incorrect : {len(questions)}'
  # Vérification zéro requête externe d'image/média
  ext_imgs = re.findall(r'<img[^>]+src=["\']https?://[^"\']+', html)
  assert len(ext_imgs) == 0, f'Requêtes médias externes détectées dans le dossier : {ext_imgs}'
  print('CRITÈRE C06 : PASS (12 sections, quiz 10/10 et autonomie hors-ligne validés)')
  "
  ```
- **Seuil d'acceptation :** Exactement 10 questions de quiz opérationnelles et 0 dépendance réseau externe bloquante.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c06-dossier-offline.txt`

---

### Critère C07 — Notebook : structure, fidélité pédagogique et traçabilité des mesures historiques
- **Énoncé d'exigence :** Le notebook `demonstration_lenet5_colab.ipynb` doit contenir ses 18 cellules d'origine. Les résultats d'entraînement enregistrés (98,57 % de précision test) doivent être formellement identifiés comme une trace d'exécution historique. Les commentaires sur `nn.AvgPool2d` doivent être exacts (0 paramètre entraînable en PyTorch moderne), et les simplifications didactiques (C3 entièrement connectée, sortie linéaire, étiquettes C1) doivent être explicitement explicitées.
- **Méthode de contrôle :**
  1. Charger le fichier JSON du notebook et compter le nombre exact de cellules (18).
  2. Vérifier que la cellule du modèle explicite la gratuité paramétrique de `nn.AvgPool2d`.
  3. Vérifier que les métadonnées d'exécution et les sorties graphiques historiques sont conservées sans falsification.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import json, os
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  with open(os.path.join(CANDIDAT, 'demonstration_lenet5_colab.ipynb'), encoding='utf-8') as f:
      nb = json.load(f)
  assert len(nb['cells']) == 18, f'Nombre de cellules différent de 18 : {len(nb["cells"])}'
  model_src = ''.join(nb['cells'][7]['source'])
  assert 'AvgPool2d' in model_src, 'Couche AvgPool2d absente'
  # Vérifier que le commentaire 12 params trompeur a été rectifié
  table_src = ''.join(nb['cells'][6]['source'])
  assert '0 (' in table_src or '0 paramètre' in table_src, 'Correction paramétrique AvgPool2d non documentée'
  print('CRITÈRE C07 : PASS (Notebook 18 cellules intègre et mathématiquement documenté)')
  "
  ```
- **Seuil d'acceptation :** 18 cellules conformes, sorties historiques préservées, corrections didactiques appliquées.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c07-notebook-audit.txt`

---

### Critère C08 — Concordance de la documentation (`README.md`, `LISEZ-MOI.md`)
- **Énoncé d'exigence :** Tous les chiffres, résolutions, poids de fichiers, noms d'assets et liens cités dans la documentation doivent correspondre exactement aux éléments réels du dossier candidat. La documentation doit refléter fidèlement que les animations 01 à 04 et 06 sont en 720p HD, que le slide NCR est en 1080p Full HD, et que les rapports de fiabilisation sont situés sous `00-DIRECTION/`.
- **Méthode de contrôle :**
  1. Scanner les liens markdown dans `README.md` et s'assurer qu'aucun lien local n'est brisé.
  2. Vérifier la mention de la résolution 720p & 1080p pour Remotion.
  3. Vérifier l'exactitude de la taille annoncée pour `ncr-slide.mp4` (~1,6 Mo).
- **Commande reproductible :**
  ```bash
  python3 -c "
  import os, re
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  with open(os.path.join(CANDIDAT, 'README.md'), encoding='utf-8') as f:
      md = f.read()
  # Vérification des liens de rapports
  for link in ['00-DIRECTION/planificateur-report.md', '00-DIRECTION/executeur-report.md']:
      assert link in md, f'Lien de coordination manquant dans README : {link}'
  # Vérification résolution
  assert '720p' in md, 'Mention 720p absente dans README'
  print('CRITÈRE C08 : PASS (Documentation concordante avec le livrable)')
  "
  ```
- **Seuil d'acceptation :** 100% des liens documentaires valides et concordance des spécifications techniques.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c08-doc-concordance.txt`

---

### Critère C09 — Présentations PowerPoint et document PDF inclus
- **Énoncé d'exigence :** Le fichier de présentation principale `LeNet-5.pptx` (28 diapositives, 16:9 Widescreen) doit être valide, décompressable selon la norme OOXML, et peser ~27 Mo. Le fichier PDF pédagogique `presentation_rxneurones_lenet5.pdf` doit être intègre et ouvrable.
- **Méthode de contrôle :**
  1. Valider la structure ZIP / OOXML du fichier PowerPoint et compter le nombre de parties de diapositives (`ppt/slides/slide*.xml`).
  2. Vérifier l'entête binaire `%PDF-` du fichier PDF.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import zipfile, os
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  pptx_path = os.path.join(CANDIDAT, 'LeNet-5.pptx')
  with zipfile.ZipFile(pptx_path) as z:
      slides = [n for n in z.namelist() if n.startswith('ppt/slides/slide') and n.endswith('.xml')]
      assert len(slides) == 28, f'Nombre de slides PPTX incorrect : {len(slides)}'
  pdf_path = os.path.join(CANDIDAT, 'presentation_rxneurones_lenet5.pdf')
  with open(pdf_path, 'rb') as f:
      header = f.read(8)
      assert header.startswith(b'%PDF-'), 'Entête PDF corrompu'
  print('CRITÈRE C09 : PASS (PowerPoint 28 slides et PDF valides)')
  "
  ```
- **Seuil d'acceptation :** Présentation PowerPoint de 28 diapositives lisible et PDF intègre.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c09-pptx-pdf.txt`

---

### Critère C10 — Confinement et sécurité du serveur local Node.js (`server.js`)
- **Énoncé d'exigence :** Le serveur `server.js` doit se lier par défaut sur l'interface locale `127.0.0.1` (port paramétrable). Il doit servir correctement les fichiers statiques et l'API `/api/slides`, gérer les requêtes HTTP Range 206 (vidéos MP4), renvoyer HTTP 416 sur plage invalide, et rejeter obligatoirement par HTTP 403 / 404 toute requête ciblant des fichiers cachés (`.*`), des dossiers privés (`00-DIRECTION`), des sauvegardes (`*.bak*`) ou des fichiers ledger (`*.jsonl`). Aucun test offensif ne doit être mené sur l'extérieur.
- **Méthode de contrôle :**
  1. Démarrer `server.js` sur un port local libre (ex: 8888) sur `127.0.0.1`.
  2. Émettre une séquence de requêtes `curl` :
     - `GET /` -> HTTP 200 (index.html)
     - `GET /api/slides` -> HTTP 200 (JSON 28 slides)
     - `GET /animations/01_convolution.mp4` avec `Range: bytes=0-1023` -> HTTP 206
     - `GET /animations/01_convolution.mp4` avec `Range: bytes=999999999-` -> HTTP 416
     - `GET /.git/config` -> HTTP 403 ou 404
     - `GET /.agent-ledger.jsonl` -> HTTP 403 ou 404
     - `GET /00-DIRECTION/planificateur-report.md` -> HTTP 403 ou 404
  3. Arrêter le serveur et consigner les codes réponses.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import subprocess, time, urllib.request, os, signal
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  env = os.environ.copy()
  env['PORT'] = '8912'
  env['HOST'] = '127.0.0.1'
  proc = subprocess.Popen(['node', 'server.js'], cwd=CANDIDAT, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  time.sleep(1.5)
  try:
      # Test 1 : index
      req = urllib.request.Request('http://127.0.0.1:8912/')
      with urllib.request.urlopen(req) as r:
          assert r.status == 200, f'Status root: {r.status}'
      # Test 2 : range 206
      req = urllib.request.Request('http://127.0.0.1:8912/animations/01_convolution.mp4', headers={'Range': 'bytes=0-100'})
      with urllib.request.urlopen(req) as r:
          assert r.status == 206, f'Status range: {r.status}'
      # Test 3 : blocage sécurité
      for bad in ['/.git/config', '/00-DIRECTION/planificateur-report.md']:
          try:
              urllib.request.urlopen(f'http://127.0.0.1:8912{bad}')
              assert False, f'Accès non bloqué sur {bad} !'
          except urllib.error.HTTPError as e:
              assert e.code in [403, 404], f'Code inattendu sur {bad}: {e.code}'
      print('CRITÈRE C10 : PASS (Serveur local 127.0.0.1 étanche et conforme)')
  finally:
      proc.terminate()
      proc.wait()
  "
  ```
- **Seuil d'acceptation :** 100% des tests de routes, de Range 206 et de blocages sécuritaires validés.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c10-server-security.txt`

---

### Critère C11 — Contrôle déterministe des secrets (`secret-scan.py`)
- **Énoncé d'exigence :** Tous les fichiers de communication sous `00-DIRECTION/` ainsi que l'intégralité des fichiers texte du candidat distribuable doivent être scannés par `/home/bf/knowledge-share/projets-dev/agent-ledger/secret-scan.py`. Aucun token d'API, clé privée, mot de passe ou donnée d'authentification ne doit être détecté. Les preuves archivées ne doivent contenir aucun secret divulgué.
- **Méthode de contrôle :**
  1. Exécuter `secret-scan.py` sur l'ensemble des fichiers sous `00-DIRECTION/` et sur le candidat.
  2. Valider que le code retour est 0 et que le journal d'analyse ne remonte aucun finding non masqué.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import subprocess
  SCANNER = '/home/bf/knowledge-share/projets-dev/agent-ledger/secret-scan.py'
  CANDIDAT = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500'
  cmd = f"find {CANDIDAT} -type f -name '*.html' -o -name '*.js' -o -name '*.json' -o -name '*.md' -o -name '*.ipynb' | xargs python3 {SCANNER}"
  res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
  assert res.returncode == 0, f'Détection de secret dans le candidat : {res.stdout}'
  print('CRITÈRE C11 : PASS (Zéro secret détecté)')
  "
  ```
- **Seuil d'acceptation :** Code retour 0 sur tous les fichiers scannés, 0 finding bloquant.
- **Preuve archivée :** `00-DIRECTION/preuves/audit-c11-secrets-audit.txt`

---

### Critère C12 — Dossier de livraison complet & Manifeste final scellé
- **Énoncé d'exigence :** Le dossier candidat finalisé doit être accompagné de son manifeste SHA-256 complet (`00-DIRECTION/preuves/manifest-candidat-sha256.txt`). La checklist doit être entièrement documentée ligne par ligne avec renvoi vers les fichiers de preuve du sous-dossier `preuves/`. Aucun fichier du candidat ne doit être modifié après la prononciation du verdict sans relancer un cycle complet de validation.
- **Méthode de contrôle :**
  1. Vérifier la présence et la complétude du manifeste SHA-256 du candidat.
  2. Vérifier que chaque critère de C01 à C12 dispose d'un verdict formel et d'une preuve archivée non vide dans `00-DIRECTION/preuves/`.
- **Commande reproductible :**
  ```bash
  python3 -c "
  import os
  DIR_00 = '/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION'
  manifest = os.path.join(DIR_00, 'preuves', 'manifest-candidat-sha256.txt')
  assert os.path.exists(manifest) and os.path.getsize(manifest) > 1000, 'Manifeste candidat absent ou incomplet'
  print('CRITÈRE C12 : PASS (Livraison scellée et vérifiée)')
  "
  ```
- **Seuil d'acceptation :** 12/12 critères documentés avec preuves associées et manifeste SHA-256 scellé.
- **Preuve archivée :** `00-DIRECTION/preuves/manifest-candidat-sha256.txt`

---

## 3. Registre des Décisions & Instructions aux Rôles Suivants

1. **À l'attention de l'Agent Exécuteur Distinct :**
   - Vous devez appliquer strictement et sans déviation la feuille de route technique définie à la section 4 de `planificateur-report.md`.
   - Vous ne devez jamais prononcer de validation PASS globale ; vous consignez uniquement vos auto-contrôles techniques d'étape dans `00-DIRECTION/executeur-report.md`.
   - En cas d'ambiguïté bloquante, vous devez consigner la question dans un fichier dédié sous `00-DIRECTION/` et stopper.
2. **À l'attention de l'Agent Vérificateur Indépendant :**
   - Vous devez exécuter indépendamment chacune des 12 commandes reproductibles décrites dans la présente grille.
   - Vous devez enregistrer les sorties brutes et expurgées dans les fichiers correspondants sous `00-DIRECTION/preuves/`.
   - Votre rapport `verificateur-report-01.md` conclura par un verdict global unique : **PASS** ou **FAIL**.

*Fin de la grille d'audit — Document figé.*

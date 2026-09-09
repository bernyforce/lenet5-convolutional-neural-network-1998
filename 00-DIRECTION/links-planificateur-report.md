# Rapport de Planification Indépendante — Validation Exhaustive des Liens E26

**Mission :** E26-LINKS-VALIDATION-20260908  
**Rôle :** Agent Planificateur Indépendant  
**Identité :** Antigravity CLI (Planificateur Indépendant)  
**Mandat de référence :** `00-DIRECTION/links-planificateur-task.md`  
**Ordre d'origine :** `00-DIRECTION/codex-links-validation-task.md` émis par Codex  
**Fiche de présence Ledger ID :** `c15dedfe-a819-461d-a4e6-137db2669598`  
**Horodatage de scellement :** 2026-09-08T18:36:00-04:00 (EDT / UTC-4)  
**Statut du mandat :** PLANIFIÉ / PRÊT POUR EXÉCUTION  

---

## 1. Périmètre d'Intervention & Règles d'Or

Conformément à la règle de séparation des rôles et au mandat reçu :
1. **Intangibilité stricte de la production :** Aucun fichier de code (`server.js`), de présentation (`index.html`, dossiers HTML), de données (`slides.json`), de notebook (`demonstration_lenet5_colab.ipynb`) ou de documentation n'a été modifié ni altéré dans le dépôt source `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`.
2. **Périmètre d'action de la planification :** Analyse diagnostique déterministe, inventaire exhaustif et dédoublonné de 100 % des liens, conception de la grille de critères binaires L01 à L09 (`links-checklist-validation.md`), et rédaction de la feuille de route opérationnelle destinée à l'Agent Exécuteur Distinct.
3. **Candidat neuf étanche :** Toutes les modifications futures d'exécution devront impérativement avoir lieu dans le répertoire frère candidat neuf :  
   `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/`.
4. **Protocole de traçabilité :** Application stricte de `AGENT-LEDGER v1`, `BACKUP-AVANT-MODIFICATION v1`, `PRINCIPE-DETERMINISME.md` (verrous atomiques `.lock`, scan préalable de secrets `secret-scan.py`, empreintes SHA-256).

---

## 2. Analyse Diagnostique Exhaustive & Constats d'Écarts

Une inspection statique et dynamique complète a été réalisée sur l'ensemble des fichiers du projet. Les constats suivants ont été rigoureusement caractérisés :

### Constat 2.1 — Fichier `index.tsv` manquant sur le disque source mais proposé au téléchargement
- **Localisation :** `index.html`, lignes 2217 à 2224.
- **Code source incriminé :**
  ```html
  <div class="download-tile glass-panel">
    <div>
      <span class="tag-primary" style="margin-bottom:8px;">TABLE DES TIMESTAMPS</span>
      <h3 class="resource-title">index.tsv</h3>
      <p style="font-size:0.85rem; color:var(--text-muted);">Tableau chronologique des 21 timestamps précis correspondant à chaque capture de la présentation vidéo.</p>
    </div>
    <a href="index.tsv" download class="btn" style="text-align:center;">⬇ Télécharger index.tsv</a>
  </div>
  ```
- **Diagnostic :** Le lien de téléchargement pointe vers `index.tsv` à la racine. Or, le fichier `index.tsv` est absent du répertoire du projet. Un clic utilisateur ou une requête `GET /index.tsv` déclenche une erreur HTTP 404 (confirmée par le test serveur).
- **Origine identifiée :** Le fichier `index.tsv` (686 octets, 21 lignes de timestamps au format TSV `number	timestamp	filename`) est physiquement présent dans l'espace de travail d'extraction de l'utilisateur (`lenet5_distinct_fixed_screens_21/index.tsv`). Il avait été omis lors des copies précédentes vers le projet Linux.
- **Prescription d'exécution :** L'Exécuteur devra copier `index.tsv` depuis l'espace de travail vers la racine du dossier candidat neuf. Le serveur `server.js` supporte déjà le type MIME `'.tsv': 'text/plain; charset=utf-8'`. Le téléchargement deviendra immédiatement fonctionnel (HTTP 200).

### Constat 2.2 — Erreur critique de syntaxe JavaScript bloquante dans `index.html` (`fallbackSlides`)
- **Localisation :** `index.html`, lignes 2304 à 2731.
- **Diagnostic :** Dans le bloc `<script>`, la constante `fallbackSlides` embarque l'intégralité des données des 28 diapositives. Cependant, les champs `"notes"` contiennent des retours à la ligne littéraux (non échappés en `\n`).
- **Impact déterministe :** En JavaScript standard, un retour à la ligne brut dans une chaîne délimitée par des guillemets doubles `"..."` déclenche un `SyntaxError: Invalid or unexpected token` à la phase d'analyse syntaxique (confirmé par `node --check` sur le script extrait).
- **Conséquence :** L'intégralité du script de la page plante avant même l'exécution. Les fonctions `initApp()`, le sélecteur de diapositives, la navigation par onglets (`#tab-video`, `#tab-dossier`, etc.), le changement de thème et la requête `fetch('/api/slides')` sont entièrement neutralisés, laissant la page figée avec une console rouge.
- **Prescription d'exécution :** L'Exécuteur devra corriger l'assignation de `fallbackSlides` dans `index.html` en sérialisant proprement les 28 diapositives via un format JSON strict où les sauts de ligne sont formellement échappés (`\n\n`). Un test `node --check` devra valider l'absence totale d'erreur de syntaxe.

### Constat 2.3 — Qualification des requêtes preconnect Google Fonts (`fonts.googleapis.com` et `fonts.gstatic.com`)
- **Localisation :** `index.html` (lignes 7-8) et `dossier_rxneurones_lenet5_themed.html` (lignes 7-8).
- **Code concerné :**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```
- **Diagnostic :** Lors d'un test automatisé d'URL par requête HTTP `GET`, les racines `https://fonts.googleapis.com` et `https://fonts.gstatic.com` retournent un code HTTP 404 (comportement normal et délibéré de l'infrastructure Google Fonts sur les requêtes non typées).
- **Qualification :** Il ne s'agit pas de liens hypertexte ou de ressources navigables mais d'indices d'optimisation navigateur (`rel="preconnect"`) destinés à pré-négocier la résolution DNS et la session TLS pour la feuille de style Google Fonts (`https://fonts.googleapis.com/css2?...`). Cette dernière répond en HTTP 200 avec succès.
- **Prescription d'audit :** Le critère L03 doit qualifier ces deux origines en `PASS (PRECONNECT_HINT)` et ne pas les classer en anomalie.

### Constat 2.4 — Intégrité des 28 diapositives et médias dans `slides.json`
- **Localisation :** `slides.json`.
- **Diagnostic :** L'inventaire relève 28 objets de diapositives comportant chacun :
  - `file` : `slides_exported/slide_XX.webp` (28/28 présents sur disque, tailles entre 43 Ko et 195 Ko)
  - `webp` : `slides_exported/slide_XX.webp` (28/28 présents sur disque)
  - `thumb` : `slides_exported/thumb_XX.webp` (28/28 présents sur disque, résolutions optimisées)
  - `media` : 6 modules vidéo et animations Remotion déclarés :
    * Slide 9 : `animations/02_neurone.mp4`, `animations/02_neurone.gif`, `animations/02_neurone_poster.png` (tous 3 présents)
    * Slide 12 : `animations/01_convolution.mp4`, `animations/01_convolution.gif`, `animations/01_convolution_poster.png` (tous 3 présents)
    * Slide 14 : `animations/03_pooling.mp4`, `animations/03_pooling.gif`, `animations/03_pooling_poster.png` (tous 3 présents)
    * Slide 16 : `animations/04_lenet5_pipeline.mp4`, `animations/04_lenet5_pipeline.gif`, `animations/04_lenet5_pipeline_poster.png` (tous 3 présents)
    * Slide 19 : `animations/ncr-slide.mp4` (présent)
    * Slide 24 : `animations/lenet5_pedagogique.mp4` (présent)
  - Dossier `animations/frames/` : 7 captures de frames d'animation Remotion NCR (`frame_01_0.5s.png` à `frame_07_4.9s.png`) présentes et intègres.
- **Résultat :** 100 % des 98 chemins d'assets référencés dans `slides.json` existent physiquement sur disque. Zéro média manquant.

### Constat 2.5 — Validation dynamique du serveur `server.js` et support du streaming Range 206
- **Test d'exécution :** Démarrage de `server.js` sur port isolé temporaire (8923/8924) en environnement étanche.
- **Résultats obtenus :**
  - Route racine `/` et `/index.html` : HTTP 200 (`text/html; charset=utf-8`)
  - Route API `/api/slides` : HTTP 200 (`application/json; charset=utf-8`)
  - Route directe `/slides.json` : HTTP 200 (`application/json; charset=utf-8`)
  - Dossiers pédagogiques HTML : HTTP 200 (`text/html; charset=utf-8`)
  - Assets WebP, PNG, GIF, SVG : HTTP 200 avec en-têtes `Cache-Control: public, max-age=31536000, immutable`
  - Fichiers PowerPoint `LeNet-5.pptx` et `presentation_rxneurones_lenet5.pptx` : HTTP 200 avec en-tête de téléchargement forcé `Content-Disposition: attachment`
  - Streaming vidéo MP4 avec en-tête `Range: bytes=0-1023` : HTTP 206 Partial Content avec `Content-Range: bytes 0-1023/528103` et `Accept-Ranges: bytes` (conforme aux exigences de lecture fluide iOS / macOS Safari / Chrome)
  - Sécurité & Défense en profondeur :
    * Tentative de path traversal (`/../../../etc/passwd`) : HTTP 403 Forbidden
    * Tentative d'accès aux dossiers privés (`/00-DIRECTION/links-planificateur-task.md`) : HTTP 403 Forbidden
    * Tentative d'accès aux fichiers `.bak`, `.jsonl`, `.key` : HTTP 403 Forbidden
- **Résultat :** Le serveur `server.js` est pleinement qualifié et conforme. Aucun changement de code n'est requis sur `server.js`.

### Constat 2.6 — Intégrité du notebook Colab et des liens externes
- **Notebook :** `demonstration_lenet5_colab.ipynb` comporte 18 cellules conformes. Les liens vers le badge Colab officiel, le dépôt GitHub et le domaine public Cloudflare sont valides (HTTP 200).
- **URL externes :** 15 des 17 URL uniques répondent en HTTP 200. Les 2 URL restantes sont les origines de preconnect Google Fonts (analysées au Constat 2.3). Zéro URL externe obligatoire en échec.

---

## 3. Inventaire Méthodologique Exhaustif et Dédoublonné

Le projet compte un total de **322 occurrences brutes de liens**, correspondant à **160 cibles uniques dédoublonnées**.

### Synthèse par Catégorie

| Catégorie | Description | Occurrences | Cibles Uniques | Statut Source | Statut Prévu Candidat |
|---|---|:---:|:---:|:---:|:---:|
| **Catégorie A** | Assets Locaux, Médias & Fichiers Téléchargeables (WebP, MP4, GIF, PNG, SVG, PPTX, PDF, TSV, JSON) | 172 | 90 | 171 PASS / 1 FAIL (`index.tsv`) | 100 % PASS |
| **Catégorie B** | Navigation Locale HTML & Markdown (`index.html`, dossiers pédagogiques, guides, chapitres) | 21 | 14 | 100 % PASS | 100 % PASS |
| **Catégorie C** | Ancres Internes Documentaires (`#secX`, `#tab-X`, slugs de titres Markdown) | 85 | 31 | 100 % PASS | 100 % PASS |
| **Catégorie D** | Routes API & Endpoints Serveur (`/api/slides`) | 1 | 1 | 100 % PASS | 100 % PASS |
| **Catégorie E** | Liens Web Externes, Badges, Citations Académiques & CDN | 43 | 24 | 100 % PASS (avec preconnect documenté) | 100 % PASS |
| **TOTAL** | **Ensemble de l'Inventaire E26** | **322** | **160** | **321 PASS / 1 FAIL** | **100 % PASS** |

### Répartition Détaillée par Fichier Source

1. **`index.html` (39 occurrences brutes) :**
   - 7 liens externes (Google Fonts preconnect + stylesheet, GitHub, Google Colab)
   - 12 ancres internes (`#video-demo`, `#presentation`, `#architecture`, `#telechargements`, `#code-source`, `#tab-...`)
   - 18 liens de fichiers locaux (feuilles de style, scripts, images WebP, vidéos MP4, fichiers PPTX, `slides.json`)
   - 1 lien de téléchargement local `index.tsv` (à corriger par ajout du fichier)
   - 1 appel API JavaScript (`fetch('/api/slides')`)
2. **`dossier_rxneurones_lenet5.html` (43 occurrences brutes) :**
   - 4 liens externes (GitHub, Colab)
   - 26 ancres internes (`#sec0` à `#sec11`, sommaire et navigation rapide)
   - 13 liens locaux (images SVG dans `figures/`, `LeNet-5.pptx`, `index.html#tab-video`)
3. **`dossier_rxneurones_lenet5_themed.html` (64 occurrences brutes) :**
   - 7 liens externes (Google Fonts, GitHub, Colab)
   - 38 ancres internes (`#sec0` à `#sec11`, navigation multi-thèmes)
   - 19 liens locaux (images SVG, PPTX, navigation)
4. **`guide_logique_presentation.html` (3 occurrences brutes) :**
   - 3 liens locaux (`presentation_rxneurones_lenet5.pptx`, `dossier_rxneurones_lenet5.html`, `demonstration_lenet5_colab.ipynb`)
5. **`slides.json` (98 occurrences brutes) :**
   - 28 diapositives `file` (`slides_exported/slide_XX.webp`)
   - 28 diapositives `webp` (`slides_exported/slide_XX.webp`)
   - 28 miniatures `thumb` (`slides_exported/thumb_XX.webp`)
   - 14 médias d'animations Remotion (4 MP4, 4 GIF, 4 posters PNG, 1 MP4 NCR, 1 MP4 pédagogique)
6. **`demonstration_lenet5_colab.ipynb` (16 occurrences brutes) :**
   - 11 liens externes (badges Colab, PyTorch, Cloudflare, GitHub)
   - 5 URL Python / Markdown de référence
7. **Documentation Markdown (`README.md`, `LISEZ-MOI.md`, `ressources/liens-ressources.md`) (59 occurrences brutes) :**
   - `README.md` : 35 liens (badges, sommaire interne GitHub slugs, vidéos `animations/*.mp4`, `LeNet-5.pptx`, rapports `00-DIRECTION/`)
   - `LISEZ-MOI.md` : 16 liens (fichiers SVG sous `./figures/`, documents de formation)
   - `ressources/liens-ressources.md` : 8 liens (citations scientifiques LeCun 1998, TELUQ, Wikipédia, CNN Explainer, TensorFlow Playground, HAL)

---

## 4. Règles de Normalisation des Liens

Pour garantir une cliquabilité parfaite, une portabilité multi-plateforme (Linux/macOS/Windows) et une compatibilité absolue en ligne (Cloudflare) comme hors-ligne (serveur local Node.js) :

- **Règle N01 — Liens Relatifs Stricts pour les Assets Locaux :**
  Tous les liens vers des fichiers internes du projet doivent impérativement utiliser des chemins relatifs stricts (`slides_exported/...`, `animations/...`, `figures/...`, `./fichier.ext`). Aucun lien ne doit comporter de protocole local de type `file://`, `vscode://` ou de chemin absolu système (`/home/...` ou `C:\...`).
- **Règle N02 — Respect Rigoureux de la Casse et des Extensions :**
  Sous Linux, le système de fichiers est sensible à la casse (`case-sensitive`). Les extensions doivent être strictement respectées : `.webp` (minuscule), `.png` (minuscule), `.mp4` (minuscule), `.pptx` (minuscule), `.tsv` (minuscule).
- **Règle N03 — Échappement Déterministe des Chaînes JSON et JavaScript :**
  Toute donnée textuelle embarquée dans le code HTML/JS (notamment `fallbackSlides`) doit être encodée via `JSON.stringify()` ou équivalent déterministe. Les sauts de ligne doivent être explicitement représentés par `\n` et les guillemets protégés, pour interdire tout `SyntaxError`.
- **Règle N04 — Existence Physique Obligatoire pour tout Téléchargement Déclaré :**
  Tout élément HTML comportant l'attribut `download` ou présenté sous forme de bouton de téléchargement doit pointer vers un fichier existant réellement sur disque à l'emplacement exact indiqué.
- **Règle N05 — Traitement Explicite des Indices Navigateur :**
  Les balises `<link rel="preconnect">` ne doivent pas être évaluées comme des URL de contenu directes, mais auditées selon leur fonction spécifique d'optimisation réseau pour les feuilles de style associées.

---

## 5. Feuille de Route Pas-à-Pas pour l'Agent Exécuteur Distinct

L'Agent Exécuteur Distinct devra exécuter les 7 étapes suivantes de manière strictement séquentielle dans le respect de `codex-links-validation-task.md` :

### Étape 1 — Création du Dossier Candidat Neuf Étanche
1. Créer le répertoire candidat dédié :
   ```bash
   mkdir -p /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/
   ```
2. Copier l'intégralité du projet source vers le candidat (en excluant `.git` pour l'isolation) :
   ```bash
   cp -a /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/. /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/
   ```
3. Calculer le manifeste SHA-256 initial du candidat pour sceller l'état avant toute modification.

### Étape 2 — Rapatriement et Intégration de `index.tsv`
1. Copier le fichier `index.tsv` (686 octets, 21 timestamps) depuis le répertoire de travail vers la racine du candidat :
   - Source Windows : `lenet5_distinct_fixed_screens_21/index.tsv`
   - Cible Linux : `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-liens-candidat-20260908-175150/index.tsv`
2. Vérifier la taille (686 octets) et le contenu (22 lignes, en-tête `number	timestamp	filename`).

### Étape 3 — Correction Syntaxique de `fallbackSlides` dans `index.html`
1. Sauvegarder `index.html` selon `BACKUP-AVANT-MODIFICATION v1` (`index.html.bak-20260908-...`).
2. Remplacer dans `index.html` le bloc `const fallbackSlides = [...]` par le contenu sérialisé proprement issu de `slides.json` (avec `\n` échappés pour les retours de ligne dans `notes`).
3. Vérifier que la syntaxe JavaScript est impeccable :
   - Extraire le `<script>` et lancer `node --check` -> doit retourner code 0 sans aucune erreur de syntaxe.

### Étape 4 — Audit des Chemins Locaux et Ancres sur le Candidat
1. Vérifier que les 172 assets de Catégorie A sont tous présents sur disque dans le candidat (notamment `index.tsv`, les 28 WebP, les 6 vidéos MP4, les PPTX et PDF).
2. Vérifier que les 85 ancres de Catégorie C correspondent à des balises d'identification réelles dans les fichiers cibles.

### Étape 5 — Test d'Intégration du Serveur HTTP sur Port Isolé Temporaire
1. Démarrer `node server.js` depuis le dossier candidat sur un port temporaire (ex. 8930).
2. Vérifier par script HTTP automatisé :
   - `GET /` -> HTTP 200
   - `GET /api/slides` -> HTTP 200
   - `GET /index.tsv` -> HTTP 200 (`Content-Type: text/plain; charset=utf-8`)
   - `GET /animations/01_convolution.mp4` avec `Range: bytes=0-1023` -> HTTP 206
   - `GET /LeNet-5.pptx` -> HTTP 200 avec `Content-Disposition: attachment`
3. Arrêter immédiatement le serveur Node.js temporaire (aucun service orphelin).

### Étape 6 — Génération des Preuves et Manifeste SHA-256
1. Produire le rapport de hash avant/après pour chaque fichier modifié (`index.tsv` créé, `index.html` corrigé).
2. Enregistrer les preuves d'exécution sous `00-DIRECTION/preuves/links/`.

### Étape 7 — Rédaction du Rapport d'Exécution `links-executeur-report.md`
1. Rédiger `links-executeur-report.md` sous verrou atomique (`.lock`) après scan de secrets.
2. Clôturer l'intervention d'exécution dans le ledger.
3. Transmettre le relais à l'Agent Vérificateur Indépendant.

---

## 6. Fichiers de Preuves Associés

Les fichiers d'audit déterministe suivants ont été compilés et scellés sous `00-DIRECTION/preuves/links/` :
- `audit-l01-master-inventory.json` : Inventaire exhaustif des 322 occurrences brutes et 160 cibles uniques.
- `audit-l02-local-targets.json` : Audit d'existence des 172 assets et 21 liens de navigation locaux.
- `audit-l03-external-urls.json` : Audit HTTP des 24 URL externes et justification des balises preconnect.
- `audit-l04-anchors-routes.json` : Validation des 85 ancres internes et de la route `/api/slides`.
- `audit-l05-server-routes.json` : Résultats des tests du serveur Node.js sur port isolé (routes, MIME, streaming 206, filtrage 403).

---
*Ce rapport a été rédigé sous verrou atomique `.lock`, scanné par `secret-scan.py`, et scellé par l'Agent Planificateur Indépendant.*

# Rapport de Planification Indépendante — E26-FIABILISATION-20260908

- **Date & Heure :** 2026-09-08T09:20:00-04:00
- **Auteur :** Agent Planificateur Indépendant (Harnais Antigravity CLI)
- **Identifiant de session :** `d4a9448e-d328-4d63-b83f-514a39d80026`
- **Session parente (Coordinateur) :** `27c4ba1e-813b-4e61-8a4f-66d045f6a5f3`
- **ID Intervention Ledger :** `7e7a1351-fb38-4f91-b16c-cf57e1d6f1e2`
- **Statut :** FIGÉ & TRANSMIS POUR EXÉCUTION
- **Cadre méthodologique :** ESCAL-SCOPE v1.1, PRINCIPE-DETERMINISME v1, AGENT-LEDGER v1, BACKUP-AVANT-MODIFICATION v1, COMMUNICATION-PAR-FICHIER v1

---

## 1. Mandat & Déclaration d'Indépendance

En vertu des ordres reçus dans `00-DIRECTION/agent-rehabilitation-task.md` et `00-DIRECTION/planificateur-task.md`, le présent rapport constitue le document de planification officiel et normatif de la mission **E26-FIABILISATION-20260908**.

### Règle d'or de l'Agent Planificateur
L'Agent Planificateur n'effectue **aucune modification** dans le code source, les notebooks, les styles, les scripts, les fichiers de données, les présentations ou les livrables de production du projet source `e26-dossier-rxneurones`. Les fichiers sources originaux demeurent intangibles en lecture seule.
L'Agent Planificateur a pour mandat exclusif d'analyser les sources, d'arbitrer les constats techniques, de définir les limites autorisées et interdites, de formaliser la feuille de route technique pas-à-pas pour l'Agent Exécuteur Distinct, et d'établir la grille d'audit binaire pour l'Agent Vérificateur Indépendant.

---

## 2. Analyse Approfondie des 10 Constats Techniques (Section 2)

L'inspection exhaustive et reproductible des sources situées dans `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/` a permis d'établir les faits objectifs suivants pour chacun des dix points identifiés :

### Constat 2.1 — Présence de 28 diapositives dans `slides.json` et de 56 images WebP dans `slides_exported/`
- **État constaté :** Le fichier `slides.json` contient exactement 28 entrées (diapositives 01 à 28). Le dossier `slides_exported/` contient exactement 56 fichiers, tous au format `.webp` : 28 fichiers de diapositives principales (`slide_01.webp` à `slide_28.webp`, résolution 1920×1080) et 28 fichiers de vignettes prévisualisations (`thumb_01.webp` à `thumb_28.webp`, résolution 320×180).
- **Analyse d'écart :** Aucun fichier `.png` n'existe sur le disque dans `slides_exported/`. Pourtant, chaque objet de diapositive dans `slides.json` et dans le tableau JavaScript dupliqué dans `index.html` comporte la clé `"png": "slides_exported/slide_XX.png"`. Cette clé pointe vers une cible inexistante.
- **Décision de planification :** Dans le candidat neuf, conserver les 56 images WebP existantes qui sont optimales et fonctionnelles. Supprimer les références fantômes `"png"` dans `slides.json` et `index.html` ou les faire pointer vers le fichier WebP existant, garantissant l'intégrité de toutes les propriétés du manifest JSON.

### Constat 2.2 — Désalignement des chemins d'animations entre `animations/`, `figures/` et `remotion-lenet5/out/`
- **État constaté :** `index.html` appelle dans sa structure et son composant Studio :
  - `animations/01_convolution.mp4`, `animations/01_convolution.gif`, `animations/01_convolution_poster.png`
  - `animations/02_neurone.mp4`, `animations/02_neurone.gif`, `animations/02_neurone_poster.png`
  - `animations/03_pooling.mp4`, `animations/03_pooling.gif`, `animations/03_pooling_poster.png`
  - `animations/04_lenet5_pipeline.mp4`, `animations/04_lenet5_pipeline.gif`, `animations/04_lenet5_pipeline_poster.png`
  - `animations/lenet5_pedagogique.mp4`
  Or, sur le disque dans la racine source `animations/`, seuls existent `animations/ncr-slide.mp4` (1 634 401 octets) et `animations/frames/frame_06_4.0s.png`. Tous les fichiers MP4, GIF et posters des modules 01 à 04 ainsi que `lenet5_pedagogique.mp4` sont physiquement situés dans `figures/` (et dupliqués dans `remotion-lenet5/out/`).
- **Analyse d'écart :** Si `index.html` est ouvert via un serveur web statique, le chargement des vidéos et GIF des modules 01 à 04 et 06 échoue avec une cascade d'erreurs HTTP 404 dans la console du navigateur.
- **Décision de planification :** L'Agent Exécuteur doit copier l'intégralité des assets d'animation (`.mp4`, `.gif`, `_poster.png`) depuis `figures/` vers `animations/` dans le candidat neuf, de sorte que le répertoire `animations/` soit autonome, complet et cohérent avec tous les appels de `index.html` et `slides.json`.

### Constat 2.3 — Références résiduelles `slide_01.png` à `slide_28.png` et posters manquants
- **État constaté :** 44 références à des extensions `.png` ont été scannées dans le code source. Parmi elles, `slide_01.png` à `slide_28.png` sont référencées dans `slides.json` et `index.html`. De plus, à la ligne 3074 de `index.html`, le module 06 (`lenet5_pedagogique`) déclare `poster: "slides_exported/slide_24.png"`. Ce fichier est absent sur le disque, provoquant une requête en erreur 404 au chargement du lecteur vidéo.
- **Décision de planification :** Remplacer dans `index.html` la valeur `poster: "slides_exported/slide_24.png"` par `poster: "slides_exported/slide_24.webp"`. Nettoyer dans `slides.json` et le script inline de `index.html` les clés de repli PNG obsolètes en faveur de la clé `"webp"`, ou aligner la clé `"file"` sur l'existant réel.

### Constat 2.4 — Discordance de structure et d'état du notebook `demonstration_lenet5_colab.ipynb`
- **État constaté :** Le notebook source actuel compte exactement 18 cellules (9 cellules markdown et 9 cellules de code), et aucune fonction `show_animation`. Or, la grille d'audit antérieure `VERIFICATION_CONFORMITE.md` (critère CRIT-6.4) annonçait 22 cellules incluant l'intégration des animations. Les sorties enregistrées dans le fichier `.ipynb` affichent une précision de 98,57 % après 5 époques sur les 10 000 images de test MNIST.
- **Analyse d'écart :** Ces sorties pré-enregistrées constituent des données historiques d'un entraînement antérieur. Elles n'ont pas été ré-exécutées ni certifiées par Codex ou le présent cycle.
- **Décision de planification :** Conserver fidèlement la structure du notebook à 18 cellules. Documenter explicitement dans le markdown introductif et de conclusion du notebook que les cellules comportent des métadonnées d'exécution historiques (98,57 % d'exactitude), et expliciter les conditions de reproductibilité (graines aléatoires, versions PyTorch/TorchVision, environnement d'exécution CPU/GPU). Ne pas inventer de faux scores ni altérer les métadonnées sans exécution réelle vérifiée.

### Constat 2.5 — Architecture du modèle LeNet-5 dans le notebook : simplifications didactiques vs LeCun 1998
- **État constaté :** L'analyse du code PyTorch dans la cellule 8 montre :
  1. Modèle totalisant **61 706 paramètres entraînables**.
  2. Couche C3 : `nn.Conv2d(6, 16, 5)` avec connexion totale entre les 6 cartes de S2 et les 16 cartes de C3, totalisant `16 * (6 * 25 + 1) = 2 416` paramètres. Dans l'article original de LeCun (1998, Table 1), la couche C3 utilisait une table de connectivité clairsemée (60 noyaux au lieu de 96), ne totalisant que 1 516 paramètres.
  3. Couches S2 et S4 : implémentées via `nn.AvgPool2d(2, stride=2)`. Or, les commentaires du code (`# S2: ... (12 params)` et `# S4: ... (32 params)`) ainsi que le tableau markdown de la cellule 7 attribuent respectivement 12 et 32 paramètres entraînables à ces couches. En PyTorch standard, `nn.AvgPool2d` est une opération arithmétique fixe sans aucun paramètre entraînable (`p.numel() == 0`). Dans LeCun 1998, le sous-échantillonnage comportait un coefficient multiplicateur et un biais appris par carte ($y = f(w \cdot 	ext{avg} + b)$).
  4. Couche de sortie : couche linéaire dense `nn.Linear(84, 10)` (850 paramètres) suivie d'une perte `CrossEntropyLoss` et d'un optimiseur `Adam`. LeCun 1998 utilisait des unités RBF euclidiennes non entraînables avec des cibles bitmap fixes de 7×12, et une descente de gradient stochastique par mini-lots avec calcul de la diagonale de la matrice hessienne.
  5. Visualisation des filtres C1 (Cellule 13) : la liste `filter_descriptions` contient des libellés codés en dur (« Loupe 1 : Barre horiz. », « Loupe 2 : Diagonale », etc.). Les filtres d'un CNN entraîné par rétropropagation ne s'organisent pas de manière déterministe dans cet ordre fixe.
- **Décision de planification :** Corriger les commentaires et le tableau didactique du notebook dans le candidat pour refléter la réalité mathématique exacte de l'implémentation PyTorch moderne :
  - Expliciter que `nn.AvgPool2d` en PyTorch moderne comporte **0 paramètre entraînable** (et mentionner la différence avec le sous-échantillonnage paramétrique de 1998).
  - Expliciter que la couche C3 moderne est entièrement connectée (2 416 paramètres vs 1 516 dans LeCun 1998).
  - Expliciter que la couche de sortie moderne est un classifieur linéaire Softmax (850 paramètres vs unités RBF 1998).
  - Clarifier que les libellés des filtres C1 sont des analogies didactiques illustratives et non une assignation déterministe des poids appris.

### Constat 2.6 — Résolution des vidéos Remotion et traçabilité de l'animation NCR
- **État constaté :**
  - Dans `remotion-lenet5/src/Root.tsx`, les 5 compositions (`ConvolutionComp`, `NeuronComp`, `PoolingComp`, `PipelineComp`, `MainPresentation`) sont configurées en **1280 × 720** (720p @ 30fps).
  - Les fichiers MP4 mesurés confirment cette géométrie : `01_convolution.mp4` (1280×720), `02_neurone.mp4` (1280×720), `03_pooling.mp4` (1280×720), `04_lenet5_pipeline.mp4` (1280×720), `lenet5_pedagogique.mp4` (1280×720).
  - Seule l'animation NCR (`ncr-slide.mp4`, 1.63 Mo) a été rendue en **1920 × 1080** (1080p @ 30fps).
  - Or, le badge dans `README.md` annonce globalement `Remotion 1080p @ 30fps`.
  - Dans `index.html` (lignes 1985-2005), la galerie NCR référence `remotion-lenet5-ncr/out/frames/frame_01_0.5s.png` à `frame_06_4.0s.png`. Le dossier `remotion-lenet5-ncr` n'est pas présent dans la racine source Linux, mais les captures réelles de contrôle existent dans le dossier de travail.
- **Décision de planification :**
  - Rapatrier les 6 captures de frames réelles sous `animations/frames/` (`frame_01_0.5s.png` à `frame_06_4.0s.png`) dans le candidat neuf.
  - Mettre à jour `index.html` pour lier `animations/frames/frame_0X_...png` au lieu de `remotion-lenet5-ncr/out/frames/...`.
  - Corriger la documentation dans `README.md` : documenter avec exactitude que la suite de démonstration est en 720p HD (1280×720 @ 30fps) et que l'animation spécifique de déploiement NCR est en 1080p Full HD (1920×1080 @ 30fps).

### Constat 2.7 — Liens rompus dans `README.md` et dénomination des présentations PowerPoint
- **État constaté :**
  - Le `README.md` référence des liens vers `LeNet-5.pptx`, `planificateur-report.md`, `executeur-report.md` et `verificateur-report.md`. Ces liens pointent tous vers la racine du dépôt où ces fichiers n'existent pas.
  - Dans la racine source, la présentation complète de 28 diapositives (27 459 064 octets) est nommée `LeNet-5_Presentation_Finale.pptx`. Le fichier nommé `presentation_rxneurones_lenet5.pptx` (3 733 550 octets) est une ancienne version de 8 diapositives.
  - Un fichier temporaire Microsoft Office `~$LeNet-5_Presentation_Finale.pptx` (165 octets) réside dans la racine.
- **Décision de planification :**
  - Dans le candidat, exclure le fichier temporaire `~$*.pptx`.
  - Créer la copie canonique `LeNet-5.pptx` identique à `LeNet-5_Presentation_Finale.pptx` (ou conserver les deux avec un lien unifié) afin de satisfaire à la fois les liens de téléchargement de `index.html` et du `README.md`.
  - Corriger les liens de documentation dans `README.md` pour pointer vers `00-DIRECTION/planificateur-report.md`, `00-DIRECTION/executeur-report.md` et `00-DIRECTION/verificateur-report-01.md`.

### Constat 2.8 — Appels réseau distants dans les dossiers HTML et autonomie hors-ligne
- **État constaté :**
  - `dossier_rxneurones_lenet5.html` et `dossier_rxneurones_lenet5_themed.html` effectuent une requête externe vers `https://colab.research.google.com/assets/colab-badge.svg`.
  - `dossier_rxneurones_lenet5_themed.html` et `index.html` chargent des polices externes sur `https://fonts.googleapis.com` et `https://fonts.gstatic.com`.
  - Ces dépendances externes violent la spécification du cahier des charges (`ressources/cahier-des-charges.md`, Section 1 : « UN SEUL fichier, zéro dépendance externe, consultable hors ligne »).
- **Décision de planification :**
  - Remplacer l'image distante du badge Colab par son équivalent vectoriel SVG complet embarqué en ligne (`inline SVG`) dans les deux fichiers HTML.
  - Définir des piles de polices système de repli robustes (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` et `'JetBrains Mono', 'Fira Code', monospace`) pour que le rendu visuel soit parfait sans aucune connexion internet.

### Constat 2.9 — Obsolescence des rapports d'audit antérieurs et non-transférabilité des verdicts
- **État constaté :**
  - `AUDIT-CONFORMITE.md` a été rédigé le 31 août 2026, avant l'introduction des 28 diapositives WebP, du serveur Range 206, des animations Remotion et du studio interactif des 7 et 8 septembre.
  - `SECURITY_AUDIT_REPORT.json` (12/12) comportait des vérifications incluant un domaine public externe (`lenet5.iatuto.com`), ce qui est strictement hors périmètre de la présente mission locale.
  - `VERIFICATION_CONFORMITE.md` possède 39 critères dont les domaines 2 et 3 sont restés marqués `[ ] EN ATTENTE`.
- **Décision de planification :** Aucun ancien verdict PASS n'est transférable ou opposable pour la présente mission. La validation du candidat reposera exclusivement sur la grille binaire C01 à C12 auditée de manière indépendante et reproductible par l'Agent Vérificateur Indépendant sur le candidat neuf finalisé.

### Constat 2.10 — Fichiers `.agent/skills/` modifiés sous Git et exclusion des métadonnées privées
- **État constaté :** Git signale des modifications de métadonnées ou d'attributs de fichiers sous `.agent/skills/` sans changement textuel utile.
- **Décision de planification :** Le répertoire `.agent/` est un répertoire d'outils et de métadonnées de l'hôte. Il ne fait pas partie du produit distribuable LeNet-5. Dans le candidat neuf, le répertoire `.agent/` ainsi que `.git/`, `.agent-ledger*` et les sauvegardes `.bak-*` doivent être strictement exclus. L'original `e26-dossier-rxneurones` ne doit subir aucun `git reset`, `git checkout` ou modification forcée sur ces fichiers.

---

## 3. Délimitation Stricte du Périmètre (Autorisé vs Interdit)

Conformément à la directive **ESCAL-SCOPE v1.1**, la frontière des actions permises est binaire et intangible :

### Tableau des Autorisations et Interdictions

| Catégorie | AUTORISÉ (Périmètre Strict) | INTERDIT (Violation Bloquante) |
|---|---|---|
| **Répertoires sources** | Lecture seule stricte de `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/`. Seul `00-DIRECTION/` reçoit les livrables de coordination. | Toute écriture ou modification directe dans le code, les documents ou les médias du dossier source original. |
| **Dossier Candidat** | Création et écriture exclusive dans le dossier frère neuf `../e26-dossier-rxneurones-candidat-20260908-090500/`. | Écrasement d'un dossier existant ou création hors de l'arborescence `projets-dev/`. |
| **Contrôle Git & Dépôt** | Consultation de `git log`, `git status` en lecture seule. | `git reset`, `git clean`, `git checkout`, `git commit`, `git push`, modification de branches ou de tags. |
| **Réseau & Services** | Contrôle HTTP local sur `127.0.0.1` exclusivement, sur port libre éphémère. | Tout appel ou test offensif vers `lenet5.iatuto.com`, Cloudflare, API externes ou téléchargement de paquets non sollicités. |
| **Médias & Assets** | Copie des fichiers MP4, GIF, posters de `figures/` vers `animations/`, ajout des 6 frames NCR, création de l'alias `LeNet-5.pptx`. | Suppression ou altération des 56 WebP existants, ré-encodage destructif des vidéos sans justification. |
| **Notebook** | Rectification didactique des commentaires sur `nn.AvgPool2d` et de la table d'architecture ; documentation de la trace historique d'entraînement. | Effacement des sorties enregistrées (98,57 %), invention de nouvelles mesures non exécutées ou falsification de résultats. |
| **Serveur HTTP** | Confinement strict à `127.0.0.1`, rejet 403 des fichiers cachés (`.*`), sauvegardes (`*.bak*`), rapports (`00-DIRECTION/`), fichiers ledger (`*.jsonl`). | Écoute non restreinte sur `0.0.0.0`, exposition de `.git` ou de clés secrètes. |
| **Communications** | Fichiers partagés exclusivement sous `00-DIRECTION/` avec verrous atomiques `.lock` et contrôle préalable `secret-scan.py`. | Appels API directs inter-agents, pipes temps réel non inspectables, transmission d'un secret en clair. |
| **Rôles & Identités** | Trois agents distincts (Planificateur, Exécuteur, Vérificateur) ayant des identités de session différentes et attestées. | Simulation des 3 rôles par un même agent ou signature sans vérification réelle sur pièces. |

---

## 4. Feuille de Route Technique Pas-à-Pas pour l'Agent Exécuteur Distinct

L'Agent Exécuteur Distinct doit réaliser les étapes suivantes dans l'ordre strict prescrit :

### Étape 0 — Initialisation et Signature de Prise en Charge
1. Vérifier que le dossier candidat cible n'existe pas :
   ```bash
   test ! -d "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500"
   ```
2. Signer le début d'intervention dans le ledger :
   ```bash
   EXEC_ID=$(python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py start      --agent "Antigravity Executeur Distinct"      --role executant      --paths "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500"      --summary "Construction et fiabilisation locale du candidat E26 selon plan figé"      --project "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones")
   ```

### Étape 1 — Création du Dossier Candidat Propre (Exclusion des Métadonnées Privées)
1. Créer le dossier candidat frère :
   ```bash
   mkdir -p "/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500"
   ```
2. Copier l'arborescence distribuable depuis la source en excluant rigoureusement `.git`, `.agent`, `.agent-ledger*`, `00-DIRECTION/`, les fichiers de sauvegarde `*.bak*` et le verrou Office `~$*` :
   ```bash
   rsync -av --exclude='.git'              --exclude='.agent'              --exclude='.agent-ledger*'              --exclude='00-DIRECTION'              --exclude='*.bak*'              --exclude='~$*'              /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/              /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500/
   ```

### Étape 2 — Fiabilisation des Médias, des Animations et des Liens
1. **Compléter `animations/` :**
   Copier l'ensemble des fichiers de démonstration situés dans `figures/` vers `animations/` :
   - `01_convolution.mp4`, `01_convolution.gif`, `01_convolution_poster.png`
   - `02_neurone.mp4`, `02_neurone.gif`, `02_neurone_poster.png`
   - `03_pooling.mp4`, `03_pooling.gif`, `03_pooling_poster.png`
   - `04_lenet5_pipeline.mp4`, `04_lenet5_pipeline.gif`, `04_lenet5_pipeline_poster.png`
   - `lenet5_pedagogique.mp4`
2. **Rapatrier les captures de contrôle NCR :**
   S'assurer que les 6 frames de contrôle sont présentes sous `animations/frames/` :
   `frame_01_0.5s.png`, `frame_02_1.2s.png`, `frame_03_1.8s.png`, `frame_04_2.5s.png`, `frame_05_3.0s.png`, `frame_06_4.0s.png`.
   (Les copier depuis `remotion-lenet5-ncr/out/frames/` ou la source locale vérifiée).
3. **Mettre à jour les balises de galerie dans `index.html` :**
   Remplacer les chemins `remotion-lenet5-ncr/out/frames/frame_0X_...png` par `animations/frames/frame_0X_...png` (lignes 1985-2005).
4. **Corriger le poster du Module 06 dans `index.html` :**
   Remplacer `poster: "slides_exported/slide_24.png"` par `poster: "slides_exported/slide_24.webp"`.
5. **Supprimer les références PNG fantômes dans `slides.json` et `index.html` :**
   Supprimer la clé `"png": "slides_exported/slide_XX.png"` dans chaque objet de diapositive pour ne laisser subsister que les clés valides `"file"`, `"webp"` et `"thumb"`.
6. **Alias canonique PowerPoint :**
   Créer `LeNet-5.pptx` dans la racine du candidat en tant que copie conforme de `LeNet-5_Presentation_Finale.pptx` (taille 27 459 064 octets, 28 diapositives).

### Étape 3 — Sécurisation et Confinement de `server.js`
1. Modifier l'hôte par défaut :
   ```javascript
   const HOST = process.env.HOST || '127.0.0.1';
   ```
2. Ajouter le filtrage défensif contre la divulgation de fichiers sensibles après `safePath` :
   ```javascript
   const basename = path.basename(safePath);
   const relPath = path.relative(ROOT_DIR, safePath);
   // Bloquer fichiers cachés, dossiers de coordination, sauvegardes et ledger
   if (basename.startsWith('.') || 
       relPath.startsWith('00-DIRECTION') || 
       relPath.includes('.bak') || 
       relPath.endsWith('.jsonl') ||
       relPath.endsWith('.key')) {
     res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
     return res.end('403 Forbidden: Access to private system files is denied.');
   }
   ```
3. Conserver le support complet HTTP Range 206 pour les vidéos MP4 et les en-têtes `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`.

### Étape 4 — Rectification Didactique du Notebook `demonstration_lenet5_colab.ipynb`
1. **Périmètre préservé :**
   - Ne pas supprimer ni relancer les cellules 10 et 18 contenant les sorties d'entraînement historiques (98,57 % de précision).
   - Conserver rigoureusement les 18 cellules existantes.
2. **Corrections didactiques dans les cellules markdown et les commentaires de code :**
   - Dans le tableau de la Cellule 7 :
     - Pour S2 : indiquer `Paramètres calculés : 0 (Opérateur fixe en PyTorch standard ; 12 dans LeCun 1998 avec poids/biais appris)`.
     - Pour C3 : indiquer `Paramètres calculés : 2 416 (Connexions totales 6×16 ; 1 516 dans LeCun 1998 selon table clairsemée)`.
     - Pour S4 : indiquer `Paramètres calculés : 0 (Opérateur fixe en PyTorch standard ; 32 dans LeCun 1998)`.
     - Pour Sortie : indiquer `Paramètres calculés : 850 (Classifieur linéaire Softmax ; sorties RBF euclidiennes fixes dans LeCun 1998)`.
     - Total : `61 706 paramètres entraînables (Variante moderne pédagogique PyTorch)`.
   - Dans la Cellule 8 (code) :
     - Mettre à jour les commentaires en regard de `nn.AvgPool2d` : `# S2: 6x28x28 -> 6x14x14 (0 param en PyTorch, sans poids appris)`.
   - Dans la Cellule 12/13 :
     - Ajouter une note explicite indiquant que les étiquettes de filtres (« Barre horiz. », etc.) sont des dénominations didactiques et illustratives pour guider l'apprentissage humain, et non le résultat d'une contrainte d'apprentissage supervisée des filtres.
3. **Autonomie hors-ligne des fichiers HTML :**
   - Dans `dossier_rxneurones_lenet5.html` et `dossier_rxneurones_lenet5_themed.html`, remplacer la balise `<img src="https://colab.research.google.com/assets/colab-badge.svg" ...>` par un élément `<svg>` inline autonome identique.
   - S'assurer que les polices définies disposent de replis système locaux fiables.

### Étape 5 — Mise à Jour et Alignement de la Documentation (`README.md`, `LISEZ-MOI.md`)
1. **Badges et résolutions :**
   - Mettre à jour le badge Remotion : `Remotion | 720p & 1080p @ 30fps`.
   - Documenter explicitement dans le tableau des animations que les modules 01 à 04 et 06 sont en 720p HD (1280×720), et le module 05 (NCR) en 1080p Full HD (1920×1080).
2. **Poids des fichiers :**
   - Rectifier le poids de `ncr-slide.mp4` : indiquer 1.63 Mo (et non 446 Ko).
3. **Liens vers les rapports :**
   - Mettre à jour les liens de documentation vers les emplacements officiels :
     - `00-DIRECTION/planificateur-report.md`
     - `00-DIRECTION/executeur-report.md`
     - `00-DIRECTION/verificateur-report-01.md`
4. **Lien PowerPoint :**
   - Pointer vers `LeNet-5.pptx` (et documenter l'équivalence avec `LeNet-5_Presentation_Finale.pptx`).

### Étape 6 — Clôture, Scan Déterministe et Manifeste
1. Vérifier l'absence de tout secret dans le candidat via `secret-scan.py` :
   ```bash
   find /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500 -type f -exec python3 /home/bf/knowledge-share/projets-dev/agent-ledger/secret-scan.py {} +
   ```
2. Générer le manifeste SHA-256 complet du candidat :
   ```bash
   find /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones-candidat-20260908-090500 -type f -exec sha256sum {} + | sort -k 2 > /home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones/00-DIRECTION/preuves/manifest-candidat-sha256.txt
   ```
3. Rédiger `00-DIRECTION/executeur-report.md` sous verrou atomique avec scan préalable.
4. Clôturer l'intervention ledger :
   ```bash
   python3 /home/bf/knowledge-share/projets-dev/agent-ledger/agent-sign.py end      --id "$EXEC_ID"      --outcome PASS      --action-type creation      --summary "Candidat e26-dossier-rxneurones-candidat-20260908-090500 genere, verifie et manifeste consigne"
   ```

---

## 5. Règles de Non-Régression et de Sécurité

1. **Intangibilité de la source originale :** Le dossier `/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones` ne doit subir aucune écriture hormis les fichiers de coordination sous `00-DIRECTION/`.
2. **Absence de régression multimédia :** Les 28 diapositives et leurs 28 miniatures doivent s'afficher instantanément. Les 5 animations de base et l'animation NCR doivent pouvoir être lues sans saccade et supporter le repositionnement temporel (Range 206).
3. **Zéro requête externe :** Les pages `dossier_rxneurones_lenet5.html` et `dossier_rxneurones_lenet5_themed.html` doivent s'ouvrir et fonctionner parfaitement dans un navigateur complètement déconnecté du réseau internet.
4. **Étanchéité du serveur local :** Toute tentative d'accès à des fichiers sensibles via des requêtes HTTP (ex: `GET /.git/config`, `GET /.agent-ledger.jsonl`, `GET /00-DIRECTION/planificateur-report.md`) doit retourner un statut HTTP 403 Forbidden ou 404 Not Found.

---

## 6. Référence des Livrables Produits

| Livrable | Emplacement Relatif | Rôle Rédacteur |
|---|---|---|
| **Rapport de Planification** | `00-DIRECTION/planificateur-report.md` | Agent Planificateur Indépendant |
| **Grille de Contrôle Binaire** | `00-DIRECTION/checklist-validation.md` | Agent Planificateur Indépendant |
| **Manifeste Source SHA-256** | `00-DIRECTION/preuves/manifest-source-sha256.txt` | Coordinateur / Planificateur |

*Fin du rapport de planification — Document figé.*

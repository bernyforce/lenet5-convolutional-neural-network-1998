# 📋 Protocole & Grille d'Audit de Conformité Exhaustive — Projet LeNet-5 (1998)
**Document de référence officiel à destination de l'Agent Vérificateur Indépendant**  
*Dernière mise à jour : 2026-09-07 | Réf. Gouvernance : ESCAL-SCOPE v1.1 • BACKUP-AVANT-MODIFICATION v1 • AGENT-LEDGER v1*

---

## 🎯 Objectif de ce Document

Ce fichier fournit à l'**Agent Vérificateur Indépendant** une grille de contrôle objective, rigoureuse et entièrement reproductible pour valider point par point la **parfaite conformité de l'exécution de toutes les consignes données par l'utilisateur** tout au long du cycle de vie du projet LeNet-5.

### Règle d'Or de l'Auditeur
> **AUCUN VERDICT « PASS » NE PEUT ÊTRE ACCORDÉ SANS PREUVE D'EXÉCUTION OU DE MESURE OBJECTIVE.**  
> Chaque critère doit être testé via les commandes fournies (PowerShell / Bash WSL / Python / curl / git / gh). En cas d'écart, documenter avec sincérité et signer `PARTIEL` ou `FAIL`.

---

## 📑 Sommaire des Domaines d'Audit

1. [Domaine 1 : Présentation Master PowerPoint (28 Diapositives 16:9)](#-domaine-1--présentation-master-powerpoint-28-diapositives-169)
2. [Domaine 2 : Animation Remotion « Déploiement NCR » & Séparation des 3 Rôles](#-domaine-2--animation-remotion--déploiement-ncr--séparation-des-3-rôles)
3. [Domaine 3 : Suite des 6 Animations Remotion & Assets Multimédia](#-domaine-3--suite-des-6-animations-remotion--assets-multimédia)
4. [Domaine 4 : Serveur Web, Streaming Range 206 & Exposition Publique Cloudflare](#-domaine-4--serveur-web-streaming-range-206--exposition-publique-cloudflare)
5. [Domaine 5 : Identité Visuelle & Conservation Stricte des 3 Thèmes](#-domaine-5--identité-visuelle--conservation-stricte-des-3-thèmes)
6. [Domaine 6 : Dossier d'Étude Thémé & Composants Interactifs](#-domaine-6--dossier-détude-thémé--composants-interactifs)
7. [Domaine 7 : Expérimentation Interactive Google Colab](#-domaine-7--expérimentation-interactive-google-colab)
8. [Domaine 8 : Documentation du Projet & Publication GitHub](#-domaine-8--documentation-du-projet--publication-github)
9. [Domaine 9 : Gouvernance Déterministe & Traçabilité (Ledger & Backups)](#-domaine-9--gouvernance-déterministe--traçabilité-ledger--backups)
10. [Grille Récapitulative & Formulaire de Signature Finale](#-grille-récapitulative--formulaire-de-signature-finale)

---

## 📊 Domaine 1 : Présentation Master PowerPoint (28 Diapositives 16:9)

### 📌 Consignes Utilisateur Initiales
* Étudier profondément les images pour créer une présentation adaptée au modèle fourni avec le style présent dans les captures.
* Intégrer les notes complètes pour chaque diapositive (script conférencier minuté).
* Synchroniser la présentation avec la version la plus à jour dans `LeNet-5_Presentation_Finale.pptx`.
* Respecter la rigueur mathématique et historique de 1998 (60 000 poids, 32×32, C1, S2, C3, S4, C5, F6, Output, NCR 99,2%).

### 🧪 Procédure de Test du Vérificateur
Exécuter le script de diagnostic Python suivant :
```powershell
python -c "
import pptx
prs = pptx.Presentation('LeNet-5_Presentation_Finale.pptx')
print(f'Nombre de diapositives : {len(prs.slides)}')
print(f'Dimensions slide : {prs.slide_width/914400:.2f} x {prs.slide_height/914400:.2f} pouces')
notes_count = sum(1 for s in prs.slides if s.has_notes_slide and s.notes_slide.notes_text_frame.text.strip())
print(f'Diapositives avec notes conférencier : {notes_count}/{len(prs.slides)}')
"
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-1.1** : Fichiers `LeNet-5_Presentation_Finale.pptx` et `LeNet-5.pptx` présents à la racine du projet (taille ~27 Mo chacun).
- [ ] **CRIT-1.2** : Ratio de projection strictement **16:9 Widescreen** (13.33 × 7.50 pouces, soit 1920 × 1080 pixels équivalents).
- [ ] **CRIT-1.3** : Décompte exact de **28 diapositives** couvrant l'ensemble du fil narratif (de l'introduction 1998 au quiz et à la conclusion prospective).
- [ ] **CRIT-1.4** : Présence de **notes de conférencier complètes et non tronquées** sur 100% des diapositives (28/28).
- [ ] **CRIT-1.5** : Export des diapositives fixes en haute définition présent dans `slides_exported/` (`slide_01.png` à `slide_28.png` en 1920 × 1080).

---

## 🎬 Domaine 2 : Animation Remotion « Déploiement NCR » & Séparation des 3 Rôles

### 📌 Consignes Utilisateur Initiales
* Animation Remotion de la diapositive « Déploiement NCR ».
* Traitement avec séparation stricte des 3 rôles : **Planificateur indépendant**, **Exécuteur**, **Vérificateur indépendant**.
* Création du projet dans `remotion-lenet5-ncr/`.
* Rendu Full HD 1080p @ 30fps de 5 secondes (150 frames) et captures de contrôle.

### 🧪 Procédure de Test du Vérificateur
Vérifier la présence des livrables et la télémétrie du rendu :
```powershell
# Vérifier la présence des 3 rapports de gouvernance
Get-Item planificateur-report.md, executeur-report.md, verificateur-report.md | Select-Object Name, Length

# Inspecter le rendu vidéo MP4
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,nb_frames -of default=noprint_wrappers=1 remotion-lenet5-ncr/out/ncr-slide.mp4

# Vérifier les captures de contrôle timecodées
Get-ChildItem remotion-lenet5-ncr/out/frames | Select-Object Name, Length
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-2.1** : Traçabilité des 3 rôles confirmée par 3 rapports dédiés :
  - `planificateur-report.md` (spécifications, plan de composition, checklist).
  - `executeur-report.md` (implémentation, code source, journal d'exécution).
  - `verificateur-report.md` (audit indépendant 12/12 PASS).
- [ ] **CRIT-2.2** : Code source complet présent dans `remotion-lenet5-ncr/` (`NCRSlide.tsx`, `Root.tsx`, `remotion.config.ts`).
- [ ] **CRIT-2.3** : Vidéo générée `remotion-lenet5-ncr/out/ncr-slide.mp4` conforme : 1920 × 1080, 5.00s, 150 frames.
- [ ] **CRIT-2.4** : Série de 7 captures de contrôle présente aux timecodes clés : 0.5s, 1.2s, 1.8s, 2.5s, 3.0s, 4.0s, 4.9s.

---

## 🎞️ Domaine 3 : Suite des 6 Animations Remotion & Assets Multimédia

### 📌 Consignes Utilisateur Initiales
* Intégrer les animations suivantes dans les pages de présentation de façon pertinente :
  - `01_convolution` (balayage filtre 5×5)
  - `02_neurone` (somme pondérée et activation)
  - `03_pooling` (sous-échantillonnage 2×2)
  - `04_lenet5_pipeline` (traversée 7 couches)
  - `ncr-slide` / `05_ncr` (déploiement guichets bancaires NCR)
  - `lenet5_pedagogique` (film de synthèse complet)
* Disponibilité sous double format : MP4 haute définition et GIF animé en boucle.

### 🧪 Procédure de Test du Vérificateur
```powershell
Get-ChildItem animations -File | Select-Object Name, Length | Format-Table -AutoSize
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-3.1** : Présence des 6 vidéos MP4 dans `animations/` :
  - `01_convolution.mp4` (528 Ko)
  - `02_neurone.mp4` (708 Ko)
  - `03_pooling.mp4` (384 Ko)
  - `04_lenet5_pipeline.mp4` (592 Ko)
  - `ncr-slide.mp4` (446 Ko)
  - `lenet5_pedagogique.mp4` (1,89 Mo)
- [ ] **CRIT-3.2** : Présence des versions GIFs animés optimisés (`.gif`) et affiches posters (`_poster.png`).
- [ ] **CRIT-3.3** : Intégration dans `slides.json` (28 diapositives) associant chaque animation à sa diapositive cible (Slide 09, 12, 14, 16, 19, 24).
- [ ] **CRIT-3.4** : Lecteur diaporama web (`index.html`) doté du basculement 1-clic `[🖼️ Diapositive Fixe / 🎬 Animation Vidéo]` et indicateur prédictif `🎬 PROCHAINE DIAPO : ANIMATION VIDÉO`.

---

## 🌐 Domaine 4 : Serveur Web, Streaming Range 206 & Exposition Publique Cloudflare

### 📌 Consignes Utilisateur Initiales
* Rendre les pages web de ce projet disponibles en local et mondialement via Cloudflare.
* Streaming HTTP Range (206) & types MIME dans `server.js` (notamment `image/gif`, `video/mp4`, `application/json`).

### 🧪 Procédure de Test du Vérificateur
```powershell
# 1. Test du streaming HTTP Range 206 sur une vidéo MP4
curl -I -H "Range: bytes=0-1023" http://127.0.0.1:8080/animations/01_convolution.mp4

# 2. Test du type MIME pour les GIFs animés
curl -I http://127.0.0.1:8080/animations/01_convolution.gif

# 3. Test du type MIME pour les notebooks Colab (.ipynb)
curl -I http://127.0.0.1:8080/demonstration_lenet5_colab.ipynb

# 4. Test d'accès public via Cloudflare sur le sous-domaine officiel
curl -I -k https://lenet5.iatuto.com/
curl -I -k https://lenet5.iatuto.com/dossier_rxneurones_lenet5_themed.html
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-4.1** : Requête avec en-tête `Range: bytes=0-1023` retourne le code `HTTP/1.1 206 Partial Content` avec `Content-Range: bytes 0-1023/...`.
- [ ] **CRIT-4.2** : Fichiers `.gif` servis avec `Content-Type: image/gif`.
- [ ] **CRIT-4.3** : Fichiers `.ipynb` servis avec `Content-Type: application/json; charset=utf-8`.
- [ ] **CRIT-4.4** : Serveur Node.js actif sur le port 8080, écoute sur `0.0.0.0` et sert le portail web localement et en réseau avec support HTTP Range 206.
- [ ] **CRIT-4.5** : Exposition publique Cloudflare opérationnelle : sous-domaine `lenet5.iatuto.com` configuré en CNAME proxied Cloudflare, sécurisé par certificat TLS/SSL et répondant avec `HTTP/1.1 200 OK` (ou `HTTP/2 200`).

---

## 🎨 Domaine 5 : Identité Visuelle & Conservation Stricte des 4 Thèmes Visuels

### 📌 Consignes Utilisateur Initiales
* Design des pages web calqué sur `checklist-20260904-002237-kit-portable-contexte.html`.
* Conservation stricte des 4 thèmes visuels avec basculement fluide :
  - `🌌 Zero-G Quantum` (fond émeraude/cyan profond)
  - `🛰️ Orbital HUD` (vert phosphorescent et grille matricielle)
  - `💥 Supernova` (ambiance cyberpunk rose/violette)
  - `📜 Origine` (vue d'origine documentaire conforme à `dossier_rxneurones_lenet5.html` : fond clair, typographie éditoriale, cartes épurées)
* Sélecteur de thème sticky et persistance dans `localStorage`.

### 🧪 Procédure de Test du Vérificateur
```powershell
# Rechercher la présence des 4 thèmes et du localStorage dans TOUTES les pages HTML du projet
Select-String -Path "index.html", "dossier_rxneurones_lenet5_themed.html", "dossier_rxneurones_lenet5.html" -Pattern "theme-dropdown|toggleThemeDropdown|lenet5_active_theme"
```

### ✅ Critères de Conformité & Checklist
- [x] **CRIT-5.1** : Présence des variables CSS et des classes pour les 4 thèmes sur **toutes les pages et sous-pages** (`index.html`, `dossier_rxneurones_lenet5_themed.html`, `dossier_rxneurones_lenet5.html`) :
  - Attributs `data-theme="origine"` (Vue d'origine par défaut), `data-theme="theme-1"` (Zero-G), `data-theme="theme-2"` (Orbital), et `data-theme="theme-3"` (Supernova).
- [x] **CRIT-5.2** : Bouton de changement de thème **déroulant et discret** (`.theme-dropdown` avec menu popover contextuel, pastilles d'aperçu de couleur et chevron animé) déployé de manière sticky sur l'en-tête de **toutes les pages du projet**.
- [x] **CRIT-5.3** : Persistance JavaScript vérifiée : double synchronisation `localStorage.getItem("lenet5_active_theme")` et `localStorage.getItem("agent_checklist_theme")` initialisée sur `'origine'` par défaut, mise à jour dynamique de l'intitulé du bouton et fermeture au clic extérieur/touche Échap.
- [x] **CRIT-5.4** : Composants visuels de fidélité pour les thèmes spatiaux : surfaces dark void (`#020813`, `#020307`, `#06020c`), cartes translucides `.glass-panel`, badges de phases, tags monospace, jauges télémétriques SVG.
- [x] **CRIT-5.5** : Contraste universel et haute lisibilité validés :
  - En thème `📜 Origine` : fond clair `#f8fafc`, cartes blanches `#ffffff`, textes sombres haute lisibilité `#0f172a` et `#1e293b`, accents bleus `#0969da`, aucun texte blanc sur fond clair (sélecteurs, notes, cartes téléchargements, en-têtes vidéo et titres des couches entièrement lisibles).
  - En thèmes sombres (`Zero-G`, `Orbital HUD`, `Supernova`) : textes clairs `#f8fafc` et `#cbd5e1`, titres lumineux adaptatifs, aucun texte sombre illisible sur fond noir.


---

## 📖 Domaine 6 : Dossier d'Étude Thémé & Composants Interactifs

### 📌 Consignes Utilisateur Initiales
* Insérer un lien vers Google Colab dans la page `dossier_rxneurones_lenet5.html`.
* Créer une copie de cette page avec le design choisi : `dossier_rxneurones_lenet5_themed.html`.
* Intégrer les 3 thèmes, les animations, et les modules interactifs pédagogiques.

### 🧪 Procédure de Test du Vérificateur
```powershell
# Vérifier la présence du lien Colab dans le dossier original
Select-String -Path "dossier_rxneurones_lenet5.html" -Pattern "colab.research.google.com"

# Vérifier la présence des sections interactives dans le dossier thémé
Select-String -Path "dossier_rxneurones_lenet5_themed.html" -Pattern "conv-playground|quiz-card|showcase-bar"
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-6.1** : `dossier_rxneurones_lenet5.html` contient le bandeau interactif Colab et l'entrée dans le sommaire.
- [ ] **CRIT-6.2** : `dossier_rxneurones_lenet5_themed.html` (128 Ko) contient l'intégralité des 12 chapitres + conclusion sans perte d'information.
- [ ] **CRIT-6.3** : **Simulateur de Convolution Interactif** présent : matrice 6×6 en entrée, filtre Sobel 3×3, calcul interactif du produit scalaire et matrice résultante 4×4.
- [ ] **CRIT-6.4** : **Quiz Interactif d'Auto-Évaluation** en 10 questions techniques avec vérification instantanée, calcul automatique du score et explication didactique.
- [ ] **CRIT-6.5** : Intégration des 6 animations Remotion dans les chapitres d'étude avec commutateur dynamique `[🎬 Vidéo MP4 / 🔄 GIF Animé]`.

---

## 🚀 Domaine 7 : Expérimentation Interactive Google Colab

### 📌 Consignes Utilisateur Initiales
* Intégrer de la façon la plus pertinente possible les animations dans le Google Colab (`demonstration_lenet5_colab.ipynb`).

### 🧪 Procédure de Test du Vérificateur
Exécuter l'inspection automatisée des cellules du notebook :
```powershell
python -c "
import json
with open('demonstration_lenet5_colab.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)
print(f'Nombre total de cellules : {len(nb[\"cells\"])}')
anim_cells = [c for c in nb['cells'] if 'show_animation' in ''.join(c.get('source', []))]
print(f'Cellules d\'animation détectées : {len(anim_cells)}')
for i, c in enumerate(nb['cells']):
    src = ''.join(c.get('source', []))
    if 'show_animation' in src:
        print(f'  - Cellule #{i+1} : {src.splitlines()[0]}')
"
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-7.1** : Badge interactif officiel **Open In Colab** en cellule #1 pointant vers l'URL publique GitHub :
  `https://colab.research.google.com/github/bernyforce/lenet5-convolutional-neural-network-1998/blob/main/demonstration_lenet5_colab.ipynb`.
- [ ] **CRIT-7.2** : Fonction d'aide `show_animation(nom, width=720)` définie en cellule #3 avec gestion intelligente du double flux : lecture locale si exécuté sur disque, et fallback automatique vers le CDN GitHub Raw si exécuté sur les serveurs distants de Google Colab.
- [ ] **CRIT-7.3** : Découpage exhaustif en **22 cellules** structurées.
- [ ] **CRIT-7.4** : Intégration des 6 animations aux étapes clés du pipeline d'apprentissage :
  1. Cellule #4 : Modèle Fondateur du Neurone (`02_neurone`)
  2. Cellule #8 : Extraction de Contours par Convolution (`01_convolution`)
  3. Cellule #10 : Sous-Échantillonnage et Invariance (`03_pooling`)
  4. Cellule #13 : Architecture Complète LeNet-5 (`04_lenet5_pipeline`)
  5. Cellule #20 : Déploiement Industriel Bancaire NCR (`ncr-slide` / `05_ncr`)
  6. Cellule #22 : Film Pédagogique Intégral (`lenet5_pedagogique`)

---

## 📦 Domaine 8 : Documentation du Projet & Publication GitHub

### 📌 Consignes Utilisateur Initiales
* Documenter le projet de manière exhaustive.
* Publier l'ensemble du projet sur GitHub sous le compte de l'utilisateur (`bernyforce`).

### 🧪 Procédure de Test du Vérificateur
```powershell
# Vérifier la connexion et le statut du dépôt distant
gh repo view bernyforce/lenet5-convolutional-neural-network-1998

# Vérifier l'historique et la synchronisation de la branche main
git log -n 3 --oneline
git status
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-8.1** : Dépôt public créé et accessible : [https://github.com/bernyforce/lenet5-convolutional-neural-network-1998](https://github.com/bernyforce/lenet5-convolutional-neural-network-1998).
- [ ] **CRIT-8.2** : Branche `main` synchronisée sans fichiers en attente (`working tree clean`).
- [ ] **CRIT-8.3** : Fichier `README.md` complet (11 267 octets) contenant les badges, l'architecture mathématique, la grille des animations, le guide de démarrage et la section gouvernance.
- [ ] **CRIT-8.4** : Fichier `.gitignore` actif excluant `node_modules/`, `*.bak*`, `~$*`, et les fichiers temporaires.
- [ ] **CRIT-8.5** : Fichier de licence open source `LICENSE` (MIT License 2026 bernyforce).

---

## 🛡️ Domaine 9 : Gouvernance Déterministe & Traçabilité (Ledger & Backups)

### 📌 Consignes Utilisateur Initiales
* Respect absolu de la règle **ESCAL-SCOPE v1.1** : tout travail non inclus dans le périmètre est intangible.
* Application de la règle **BACKUP-AVANT-MODIFICATION v1** : copie horodatée préalable obligatoire avant toute écriture sur fichier existant.
* Application du protocole **AGENT-LEDGER v1** : fiches de présence signées avec preuve sincère d'exécution.

### 🧪 Procédure de Test du Vérificateur
```powershell
# 1. Vérifier l'intégrité des copies de sauvegarde sur disque
Get-ChildItem *.bak* | Select-Object Name, Length, LastWriteTime

# 2. Auditer le journal des signatures Agent Ledger
python "$HOME\knowledge-share\projets-dev\agent-ledger\agent-sign.py" audit
```

### ✅ Critères de Conformité & Checklist
- [ ] **CRIT-9.1** : Présence sur disque de toutes les copies de sauvegarde horodatées :
  - `dossier_rxneurones_lenet5.html.bak-20260907-173000`
  - `demonstration_lenet5_colab.ipynb.bak-20260907-173000`
  - `index.html.bak-20260907-173000`
  - `server.js.bak-20260907-173000`
  - `LeNet-5_Presentation_Finale.pptx.bak-20260907-170058`
  - `slides.json.bak-20260907-170058`
- [ ] **CRIT-9.2** : Aucune intervention laissée ouverte sans signature finale dans `agent-ledger`.
- [ ] **CRIT-9.3** : Signature formelle de clôture de l'intervention `ec96e48c-1c6e-43c2-83d0-1bd110551903` enregistrée avec le verdict `PASS`.
- [ ] **CRIT-9.4** : Sécurité et propreté : aucun mot de passe, clé API ou jeton d'accès n'est exposé dans le code source ou dans l'historique Git.

---

## 🏁 Grille Récapitulative & Formulaire de Signature Finale

| Domaine d'Audit | Nb Critères | Statut Vérificateur | Preuve / Remarques de Contrôle |
| :--- | :---: | :---: | :--- |
| **1. Présentation PowerPoint (28 slides 16:9)** | 5 | `[ ] EN ATTENTE` | |
| **2. Animation Remotion NCR & 3 Rôles** | 4 | `[ ] EN ATTENTE` | |
| **3. Suite des 6 Animations Remotion** | 4 | `[ ] EN ATTENTE` | |
| **4. Serveur Web & Streaming Range 206** | 4 | `[ ] EN ATTENTE` | |
| **5. Identité Visuelle & 3 Thèmes** | 4 | `[ ] EN ATTENTE` | |
| **6. Dossier d'Étude Thémé Interactif** | 5 | `[ ] EN ATTENTE` | |
| **7. Expérimentation Google Colab** | 4 | `[ ] EN ATTENTE` | |
| **8. Documentation & Publication GitHub** | 5 | `[ ] EN ATTENTE` | |
| **9. Gouvernance Déterministe & Backups** | 4 | `[ ] EN ATTENTE` | |
| **TOTAL** | **39** | | |

---

### Attestation de Contrôle de l'Agent Vérificateur Indépendant

```text
Identité du Vérificateur : __________________________________________
Date et Heure du Contrôle : __________________________________________
Commande de Clôture Ledger: python ~/knowledge-share/projets-dev/agent-ledger/agent-sign.py end ...
Verdict Final Global      : [ PASS | PARTIEL | FAIL ]

Signature Numérique :
______________________________________________________________________
```

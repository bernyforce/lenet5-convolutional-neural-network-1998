# 🧠 LeNet-5 (1998) : Architecture Convolutive, Suite d'Animations Remotion & Déploiement Industriel

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/bernyforce/lenet5-convolutional-neural-network-1998/blob/main/demonstration_lenet5_colab.ipynb)
[![Cloudflare Live](https://img.shields.io/badge/Cloudflare-lenet5.iatuto.com-F38020?logo=cloudflare)](https://lenet5.iatuto.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?logo=pytorch)](demonstration_lenet5_colab.ipynb)
[![Remotion 1080p](https://img.shields.io/badge/Remotion-1080p%20%40%2030fps-purple?logo=react)](animations/)
[![PowerPoint 16:9](https://img.shields.io/badge/PowerPoint-28%20Slides%20Widescreen-orange?logo=microsoftpowerpoint)](LeNet-5.pptx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Étude approfondie et restitution multimédia haute fidélité** du premier réseau de neurones convolutif industriel moderne : **LeNet-5**, conçu en 1998 par **Yann LeCun, Léon Bottou, Yoshua Bengio et Patrick Haffner** aux laboratoires *Bell Labs*.

---

## 📑 Sommaire

1. [Vue d'Ensemble & Contexte Historique](#-vue-densemble--contexte-historique)
2. [Architecture 7 Couches LeNet-5](#-architecture-7-couches-lenet-5)
3. [Suite des 6 Animations Remotion HD](#-suite-des-6-animations-remotion-hd)
4. [Démonstration Interactive Google Colab](#-démonstration-interactive-google-colab)
5. [Portail Web & Console Conférencier](#-portail-web--console-conférencier)
6. [Présentation PowerPoint Master (28 Diapositives 16:9)](#-présentation-powerpoint-master-28-diapositives-169)
7. [Dossier Pédagogique Approfondi (Multi-Thèmes)](#-dossier-pédagogique-approfondi-multi-thèmes)
8. [Installation & Démarrage Rapide](#-installation--démarrage-rapide)
9. [Gouvernance & Traçabilité Déterministe](#-gouvernance--traçabilité-déterministe)

---

## 🏛️ Vue d'Ensemble & Contexte Historique

À la fin des années 1990, les institutions bancaires américaines font face à un défi colossal : traiter manuellement des dizaines de millions de chèques papier chaque jour. Les réseaux de neurones classiques (MLP / Perceptrons Multicouches) échouent face aux images :
* **Perte de la topologie 2D** : Aplatir une image de 32 × 32 pixels en un vecteur 1D détruit la proximité spatiale des pixels voisins.
* **Explosion combinatoire** : Des millions de connexions synaptiques impossibles à calculer sur le matériel de 1998.
* **Absence d'invariance géométrique** : Une translation d'un seul millimètre du chiffre sur le chèque perturbe totalement la reconnaissance.

Inspiré des découvertes des neurobiologistes **David Hubel & Torsten Wiesel** (Prix Nobel 1981) sur le cortex visuel primaire félin, Yann LeCun introduit le **partage des poids** et les **champs récepteurs locaux** : au lieu d'écraser l'image, de petits filtres 5 × 5 balayent la surface pour détecter des motifs élémentaires (angles, barres, boucles).

LeNet-5 est déployé avec succès par la société **NCR Corporation** dans les distributeurs automatiques de billets (ATM) et les centres de tri bancaire aux États-Unis, reconnaissant **entre 10% et 20% de tous les chèques émis sur le territoire américain** avec une précision supérieure à **99,2%**.

---

## 🧠 Architecture 7 Couches LeNet-5

```
[ Entrée 32×32 ]
       │  (6 filtres 5×5, stride 1)
       ▼
[ Couche C1 : 6 cartes 28×28 ] ── 156 poids
       │  (Sous-échantillonnage 2×2)
       ▼
[ Couche S2 : 6 cartes 14×14 ] ── 12 poids
       │  (16 filtres 5×5 asymétriques)
       ▼
[ Couche C3 : 16 cartes 10×10 ] ── 1 516 poids
       │  (Sous-échantillonnage 2×2)
       ▼
[ Couche S4 : 16 cartes 5×5 ] ── 32 poids
       │  (120 filtres 5×5)
       ▼
[ Couche C5 : 120 unités scalaires ] ── 48 120 poids
       │  (Entièrement connectée)
       ▼
[ Couche F6 : 84 unités scalaires ] ── 10 164 poids
       │  (10 unités RBF euclidiennes)
       ▼
[ Sortie : 10 classes (chiffres 0 à 9) ]
```

* **Nombre total de paramètres entraînables** : **~60 000 poids** (contre plusieurs millions pour un MLP équivalent).
* **Entrée** : Images normalisées 32 × 32 pixels avec fond à -0.1 et premier plan à +1.175.

---

## 🎬 Suite des 6 Animations Remotion HD

Le projet intègre une suite de **6 animations graphiques procédurales** créées sous [Remotion](https://www.remotion.dev/) (React + TypeScript) en résolution Full HD 1080p @ 30 fps :

| Module | Animation | Formats Disponibles | Thème Conceptuel Illustré | Diapositive Appariée |
| :---: | :--- | :--- | :--- | :---: |
| **01** | [`01_convolution`](animations/01_convolution.mp4) | MP4 (528 Ko) • GIF (882 Ko) • Poster | Balayage 2D par filtre glissant 5 × 5, extraction de contours et partage des poids. | **Slide 12** |
| **02** | [`02_neurone`](animations/02_neurone.mp4) | MP4 (708 Ko) • GIF (1,37 Mo) • Poster | Somme pondérée (Σ wi·xi + b) et franchissement de seuil non-linéaire. | **Slide 09** |
| **03** | [`03_pooling`](animations/03_pooling.mp4) | MP4 (384 Ko) • GIF (320 Ko) • Poster | Sous-échantillonnage 2 × 2, compression spatiale et invariance aux tremblements. | **Slide 14** |
| **04** | [`04_lenet5_pipeline`](animations/04_lenet5_pipeline.mp4) | MP4 (592 Ko) • GIF (1,36 Mo) • Poster | Traversée séquentielle des 7 couches de l'entrée 32 × 32 aux 10 classes de sortie. | **Slide 16** |
| **05** | [`ncr-slide`](animations/ncr-slide.mp4) | MP4 (446 Ko) • Galerie 6 captures | Déploiement industriel NCR, lecture autonome de millions de chèques par jour. | **Slide 19** |
| **06** | [`lenet5_pedagogique`](animations/lenet5_pedagogique.mp4) | MP4 (1,89 Mo) | Film pédagogique complet de synthèse des réseaux neuronaux convolutifs. | **Slide 24** |

---

## 🚀 Démonstration Interactive Google Colab

Le notebook [`demonstration_lenet5_colab.ipynb`](demonstration_lenet5_colab.ipynb) est directement exécutable sur Google Colab avec accélération GPU T4/V100 :

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/bernyforce/lenet5-convolutional-neural-network-1998/blob/main/demonstration_lenet5_colab.ipynb)

### Fonctionnalités Clés du Notebook :
1. **Implémentation PyTorch native** de la classe `LeNet5(nn.Module)`.
2. **Chargement et normalisation du jeu de données MNIST** avec mise en exergue du chiffre fil-rouge « 7 ».
3. **Module interactif d'affichage des animations Remotion** : fonction `show_animation('nom')` intégrant les flux MP4 et GIFs animés directement dans les cellules de sortie.
4. **Visualisation des cartes d'activation de la couche C1** pour observer les contours verticaux et horizontaux extraits par les filtres.
5. **Matrice de confusion complète sur 10 000 images de test** et calcul de la précision globale (> 98,5%).

---

## 🌐 Portail Web & Console Conférencier

Le portail web ([`index.html`](index.html)) propose une expérience complète de visionnage et d'animation servie en local et déployée mondialement sur le Web :

* **Visionneuse Diaporama 28 Diapositives** : Navigation fluide au clavier (flèches gauche/droite, espace) ou par glissement tactile mobile (*touch swipe*). Bascule dynamique un clic entre la diapositive fixe 1080p et la vidéo d'animation active.
* **Studio Animations Remotion** : Hub central permettant de visionner les 6 modules en lecteur MP4 ou GIF animé en boucle, avec cartouches de télémétrie technique et téléchargements.
* **Console Conférencier** : Chronomètre intégré avec mise en pause/reprise, aperçu de la diapositive suivante avec indicateur anticipé `🎬 PROCHAINE DIAPO : ANIMATION VIDÉO`, et prompteur défilant contenant le script intégral du discours.
* **4 Thèmes Visuels Rétro-Futuristes & Documentaires** :
  - `🌌 Zero-G Quantum` : Fond vide spatial profond `#030712`, dégradés radiaux émeraude/cyan.
  - `🛰️ Orbital HUD` : Grille matricielle technique 36×36px, halo vert phosphorescent `#00ffaa`.
  - `💥 Supernova` : Ambiance cyberpunk cosmique, néons roses `#fb7185` et ultraviolets `#c084fc`.
  - `📜 Origine` : Vue d'origine sobre et documentaire calquée fidèlement sur le dossier historique (`#f8fafc`, conteneur blanc, bleu académique `#0969da`).
  - Persistance automatique du thème choisi via `localStorage`.

---

## 📊 Présentation PowerPoint Master (28 Diapositives 16:9)

* [**`LeNet-5.pptx`**](LeNet-5.pptx) / [**`LeNet-5_Presentation_Finale.pptx`**](LeNet-5_Presentation_Finale.pptx) :
  - 28 diapositives au ratio moderne **16:9 Widescreen** (1920×1080).
  - Intégration complète des visuels Full HD et des objets vidéo natifs.
  - Script complet et minuté du conférencier dans le volet Présentateur de chaque diapositive.

---

## 📖 Dossier Pédagogique Approfondi (Multi-Thèmes)

Deux versions du dossier d'étude sont disponibles :
1. **Version Classique** : [`dossier_rxneurones_lenet5.html`](dossier_rxneurones_lenet5.html) (Format épuré avec bandeau Google Colab).
2. **Version Thémée & Multimédia** : [`dossier_rxneurones_lenet5_themed.html`](dossier_rxneurones_lenet5_themed.html) (Habillage intégral avec les 4 thèmes dont la vue « Origine », sélecteur sticky, matrices de convolution interactives 6×6 → 4×4, lecteurs d'animations intégrés dans chaque chapitre et quiz interactif d'auto-évaluation en 10 questions).

---

## ⚡ Installation & Démarrage Rapide

### Accès Public Direct via Cloudflare
Le projet est déployé en ligne et accessible mondialement sous HTTPS :
* **Portail Principal & Diaporama** : [**`https://lenet5.iatuto.com/`**](https://lenet5.iatuto.com/)
* **Dossier Pédagogique Approfondi (4 Thèmes)** : [**`https://lenet5.iatuto.com/dossier_rxneurones_lenet5_themed.html`**](https://lenet5.iatuto.com/dossier_rxneurones_lenet5_themed.html)
* **Dossier Documentaire Original** : [**`https://lenet5.iatuto.com/dossier_rxneurones_lenet5.html`**](https://lenet5.iatuto.com/dossier_rxneurones_lenet5.html)

### Prérequis Locaux
* Node.js (v18+)
* Python (3.10+) avec PyTorch, torchvision, matplotlib (pour le notebook local)

### Lancement du Serveur Web Local
```bash
# Démarrer le serveur HTTP avec support streaming Range (code 206)
node server.js
```
Accédez au portail :
* **Localhost** : `http://localhost:8080/`
* **Dossier Pédagogique Thémé** : `http://localhost:8080/dossier_rxneurones_lenet5_themed.html`
* **API Diapositives** : `http://localhost:8080/api/slides`

---

## 🛡️ Gouvernance & Traçabilité Déterministe

Le projet est développé et validé selon les protocoles de traçabilité stricts :
* **ESCAL-SCOPE v1.1** : Périmètre d'intervention borné et respect des données historiques intangibles.
* **BACKUP-AVANT-MODIFICATION v1** : Sauvegardes horodatées obligatoires de tout fichier existant avant écriture (`.bak-YYYYMMDD-HHMMSS`).
* **AGENT-LEDGER v1** : Fiches de présence et audit cryptographique des interventions (`agent-sign.py`).
* **Séparation Stricte des Rôles** :
  - 📋 [Rapport de Planification Indépendante](planificateur-report.md)
  - ⚙️ [Compte-Rendu d'Exécution](executeur-report.md)
  - ✅ [Rapport d'Audit & Contrôle Indépendant (12/12 PASS)](verificateur-report.md)

---

## 📄 Licence

Ce projet est distribué sous licence MIT. Les données historiques, équations et diagrammes originaux de LeNet-5 sont crédités à Yann LeCun et Bell Labs (1998).


---

### 🎓 Crédits & Cadre Académique

Ce projet d'étude et de rétro-ingénierie didactique de l'architecture historique **LeNet-5 (Yann LeCun et al., 1998)** a été conçu et développé par **Bernard Feugang Noussi** dans le cadre du **Cours d'Apprentissage Profond & Réseaux de Neurones** au **Collège de Bois-de-Boulogne** (Montréal, Québec), programme de **Spécialisation technique en intelligence artificielle (AEC LEA.D1)**.
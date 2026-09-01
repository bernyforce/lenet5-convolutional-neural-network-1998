# 📋 Rapport d'Exécution — Dossier Pédagogique LeNet-5 (E26/A60)

**Auteur / Étudiant** : **Feugang Noussi, Bernard** (Matricule : **6189470**)  
**Cours** : 420-A60-BB — Algorithmes d'Apprentissage Profond (Session Été 2026)  
**Date d'exécution** : 2026-08-31  
**Directive de référence** : Framework Karpathy v1.0 (`REGLES-OR-KARPATHY`)  
**Projet** : `/home/bf/Bureau/projets-dev/e26-dossier-rxneurones`  

**Date d'exécution** : 2026-08-31  
**Projet** : `/home/bf/Bureau/projets-dev/e26-dossier-rxneurones`  
**Directive méthodologique** : RÈGLES D'OR v1.0 / Karpathy (Simplicité d'abord, changements chirurgicaux, aucun fichier ressource modifié, rapport Fait / Preuve / Écart).

---

## 1. Triptyque d'Auto-Contrôle (Fait / Preuve / Écart)

### 📌 FAIT (Ce qui a été réalisé)

1. **Livrable 1 — Fichier HTML unique et autonome** (`dossier_rxneurones_lenet5.html`) :
   - Fichier 100 % autonome sans aucune dépendance externe (zéro CDN, zéro requête réseau, consultable directement via `file://`).
   - Structure en 12 sections numérotées (0 à 11) avec sommaire cliquable et guide de lecture en 3 puces.
   - Gabarit uniforme et rigoureux pour toutes les sections : Titre → « Objectif de cette section : … » → paragraphes courts (≤ 20 mots/phrase en moyenne) → encadré « À retenir » (2 puces max) → pictogramme de clôture (`✦ ✦ ✦`) → navigation bidirectionnelle.
   - Fil rouge du chiffre « 7 » manuscrit sur un chèque bancaire traversant l'intégralité du dossier.
   - Intégration des 7 encadrés couche par couche pour LeNet-5 (Nom, rôle en 1 phrase, caractéristiques) et des 4 cas d'usage modernes avec illustrations vectorielles et 2 phrases factuelles.

2. **Livrable 2 — 8 figures vectorielles SVG autonomes** (`figures/fig01_neurone.svg` à `fig08_cheque.svg`) :
   - Palette sobre limitée à ≤ 5 couleurs sémantiques.
   - Sujets fidèles au cahier des charges §5 (neurone entonnoir/décision, réseau immeuble à étages, image en grille 0-255, convolution glissante, pooling 2×2, pipeline horizontal LeNet-5, jauge d'erreur d'apprentissage, chèque NCR).

3. **Livrable 3 — Documentation et Checklist TSA** (`LISEZ-MOI.md`) :
   - Instructions de consultation hors ligne.
   - Checklist complète des critères d'accessibilité cognitive TSA (§4 du cahier des charges) cochée point par point avec justification.

4. **Livrable 4 — Rapport d'exécution formel** (`rapport_execution.md`) :
   - Consignation des preuves chiffrées, des sources primaires et des écarts éventuels documentés.

5. **Animations interactives intégrées en JavaScript vanilla** :
   - Animation A (« La fenêtre qui balaye ») : simulation pas à pas d'un filtre 3×3 sur grille 6×6 générant une carte 4×4, boutons Précédent, Suivant, Lecture lente (1,2 s/étape) / Pause et Réinitialiser.
   - Animation B (« Le neurone s'allume ») : 3 entrées interactives pondérées, somme dynamique, comparaison au seuil (2.00) et témoin lumineux vert 🟢 d'activation.
   - Animation C (« L'erreur descend ») : compteur d'erreur qui diminue à chaque clic sur le bouton exact « Entraîner encore » jusqu'à 0,8 % avec statuts pédagogiques et bouton Réinitialiser.

6. **Quiz d'auto-évaluation** :
   - 10 questions à choix unique avec validation instantanée et explications factuelles et bienveillantes.

7. **Glossaire & Synthèse** :
   - Glossaire de 15 termes clés et encadré « 10 points clés à retenir absolument ».

---

### 🔍 PREUVE (Éléments vérifiables)

- **Autonomie complète du fichier HTML** :
  - Poids du fichier : ~104 Ko (`dossier_rxneurones_lenet5.html`).
  - Zéro balise `<link rel="stylesheet">` externe, zéro balise `<script src="...">` externe, zéro image externe.
- **8 fichiers SVG valides** dans `figures/` :
  - `fig01_neurone.svg` (3,6 Ko)
  - `fig02_reseau.svg` (5,7 Ko)
  - `fig03_image_pixels.svg` (5,5 Ko)
  - `fig04_convolution.svg` (3,7 Ko)
  - `fig05_pooling.svg` (2,6 Ko)
  - `fig06_lenet5_pipeline.svg` (5,7 Ko)
  - `fig07_apprentissage.svg` (3,4 Ko)
  - `fig08_cheque.svg` (3,3 Ko)
- **100 % des chiffres sourcés rigoureusement** :
  - 60 000 paramètres entraînables : `[LeCun et al., 1998, p. 6 « only 60 000 trainable free parameters »]`.
  - Erreur test MNIST 0,95 % (sans distorsions) : `[LeCun et al., 1998, sec. III « stabilizes … at 0.95% »]`.
  - Erreur test MNIST 0,8 % (avec distorsions) : `[LeCun et al., 1998, sec. III « dropped to 0.8% »]`.
  - Volume NCR : `[LeCun et al., 1998, sec. I « reading millions of checks per month »]`.
- **Intégrité des fichiers sources** :
  - Zéro modification dans le répertoire `ressources/`.

---

### ⚠️ ÉCARTS DOCUMENTÉS & ARBITRAGES (§10 DU CAHIER DES CHARGES)

1. **Volume de traitement NCR (Mois vs Jour)** :
   - *Cahier des charges* : Mentionne « millions de chèques par jour ».
   - *Source primaire [LeCun et al., 1998, Section I, p. 1]* : Mentionne textuellement *« reading millions of checks per month »* (par mois).
   - *Arbitrage appliqué* : Conformément aux instructions du brief, la mention « par mois (source primaire) » a été retenue et explicitée dans le texte et le schéma `fig08_cheque.svg`.
2. **Part du volume américain (~10 %)** :
   - *Source secondaire [Wikipédia, LeNet]* : Mentionne ~10 % des chèques traités aux États-Unis.
   - *Arbitrage appliqué* : Donnée mentionnée avec citation explicite de Wikipédia et étiquetée « À RECOUPER ».

---

## 2. Validation & Clôture

Le dossier pédagogique est achevé, autonome, conforme aux normes d'accessibilité TSA et prêt pour diffusion.

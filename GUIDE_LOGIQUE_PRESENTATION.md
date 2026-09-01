# 🧠 GUIDE DE COMPRÉHENSION LOGIQUE — ARCHITECTURE LENET-5 (1998)
### Cours 420-A60-BB — Algorithmes d'Apprentissage Profond (Évaluation 2)

**Étudiant** : **Feugang Noussi, Bernard**  
**Matricule / N° Étudiant** : **6189470**  
**Sujet** : **n°6 — LeNet-5 (1998) [Réseau de Neurones Convolutif / CNN]**  
**Article de référence** : *Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner (AT&T Labs-Research, IEEE 1998)*  
**Format** : Soutenance de 7 minutes (+ 3 minutes de questions)

---

## 🎯 La Phrase Magique (Pour résumer tout le projet en 15 secondes)

> *« LeNet-5 est le premier réseau de neurones convolutif industriel (1998) : au lieu d'écraser l'image en 1D, il fait glisser de petits filtres pour repérer les traits du chiffre morceau par morceau, avec seulement 60 000 paramètres, ce qui a permis de trier automatiquement 20 millions de chèques par jour aux États-Unis avec moins de 1 % d'erreur. »*

---

## 🗺️ Les 21 Idées Clés Classées selon l'Ordre de votre Présentation

### 📍 ACTE 1 : Le Problème Initial (Slides 1 & 2 — 0:00 à 1:45)
1. **Une image est une matrice de pixels** : L'ordinateur ne voit pas un dessin, il voit un tableau de 32×32 nombres entre 0 (blanc) et 255 (encre noire).
2. **L'écriture humaine varie constamment** : Deux personnes écrivent le chiffre « 7 » de façons très différentes (penché, épais, avec ou sans barre). On ne peut pas coder des règles manuelles « si... alors... ».
3. **L'échec des anciens réseaux (MLP = Perceptron Multi-Couches)** : Avant LeNet-5, on aplatissait l'image en une ligne de 1024 nombres. Cela détruisait la géométrie 2D (les pixels voisins étaient séparés) et faisait exploser le nombre de calculs.
4. **Le besoin d'invariance spatiale** : Si le « 7 » est décalé de 2 millimètres à gauche sur le chèque bancaire, la machine doit quand même le reconnaître sans faute.

---

### ⚙️ ACTE 2 : Les Outils Révolutionnaires de LeNet-5 (Slide 2 & 4 — 1:45 à 3:00)
5. **Le Neurone Artificiel** : Petite calculatrice qui prend plusieurs entrées ($x$), les multiplie par des coefficients d'importance (les **poids** $w$), calcule la somme totale ($\sum$), et décide s'il s'allume ou reste éteint.
6. **Les Poids ($w$) et le Biais ($b$)** : Les curseurs de réglage internes du modèle. Aléatoires au début, ils deviennent précis après entraînement.
7. **La Fonction d'Activation ($	anh$ / Sigmoïde)** : Le seuil de bascule non-linéaire qui décide si le neurone transmet une impulsion forte à la couche suivante.
8. **La Convolution (La Loupe Glissante)** : On fait glisser une petite grille 5×5 (un **filtre**) sur toute l'image pour repérer des motifs locaux (barre horizontale, diagonale, angle).
9. **Le Partage des Poids** : C'est le **même filtre** qui cherche la barre du « 7 » partout sur l'image. Énorme gain : seulement **60 000 paramètres** au total au lieu de millions !
10. **La Carte de Caractéristiques (Feature Map)** : La nouvelle grille créée par le filtre où chaque case indique l'intensité du motif trouvé.

---

### 🚀 ACTE 3 : Le Voyage de l'Image à Travers les 7 Couches (Slide 3 — Le Pipeline)
11. **Couche C1 (6 filtres de 5×5)** : Extrait 6 types de traits élémentaires (bords verticaux, horizontaux, angles). Sortie : 6 plans de 28×28 [Sect. II-B].
12. **Couche S2 (Sous-échantillonnage / Pooling 2×2)** : Compresse de moitié (14×14) en résumant chaque carré 2×2. Rend le modèle insensible aux petits tremblements.
13. **Couche C3 (16 filtres de 5×5)** : Combine les traits simples pour reconnaître des formes plus complexes (ex: le croisement de la barre du haut et de la diagonale du « 7 ») [Sect. II-B].
14. **Couche S4 (Sous-échantillonnage 2×2)** : Deuxième compression (5×5) pour synthétiser la silhouette globale du chiffre.
15. **Couches Denses C5 (120 unités) & F6 (84 unités)** : Le « cerveau » qui rassemble tous les morceaux détectés pour voter sur le chiffre final [Sect. II-B].
16. **Couche de Sortie (10 classes)** : 10 neurones (un par chiffre de 0 à 9). La sortie correspondant au « 7 » émet le signal le plus fort.

---

### 🎓 ACTE 4 : L'Apprentissage & Les Données Chiffrées (Slide 4 — 3:00 à 4:00)
17. **La Rétropropagation du Gradient** : Lorsque la machine se trompe à l'entraînement, elle fait reculer l'erreur pour corriger petit à petit ses 60 000 poids dans la bonne direction.
18. **La Base de Référence MNIST (70 000 chiffres manuscrits)** : Le jeu de données standard mondial sur lequel LeNet-5 a été mesuré.
19. **Le Taux d'Erreur Record (0,8 % à 0,95 %)** : Sur 10 000 images de test jamais vues, LeNet-5 atteint 0,95% sans distorsion et 0,8% avec distorsions [LeCun et al., 1998, Sect. III-B].

---

### 🏦 ACTE 5 : L'Impact Industriel & La Vision Moderne (Slides 5, 6, 7 & 8)
20. **Le Déploiement Bancaire NCR (Juin 1996)** : Intégré dans les trieuses de chèques NCR aux États-Unis, LeNet-5 lisait **~20 millions de chèques par jour** (~10 % de tout le volume bancaire américain) [Sect. III-B].
21. **La Filiation vers l'IA Moderne** : LeNet-5 est l'ancêtre direct d'**AlexNet (2012)** et de tous les systèmes de vision par ordinateur contemporains (déverrouillage facial Face ID, analyse d'IRM médicale, véhicules autonomes).

---

## ❓ 3 Questions Pièges Possibles du Jury & Comment y Répondre

### Question 1 : *« Pourquoi LeNet-5 n'utilisait-il pas ReLU au lieu de tanh/sigmoïde ? »*
> **Réponse modèle** : *« En 1998, les fonctions tanh et sigmoïdes étaient la norme théorique héritée des neurosciences. ReLU a été popularisé plus tard avec AlexNet en 2012 pour éviter la saturation du gradient sur des réseaux beaucoup plus profonds. »*

### Question 2 : *« Quelle est la différence entre un réseau dense (MLP) et un réseau convolutif (CNN) ? »*
> **Réponse modèle** : *« Le MLP connecte chaque pixel à chaque neurone sans tenir compte de la 2D, ce qui explose en calculs. Le CNN applique de petits filtres glissants locaux avec partage des poids, préservant la géométrie spatiale avec 100 fois moins de paramètres. »*

### Question 3 : *« LeNet-5 était-il seulement un modèle théorique ? »*
> **Réponse modèle** : *« Non, dès juin 1996, NCR l'a déployé en production industrielle pour trier environ 20 millions de chèques bancaires par jour aux USA, ce qui représentait 10 % du volume national [LeCun et al., 1998, Sect. III-B]. »*

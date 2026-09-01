---
id: livre-ap-ch4-defis-et-solutions
type: chapter
scope: project
status: active
created: 2026-08-31
updated: 2026-08-31
owner: user
book: "Apprentissage profond — Théorie et applications"
book_slug: apprentissage-profond
author: "Neila Mezghani"
chapter: 4
source: ["chapters/03-ap3_260710_114248.md#L2251-L2824", "chapters/04-ap4_260710_115102.md#L1-L2101"]
ocr_note: "Source scannée OCR (tesseract, qualité variable) ; nettoyage fidèle : dé-césure, suppression des en-têtes/pieds de page répétés et du bruit OCR non textuel ; aucun contenu inventé, aucune réécriture de fond. Les équations sont retranscrites au plus proche de l'OCR d'origine (notation mathématique parfois dégradée par le scan) ; les extraits de code ont reçu une correction minimale des confusions de caractères évidentes (l/1, O/0) sans garantie d'exécution parfaite."
language: fr
---

# Chapitre 4 — Réseaux de neurones profonds : défis et solutions

Les LSTM, présentés dans un contexte de longues périodes, permettent de traiter la traduction automatique et certaines formes de génération de texte. Ils font l'objet du chapitre 6.

Les auto-encodeurs (*autoencoders*) constituent une famille particulière de réseaux de neurones conçus pour apprendre une représentation compacte des données. Leur architecture se distingue par la présence de deux composantes principales : un encodeur, qui projette les données d'entrée dans un espace latent de dimension réduite, et un décodeur, qui tente de reconstruire les données d'origine à partir de cette représentation. Les auto-encodeurs classiques, notamment ceux fondés sur des couches entièrement connectées ou convolutionnelles, adoptent une architecture à propagation avant, dans laquelle l'information circule uniquement de l'entrée vers la sortie, sans rétroaction ni mémoire interne. En revanche, certaines variantes, comme les auto-encodeurs récurrents, incorporent des mécanismes de mémoire temporelle via des réseaux de neurones récurrents, ce qui les rend inadaptés à une catégorisation stricte comme réseaux à propagation avant. Les auto-encodeurs sont couramment utilisés pour des tâches telles que la réduction de dimensionnalité, la détection d'anomalies, ou encore l'apprentissage non supervisé de représentations latentes. Une présentation détaillée des auto-encodeurs est proposée au chapitre 7.

Les modèles génératifs peuvent être à la fois des réseaux de neurones à propagation avant et des réseaux ayant des rétroactions, en fonction de leur architecture et de leur conception. Ce sont des modèles capables de créer de nouvelles données qui ressemblent étroitement aux données d'apprentissage, avec des applications allant de la génération d'images à la synthèse vocale. Parmi ces modèles génératifs, les réseaux de neurones génératifs antagonistes (*Generative Adversarial Networks*, GAN) se démarquent par leur architecture duale : ils se composent d'un générateur et d'un discriminateur, entraînés simultanément dans un jeu compétitif où le générateur tente de produire des données réalistes et le discriminateur cherche à distinguer les données réelles des données générées. Les GAN sont basés sur des réseaux à propagation avant. Ils sont particulièrement connus pour leurs capacités à générer des images réalistes, à synthétiser des voix et à créer du contenu multimédia immersif. Les modèles génératifs font l'objet du chapitre 8.

Les modèles et architectures de réseaux de neurones profonds mentionnés ci-dessus ont révolutionné le domaine de l'intelligence artificielle. Ils ont permis de repousser les limites du traitement de problématiques complexes, notamment grâce à leur profondeur. Cependant, leur efficacité ne repose pas uniquement sur cette architecture. Elle s'appuie également sur des recherches approfondies visant à surmonter les nombreux défis liés à leur complexité, accentuée par la profondeur même de ces réseaux.

Ce chapitre explore ces défis et présente les solutions développées pour y remédier, tel que résumé à la figure 4.1 *(figure non reproduite)*. Nous débutons par le problème de la disparition et de l'explosion des gradients, un phénomène pouvant empêcher un réseau de neurones d'apprendre efficacement. Nous détaillerons plusieurs approches pour atténuer ce problème, notamment l'initialisation des poids, le choix des fonctions d'activation, la normalisation par lots et l'écrêtage du gradient, qui permettent d'améliorer la stabilité de l'apprentissage et d'accélérer la convergence du modèle.

> **Note.** Le type d'un réseau de neurones et son architecture sont deux concepts distincts. Le type définit une grande famille de modèles basée sur un mode de fonctionnement général. Par exemple, les réseaux de neurones convolutifs (CNN) et les réseaux de neurones récurrents (RNN) sont des types de réseaux de neurones. En revanche, l'architecture du réseau de neurones désigne une implémentation spécifique au sein d'un type donné, intégrant des optimisations particulières. Par exemple, ResNet est une architecture spécifique de CNN, tandis que le LSTM est une architecture particulière de RNN.

## 4.1 Disparition et explosion du gradient

L'algorithme de rétropropagation du gradient a été détaillé à la section 3.3.2 du chapitre 3. Son fonctionnement est résumé à la figure 4.2 *(figure non reproduite)* à titre de rappel. Cet algorithme fonctionne en parcourant le réseau de neurones de la couche de sortie vers la couche d'entrée, en propageant le gradient de l'erreur à chaque couche. Une fois le gradient de la fonction de coût calculé par rapport à chaque paramètre du réseau, ces gradients sont utilisés pour ajuster les paramètres lors d'une mise à jour effectuée par la descente du gradient.

*Figure 4.2 — Sommaire du fonctionnement de l'algorithme de rétropropagation du gradient (figure non reproduite).*

Lors de l'entraînement des réseaux de neurones profonds, deux problèmes peuvent survenir : la disparition des gradients (*vanishing gradients*) et l'explosion des gradients (*exploding gradients*).

La disparition des gradients survient lorsque les gradients deviennent excessivement faibles au fur et à mesure que l'algorithme progresse vers les couches inférieures. Dans cette situation, les mises à jour des poids deviennent de moins en moins significatives. [passage OCR illisible — transition manquante entre les pages 182 et 183] Des solutions, telles que les techniques de régularisation et des méthodes d'initialisation des poids, ont été proposées afin de surmonter cette instabilité. Ces solutions ont permis de relancer l'intérêt pour les réseaux de neurones profonds, notamment avec l'apparition des architectures modernes comme les CNN et les LSTM.

Dans le reste de cette section, nous présentons différentes solutions proposées dans la littérature pour prévenir la disparition et l'explosion des gradients. Certaines méthodes sont conçues pour cibler l'un de ces deux phénomènes en particulier, tandis que d'autres offrent une atténuation conjointe des deux.

> **Pour aller plus loin.** Pour une exploration plus approfondie de la disparition et de l'explosion des gradients, l'article « Understanding the exploding gradient problem » de Razvan Pascanu, Tomas Mikolov et Yoshua Bengio, publié en 2012 sur arXiv, offre une analyse approfondie du problème de l'explosion des gradients, en explorant ses causes fondamentales et en proposant des méthodes pour le gérer efficacement.

### 4.1.1 Initialisation des poids

L'objectif de l'initialisation des poids est d'assurer une propagation stable des activations et des gradients. Plusieurs méthodes d'initialisation ont été citées dans la littérature. Le choix de la méthode dépend du type de fonction d'activation utilisée, de la profondeur du réseau et de la nature des données. Les méthodes proposées par Glorot et He sont souvent les plus utilisées dans la pratique, car elles assurent à la fois une stabilité des gradients et une convergence rapide des algorithmes d'optimisation utilisés pour entraîner les réseaux de neurones.

**Initialisation de Glorot**

L'initialisation de Glorot (également connue sous le nom d'initialisation de Xavier) a été proposée par Xavier Glorot. L'objectif de cette méthode d'initialisation est de maintenir la variance des activations à travers les couches du réseau de neurones stable, aussi bien pour la propagation avant (calcul des activations) que pour la rétropropagation (calcul des gradients).

Formellement, l'initialisation de Glorot (ou Xavier) se base sur le nombre de neurones d'entrée n_in et de sortie n_out d'une couche donnée. Elle peut prendre deux formes en fonction de la distribution utilisée pour initialiser les poids.

Dans le cas d'une distribution uniforme, les poids sont échantillonnés selon une distribution uniforme entre :

```
[ -√(6 / (n_in + n_out)) , +√(6 / (n_in + n_out)) ]
```

*(équation retranscrite depuis l'OCR, notation d'origine partiellement dégradée)*

```python
# Extrait de code 4.1 - Modèle séquentiel avec des initialisations de Glorot.
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input
from tensorflow.keras.initializers import GlorotUniform, GlorotNormal

# Créer un modèle séquentiel
model = Sequential()

# Ajouter une couche Input
model.add(Input(shape=(100,)))

# Ajouter une couche dense avec initialisation Glorot Uniforme
model.add(Dense(units=64,
                 activation='relu',
                 kernel_initializer=GlorotUniform()))

# Ajouter une deuxième couche dense avec initialisation Glorot Normale
model.add(Dense(units=32,
                 activation='relu',
                 kernel_initializer=GlorotNormal()))

# Ajouter une couche de sortie avec initialisation Glorot Uniforme
model.add(Dense(units=10,
                 activation='softmax',
                 kernel_initializer=GlorotUniform()))
```

**Initialisations de He**

L'initialisation de He a été introduite par Kaiming He. Tout comme l'initialisation de Glorot, elle vise à stabiliser la propagation des gradients, mais elle est spécifiquement conçue pour les fonctions d'activation ReLU et ses variantes. Les poids w sont ainsi initialisés selon une distribution normale ou uniforme.

Dans le cas d'une distribution uniforme, l'initialisation se fait selon une plage de l'ordre de `±√(6 / n_in)`. Dans le cas d'une distribution normale, la forme est de l'ordre de `N(0, 2 / n_in)` *(équations retranscrites depuis l'OCR, notation d'origine partiellement dégradée)*, où w représente les poids de la couche, tandis que n_in est le nombre de neurones en entrée de cette dernière.

Contrairement à l'initialisation de Glorot, qui répartit la variance entre les neurones d'entrée et de sortie, l'initialisation de He accorde plus de poids aux neurones d'entrée.

### 4.1.2 Fonctions d'activation

Une mauvaise initialisation empêche la mise à jour des poids lors de l'apprentissage et conduit au phénomène de disparition du gradient. Ce problème est particulièrement critique dans les réseaux de neurones profonds, où l'algorithme de rétropropagation du gradient repose sur la règle de la chaîne pour ajuster les poids du réseau. Lorsque les gradients deviennent trop faibles, les mises à jour des poids sont négligeables, ralentissant considérablement l'apprentissage, voire l'empêchant complètement.

Rappelons que, tel qu'expliqué à la section 3.3.2, à chaque couche *l* du réseau de neurones, la mise à jour des poids dépend de la dérivée de la fonction d'activation σ de la couche *l*. Si cette dérivée est trop proche de zéro (comme le montre la figure 4.4 (b), *figure non reproduite*), les gradients deviennent faibles, ce qui entraîne une disparition du gradient. À l'opposé, si la dérivée est trop grande, les gradients explosent, conduisant à une explosion du gradient.

*Figure 4.4 — Fonction sigmoïde et sa dérivée (figure non reproduite). La dérivée s'annule progressivement lorsque les valeurs d'entrée s'approchent des extrémités 0 ou 1, ce qui peut entraîner un phénomène de saturation limitant la propagation du gradient.*

Afin de pallier ces limitations, la fonction d'activation ReLU, introduite par Nair et Hinton en 2010, s'est progressivement imposée dans la littérature comme une alternative efficace. La fonction ReLU ne sature pas pour les entrées positives (figure 4.5 (a), *figure non reproduite*), ce qui maintient des gradients significatifs pendant l'apprentissage et favorise une convergence plus rapide. De plus, sa simplicité computationnelle grâce à son opération de comparaison linéaire en a fait une alternative bien plus efficace que la sigmoïde pour les architectures profondes. Ces avantages ont été largement confirmés dans les travaux sur les réseaux convolutifs et les perceptrons multicouches, où la fonction ReLU s'est imposée comme le standard pour les couches cachées des réseaux de neurones modernes.

**Leaky ReLU.** La fonction Leaky ReLU résout le problème de mort de certains neurones en conservant une petite pente (a·x) dans la région négative, ce qui assure que les gradients ne deviennent pas nuls, permettant de poursuivre l'entraînement même avec des activations négatives. Si a est plus grand, les valeurs négatives sont plus significatives ; si a est plus petit, la fonction se rapproche de la ReLU standard.

**Exponential Linear Unit (ELU).** La fonction d'activation ELU, illustrée à la figure 4.6 (b) *(figure non reproduite)*, est similaire à la fonction Leaky ReLU, mais elle incorpore une exponentielle pour les valeurs négatives : `f(x) = a·(eˣ − 1)` si x < 0, `f(x) = x` si x ≥ 0, où a est un hyperparamètre qui contrôle l'intensité de la partie négative de la fonction (typiquement a = 1,0). De plus, contrairement à la fonction ReLU, qui présente une discontinuité à zéro, la fonction ELU est continue et dérivable partout, y compris à zéro, ce qui la rend plus adaptée pour des modèles nécessitant des gradients continus et lisses. Dans la région où x < 0, la sortie de la fonction ELU tend vers −a lorsque x devient très petit, ce qui induit une saturation. La fonction ELU est également connue pour fournir des gradients plus robustes que ReLU, ce qui peut améliorer la stabilité du modèle lors de l'entraînement. Sa partie exponentielle est toutefois plus coûteuse à calculer que les opérations simples effectuées par ReLU, ce qui peut augmenter le temps de calcul dans les grands réseaux.

**Scaled Exponential Linear Unit (SELU).** La fonction d'activation SELU est une version normalisée d'ELU qui offre une auto-normalisation lors de l'entraînement de réseaux de neurones profonds. Introduite par Günter Klambauer en 2017, elle a pour objectif d'assurer que les activations restent normalisées autour d'une moyenne nulle et d'une variance unitaire (figure 4.6 (c), *figure non reproduite*).

```python
# Extrait de code 4.3 - Différentes fonctions d'activation.
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LeakyReLU, Input

# Créer un modèle séquentiel
model = Sequential()

# Ajouter une couche Input explicite comme première couche
model.add(Input(shape=(10,)))

# Ajouter la première couche avec ReLU
model.add(Dense(64, activation='relu'))

# Ajouter la deuxième couche avec ELU
model.add(Dense(64, activation='elu'))

# Ajouter une troisième couche avec Leaky ReLU (alpha=0.1)
model.add(Dense(64))
model.add(LeakyReLU(alpha=0.1))

# Ajouter une quatrième couche avec SELU
model.add(Dense(64, activation='selu'))

# Ajouter une couche de sortie avec Sigmoïde
model.add(Dense(1, activation='sigmoid'))
```

### 4.1.3 Normalisation par lots

La normalisation par lots (*Batch Normalization*, BN) est une technique utilisée dans les réseaux de neurones pour améliorer la stabilité et l'efficacité de l'entraînement en normalisant la distribution des entrées de chaque couche. Cette normalisation permet de lutter contre le problème du décalage de covariance interne, qui survient lorsque la distribution des sorties d'une couche change pendant l'entraînement, affectant ainsi les couches suivantes et ralentissant l'entraînement.

Formellement, la normalisation par lots aborde le problème de dispersion des activations en normalisant les activations d'une couche sur chaque mini-lot de données d'entraînement, avant de les transmettre à la couche suivante. Ce processus repose sur cinq opérations fondamentales, qui permettent d'assurer une distribution stable des activations tout au long de l'entraînement (figure 4.7, *figure non reproduite*), à commencer par le calcul de la moyenne du mini-lot : pour un mini-lot de taille m constitué des activations {a₁, a₂, ..., aₘ} produites par un neurone donné, la moyenne μ est calculée sur ces m valeurs.

> **Pour aller plus loin.** Pour une compréhension approfondie de la Batch Normalization, l'article fondateur « Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift » par Sergey Ioffe et Christian Szegedy, publié en 2015, introduit la Batch Normalization et démontre comment elle réduit le décalage covariant interne (*internal covariate shift*), permettant ainsi un entraînement plus rapide et stable des réseaux profonds.

**Exemple 4.4.** Keras permet la mise en œuvre de la normalisation par lots très facilement via la classe `BatchNormalization` (extrait de code 4.4). Ainsi, une couche de normalisation est ajoutée après chaque couche cachée. Cette technique contribue à stabiliser et accélérer l'entraînement en réduisant la covariance interne entre les couches. Toutefois, l'ajout systématique d'une couche de normalisation n'est pas toujours pertinent : son utilité dépend de l'architecture du réseau, du type d'activation utilisé et du comportement empirique observé lors de l'apprentissage.

```python
# Extrait de code 4.4 - Normalisation par lots (BatchNormalization()).
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, BatchNormalization

model = Sequential()
model.add(Dense(300, activation="elu", kernel_initializer="he_normal"))
model.add(BatchNormalization())
model.add(Dense(100, activation="elu", kernel_initializer="he_normal"))
model.add(BatchNormalization())
model.add(Dense(1, activation="sigmoid"))
```

### 4.1.4 Écrêtage du gradient

L'écrêtage du gradient (*gradient clipping*) est une technique utilisée pour prévenir l'explosion du gradient lors de l'entraînement des réseaux de neurones, en particulier dans les réseaux profonds ou récurrents. L'explosion du gradient se produit lorsque les gradients deviennent très grands pendant la rétropropagation, entraînant des mises à jour de poids excessivement grandes et rendant l'entraînement instable. De ce fait, si un gradient dépasse une certaine norme, l'écrêtage permet de limiter la valeur maximale des gradients.

Différentes méthodes d'écrêtage des gradients sont utilisées afin de limiter leur amplitude et stabiliser l'apprentissage. Ces méthodes se déclinent principalement en deux approches : l'écrêtage par valeur, qui contraint individuellement chaque composante du gradient à une plage prédéfinie, et l'écrêtage par norme, qui impose une borne supérieure à la norme globale du gradient.

**Écrêtage par valeur.** L'écrêtage par valeur (*clipping by value*) est la technique d'écrêtage de gradients la plus simple et directe : les gradients sont individuellement écrêtés pour se situer dans une plage prédéfinie, chaque composante étant tronquée de manière indépendante. L'écrêtage par norme, à l'inverse, réduit uniformément l'amplitude du gradient tout en préservant sa direction. Cette dernière méthode est particulièrement efficace pour les réseaux de neurones récurrents, où elle est couramment utilisée pour contrôler l'explosion du gradient.

> **Pour aller plus loin.** L'article « On the difficulty of training recurrent neural networks » de Razvan Pascanu, Tomas Mikolov et Yoshua Bengio (2013) est une contribution majeure au domaine de l'apprentissage profond, en particulier pour les réseaux de neurones récurrents (RNN). Cet article analyse les défis liés à l'entraînement des réseaux de neurones récurrents et propose des solutions comme l'écrêtage du gradient.

**Exemple 4.5.** Cet exemple illustre l'impact de l'écrêtage sur la performance d'un modèle de régression, selon trois scénarios : sans écrêtage (cas 1), avec écrêtage par valeur (cas 2) et avec écrêtage par norme (cas 3). Keras prend en charge l'écrêtage des gradients, aussi bien par valeur que par norme, via les paramètres `clipvalue` et `clipnorm` de l'optimiseur (extrait de code 4.5).

```python
# Extrait de code 4.5 - Écrêtage du gradient (clipping).
# Cas 1 : modèle sans écrêtage
model1 = create_model()  # Fonction qui crée un modèle avec la même architecture
model1.compile(loss='mean_squared_error',
                optimizer=SGD(learning_rate=0.001, momentum=0.9))
history1 = model1.fit(trainX, trainY,
                       validation_data=(testX, testY),
                       epochs=200, verbose=1)

# Cas 2 : modèle avec écrêtage par valeur
model2 = create_model()
model2.compile(loss='mean_squared_error',
                optimizer=SGD(learning_rate=0.001, momentum=0.9, clipvalue=0.1))
history2 = model2.fit(trainX, trainY,
                       validation_data=(testX, testY),
                       epochs=200, verbose=1)

# Cas 3 : modèle avec écrêtage par norme
model3 = create_model()
model3.compile(loss='mean_squared_error',
                optimizer=SGD(learning_rate=0.001, momentum=0.9, clipnorm=1.0))
history3 = model3.fit(trainX, trainY,
                       validation_data=(testX, testY),
                       epochs=200, verbose=1)
```

Parmi les deux méthodes d'écrêtage testées, les résultats obtenus suite à l'écrêtage par norme montrent que cette méthode permet d'atteindre des erreurs plus faibles en un nombre réduit d'itérations, ce qui en fait une approche particulièrement avantageuse pour les modèles d'apprentissage profond.

## 4.2 Temps de calcul élevé

Rappelons que l'objectif de l'entraînement d'un réseau de neurones est l'ajustement des poids et des biais du réseau afin de minimiser une fonction de perte spécifique, qui quantifie la différence entre les prédictions du réseau et les valeurs cibles des données d'entraînement.

Tel que décrit à la figure 4.2, le processus d'entraînement comprend, entre autres, une propagation avant (durant laquelle la valeur prédite est comparée à la donnée réelle via une fonction de perte), une rétropropagation (durant laquelle l'erreur est propagée en sens inverse à travers le réseau pour calculer les gradients des poids par rapport à la fonction de perte) et une mise à jour des poids (durant laquelle ces derniers sont ajustés en fonction des gradients calculés).

Une fois le gradient ∇θJ(θ) calculé, l'équation de mise à jour permet d'ajuster les paramètres θ à chaque itération de la descente de gradient :

```
θ := θ − η·∇θJ(θ)                                        (4.1)
```

où η est le taux d'apprentissage, c'est-à-dire le facteur de multiplication du vecteur gradient pour fixer le pas de progression. Ce processus de mise à jour est appliqué de manière itérative à chaque couche du réseau et répété sur plusieurs itérations, jusqu'à ce que la fonction de perte atteigne un optimum satisfaisant ou qu'un critère d'arrêt prédéfini soit satisfait.

Plus le réseau est profond, plus le nombre d'opérations à effectuer augmente, ce qui peut substantiellement ralentir le processus d'optimisation et le rendre inefficace. Dans ce contexte, il devient important de recourir à des algorithmes d'optimisation plus sophistiqués que la simple descente de gradient, afin d'accélérer la convergence et de tirer pleinement parti de la puissance de modélisation des architectures profondes.

Dans cette section, nous présentons plusieurs méthodes d'optimisation couramment utilisées, telles que la descente de gradient avec inertie (*momentum*), le gradient accéléré de Nesterov, AdaGrad, ainsi que les algorithmes adaptatifs Adam et Nadam.

### 4.2.1 Optimisation avec inertie (momentum)

*Figure 4.9 — Comparaison visuelle de la descente de gradient standard (a) et de la descente de gradient avec momentum (b) (figure non reproduite).* Les lignes de niveau (courbes reliant les points de l'espace (x, y) pour lesquels la valeur de la fonction J(x, y) est constante) permettent de visualiser le relief de la fonction de coût : plus elles sont rapprochées, plus la pente est localement forte. Les flèches indiquent la direction du gradient local, représentant le chemin que l'algorithme de descente de gradient devrait idéalement emprunter pour atteindre le minimum.

La figure 4.9 (a) représente la descente de gradient standard : la progression vers le minimum est régulière mais relativement lente, car les pas d'apprentissage sont constants et ne tiennent pas compte de la géométrie locale du paysage de la fonction. La figure 4.9 (b) montre la descente de gradient avec momentum : la trajectoire correspond à une version améliorée de la descente, intégrant une inertie via un vecteur vitesse qui accumule les directions précédentes du gradient, ce qui permet une optimisation plus rapide et plus fluide, les points convergeant plus directement vers le minimum et en moins d'itérations.

Pour une fonction de coût simple, le momentum permet une convergence initiale beaucoup plus rapide, mais peut aussi introduire un risque de dépassement du minimum et l'apparition d'oscillations avant la stabilisation. Le choix entre le gradient standard et le gradient avec momentum dépend des exigences spécifiques du problème, comme la vitesse de convergence souhaitée et la tolérance aux oscillations.

> **Pour aller plus loin.** L'article « Some Methods of Speeding Up the Convergence of Iteration Methods » de Boris T. Polyak, publié en 1964, est une contribution majeure dans le domaine de l'optimisation numérique et reste une référence incontournable pour des méthodes encore largement utilisées aujourd'hui.

### 4.2.2 Gradient accéléré de Nesterov

Le gradient accéléré de Nesterov (*Nesterov Accelerated Gradient*, NAG) est une variante du momentum qui anticipe la mise à jour des paramètres en calculant le gradient non pas à l'endroit actuel, mais à l'endroit où les paramètres seraient après l'application du momentum. Cela permet une correction plus fine de la trajectoire.

```
v_t = γ·v_{t-1} − η·∇θJ(θ_{t-1} + γ·v_{t-1})              (4.4)
θ_t = θ_{t-1} + v_t                                        (4.5)
```
*(équations retranscrites depuis l'OCR)*

où η est le taux d'apprentissage, γ (0 < γ < 1) est le coefficient d'inertie qui contrôle la contribution du momentum précédent (une valeur proche de 1 augmente l'effet de l'inertie), et v_t est la vitesse, qui accumule l'inertie des mises à jour précédentes.

En résumé, le momentum classique calcule le gradient au point actuel θ_{t-1} et applique l'inertie après la mise à jour, alors que Nesterov anticipe d'abord la prochaine position θ_{t-1} + γ·v_{t-1} avant de calculer le gradient, ce qui permet de corriger la trajectoire avant qu'une mauvaise direction ne soit prise. Concrètement, cela permet de réduire les oscillations dans la trajectoire de descente.

> **Pour aller plus loin.** L'article « A Method for Unconstrained Convex Minimization Problem with the Rate of Convergence O(1/k²) », publié en 1983 par Yurii Nesterov, marque une avancée significative dans le domaine de l'optimisation convexe et a influencé de nombreuses recherches en optimisation et en apprentissage automatique, notamment le NAG, Adam et Nadam.

### 4.2.3 Algorithme du gradient adaptatif (AdaGrad)

L'algorithme de gradient adaptatif (*Adaptive Gradient Algorithm*, AdaGrad) adapte le taux d'apprentissage pour chaque paramètre θᵢ du vecteur de paramètres θ individuellement, en fonction de l'historique des gradients appliqués à ce paramètre. Ainsi, les paramètres rarement mis à jour ont un taux d'apprentissage plus élevé, tandis que ceux fréquemment mis à jour voient leur taux d'apprentissage diminuer.

L'idée centrale est de cumuler, pour chaque paramètre, la somme des carrés de ses gradients (notée s_t, initialisée à s₀ = 0) afin d'ajuster individuellement le pas de mise à jour. À chaque itération, la mise à jour des paramètres θ se fait selon :

```
θ_t = θ_{t-1} − (η / √(s_t + ε)) · g_t                     (4.6)
```
*(équation retranscrite depuis l'OCR)*

où g_t = ∇θJ(θ) à l'itération t, η est le taux d'apprentissage initial et ε ≈ 10⁻⁸ est une petite constante ajoutée pour éviter la division par zéro.

AdaGrad est particulièrement efficace pour les problèmes avec données parcimonieuses (*sparse*), notamment en traitement du langage naturel (NLP), où certaines caractéristiques, telles que les mots rares, apparaissent peu fréquemment. Ces paramètres étant moins sollicités, leur taux d'apprentissage reste relativement élevé, favorisant leur apprentissage. Inversement, les paramètres souvent mis à jour voient leur taux d'apprentissage décroître, ce qui stabilise la convergence.

> **Pour aller plus loin.** L'article « Adaptive Subgradient Methods for Online Learning and Stochastic Optimization » introduit l'algorithme AdaGrad et démontre qu'il assure une convergence optimale dans les scénarios convexes, en réduisant efficacement la variance des gradients et en favorisant un apprentissage plus stable.

### 4.2.4 Estimation adaptative du moment (Adam)

L'estimation adaptative du moment (*Adaptive Moment Estimation*, Adam) est une méthode d'optimisation avancée qui combine les idées de Momentum et d'AdaGrad. Elle utilise des estimations mobiles des moments du premier ordre (la moyenne des gradients) et du second ordre (la variance des gradients), et est adaptée aux problèmes avec de grands ensembles de données ou des paramètres très dispersés. La méthode Adam se réalise en plusieurs étapes :

1. **Calcul du premier moment** m_t = β₁·m_{t-1} + (1 − β₁)·∇θJ(θ) (4.7), où β₁ ∈ [0,1] est le facteur de pondération pour la moyenne des gradients (typiquement β₁ = 0,9). Cette équation crée un effet de momentum, en lissant les gradients pour réduire les oscillations et stabiliser l'apprentissage.
2. **Calcul du second moment** v_t = β₂·v_{t-1} + (1 − β₂)·(∇θJ(θ))² (4.8), où β₂ ∈ [0,1] est le facteur de pondération pour cette moyenne (typiquement β₂ = 0,999). Cette équation calcule une approximation de la variance des gradients, ce qui permet d'adapter le pas d'apprentissage pour chaque paramètre.
3. **Correction des biais** pour les moments m̂_t et v̂_t (4.9), afin d'éviter des mises à jour trop faibles causées par les biais initiaux, surtout au début de l'entraînement lorsque t est petit (m_t tend alors vers zéro).
4. **Mise à jour des paramètres** θ_t = θ_{t-1} − (η / (√v̂_t + ε))·m̂_t (4.10), où η est le taux d'apprentissage global (typiquement η = 0,001) et ε ≈ 10⁻⁸ un petit terme ajouté pour éviter la division par zéro. Ainsi, les mises à jour sont adaptatives puisque les paramètres ayant de grandes variations dans les gradients ont un pas d'apprentissage réduit.

*(équations retranscrites depuis l'OCR, notation d'origine partiellement dégradée)*

> **Pour aller plus loin.** L'article « Adam: A Method for Stochastic Optimization » introduit l'algorithme Adam et détaille son efficacité dans le contexte de l'optimisation stochastique, combinant les avantages du gradient adaptatif et de l'inertie pour assurer une convergence rapide et stable.

**Exemple 4.6.** Les optimiseurs SGD, AdaGrad, Adam et Nadam sont déjà implémentés dans TensorFlow/Keras et leur utilisation est simple et directe (extrait de code 4.6).

```python
# Extrait de code 4.6 - Les optimiseurs SGD, Adagrad, Adam et Nadam.
from tensorflow.keras.optimizers import SGD, Adagrad, Adam, Nadam

# Optimiseur avec Momentum (Inertie)
optimizer = SGD(learning_rate=0.001, momentum=0.9)

# Optimiseur avec Nesterov Accelerated Gradient
optimizer = SGD(learning_rate=0.001, momentum=0.9, nesterov=True)

# Optimiseur AdaGrad
optimizer = Adagrad(learning_rate=0.001)

# Optimiseur Adam
optimizer = Adam(learning_rate=0.001)

# Optimiseur Nadam
optimizer = Nadam(learning_rate=0.001)
```

Outre ces méthodes couramment utilisées, d'autres algorithmes existent et peuvent être adaptés selon les besoins spécifiques des modèles. Par exemple, RMSprop ajuste dynamiquement le taux d'apprentissage en fonction des gradients récents, ce qui le rend efficace pour les problèmes non stationnaires. L'optimiseur L-BFGS, basé sur des méthodes quasi-newtoniennes, est souvent privilégié pour les petits ensembles de données nécessitant une convergence rapide et stable. Nadam combine les avantages d'Adam et du gradient accéléré de Nesterov, ce qui lui permet d'améliorer la convergence en réduisant les oscillations.

## 4.3 Besoin de grande quantité de données

Les réseaux de neurones profonds, caractérisés par de nombreuses couches et un grand nombre de paramètres, nécessitent généralement d'importantes quantités de données pour s'entraîner efficacement, afin d'ajuster les paramètres de manière optimale tout en réduisant les risques de surapprentissage. Lorsque le jeu de données est de dimension insuffisante, plusieurs stratégies peuvent être mises en place, parmi lesquelles :

- Le **transfert d'apprentissage**, qui repose sur l'utilisation de modèles préentraînés afin de réutiliser les représentations et connaissances acquises à partir d'un jeu de données source, généralement issu d'une tâche connexe (section 4.3.1).
- L'**augmentation de données**, qui consiste à générer automatiquement des variantes des exemples existants dans le but d'accroître la diversité du jeu d'entraînement (section 4.3.2).
- La **génération de données synthétiques**, qui permet de créer de nouveaux échantillons artificiels pour compléter les données réelles, notamment à l'aide de modèles génératifs (introduite à la section 4.3.3 et détaillée au chapitre 7).

> **Note.** Un jeu de données est dit de dimension insuffisante lorsqu'il ne contient pas un nombre d'exemples suffisant pour permettre l'apprentissage fiable des paramètres du modèle, sans surapprentissage. Une règle empirique souvent utilisée consiste à exiger un rapport d'au moins 10:1 entre le nombre d'exemples d'entraînement et le nombre total de paramètres du modèle. Ce ratio peut cependant être assoupli grâce à des techniques de régularisation. Par exemple, un réseau convolutionnel comportant un million de paramètres nécessiterait idéalement au moins dix millions d'exemples pour un entraînement efficace, sauf s'il bénéficie d'un pré-entraînement ou de données enrichies par augmentation.

### 4.3.1 Transfert d'apprentissage

Le transfert d'apprentissage est une technique d'apprentissage machine où un modèle préentraîné sur une tâche source avec un grand ensemble de données est réutilisé et adapté pour une tâche cible où les données disponibles sont limitées. Au lieu de former un modèle « à partir de zéro », les représentations apprises sur la tâche source sont transférées à la tâche cible (figure 4.10, *figure non reproduite*).

> **Pour aller plus loin.** L'article « A Survey on Transfer Learning » est une référence fondamentale dans le domaine, offrant une analyse approfondie des différentes approches. Bien que datant de 2010, il reste largement cité et pertinent.

**1. Apport du transfert d'apprentissage.** Le transfert d'apprentissage constitue une approche particulièrement efficace pour traiter des problèmes où les données sont limitées, en tirant parti des connaissances acquises à partir d'un modèle préentraîné sur un jeu de données plus vaste et représentatif. Il offre plusieurs avantages : un gain de temps (réduction du temps nécessaire pour former un nouveau modèle), une amélioration des performances (grâce à des caractéristiques déjà apprises sur de grandes quantités de données — figure 4.11, *figure non reproduite*) et une flexibilité accrue (adaptabilité à une variété de tâches).

**2. Catégories du transfert d'apprentissage.** L'apprentissage par transfert se décline en trois catégories principales :

- **Apprentissage par transfert inductif** : les tâches source et cible sont différentes, mais les domaines peuvent être les mêmes ou différents. Par exemple, un modèle préentraîné pour la reconnaissance d'images de chats et de chiens (tâche source) peut être utilisé pour améliorer la reconnaissance d'images de voitures et de camions (tâche cible).
- **Apprentissage par transfert transductif** : les tâches source et cible sont les mêmes, mais les domaines diffèrent. Par exemple, adapter un modèle de classification de texte entraîné sur des articles en anglais pour qu'il fonctionne sur des articles en français.
- **Apprentissage par transfert non supervisé** : utilisé lorsque les données de la tâche cible ne sont pas étiquetées. Par exemple, utiliser un modèle de détection de fraude bancaire entraîné sur des transactions étiquetées pour détecter des fraudes dans un nouveau jeu de données non étiqueté.

> **Terminologie.** *Tâche source* : la tâche initiale sur laquelle un modèle est entraîné, disposant généralement d'un grand ensemble de données étiquetées. *Tâche cible* : la nouvelle tâche pour laquelle on veut améliorer les performances en utilisant les connaissances de la tâche source. *Domaine source* / *domaine cible* : l'ensemble des données et le contexte associés respectivement à la tâche source et à la tâche cible.

La **similarité de tâches**, c'est-à-dire le degré de ressemblance entre la tâche source et la tâche cible, s'évalue selon : les caractéristiques des données (distributions statistiques et modalités d'acquisition comparables — par exemple, un modèle préentraîné sur des images IRM sera plus aisément transférable à une autre tâche impliquant des images IRM qu'à une tâche exploitant des images rayon X) ; les relations entre variables d'entrée et de sortie (un modèle entraîné à distinguer chiens et chats sera plus facilement adapté à d'autres mammifères) ; et le type de problème (une compatibilité entre classification, régression, segmentation, etc. favorise un transfert efficace).

**3. Étapes du transfert d'apprentissage.** Selon la relation entre tâche source et tâche cible, l'adaptation peut impliquer un ajustement des paramètres du modèle (transfert inductif), une généralisation à une distribution différente sans modifier la tâche (transfert transductif), ou une extraction de représentations utiles dans un cadre non supervisé. Le transfert d'apprentissage suit généralement six étapes, principalement pour le transfert inductif (figure 4.12, *figure non reproduite*) :

1. **Sélection du modèle préentraîné**, adapté à la tâche cible en fonction de sa similarité avec la tâche d'origine. En vision par ordinateur, des modèles comme ResNet et VGG sont souvent utilisés ; pour le traitement du langage naturel, des architectures comme BERT, GPT ou T5 ; en reconnaissance vocale et audio, des modèles comme DeepSpeech ou Wav2Vec.
2. **Suppression ou modification des couches de sortie**, car la plupart des modèles préentraînés sont conçus pour une tâche spécifique (par exemple 1 000 classes pour ImageNet). La couche de sortie doit être remplacée pour correspondre au nombre de classes de la nouvelle tâche.
3. **Gel des premières couches**, pour préserver les caractéristiques génériques déjà apprises (textures et bords dans les images, syntaxe et structure dans le texte), accélérer l'entraînement et réduire le risque de surajustement. Si la tâche cible diffère significativement de la tâche d'origine, il peut être préférable de ne pas geler ces couches et d'opter pour un entraînement complet. L'importance du gel des premières couches sera plus claire à l'issue du chapitre 5.
4. **Ajout de nouvelles couches**, adaptées à la tâche cible, une fois les couches inutiles supprimées et les couches préentraînées gelées.
5. **Entraînement et réglage des hyperparamètres**, généralement en deux étapes : d'abord seules les nouvelles couches sont entraînées pendant que le reste du modèle préentraîné reste figé, puis certaines couches du modèle d'origine peuvent être progressivement dégelées et ajustées.

> **Note.** *Couches réutilisables* : les couches du modèle préentraîné conservées pour la nouvelle tâche, qu'elles soient gelées ou non. *Couches gelées* : des couches réutilisables dont les poids ne sont pas mis à jour pendant l'entraînement sur la nouvelle tâche. Toutes les couches gelées sont réutilisables, mais toutes les couches réutilisables ne sont pas forcément gelées ; certaines peuvent être dégelées progressivement pour un ajustement fin (*fine-tuning*).

**Exemple 4.7.** Cet exemple classe les données du jeu CIFAR-10 (60 000 images couleur 32×32 pixels réparties en 10 classes : avion, automobile, oiseau, chat, cerf, chien, grenouille, cheval, bateau, camion — figure 4.13, *figure non reproduite*), en comparant un perceptron multicouche (MLP) simple et un modèle reposant sur le transfert d'apprentissage à partir de l'architecture préentraînée VGG16.

```python
# Extrait de code 4.7 - Lecture et normalisation des données CIFAR.
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.datasets import cifar10

# Charger le jeu de données CIFAR-10
(x_train, y_train), (x_test, y_test) = cifar10.load_data()

# Normaliser les images (mise à l'échelle des pixels de 0-255 à [0, 1])
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Convertir les labels en représentation one-hot avec 10 classes
y_train = keras.utils.to_categorical(y_train, num_classes=10)
y_test = keras.utils.to_categorical(y_test, num_classes=10)
```

La fonction retourne des couples (x_train, y_train) et (x_test, y_test). Chaque étiquette y est un entier de 0 à 9 correspondant aux dix classes. Avant l'apprentissage, les données sont normalisées en divisant les valeurs de pixels par 255 afin d'obtenir un domaine [0,1]. Les étiquettes sont ensuite transformées par encodage one-hot, adapté à l'utilisation de la fonction de perte `categorical_crossentropy` dans Keras.

Le modèle MLP développé est séquentiel, avec une couche d'aplatissement en entrée, une couche dense de 128 neurones (activation ReLU) et une couche de sortie dense de 10 neurones (activation softmax) :

```python
# Extrait de code 4.8 - Définition de l'architecture d'un MLP simple entraîné
# sur les images originales du jeu de données CIFAR.
model_mlp = keras.Sequential([
    Flatten(input_shape=(32, 32, 3)),
    Dense(128, activation="relu"),
    Dense(10, activation="softmax")],
    name="MLP_Images32x32")

# Compiler le modèle
model_mlp.compile(optimizer=Adam(),
                   loss="categorical_crossentropy",
                   metrics=["accuracy"])

model_mlp.summary()
```

```
Model: "MLP_Images32x32"
 Layer (type)               Output Shape        Param #
 flatten_6 (Flatten)        (None, 3072)         0
 dense_12 (Dense)           (None, 128)          393 344
 dense_13 (Dense)           (None, 10)           1 290
Total params: 394 634 (1,51 Mo)
Trainable params: 394 634 (1,51 Mo)
Non-trainable params: 0 (0,00 Mo)
```

Le modèle MLP_Images32x32 comprend 394 634 paramètres, tous entraînables.

On procède ensuite au transfert d'apprentissage via un modèle préentraîné sur ImageNet (plus de 14 millions d'images annotées, réparties en 1 000 classes) que l'on affine pour la tâche cible CIFAR-10. Il s'agit d'un transfert d'apprentissage inductif : la tâche cible diffère de la tâche source, bien que les domaines puissent être similaires.

Avant de procéder au transfert, une opération de redimensionnement des données est requise : les images CIFAR-10 sont de taille 32×32×3, alors que VGG16 attend en entrée des images de taille 224×224×3.

```python
# Extrait de code 4.9 - Redimensionner les images pour VGG16 (224x224).
x_train_resized = tf.image.resize(x_train, [224, 224])
x_test_resized = tf.image.resize(x_test, [224, 224])
```

```
Forme des données d'entraînement après redimensionnement : (50000, 224, 224, 3)
Forme des données de test après redimensionnement : (10000, 224, 224, 3)
```

> **Note.** En transfert d'apprentissage, il est fréquent que les données issues des domaines source et cible présentent des différences significatives, notamment en ce qui concerne la taille des images. Ce décalage de dimensions nécessite un ajustement essentiel pour garantir la compatibilité structurelle. Deux approches sont envisageables : redimensionner les images d'entrée à la taille attendue par le modèle (au risque d'une perte d'information ou de l'apparition d'artefacts) ; ou adapter l'architecture du réseau pour qu'elle accepte les dimensions originales, ce qui est plus complexe mais envisageable avec des modèles flexibles comme MobileNet ou EfficientNet. En pratique, la stratégie la plus couramment adoptée consiste à conserver la structure du modèle source inchangée (en particulier ses couches convolutives), à geler ses poids, et à ajouter une nouvelle tête de classification adaptée à la tâche cible.

Le transfert d'apprentissage débute par le chargement du modèle VGG16 préentraîné sur ImageNet, en excluant sa couche finale de classification grâce au paramètre `include_top=False`, ce qui permet de ne conserver que les couches convolutives préentraînées, qui extraient des descripteurs visuels génériques. Le paramètre `input_shape=(224, 224, 3)` précise la taille attendue des images d'entrée. Toutes les couches du modèle VGG16 sont ensuite gelées afin de conserver les poids appris sur ImageNet (`layer.trainable = False`).

> **Note.** Le choix des couches à geler ou à réentraîner dépend du degré de similarité entre la tâche d'origine et la tâche cible. Lorsque la tâche cible est très similaire, il est possible de conserver la majorité des couches préentraînées et de ne remplacer que la couche de sortie. Pour des tâches modérément similaires (par exemple, analyse de sentiments sur des critiques de films puis sur des avis de produits), il est préférable de geler les premières couches et d'adapter les couches supérieures. Pour des tâches très différentes, un réajustement plus étendu, voire un réentraînement complet, est généralement nécessaire.

Le modèle `base_model` est instancié à partir de VGG16 sans sa tête de classification finale, et attend en entrée des images 224×224×3. La sortie du dernier bloc convolutif (tenseur 7×7×512) est aplatie via une couche `Flatten()` en un vecteur de taille 7×7×512 = 25 088, afin d'être compatible avec des couches entièrement connectées. Un perceptron multicouche est ensuite ajouté : une couche dense de 128 neurones (ReLU), suivie d'une couche de sortie dense de 10 neurones (softmax), adaptée à la classification à 10 classes de CIFAR-10.

```python
# Extrait de code 4.10 - Modèle de transfert d'apprentissage basé sur VGG16
# pour la classification d'images CIFAR-10.
from tensorflow.keras.applications import VGG16
from tensorflow.keras import layers, models

# Charger le modèle VGG16 préentraîné sur ImageNet, sans les couches de
# classification finales (top)
base_model = VGG16(weights="imagenet",
                    include_top=False,
                    input_shape=(224, 224, 3))

# Geler les couches convolutionnelles du modèle de base pour préserver les
# poids préentraînés
for layer in base_model.layers:
    layer.trainable = False

# Extraire la sortie du modèle de base et l'aplatir pour la connecter à un MLP
output_base_model = base_model.output
flatten_layer = layers.Flatten()(output_base_model)

# Ajouter un perceptron multicouche
dense_1 = layers.Dense(128, activation="relu")(flatten_layer)
output_layer = layers.Dense(10, activation="softmax")(dense_1)

# Construire le modèle complet en combinant VGG16 et le nouveau MLP
model_transfer = models.Model(inputs=base_model.input, outputs=output_layer,
                               name="VGG16")

# Compiler le modèle de transfert
model_transfer.compile(optimizer=Adam(),
                        loss="categorical_crossentropy",
                        metrics=["accuracy"])

model_transfer.summary()
```

```
Model: "VGG16"
 Layer (type)                 Output Shape           Param #
 input_layer_3 (InputLayer)   (None, 224, 224, 3)     0
 block1_conv1 (Conv2D)        (None, 224, 224, 64)    1 792
 ...
 flatten_3 (Flatten)          (None, 25088)           0
 dense_6 (Dense)              (None, 128)             3 211 392
 dense_7 (Dense)              (None, 10)              1 290
Total params: 17 927 370 (68,39 Mo)
Trainable params: 3 212 682 (12,26 Mo)
Non-trainable params: 14 714 688 (56,13 Mo)
```

Le modèle obtenu comporte 17 927 370 paramètres au total. Parmi eux, 3 212 682 sont entraînables — ceux des couches Dense ajoutées en sortie, apprises sur les nouvelles données CIFAR-10. Les 14 714 688 paramètres restants (ceux de VGG16) ne sont pas entraînables, car gelés (`layer.trainable = False`), ce qui permet de préserver les représentations visuelles complexes apprises lors de l'entraînement initial sur ImageNet. Cette approche présente plusieurs avantages : réduction considérable du temps d'entraînement et des besoins en données annotées, préservation des connaissances acquises sur ImageNet, et possibilité d'adapter rapidement le modèle à une tâche spécifique.

### 4.3.2 Augmentation des données

L'augmentation des données est une technique utilisée pour générer de nouvelles données à partir de données existantes, en appliquant diverses transformations aux données d'origine afin de créer de nouvelles variations tout en conservant leurs caractéristiques essentielles. Elle permet d'améliorer les performances des modèles d'apprentissage machine, en particulier pour les réseaux de neurones, et aide à éviter le surapprentissage lorsque les ensembles de données sont relativement petits. Les transformations appliquées doivent respecter la nature et les propriétés spécifiques du type de données utilisé.

**Augmentation de données pour les signaux.** L'ajout de bruit (*noise injection*) aléatoire au signal ; le décalage dans le temps (*time shifting*) ; la variation de la vitesse (*time stretching*) sans changer la fréquence ; la modification de la hauteur (*pitch shifting*) ; le masquage spectral (*spectral masking*) aléatoire sur le spectrogramme ; la réverbération, pour simuler différents environnements acoustiques ; et la modification de la fréquence d'échantillonnage.

**Augmentation de données pour les images.** La rotation ; la translation le long des axes X et Y ; le zoom (avant ou arrière) ; l'inversion horizontale/verticale (*flip*) ; la modification de la luminosité/du contraste ; le découpage (*cropping*) avec redimensionnement ; l'ajout de bruit ; l'augmentation géométrique (rotation, mise à l'échelle, cisaillement) ; et le flou gaussien. La figure 4.14 *(figure non reproduite)* illustre plusieurs de ces transformations appliquées à une image de CIFAR-10 : rotation et zoom, décalage horizontal et inversion, transformation en cisaillement et décalage vertical, rotation légère et zoom, inversion horizontale.

**Augmentation de données pour les vidéos.** Le découpage et redimensionnement (*cropping/rescaling*) ; la rotation spatiale de chaque cadre ; l'inversion temporelle (*temporal flip*) ; la modification de la fréquence d'images (*frame rate modification*) ; la perturbation temporelle du timing des cadres ; le zoom temporel (répétition ou omission de cadres) ; le masquage de cadres (*frame masking*) ; et la distorsion spatiale ou temporelle des cadres.

Cette liste n'est pas exhaustive et pourrait certainement être enrichie pour inclure d'autres transformations spécifiques à d'autres types de données.

**Exemple 4.8.** Cet exemple entraîne un réseau de neurones profond sur CIFAR, en comparant les performances avec et sans augmentation des données. Le modèle `model_no_aug` est entraîné directement sur les données d'entraînement ; le modèle `model_with_aug` est entraîné sur des données augmentées générées dynamiquement par `ImageDataGenerator` (rotation aléatoire jusqu'à 20°, décalage horizontal aléatoire jusqu'à 20 % de la largeur, flip horizontal).

```python
# Extrait de code 4.11 - Entraînement du modèle sans et avec augmentation des données.
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Entraînement sans augmentation des données
model_no_aug = create_model()
history_no_aug = model_no_aug.fit(x_train, y_train,
                                   epochs=100,
                                   batch_size=64,
                                   validation_data=(x_test, y_test),
                                   verbose=2)

# Entraînement avec augmentation des données
datagen = ImageDataGenerator(rotation_range=20,
                              width_shift_range=0.2,
                              height_shift_range=0.2,
                              horizontal_flip=True,
                              zoom_range=0.15)
datagen.fit(x_train)

model_with_aug = create_model()
history_with_aug = model_with_aug.fit(datagen.flow(x_train, y_train,
                                       batch_size=64, seed=42),
                                       epochs=100,
                                       validation_data=(x_test, y_test),
                                       verbose=2)
```

Les figures 4.15 (a) et (b) *(figures non reproduites)* comparent les courbes de perte obtenues sans et avec augmentation. Sans augmentation, la perte d'entraînement diminue progressivement, mais la perte de validation, après une diminution initiale, se stabilise ou augmente légèrement, signalant un potentiel surapprentissage (voir section 4.4). Avec augmentation, la perte d'entraînement diminue plus lentement (en raison de la complexité ajoutée), tandis que la perte de validation reste stable et suit une tendance similaire à celle de l'entraînement, avec moins de divergence.

### 4.3.3 Synthèse de données artificielles

La synthèse de données artificielles est une approche de plus en plus exploitée pour pallier le manque de données réelles dans l'entraînement des réseaux de neurones profonds. Elle repose sur la génération d'exemples réalistes à l'aide de modèles probabilistes, de simulations numériques, ou de techniques avancées d'apprentissage automatique, telles que les réseaux génératifs antagonistes (GAN). Ce sujet fera l'objet d'une analyse approfondie au chapitre 7 (modèles génératifs). La synthèse de données joue un rôle clé dans des domaines où l'acquisition de données est coûteuse, complexe ou soumise à des restrictions légales (santé, vision par ordinateur, cybersécurité). Elle permet aussi d'équilibrer des ensembles de données biaisés, renforçant la robustesse et la généralisation des modèles.

Malgré ses avantages, elle soulève plusieurs défis : qualité et fidélité des données générées, risque d'amplification des biais inhérents aux jeux de données d'origine, considérations éthiques et réglementaires.

## 4.4 Surapprentissage

L'un des problèmes majeurs pouvant survenir lors de l'entraînement de réseaux de neurones profonds est le surapprentissage (*overfitting*). Ce phénomène se produit lorsque le modèle s'ajuste excessivement aux données d'entraînement, capturant des motifs spécifiques (voire du bruit) plutôt que des tendances générales. En conséquence, bien que le modèle puisse afficher une excellente performance sur l'ensemble d'entraînement, il perd en capacité de généralisation, ce qui nuit à ses performances sur de nouvelles données (baisse des performances sur l'ensemble de test).

Plusieurs techniques ont été proposées pour prévenir le surapprentissage, notamment l'arrêt prématuré (surveillance des performances sur un ensemble de validation, avec interruption de l'entraînement dès dégradation) et la régularisation (ajout d'un terme de pénalité à la fonction de coût, dépendant des paramètres θ, pour limiter leur amplitude).

### 4.4.1 Arrêt précoce

L'arrêt précoce ou prématuré (*early stopping*) est une technique qui consiste à surveiller les performances du réseau de neurones sur un ensemble de validation au cours de l'entraînement. Lorsque ces performances commencent à se détériorer, indiquant un surapprentissage, l'entraînement est interrompu afin d'empêcher le modèle de s'adapter excessivement aux détails et au bruit présents dans les données d'entraînement.

**Exemple 4.9.** L'ajout d'un arrêt précoce aux étapes décrites précédemment se fait via la fonction `EarlyStopping`, qui interrompt l'entraînement si les performances sur les données de validation stagnent ou se détériorent selon les critères spécifiés. Le paramètre `patience` définit le nombre d'époques supplémentaires à attendre après la dernière amélioration de la métrique avant d'arrêter l'entraînement.

> **Note.** Le choix du paramètre `patience` dépend du jeu de données, de la complexité du modèle et du nombre d'époques prévues. Une patience trop faible risque d'interrompre l'entraînement trop tôt ; une patience trop élevée peut prolonger inutilement l'entraînement et augmenter le risque de surapprentissage. Pour un petit jeu de données, une patience faible (3 à 5 époques) est recommandée ; pour un grand jeu de données, une patience plus élevée (10 à 20 époques) est préférable.

```python
# Extrait de code 4.12 - Arrêt précoce.
from keras.callbacks import EarlyStopping

# Définir l'early stopping
early_stopping = EarlyStopping(monitor='val_loss',
                                patience=10,
                                restore_best_weights=True)

# Entraînement avec l'ajout de early stopping
model_early_stop = create_model()
history_early_stop = model_early_stop.fit(x_train, y_train,
                                           batch_size=64,
                                           epochs=100,
                                           validation_data=(x_test, y_test),
                                           callbacks=[early_stopping],
                                           verbose=2)
```

La figure 4.16 *(figure non reproduite)* montre les courbes d'apprentissage du modèle : au début de l'entraînement (les 10 premières époques), les pertes d'entraînement et de validation diminuent ensemble, signe que le modèle généralise encore bien. À partir de 10 époques, la perte d'entraînement continue de diminuer tandis que la perte de validation stagne, voire augmente — signe classique de surapprentissage. L'activation de l'arrêt anticipé permet alors d'éviter un surajustement, sur la base de l'observation que la perte de validation ne s'améliore plus depuis un nombre d'époques défini par le critère `patience`.

### 4.4.2 Régularisation

La régularisation est un ensemble de techniques utilisées en apprentissage machine et en optimisation mathématique pour éviter le surapprentissage et améliorer la généralisation des modèles sur des données nouvelles, en contrôlant la complexité du modèle. Cette section présente cinq méthodes couramment employées : la régularisation Ridge (L2), la régularisation Lasso (L1), la régularisation Elastic Net, la contrainte MaxNorm et le Dropout. Les trois premières reposent sur l'ajout d'un terme de pénalisation dans la fonction de coût, limitant l'amplitude des poids. Les deux dernières adoptent une logique différente : MaxNorm agit directement sur la mise à jour des paramètres en imposant une borne supérieure à leur norme, et le Dropout modifie la structure même du modèle en désactivant aléatoirement certains neurones pendant l'entraînement.

> **Rappel — normes.** La norme L1 (norme de Manhattan, ou norme absolue) d'un vecteur v = [v₁, ..., vₙ] est la somme des valeurs absolues de ses composantes : ‖v‖₁ = Σ|vᵢ|. La norme L2 (norme euclidienne) mesure la distance la plus courte entre deux points : ‖v‖₂ = √(Σvᵢ²). La norme Lk (norme p-généralisée) généralise L1 et L2 en utilisant une puissance k : ‖v‖ₖ = (Σ|vᵢ|ᵏ)^(1/k). Plus k est grand, plus la norme met l'accent sur les composantes de valeurs élevées.

**Régularisation L2 (Ridge).** Elle ajoute un terme de régularisation à la fonction de coût pour éviter le surajustement en pénalisant les grandes valeurs des coefficients, proportionnellement à la norme euclidienne (L2) des paramètres θ :

```
R(θ) = (1/2) · Σ θⱼ²                                        (4.11)
J_reg(θ) = J(θ) + λ · Σ θⱼ²                                 (4.12)
```
*(équations retranscrites depuis l'OCR)*

où λ est le coefficient de régularisation (si λ = 0, pas de régularisation ; plus λ est grand, plus les grands coefficients sont pénalisés) et p le nombre total de paramètres θⱼ du modèle. La régularisation L2 vise à réduire les valeurs des paramètres sans les rendre exactement nuls, réduisant ainsi la variance du modèle.

> **Pour aller plus loin.** Dans l'article « Ridge Regression: Biased Estimation for Nonorthogonal Problems », publié en 1970 par Arthur Hoerl et Robert Kennard, les auteurs introduisent la régression Ridge comme solution aux problèmes de colinéarité dans les modèles de régression linéaire.

**Régularisation L1 (Lasso).** Elle applique une pénalisation basée sur la valeur absolue des poids :

```
R(θ) = λ · Σ |θⱼ|                                           (4.13)
J_reg(θ) = J(θ) + λ · Σ |θⱼ|                                (4.14)
```
*(équations retranscrites depuis l'OCR)*

Ce terme pénalise les grandes valeurs des paramètres, tout comme L2, mais a une propriété importante supplémentaire : il pousse certains paramètres à être exactement égaux à zéro. Ainsi, L1 favorise la sparsité des paramètres et permet de sélectionner les caractéristiques les plus importantes — L1 fait à la fois régularisation et sélection de variables.

> **Pour aller plus loin.** Dans l'article « Regression Shrinkage and Selection via the Lasso », publié en 1996, Robert Tibshirani introduit la régularisation Lasso, qui contraint la somme des valeurs absolues des coefficients, conduisant naturellement à la sélection de variables.

**Exemple 4.10.**

```python
# Extrait de code 4.13 - Régularisation L1.
from tensorflow.keras.regularizers import l1

model = Sequential()
model.add(Dense(64, activation='relu',
                 input_shape=(input_dim,),
                 kernel_regularizer=l1(0.01)))
```

**Elastic Net.** Elle combine les régularisations L1 et L2, offrant un bon équilibre entre sélection de caractéristiques et stabilisation des poids :

```
R(θ) = λ₁ · Σ |θⱼ| + λ₂ · Σ θⱼ²                             
J_reg(θ) = J(θ) + λ₁ · Σ |θⱼ| + λ₂ · Σ θⱼ²                  (4.15)
```
*(équations retranscrites depuis l'OCR)*

où λ₁ et λ₂ sont des hyperparamètres contrôlant la proportion de chaque régularisation. Elastic Net est particulièrement utile lorsque les données présentent une forte corrélation entre variables, car L1 seul peut échouer dans ce cas, tandis que L2 seul pourrait inclure trop de variables non pertinentes.

> **Pour aller plus loin.** Dans l'article « Regularization and Variable Selection via the Elastic Net », publié en 2005, Hui Zou et Trevor Hastie introduisent Elastic Net pour résoudre certaines limitations de Lasso et Ridge, particulièrement efficace lorsque le nombre de variables explicatives dépasse le nombre d'observations.

**Exemple 4.11.**

```python
# Extrait de code 4.14 - Régularisation ElasticNet.
from tensorflow.keras.regularizers import l1_l2

model = Sequential()
model.add(Dense(64, activation='relu',
                 input_shape=(input_dim,),
                 kernel_regularizer=l1_l2(l1=0.01, l2=0.01)))
```

**Régularisation Max-Norm.** Contrairement à L1 et L2, qui ajoutent une pénalisation explicite dans la fonction de coût, MaxNorm agit directement lors de la mise à jour des paramètres, en imposant une borne supérieure à la norme des vecteurs de poids sortants de chaque neurone (ou couche) :

```
‖θ‖₂ = √(Σ θⱼ²)
Si ‖θ‖₂ > c, alors θ ← θ · c / max(c, ‖θ‖₂)                 (4.16-4.17)
```
*(équations retranscrites depuis l'OCR)*

où c est un hyperparamètre représentant la borne maximale autorisée pour la norme L2. En résumé, MaxNorm limite la complexité du modèle en contrôlant la norme des vecteurs de poids, empêchant certains neurones d'acquérir des poids excessivement élevés.

> **Pour aller plus loin.** Dans l'article « Rank, Trace-Norm and Max-Norm », publié en 2005, Nathan Srebro et Nati Shraibman introduisent la régularisation Max-Norm comme alternative pour promouvoir des solutions à faible rang dans les problèmes de filtrage collaboratif.

**Exemple 4.12.**

```python
# Extrait de code 4.15 - Régularisation MaxNorm.
from tensorflow.keras.constraints import MaxNorm

model = Sequential()
model.add(Dense(64, activation='relu',
                 input_shape=(input_dim,),
                 kernel_constraint=MaxNorm(max_value=3)))
```

**Dropout.** Le dropout est une technique de régularisation spécifique aux réseaux de neurones, qui consiste à ignorer aléatoirement, à chaque itération de l'entraînement, un sous-ensemble de neurones dans certaines couches du réseau, selon un taux de dropout p (figure 4.17, *figure non reproduite*). Il empêche les neurones individuels de devenir trop « spécialisés », forçant le réseau à répartir ses représentations sur un ensemble plus large de neurones, ce qui réduit le risque de surapprentissage. Après l'entraînement, le dropout est désactivé et l'intégralité du réseau est utilisée pour la prédiction.

**Exemple 4.13.**

```python
# Extrait de code 4.16 - Régularisation Dropout.
from tensorflow.keras.layers import Dropout

model = Sequential()
model.add(Dense(64, activation='relu', input_shape=(input_dim,)))
model.add(Dropout(0.5))
```

> **Pour aller plus loin.** Dans l'article « Dropout: A Simple Way to Prevent Neural Networks from Overfitting », publié en 2014, Nitish Srivastava, Geoffrey Hinton et al. introduisent le dropout comme solution efficace pour améliorer la généralisation des réseaux profonds, avec des résultats expérimentaux montrant une amélioration significative des performances en classification d'images et en reconnaissance de la parole.

**Exemple 4.14.** Ce dernier exemple applique la régularisation sur un ensemble de données synthétiques (jeu « moons » de `sklearn.datasets.make_moons`), souvent utilisé pour tester des algorithmes de classification.

```python
# Extrait de code 4.17 - Génération et prétraitement des données.
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Génération de données synthétiques (moons dataset)
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)

# Partition des données en entraînement et test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                      random_state=42)

# Normalisation
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

La figure 4.18 *(figure non reproduite)* montre que les données ne sont pas linéairement séparables : un simple modèle linéaire comme la régression logistique aura du mal à bien classifier les points sans transformations supplémentaires.

```python
# Extrait de code 4.18 - Définition des MLP (sans régularisation vs avec régularisation).
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2

def build_mlp(with_regularization=False):
    # Création d'un modèle séquentiel
    model = Sequential()

    # Définir la régularisation L2 si demandé
    if with_regularization:
        reg = l2(0.01)  # Ajout de L2
    else:
        reg = None  # Pas de régularisation

    # Première couche dense (64 neurones, ReLU) avec régularisation optionnelle
    model.add(Dense(64, activation="relu", input_shape=(2,),
                     kernel_regularizer=reg))

    # Si régularisation activée, ajouter un Dropout pour réduire le surapprentissage
    if with_regularization:
        model.add(Dropout(0.5))  # Dropout ajouté uniquement en régularisation

    # Deuxième couche dense (32 neurones, ReLU) avec régularisation
    model.add(Dense(32, activation="relu", kernel_regularizer=reg))

    # Ajouter Dropout si la régularisation est activée
    if with_regularization:
        model.add(Dropout(0.5))

    # Couche de sortie (1 neurone, sigmoïde) pour la classification binaire
    model.add(Dense(1, activation="sigmoid"))

    # Compilation du modèle
    model.compile(optimizer=Adam(learning_rate=0.01),
                   loss="binary_crossentropy",
                   metrics=["accuracy"])

    return model
```

Deux modèles MLP sont construits pour comparer les effets de la régularisation sur l'apprentissage : `model_overfit` (sans régularisation) et `model_regularized` (avec L2 et Dropout), tous deux entraînés sur les mêmes données pendant 500 époques, avec une taille de lot de 32 :

```python
# Extrait de code 4.19 - Création et entraînement du modèle.
# Création du modèle sans régularisation
model_overfit = build_mlp(with_regularization=False)

# Création du modèle avec régularisation L2 et Dropout
model_regularized = build_mlp(with_regularization=True)

# Entraînement des modèles
history_overfit = model_overfit.fit(X_train, y_train, epochs=500,
    batch_size=32, validation_data=(X_test, y_test), verbose=0)

history_regularized = model_regularized.fit(X_train, y_train, epochs=500,
    batch_size=32, validation_data=(X_test, y_test), verbose=0)
```

Les figures 4.19 à 4.21 *(figures non reproduites)* comparent l'évolution de la perte et de la précision pour les deux modèles. Sans régularisation, la perte diminue très rapidement et atteint une valeur très basse : le modèle apprend vite, mais peut aussi surapprendre. Avec régularisation, la perte commence plus haute, diminue plus lentement, et reste plus élevée et fluctuante, car L2 et Dropout imposent des contraintes aux poids et désactivent certains neurones. Pour la précision, le modèle sans régularisation atteint une meilleure précision sur l'entraînement, mais risque l'overfitting ; le modèle régularisé a une précision plus basse en entraînement, mais devrait mieux généraliser.

La comparaison des frontières de décision (figure 4.20) illustre cet effet : sans régularisation, la frontière de décision est très fine et rigide, traduisant des prédictions abruptes et une forte confiance — signe typique de surapprentissage. Avec régularisation, la zone de transition est plus large, avec des frontières plus douces et nuancées, révélant une incertitude mieux calibrée et une meilleure généralisation.

Enfin, la comparaison des courbes de perte train/test (figure 4.21) confirme ce constat : sans régularisation, la perte d'entraînement diminue rapidement vers des valeurs très basses, mais la perte de test devient instable avec des pics, signe d'overfitting, et l'écart entre les deux courbes s'accentue au fil des époques. Avec régularisation (L2 + Dropout), la perte d'entraînement reste plus élevée (la régularisation pénalisant les poids élevés et ralentissant l'apprentissage), mais la perte de test est plus stable et reste proche de la perte d'entraînement, suggérant une meilleure généralisation.

> **Note.** Pour choisir une régularisation adaptée, il est essentiel de tenir compte de la taille et de la complexité du modèle. Pour les petits modèles, où le risque de surapprentissage est relativement faible, une régularisation L2 est souvent suffisante. Pour les modèles profonds, plus susceptibles de surapprentissage, une combinaison de Dropout et de L2 est souvent nécessaire : le Dropout introduit une régularisation plus agressive en désactivant aléatoirement des neurones à chaque itération, forçant le réseau à apprendre des représentations plus robustes, tandis que L2 maintient les poids sous contrôle et évite des mises à jour trop brusques.

## Conclusion

Ce chapitre a exploré les principaux défis rencontrés dans l'entraînement des réseaux neuronaux profonds et les solutions développées pour y remédier : la disparition et l'explosion des gradients, les temps de calcul élevés, le besoin de grandes quantités de données, et le risque de surapprentissage.

Dans la première partie, le problème de la disparition et de l'explosion des gradients a été analysé, avec des techniques comme l'initialisation adaptée des poids, les fonctions d'activation appropriées, la normalisation par lots, et l'écrêtage des gradients pour stabiliser la propagation des gradients et accélérer la convergence.

La deuxième partie a mis en lumière l'impact du temps de calcul élevé, particulièrement critique dans les grands modèles : les algorithmes d'optimisation avancés (inertie, gradient accéléré de Nesterov, AdaGrad, Adam) réduisent le temps d'entraînement tout en maintenant des performances élevées.

Dans la troisième partie, le besoin de grandes quantités de données a été abordé, avec le transfert d'apprentissage et l'augmentation des données comme solutions pratiques pour maximiser l'efficacité des modèles tout en réduisant la dépendance à de nouveaux ensembles de données.

Enfin, le chapitre s'est penché sur le problème du surapprentissage, avec l'arrêt précoce et diverses formes de régularisation (dropout, pénalités L1/L2) comme outils pour limiter la complexité des modèles et améliorer leur robustesse.

Ce chapitre illustre que l'entraînement des réseaux neuronaux profonds repose sur un équilibre délicat entre la stabilisation des gradients, l'optimisation du temps de calcul, la gestion des données disponibles, et le contrôle de la complexité du modèle. Les méthodes décrites offrent un cadre solide pour relever ces défis, tout en ouvrant la voie pour aborder des architectures de plus en plus performantes, telles que décrites dans les prochains chapitres.

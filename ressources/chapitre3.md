---
id: livre-ap-ch3-reseaux-de-neurones-artificiels
type: chapter
scope: project
status: active
created: 2026-08-31
updated: 2026-08-31
owner: user
book: "Apprentissage profond — Théorie et applications"
book_slug: apprentissage-profond
author: "Neila Mezghani"
chapter: 3
source: ["chapters/03-ap3_260710_114248.md#L944-L2214"]
ocr_note: "Source scannée OCR (tesseract, qualité variable) ; nettoyage fidèle : dé-césure, suppression en-têtes/pieds de page répétés et bruit OCR non textuel ; aucun contenu inventé, aucune réécriture de fond"
language: fr
---

# Chapitre 3 — Réseaux de neurones artificiels

## 3.1 Historique des réseaux de neurones

Le test de Turing visait à déterminer si une machine pouvait simuler l'intelligence humaine à travers le langage.

En 1956, la conférence de Dartmouth, organisée par John McCarthy et Marvin Minsky, marque la naissance officielle de l'IA. Les premières approches sont surtout symboliques, fondées sur des règles logiques explicites. Mais en parallèle, émergent déjà des idées inspirées du cerveau humain, notamment les premiers modèles de réseaux de neurones artificiels.

En 1959, Arthur Samuel introduit le terme machine learning, en développant un programme jouant aux dames capable d'apprendre de ses parties, sans être entièrement programmé à l'avance. Ce concept jette les bases d'une IA plus adaptative, ouvrant la voie aux réseaux de neurones.

Un tournant décisif survient entre 1986 et 1990 avec la redécouverte et la formalisation de l'algorithme de rétropropagation du gradient par Rumelhart, Hinton et Williams. Cette avancée méthodologique a rendu possible l'entraînement efficace des réseaux de neurones multicouches, établissant ainsi les fondements du paradigme connexionniste moderne.

Toutefois, cette période est également caractérisée par un enthousiasme excessif par rapport aux performances réellement observées des réseaux de neurones, dues aux contraintes matérielles de l'époque et à la faible disponibilité de données d'entraînement. Ces limitations ont conduit à un désengagement progressif de la communauté scientifique à l'égard des réseaux neuronaux, phénomène souvent désigné sous le terme d'« Hiver de l'intelligence artificielle ».

**Figure 3.1** — Chronologie des grandes étapes de l'histoire des réseaux de neurones (échelle temporelle non respectée) *(figure non reproduite)*. Repères indiqués sur la frise :
- **1950** — Test de Turing : évaluation de la capacité d'une IA à se faire passer pour un humain.
- **1956** — Intelligence artificielle : John McCarthy nomme la technologie IA lors de la conférence de Dartmouth.
- **1959** — Apprentissage machine : première mention de l'apprentissage machine par Arthur Samuel.
- **1986-1990** — Hiver de l'IA : réseaux de neurones — apparition du premier réseau de neurones ; redécouverte de la rétropropagation.
- **1997** — IA vs Homme : première victoire d'un ordinateur face à un humain — Deep Blue (IBM) bat G. Kasparov aux échecs.
- **2016** — IA vs Homme : première victoire d'un ordinateur face à un joueur professionnel au jeu de Go / AlphaGo (DeepMind).
- **2017** — Réseaux de neurones modernes : Transformers et GAN.

En 1997, l'ordinateur Deep Blue d'IBM bat le champion du monde d'échecs Garry Kasparov. Bien que cette victoire repose sur la puissance de calcul et des techniques de recherche arborescente plus que sur des réseaux de neurones, elle contribue à renouveler l'intérêt public et scientifique pour l'IA.

La véritable renaissance des réseaux de neurones se produit en 2012 avec la victoire

[passage OCR illisible — rupture de page entre la fin de la section 3.1 et le début de la section 3.2 ; le récit de la renaissance des réseaux de neurones en 2012 est interrompu et le début de la présentation du perceptron (structure, définition) manque]

## 3.2 Perceptron

qui produit la prédiction du modèle. Chaque unité de la couche d'entrée correspond à l'une des *n* variables explicatives, et la couche de sortie génère une sortie unique représentant la classe prédite (voir la figure 3.2).

Chaque entrée est pondérée par un poids spécifique, appelé poids synaptique et souvent noté *w_i*, *i* = 1..*n*. Comme pour la régression linéaire, le neurone reçoit également une entrée unitaire *x_0* = 1 dont le poids synaptique est *w_0* = *b*. Cette entrée, appelée biais *b*, est toujours activée (elle transmet 1 quelles que soient les données). Elle sert à contrôler le seuil d'activation.

Le perceptron calcule une somme pondérée de ses entrées, c'est-à-dire qu'il multiplie chaque entrée par son poids correspondant et additionne ces produits pour obtenir la valeur de la somme pondérée *z*. Cette somme est transmise à travers une fonction d'activation en vue d'obtenir la sortie *ŷ*.

Dans le cas du perceptron simple, la fonction d'activation la plus courante est une fonction de seuil (par exemple, la fonction de Heaviside), qui convertit la somme pondérée en une sortie binaire (0 ou 1). Si la somme pondérée est supérieure au seuil, le perceptron est activé et la sortie obtenue est égale à 1, sinon il ne s'active pas et la sortie est égale à 0. Ainsi, un perceptron génère une sortie binaire en fonction de la somme pondérée et de la fonction d'activation.

Formellement, le perceptron effectue la somme pondérée des entrées, à laquelle il ajoute le biais selon l'équation suivante :

```
z = w·x + b = Σ w_i x_i + b                                    (3.1)
```

Dans cette équation :
- **x** = (x_1, ..., x_n) est le vecteur d'entrée où chaque *x_i* représente une caractéristique de l'entrée ou variable d'entrée, *n* étant le nombre de variables.
- **w** = (w_1, ..., w_n) est le vecteur de poids où chaque *w_i* est le poids associé à la caractéristique *x_i*.
- *b* est le biais, aussi appelé intercept, qui permet de contrôler le décalage de la fonction de décision.

À la somme *z* obtenue, est appliquée une fonction d'activation qui permet d'obtenir la sortie finale *ŷ* :

```
ŷ = σ(z) = σ(Σ w_i x_i + b)                                     (3.2)
```

Le rôle de la fonction d'activation est de décider si le neurone doit « s'activer » ou non. Une fonction à seuil comme la fonction Heaviside est l'un des choix possibles.

La figure 3.3 illustre le fonctionnement d'un neurone artificiel, élément de base des réseaux de neurones. Chaque entrée *x_i* est multipliée par un poids *w_i*, et un biais *w_0* est ajouté, produisant une somme pondérée *z*. Cette somme est ensuite transformée par une fonction d'activation non linéaire, ici une fonction seuil, permettant d'introduire de la complexité dans la modélisation. La sortie *ŷ* représente la prédiction finale du neurone. *(figure non reproduite)*

Ainsi la principale différence réside dans les valeurs de sortie pour les entrées négatives. Cette distinction peut influencer la manière dont les perceptrons traitent et classifient les données.

### 3.2.2 Entraînement du perceptron

L'apprentissage du perceptron simple a pour objectif de déterminer les valeurs des poids synaptiques qui permettent de fournir la sortie (classe) *y* à partir des données d'apprentissage *x*. Autrement dit, il s'agit de déterminer les valeurs des poids synaptiques à partir des paires (x_i, y_i) ∈ D qui minimisent l'erreur de prédiction, c'est-à-dire l'écart entre les sorties obtenues et souhaitées, D étant l'ensemble des données d'apprentissage.

L'algorithme d'apprentissage du perceptron est un processus itératif qui s'exécute pendant un nombre maximum d'itérations, noté n_max. À chaque itération, pour chaque entrée x_i, l'algorithme calcule la prédiction correspondante ŷ_i et la compare à la classe réelle y_i. Si ŷ_i diffère de y_i, une mise à jour des poids du modèle est effectuée en fonction de l'erreur observée. La mise à jour des poids w est effectuée selon la règle suivante :

```
w ← w + η(y_i − ŷ_i) x_i
```

Dans ces équations :
- **w** est le vecteur des poids du modèle.
- η est le pas d'apprentissage ou taux d'apprentissage.
- ŷ_i et y_i sont respectivement les sorties obtenues et souhaitées pour l'observation d'entraînement *i*.

Cette règle de mise à jour est appelée règle d'apprentissage du perceptron ou encore règle Delta (Δ).

Le processus se poursuit jusqu'à ce que le modèle converge ou que le nombre d'itérations atteigne la limite n_max, garantissant ainsi une minimisation des erreurs de classification.

> **Exemple 3.1** — Soit l'ensemble des données Iris qui comprend 150 observations de fleurs d'iris décrites par la longueur et la largeur des sépales et des pétales. Trois espèces différentes sont incluses : Iris Setosa, Iris Versicolor et Iris Virginica.
>
> Le perceptron simple étant conçu pour des tâches de classification binaire, ce premier exemple vise à l'utiliser pour distinguer deux classes : Iris-Setosa et Non Iris-Setosa, cette dernière regroupant les espèces Iris Versicolor et Iris Virginica. Nous limitons l'analyse aux variables longueur et largeur des pétales pour pouvoir faire des représentations graphiques de la dispersion des différentes observations telles qu'illustré à la figure 3.5.
>
> Rappelons que la commande `datasets.load_iris()` permet de charger le jeu de données iris (voir l'extrait de code 3.1). L'attribut `iris.data` contient un tableau numpy de dimensions (150, 4), représentant les 150 échantillons d'iris et leurs quatre caractéristiques numériques : *sepal length*, *sepal width*, *petal length* et *petal width*.

**Extrait de code 3.2** — Développement d'un perceptron simple.
```python
from sklearn.linear_model import Perceptron

# Initialisation et entrainement du Perceptron
per_clf = Perceptron(max_iter=100, tol=1e-3, random_state=42)
per_clf.fit(X, y)

# Valeur de la constante
intercept = per_clf.intercept_[0]

# Les poids des caractéristiques petal length (x1) et petal width (x2)
coefficients = per_clf.coef_[0]
```

Le code 3.2 permet d'afficher le biais (intercept) du perceptron, qui est 4, ainsi que les coefficients (`coef_`) associés aux variables d'entrée *petal length* et *petal width*.

```
Paramètres du modèle de Perceptron

intercept_ : 4.6
coef_ : [-1.4 -2.2]

Ordonnée à l'origine (intercept) : 4.0
Coefficients détaillés :
- Coefficient 1 : -1.4
- Coefficient 2 : -2.2
```

Nous pouvons ainsi représenter schématiquement le modèle de perceptron obtenu selon la figure 3.6.

**Figure 3.6** — Architecture de perceptron qui permet de classifier Iris-Setosa (Classe 1) et Not Iris-Setosa (Classe 0). *(figure non reproduite)*

Le modèle de classification linéaire utilise les coefficients (`coef_`) et l'ordonnée à l'origine (`intercept_`) pour définir une frontière de décision.

## 3.3 Perceptron multicouche

### 3.3.1 Structure du MLP

La structure du MLP comprend une couche d'entrée, directement connectée aux données d'entrée, suivie d'une ou plusieurs couches cachées chargées d'effectuer les traitements intermédiaires, puis d'une couche de sortie qui génère la prédiction finale du réseau en fonction de la tâche visée (voir la figure 3.8).

**Figure 3.8** — Un perceptron multicouche. Chaque neurone de la couche cachée a 3 entrées qui proviennent de la couche d'entrée et 2 sorties qui sont renvoyées à tous les neurones de la couche de sortie. *(figure non reproduite)*

Contrairement au perceptron simple, qui se limite à une couche d'entrée directement connectée à une couche de sortie, le perceptron multicouche intègre au moins une couche cachée (*hidden layer*), également appelée couche intermédiaire ou invisible, située entre l'entrée et la sortie. Cette couche cachée permet au modèle de capturer des relations non linéaires plus complexes entre les variables d'entrée et la sortie.

Par exemple, dans le jeu de données des fleurs d'iris, il est possible d'utiliser un perceptron simple pour distinguer l'espèce Iris setosa des deux autres espèces (Iris versicolor et Iris virginica), car ces données sont linéairement séparables dans l'espace des longueurs et largeurs de pétales. En revanche, si l'on souhaite classifier les trois espèces simultanément, ou distinguer Iris versicolor de Iris virginica, un perceptron simple échoue, et il devient nécessaire d'utiliser un modèle capable de modéliser des frontières de décision non linéaires.

Le perceptron multicouche est un type de réseau de neurones à propagation avant (*feedforward neural network*), dans lequel l'information circule uniquement dans un sens, c'est-à-dire des entrées vers les sorties sans formation de cycles. La particularité topologique de ce réseau de neurones est que tous les neurones d'une couche sont « totalement connectés » (*fully connected*) aux neurones de la couche suivante. Chaque neurone reçoit donc *n* entrées, où *n* correspond au nombre de neurones présents dans la couche précédente, et produit *p* sorties qui sont transmises à l'ensemble des *p* neurones de la couche suivante, selon une architecture entièrement connectée.

### 3.3.2 Entraînement du perceptron multicouche

**2. Propagation avant**

Pendant la propagation avant (*forward pass*), les données d'entrée sont transmises à travers le réseau de neurones couche par couche, en appliquant des transformations linéaires suivies de fonctions d'activation.

Pour une couche *l* dans un réseau de neurones, le calcul des gradients pour les poids w^(l) et les biais b^(l) commence par le calcul de la somme pondérée des entrées et le biais :

```
z_i^(l) = Σ_j w_ij^(l) a_j^(l-1) + b_i^(l)                       (3.3)
```

où *z_i^(l)* est la somme pondérée des entrées plus le biais. À cette somme est appliquée une fonction d'activation pour obtenir les valeurs d'activation *a_i^(l)* :

```
a_i^(l) = σ(z_i^(l))                                             (3.4)
```

où σ est la fonction d'activation (ne pas confondre avec l'écart type), telle que la sigmoïde ou ReLU.

La figure 3.10 illustre le fonctionnement d'un perceptron multicouche lors de la phase de propagation avant. Le réseau est structuré en plusieurs couches : une couche d'entrée (en bleu), des couches cachées (en vert) et une couche de sortie (en violet). *(figure non reproduite)*

À l'entrée d'une couche *l*, les valeurs reçues sont traitées par les neurones de cette couche, chaque connexion étant associée à un poids w_ij^(l) reliant le neurone *j* de la couche précédente *l-1* au neurone *i* de la couche *l*. Dans chaque couche cachée, ces entrées sont transformées en une combinaison linéaire des activations de la couche précédente, suivie de l'application d'une fonction d'activation non linéaire, comme décrit dans l'équation (3.3). La propagation avant se poursuit à travers les couches cachées jusqu'à ce que les prédictions finales soient obtenues à la couche de sortie. Ces prédictions peuvent être des probabilités pour différentes classes dans le cas de la classification ou des valeurs continues dans le cas de la régression.

**3. Calcul de la perte**

Une fois la sortie du modèle (la valeur prédite) calculée, l'erreur est déterminée en comparant cette sortie aux valeurs attendues (voir la figure 3.10).

La couche de sortie génère des prédictions, qui sont comparées aux valeurs réelles à l'aide d'une fonction de coût. Cette dernière est définie en fonction de la nature du problème à résoudre. Par exemple, dans le cas d'un problème de régression, nous utilisons fréquemment l'erreur quadratique moyenne (MSE), définie par :

```
L = (1/m) Σ (y_k − ŷ_k)²                                         (3.5)
```

où *m* est le nombre de sorties, *y_k* la valeur observée et *ŷ_k* la valeur prédite.

avec :
- δ_k^(l+1) = ∂L/∂z_k^(l+1) est l'erreur du neurone *k* dans la couche *l+1*.
- w_jk^(l+1) est le poids reliant le neurone *j* de la couche *l* au neurone *k* de la couche *l+1*.
- ∂a_j^(l)/∂z_j^(l) = σ'(z_j^(l)) est la dérivée de la fonction d'activation.

Ainsi, nous obtenons l'erreur associée au neurone *j* dans la couche *l* :

```
δ_j^(l) = Σ_k δ_k^(l+1) w_jk^(l+1) σ'(z_j^(l))                   (3.7)
```

> La règle de la chaîne est utilisée pour calculer la dérivée de fonctions composées, ce qui est essentiel dans le cadre de l'apprentissage des réseaux de neurones multicouches. Lorsqu'une variable *a* dépend d'une variable *b* à travers une ou plusieurs variables intermédiaires *c*, la dérivée de *a* par rapport à *b* s'exprime selon la règle suivante :
>
> ```
> da/db = (da/dc)(dc/db)
> ```
>
> Dans un réseau de neurones, cette règle permet de relier les gradients des couches successives.

Une fois l'erreur calculée, le gradient du poids w_ji^(l), qui mesure l'impact de w_ji^(l) sur l'erreur totale, est donné par :

```
∂L/∂w_ji^(l) = δ_j^(l) a_i^(l-1)                                 (3.8)
```

Dans ces équations :
- ∂L/∂w_ji^(l) est le gradient de la fonction de perte par rapport au poids w_ji^(l).
- δ_j^(l) est l'erreur propagée pour le neurone *j* dans la couche *l*, obtenue à l'étape précédente.
- a_i^(l-1) est l'activation du neurone *i* dans la couche précédente *l-1*.

Nous pouvons résumer la propagation avant et la rétropropagation du gradient d'un point de vue pratique.

La propagation avant consiste à acheminer les données d'entrée à travers les différentes couches du réseau, en appliquant successivement les poids et les fonctions d'activation, jusqu'à obtenir une sortie. La rétropropagation, en revanche, signifie que l'on propage l'erreur en sens inverse, de la couche de sortie vers les couches cachées, jusqu'à la couche d'entrée, afin d'ajuster les poids du réseau.

Contrairement à la propagation avant, où nous mettons à jour les activations, la rétropropagation ne consiste pas à recalculer les activations en arrière, mais plutôt à ajuster les gradients des poids en fonction de la contribution de chaque neurone à l'erreur finale, ce qui permet d'optimiser progressivement le modèle.

Où η représente le taux d'apprentissage, w_ij^(l) est le poids reliant le neurone *i* à *j* dans la couche *l*, et b_j^(l) est le biais associé au neurone *j* dans la même couche. Ces mises à jour sont effectuées pour chaque échantillon de données au cours de multiples itérations, jusqu'à ce que le modèle atteigne un niveau d'erreur acceptable ou que le critère de convergence soit satisfait.

> **Repère bibliographique** — L'article « Learning representations by back-propagating errors » par David E. Rumelhart, Geoffrey E. Hinton et Ronald J. Williams, publié en 1986 dans la revue *Nature*, est un article pionnier dans lequel les auteurs introduisent l'algorithme de rétropropagation du gradient, détaillant son fonctionnement et démontrant son efficacité pour l'apprentissage supervisé dans les réseaux de neurones multicouches. Ils expliquent comment cet algorithme permet de minimiser l'erreur en ajustant les poids des connexions neuronales, ouvrant ainsi la voie à des avancées significatives dans le domaine de l'intelligence artificielle.

### 3.3.3 Fonctions d'activation

L'entraînement du MLP nécessite le choix d'une fonction d'activation qui introduit de la non-linéarité dans le modèle.

**Fonction logistique**

La fonction logistique (voir la figure 3.11 (a)) est définie par :

```
σ(z) = 1 / (1 + e^(-z))                                          (3.11)
```

La fonction logistique possède une dérivée non nulle en tout point, ce qui permet à la descente de gradient de progresser à chaque étape.

**Fonction ReLU**

La fonction ReLU (acronyme de *Rectified Linear Unit*) est définie par :

```
f(x) = 0   si x < 0
f(x) = x   si x ≥ 0                                               (3.12)
```

Dans la pratique, la fonction ReLU fonctionne très bien et a l'avantage d'être rapide à calculer. Elle n'a pas de valeur de sortie maximale, ce qui aide à diminuer certains problèmes au cours de la descente de gradient (que nous traiterons au chapitre 4).

**Fonction tangente hyperbolique**

La tangente hyperbolique tanh (*hyperbolic tangent*) a une forme similaire à la fonction logistique (voir la figure 3.11 (c)). Elle est continue et dérivable et ses valeurs de sortie se [passage OCR illisible — suite de la description de tanh manquante].

L'entraînement du modèle, décrit dans l'extrait de code 3.4, utilise la fonction `MLPClassifier` dont les principaux paramètres sont :
- `hidden_layer_sizes=(3, 6)` qui indique deux couches successives avec 3 et 6 neurones.
- `learning_rate_init=0.01` qui détermine le pas d'apprentissage.

**Extrait de code 3.4** — Création et entraînement d'un perceptron multicouche avec Scikit-Learn.
```python
from sklearn.neural_network import MLPClassifier

# Initialisation du classificateur MLP
# Deux couches cachées avec 3 et 6 neurones et une fonction d'activation ReLU
mlp = MLPClassifier(max_iter=1000,
                     hidden_layer_sizes=(3, 6),
                     activation='relu',
                     learning_rate_init=0.01,
                     random_state=42)

# Entrainement du modèle
mlp.fit(X_train, y_train)
```

Le code 3.5 génère un graphique montrant la frontière de décision du modèle, où chaque région de classification est colorée différemment selon un paramètre colormap.

**Extrait de code 3.5** — Visualisation des frontières de décision - Carte de contours.
```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap

# Calculer les limites pour la frontière de décision
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1

# Création d'un maillage de points pour la surface de décision
xx, yy = np.meshgrid(
    np.linspace(x_min, x_max, 500),
    np.linspace(y_min, y_max, 500))

# Prédiction des classes pour chaque point du maillage
Z = mlp.predict(scaler.transform(np.c_[xx.ravel(), yy.ravel()]))
Z = Z.reshape(xx.shape)

# Définition d'une colormap personnalisée pour la région et les points
custom_cmap = ListedColormap(["#a682bf", "#a5d17b", "#829fbf"])

# Création de la figure et des axes
fig, ax = plt.subplots(figsize=(8, 4))
```

[passage OCR illisible — suite de l'extrait de code 3.5 et de son commentaire manquante]

Explicitement chaque couche. Dans cet exemple, la première couche `Dense` contient 3 neurones (`Dense(3, input_shape=(2,), activation='relu')`). Le paramètre `input_shape=(2,)` indique que la couche d'entrée reçoit des vecteurs à deux dimensions. La deuxième couche est une couche cachée avec 6 neurones, définie par `Dense(6, activation='relu')`. Enfin, la couche de sortie comporte 3 neurones et utilise la fonction d'activation softmax, adaptée à la classification multi-classes, à savoir les trois classes de fleurs d'iris. Notez qu'il est possible de spécifier une fonction d'activation différente pour chaque couche, selon le rôle qu'elle joue dans le réseau.

Avant l'entraînement, le modèle est compilé en spécifiant l'optimiseur SGD avec un taux d'apprentissage de 0.01. La fonction de perte choisie est la `categorical_crossentropy`, adaptée à la classification multiclasse. La métrique de suivi est l'*accuracy*, qui mesure le pourcentage de bonnes classifications. Le modèle est ensuite entraîné sur les données `X_train` et `y_train` pendant 50 époques. Enfin, 10 % des données d'entraînement sont utilisées pour évaluer la performance sur un ensemble de validation.

**Extrait de code 3.6** — Création et entraînement d'un perceptron multicouche avec Keras.
```python
# Définition du modèle MLP avec Keras
model = Sequential()

# Première couche cachée (3 neurones, activation ReLU)
model.add(Dense(3, input_shape=(2,), activation='relu'))

# Deuxième couche cachée (6 neurones, activation ReLU)
model.add(Dense(6, activation='relu'))

# Couche de sortie (softmax pour la classification multi-classes)
model.add(Dense(3, activation='softmax'))

# Compilation du modèle
model.compile(optimizer=SGD(learning_rate=0.01),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Entrainement du modèle
history = model.fit(X_train, y_train, epochs=50, batch_size=8,
                     validation_split=0.1)
```

Un dernier aspect à explorer dans cet exemple est l'utilisation de NetworkX, une bibliothèque Python à la fois puissante et flexible, conçue pour la création, la manipulation et l'analyse de graphes. Dans notre contexte, un graphe est une structure mathématique composée de nœuds (ou sommets) interconnectés par des arêtes (ou liens), permettant de modéliser diverses relations complexes.

L'application de NetworkX aux réseaux de neurones peut être particulièrement utile pour représenter la topologie d'un MLP ou d'autres architectures neuronales sous forme de graphe. Chaque neurone peut être considéré comme un nœud, et les connexions pondérées entre les neurones correspondent aux arêtes du graphe. Cette approche peut être utile [passage OCR illisible — suite manquante] neurones de la première couche cachée. Toutefois, cette estimation reste partielle : les poids ne permettent pas à eux seuls d'évaluer l'importance réelle d'une variable. Une évaluation plus fiable nécessiterait des méthodes d'explicabilité.

## 3.4 Perceptron multicouche « profond »

Les perceptrons multicouches, composés de quelques couches, sont bien adaptés aux tâches de classification et de régression simples à modérément complexes. Cependant, pour des problématiques de classification de données plus complexes, il est nécessaire d'augmenter la complexité du MLP. Cela peut se faire en augmentant le nombre de couches cachées (avec trois, quatre couches ou plus), rendant ainsi le réseau de neurones « profond ».

La profondeur permet d'apprendre des représentations de niveau supérieur et des caractéristiques abstraites des données. De plus, augmenter le nombre de neurones dans chaque couche cachée améliore la capacité du réseau à capturer la complexité des données, bien que cela exige davantage de puissance de calcul et de données d'entraînement.

L'implémentation d'un perceptron multicouche profond est facilitée par l'utilisation des bibliothèques TensorFlow et Keras. Cette dernière constitue une option privilégiée pour construire des MLP profonds en raison de sa flexibilité, de son intégration étroite avec TensorFlow, de son large soutien communautaire, et de sa capacité à faciliter le déploiement des modèles.

> **Exemple 3.3** — Cet exemple illustre le développement d'un MLP profond pour la classification des fleurs d'iris en trois classes en utilisant Keras.
>
> L'extrait de code 3.7 décrit les étapes de lecture et de préparation des données, en particulier le traitement des variables cibles pour un problème de classification multiclasse. Ces manipulations sont nécessaires afin d'adapter les données au format attendu par un perceptron multicouche implémenté avec Keras.
>
> Le code 3.7 commence par le chargement du jeu de données Iris à l'aide de la fonction `load_iris()`. La variable X contient les caractéristiques mesurées des fleurs (comme la longueur et la largeur des sépales et des pétales), tandis que y contient les étiquettes correspondantes, représentant les espèces de fleurs sous forme de valeurs entières 0, 1 ou 2, associées respectivement à setosa, versicolor et virginica.
>
> Comme le modèle `Sequential` de Keras exige une sortie sous forme de vecteurs de probabilités pour la classification multi-classes, une transformation des étiquettes y est nécessaire. Celles-ci, de nature nominale, sont ainsi converties en représentation one-hot à l'aide de `OneHotEncoder()` (se référer à la section 1.4.6). Cet encodage est requis lorsque l'activation softmax est utilisée avec la fonction de perte `categorical_crossentropy`, car il fournit un vecteur binaire unique par classe, avec un seul 1, rendant ainsi la sortie du modèle compatible avec l'entraînement.
>
> Afin d'améliorer la convergence du modèle et d'assurer une échelle uniforme entre les caractéristiques, les valeurs de X sont mises à l'échelle via `StandardScaler()`.

**Extrait de code 3.8** — Création et entraînement d'un perceptron multicouche profond avec Keras.
```python
# Définition du modèle mlp profond. Le nom "MLP_Profond" s'affichera dans le résumé
mlp_profond = tf.keras.Sequential([
    tf.keras.Input(shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(y_onehot.shape[1], activation='softmax')],
    name="MLP_Profond")

# Compilation du modèle
mlp_profond.compile(optimizer='adam',
                     loss='categorical_crossentropy',
                     metrics=['accuracy'])

# Entrainement du modèle
history = mlp_profond.fit(X_train, y_train,
                           epochs=100,
                           batch_size=8,
                           validation_data=(X_test, y_test),
                           verbose=0)

# Affichage du résumé du modèle
mlp_profond.summary()
```

> Les termes *époque* et *itération* désignent deux concepts distincts liés au processus d'apprentissage des perceptrons multicouches.
>
> Une époque correspond à un passage complet de l'ensemble de données d'entraînement à travers le réseau. Cela signifie que toutes les données d'entraînement ont été utilisées une fois pour mettre à jour les poids du réseau.
>
> Une itération correspond à un passage unique d'un sous-ensemble de données (mini-lot ou batch) à travers le réseau, suivi d'une mise à jour des poids.
>
> Par exemple, si vous avez un ensemble d'entraînement contenant 1000 échantillons et que vous les passez tous une fois dans le réseau, cela constitue une époque. Alors que, si votre ensemble d'entraînement contient 1000 échantillons et que vous utilisez des mini-lots de 100 échantillons, il vous faudra 10 itérations pour compléter une époque.

La fonction `mlp_profond.summary()` fournit une vue d'ensemble structurée du modèle défini, en détaillant la composition des couches et le nombre de paramètres associés. La première couche, Dense, transforme chaque vecteur d'entrée de dimension 2 en un vecteur de 256 dimensions. Elle comporte 768 paramètres, correspondant à : 2 (dimensions d'entrée) × 256 (neurones) + 256 (biais) = 768 paramètres. La deuxième couche, dense_1, contient 128 neurones. Étant connectée à 256 sorties de la couche précédente, elle comprend 256 × 128 + 128 = 32 896 paramètres. Le même raisonnement peut être poursuivi [passage OCR illisible — suite manquante].

> Une stratégie courante pour choisir le nombre de neurones par couche cachée consiste à utiliser un nombre décroissant de neurones dans les couches successives. Par exemple, si la première couche comporte 64 neurones, les couches suivantes peuvent en contenir 32, puis 16. Ce choix se justifie par le fait que de nombreuses caractéristiques de bas niveau peuvent se fondre dans un nombre de caractéristiques de haut niveau qui sont moindre. Cette stratégie permet au réseau de condenser progressivement les informations tout en réduisant le risque de surajustement.

**Extrait de code 3.9** — Création d'un perceptron multicouche profond avec Keras à l'aide d'une liste de couches cachées.
```python
# Liste des dimensions des couches cachées
hidden_layers = [256, 128, 64, 32, 16]

# Création du modèle séquentiel
model = Sequential()
model.add(Input(shape=(X_train.shape[1],)))

# Ajout dynamique de couches cachées à l'aide d'une boucle
for units in hidden_layers:
    model.add(Dense(units, activation='relu'))

# Couche de sortie (softmax pour la classification multi-classes)
model.add(Dense(y_onehot.shape[1], activation='softmax'))

# Compilation du modèle
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# le reste du script est identique à celui de l'Extrait de code 3.8 ...
```

## 3.5 Explicabilité des réseaux de neurones

L'explicabilité (*explainability*) d'un modèle d'apprentissage machine désigne sa capacité à fournir une compréhension humaine de ses décisions ou prédictions. Cette propriété est particulièrement importante dans le cas des réseaux de neurones, dont les mécanismes internes sont souvent perçus comme des « boîtes noires » en raison de leur complexité structurelle.

### 3.5.1 Défis pour l'explicabilité

Contrairement à des modèles plus simples comme la régression linéaire ou les arbres de décision, les réseaux de neurones, en particulier les réseaux de neurones profonds, ne permettent pas une lecture directe des règles de décision. Cela pose des enjeux majeurs en termes de :

[passage OCR illisible — rupture de page ; l'énumération des enjeux de l'explicabilité et le début de la présentation des approches agnostiques au modèle manquent]

### 3.5.2 Catégories des modèles d'explicabilité

qui les rend applicables de manière universelle, sans dépendre du modèle sous-jacent. Parmi les approches agnostiques au modèle, nous retrouvons plusieurs méthodes dont les appellations sont généralement connues sous leur nom anglais abrégé (acronyme) :
- La méthode **LIME** (pour *Local Interpretable Model-agnostic Explanations*, soit une traduction proche « explications locales indépendantes du modèle ») approxime localement le comportement du modèle autour d'une instance donnée à l'aide d'un modèle linéaire interprétable (détaillée dans la section 3.5.3).
- La méthode **SHAP** (pour *SHapley Additive exPlanations*) qui s'appuie sur la théorie des jeux coopératifs pour attribuer à chaque caractéristique une contribution précise à la prédiction du modèle (détaillée dans la section 3.5.4).

**Les approches spécifiques au modèle**

Les approches spécifiques au modèle (en anglais, *model-specific explainability*) permettent de tirer parti de la structure interne du modèle considéré, en particulier celle des réseaux de neurones. En accédant aux poids, aux activations et aux gradients, elles permettent une compréhension fine du processus décisionnel du modèle. Parmi les approches spécifiques au modèle, nous retrouvons plusieurs méthodes dont les appellations sont, aussi, généralement connues sous leur nom anglais abrégé (acronyme) :
- La méthode **LRP** (pour *Layer-wise Relevance Propagation*, soit « propagation couche par couche de la pertinence ») décompose la prédiction en contributions attribuées à chaque neurone d'entrée, en redistribuant la pertinence de la sortie vers les couches précédentes (voir section 3.5.5 pour plus de détails).
- La méthode **DeepLIFT** (pour *Deep Learning Important FeaTures*, soit une traduction proche « caractéristiques importantes en apprentissage profond ») est une méthode de rétropropagation d'importance qui compare les activations neuronales à des valeurs de référence, afin de quantifier la contribution de chaque caractéristique d'entrée à la prédiction.

> **Exemple 3.4** — Dans la suite de ce chapitre, nous présentons trois méthodes d'explicabilité dans les sections 3.5.3 à 3.5.5. Afin de garantir la comparabilité des résultats, le jeu de données Titanic est utilisé comme référence pour l'ensemble des illustrations présentées. Pour chaque méthode d'explicabilité, les mêmes étapes de prétraitement ainsi que les mêmes modèles d'apprentissage sont systématiquement appliqués, assurant ainsi une évaluation cohérente et équitable des approches comparées.
>
> L'extrait de code 3.10 illustre l'implémentation d'un pipeline complet de préparation des données Titanic. La commande `sns.load_dataset('titanic')` permet de charger le jeu de données Titanic à partir de la bibliothèque Seaborn, et de l'assigner à la variable df sous forme d'un objet DataFrame. La variable cible est la variable *survived* qui indique si un passager a survécu (1) ou non (0). L'objectif est de prédire la probabilité de survie d'un passager en fonction de ses caractéristiques (variables explicatives), telles que *pclass* (classe de billet), *sex*, *age*, ou encore *fare* (prix du billet). Ces variables sont déjà décrites au tableau 1.1. Les bibliothèques à utiliser sont celles décrites dans les exemples de la section 1.4.

[passage OCR illisible — fin de l'extrait de code 3.10 et transition manquantes]

... normalisées `X_train_scaled` avec des mini-lots de taille égale à 16 (`batch_size=16`). Ce modèle sera utilisé, dans les trois prochaines sections, pour illustrer les différentes approches d'interprétabilité, à savoir la méthode LIME, la méthode SHAP et la méthode LRP.

**Extrait de code 3.11** — Entraînement d'un modèle de classification à l'aide d'un perceptron multicouche.
```python
from tensorflow.keras import Input
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Définir le modèle
model = Sequential([Input(shape=(X_train.shape[1],)),
                     Dense(64, activation='relu'),
                     Dense(32, activation='relu'),
                     Dense(16, activation='relu'),
                     Dense(1, activation='sigmoid')])

# Compilation du modèle
model.compile(optimizer='Adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])  # sortie binaire

# Entrainement du modèle sur les données d'entrainement
model.fit(X_train_scaled, y_train, epochs=20, batch_size=16, verbose=0)
```

> La notion d'explicabilité est souvent confondue avec celle d'interprétabilité dans le domaine de l'apprentissage machine. Pourtant, ces deux concepts renvoient à des réalités distinctes. Dans une perspective centrée sur la structure du modèle, l'interprétabilité désigne la capacité à comprendre directement le fonctionnement d'un modèle à partir de sa structure interne, sans recourir à des outils externes. C'est le cas, par exemple, d'un arbre de décision ou d'un modèle de régression linéaire, dont les mécanismes sont transparents et directement accessibles à l'analyse humaine.
>
> À l'inverse, l'explicabilité renvoie à la capacité à générer des explications a posteriori pour des modèles complexes, souvent qualifiés de « boîtes noires ». Elle se concentre sur les contributions des variables d'entrée à une prédiction donnée, et repose généralement sur des méthodes d'attribution telles que SHAP (SHapley Additive exPlanations) ou LIME (Local Interpretable Model-agnostic Explanations).

### 3.5.3 LIME (Local Interpretable Model-agnostic Explanations)

La méthode LIME vise à fournir des explications locales, fidèles et interprétables des prédictions effectuées par des modèles d'apprentissage machine complexes. Sa motivation fondamentale repose sur l'hypothèse que, bien qu'un modèle puisse être globalement complexe et non interprétable, il est souvent linéaire ou simple dans une petite région de l'espace des données autour d'un point donné. La méthode LIME exploite cette propriété pour approximer le comportement du modèle global f localement par un modèle plus [passage OCR illisible] simple, en trois étapes : elle génère d'abord des perturbations autour de l'instance x, évalue ensuite les prédictions de f sur ces points, puis ajuste un modèle simple, comme une régression Lasso (se référer à la section 4.4.2), afin de reproduire localement le comportement de f. L'extrait de code 3.12 met en œuvre la méthode LIME en utilisant la classe `LimeTabularExplainer`.

**Extrait de code 3.12** — Approximation locale et affichage des contributions des variables via LIME.
```python
from lime.lime_tabular import LimeTabularExplainer

# Adaptation de la fonction de prédiction pour LIME
# Cette fonction transforme la sortie du modèle Keras (qui donne uniquement la
# proba de la classe 1) en une matrice à 2 colonnes : [proba classe 0, proba
# classe 1], comme attendu par LIME.

def predict_proba(x):
    proba_class1 = model.predict(x)
    proba_class0 = 1 - proba_class1
    return np.hstack([proba_class0, proba_class1])

# Création de l'explainer LIME
explainer = LimeTabularExplainer(
    training_data=X_train_scaled,
    feature_names=X.columns.tolist(),
    class_names=["Not Survived", "Survived"],
    mode="classification")

# Sélection de l'observation à expliquer (i=0 dans ce code)
# LIME va créer des perturbations autour de cette observation et approximer
# localement le comportement du modèle avec un modèle linéaire interprétable.
i = 0
exp = explainer.explain_instance(
    X_test_scaled[i],
    predict_proba,
    num_features=5)

# Affichage d'une visualisation avec les 5 features les plus importantes pour
# cette prédiction.
exp.show_in_notebook(show_table=True, show_all=False)
```

Ce code débute par la définition de la fonction `predict_proba`, conçue pour adapter la sortie du modèle construit à l'aide de la bibliothèque Keras. En effet, ce modèle retourne uniquement la probabilité d'appartenance à la classe 1, ce qui est insuffisant pour la bibliothèque lime, qui attend une matrice de probabilités couvrant l'ensemble des classes. La fonction `predict_proba` modifie donc cette sortie pour produire une matrice à deux colonnes, correspondant respectivement aux probabilités des classes 0 et 1.

Nous créons ensuite un objet explainer, instance de la classe `LimeTabularExplainer`, en le construisant à partir des données d'entraînement standardisées (`X_train_scaled`), des noms des variables explicatives obtenus à partir de `X.columns.tolist()`, ainsi que des [passage OCR illisible — description des résultats de l'exemple LIME partiellement manquante] poids de 0.17, et du port d'embarquement (embarked = 0.56), dont l'effet est plus modeste (0.06). Bien que l'âge (age = -0.71) et l'absence de proches à bord (sibsp = -0.47) penchent en faveur de la survie (avec des poids de 0.27 et 0.07 respectivement), ces facteurs sont insuffisants pour inverser la prédiction majoritaire du modèle.

À l'inverse, dans la figure 3.14 (b), le modèle prédit une survie avec une probabilité élevée de 0.89. Cette prédiction est soutenue par des valeurs caractéristiques très favorables : un âge très bas (age = -1.79) contribue pour 0.28, une première classe (pclass = -0.40) ajoute un poids de 0.18, le fait d'être une femme (sex = -1.38) renforce la prédiction de survie avec un poids de 0.18, et le fait de voyager seule (sibsp = -0.47) apporte également une légère contribution (0.08). Le seul facteur légèrement défavorable dans ce cas est le port d'embarquement (embarked = 0.56), mais son poids est marginal (0.06).

Ces deux cas illustrent de manière claire la capacité de la méthode LIME à identifier les variables les plus influentes dans une prédiction locale, en mettant en évidence à la fois les effets positifs et négatifs, ainsi que leurs poids relatifs dans la décision finale du modèle.

### 3.5.4 SHAP (SHapley Additive exPlanations)

La méthode SHAP est une méthode d'explicabilité qui repose sur les valeurs de Shapley issues de la théorie des jeux. Elle permet d'attribuer à chaque variable une contribution additive à la prédiction, rendant ainsi le modèle compréhensible même lorsqu'il est complexe.

> Les termes SHAP et Shapley sont souvent confondus. Shapley fait référence aux valeurs de Shapley, issues de la théorie des jeux, qui mesurent la contribution équitable de chaque variable dans une prédiction. Par contre, SHAP désigne une méthode pratique d'explicabilité des modèles d'apprentissage machine, qui applique ces principes pour attribuer à chaque variable une valeur SHAP. Ainsi, SHAP est une implémentation algorithmique des valeurs de Shapley, adaptée aux modèles complexes.

Pour mieux comprendre l'intuition derrière les valeurs de Shapley, nous pouvons comparer les variables d'un modèle prédictif (comme l'âge, le sexe ou la classe d'un passager dans la base de données Titanic) à des joueurs au sein d'une équipe. Cette équipe, constituée par un sous-ensemble de joueurs (de variables), contribue collectivement à un score qui est, dans notre cas, la prédiction du modèle. L'enjeu est de déterminer quelle part du score total est due à chaque joueur, c'est-à-dire à chaque variable. La première étape consiste à examiner l'ensemble des sous-ensembles de variables ne contenant pas la variable explicative considérée. Il s'agit ensuite d'évaluer sa contribution marginale en comparant la prédiction du modèle obtenue avec le sous-ensemble initial à celle obtenue après l'ajout de la variable à ce même sous-ensemble. En faisant la moyenne de ces différences d'impact sur toutes les configurations possibles, nous obtenons la valeur de Shapley de la variable. Celle-ci mesure donc l'apport moyen d'une variable à la prédiction finale, en tenant compte de toutes les interactions possibles avec les autres variables.

Formellement, pour chaque variable j ∈ {1, ..., d}, la valeur de Shapley est définie comme [passage OCR illisible — équation (3.15) non récupérable].

Le calcul exact des valeurs de Shapley tel que décrit dans l'équation (3.15) est très coûteux, car sa complexité est de nature exponentielle en fonction du nombre de caractéristiques (variables explicatives). Pour rendre l'approche applicable à des modèles réels et à des jeux de données de grande dimension, la bibliothèque shap propose plusieurs algorithmes d'approximation ou de calcul efficace adaptés à des familles de modèles spécifiques. Nous utilisons `KernelExplainer` de la bibliothèque SHAP, applicable de manière assez simple.

L'extrait de code 3.13 implémente l'évaluation des valeurs de Shapley pour expliquer les prédictions du modèle. En complément des bibliothèques déjà utilisées dans les exemples précédents, nous importons ici la bibliothèque dédiée shap, qui implémente cette méthode de manière très accessible.

Le code commence par une fonction `predict_class1` qui renvoie les probabilités associées à la classe 1, conformément à la sortie du modèle. Un explainer de type `KernelExplainer` est ensuite initialisé avec cette fonction et les données d'entraînement normalisées `X_train_scaled`. Les valeurs SHAP sont calculées sur les observations de test à l'aide de la méthode `explainer.shap_values()`, fournissant les contributions de chaque variable à la prédiction. Enfin, la fonction `shap.summary_plot()` génère un graphique synthétique qui illustre, pour chaque variable, la distribution de ses valeurs SHAP et leur impact directionnel sur la prédiction du modèle.

**Extrait de code 3.13** — Évaluation de la pertinence de Shapley.
```python
import shap

# Définition d'une fonction de prédiction pour SHAP qui renvoie la probabilité
# de la classe 1. Cette fonction prend un tableau d'individus et renvoie les
# prédictions du modèle Keras (probabilités entre 0 et 1)
def predict_class1(X_input):
    return model.predict(X_input).flatten()

# Création d'un explainer SHAP basé sur KernelExplainer
# La fonction de prédiction lui est fournie avec les données d'entraînement
# (X_train_scaled) pour approximer les contributions
explainer = shap.KernelExplainer(predict_class1, X_train_scaled)

# Calcul des valeurs SHAP pour les données de test
shap_values = explainer.shap_values(X_test_scaled)

# Conversion des shap values en matrice NumPy pour compatibilité avec les
# fonctions de visualisation
X_test_scaled_df = pd.DataFrame(X_test_scaled, columns=features)
shap_matrix = np.array(shap_values)

# Visualisation des valeurs Shap
shap.summary_plot(shap_matrix, X_test_scaled_df)
```

La figure 3.15 montre l'impact de chaque variable sur les prédictions du modèle. Sur l'axe vertical, nous retrouvons les variables d'entrée du modèle, à savoir sex, pclass, age, embarked, parch, sibsp et fare. L'axe horizontal représente les valeurs Shapley, qui [passage OCR illisible — suite manquante] modéré sur la prédiction. Les passagers embarqués à Cherbourg ou Queenstown semblent légèrement être favorisés, tandis que ceux embarqués à Southampton sont associés à une probabilité de survie légèrement plus faible. Les passagers plus jeunes ont globalement une probabilité de survie plus élevée selon le modèle. L'effet de l'âge reste cependant assez dispersé pour les individus plus âgés.

Dans l'ensemble, cette analyse met en lumière le rôle déterminant de certaines variables, notamment sex et pclass, dans les prédictions du modèle, tout en confirmant l'utilité des valeurs Shapley pour l'interprétation locale et globale des modèles d'apprentissage automatique.

### 3.5.5 LRP (Layer-wise Relevance Propagation)

La méthode LRP est une méthode d'explicabilité des réseaux de neurones utilisée pour comprendre quelles entrées au réseau de neurones sont les plus responsables d'une prédiction. Dans le cas d'un perceptron multicouche, la LRP permet d'attribuer un score de pertinence (*relevance score*) à chaque neurone d'entrée, c'est-à-dire une mesure de sa contribution à la sortie du modèle.

Considérons un réseau MLP composé de L couches. L'évaluation de pertinence basée sur la méthode LRP se fait selon les quatre étapes principales suivantes (figure 3.16).

**Figure 3.16** — Évaluation de pertinence basée sur la propagation de la pertinence LRP. *(figure non reproduite)* Étapes schématisées : initialisation des poids dans les neurones → propagation avant des activations → calcul de la perte entre la sortie prédite et la sortie réelle → rétropropagation de l'erreur à travers le réseau → mise à jour des poids et biais via la descente de gradient.

**1. Propagation avant : calcul des activations**

L'activation a_j^(l) du j-ième neurone de la l-ième couche d'un MLP est donnée par :

```
a_j^(l) = f^(l)(Σ_i w_ij^(l) a_i^(l-1) + b_j^(l))                (3.16)
```

Dans le cas de la Règle Epsilon, la pertinence R_i^(l-1) est donnée par [passage OCR illisible — équations (3.19) et (3.20) fortement dégradées dans le scan, non reconstruites fidèlement].

Dans ces équations :
- R_j^(l) est la pertinence, aussi appelée score d'importance, du neurone *j* dans la couche *l*.
- R_i^(l-1) est la pertinence redistribuée au neurone *i* dans la couche précédente *l-1*.
- w_ij^(l) est le poids synaptique entre le neurone *i* de la couche *l-1* et le neurone *j* de la couche *l*.
- a_i^(l-1) est l'activation du neurone *i* dans la couche *l-1* et b_j^(l) le biais associé au neurone *j*.
- ε est un terme positif (par exemple 10⁻⁹) ajouté pour éviter les divisions par zéro et améliorer la stabilité numérique.
- sign(·) est la fonction signe.

Dans le cas de la Règle Alpha-Beta, la pertinence R_i^(l-1) sépare les contributions de chaque neurone *j* en deux types : les contributions positives, qui soutiennent la prédiction, sont pondérées par le coefficient α, et les contributions négatives, qui s'y opposent, sont pondérées par β.

La règle Alpha-Beta est donnée par [passage OCR illisible — équation (3.21) fortement dégradée dans le scan].

Les termes de cette équation sont définis comme suit :
- (w_ij^(l) a_i^(l-1))⁺ = max(w_ij^(l) a_i^(l-1), 0) correspond à la contribution positive du neurone *i* à l'activation du neurone *j*.
- (w_ij^(l) a_i^(l-1))⁻ = min(w_ij^(l) a_i^(l-1), 0) correspond à la contribution négative du neurone *i* à l'activation du neurone *j*.
- Z⁺_j = Σ_i (w_ij^(l) a_i^(l-1))⁺ est un normalisateur qui représente la somme des contributions positives au neurone *j*.
- Z⁻_j = Σ_i (w_ij^(l) a_i^(l-1))⁻ est un normalisateur qui représente la somme des contributions négatives au neurone *j*.
- α, β sont des coefficients de pondération des contributions positives et négatives, avec la contrainte α − β = 1 pour assurer la conservation de la pertinence.

[passage OCR illisible — page numérisée à l'envers (rotation 180°) : l'extrait de code 3.14 « Développement de la règle de performance epsilon » (implémentation de la LRP avec Keras/NumPy) et le paragraphe qui l'accompagne ne sont pas récupérables de façon fiable ; leur contenu n'a pas été reconstruit afin de ne pas introduire de code inventé]

Pour analyser les contributions des variables d'entrée à la prédiction, la méthode LRP a été appliquée pour calculer les scores de pertinence sur le jeu de données de test (voir l'extrait de code 3.14). Pour chaque individu, les scores ont été moyennés en valeur absolue, afin d'obtenir une mesure globale de l'importance moyenne des caractéristiques sur cet ensemble de données. Cette agrégation permet notamment d'identifier les attributs qui contribuent de manière constante aux prédictions du modèle, sans avoir à comparer manuellement l'importance relative des différentes variables individuelles.

Cet exemple illustre concrètement comment la méthode LRP, appliquée à chaque individu, permet de ressortir une importance moyenne des variables d'entrée, offrant ainsi une interprétation globale du comportement du modèle sur l'ensemble des données de test.

En conclusion, dans ce chapitre, nous avons exploré les réseaux de neurones artificiels, en commençant par une introduction au perceptron simple, sa structure, et ses mécanismes d'entraînement. Nous avons ensuite élargi cette compréhension au perceptron multicouche, qui permet de modéliser des fonctions non linéaires et d'aborder des problèmes plus complexes que ceux que le perceptron simple peut résoudre.

Nous avons détaillé les différentes étapes de l'entraînement du MLP, incluant la propagation avant qui permet de calculer les activations des couches en appliquant les poids et les fonctions d'activation, et le calcul de l'erreur qui évalue la différence entre les prédictions et les vraies valeurs à l'aide d'une fonction de perte. La rétropropagation du gradient était décrite en passant par le calcul du gradient de l'erreur par rapport aux poids et en utilisant la dérivation de la fonction de perte, ce qui permet la mise à jour des poids.

Ensuite, nous avons présenté le perceptron multicouche profond qui s'impose comme une évolution majeure des architectures de réseaux de neurones. Cette profondeur accrue constitue le fondement des avancées de l'apprentissage profond, désormais appliqué à des problèmes complexes dans des domaines aussi variés que la vision par ordinateur, le traitement du langage naturel ou encore la bioinformatique.

Cependant, ces architectures puissantes sont souvent qualifiées de « boîtes noires », en raison de l'opacité de leurs décisions. Cette limitation a conduit à l'émergence du domaine de l'explicabilité, qui vise à rendre les prédictions des modèles plus transparentes et compréhensibles. Des méthodes telles que LIME, SHAP ou LRP ont ainsi été développées pour fournir des explications locales, en identifiant les variables ayant le plus influencé une prédiction donnée. Bien que ces approches aient permis de répondre partiellement à la critique de la boîte noire, elles ne suffisent pas à elles seules à résoudre l'ensemble des enjeux soulevés par les réseaux profonds. En effet, la profondeur des modèles introduit de nouvelles problématiques, notamment en matière de biais implicites, de généralisation fragile ou de sensibilité aux perturbations adverses. Le chapitre suivant sera donc consacré à l'analyse détaillée de ces limitations et aux stratégies méthodologiques permettant d'y répondre.

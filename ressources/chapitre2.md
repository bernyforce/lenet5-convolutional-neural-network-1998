---
id: livre-ap-ch2-modeles-de-regression
type: chapter
scope: project
status: active
created: 2026-08-31
updated: 2026-08-31
owner: user
book: "Apprentissage profond — Théorie et applications"
book_slug: apprentissage-profond
author: "Neila Mezghani"
chapter: 2
source: ["chapters/02-ap2_260710_114025.md#L2390-L2732", "chapters/03-ap3_260710_114248.md#L1-L943"]
ocr_note: "Source scannée OCR (tesseract, qualité variable) ; nettoyage fidèle : dé-césure, suppression en-têtes/pieds de page répétés et bruit OCR non textuel ; aucun contenu inventé, aucune réécriture de fond. Un bloc de code (extraits 2.14-2.17) était imprimé en miroir/pivoté dans le scan et reste illisible de façon fiable : il est signalé plutôt que reconstruit."
language: fr
---

# Chapitre 2 — Modèles de régression

La régression polynomiale, une extension de la régression linéaire, peut être utilisée pour mieux représenter les données lorsqu'une relation plus complexe est présente, en ajoutant des termes polynomiaux aux variables indépendantes.

Contrairement aux régressions linéaire et polynomiale qui prédisent des variables dépendantes continues, la régression logistique binaire est employée pour les variables dépendantes binaires. Elle permet de prédire des probabilités en utilisant la fonction logistique (sigmoïde), transformant ainsi une combinaison linéaire des variables indépendantes en une probabilité comprise entre 0 et 1 afin de résoudre des problèmes de classification binaire.

Pour les problèmes de classification multiclasse, la régression logistique multinomiale étend la régression logistique binaire pour prédire la probabilité d'appartenance à chacune des classes possibles en utilisant la fonction softmax pour assurer que les probabilités prédictives totalisent l'unité.

> Dans le cadre des modèles de régression, plusieurs terminologies sont utilisées pour indiquer la même chose. Nous ouvrons une parenthèse ici pour les définir clairement.
> - **Variable indépendante** (*independent variable*) : également appelée variable explicative (*explanatory variable*) ou variable prédictive (*predictor variable*) ou variable caractéristique (*feature*), c'est une variable utilisée pour expliquer ou prédire la variable dépendante. Les variables indépendantes fournissent les informations nécessaires pour modéliser et comprendre les variations de la variable cible.
> - **Variable dépendante** (*dependent variable*) : également appelée variable expliquée (*explained variable*), variable de réponse (*response variable*) ou variable cible (*target variable*), c'est la variable que l'on cherche à prédire ou à expliquer via un modèle de régression. Elle est dite dépendante, car sa valeur dépend des variables indépendantes.

## 2.1 Régression linéaire

Un modèle de régression linéaire est un modèle d'apprentissage machine supervisé dans lequel la variable cible, notée y, est quantitative continue. Ce modèle effectue des prédictions en calculant une somme pondérée des variables indépendantes, à laquelle est ajouté un terme constant, également appelé ordonnée à l'origine ou biais (en anglais, *intercept*).

L'équation de prédiction pour un modèle de régression linéaire est la suivante :

```
ŷ = θ0 + θ1·x1 + θ2·x2 + ... + θn·xn                    (2.1)
```

Dans cette équation :
- ŷ désigne la valeur prédite par le modèle (la valeur réelle observée étant y).
- n est le nombre de variables.
- xi, pour i = 1...n, est la i-ème variable du vecteur des variables indépendantes x = (x1, ..., xn). À ces valeurs, nous ajoutons x0 qui est toujours égal à 1. Cette convention est utilisée pour inclure le biais dans les modèles de régression linéaire.

Nous attirons votre attention sur la notation utilisée. Chaque vecteur x^(i) est indexé avec un exposant i qui fait référence à l'observation (ou individu) i. Ses composantes sont notées x_j^(i) où j ∈ {1, ..., n} désigne la j-ème variable caractéristique. Ainsi, x_j^(i) représente la valeur de la j-ème caractéristique pour l'observation i. En revanche, la variable cible y_i est un scalaire. Par convention, l'indice de l'observation est noté en indice (et non en exposant), ce qui reflète sa nature unidimensionnelle. Cette notation permet de conserver une correspondance explicite entre chaque observation x^(i) et sa réponse y_i, tout en respectant la distinction entre vecteurs et scalaires.

Dans le cas où il n'y a qu'une seule variable indépendante x1, les équations se simplifient et deviennent :

```
ŷ1 = θ0 + θ1·x1^(1)
ŷ2 = θ0 + θ1·x1^(2)
...
ŷm = θ0 + θ1·x1^(m)                                     (2.4)
```

**Figure 2.1** — Droite de régression dans le cas d'une seule variable explicative x1 qui permet de prédire une variable cible ŷ. Les points en vert représentent les valeurs réelles (valeurs observées) de la variable y et les points en bleu les valeurs prédites de la variable y. *(figure non reproduite)*

L'équation (2.1) peut être écrite d'une manière plus concise où les paramètres du modèle sont représentés sous une forme vectorielle :

```
ŷ = hθ(x) = θ · x                                       (2.5)
```

> Dans l'équation (2.5), ŷ = θ·x, nous avons un produit scalaire entre deux vecteurs (θ et x). Comme le produit scalaire est commutatif (θ·x = x·θ), l'ordre des termes n'a pas d'importance, tant que leurs dimensions sont compatibles.
> Dans l'équation (2.7), ŷ = X·θ, nous avons un produit matriciel entre une matrice X et un vecteur θ. Contrairement au produit scalaire, le produit matriciel n'est pas commutatif, c'est-à-dire que X·θ ≠ θ·X en général. L'ordre est donc important pour assurer la compatibilité des dimensions. D'où la différence d'ordre entre l'équation (2.5) et l'équation (2.7).

L'entraînement du modèle de régression consiste à déterminer les paramètres optimaux du vecteur θ afin de minimiser l'écart entre les valeurs prédites par le modèle et les valeurs réelles des données d'entraînement. Pour formaliser cette idée, nous définissons une fonction de coût (en anglais, *cost function*), qui quantifie l'erreur commise par le modèle. La fonction de coût dépend de plusieurs éléments, notamment du modèle utilisé et du choix de la métrique d'évaluation (voir la section 2.1.4).

L'entraînement d'un modèle de régression peut être fait selon deux approches différentes :
- La **méthode analytique** permet de calculer directement les paramètres optimaux du modèle sans passer par une procédure itérative. Elle repose sur des formulations mathématiques fermées, telles que l'équation normale ou la décomposition en valeurs singulières, pour dériver les coefficients en une seule étape.
- La **méthode itérative** consiste à ajuster progressivement les paramètres du modèle au cours d'un processus d'optimisation, dans le but d'obtenir une solution proche des paramètres optimaux. Elle repose généralement sur des algorithmes d'optimisation numérique, tels que la descente de gradient ou ses variantes. Contrairement aux méthodes analytiques, cette approche ne fournit pas de solution fermée, mais converge vers un optimum à travers un nombre potentiellement élevé d'itérations.

### 2.1.2 Méthode analytique

Afin de déterminer la valeur du vecteur θ qui minimise la fonction de coût, il existe une solution analytique, c'est-à-dire une formule mathématique qui donne directement les paramètres optimaux. Parmi les méthodes disponibles, deux approches sont particulièrement répandues : l'équation normale et la décomposition en valeurs singulières (SVD).

La fonction de coût la plus courante est l'erreur quadratique moyenne donnée par :

```
J(θ) = (1/m) · ‖y − Xθ‖²                                (2.8)
```

**1. Équation normale**

Partant de l'objectif de minimisation de la fonction de coût définie dans l'équation (2.8), la dérivation de cette fonction par rapport aux paramètres du modèle, suivie de l'annulation de la dérivée obtenue, conduit à une solution analytique connue sous le nom d'équation normale.

**Figure 2.2** — (a) Un ensemble de données originales y = 2 + 3x et (b) un ensemble de données bruitées ou données réelles y = 2 + 3x + bruit. *(figure non reproduite)*

L'objectif est de déterminer le modèle de régression linéaire qui passe le mieux par l'ensemble des données bruitées fournies pour l'entraînement. Autrement dit, il s'agit de déterminer les paramètres θ0 et θ1 du modèle qui s'ajustent au mieux aux données d'entraînement. Pour ce faire, nous utilisons la fonction `linalg.inv` de la bibliothèque NumPy qui calcule l'inverse d'une matrice (voir l'extrait de code 2.2).

**Extrait de code 2.2** — Méthode analytique par équation normale.
```python
# Ajout de x0 = 1 à chaque observation (pour inclure le biais)
X_b = np.c_[np.ones((m, 1)), X]  # Ajout de la colonne de 1 pour le biais

# Implémentation de l'équation normale
# Formule : theta = (X_b^T * X_b)^(-1) * X_b^T * y
theta_hat = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

# S'assurer que theta_hat est un vecteur 1D pour éviter les erreurs d'affichage
theta_hat = theta_hat.ravel()
```

> Dans l'optimisation des modèles de régression linéaire, l'ajout d'un vecteur unitaire (ou terme biais, parfois appelé *intercept*) est une étape importante. Certaines bibliothèques ajoutent automatiquement un vecteur unitaire, donc vous n'avez pas besoin de le faire manuellement. Par exemple, le régresseur `LinearRegression()` de la bibliothèque scikit-learn inclut, par défaut, un terme de biais. Par contre, la classe `sm.OLS` du module Statsmodels n'inclut pas de vecteur unitaire. Vous devez donc ajouter une colonne de 1 manuellement à votre matrice de données. Ne pas ajouter la colonne de 1 force l'intercept à être nul, ce qui peut empêcher le modèle de capturer la composante constante de la relation et ainsi dégrader ses performances.

**Extrait de code 2.3** — Calcul de l'erreur absolue et de l'erreur relative des paramètres du modèle de régression.
```python
from sklearn.metrics import r2_score

# Erreur absolue
error_abs = np.abs(theta_hat - theta_true)

# Erreur relative (en %)
error_rel = np.abs((theta_hat - theta_true) / theta_true) * 100

# Calcul du coefficient de détermination R2
y_pred = X_b.dot(theta_hat.reshape(-1, 1))
r2 = r2_score(y_true, y_pred)
```

Les erreurs obtenues indiquent que les paramètres estimés par l'équation normale sont relativement proches, mais présentent tout de même un écart non négligeable, en particulier pour la pente. Pour θ0, l'erreur absolue `error_abs` est de 0.215, ce qui correspond à une erreur relative `error_rel` de 10.75 %. Cette valeur demeure raisonnable et indique une estimation modérément fidèle. En revanche, pour θ1, l'erreur absolue `error_abs` est plus élevée (0.460) et l'erreur relative `error_rel` atteint 15.33 %, ce qui suggère un écart significatif par rapport à la valeur réelle du paramètre. La valeur de R² de 0.4121 indique que le modèle est partiellement explicatif, mais avec une capacité limitée à prédire précisément les valeurs de la variable dépendante. Ce coefficient vient appuyer les erreurs absolues et relatives.

Ces écarts peuvent s'expliquer par la présence de bruit aléatoire dans les données, introduit par `np.random.randn`, qui simule une variabilité non déterministe typique des phénomènes réels. Ce bruit perturbe la relation linéaire idéale entre les variables, ce qui limite la capacité du modèle à ajuster parfaitement les observations et se traduit par une diminution du coefficient de détermination.

| Paramètre | Erreur absolue | Erreur relative (%) |
|---|---|---|
| θ0 (biais) | 0.215096 | 10.75 |
| θ1 (pente) | 0.459773 | 15.33 |

Coefficient de détermination R² = 0.4121

L'équation normale constitue une solution simple à mettre en œuvre et efficace pour des matrices de petite taille. Toutefois, elle présente une limite importante liée à son instabilité numérique lorsque la matrice XᵀX est proche d'être singulière.

**Extrait de code 2.4** — Méthode analytique par décomposition en valeurs singulières.
```python
from sklearn.linear_model import LinearRegression

# Initialisation du modèle
lin_reg = LinearRegression()

# Entraînement du modèle sur les données d'entrée X et les cibles y
lin_reg.fit(X, y)

# Extraction des valeurs des paramètres du modèle
intercept = lin_reg.intercept_.item()
coef = lin_reg.coef_.flatten()[0]
```

L'implémentation de l'équation normale en utilisant `LinearRegression` donne le même résultat obtenu avec l'équation normale, soit θ0 = 2.21 et θ1 = 2.54.

Résultats de la régression linéaire avec `LinearRegression` :

| Paramètre | Valeur |
|---|---|
| Intercept (biais) | 2.215096 |
| Coefficient (pente) | 2.540227 |

L'équation de la droite ajustée est : y = 2.215096 + 2.540227 × x

En résumé, bien que les conditions d'optimalité soient satisfaites, l'entraînement d'un modèle de régression linéaire fondé sur l'approche analytique présente certaines limites pratiques. En effet, la solution fournie par l'équation normale nécessite le calcul de l'inverse de la matrice XᵀX, qui est de taille (n+1) × (n+1) lorsque le terme biais est inclus (avec n le nombre de variables explicatives). L'inversion d'une telle matrice a une complexité algorithmique de l'ordre de O(n³), ce qui peut rapidement devenir coûteux en temps de calcul lorsque le nombre de variables est élevé. De plus, cette approche est sensible à la multicolinéarité qui rend l'inversion matricielle instable ou impossible.

Pour pallier ces limitations, une approche plus robuste fondée sur la décomposition en valeurs singulières a été proposée dans la littérature. Cette méthode consiste à factoriser la matrice de données sous la forme X = UΣVᵀ, où U et V sont des matrices orthogonales, et Σ est une matrice diagonale contenant les valeurs singulières. L'avantage principal de cette approche est qu'elle permet de calculer la pseudo-inverse sans nécessiter l'inversion explicite de XᵀX. Cette méthode présente une meilleure stabilité numérique et est particulièrement efficace en présence de données redondantes ou de dimensions élevées.

### 2.1.3 Méthode itérative — descente de gradient

Cet exemple illustre parfaitement la méthodologie adoptée par la descente de gradient, qui nous permet de trouver le chemin le plus rapide vers les valeurs optimales des coefficients θ, en prenant de petits pas successifs dans la direction de la pente la plus forte. L'algorithme commence avec une valeur initiale de coefficient θ. À chaque étape, il évalue la pente qui est donnée par le gradient de la fonction de coût (figure 2.5).

**Figure 2.5** — Principe de l'algorithme de descente de gradient : l'algorithme commence avec une valeur initiale du coefficient θ en vue de converger vers une valeur optimale θ*. *(figure non reproduite)*

Le gradient indique dans quelle direction et de combien ajuster le coefficient pour réduire le coût. La taille de ce pas est déterminée par un hyperparamètre appelé le taux d'apprentissage ou pas d'apprentissage (*learning rate*). Ce processus est répété jusqu'à ce qu'un point soit atteint où les changements dans la fonction de coût deviennent très petits.

**Figure 2.6** — Pas d'apprentissage dans l'algorithme de descente de gradient : (a) un pas trop petit, l'algorithme effectue un grand nombre d'itérations pour converger et (b) un pas très élevé, l'algorithme risque de dépasser le point le plus bas et de se retrouver de l'autre côté de la valeur optimale. *(figure non reproduite)*

Ces méthodes permettent d'identifier un taux d'apprentissage approprié qui assure une convergence rapide tout en évitant l'instabilité numérique ou la stagnation du modèle. Elles ne sont d'ailleurs pas spécifiques aux tâches de régression ; elles s'appliquent à tout autre problème optimisé par descente de gradient.

### 2.1.4 Fonction de coût

L'entraînement d'un modèle de régression consiste à définir ses paramètres de manière à ce que le modèle s'ajuste au mieux aux données d'entraînement. Cela nécessite une mesure de performance pour évaluer à quel point le modèle s'adapte correctement. Dans la pratique, nous utilisons généralement une mesure de l'erreur commise par le modèle sur l'ensemble des données d'entraînement, que nous appelons fonction de coût (*loss function*) et que nous notons J.

Pour les modèles de régression, il existe différentes fonctions de coût possibles, J(θ). Le paramètre θ est ajouté à la fonction J pour souligner la dépendance du coût à θ. La fonction de coût permet de mesurer l'erreur globale du modèle sur l'ensemble des données d'entraînement. Elle prend en considération les valeurs prédites par le modèle et les valeurs réelles, puis calcule l'erreur ou la perte totale.

La fonction de coût la plus couramment utilisée pour la régression linéaire est l'erreur quadratique moyenne. Cependant, d'autres fonctions de coût peuvent être utilisées en fonction des besoins spécifiques du modèle et des données. Dans tous les cas, l'objectif de l'entraînement reste le même : il s'agit de minimiser la fonction de perte globale en considérant toutes les observations et de faire en sorte que la valeur prédite de la variable cible (notée ŷi) se rapproche le plus possible de la variable cible réelle (notée yi).

Soient :
- x^(i) le vecteur des caractéristiques de l'individu i.
- hθ la fonction hypothèse utilisant les paramètres θ du modèle. Rappelons que selon l'équation (2.5), ŷ est remplacée par hθ(x) pour souligner la dépendance avec les paramètres du vecteur θ.
- m le nombre d'observations dans l'ensemble de données.
- y^(i), pour i = 1 à m, la valeur observée de la variable cible.

**Erreur quadratique moyenne (MSE)**

L'erreur quadratique moyenne (*Mean Squared Error*, MSE) calcule la moyenne des carrés des écarts entre les prédictions et les valeurs réelles :

```
J(θ) = (1/m) · Σ (hθ(x^(i)) − y^(i))²                   (2.12)
```

L'erreur quadratique moyenne (MSE) est simplement le carré de la RMSE (*Root Mean Squared Error*). Or, en pratique, il est plus simple et plus rapide de minimiser l'erreur quadratique moyenne que sa racine carrée, soit la RMSE. De plus, le paramètre θ qui minimise la RMSE minimise également la MSE en raison de la relation mathématique directe entre RMSE et MSE. Cela signifie que la RMSE et la MSE sont des mesures de l'erreur du modèle, mais à des échelles différentes (la RMSE est à la même échelle que les erreurs, tandis que la MSE est à l'échelle des carrés des erreurs).

Lorsqu'on minimise la MSE, nous cherchons à trouver le paramètre θ qui minimise la somme des carrés des erreurs. Puisque la RMSE est une transformation monotone de la MSE, minimiser la RMSE revient à minimiser la MSE. En d'autres termes, le même paramètre θ qui minimise la MSE minimise également la RMSE, car la transformation racine carrée ne change pas la position du minimum.

Un autre aspect à mentionner de l'équation (2.12) est la présence d'un facteur ½ qui est souvent utilisé pour simplifier les dérivées lors de l'optimisation par la descente de gradient. En effet, la dérivée d'un carré (x²)' = 2x. Le facteur 2 se simplifie avec ce coefficient, comme nous allons le voir dans l'équation (2.18).

> Il est important de souligner que l'équation normale ne s'applique que dans le cas où la fonction de coût est l'erreur quadratique moyenne (MSE). Si nous choisissons une autre fonction de perte, par exemple l'erreur absolue moyenne (MAE), l'erreur de Huber ou la log-loss, alors la solution analytique fournie par l'équation normale n'est plus valide. En effet, ces fonctions de coût ne sont généralement pas différentiables partout ou ne mènent pas à une forme quadratique. Par conséquent, il devient nécessaire de recourir à des méthodes numériques d'optimisation telles que la descente de gradient, les moindres carrés pondérés itératifs, ou d'autres algorithmes itératifs adaptés à la nature spécifique de la fonction de perte choisie.

### 2.1.5 Variantes de la descente de gradient

Il existe plusieurs variantes de la descente de gradient, chacune ayant ses avantages et ses inconvénients en fonction du problème spécifique que nous devons résoudre.

**Descente de gradient ordinaire**

Rappelons que notre objectif est de trouver le vecteur θ qui minimise la MSE :

```
J(θ) = MSE(θ) = (1/m) · Σ (hθ(x^(i)) − y^(i))²
```

La descente de gradient ordinaire, également appelée descente de gradient par lot complet (*batch gradient descent* ou *full gradient descent*), est une méthode d'optimisation qui utilise l'ensemble complet des données d'entraînement à chaque itération pour calculer le gradient.

η étant le taux d'apprentissage, c'est-à-dire le facteur de multiplication du vecteur gradient pour fixer le pas de progression. Dans cette équation, nous soustrayons un multiple du gradient (donné par η × ∇θMSE(θ)) pour nous rapprocher du minimum de la fonction de coût. Autrement dit, nous modifions les paramètres θ dans la direction qui réduit le plus rapidement l'erreur de prédiction. L'ampleur du changement est contrôlée par le taux d'apprentissage η.

> **Exemple 2.3** — Dans cet exemple, nous continuons avec les données générées précédemment pour déterminer les paramètres optimaux θ selon l'algorithme de descente de gradient. La première étape consiste à initialiser les valeurs des hyperparamètres de la descente de gradient et des paramètres θ (voir l'extrait de code 2.5).

**Extrait de code 2.5** — Initialisation des paramètres et des hyperparamètres pour une descente de gradient.
```python
np.random.seed(42)

# Hyperparamètres de la descente de gradient
learning_rate = 0.1   # Taux d'apprentissage
n_iterations = 100    # Nombre d'itérations

# Paramètres (theta_0 et theta_1)
theta = np.random.randn(2, 1)
```

À chaque itération, la fonction `gradient_descent` décrite dans l'extrait de code 2.6 calcule le gradient des paramètres selon l'équation (2.19) et ajuste les paramètres θ selon l'équation (2.18).

**Extrait de code 2.6** — Mise à jour des paramètres θ par descente de gradient ordinaire.
```python
for iteration in range(n_iterations):
    gradients = 2/m * X_b.T.dot(X_b.dot(theta) - y)
    theta = theta - learning_rate * gradients
```

Après 100 itérations et avec un pas d'apprentissage η = 0.1, les valeurs obtenues sont moins proches des coefficients obtenus en utilisant l'approche analytique, mais demeurent intéressantes.

Résultats après 100 itérations de descente de gradient :

| Paramètre | Valeur |
|---|---|
| θ0 (intercept) | 2.390256 |
| θ1 (pente) | 2.194057 |

L'équation de la droite de régression est : y = 2.390256 + 2.194057 × x

**Figure 2.8** — Impact de la valeur de η sur la convergence de l'algorithme de descente de gradient : (a) η = 0.01 est trop faible, (b) η = 0.1 est convenable et (c) η = 0.8 est trop grand. *(figure non reproduite)*

Vous pouvez remarquer que si la valeur de η est trop faible (η = 0.01), la convergence vers l'optimum est lente. Les mises à jour des poids du modèle sont minimes, ce qui conduit à une progression très graduelle. Cela se traduit par des droites de régression qui évoluent à peine, rendant l'entraînement inefficace.

Dans le cas où η = 0.1, la convergence est stable et rapide vers l'optimum. La droite de régression s'ajuste correctement en quelques itérations, sans oscillations ni stagnation. Cet ordre de grandeur de η est un bon choix pour une descente de gradient efficace.

En revanche, si la valeur de η est trop élevée (η = 0.8), l'algorithme peut diverger : des oscillations importantes apparaissent autour de l'optimum. La droite de régression ne converge pas correctement et peut dépasser la solution optimale, rendant l'entraînement instable. Dans un tel cas, il est nécessaire de diminuer la valeur de η pour rendre le taux d'apprentissage plus petit et stabiliser la convergence.

La descente de gradient est un algorithme itératif. Le choix du nombre d'itérations N est donc important. Si N est trop faible, nous serons très loin de la solution optimale lorsque l'algorithme s'arrêtera. Par contre, si N est trop élevé, nous perdrons du temps alors que les paramètres du modèle n'évolueront plus.

**Descente de gradient stochastique**

**Extrait de code 2.8** — Descente de gradient stochastique basée sur `SGDRegressor`.
```python
from sklearn.linear_model import SGDRegressor

sgd_reg = SGDRegressor(max_iter=1000, tol=1e-3, penalty=None, eta0=0.1, random_state=42)
sgd_reg.fit(X, y.ravel())
sgd_reg.intercept_, sgd_reg.coef_
```

Après 100 itérations et avec un pas d'apprentissage η = 0.1, les valeurs des paramètres obtenues sont θ0 = 2.3456 et θ1 = 2.3882. Ces valeurs sont proches des coefficients obtenus avec la descente de gradient ordinaire (θ0 = 2.39 et θ1 = 2.19).

Résultats après 100 itérations de SGD :

| Paramètre | Valeur |
|---|---|
| θ0 (intercept) | 2.3456 |
| θ1 (pente) | 2.3882 |

L'équation de la droite ajustée est : y = 2.3456 + 2.3882 × x

**Extrait de code 2.9** — Implémentation de la fonction de descente de gradient stochastique.
```python
def stochastic_gradient_descent(X, y, theta, learning_rate, n_iterations, random_state=None):
    m = len(X)
    rng = np.random.RandomState(random_state)

    for iteration in range(n_iterations):
        indices = rng.permutation(m)
        X_shuffled = X[indices]
        y_shuffled = y[indices]

        for i in range(m):
            xi = X_shuffled[i:i+1]   # Sélectionner une ligne
            yi = y_shuffled[i:i+1]   # Sélectionner sa sortie

            # Calcul du gradient et mise à jour des paramètres
            gradients = xi.T.dot(xi.dot(theta) - yi) / m
            theta = theta - learning_rate * gradients
    return theta
```

**Descente de gradient par mini-lots**

**Extrait de code 2.10** — Implémentation de la fonction de descente de gradient par mini-lots.
```python
def mini_batch_gradient_descent(X, y, theta, learning_rate, n_iterations, batch_size, random_state=None):
    m = len(X)
    rng = np.random.RandomState(random_state)

    for iteration in range(n_iterations):
        # Mélanger les données au début de chaque époque
        indices = rng.permutation(m)
        X_shuffled = X[indices]
        y_shuffled = y[indices]

        # Parcourir les données par mini-lots
        for i in range(0, m, batch_size):
            X_batch = X_shuffled[i:i+batch_size]
            y_batch = y_shuffled[i:i+batch_size]

            # Calculer le gradient pour le mini-lot et mise à jour
            gradients = X_batch.T.dot(X_batch.dot(theta) - y_batch) / batch_size
            theta = theta - learning_rate * gradients
    return theta
```

La progression de l'algorithme dans l'espace des paramètres est moins désordonnée que dans le cas de la descente de gradient stochastique. De ce fait, la descente de gradient par mini-lots aboutit à une solution un peu plus proche du minimum qu'une descente de gradient stochastique.

## 2.2 Régression polynomiale

La régression polynomiale est une extension de la régression linéaire qui permet de modéliser la relation entre une variable dépendante et une ou plusieurs variables indépendantes en utilisant une équation polynomiale. Elle est particulièrement utile lorsque la relation entre les variables n'est pas linéaire.

### 2.2.1 Transformation des variables

La régression polynomiale généralise la régression linéaire en incluant des termes de puissance supérieure des variables indépendantes.

Formellement, si nous disposons d'une seule variable indépendante x, la relation entre la variable dépendante y et la variable indépendante x est modélisée par une équation polynomiale. Pour un polynôme de degré p, le modèle s'écrit :

```
y = θ0 + θ1·x + θ2·x² + θ3·x³ + ... + θp·x^p            (2.21)
```

L'ajout de méthodes de régularisation telles que la régularisation Lasso ou Ridge permet d'ajouter une pénalité aux coefficients de régression pour éviter des valeurs excessivement grandes, améliorant ainsi la stabilité et la généralisation du modèle. Ces méthodes feront l'objet de la section 4.4.2 du chapitre 4.

> **Exemple 2.6** — Dans cet exemple, nous allons générer un ensemble de 100 points de données aléatoires qui suivent une relation quadratique. À ces données, nous ajoutons un bruit gaussien à l'aide de la fonction `np.random.randn(100, 1)`.

L'extrait de code 2.11 génère une série de caractéristiques X aléatoires réparties uniformément entre −3 et 3. Pour chaque individu du vecteur X, la valeur de la variable cible y0 est calculée en utilisant une relation quadratique : y0 = 2 + x + 0.5·x², représentant des données idéales sans bruit. Cette relation est déterministe et représente une fonction polynomiale de degré 2. Par la suite, du bruit gaussien est ajouté pour générer y, une version bruitée des données générées, rendant les données plus réalistes.

**Extrait de code 2.11** — Génération de données polynomiales.
```python
np.random.seed(42)
m = 100
X = 6 * np.random.rand(m, 1) - 3
y_0 = 0.5 * X**2 + X + 2                          # Données originales
y = 0.5 * X**2 + X + 2 + np.random.randn(m, 1)    # Données bruitées
```

**Figure 2.9** — Un ensemble de données (a) y = 0.5X² + X + 2 (données originales) et (b) y = 0.5X² + X + 2 + bruit (données bruitées ou données réelles). *(figure non reproduite)*

La classe `PolynomialFeatures(degree=2, include_bias=False)` permet de transformer les caractéristiques d'entrée en leurs puissances jusqu'au degré spécifié.

Paramètres du modèle de régression linéaire obtenus :

| Paramètre | Valeur |
|---|---|
| Ordonnée à l'origine (intercept) | 1.7813 |
| Coefficient 1 | 0.9337 |
| Coefficient 2 | 0.5646 |

Ces valeurs sont proches des valeurs qui ont servi à générer le nuage de points aléatoires, soit y = 2 + x + 0.5·x², sachant que ces points ont été perturbés par un bruit gaussien.

**Figure 2.10** — Un ensemble de données y = 2 + x + 0.5·x² + bruit. En magenta, le modèle de régression polynomiale obtenu. *(figure non reproduite)*

Nous pouvons également diminuer ou augmenter le degré p du polynôme. Pour une puissance nulle, nous obtenons un modèle de régression linéaire : le modèle est sous-ajusté puisqu'il ne parvient pas à capturer la courbure des données et ne suit pas la tendance non linéaire inhérente à celles-ci, ce qui se traduit par des résidus importants et une faible précision des prédictions. À l'inverse, pour une puissance de p = 30, le modèle devient plus complexe pour suivre les points de données d'entraînement, mais cela conduit à un sur-ajustement, où le modèle capture également le bruit et les variations aléatoires des données d'entraînement.

## 2.3 Régression logistique

```
p = hθ(x) = σ(xᵀθ)                                      (2.24)
```

La régression logistique permet de prédire la probabilité d'une variable binaire. Le modèle prend la forme suivante :

```
P(y=1 | x) = σ(xᵀθ)                                     (2.25)
```

Dans cette équation :
- xᵀθ est la combinaison linéaire pondérée des variables.
- y est la valeur observée de la variable binaire.

Autrement dit, le modèle de régression logistique permet d'estimer la probabilité qu'une observation décrite par le vecteur de caractéristiques x appartienne à la classe positive (y = 1) via la valeur de probabilité calculée selon l'équation (2.25).

**Figure 2.12** — La fonction logistique : un cas particulier de fonction sigmoïde qui permet de modéliser des probabilités dans les modèles de classification binaire. *(figure non reproduite)*

> Faisons un petit rappel sur la probabilité conditionnelle. Soit X la variable d'entrée. P(y=1 | X) est la probabilité conditionnelle que la variable cible y prenne la valeur 1, étant données les caractéristiques X. Cette équation se lit « la probabilité que y soit égale à 1, sachant X ». Son but est de prévoir la probabilité de la classe 1 en fonction des entrées X.
> Dans un premier temps, on établit une relation linéaire entre X et un score linéaire ou *logit* t : t = θ0 + θ1·X. Cependant, ce score t peut varier sur une plage infinie (−∞ à +∞), alors qu'une probabilité doit être comprise entre 0 et 1. Pour convertir t en une probabilité P(y=1 | X), on applique la fonction sigmoïde σ(t) : P(y=1 | X) = σ(t) = 1 / (1 + e^(−t)).

Comme la régression logistique modélise des probabilités, nous utiliserons la fonction de vraisemblance qui permet de mesurer à quel point les paramètres d'un modèle expliquent bien les données observées. Pour un ensemble de données avec m observations, la vraisemblance L(θ) est le produit des probabilités de chaque observation :

```
L(θ) = Π P(yi | xi, θ)                                  (2.27)
     = Π σ(xiθ)^yi · (1 − σ(xiθ))^(1−yi)                (2.28)
```

Afin de simplifier les calculs, nous appliquons le logarithme à la fonction de vraisemblance, ce qui conduit à la log-vraisemblance :

```
log L(θ) = Σ [yi·log σ(xi,θ) + (1−yi)·log(1 − σ(xi,θ))]  (2.29-2.30)
```

Pour transformer le problème en un problème de minimisation, nous considérons le négatif de la log-vraisemblance, également appelé *logistic loss* ou *cross-entropy loss*. Ainsi, au lieu de maximiser la log-vraisemblance, nous cherchons à minimiser sa valeur opposée :

```
Logistic Loss = −log L(θ) = −Σ [yi·log σ(xi·θ) + (1−yi)·log(1−σ(xi·θ))]   (2.31-2.32)
```

En utilisant σ(xᵀθ) = ŷi, nous retrouvons l'équation de la perte logarithmique donnée par l'équation (2.26) :

```
J(θ) = −(1/m) · Σ [yi·log(ŷi) + (1−yi)·log(1−ŷi)]
```

### 2.3.2 Entraînement du modèle de régression logistique

Rappelons que l'objectif de l'entraînement est de déterminer la valeur de θ qui minimise la fonction de coût J(θ). Contrairement à la régression linéaire, il n'existe pas de solution analytique fermée pour la régression logistique.

> **Note sur un bloc source (fidélité OCR)** : le passage correspondant, dans le scan original, aux extraits de code 2.14 à 2.17 (chargement du jeu de données Iris, entraînement d'un modèle `LogisticRegression`, visualisation des probabilités prédites) a été numérisé en miroir/pivoté (page retournée lors du scan). Le texte OCR obtenu est illisible de façon fiable et n'est donc pas retranscrit ici, conformément à la règle de fidélité (aucune reconstruction inventée). **[passage OCR illisible — extraits de code 2.14 à 2.17]**

Afin de visualiser la dispersion des fleurs, l'exemple considère uniquement deux variables : la largeur des pétales (*Petal width*) en fonction de leur longueur (*Petal length*), pour les trois espèces (classes) (voir la figure 2.14).

**Figure 2.14** — Dispersion de la largeur des pétales en fonction de la longueur des pétales pour les trois espèces (Setosa, Versicolor, Virginica). Chaque point du graphique correspond à un individu (une fleur d'iris). *(figure non reproduite)*

Pour réaliser une régression logistique, qui est un modèle binaire, on considère deux classes : la classe de l'espèce Iris Virginica et la classe Non-Iris-Virginica, qui regroupe Iris Setosa et Iris Versicolor.

**Figure 2.15** — Dispersion de la largeur des pétales en fonction de la longueur des pétales après la transformation des données Iris en deux classes. *(figure non reproduite)*

**Extrait de code 2.18** — Calcul de la valeur de la variable longueur de pétale au seuil de décision.
```python
# Récupérer les paramètres du modèle de régression
theta_0 = log_reg.intercept_[0]
theta_1 = log_reg.coef_[0][0]

# Calcul de la longueur de pétale au seuil de décision
petal_length_decision_threshold = -theta_0 / theta_1
```

Nous obtenons la longueur de pétale au seuil de décision : 4.8761

## 2.4 La régression logistique multinomiale

La régression logistique multinomiale (*Multinomial Logistic Regression*) est un modèle de régression logistique généralisé. Ce modèle permet de traiter directement plusieurs classes, sans avoir à entraîner plusieurs classificateurs binaires et à les combiner par la suite.

La régression logistique multinomiale utilise la fonction softmax pour étendre la régression logistique aux problèmes de classification multiclasse (plus de deux classes), d'où l'appellation courante « régression softmax ». arg max renvoie la valeur de k qui maximise la probabilité estimée σ(s(x))k.

### 2.4.1 Fonction de coût : Entropie croisée

La fonction de coût utilisée dans la régression softmax est la perte logarithmique multinomiale, également appelée entropie croisée multiclasse. Elle est définie comme suit :

```
J(Θ) = −(1/m) · Σi Σk yk^(i)·log(pk^(i))                (2.36)
```

Dans cette équation :
- m : nombre d'observations dans l'échantillon ;
- K : nombre de classes (k ∈ {1, 2, ..., K}) ;
- yk^(i) : variable indicatrice qui vaut 1 si l'observation i appartient à la classe k, et 0 sinon ;
- pk^(i) : probabilité prédite que l'observation i appartienne à la classe k.

Cette fonction de coût mesure la divergence entre la distribution réelle des classes (représentée par les yk) et la distribution prédite (représentée par les pk). Elle généralise l'entropie croisée utilisée dans le cas binaire à des tâches de classification multiclasse (K > 2).

### 2.4.2 Entraînement de la régression softmax

L'objectif de l'entraînement est de déterminer la matrice Θ qui minimise la fonction de coût. Le vecteur gradient par rapport à θ(k) de la fonction de coût d'entropie croisée est donné par :

```
∇θ(k) J(Θ) = (1/m) · Σi (pk^(i) − yk^(i)) · x^(i)        (2.37)
```

Une fois le vecteur gradient de chaque classe déterminé, on peut utiliser la descente de gradient pour déterminer la matrice Θ.

> **Exemple 2.8** — Pour illustrer la régression logistique multinomiale, nous considérons les trois espèces différentes d'Iris (Setosa, Versicolor, Virginica) avec les deux variables Petal width et Petal length.

Nous pouvons utiliser la classe `LogisticRegression` pour effectuer une tâche de classification multiclasse. Depuis la version 1.5 de scikit-learn, le paramètre `multi_class="multinomial"` est désormais obsolète et sera supprimé à partir de la version 1.7, puisque le mode multinomial est devenu le comportement par défaut. Cette évolution simplifie l'utilisation de la régression logistique dans un contexte multiclasse.

Le paramètre `solver="lbfgs"` indique que l'algorithme d'optimisation utilisé est L-BFGS (*Limited-memory Broyden-Fletcher-Goldfarb-Shanno*), un solveur adapté à ce type de problème.

Matrice de paramètres Θ obtenue (une ligne par classe k = 0, 1, 2 ; colonnes = intercept et coefficients) :

```
       -0.561673  -2.416878  -2.155351
Θ =     1.904470   0.113933  -0.364616
       -1.342797   2.302945   2.519997
```

Chaque ligne correspond à une classe (k = 0, 1, 2) et chaque colonne correspond aux intercepts (θ0) ou aux coefficients des caractéristiques (θ1, θ2).

De la même manière que pour la régression logistique, une fois la matrice Θ déterminée, on calcule les scores linéaires (logits) pour chaque individu x, qui sont ensuite utilisés pour calculer les probabilités des classes via la fonction softmax. La classe prédite est celle ayant la probabilité maximale :

```
ŷ = arg max_k P(y=k | x)
```

où ŷ est l'indice de la ligne de Θ qui produit le score le plus élevé pour une observation donnée.

**Extrait de code 2.20** — Rapport de la régression logistique multinomiale.
```python
# Prédictions sur l'ensemble de test
y_pred = softmax_reg.predict(X_test)

# Évaluer le modèle
report = classification_report(y_test, y_pred)

# Afficher les résultats
print("\nRapport de classification:")
print(report)
```

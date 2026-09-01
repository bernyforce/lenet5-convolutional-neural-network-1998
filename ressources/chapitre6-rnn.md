---
id: livre-ap-ch6-rnn
type: chapter
scope: project
status: active
created: 2026-08-31
updated: 2026-08-31
owner: user
book: "Apprentissage profond — Théorie et applications"
book_slug: apprentissage-profond
author: "Neila Mezghani"
chapter: 6
source: ["chapters/05-ap5_260710_120250.md#L28-L3020"]
ocr_note: "Source scannée OCR (tesseract, qualité variable) ; nettoyage fidèle : dé-césure, suppression en-têtes/pieds de page répétés et bruit OCR non textuel ; aucun contenu inventé, aucune réécriture de fond. Les équations sont des transcriptions fidèles de l'OCR d'origine et peuvent comporter des imprécisions de symboles/indices dues à la qualité du scan. Les figures ne sont pas reproduites (source scannée) ; seules leurs légendes sont conservées."
language: fr
---

# Chapitre 6 — Réseaux de neurones récurrents (RNN)

Les réseaux de neurones récurrents (Recurrent Neural Networks, RNN) sont un type de réseau de neurones profonds spécialement conçu pour les données séquentielles. Ils se distinguent par leurs connexions récurrentes, qui leur offrent une « mémoire » permettant de capturer les dépendances entre les éléments successifs d'une séquence, qu'elles soient temporelles (comme dans les séries chronologiques), structurelles (comme dans le traitement du langage naturel ou l'analyse de séquences biologiques), spatiales (comme dans l'analyse de trajectoires ou la reconnaissance d'objets), ou sémantiques (comme dans la modélisation du sens dans les textes). Ces algorithmes sont largement utilisés pour résoudre des problèmes qui impliquent des données ordonnées, comme la traduction automatique, le traitement automatique du langage naturel (TALN / Natural Language Processing, NLP) et la reconnaissance vocale.

Pour mettre en contexte l'apport des RNN, nous commençons par un exemple simple qui illustre la manière avec laquelle nous traitons le langage naturel au quotidien. Considérons la phrase suivante : « Pierre, qui pêche, part demain ». Si chaque mot de cette phrase était analysé individuellement, le sens global de la phrase serait perdu, car l'interdépendance entre les mots est nécessaire pour en comprendre le sens. Par exemple, dans cette phrase, le mot « Pierre » désigne une personne (et non une petite roche), tandis que le mot « pêche » fait référence à une activité (et non à un fruit). Un réseau de neurones récurrents, grâce à sa capacité à traiter des séquences, peut capturer ces subtilités en tenant compte du contexte fourni par les mots précédents et suivants. Sa capacité à modéliser les relations séquentielles et contextuelles permet de renforcer la compréhension globale de la phrase. C'est précisément dans ce type de tâches que les RNN s'avèrent particulièrement utiles pour le traitement automatique du langage naturel.

Ce chapitre offre une présentation complète des RNN en explorant leur historique, leurs fondements théoriques et leurs principales architectures. Après une revue retraçant l'évolution des RNN, leurs rôles dans le traitement des données séquentielles sont abordés. Ensuite sont détaillées plusieurs architectures des RNN, en commençant par les réseaux récurrents simples, où des concepts fondamentaux comme les couches et cellules récurrentes, le dépliement temporel et l'entraînement sont expliqués.

Ce chapitre s'étend à d'autres architectures qui permettent une meilleure capture des dépendances complexes. Les mémoires à long court terme (Long Short-Term Memory, LSTM) sont introduites, avec un accent mis sur leurs architectures et leurs processus d'entraînement. Cela est suivi par une description des unités récurrentes fermées (Gated Recurrent Unit, GRU), une alternative simplifiée, mais efficace aux LSTM. Enfin, le chapitre aborde les réseaux récurrents bidirectionnels (Bidirectional RNN, BiRNN), qui enrichissent les RNN traditionnels en capturant les dépendances temporelles dans les deux directions.

Ce chapitre constitue ainsi une base complète pour comprendre les mécanismes, les applications et les avancées des RNN dans le traitement des données séquentielles.

## 6.1 Historique des RNN

Le concept de base des réseaux de neurones récurrents remonte aux années 1980, lorsqu'un physicien et mathématicien, John Hopfield, a introduit le réseau de Hopfield. Ce dernier repose sur une architecture de réseau capable de stocker des souvenirs sous forme d'états stables et de mémoire de manière efficace. Bien qu'il soit limité dans sa capacité à traiter des séquences temporelles complexes, le réseau de Hopfield a posé les bases des architectures récurrentes en reliant la dynamique neuronale aux systèmes de mémoire associative.

Dans les années 1990, le champ des RNN a connu des avancées significatives grâce aux travaux de Jeffrey Elman et Michael I. Jordan. Ils ont respectivement proposé les réseaux d'Elman et les réseaux de Jordan, deux architectures spécifiques de RNN. Le premier intègre une couche de mémoire, appelée couche contextuelle, où l'information sur les états passés peut être retenue. Le deuxième, le réseau de Jordan, utilise les sorties comme entrées pour les états suivants. En d'autres termes, ces réseaux permettent d'ajouter une dimension de rétroaction. Ces modèles se sont montrés efficaces pour des tâches impliquant des dépendances temporelles, comme la prédiction de séquences ou l'analyse des séries chronologiques. Cependant, ils présentaient une limitation majeure reliée au problème de disparition du gradient. Ce problème se manifeste par une incapacité des réseaux à apprendre des dépendances longues dans les données, en raison de l'atténuation ou de l'explosion des gradients lors de l'entraînement par rétropropagation à travers le temps (BackPropagation Through Time, BPTT) (que nous détaillons à la section 6.4.4).

Pour surmonter ce problème, en 1997, Sepp Hochreiter et Jürgen Schmidhuber ont proposé des unités de mémoire à long court terme (LSTM). Ces unités, que nous détaillons à la section 6.5, intègrent des cellules mémoires et des portes (d'entrée, d'oubli et de sortie) qui permettent de moduler le flux d'information à chaque étape temporelle. Elles ont la capacité de gérer très efficacement les longues dépendances dans les séquences. Bien qu'elles soient complexes, les LSTM ont eu un succès notable et ont révolutionné les architectures RNN. Pour une simplification architecturale, des versions simplifiées des LSTM comme les unités récurrentes à porte (GRU) ont été introduites (décrites à la section 6.6). Les GRU conservent les avantages des LSTM tout en réduisant le nombre de paramètres, ce qui les rend plus légers et plus rapides à entraîner. Avant l'apparition des GRU, les RNN bidirectionnels (BiRNN) avaient été proposés par Schuster et Paliwal (1997). Contrairement aux RNN standard, les réseaux BiRNN, que nous détaillons à la section 6.7, traitent l'information dans les deux directions temporelles, permettant une meilleure capture du contexte dans les tâches séquentielles comme le traitement du langage naturel et la reconnaissance vocale.

Grâce à ces avancées, les réseaux de neurones récurrents (RNN) et leurs variantes, telles que les LSTM, GRU et BiRNN, sont devenus des outils incontournables pour traiter des tâches complexes impliquant des données séquentielles. Ils sont aujourd'hui largement utilisés dans des domaines tels que le traitement automatique du langage naturel, où ils permettent d'accomplir des tâches telles que la génération de texte, l'analyse de sentiments et la traduction automatique. Au-delà du langage, ces architectures sont également employées dans la reconnaissance vocale, le traitement du signal audio et l'analyse de séries temporelles dans le domaine de la finance, la santé ou l'industrie. Bien qu'efficaces, ces réseaux continuent d'évoluer, notamment avec l'émergence des transformateurs, une architecture qui dépasse les limites des modèles séquentiels traditionnels.

## 6.2 Données séquentielles

Les données séquentielles sont des données dans lesquelles l'ordre des éléments joue un rôle essentiel. Contrairement aux données tabulaires ou structurées classiques (voir la section 1.1.3), dans lesquelles chaque individu est représenté par un vecteur de caractéristiques et traité indépendamment, les données séquentielles présentent des dépendances temporelles ou logiques entre les caractéristiques.

### 6.2.1 Types de données séquentielles

Les données séquentielles peuvent être classifiées selon leur nature et leur domaine d'application, parmi lesquels nous distinguons :

**Données temporelles.** Les séries temporelles sont un type particulier de données séquentielles, caractérisé par des observations enregistrées à des intervalles de temps réguliers ou irréguliers. Elles sont largement utilisées dans divers domaines, notamment dans les séries chronologiques économiques et financières (par exemple pour représenter les variations des prix des actions ou les variations des volumes des transactions), les données environnementales (telles que les mesures de température, de précipitations ou de la qualité de l'air), ainsi que les données biomédicales (comme les électrocardiogrammes (ECG) ou les électroencéphalogrammes (EEG)). Ces données se distinguent par leur structure temporelle, où l'ordre des observations et les relations entre les points dans le temps jouent un rôle important dans leur analyse et leur modélisation.

> Bien que les termes données temporelles et séries temporelles soient parfois utilisés de manière interchangeable, une distinction entre les deux termes s'impose. Les séries temporelles constituent un cas particulier de données temporelles, caractérisées par une régularité et une structure ordonnée dans le temps. À l'inverse, les données temporelles englobent un éventail plus large de formats qui peut être régulier ou non.
> Par exemple, un ECG est une série temporelle, car il s'agit d'une séquence ordonnée et continue d'observations à intervalles réguliers, permettant une analyse basée sur les caractéristiques de sa forme d'onde dans le temps. En revanche, les journaux informatiques (computer logs) sont des événements horodatés qui surviennent de manière irrégulière, leur séquence étant dictée par les actions ou événements du système.

**Données textuelles.** Les données textuelles ou linguistiques désignent des données séquentielles constituées de suites ordonnées de mots ou de caractères. Elles sont au cœur du traitement automatique du langage naturel (TALN ou NLP). Le NLP englobe un large éventail d'applications, telles que la traduction automatique, la génération de texte, l'analyse de sentiments, ou encore le résumé automatique, qui exploitent ces données afin d'en extraire du sens et de résoudre des tâches linguistiques complexes.

Par ailleurs, les données textuelles occupent une place essentielle dans le domaine de la reconnaissance vocale, où elles interviennent lors de la conversion de la parole en texte. Cette capacité ouvre la voie à de nombreuses applications avancées, notamment les assistants vocaux, la transcription automatique de discours, ou encore les interfaces homme-machine basées sur la voix.

**Données biologiques.** Dans les sciences de la vie, les données séquentielles les plus connues sont les séquences génétiques ou protéiques, qui décrivent respectivement l'ordre précis des nucléotides dans l'ADN ou des acides aminés dans les protéines. Ces données jouent un rôle important dans diverses applications, telles que l'alignement de séquences, une méthode permettant d'identifier des similitudes évolutives entre différentes espèces ou individus, et d'étudier les relations phylogénétiques.

Les données biologiques sont également au centre de la prédiction des structures protéiques, qui vise à déterminer la configuration tridimensionnelle des protéines à partir de leur séquence d'acides aminés. Cette configuration est essentielle pour comprendre la fonction biologique des protéines, concevoir des médicaments ciblés et explorer les mécanismes moléculaires responsables de diverses maladies.

**Données spatiales.** Les données spatiales, telles que les données GPS (Global Positioning System), les déplacements d'objets mobiles (véhicules, piétons, animaux) ou les trajectoires de drones et de robots, constituent un type particulier de données séquentielles qui combinent à la fois des dimensions spatiales (latitude, longitude, altitude) et temporelles (horodatage, vitesse, accélération). Ces données sont caractérisées par une forte dépendance entre les positions successives, ce qui nécessite des modèles capables de capturer à la fois l'évolution dans le temps et la dynamique du mouvement dans l'espace. Elles sont couramment utilisées dans des applications telles que la navigation, la détection d'anomalies dans les trajectoires, l'analyse du comportement humain et la modélisation du trafic.

> Dans ce chapitre, l'accent sera principalement mis sur les séries temporelles dans les exemples. Ce choix se justifie par plusieurs raisons pédagogiques, techniques et pratiques : (1) les séries temporelles, comme les données météorologiques ou boursières, présentent une structure naturelle et intuitive où chaque observation dépend des valeurs précédentes — cela reflète directement le fonctionnement des RNN, qui traitent des séquences en maintenant une mémoire des étapes passées ; (2) les séries temporelles sont omniprésentes, faciles à comprendre et largement disponibles sous forme de bases de données à accès libre, et nécessitent peu de pré-traitement pour illustrer les concepts de base des RNN, comparées à des données plus complexes comme les données linguistiques ou biologiques ; et (3) les séries temporelles permettent de couvrir un large éventail de concepts liés aux RNN, tels que la prédiction de valeurs dans le futur et la dépendance à court et long terme dans les données.

### 6.2.2 Représentation des séries temporelles

Une série temporelle est une suite ordonnée de variables observées x_t, t ∈ T, où chaque observation x_t est associée à un instant t. L'ensemble des indices temporels peut être discret ou continu. Une série temporelle est souvent représentée sous forme de couples (t, x) afin de faciliter son traitement.

> Nous ouvrons ici une parenthèse pour préciser que, bien que la définition admette que les séries temporelles puissent être à temps discret ou continu, en pratique, les données sont toujours observées de manière discrète, en raison du processus d'échantillonnage inhérent aux instruments de mesure. Toutefois, certains modèles théoriques utilisent une représentation en temps continu afin de formuler des équations différentielles ou de modéliser des processus stochastiques continus.

Formellement, une série temporelle univariée est définie comme une séquence de valeurs ordonnées dans le temps, représentée généralement par :

```
{x_t}_{t=1..T} = {x_1, x_2, ..., x_T}
```

Dans cette représentation :
- x_t représente la valeur de la série temporelle à l'instant t.
- t correspond au temps, qui peut être exprimé en jours, mois, années ou tout autre intervalle temporel pertinent.
- T désigne le nombre total d'observations dans la série.

Par exemple, si nous observons les températures quotidiennes pendant une semaine, la série temporelle peut être représentée comme suit :

```
{x_t} = {22.5, 23.0, 21.8, 20.1, 19.5, 21.0, 22.3}
```

où x_t ∈ ℝ désigne un scalaire correspondant à la température mesurée à un instant t donné.

Les séries temporelles peuvent également être multivariées, c'est-à-dire comporter plusieurs variables mesurées simultanément. Dans ce cas, à chaque instant t, nous avons un vecteur de valeurs correspondant aux différentes variables. Une série temporelle multivariée est alors représentée par :

```
{x_t}_{t=1..T} = {x_1, x_2, ..., x_T},  x_t ∈ ℝ^m
```

où :
- x_t = (x_{t,1}, x_{t,2}, ..., x_{t,m}) est un vecteur contenant les m variables mesurées à l'instant t.
- x_{t,j} représente la j-ième variable mesurée à l'instant t, avec j ∈ {1, ..., m}.
- T est le nombre total d'instants (observations ou points temporels) dans la série.

Par exemple, dans une étude météorologique mensuelle, si à chaque mois t nous mesurons la moyenne de la température, de l'humidité et de la vitesse du vent, les données peuvent être représentées sous la forme d'une série de triplets :

```
{x_t} = {(22.5, 60, 12), (23.0, 58, 10), ..., (22.5, 60, 20)}
```

La structure générale d'une série temporelle multivariée peut être représentée sous forme matricielle, chaque ligne correspondant à un instant t et chaque colonne à une variable j. La matrice de données ainsi constituée s'écrit (équation 6.1) :

```
        x_11  x_12  ...  x_1m
        x_21  x_22  ...  x_2m
X   =    .     .          .
        x_T1  x_T2  ...  x_Tm
```

où :
- x_{t,j} représente la valeur de la j-ième variable à l'instant t,
- T est le nombre total d'observations (ou d'instants),
- m est le nombre total de variables.

Cette structure matricielle donne une vue globale des données temporelles multivariées. Elle offre la possibilité d'analyse et de captation des interactions complexes entre plusieurs variables au fil du temps, ce qui en fait un outil puissant pour la modélisation de systèmes dynamiques.

> Faisons un petit retour sur les représentations mathématiques (1.2) et (6.1). Dans ces représentations, nous avons, d'une part, des données tabulaires et d'autre part, des données séquentielles, bien que toutes deux soient exprimées sous forme matricielle. Dans le cas des données tabulaires, la matrice X ∈ ℝ^(N×d) est constituée de N individus (ou échantillons), chacun décrit par d caractéristiques. Chaque ligne de cette matrice représente un individu indépendant des autres, et chaque colonne correspond à une variable mesurée.
> À l'inverse, les données séquentielles sont caractérisées par l'existence de dépendances temporelles ou structurelles entre les observations. Elles sont souvent représentées par une matrice X ∈ ℝ^(T×m), où chaque ligne correspond à l'état du système observé à un instant t, et chaque colonne à une variable mesurée. Contrairement aux données tabulaires, les lignes ici ne sont pas indépendantes : elles forment une séquence ordonnée dont l'interprétation dépend du contexte temporel ou de la structure sous-jacente. Cette différence fondamentale justifie le recours à des modèles spécifiques pour l'analyse des données séquentielles, tels que les réseaux de neurones récurrents ou les architectures de type Transformer.

**Exemple 6.1** — Dans cet exemple, nous utilisons l'ensemble de données provenant de Kaggle sur les actions de MasterCard du 25 mai 2006 au 11 octobre 2021.

> Kaggle est une plateforme en ligne spécialisée en science des données et en apprentissage machine. Cette plateforme, qui appartient à Google depuis 2017, héberge une immense bibliothèque de jeux de données publics dans divers domaines dont la finance et la santé. Ces jeux de données peuvent être explorés et téléchargés pour des analyses ou des projets d'apprentissage machine. Kaggle permet d'exécuter du code Python directement dans le cloud via Kaggle Notebooks (Jupyter Notebook intégré).

L'extrait de code 6.1 commence par l'importation du jeu de données `Mastercard_stock_history.csv` disponible sur Kaggle dans un fichier de format csv. Chaque ligne (individu) correspond à une date d'enregistrement `Date` décrite par les caractéristiques `Open` (le prix d'ouverture de l'action pour cette date), `High` et `Low` (le prix le plus élevé et le plus bas atteint par l'action pour cette date), `Close` (le prix de clôture de l'action pour cette date) et `Volume` (le nombre total d'actions échangées durant la journée). Deux autres caractéristiques (`Dividends` et `Stock Splits`) sont disponibles mais ne seront pas utilisées parce qu'elles sont facultatives.

Extrait de code 6.1 - Lecture des données mastercard_stock_data kaggle.
```python
dataset = pd.read_csv("./Base de données/Mastercard_stock_history.csv",
                       index_col="Date", parse_dates=["Date"]
                      ).drop(["Dividends", "Stock Splits"], axis=1)
display(dataset)
```

Le fichier est chargé dans une structure de type DataFrame, accessible via l'objet `dataset`. 3872 individus sont disponibles.

| Date | Open | High | Low | Close | Volume |
|---|---|---|---|---|---|
| 2006-05-25 | 3.748967 | 4.283869 | 3.739664 | 4.279217 | 395343000 |
| 2006-05-26 | 4.307126 | 4.348058 | 4.103398 | 4.179680 | 103044000 |
| 2006-05-30 | 4.183400 | 4.184330 | 3.986184 | 4.093164 | 49898000 |
| 2006-05-31 | 4.125723 | 4.219679 | 4.125723 | 4.180608 | 30002000 |
| 2006-06-01 | 4.179678 | 4.474572 | 4.176887 | 4.419686 | 62344000 |
| ... | ... | ... | ... | ... | ... |
| 2021-10-05 | 347.121403 | 348.130138 | 342.497241 | 342.776886 | 4724100 |
| 2021-10-06 | 339.580960 | 348.439763 | 338.682072 | 348.250000 | 3712000 |
| 2021-10-07 | 349.000000 | 357.899094 | 349.000000 | 353.910004 | 3209200 |
| 2021-10-08 | 356.000000 | 360.369995 | 354.209991 | 354.959991 | 2336700 |
| 2021-10-11 | 353.950012 | 354.880005 | 346.899904 | 347.149904 | 2766800 |

*3872 rows × 5 columns*

L'objectif de cet exemple est de développer un système de prédiction basé sur un réseau de neurones récurrent. Afin d'en faciliter la compréhension, nous nous appuierons sur une série temporelle univariée, en nous concentrant sur l'évolution de la variable `High` (le prix le plus élevé atteint par l'action à une date donnée) au cours du temps. L'objectif est de prédire les valeurs futures de ce prix.

La figure 6.1 est une représentation graphique de la variation de la variable `High` en fonction du temps (figure non reproduite). Nous avons 3872 observations mesurées pendant 15 ans entre 2006 et 2021. Les données boursières ne sont généralement collectées que pendant les jours où les marchés financiers sont ouverts. Ceci exclut les jours de fins de semaine (samedi et dimanche) et les jours fériés des marchés financiers.

Figure 6.1 - Jeu de données sur les actions de MasterCard décrivant le comportement des actions sur la période 2016-2021 : variation du prix le plus élevé atteint par l'action (High) en fonction de la date (Date). *(figure non reproduite)*

### 6.2.3 Prétraitement des séries temporelles

**Mise à l'échelle : normalisation et standardisation**

L'application de techniques de transformation des données, telles que la normalisation et la standardisation, joue un rôle primordial dans le prétraitement des séries temporelles. Ces transformations sont fortement recommandées (parfois même indispensables) avant de développer un modèle de RNN pour une série temporelle. La recommandation découle des caractéristiques propres aux RNN et à la nature des données temporelles, notamment leur sensibilité aux échelles des valeurs. En effet, les RNN, ainsi que leurs variantes avancées comme les LSTM et les GRU, reposent sur des fonctions d'activation non linéaires, telles que la fonction sigmoïde et la fonction tangente hyperbolique. Ces dernières sont particulièrement sensibles aux amplitudes des données en entrée. De ce fait, lorsque les valeurs des variables sont trop grandes ou trop petites, les fonctions d'activation peuvent rapidement saturer. Cette saturation engendre des problèmes d'apprentissage liés à l'explosion ou à l'évanouissement des gradients qui impacte la capacité du modèle à apprendre efficacement.

La mise à l'échelle des données permet de maintenir les valeurs d'entrée dans une plage optimale (généralement entre -1 et 1 ou 0 et 1), où les fonctions d'activation sont les plus efficaces.

La normalisation joue aussi un rôle clé dans la convergence des algorithmes d'optimisation, notamment la descente de gradient. En homogénéisant les échelles des données, la normalisation permet des mises à jour des poids plus stables, ce qui accélère le processus d'apprentissage. À l'inverse, en l'absence de normalisation, des variables ayant des plages de valeurs très différentes (par exemple, entre 1 et 10 000) peuvent entraîner des gradients instables, rendant l'optimisation plus difficile et ralentissant la progression vers un modèle performant. Ainsi, la normalisation ne constitue pas seulement une étape préliminaire utile, mais représente une condition essentielle pour garantir un entraînement efficace et robuste des RNN et de leurs variantes.

1. **La normalisation** consiste à reconfigurer les valeurs d'une série temporelle {x_t} dans une plage définie. Cette opération est souvent motivée par des considérations de stabilité numérique et de convergence plus rapide lors de l'entraînement des modèles d'apprentissage machine.

Nous utilisons couramment la mise à l'échelle min-max (Min-Max Scaling), qui projette les données originales dans l'intervalle [0,1] selon la relation suivante :

```
x_norm = (x_t - x_min) / (x_max - x_min)
```

où x_min et x_max désignent respectivement les valeurs minimale et maximale de la série temporelle.

Dans certains cas, notamment lorsque nous utilisons des fonctions d'activation symétriques comme la tangente hyperbolique (tanh), il est préférable de centrer les données autour de zéro. Nous appliquons alors une version modifiée du Min-Max Scaling, qui normalise les données dans l'intervalle [-1, 1] en suivant la relation :

```
x_norm = 2 · ((x_t - x_min) / (x_max - x_min)) - 1
```

Cette transformation permet de tirer parti des propriétés des modèles centrés, en facilitant l'apprentissage grâce à une meilleure distribution des gradients.

Toutefois, quelle que soit l'intervalle choisi, la normalisation min-max demeure sensible aux valeurs extrêmes. Si x_min ou x_max est une valeur aberrante, l'échelle des données peut être artificiellement étendue, ce qui comprime les valeurs centrales dans une plage étroite et nuit à l'efficacité du modèle.

2. **La standardisation** (Z-Score Normalization ou Standard Scaling) consiste à transformer les données de manière à ce qu'elles aient une moyenne nulle et un écart-type unitaire, ce qui est particulièrement utile lorsque les données suivent une distribution gaussienne.

La standardisation est définie par :

```
x_std = (x_t - μ) / σ
```

où μ est la moyenne de la série temporelle et σ son écart-type. Cette transformation améliore la stabilité numérique et accélère la convergence des modèles d'apprentissage automatique.

La standardisation est particulièrement utile lorsque nous avons des séries temporelles multivariées où les variables mesurées peuvent présenter des unités et des échelles très différentes. Une telle hétérogénéité peut perturber les modèles d'apprentissage machine. La standardisation permet alors de transformer chaque variable indépendamment en une nouvelle série centrée (moyenne nulle) et réduite (écart-type égal à un). Cette transformation assure une échelle comparable entre les différentes dimensions, ce qui empêche les variables à grande variance ou à forte amplitude numérique d'avoir un poids excessif dans le processus d'apprentissage.

> Bien que la normalisation min-max permette de ramener chaque variable dans une même plage, typiquement entre 0 et 1, elle n'est pas toujours efficace dans un contexte multivarié. En effet, elle ne tient pas compte de la variance propre à chaque variable. Autrement dit, une variable peu variable, comme la pression atmosphérique (qui varie peu autour de 1013 hPa), verra ses faibles fluctuations artificiellement amplifiées par la mise à l'échelle, tandis qu'une variable très dynamique, comme l'humidité (qui peut fluctuer de 20 % à 90 % en peu de temps), se verra écrasée dans la même plage. Ce déséquilibre nuit à l'interprétation des modèles et à la convergence de l'apprentissage. Dans ce type de configuration, la standardisation, qui centre chaque variable et la ramène à un écart-type de un, est souvent plus appropriée, car elle permet d'équilibrer les contributions respectives des différentes dimensions, quelle que soit leur unité ou leur dynamique initiale.

**Exemple 6.2** — Nous continuons avec l'ensemble de données sur les actions de MasterCard de Kaggle.

Sachant que l'objectif est de développer un modèle d'apprentissage machine, il est essentiel de diviser le jeu de données en sous-ensembles distincts : un ensemble d'entraînement, un ensemble de validation et un ensemble de test, avant d'appliquer toute transformation. Cette division préalable évite les biais introduits par les transformations, garantissant ainsi que les informations des ensembles de test ou de validation ne soient incluses dans l'ensemble d'entraînement.

Dans cet exemple, les données ont été réparties en deux périodes principales : un sous-ensemble d'entraînement couvrant la période de 2016 à 2020, un sous-ensemble de validation qui couvre 2020 à 2021 et un sous-ensemble de test à partir de 2021. La structure détaillée de cette répartition est illustrée dans l'extrait de code 6.2.

Extrait de code 6.2 - Création des sous-ensembles d'entraînement, de validation et de test.
```python
tstart = 2016   # Année de début pour l'entraînement
tval   = 2020   # Année de fin pour la validation
tend   = 2021   # Année de début pour le test

# Jeu d'entraînement : de 2016 à 2020 (excluant 2020)
training_set = dataset.loc[f'{tstart}':f'{tval-1}', "High"].values

# Jeu de validation : de 2020 à 2021 (excluant 2021)
validation_set = dataset.loc[f'{tval}':f'{tend-1}', "High"].values

# Jeu de test : à partir de 2021 et au-delà
test_set = dataset.loc[f'{tend}':, "High"].values

# Récupérer les dates correspondantes au test_set pour l'affichage
test_dates = dataset.loc[f'{tend}':].index
```

La figure 6.2, générée à partir de l'extrait de code 6.2, est une représentation graphique des trois sous-ensembles de données. Il s'agit de la même courbe illustrée à la figure 6.1 réorganisée en 3 sous-ensembles. *(figure non reproduite)*

Figure 6.2 - Représentation des trois sous-ensembles (entraînement, validation et test) du jeu de données Mastercard_stock_history.csv. *(figure non reproduite)*

Une fois les trois sous-ensembles formés, nous procédons à une mise à l'échelle des ensembles d'entraînement, de validation et de test à l'aide de la méthode `MinMaxScaler` (voir l'extrait de code 6.3).

La mise à l'échelle est effectuée exclusivement sur les données d'entraînement pour estimer les paramètres nécessaires de la transformation (comme le minimum et le maximum dans le cas du `MinMaxScaler`). Ces paramètres sont ensuite appliqués aux ensembles de validation et de test, via `sc.transform`, garantissant ainsi la continuité et l'intégrité des transformations entre les différentes phases du modèle.

Extrait de code 6.3 - Normalisation des données des trois sous-ensembles.
```python
from sklearn.preprocessing import MinMaxScaler

# Initialiser le scaler MinMax
sc = MinMaxScaler(feature_range=(0, 1))

# Appliquer la transformation MinMax au jeu d'entraînement
training_set_scaled = sc.fit_transform(training_set.reshape(-1, 1))

# Appliquer le même scaler (transformation) aux jeux de validation et de test
validation_set_scaled = sc.transform(validation_set.reshape(-1, 1))
test_set_scaled = sc.transform(test_set.reshape(-1, 1))
```

L'exécution du code 6.3 génère trois sous-ensembles de données : l'entraînement, la validation et le test, de tailles respectives (1006, 1), (253, 1) et (195, 1).

Taille des sous-ensembles de données normalisées :

| Sous-ensemble | Taille |
|---|---|
| Entraînement | (1006, 1) |
| Validation | (253, 1) |
| Test | (195, 1) |

**Découpage en fenêtres temporelles**

Le découpage en fenêtres temporelles (sliding windows) consiste à diviser les données, qui se présentent sous la forme de séries temporelles, en segments plus petits qui sont ensuite utilisés comme données d'entrée au modèle. Le découpage permet au réseau de neurones de traiter des séquences de longueur fixe et de mieux capturer les dépendances temporelles à court terme. Cependant, il existe des variantes de RNN, comme les LSTM et les GRU, qui sont capables de gérer des séquences de longueur variable sans nécessiter de découpage en fenêtres.

Le découpage d'une séquence x = {x_1, x_2, ..., x_T} consiste à transformer cette séquence en un ensemble de sous-séquences de longueur fixe, appelées fenêtres temporelles. Ces fenêtres servent ensuite de base pour constituer les données d'apprentissage.

À ce stade, l'ajout d'une cible ou d'une étiquette associée à chaque fenêtre dépend de la nature de la tâche d'apprentissage. Dans une tâche de prédiction, chaque fenêtre est généralement associée à une ou plusieurs valeurs futures à estimer (par exemple, la prochaine valeur de la série ou une moyenne sur un horizon donné). En revanche, dans une tâche de classification, on attribue à chaque fenêtre une étiquette de classe, soit parce qu'elle est héritée d'une séquence globale (étiquette partagée), soit parce qu'elle est déterminée à partir du contenu de la fenêtre.

Le découpage en fenêtres temporelles est également pertinent dans un cadre non supervisé. Dans ce cas, aucune étiquette n'est disponible et les fenêtres servent à découvrir des structures sous-jacentes dans les données.

Formellement, considérons une séquence temporelle univariée :

```
X = {x_1, x_2, ..., x_T},  x_t ∈ ℝ
```

où T est la longueur totale de la séquence.

Dans une tâche de prédiction, la séquence x est découpée en fenêtres temporelles de longueur w. Chaque fenêtre d'entrée est définie par :

```
x^(i) = {x_i, x_{i+1}, ..., x_{i+w-1}},  avec i ∈ {1, ..., T-w-h+1}
```

et est associée à une cible y^(i) définie en fonction de l'objectif de prédiction. Par exemple, dans le cas d'une prédiction à horizon h, la cible peut être la valeur située h pas après la fin de la fenêtre :

```
y^(i) = x_{i+w+h-1}
```

Ce cadre inclut plusieurs scénarios usuels en séries temporelles, non exclusifs, et peut être adapté à d'autres types de prédiction :
- prévision immédiate (h = 1) : y^(i) = x_{i+w}
- prévision à horizon fixe (h > 1) : y^(i) = x_{i+w+h-1}
- prédiction agrégée (ex. moyenne future) : y^(i) = (1/h) · Σ_{j=1}^{h} x_{i+w+j}

Prenons l'exemple des prévisions météorologiques. Considérons une série temporelle représentant les températures quotidiennes enregistrées dans une ville au cours d'un mois :

```
X = {x_1, x_2, ..., x_30}
```

où x_t est la température au jour t.

Pour une prévision immédiate (h = 1), nous pouvons utiliser une fenêtre temporelle de longueur w = 7, de sorte que chaque entrée x^(i) = {x_i, ..., x_{i+6}} regroupe les températures observées au cours des sept derniers jours. La cible associée est alors la température du jour suivant, donnée par y^(i) = x_{i+7}. Ce type de configuration est couramment utilisé lorsque nous cherchons à prédire la valeur située immédiatement après la fenêtre d'observation.

Pour une prévision à horizon fixe (h = 3), nous cherchons à estimer la température non pas du jour suivant, mais d'un jour situé plus loin dans le futur. Par exemple, avec la même fenêtre de longueur w = 7, la cible devient y^(i) = x_{i+9}, ce qui correspond à la température trois jours après la fin de la fenêtre. Ce type de prédiction est particulièrement utile lorsque nous avons besoin d'anticiper des événements à court ou moyen terme.

Enfin, pour une prédiction agrégée, nous pouvons nous intéresser à des valeurs résumant une tendance future, comme la moyenne des températures sur plusieurs jours. Dans ce cas, la cible peut être définie comme :

```
y^(i) = (1/3) · (x_{i+8} + x_{i+9} + x_{i+10})
```

ce qui correspond à la moyenne des températures des trois jours suivants. Cette approche est pertinente lorsque nous souhaitons lisser les variations journalières et capturer une dynamique générale.

Ces scénarios illustrent l'adaptabilité du schéma de découpage en fenêtres temporelles à différents objectifs de prévision dans un contexte réel.

Dans tous les cas, l'ensemble des paires (entrée, cible) peut être représenté sous forme matricielle (équation 6.2), et de manière analogue pour une tâche de classification, où chaque séquence complète x est associée à une unique étiquette de classe y, et où le découpage en fenêtres produit un ensemble de sous-séquences partageant toutes la même étiquette (équation 6.3).

Prenons l'exemple de la classification d'activité humaine. Supposons que nous disposons de données issues d'un capteur de mouvement porté par une personne (accéléromètre, gyroscope, etc.) enregistrant des valeurs temporelles multidimensionnelles pendant qu'elle réalise une activité. Chaque séquence complète x = {x_1, x_2, ..., x_T} correspond à une session d'activité physique, comme marcher, courir ou rester immobile, et est associée à une étiquette de classe y ∈ {marche, course, repos}.

En découpant cette séquence en fenêtres temporelles de longueur fixe w, nous générons plusieurs sous-séquences, chacune contenant une portion de l'activité. Dans ce cas, toutes les fenêtres héritent de la même étiquette de classe y, car elles proviennent d'une même séquence globalement étiquetée. Ainsi, le modèle apprend à associer une courte séquence de mouvement à une activité globale.

Cette approche est couramment utilisée dans des domaines comme la classification de signaux biomédicaux, l'analyse de comportements et la reconnaissance d'activité humaine.

> Le choix de la longueur de la séquence (ou taille de la fenêtre temporelle) dépend de plusieurs facteurs liés à la nature des données, à la tâche d'apprentissage et à la capacité du modèle.
> La nature des données et leurs caractéristiques intrinsèques, par exemple la saisonnalité ou la périodicité, est un facteur important. Il est souvent pertinent de choisir w comme un multiple de cette période. Par exemple, pour une série journalière présentant un cycle hebdomadaire, vous pouvez opter pour w = 7 ou w = 14, afin de couvrir un ou deux cycles complets. Dans d'autres contextes, notamment en biomédecine ou en reconnaissance d'activités humaines, w peut être définie en fonction de la durée moyenne d'un événement pertinent. Ainsi, une fenêtre de 10 secondes peut être appropriée pour un signal ECG, tandis qu'une durée de 30 secondes pourrait convenir pour la capture d'un cycle complet de marche.
> L'objectif de la tâche est aussi un facteur déterminant. Pour une prédiction à court terme, des fenêtres plus courtes suffisent généralement, car seules les dynamiques récentes sont pertinentes. En revanche, pour des prédictions à long terme ou l'estimation de tendances globales, il est préférable d'utiliser des fenêtres plus longues afin de capturer une plus grande étendue de dépendances temporelles.
> La capacité du modèle utilisé doit être considérée. En effet, les modèles simples, tels que la régression linéaire et les SVM, risquent de surapprendre si la fenêtre est trop grande, en raison du nombre élevé de caractéristiques introduites. À l'inverse, les modèles plus complexes comme les LSTM, GRU ou Transformers peuvent traiter des séquences plus longues et modéliser des dépendances temporelles étendues, mais au prix d'une augmentation significative du coût computationnel et du risque de surapprentissage si les données ne sont pas suffisantes.

**Exemple 6.3** — Nous poursuivons notre analyse du jeu de données portant sur les actions de MasterCard, en nous concentrant spécifiquement sur l'évolution de la variable `High`, qui représente le prix le plus élevé atteint par l'action au cours d'une journée. L'objectif est ici de prédire la valeur future de cette variable.

Pour ce faire, les données ont été découpées en fenêtres temporelles de largeur 60 jours. Chaque séquence ainsi constituée regroupe les valeurs de `High` observées sur une période de 60 jours consécutifs. La variable cible associée à chaque séquence correspond à la valeur de `High` observée le jour suivant, soit le 61ᵉ jour.

Il n'existe pas de fonction native universelle pour effectuer ce découpage dans les bibliothèques standard de Python. Une fonction `split_sequence` a été mise en œuvre pour diviser une séquence de données en sous-séquences (ou fenêtres) d'une longueur spécifiée (voir l'extrait de code 6.4).

La fonction commence par l'initialisation des listes X et y pour stocker respectivement les sous-séquences et leurs valeurs cibles correspondantes. Ensuite, une boucle sur la séquence est effectuée. La fonction parcourt chaque indice i de la séquence donnée afin de générer des sous-séquences. À chaque itération, l'indice de fin (`end_ix`) de la sous-séquence est calculé comme `i + n_steps`, où `n_steps` représente le nombre d'éléments dans chaque sous-séquence. Pour chaque itération valide, il y a une création des sous-séquences (`seq_x`) qui contient `n_steps` éléments extraits de la séquence, de l'indice actuel i à `end_ix - 1`. La valeur cible (`seq_y`) correspond à l'élément d'indice `end_ix`, qui suit directement la sous-séquence.

Extrait de code 6.4 - Fonction de découpage d'une séquence en fenêtres (`split_sequence`).
```python
def split_sequence(sequence, n_steps):
    X, y = list(), list()

    # Parcourir la séquence pour créer des sous-séquences
    for i in range(len(sequence)):
        # Définir l'indice de fin de la sous-séquence
        end_ix = i + n_steps

        # Vérifier si l'indice de fin dépasse la longueur de la séquence
        if end_ix > len(sequence) - 1:
            break

        # Créer la sous-séquence (features) et la valeur cible correspondante
        seq_x, seq_y = sequence[i:end_ix], sequence[end_ix]

        # Ajouter la sous-séquence et la valeur cible aux listes X et y
        X.append(seq_x)
        y.append(seq_y)

    # Convertir les listes en tableaux NumPy et les retourner
    return np.array(X), np.array(y)
```

La fonction `split_sequence` est appliquée aux données d'entraînement, de validation et de test (voir l'extrait de code 6.5).

Extrait de code 6.5 - Création des séquences.
```python
n_steps = 60    # 60 jours par séquence
features = 1    # Une seule caractéristique (prix des actions)

# Jeu d'entraînement
X_train, y_train = split_sequence(training_set_scaled, n_steps)

# Jeu de validation
X_val, y_val = split_sequence(validation_set_scaled, n_steps)

# Jeu de test
X_test, y_test = split_sequence(test_set_scaled, n_steps)
```

Les trois sous-ensembles de données obtenus sont représentés chacun sous forme de tenseur avec trois dimensions :

```
(Nombre de séquences, Longueur de séquence, Nombre de variables)
```

Chaque séquence contient 60 observations, puisque la variable `n_steps` est fixée à 60. Le nombre total de séquences générées pour chaque ensemble dépend du nombre initial d'observations disponibles (ou de points temporels). Ce nombre est calculé selon la formule suivante :

```
Nombre de séquences = Nombre total d'observations - Longueur de séquence
```

Dans notre cas, à partir de 1006 observations initiales dans l'ensemble d'entraînement, nous obtenons 946 séquences : 1006 - 60 = 946.

Taille des sous-ensembles de données suite à la formation des séquences :

| Sous-ensemble | Taille |
|---|---|
| Entraînement | (946, 60, 1) |
| Validation | (193, 60, 1) |
| Test | (135, 60, 1) |

### 6.2.4 Problématiques de modélisation des données séquentielles

Considérons une application qui doit prédire une séquence de sortie y = (y_1, y_2, ..., y_n) à partir d'une séquence d'entrée donnée x = (x_1, x_2, ..., x_m). Par exemple, dans une application de traduction du français vers l'anglais, l'entrée x pourrait être la phrase en français « J'aime la pizza », et la séquence de sortie associée y serait la phrase « I like pizza ».

Si la séquence était divisée caractère par caractère, alors nous pouvons mettre ceci dans des variables x et la représenter sous la forme de tableau (un vecteur en quelque sorte), et procéder de manière similaire pour la sortie y.

Maintenant nous avons un vecteur d'entrée et un vecteur de sortie. Nous pouvons être tentés de résoudre ce problème à l'aide de réseaux neuronaux classiques de type propagation avant, mais deux problèmes apparaissent lors de l'analyse. Le premier problème réside dans la différence de longueur entre les séquences d'entrée x et des séquences de sortie y pour différentes paires. Par exemple, la paire (entrée, sortie) : (« J'aime la pizza », « I like pizza ») a une entrée de longueur 15 et une sortie de longueur 12. La paire (« Il fait chaud aujourd'hui », « It is hot today ») a une entrée de longueur 21 et une sortie de longueur 15. Or, les réseaux de neurones à propagation avant nécessitent des entrées et sorties de taille fixe et ne peuvent donc pas être appliqués directement à des séquences temporelles de longueur variable.

Encore là, nous pouvons penser à une solution de contournement qui consiste à spécifier une taille maximale pour les entrées et les sorties, puis à compléter les séquences plus courtes avec un caractère nul spécial, par exemple « # ». Ce qui nous permettrait d'entraîner un réseau à propagation avant afin de produire les sorties y à partir des entrées x. Cependant, cette approche pose aussi un problème puisque rien ne garantit que x_1 soit directement lié à y_1. En effet, dans de nombreuses phrases en français, l'ordre des mots est différent de celui de la traduction anglaise. Par exemple : « Les voitures rouges sont rapides » est traduit par « Red cars are fast ». L'adjectif « rouges » vient après le nom (voitures) en français, mais précède le nom (cars) en anglais. Par conséquent, tout réseau neuronal traitant des séquences doit être capable de mémoriser les entrées passées et les calculs intermédiaires, car ils pourraient être nécessaires pour produire les parties ultérieures de la séquence de sortie. Nous pouvons ainsi dire que le réseau doit être capable de mémoriser son contexte, c'est-à-dire la relation entre son passé et son présent.

## 6.3 Architectures des RNN

Les réseaux de neurones récurrents sont capables de traiter différentes configurations de données en entrée et en sortie, en fonction de la tâche à accomplir. Différentes architectures peuvent ainsi être distinguées en fonction de la configuration des données. Nous distinguons cinq architectures illustrées dans la figure 6.3 *(figure non reproduite)*.

**Le réseau « un-à-un »**

L'architecture un-à-un (One-to-One) est la forme la plus simple de RNN, où une seule entrée produit une seule sortie. C'est un modèle similaire à un réseau de neurones feedforward, mais avec une capacité à capturer des dépendances temporelles si l'entrée représente une donnée séquentielle.

Formellement, l'architecture un à un fait référence à une configuration où une seule entrée est associée à une seule sortie : x → y.

Par exemple, dans une tâche de classification d'images, une image (entrée unique) est classée dans une catégorie spécifique (sortie unique) qui correspond au label. Si l'image en entrée représente un chat, la sortie sera le label « chat » (figure 6.3(a)).

**Le réseau « un-à-plusieurs »**

L'architecture de réseau un-à-plusieurs (one-to-many) est un modèle capable de renvoyer une série de vecteurs en sortie pour un seul vecteur d'entrée.

Formellement, soit une entrée x et une séquence de sortie y_1, y_2, ..., y_T. L'architecture un-à-plusieurs fait référence à une configuration où une seule entrée est associée à plusieurs sorties : x → y_1, y_2, ..., y_T.

Dans le cas de génération de légendes d'images, par exemple, nous avons en entrée une image et nous obtenons en sortie la légende « Un chat qui joue au ballon », donc une séquence de vecteurs (figure 6.3(b)).

**Le réseau « plusieurs-à-un »**

L'architecture plusieurs-à-un (many-to-one ou sequence-to-vector model) consiste à traiter une séquence d'entrées x_1, x_2, ..., x_T pour produire une unique sortie y (figure 6.3(c)) : x_1, x_2, ..., x_T → y.

Ce type d'architecture est souvent utilisé pour des tâches où toute une séquence d'informations doit être agrégée en une seule prédiction. Par exemple, pour la classification d'émotions dans une séquence audio, nous avons une série d'entrées correspondant aux trames audio x_1, x_2, ..., x_T, et en sortie une émotion unique, par exemple « joie ».

**Le réseau « plusieurs-à-plusieurs » synchronisé**

L'architecture plusieurs-à-plusieurs (many-to-many ou sequence-to-sequence model) synchronisée traite une séquence d'entrées x_1, x_2, ..., x_T et génère une séquence de sorties correspondante y_1, y_2, ..., y_T. Il s'agit d'une relation directe entre chaque élément d'entrée et chaque élément de sortie : (x_1 → y_1), (x_2 → y_2), ..., (x_T → y_T).

Ce modèle est synchrone dans le sens où la longueur des entrées et des sorties est la même (figure 6.3(d)). Par exemple, pour la traduction automatique, à chaque mot dans une phrase source (séquence d'entrées) est projeté un mot correspondant dans une phrase traduite (séquence de sorties).

**Le réseau « plusieurs-à-plusieurs » asynchrone**

L'architecture plusieurs-à-plusieurs asynchrone diffère du plusieurs-à-plusieurs synchronisé en ce qui a trait aux longueurs des séquences d'entrée et de sortie, qui peuvent être différentes. Ainsi, dans cette architecture, une séquence d'entrées x_1, x_2, ..., x_T génère une séquence de sorties y_1, y_2, ..., y_T', où la longueur de la séquence de sortie T' peut être différente de celle de la séquence d'entrée T.

Cette architecture est couramment utilisée dans des tâches comme la traduction où la longueur des phrases source et cible n'est pas nécessairement la même. Par exemple, pour une tâche de sous-titrage automatique, une séquence d'entrées audio est transformée en une séquence de sous-titres de longueur différente (figure 6.3(e)).

Figure 6.3 - Architecture de base d'un neurone dans (a) « one-to-one », une entrée de taille fixe à une sortie de taille fixe ; (b) « one-to-many », une série de vecteurs en sortie pour un seul vecteur en entrée ; (c) « many-to-one », un seul vecteur en sortie à partir d'une séquence en entrée ; (d) « many-to-many » synchronisé, une séquence d'entrée et séquence de sortie de même taille ; (e) « many-to-many » asynchronisé, une séquence d'entrée et séquence de sortie de taille différente. *(figure non reproduite)*

## 6.4 Réseaux de neurones récurrents simples

### 6.4.1 Couche récurrente

Contrairement aux réseaux de neurones traditionnels (feedforward), où l'information circule dans une seule direction, de la couche d'entrée vers la couche de sortie, sans boucle ni retour en arrière (figure 6.4(a)), les RNN ont une architecture récurrente. Cela signifie qu'il existe des connexions de rétroaction dans le réseau (figure 6.4(b)). Ainsi, le réseau reçoit non seulement l'entrée actuelle, mais aussi l'information de l'état précédent, ce qui lui permet de « se souvenir » des informations passées.

Figure 6.4 - Comparaison entre l'architecture d'un réseau à propagation avant (Feedforward) et un réseau de neurones récurrent. *(figure non reproduite)*

La récurrence dans un réseau de neurones est complexe à comprendre, car elle introduit une dépendance temporelle dans le traitement des données. Contrairement aux réseaux de neurones classiques qui traitent les données de manière indépendante, les RNN mémorisent des informations issues des états précédents pour influencer les calculs actuels. La figure 6.5(b) représente une simplification d'une couche de réseau de neurones récurrent tout en mettant en valeur la connexion de récurrence.

Figure 6.5 - Simplification de l'architecture d'un réseau à propagation avant et d'un réseau de neurones récurrent. *(figure non reproduite)*

La capacité à maintenir une « mémoire » offre aux RNN un comportement dynamique, dépendant de la séquence d'entrée. Cependant, cette caractéristique accroît leur complexité, tant sur le plan théorique que pratique, rendant leur fonctionnement moins intuitif.

### 6.4.2 Cellule récurrente

Contrairement à un réseau de neurones classique, où chaque neurone traite son entrée de manière indépendante, une cellule RNN traite des séquences de données en conservant une « mémoire » de ce qui a été vu précédemment.

Les prédictions de sortie du réseau et ses calculs ne sont pas seulement une fonction de l'entrée à un instant donné, mais aussi de la mémoire passée de l'état de la cellule. Autrement dit, la sortie dépend à la fois des entrées actuelles ainsi que des calculs et apprentissages passés (voir la figure 6.6).

Soit une séquence temporelle représentée par {x_t}_{t=1..T}. Une valeur x_t de la séquence au temps t peut être un scalaire (séquence univariée) ou un vecteur x_t ∈ ℝ^d (séquence multivariée). Il est important de noter que dans la suite du chapitre, les notions de vecteur et de scalaire seront utilisées de manière interchangeable, selon le contexte ou l'application. Cette flexibilité est souvent utilisée pour simplifier les explications ou les notations, car les principes et les méthodes de traitement restent similaires, que la donnée soit un scalaire ou un vecteur.

La cellule récurrente est définie par la séquence de ses états internes {h_t}_{t=1..T}, de dimension l, c'est-à-dire h_t ∈ ℝ^l. Cette séquence des états internes est définie par l'équation récurrente (6.4) :

```
h_t = φ_t(x_t, h_{t-1})
```

où φ_t est une fonction récurrente qui détermine l'évolution de l'état interne.

L'équation (6.4) met en évidence la dépendance de l'état interne h_t au temps t, à la fois par rapport à la valeur de la séquence x_t à ce même instant et à son état interne précédent h_{t-1} au temps t - 1.

Figure 6.6 - Architecture d'une cellule RNN simple illustrant les interactions entre l'entrée actuelle (x_t), l'état caché précédent (h_{t-1}), et l'état caché actuel (h_t). L'état caché h_t dépend à la fois de l'observation x_t au pas de temps t et de l'état caché au pas de temps précédent. *(figure non reproduite)*

### 6.4.3 Dépliement d'un RNN

Le dépliement ou déroulement (unrolling) d'un réseau de neurones récurrent est une technique utilisée pour visualiser et comprendre le fonctionnement de ce réseau sur des séquences de données. Le dépliement transforme un RNN, qui est essentiellement un réseau avec des boucles internes, en une forme étendue qui montre chaque étape de son exécution sur une séquence. Ainsi, au lieu de représenter le RNN comme un bloc récurrent, il est représenté sous une forme développée où chaque réplique du bloc correspond à une étape temporelle (time step) spécifique dans la séquence de données, illustrant ainsi le traitement effectué à chaque pas de temps.

> Le terme étape temporelle ou pas de temps n'est pas spécifique aux séries temporelles et peut également s'appliquer aux données séquentielles. Dans les séries temporelles, une étape temporelle fait directement référence à une observation dans la séquence temporelle, indexée par une unité de temps (par exemple : secondes, minutes, jours). Dans les données séquentielles, une étape temporelle représente une position dans la séquence, sans nécessairement être liée au temps réel. Elle correspond à un élément de la séquence, traité en fonction de son ordre.

Le dépliement du RNN transforme la structure récurrente en une architecture linéaire explicite, facilitant ainsi la visualisation et l'analyse des relations temporelles. Le processus de dépliement est essentiel pour comprendre et modéliser les dépendances temporelles dans un RNN, car il permet d'appliquer des algorithmes d'apprentissage, tels que la rétropropagation du gradient à travers le temps (BPTT), de manière systématique.

La figure 6.7 illustre une version dépliée d'un RNN, mettant en évidence les variables d'entrée au cours du temps, x_1, x_2, ... et x_T, ainsi que leurs interactions avec les états cachés h_1, h_2, ... et h_T. *(figure non reproduite)*

Contrairement à la figure 6.6, qui représente explicitement les sorties y_t à chaque pas de temps, la figure 6.7 se concentre uniquement sur les états cachés h_t, en omettant volontairement les sorties. Cette simplification vise à illustrer les dynamiques internes du RNN, en particulier dans les contextes où la production d'une sortie explicite à chaque instant n'est pas nécessaire.

C'est notamment le cas dans des tâches telles que la classification de séquences — par exemple, l'analyse de sentiments ou la détection d'anomalies — où seul le dernier état caché h_T est exploité. Cet état final constitue une représentation condensée de l'ensemble de la séquence d'entrée qui encapsule les informations temporelles accumulées et qui sert de base à la prédiction finale. Dans ce type d'architecture plusieurs-à-un, les sorties intermédiaires y_t ne sont donc pas nécessaires. En omettant les sorties intermédiaires, le modèle gagne en simplicité, ce qui permet de réduire les calculs superflus et de focaliser l'apprentissage sur la modélisation des dépendances temporelles entre les états cachés successifs. Cette approche favorise l'extraction d'une représentation globale optimisée de la séquence, en particulier lorsque l'objectif final ne requiert qu'une seule prédiction globale.

Dans un RNN, la fonction de mise à jour de l'état caché, notée φ dans l'équation (6.4), est en réalité identique à chaque pas de temps t. Pour alléger la notation, nous utiliserons la forme générique φ, comme illustré dans la figure 6.7. Cela signifie que les paramètres de la cellule récurrente, notamment les poids et les biais, sont partagés à travers toutes les étapes temporelles. Cette propriété fondamentale permet au réseau de traiter des séquences de longueur variable avec un unique ensemble de paramètres, réduisant ainsi la complexité du modèle tout en favorisant un apprentissage plus stable et plus efficace.

> L'article « Finding Structure in Time » de Jeffrey L. Elman (1990) est une contribution fondatrice dans le domaine des réseaux de neurones récurrents. Cet article introduit le concept de dépliement temporel des RNN, permettant une meilleure compréhension des mécanismes internes des réseaux récurrents et de leurs applications pour modéliser des séquences temporelles. En détaillant l'entraînement des RNN ainsi que leur capacité à capturer des dépendances à long terme, cet article reste une référence pour les scientifiques qui s'intéressent aux bases théoriques et pratiques des réseaux de neurones récurrents.

### 6.4.4 Entraînement d'un RNN simple

L'entraînement d'un RNN repose sur trois étapes principales : le passage vers l'avant (forward pass), le calcul de la fonction de perte (loss function) et la rétropropagation à travers le temps (backpropagation through time, BPTT).

**1. Passage vers l'avant**

Dans un RNN, à chaque instant t, le calcul du passage vers l'avant repose sur deux étapes fondamentales.

La première met à jour les états cachés (h_t) en intégrant les informations des entrées actuelles (x_t) et de l'état caché précédent (h_{t-1}). Ces états encapsulent la mémoire temporelle et les dépendances entre les éléments de la séquence.

Équation (6.5) :
```
h_t = g(W_h · h_{t-1} + W_x · x_t + b_h)
```

Dans cette équation :
- W_h ∈ ℝ^(l×l) est la matrice de poids reliant l'état caché précédent h_{t-1} ∈ ℝ^l à l'état caché actuel h_t ∈ ℝ^l.
- W_x ∈ ℝ^(l×d) est la matrice de poids reliant l'entrée actuelle x_t ∈ ℝ^d à l'état caché actuel h_t ∈ ℝ^l.
- b_h est le vecteur de biais pour le calcul de l'état caché (b_h ∈ ℝ^l).
- g désigne une fonction d'activation non linéaire appliquée à l'état intermédiaire ; elle permet d'introduire de la non-linéarité dans le modèle. Des exemples courants incluent la fonction tangente hyperbolique (tanh) ou la fonction ReLU.

La figure 6.8 illustre le fonctionnement interne d'un réseau de neurones récurrent (RNN), en représentant l'enchaînement temporel de plusieurs cellules récurrentes interconnectées. Elle met en évidence la propagation des informations d'un pas de temps à l'autre via les états cachés. *(figure non reproduite)*

La deuxième étape du passage avant calcule la sortie ŷ_t en transformant l'état caché h_t au moyen d'une couche de sortie, selon l'équation suivante (6.6) :

```
ŷ_t = g(W_y · h_t + b_y)
```

Figure 6.8 - Fonctionnement interne d'un RNN au travers de plusieurs cellules récurrentes connectées temporellement. Chaque cellule prend en entrée l'état caché du pas précédent (h_{t-1}) et l'entrée actuelle (x_t), puis calcule l'état caché courant (h_t) à l'aide d'une fonction d'activation (tanh). À partir de cet état, une sortie prédite (ŷ_t) est générée en appliquant une transformation linéaire pondérée par W_y suivie d'une fonction d'activation appropriée (par exemple, softmax). *(figure non reproduite)*

Dans cette équation, W_y représente la matrice de poids de la couche de sortie, b_y correspond au terme de biais, et g désigne une fonction d'activation choisie en fonction de la nature de la tâche : par exemple, la fonction softmax pour les tâches de classification, ou une fonction linéaire dans le cas de prédictions continues.

Ensemble, les équations (6.5) et (6.6), décrivant respectivement l'état caché (h_t) et la sortie (ŷ_t), permettent au RNN de traiter des données séquentielles en tenant compte du contexte temporel passé, et de générer une sortie pertinente à chaque pas de temps.

**2. Calcul de la fonction de perte**

Comme pour les réseaux de neurones classiques, les réseaux de neurones récurrents sont entraînés en minimisant une fonction de coût L. Pendant l'entraînement, les sorties prédites {ŷ_t} sont comparées aux vraies sorties {y_t} via une fonction de perte ℓ(ŷ_t, y_t), qui évalue l'erreur à chaque pas de temps t (voir la figure 6.9).

La fonction de coût totale L est définie comme la somme des pertes sur tous les pas de temps :

```
L = Σ_{t=1}^{T} ℓ(ŷ_t, y_t)
```

La fonction de coût totale permet d'estimer l'erreur du modèle et d'ajuster ses poids lors de la rétropropagation à travers le temps.

**3. Rétropropagation à travers le temps**

Dans un réseau de neurones récurrents, les gradients sont calculés à l'aide de la règle de la chaîne. Deux types de gradients sont ainsi déterminés :

- Le gradient par rapport à la sortie, ∂L/∂ŷ_t, ajuste uniquement les paramètres de la couche de sortie (W_y et b_y).
- Le gradient par rapport à l'état caché, ∂L/∂h_t, tient compte de l'effet de h_t à la fois sur la sortie ŷ_t et sur les états futurs du réseau. Il permet ainsi d'ajuster les connexions récurrentes (W_h et b_h).

Figure 6.9 - Évaluation de la fonction de perte L à chaque pas temporel par une comparaison entre les sorties prédites (ŷ_{t-1}, ŷ_t, ŷ_{t+1}) et les valeurs réelles (y_{t-1}, y_t, y_{t+1}) correspondantes. La fonction de coût totale L est définie comme la somme des pertes sur tous les pas de temps. *(figure non reproduite)*

**Gradient de la perte par rapport à la sortie.** Ce gradient quantifie directement la différence entre les sorties prédites (ŷ_t) et les valeurs réelles (y_t). Pour chaque pas de temps t, le gradient de la perte totale L par rapport à la sortie y_t est donné par :

```
∂L/∂ŷ_t = ∂ℓ(ŷ_t, y_t)/∂ŷ_t
```

Dans cette équation :
- ŷ_t est la sortie prédite au pas de temps t,
- y_t est la valeur cible associée,
- ℓ(ŷ_t, y_t) désigne la fonction de perte (par exemple, l'entropie croisée ou l'erreur quadratique moyenne).

**Gradient de la perte par rapport à l'état caché.** Le gradient de la perte totale L par rapport à l'état caché h_t s'écrit comme la somme du gradient provenant de la sortie actuelle ŷ_t et du gradient rétropropagé depuis l'état caché suivant h_{t+1} :

- Le premier terme correspond au gradient provenant de la sortie actuelle ŷ_t. Cela reflète l'impact direct de l'état caché h_t sur la perte via la sortie.
- Le second terme représente le gradient rétropropagé depuis l'état caché suivant h_{t+1}. Cela reflète les dépendances temporelles des états cachés successifs.

**4. Mise à jour des paramètres**

Après calcul des gradients, les paramètres sont mis à jour en utilisant une méthode d'optimisation comme la descente de gradient stochastique (SGD) (équation 6.7) :

```
θ ← θ - η · ∂L/∂θ
```

Dans cette équation :
- θ représente un paramètre (par exemple, W_h, W_x, b_h).
- η est le taux d'apprentissage.

Ce processus est répété sur plusieurs itérations (ou époques), jusqu'à convergence du modèle vers un ensemble de paramètres permettant une généralisation satisfaisante sur des séquences non vues.

> L'article « Backpropagation Through Time: What It Does and How to Do It » de Paul J. Werbos (1990) constitue une avancée méthodologique majeure dans le domaine de l'apprentissage séquentiel. Cet article introduit formellement la méthode de rétropropagation à travers le temps (BPTT), une extension de la rétropropagation classique adaptée aux architectures récurrentes. Werbos y détaille comment calculer efficacement les gradients en tenant compte des dépendances temporelles, jetant ainsi les bases mathématiques de l'entraînement des RNN. Ce travail reste fondamental pour comprendre le fonctionnement interne des réseaux de neurones dynamiques, dont les RNN.

**Exemple 6.4** — Nous continuons avec l'ensemble de données sur les actions de MasterCard du 25 mai 2006 au 11 octobre 2021 pour développer le modèle RNN.

L'extrait de code 6.6 débute par la création d'un modèle séquentiel intégrant une couche `SimpleRNN` composée de 125 unités et utilisant la fonction d'activation tangente hyperbolique (tanh), adaptée au traitement de séquences d'entrée de forme (n_steps, features). Une couche `Dropout`, avec un taux de 20 %, est ensuite ajoutée afin de limiter le surapprentissage, en désactivant aléatoirement certains neurones lors de chaque itération d'entraînement. La couche de sortie consiste en une couche dense à une seule unité, ce qui la rend particulièrement adaptée aux tâches de régression produisant une sortie scalaire. Enfin, le modèle est compilé avec la fonction de perte MSE (erreur quadratique moyenne), couramment utilisée pour les problèmes de régression.

Extrait de code 6.6 - Création d'un modèle séquentiel RNN avec l'API Séquentielle de Keras.
```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, SimpleRNN, Dropout
from tensorflow.keras.optimizers import RMSprop

# Définir le modèle RNN en utilisant l'API Séquentielle de Keras
model_rnn = Sequential()

# Ajouter une couche récurrente SimpleRNN avec 125 unités
model_rnn.add(SimpleRNN(units=125, activation="tanh",
                         input_shape=(n_steps, features)))

# Ajouter une couche Dropout avec un taux de 20% pour régulariser le modèle
model_rnn.add(Dropout(0.2, seed=seed_value))

# Ajouter une couche de sortie dense avec 1 seule unité
# (convient aux tâches de régression, prédiction d'une valeur continue)
model_rnn.add(Dense(units=1))

# Définir le taux d'apprentissage de l'optimiseur RMSprop
learning_rate = 0.0001
optimizer = RMSprop(learning_rate=learning_rate)

# Compiler le modèle en spécifiant l'optimiseur et la fonction de perte
model_rnn.compile(optimizer=optimizer, loss="mse")

# Afficher un résumé de l'architecture du modèle
model_rnn.summary()
```

Le tableau ci-dessous résume l'architecture du modèle obtenu, en détaillant les couches (Layer), la structure des sorties (Output shape) et le nombre de paramètres (Param #) :

Model: "sequential"

| Layer (type) | Output Shape | Param # |
|---|---|---|
| simple_rnn (SimpleRNN) | (None, 125) | 15,875 |
| dropout (Dropout) | (None, 125) | 0 |
| dense (Dense) | (None, 1) | 126 |

Total params: 16,001 (62.50 KB)
Trainable params: 16,001 (62.50 KB)
Non-trainable params: 0 (0.00 B)

Les paramètres de la couche RNN sont calculés comme suit :
```
Paramètres = (Units × (Input Features + 1)) + (Units × Units)
```

Dans notre cas, le nombre de paramètres de la couche RNN est 15 875 (125 × (1 + 1) + 125 × 125). La couche `Dropout` n'a aucun paramètre entraînable, car elle se contente de désactiver aléatoirement des unités pendant l'entraînement. Ensuite, la couche de sortie est réduite à une seule valeur (dimension 1), typique pour une régression.

> La taille des couches cachées d'un RNN influence directement la capacité du réseau à capturer la complexité des données. Une augmentation du nombre de neurones permet de modéliser des relations plus complexes, mais cela peut également accroître le risque de surapprentissage. Pour commencer, il est conseillé d'opter pour une taille située entre 128 et 512 unités. Ce choix doit toutefois être ajusté en fonction des ressources disponibles et de la complexité des données traitées.
> Le nombre de couches dans un RNN dépend aussi de la complexité de la tâche à traiter. Pour des tâches simples, une seule couche peut être suffisante. En revanche, pour des problèmes plus complexes, il est recommandé d'utiliser entre 2 et 4 couches empilées. Cependant, il est essentiel de procéder par étapes et de tester progressivement l'ajout de couches afin de minimiser le risque de surajustement.

L'entraînement du modèle s'effectue à l'aide de la méthode `fit()`, qui ajuste ses poids en fonction des erreurs mesurées sur les ensembles d'entraînement et de validation (voir l'extrait de code 6.7). L'historique de l'entraînement du modèle, incluant les pertes (erreurs) pour chaque époque sur les données d'entraînement et de validation, est sauvegardé dans l'objet `history_rnn`. Nous pouvons ainsi utiliser cet objet pour tracer les courbes d'apprentissage qui illustrent l'évolution de la perte d'entraînement et de validation au fil des époques.

Extrait de code 6.7 - Entraînement du modèle RNN.
```python
history_rnn = model_rnn.fit(X_train, y_train,
                             epochs=100,        # Nombre d'époques
                             batch_size=32,      # Taille du batch
                             validation_data=(X_val, y_val))
```

L'analyse de la courbe d'apprentissage de la figure 6.10 peut être décomposée en trois phases *(figure non reproduite)*. Dans les premières époques (0 à 10), nous observons une forte chute des pertes d'entraînement et de validation, indiquant un apprentissage initial efficace. Toutefois, la courbe de validation présente des oscillations marquées, probablement dues à un jeu de validation de petite taille ou bruité, ou encore à une forte sensibilité du modèle aux variations des mini-lots.

Durant les époques intermédiaires (10 à 40), la perte d'entraînement continue à diminuer de manière régulière, tandis que la perte de validation reste globalement faible, bien qu'un peu plus fluctuante. Ces fluctuations modérées peuvent refléter une certaine variance dans le comportement du modèle face aux données de validation.

Enfin, à partir de l'époque 40 environ, les deux courbes deviennent proches et relativement stables. L'absence de divergence significative entre les courbes d'entraînement et de validation suggère que le modèle ne souffre pas de surapprentissage et qu'il parvient à généraliser correctement aux données non vues.

Figure 6.10 - Courbe de perte sur les données d'entraînement et de validation. *(figure non reproduite)*

Une fois le modèle RNN entraîné, vous pouvez faire des prédictions sur un ensemble de test. Cette opération est suivie d'une remise à l'échelle d'origine qui permet d'exprimer les prédictions finales dans l'unité originale des données (voir l'extrait de code 6.8).

Extrait de code 6.8 - Test du modèle RNN.
```python
# Utilisation du modèle RNN pour les prédictions
predicted_stock_price_rnn = model_rnn.predict(X_test)

# Appliquer l'inverse de la transformation pour obtenir les valeurs originales
predicted_stock_price_rnn = sc.inverse_transform(predicted_stock_price_rnn)
```

Maintenant, si vous désirez comparer les valeurs réelles des prix des actions provenant de l'ensemble de test aux valeurs prédites par le modèle, vous devez décaler les données. En effet, lorsque nous avons réalisé des prédictions à partir de séquences, comme dans le cas d'un modèle RNN pour les séries temporelles, il y a un décalage naturel entre les données d'entrée et les valeurs que vous essayez de prédire.

Dans notre cas, nous avons segmenté les données d'entrée en séquences de `n_steps = 60` jours. Chaque séquence est utilisée pour prédire la valeur du jour suivant. En l'occurrence, si la séquence considérée contient les données des jours 1 à 60, alors le modèle permettra de prédire le prix du jour 61. D'où le besoin de faire le décalage. Autrement, vous compareriez les prédictions à un ensemble de valeurs décalées par rapport à ce que le modèle essaie réellement de prédire, ce qui rendrait l'évaluation incorrecte.

La figure 6.11 permet de visualiser les performances du modèle RNN obtenu en traçant les valeurs réelles des prix des actions (en bleu) par rapport aux valeurs prédites (en orange). La courbe orange est décalée de 60 points par rapport à la courbe bleue. *(figure non reproduite)*

Figure 6.11 - Prédiction des prix des actions en utilisant un modèle RNN. *(figure non reproduite)*

Il est également possible d'évaluer l'écart moyen entre les valeurs réelles et les valeurs prédites à l'aide de l'erreur quadratique moyenne (RMSE). Cette mesure, illustrée dans le code 6.9, permet de quantifier la performance globale d'un modèle de prédiction.

Extrait de code 6.9 - Évaluation de la performance par l'erreur quadratique moyenne (RMSE).
```python
from sklearn.metrics import mean_squared_error

rmse = np.sqrt(mean_squared_error(actual_stock_price, predicted_stock_price_rnn))
print(f"L'erreur quadratique moyenne du RNN simple est égale à {rmse:.2f}.")
```

```
L'erreur quadratique moyenne du RNN simple est égale à 7.76.
```

### 6.4.5 Réseaux de neurones récurrents profonds

Les réseaux de neurones récurrents profonds (Deep RNNs) sont une extension puissante des RNN, permettant de reconnaître des motifs plus complexes dans des données séquentielles. En empilant plusieurs couches de RNN, ils permettent de concevoir des modèles capables de capturer différents niveaux d'abstraction, améliorant ainsi les performances dans des tâches comme l'analyse des sentiments.

En pratique, l'utilisation de RNN très profonds (au-delà de 3 à 4 couches) est déconseillée. En effet, la profondeur fait apparaître rapidement les problèmes de disparition du gradient et compromet la stabilité et l'efficacité de l'apprentissage (voir la figure 6.12).

Les cellules RNN ont un mécanisme de rétroaction qui leur permet de mémoriser les informations passées. Cependant, ils présentent certaines limites. En effet, les RNN simples ont du mal à apprendre sur de longues séquences en raison de la difficulté de propager les gradients au fur et à mesure que la séquence devient plus longue. Cela provoque l'oubli des informations lointaines (à long terme).

Figure 6.12 - Réseau de neurones récurrent : (a) RNN avec une couche cachée, (b) RNN avec plusieurs couches cachées. Chaque rectangle représente un vecteur et les flèches symbolisent des fonctions. Les vecteurs d'entrée sont en bleu, les vecteurs de sortie en mauve, et les vecteurs verts stockent les états du RNN. *(figure non reproduite)*

Pour pallier ces limitations, des variantes plus complexes des RNN, telles que les mémoires à long court terme (Long Short-Term Memory, LSTM), les unités récurrentes à porte (Gated Recurrent Unit, GRU) et les RNN bidirectionnels (Bidirectional RNN, BiRNN) ont été développées. Ces architectures intègrent des mécanismes internes permettant une gestion plus efficace des dépendances à long terme. Nous aborderons en détail ces trois types de RNN dans la suite de ce chapitre.

## 6.5 Mémoires à long court terme (LSTM)

Tout comme les réseaux RNN, les LSTM possèdent un état caché noté h_t. Cependant, ils introduisent un second état, c_t, dédié à la gestion de la mémoire à long terme. Dans ce modèle, h_t représente la mémoire à court terme, tandis que c_t permet de conserver les informations sur de longues périodes. La cellule mémoire d'un LSTM est composée de plusieurs portes qui gèrent le flux d'informations à l'intérieur de la cellule mémoire et qui permettent ainsi de contrôler les informations à retenir et celles à oublier.

> Les termes état caché et couche cachée sont souvent interchangés, bien qu'ils se réfèrent à des concepts distincts. Ceci est dû à leur forte interdépendance. En effet, l'état caché fait référence à la composante temporelle et dynamique qui évolue au fil du temps dans le LSTM, tandis que la couche cachée désigne une composante structurelle, correspondant à un niveau dans l'architecture globale du réseau où les transformations des données sont effectuées. Ainsi, une couche cachée peut contenir plusieurs unités récurrentes, chacune maintenant son propre état caché à chaque pas de temps.

Ces portes dotent les LSTM de la capacité de mémoriser des informations importantes sur de longues séquences et d'ignorer les éléments moins pertinents. La combinaison de ces trois portes permet au réseau LSTM de gérer efficacement les dépendances à long terme. Lors de la rétropropagation du gradient, les LSTM peuvent maintenir un flux d'informations constant à travers le temps, évitant ainsi le problème d'évanouissement du gradient (décrit à la section 4.1) et permettant un apprentissage plus stable et plus précis.

> Une porte est un mécanisme qui permet de contrôler et de réguler le flux d'informations à travers les états du réseau. Ce mécanisme est essentiel pour la gestion des dépendances temporelles longues et complexes typiques des données séquentielles. Concrètement, une porte applique une transformation linéaire suivie d'une activation sigmoïde, ce qui permet de moduler sélectivement quelles informations doivent être conservées, mises à jour ou oubliées à chaque étape temporelle.

### 6.5.1 Architecture des LSTM

Une unité LSTM est constituée d'une porte d'oubli (Forget Gate), d'une porte d'entrée (Input Gate), d'une cellule d'état (Cell State) et d'une porte de sortie (Output Gate).

Pour faciliter la compréhension du fonctionnement interne du LSTM, nous proposons une analogie qui le compare à un filtre encore plus structuré de la mémoire humaine. Imaginons un étudiant qui assiste à un long cours et qui prend des notes tout en maintenant une mémoire de travail plus stable en parallèle. Cet étudiant doit décider en permanence : « quelles informations de ses notes précédentes sont encore utiles et doivent être conservées dans sa mémoire de long terme ? », « quand il est préférable de faire abstraction d'un contexte antérieur devenu non pertinent ? » et « comment intégrer efficacement les nouvelles informations du cours à sa mémoire actuelle ? »

C'est exactement ce que fait un LSTM grâce à ses trois portes et sa cellule mémoire. La porte d'oubli (f_t) joue le rôle du jugement critique de l'étudiant qui choisit quelles anciennes informations doivent être effacées de sa mémoire à long terme. C'est comme s'il se disait : « Cette partie du cours n'est plus utile pour comprendre ce qui suit. Je vais l'oublier. » Techniquement, cette porte module l'influence de l'état mémoire précédent c_{t-1} sur l'état courant.

La porte d'entrée (i_t) détermine quelles nouvelles informations doivent être intégrées dans la mémoire. L'étudiant réfléchit alors : « Cette nouvelle idée est importante, je vais l'ajouter à mes notes de référence. » Cette porte agit conjointement avec le vecteur d'état candidat c̃_t, qui propose une nouvelle information basée sur l'entrée actuelle et l'état caché précédent.

La porte de sortie (o_t) permet à l'étudiant de décider ce qu'il doit retenir activement pour comprendre ce qui se passe à l'instant présent. C'est son attention immédiate, extraite de la mémoire : « Pour répondre à la question actuelle, je me concentre sur cette partie de ma mémoire. »

Enfin, la cellule mémoire (c_t) correspond au carnet de notes de long terme de l'étudiant, qui s'enrichit et se purifie au fil de la séquence, tandis que l'état caché (h_t) représente ce qu'il garde à l'esprit de manière active pour suivre et interpréter le déroulement du cours. Ainsi, le LSTM, tel un étudiant attentif et méthodique, organise sa mémoire de manière structurée grâce à des mécanismes spécialisés de filtrage, d'oubli, de mise à jour et de restitution.

En combinant ces mécanismes, un LSTM, tout comme le cerveau humain, peut gérer efficacement des informations complexes sur une période prolongée, en sélectionnant avec précision ce qu'il faut oublier, mémoriser et exploiter au moment opportun, tout en s'appuyant sur des opérations mathématiques, comme décrit dans la suite.

**1. La porte d'oubli**

Comme son nom l'indique, la porte d'oubli décide si l'information doit être conservée ou oubliée (voir la figure 6.13, non reproduite).

Formellement, la porte d'oubli reçoit x_t et l'information de l'état caché précédent h_{t-1}, et leur applique une fonction sigmoïde pour obtenir la sortie f_t (équation 6.7) :

```
f_t = σ(W_f · h_{t-1} + U_f · x_t + b_f)
```

Dans cette équation :
- W_f ∈ ℝ^(l×l) est la matrice de poids pour l'état caché précédent.
- h_{t-1} est la valeur de sortie qui a été prédite par la couche LSTM précédente.
- U_f ∈ ℝ^(l×d) est la matrice de poids pour l'entrée actuelle.
- x_t représente les données d'entrée au réseau de neurones.
- b_f ∈ ℝ^l est le biais.

La fonction sigmoïde est appliquée pour renvoyer une valeur comprise entre 0 et 1. Si la sortie de la sigmoïde est proche de 0, cela signifie que l'information doit être oubliée, et si elle est proche de 1, alors elle sera mémorisée pour la suite.

**2. La porte d'entrée**

La porte d'entrée se charge de décider quelles sont les nouvelles valeurs de x_t qui seront autorisées à passer. Celles-ci vont être stockées dans la cellule mémoire qui va servir à la prise de décision.

La porte d'entrée contrôle quelles nouvelles informations ajouter à l'état de cellule (équation 6.8) :

```
i_t = σ(W_i · h_{t-1} + U_i · x_t + b_i)
```

Le candidat d'état de cellule propose de nouvelles valeurs (équation 6.9) :

```
c̃_t = tanh(W_c · h_{t-1} + U_c · x_t + b_c)
```

Dans ces équations :
- Les matrices de poids W_i, W_c ∈ ℝ^(l×l) sont appliquées à l'état caché précédent (h_{t-1}) lors des calculs de la porte d'entrée (i_t) et du candidat d'état de cellule (c̃_t). Leur rôle est de capturer les relations entre l'état caché précédent et la porte d'entrée (i_t), et les relations entre l'état caché précédent et le candidat d'état de cellule (c̃_t).
- Les matrices de poids U_i, U_c ∈ ℝ^(l×d) sont appliquées à l'entrée actuelle (x_t) lors des calculs de la porte d'entrée (i_t) et du candidat d'état de cellule (c̃_t). Leur rôle est de capturer l'influence de l'entrée actuelle sur la porte d'entrée (i_t) et sur le candidat d'état de cellule (c̃_t).
- Les vecteurs de biais b_i, b_c ∈ ℝ^l sont ajoutés respectivement aux calculs de la porte d'entrée (i_t) et du candidat d'état de cellule (c̃_t) pour ajuster les activations.

**3. La mise à jour de l'état de la cellule**

La mise à jour de l'état de la cellule se réalise en intégrant deux contributions principales : l'effet de la porte d'oubli f_t sur l'état de la cellule précédent c_{t-1}, et l'effet de la porte d'entrée i_t sur le nouvel état candidat c̃_t.

L'équation de mise à jour de l'état de la cellule est alors donnée par (équation 6.10) :

```
c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t
```

où ⊙ représente le produit élément par élément (produit de Hadamard).

L'équation (6.10) met à jour l'état de la cellule c_t en combinant l'ancienne mémoire c_{t-1}, modulée par la porte d'oubli f_t, et la nouvelle information candidate c̃_t, pondérée par la porte d'entrée i_t.

Grâce à cette mise à jour, le LSTM peut ajuster de manière dynamique la quantité d'informations à conserver ou à remplacer, permettant ainsi de mieux gérer les dépendances à long terme et d'atténuer le problème de disparition du gradient. Cette capacité d'ajustement dynamique repose sur un mécanisme de portes apprises, activées à chaque pas de temps.

> Le produit de Hadamard, également appelé produit élément par élément ou produit Schur, est une opération mathématique définie sur deux matrices de mêmes dimensions. Contrairement au produit matriciel standard, le produit de Hadamard consiste à multiplier les éléments correspondants des deux matrices. Soient A et B deux matrices de dimensions identiques m × n. Le produit de Hadamard C = A ⊙ B est une matrice de même dimension m × n, où chaque élément c_ij est obtenu en multipliant les éléments correspondants a_ij et b_ij des matrices A et B.

**4. La porte de sortie**

La porte de sortie décide de l'information qui sera transmise à l'état caché suivant. Formellement, la porte de sortie fournit une décision o_t, en fonction de l'entrée x_t, qui servira pour le bloc LSTM suivant. La valeur o_t est calculée selon l'équation suivante (6.11) :

```
o_t = σ(W_o · h_{t-1} + U_o · x_t + b_o)
```

Dans cette équation :
- o_t est la valeur de sortie de la porte au temps t.
- σ est la fonction d'activation sigmoïde, utilisée pour contraindre les valeurs de sortie de la porte entre 0 et 1.
- W_o ∈ ℝ^(l×l) est la matrice de poids appliquée à l'état caché précédent h_{t-1}. Elle permet de capturer les relations entre l'état caché précédent et la porte de sortie.
- U_o ∈ ℝ^(l×d) est la matrice de poids appliquée à l'entrée actuelle x_t. Son rôle est de capturer l'influence de l'entrée actuelle sur la porte de sortie.
- b_o ∈ ℝ^l est le biais associé à la porte de sortie.

Après le calcul de o_t, l'état caché h_t est mis à jour en utilisant l'état de la cellule c_t et la sortie de la porte de sortie (équation 6.12) :

```
h_t = o_t ⊙ tanh(c_t)
```

> L'article « Long Short-Term Memory » de Sepp Hochreiter et Jürgen Schmidhuber, publié en 1997, est une contribution majeure dans le domaine des réseaux de neurones récurrents. Cet article introduit l'architecture LSTM, conçue pour surmonter les limitations des RNN classiques en matière de capture des dépendances à long terme. Cette avancée a ouvert la voie à des applications efficaces des réseaux récurrents dans des domaines tels que la reconnaissance vocale, la traduction automatique et le traitement du langage naturel.

### 6.5.2 Entraînement d'un LSTM

L'entraînement des LSTM suit un processus similaire à celui des RNN simples, mais intègre des mécanismes spécifiques pour mieux gérer les dépendances à long terme grâce à leurs portes d'entrée, d'oubli et de sortie.

Comme pour les RNN, l'objectif principal est de minimiser une fonction de perte qui mesure l'écart entre les prédictions du modèle et les valeurs cibles, souvent en utilisant des algorithmes comme la descente de gradient stochastique ou ses variantes. Cependant, l'entraînement des LSTM se distingue par l'utilisation de la rétropropagation à travers le temps (BPTT), adaptée à leur structure. Dans ce processus, le calcul des gradients prend en compte non seulement les paramètres classiques (poids et biais), mais aussi les interactions complexes entre les états de cellule, les sorties des portes et les états cachés.

Les LSTM bénéficient de la capacité à conserver des gradients non évanescents grâce à leur architecture, ce qui les rend particulièrement efficaces pour apprendre des relations séquentielles longues et capturer les dépendances temporelles sur des périodes prolongées. Pendant l'entraînement, chaque cellule LSTM ajuste ses paramètres internes, tels que les matrices de poids et les vecteurs de biais associés à chaque porte, pour optimiser le flux d'informations pertinent à travers la séquence. Cela leur permet de traiter efficacement des données séquentielles complexes, où les RNN simples échouent souvent en raison du problème du gradient qui s'évanouit. Les principales étapes d'entraînement d'un réseau LSTM sont les suivantes :

**1. Initialisation des poids**

Avant de commencer l'apprentissage, les poids et les biais de toutes les portes du LSTM, à savoir la porte d'oubli, la porte d'entrée, la mise à jour de la cellule et la porte de sortie, sont initialisés. Cette initialisation peut être réalisée de manière aléatoire ou bien peut suivre une méthode spécifique comme l'initialisation de Glorot ou de He (voir la section 4.1.1). Une bonne initialisation permet, rappelons-le, d'éviter l'explosion ou la disparition du gradient, deux problèmes fréquents dans l'entraînement des réseaux récurrents profonds. Elle contribue également à accélérer la convergence de l'algorithme d'optimisation, en fournissant des conditions de départ plus favorables.

**2. Propagation avant**

Lors de la propagation avant, les données d'entrée sont traitées séquentiellement à travers le réseau, un élément de la séquence à la fois. À chaque pas de temps t, l'état de la cellule et l'état caché sont mis à jour en fonction de l'entrée actuelle et de l'état du réseau à l'instant précédent, selon les équations (6.8) à (6.12).

**3. Calcul de la perte**

La fonction de coût totale L est définie comme la somme des pertes sur tous les pas de temps entre les sorties prédites et les valeurs réelles :

```
L = Σ_{t=1}^{T} ℓ(ŷ_t, y_t)
```

où ℓ(ŷ_t, y_t) représente la fonction de perte appliquée à l'instant t. Les termes ŷ_t et y_t désignent respectivement les sorties prédites et les valeurs réelles, qui peuvent être des vecteurs dans le cas d'une sortie multidimensionnelle.

Cette fonction de coût permet d'évaluer l'erreur du modèle et guide l'ajustement des poids à l'aide de la rétropropagation à travers le temps (BPTT).

**4. Rétropropagation à travers le temps pour un LSTM**

Dans un LSTM, les gradients sont également calculés à l'aide de la règle de la chaîne, mais ils doivent prendre en compte les portes de l'unité LSTM et la cellule mémoire. Comme pour un RNN, plusieurs types de gradients sont ainsi déterminés :

- Le gradient par rapport à la sortie, ∂L/∂ŷ_t.
- Le gradient par rapport à l'état caché, ∂L/∂h_t.
- Le gradient par rapport à l'état de cellule, ∂L/∂c_t, est essentiel dans les LSTM, car la cellule mémoire transporte l'information à travers plusieurs pas de temps. Il est influencé par la porte d'oubli (f_t) et la porte de sortie (o_t), et permet d'ajuster les poids des portes (W_f, W_i, W_c, W_o) ainsi que leurs biais associés (b_f, b_i, b_c, b_o).

**Gradient par rapport à la sortie.** Le gradient par rapport à la sortie, ∂L/∂ŷ_t, ajuste uniquement les paramètres de la couche de sortie (W_y et b_y) (équation 6.13) :

```
∂L/∂ŷ_t = ∂ℓ(ŷ_t, y_t)/∂ŷ_t
```

Dans cette équation :
- ŷ_t est la sortie prédite au pas de temps t,
- y_t est la cible associée,
- ℓ(ŷ_t, y_t) est la fonction de perte (par exemple, l'entropie croisée ou l'erreur quadratique moyenne).

**Gradient par rapport aux états cachés et à la cellule mémoire.** Dans un LSTM, l'état caché h_t et l'état de cellule c_t interagissent à travers plusieurs portes (entrée, oubli, sortie), ce qui influence la rétropropagation. Ainsi, la rétropropagation implique plusieurs gradients faisant intervenir la sortie de la porte de sortie o_t, la sortie de la porte d'oubli du pas de temps suivant f_{t+1}, la dérivée de la fonction d'activation appliquée à c_t, et le produit élément par élément (Hadamard). Chaque gradient doit être rétropropagé à travers les différentes portes (i_t, f_t, o_t) et les poids associés (W_f, W_i, W_c, W_o).

**5. Mise à jour des paramètres**

Une fois les gradients calculés, les paramètres sont mis à jour en utilisant une méthode d'optimisation comme la descente de gradient stochastique (SGD) ou des variantes plus avancées comme Adam :

```
θ ← θ - η · ∂L/∂θ
```

où θ représente l'ensemble des poids et biais du LSTM (W_f, W_i, W_c, W_o, b_f, b_i, b_c, b_o), et η est le taux d'apprentissage.

Les étapes de propagation avant, rétropropagation, calcul de la perte et mise à jour des poids sont répétées sur plusieurs époques jusqu'à ce que la perte converge ou atteigne un niveau satisfaisant.

**Exemple 6.5** — Le but de cet exemple est de développer un modèle LSTM sur le même jeu de données MasterCard.

Nous commençons par importer les librairies nécessaires tel que réalisé dans l'exemple précédent, auxquelles nous ajoutons LSTM. Le code 6.10 définit un modèle basé sur une architecture LSTM pour traiter des données séquentielles. Le modèle utilise la classe `Sequential` de Keras, qui permet de construire un modèle en empilant les couches de manière linéaire.

La première couche est une couche LSTM avec 125 unités cachées et une fonction d'activation tanh, adaptée pour capturer des dépendances temporelles dans les séquences d'entrée. Cette couche reçoit des données d'entrée dont la forme est spécifiée par `(n_steps, features)`, où `n_steps` représente le nombre de pas dans la séquence et `features` le nombre de caractéristiques par pas. Une couche `Dropout` est ajoutée avec un taux de 20 % pour réduire le risque de surapprentissage en désactivant de manière aléatoire certaines connexions pendant l'entraînement. Ensuite, une couche dense avec une seule unité est ajoutée comme couche de sortie, adaptée pour une tâche de régression. Un optimiseur RMSprop avec un taux d'apprentissage personnalisé de 0.0001 est défini pour ajuster les poids du modèle. La fonction de perte utilisée est l'erreur quadratique moyenne, couramment employée dans les tâches de régression pour minimiser la différence entre les prédictions et les valeurs cibles.

Extrait de code 6.10 - Développement d'un modèle LSTM.
```python
from tensorflow.keras.layers import LSTM

# Définir le modèle LSTM en utilisant l'API Séquentielle de Keras
model_lstm = Sequential()

# Ajouter une couche LSTM avec 125 unités (cellules mémoire)
model_lstm.add(LSTM(units=125,
                     activation="tanh",
                     input_shape=(n_steps, features)))

# Ajouter une couche Dropout avec un taux de 20 %
model_lstm.add(Dropout(0.2, seed=seed_value))

# Ajouter une couche Dense avec 1 seule unité en sortie
model_lstm.add(Dense(units=1))

# Définir l'optimiseur RMSprop avec un taux d'apprentissage très faible
learning_rate = 0.0001
optimizer = RMSprop(learning_rate=learning_rate)

# Compiler le modèle en spécifiant l'optimiseur et la fonction de perte
model_lstm.compile(optimizer=optimizer, loss="mse")

# Afficher un résumé de l'architecture du modèle
model_lstm.summary()
```

Le nombre total de paramètres du modèle `model_lstm` est de 63 626, qui sont tous entraînables.

À titre de comparaison, le modèle `model_lstm` comprend un total de 63 626 paramètres, tandis que le modèle `model_rnn`, basé sur une couche `SimpleRNN` comportant le même nombre d'unités (125), n'en compte que 16 001. Le LSTM possède ainsi environ quatre fois plus de paramètres, ce qui s'explique par son architecture interne plus sophistiquée. Celle-ci repose sur plusieurs mécanismes de contrôle dont la porte d'entrée, la porte d'oubli, la porte de sortie et l'état mémoire.

Model: "sequential"

| Layer (type) | Output Shape | Param # |
|---|---|---|
| lstm (LSTM) | (None, 125) | 63,500 |
| dropout (Dropout) | (None, 125) | 0 |
| dense (Dense) | (None, 1) | 126 |

Total params: 63,626 (248.54 KB)
Trainable params: 63,626 (248.54 KB)
Non-trainable params: 0 (0.00 B)

L'entraînement du modèle LSTM est effectué sur 100 époques, en utilisant une taille de lot (batch size) de 32, identique à celle employée pour le modèle SimpleRNN (voir l'extrait de code 6.11).

Extrait de code 6.11 - Entraînement, prédiction et évaluation du modèle LSTM.
```python
# Entraîner le modèle LSTM
history_lstm = model_lstm.fit(X_train, y_train,
                               epochs=100,          # Nombre d'époques
                               batch_size=32,        # Taille du batch
                               validation_data=(X_val, y_val))

# Utiliser le modèle LSTM pour les prédictions
predicted_stock_price_lstm = model_lstm.predict(X_test)

# Appliquer l'inverse de la transformation pour obtenir les valeurs originales
predicted_stock_price_lstm = sc.inverse_transform(predicted_stock_price_lstm)

# Calcul de l'erreur quadratique moyenne (RMSE)
rmse = np.sqrt(mean_squared_error(actual_stock_price, predicted_stock_price_lstm))
print(f"L'erreur quadratique moyenne du LSTM est égale à {rmse:.2f}")
```

```
L'erreur quadratique moyenne du LSTM est égale à 8.06. Cette valeur est légèrement plus
faible que le RNN simple (7.76).
```

La figure 6.14 illustre les performances du modèle LSTM en comparant les valeurs réelles (en bleu) et les valeurs prédites (en orange) de la variable `High`, correspondant aux prix les plus élevés des actions *(figure non reproduite)*. Le modèle LSTM parvient à suivre correctement la tendance globale du prix des actions. Les hausses et baisses principales sont bien reproduites avec un léger décalage temporel. Cela témoigne de la capacité du modèle à capter les structures séquentielles longues présentes dans les séries temporelles. Cependant, pour les pics et les creux brusques du prix réel, notamment autour des points 20 et 80, les prédictions ne sont pas entièrement reproduites.

Figure 6.14 - Prédiction des prix des actions en utilisant un modèle LSTM. *(figure non reproduite)*

## 6.6 Unités récurrentes fermées (GRU)

Les GRU (Gated Recurrent Units) représentent une variante simplifiée des LSTM. Comme ces derniers, ils ont été conçus pour remédier aux limitations des RNN classiques en matière de mémoire à court terme. Toutefois, contrairement aux LSTM, les GRU ne disposent pas d'une cellule mémoire distincte : ils s'appuient uniquement sur l'état caché pour stocker et transmettre l'information. Par ailleurs, ils remplacent les trois portes des LSTM par seulement deux mécanismes de contrôle : une porte de réinitialisation et une porte de mise à jour (voir la figure 6.15, non reproduite). Ces portes remplissent un rôle analogue à celles des LSTM, en modulant dynamiquement les informations à conserver ou à oublier, ce qui permet au modèle de capturer efficacement les dépendances temporelles au sein des séquences.

Alors que l'analogie avec l'étudiant et son carnet de notes illustre bien la structure riche du LSTM, il est également intéressant de considérer une version simplifiée de ce mécanisme via le GRU. Nous proposons à présent une analogie adaptée au GRU, permettant de saisir les différences clés dans la manière dont il gère la mémoire et l'apprentissage temporel.

Tout comme dans le cas du LSTM, nous faisons appel à l'image d'un étudiant assistant à un long cours, mais cette fois avec une approche plus directe et allégée de la gestion de sa mémoire. Dans cette version simplifiée, l'étudiant ne dispose plus d'un carnet de notes distinct (mémoire longue durée), mais s'appuie uniquement sur ce qu'il garde à l'esprit à chaque instant. Il doit néanmoins toujours faire preuve de discernement et se poser les questions suivantes : « Quelles anciennes notes dois-je conserver car elles sont encore pertinentes ? », « Quand dois-je ignorer ce que j'ai noté précédemment, car l'information est devenue obsolète ? », et « Comment puis-je mettre à jour mes notes à la lumière des nouvelles informations importantes ? »

C'est précisément ce que réalise le GRU à travers ses mécanismes internes. La porte de réinitialisation (r_t) permet à l'étudiant (le GRU) de faire abstraction d'anciennes informations devenues inutiles. C'est comme s'il se disait : « Cette partie du cours n'a plus rien à voir avec ce qu'on avait vu avant. Je vais ignorer mes anciennes notes. » Techniquement, cette porte contrôle dans quelle mesure les informations issues des états précédents doivent être prises en compte lors du calcul du nouvel état candidat h̃_t.

La porte de mise à jour (z_t) permet à l'étudiant de décider s'il doit conserver ses anciennes notes ou les remplacer par de nouvelles informations. Deux scénarios sont alors possibles : « Cette nouvelle information est importante, mais je vais aussi garder ce que j'avais noté plus tôt. » ou bien : « Ce nouveau point remplace totalement ce que j'avais noté avant ». Le GRU utilise cette porte pour pondérer entre l'ancien état caché h_{t-1} et l'état candidat h̃_t, définissant ainsi le nouvel état caché h_t.

Enfin, l'état caché (h_t) représente le carnet de notes actuel de l'étudiant. Il évolue tout au long de la séquence, de manière adaptative, en fonction des décisions prises par les deux portes. Ainsi, le GRU est capable de maintenir un équilibre entre la mémoire du passé et l'intégration de nouvelles informations, ce qui lui permet de modéliser efficacement des dépendances temporelles tout en évitant l'accumulation d'informations inutiles.

### 6.6.1 Architecture d'un GRU

Le GRU repose sur deux portes principales qui régulent le flux d'information à travers le réseau :

- La porte de mise à jour (z_t) détermine dans quelle mesure l'information contenue dans l'état caché précédent doit être conservée. En d'autres termes, elle contrôle la balance entre la préservation de la mémoire passée et l'intégration de nouvelles informations pertinentes issues de l'entrée actuelle.
- La porte de réinitialisation (r_t) décide dans quelle mesure les informations provenant des états passés doivent être oubliées lors du calcul de la mémoire actuelle. Cette porte est essentielle pour permettre au modèle de faire abstraction de certains contextes passés devenus non pertinents.

En plus de ces deux portes, le calcul du nouvel état caché h_t s'effectue en deux étapes supplémentaires :

- Le calcul de l'état candidat (h̃_t) est une nouvelle proposition d'état, générée à partir de l'entrée actuelle et de l'état caché précédent, modulé par la porte de réinitialisation. Ce mécanisme permet de contrôler finement la contribution du passé dans la mise à jour de la mémoire.
- L'actualisation de l'état caché (h_t) combine l'ancien état caché et l'état candidat en fonction de la porte de mise à jour. Cette opération permet au GRU d'adapter dynamiquement son état en fonction du contexte temporel, en préservant l'information pertinente tout en intégrant les nouvelles données utiles.

Nous détaillons dans la suite ces mécanismes de contrôle, en illustrant leur rôle respectif dans le traitement séquentiel des données par les GRU.

**1. Porte de mise à jour**

La porte de mise à jour contrôle la quantité d'informations que l'état caché précédent (h_{t-1}) doit conserver dans l'état caché actuel (h_t). Elle détermine également dans quelle mesure les nouvelles informations provenant de l'entrée actuelle (x_t) doivent être intégrées.

Cette porte agit comme un mécanisme de filtrage. Une valeur proche de 1 pour une dimension donnée signifie que l'information de h_{t-1} sera largement conservée, tandis qu'une valeur proche de 0 signifie que l'information sera remplacée par de nouvelles données issues de x_t :

```
z_t = σ(W_z · x_t + U_z · h_{t-1} + b_z)
```

avec :
- z_t est le vecteur de la porte de mise à jour,
- W_z, U_z sont les matrices de poids associées à x_t et h_{t-1},
- b_z est le biais,
- σ est la fonction sigmoïde, qui contraint les valeurs de z_t entre 0 et 1.

**2. Porte de réinitialisation**

La porte de réinitialisation contrôle la quantité d'informations de l'état caché précédent (h_{t-1}) qui doit être oubliée avant de combiner ces informations avec l'entrée actuelle (x_t). Elle permet au modèle de « réinitialiser » certaines dimensions de h_{t-1}, favorisant ainsi un apprentissage local des informations spécifiques à l'instant t.

Lorsque la porte de réinitialisation donne une valeur proche de 0 pour une dimension donnée, cela signifie que les informations historiques h_{t-1} sont ignorées pour cette dimension. Cela est particulièrement utile pour les tâches où certaines informations du passé ne sont plus pertinentes à l'instant actuel :

```
r_t = σ(W_r · x_t + U_r · h_{t-1} + b_r)
```

avec :
- r_t est le vecteur de la porte de réinitialisation,
- W_r, U_r sont les matrices de poids associées à x_t et h_{t-1},
- b_r est le biais,
- σ est la fonction sigmoïde.

**3. État candidat**

Une fois r_t calculé, il est appliqué à l'état caché précédent h_{t-1} pour produire une version « filtrée » de celui-ci. L'état candidat h̃_t est calculé en utilisant l'entrée actuelle x_t, l'état précédent h_{t-1} et la porte de réinitialisation r_t :

```
h̃_t = tanh(W_h · x_t + U_h · (r_t ⊙ h_{t-1}) + b_h)
```

où ⊙ représente le produit élément par élément (produit de Hadamard) et W_h, U_h sont les poids appris pour générer l'état candidat.

Le produit élément par élément (r_t ⊙ h_{t-1}) agit comme un filtre adaptatif. Lorsque r_t est proche de 0, certaines parties de h_{t-1} sont ignorées, ce qui permet d'oublier des informations obsolètes de l'état précédent. Par contre, si r_t est proche de 1, les informations de h_{t-1} sont préservées, permettant ainsi de conserver la mémoire à long terme.

**4. Calcul de l'état actuel**

Enfin, l'état actuel h_t est une combinaison linéaire de l'état précédent h_{t-1} et de l'état candidat h̃_t, modulée par la porte de mise à jour z_t :

```
h_t = z_t ⊙ h_{t-1} + (1 - z_t) ⊙ h̃_t
```

### 6.6.2 Entraînement d'un GRU

L'entraînement d'un réseau de neurones récurrent utilisant une architecture GRU suit des principes similaires à celui du LSTM, avec des simplifications dans sa structure.

Comme pour le LSTM, l'objectif est de minimiser une fonction de coût (telle que l'entropie croisée ou l'erreur quadratique moyenne) à l'aide d'algorithmes d'optimisation comme Adam ou RMSprop. Le processus repose sur la BPTT, où les gradients des paramètres (poids et biais des portes de réinitialisation, de mise à jour et de l'état candidat) sont calculés en tenant compte des dépendances temporelles.

Les GRU, étant moins complexes que les LSTM, nécessitent moins de paramètres et donc moins de ressources. Cela dit, ils sont capables de capturer les dépendances temporelles sur de longues séquences grâce à leurs mécanismes de mise à jour et de rétention des informations pertinentes via leurs portes internes.

Cette architecture est particulièrement efficace pour traiter des tâches séquentielles comme la traduction automatique ou la reconnaissance vocale.

**Exemple 6.6** — Nous continuons avec le même jeu de données pour prédire le prix le plus élevé de l'action en utilisant un GRU.

Le code 6.12 permet de créer un modèle GRU qui se compose d'une seule couche GRU avec 125 unités et une fonction d'activation tanh. La couche GRU est suivie d'une couche Dense avec une seule unité de sortie.

Extrait de code 6.12 - Création du GRU.
```python
from tensorflow.keras.layers import GRU

# Paramètres reproductibles
seed_value = 42

# Définir le modèle GRU en utilisant l'API Séquentielle de Keras
model_gru = Sequential()

# Ajouter une couche GRU avec 125 unités (cellules récurrentes)
model_gru.add(GRU(units=125, activation="tanh",
                   input_shape=(n_steps, features)))

# Ajout d'un Dropout pour régulariser
model_gru.add(Dropout(0.2, seed=seed_value))

# Ajouter une couche Dense avec une seule unité de sortie
model_gru.add(Dense(units=1))

# Définir l'optimiseur avec un taux d'apprentissage personnalisé
optimizer = RMSprop(learning_rate=0.0001)

# Compilation du modèle
model_gru.compile(optimizer=optimizer, loss="mse")

# Afficher le résumé
model_gru.summary()
```

Nous obtenons en sortie le résumé du modèle `model_gru`, qui comprend deux couches et 48 126 paramètres, tous entraînables.

Model: "sequential"

| Layer (type) | Output Shape | Param # |
|---|---|---|
| gru (GRU) | (None, 125) | 48,000 |
| dropout (Dropout) | (None, 125) | 0 |
| dense (Dense) | (None, 1) | 126 |

Total params: 48,126 (187.99 KB)
Trainable params: 48,126 (187.99 KB)
Non-trainable params: 0 (0.00 B)

Ceci est suivi de l'entraînement du modèle pendant 30 époques. Finalement, nous réalisons une prédiction sur les données de test et nous représentons la superposition des données de test réelles (`test_set`) avec les données de test prédites (`GRU_predicted_stock_price`).

Extrait de code 6.13 - Entraînement, prédiction et évaluation du modèle GRU.
```python
# Entraîner le modèle GRU
history_gru = model_gru.fit(X_train, y_train,
                             epochs=100,        # Nombre d'époques
                             batch_size=32,      # Taille du batch
                             validation_data=(X_val, y_val))

# Utilisation du modèle GRU pour les prédictions
predicted_stock_price_gru = model_gru.predict(X_test)

# Appliquer l'inverse de la transformation pour obtenir les valeurs originales
predicted_stock_price_gru = sc.inverse_transform(predicted_stock_price_gru)

# Calcul de l'erreur quadratique moyenne (RMSE)
rmse = np.sqrt(mean_squared_error(actual_stock_price, predicted_stock_price_gru))
print(f"L'erreur quadratique moyenne du GRU est égale à {rmse:.2f}")
```

```
L'erreur quadratique moyenne du GRU est égale à 6.57. Cette valeur est légèrement plus
faible que le RNN simple (7.76).
```

La figure 6.16 permet de visualiser les performances du modèle GRU obtenu en traçant les valeurs réelles des prix des actions (en bleu) par rapport aux valeurs prédites (en orange) *(figure non reproduite)*. La courbe orange suit globalement les variations de la courbe bleue : montées et descentes sont bien anticipées. Cela montre que le modèle parvient à capturer les dynamiques globales de la série temporelle.

Figure 6.16 - Prédiction des prix des actions en utilisant un modèle GRU. *(figure non reproduite)*

La figure 6.17 permet une visualisation, sur un même graphique, des prédictions effectuées par chaque modèle sur les données de test (test set), avec les RMSE suivants pour cette comparaison : LSTM (RMSE = 10,86), RNN (RMSE = 10,15), GRU (RMSE = 5,78). Cette représentation graphique permet une comparaison visuelle de la capacité de chaque modèle à capturer les dynamiques des données réelles *(figure non reproduite)*.

Figure 6.17 - Les données de test (en orange), les données de test prédites avec un LSTM (en bleu), avec un GRU (en vert) et avec RNN (en turquoise). *(figure non reproduite)*

Il aurait été pertinent de comparer la performance des trois architectures de réseaux récurrents, à savoir le RNN simple, le LSTM et le GRU, étant donné qu'ils ont été entraînés dans des conditions identiques : même nombre d'itérations, même taille de lot et même architecture en termes de nombre de couches. Cependant, une telle comparaison serait en réalité biaisée, car ces modèles ne possèdent ni la même capacité de représentation, ni la même complexité interne. Par exemple, le LSTM dispose de mécanismes de contrôle supplémentaires (trois portes et une cellule mémoire) qui le rendent mieux adapté à la capture de dépendances temporelles longues, mais aussi plus coûteux en calcul. À l'inverse, un RNN simple possède une structure beaucoup plus légère, mais souffre du phénomène de disparition du gradient. Quant au GRU, il se situe à mi-chemin entre les deux, offrant un compromis entre efficacité computationnelle et richesse des dynamiques apprises.

En conséquence, bien que l'entraînement soit effectué dans un cadre expérimental contrôlé, les performances observées reflètent autant la nature propre des architectures que l'efficacité de l'apprentissage sous les contraintes imposées. Une comparaison plus équitable exigerait un ajustement des hyperparamètres pour chaque modèle, afin de permettre à chacun d'exprimer pleinement son potentiel dans un cadre optimal.

> De nombreuses recherches concrètes ont démontré l'efficacité des RNN pour le traitement de données séquentielles dans des contextes complexes du monde réel. Leur capacité à modéliser les dynamiques temporelles les rend particulièrement adaptés à l'analyse de signaux physiologiques ou de mouvements. Par exemple, dans l'étude « An Effective Deep Neural Network Architecture for EEG-based Recognition of Emotions », les auteurs exploitent les RNN pour capturer les variations temporelles des signaux EEG et classifier les états émotionnels, une avancée prometteuse pour les interfaces cerveau-machine. De même, dans l'article « End-to-End Horse Gait Classification in Uncontrolled Environments Using Inertial Sensors », les RNN sont utilisés pour reconnaître automatiquement les allures des chevaux à partir de données issues de capteurs inertiels, même en conditions non contrôlées. Ces études illustrent concrètement la pertinence des RNN dans des applications biomédicales et biomécaniques exigeantes, où l'extraction de motifs temporels complexes est essentielle.

## 6.7 Réseaux de neurones récurrents bidirectionnels (BiRNN)

Un réseau de neurones récurrents bidirectionnel (Bidirectional Recurrent Neural Network, ou BiRNN) est une extension des réseaux RNN traditionnels visant à exploiter plus efficacement le contexte des données séquentielles.

Contrairement aux RNN classiques, qui traitent l'information dans une seule direction temporelle (généralement de la première à la dernière étape), le BiRNN intègre une seconde couche récurrente parcourant la séquence dans le sens inverse, de la dernière à la première étape. Chaque instant temporel est ainsi analysé en tenant compte à la fois du contexte passé et du contexte futur, ce qui renforce la capacité du modèle à capturer des dépendances temporelles complexes et de longue portée. Les BiRNN sont ainsi utilisés lorsque l'on dispose de la séquence complète et que le contexte futur est essentiel à l'interprétation des données.

### 6.7.1 Architecture du BiRNN

L'architecture bidirectionnelle est particulièrement utile dans des applications telles que la reconnaissance vocale, la traduction automatique ou le traitement du langage naturel, où l'information située à la fois avant et après un point donné dans la séquence peut être essentielle pour la prédiction. Cependant, les BiRNN sont plus coûteux en termes de calcul et de mémoire, car ils nécessitent le double des paramètres par rapport à un RNN unidirectionnel, mais leur précision accrue les rend particulièrement adaptés aux tâches nécessitant une compréhension contextuelle approfondie.

Afin de simplifier le développement d'un RNN bidirectionnel (BiRNN), une technique simple a été proposée dans la littérature permettant de transformer un RNN unidirectionnel en un RNN bidirectionnel. Cette approche consiste à implémenter deux couches de RNN unidirectionnelles qui fonctionnent dans des directions opposées mais qui agissent sur la même séquence d'entrée (voir la figure 6.18, non reproduite).

Pour la première couche RNN, la séquence est traitée dans l'ordre chronologique, où la première entrée est x_1 et la dernière entrée est x_T. Par contre, pour la deuxième couche RNN, la séquence est traitée dans l'ordre inverse, où la première entrée est x_T et la dernière entrée est x_1.

La sortie de cette architecture bidirectionnelle est obtenue en procédant à la concaténation, à chaque pas de temps, des sorties correspondantes des deux couches RNN unidirectionnelles. Cette méthode permet au BiRNN de tirer parti du contexte provenant à la fois du passé et du futur dans les données séquentielles, ce qui en fait un outil puissant pour des tâches comme le traitement du langage naturel et la reconnaissance vocale.

Contrairement à un RNN classique, qui traite les données uniquement dans une direction (généralement de gauche à droite), le BiRNN traite les séquences dans les deux directions : le flux avant (forward pass) traite la séquence de gauche à droite et le flux arrière (backward pass) traite la séquence de droite à gauche.

Chaque élément de la séquence est donc analysé en prenant en compte à la fois les données passées (via le flux avant) et les données futures (via le flux arrière). Cette structure permet une meilleure modélisation des relations contextuelles dans les données séquentielles.

Formellement, pour tout instant temporel t, nous considérons une entrée x_t et une fonction d'activation de la couche cachée f. Dans l'architecture bidirectionnelle, les états cachés avant et arrière pour cet instant temporel sont respectivement notés h⃗_t (état caché « avant ») et h⃖_t (état caché « arrière »), où h est le nombre d'unités cachées.

Les mises à jour des états cachés avant et arrière sont les suivantes (équations 6.14 et 6.15) :

```
h⃗_t = f(w_x · x_t + w_h⃗ · h⃗_{t-1} + b_h⃗)
h⃖_t = f(w_x · x_t + w_h⃖ · h⃖_{t+1} + b_h⃖)
```

où les poids w_x, w_h⃗, w_h⃖, ainsi que les biais b_h⃗ et b_h⃖, sont tous des paramètres du modèle.

Ensuite, nous concaténons les états cachés avant et arrière h⃗_t et h⃖_t pour obtenir l'état caché h_t qui sera transmis à la couche de sortie. Dans des RNN bidirectionnels profonds avec plusieurs couches cachées, cette information est fournie en entrée à la couche bidirectionnelle suivante. Enfin, la couche de sortie calcule la sortie ŷ_t (équation 6.16) :

```
ŷ_t = w_y · h_t + b_y
```

où la matrice de poids w_y et le biais b_y sont les paramètres de la couche de sortie.

### 6.7.2 Entraînement du BiRNN

Le BiRNN partage le même principe d'entraînement que le RNN classique, qui repose sur la propagation avant, la rétropropagation dans le temps (BPTT) et l'optimisation des poids à l'aide d'optimiseurs. Cependant, les spécificités du BiRNN, telles que ses flux bidirectionnels et la combinaison des états cachés, introduisent certaines différences. Ces particularités incluent des calculs séparés pour les flux avant et arrière, la combinaison des représentations bidirectionnelles, ainsi qu'un nombre accru de paramètres et de calculs, ce qui augmente la complexité globale du modèle.

**Propagation avant.** Pour chaque position t dans la séquence d'entrée {x_1, ..., x_T}, la propagation avant consiste à :
- Calculer l'état caché pour le flux avant (h⃗_t), à partir de l'entrée actuelle et de l'état précédent : h⃗_t = f(w_x⃗ · x_t + u_h⃗ · h⃗_{t-1} + b_h⃗).
- Calculer l'état caché pour le flux arrière (h⃖_t) en parcourant la séquence dans le sens inverse : h⃖_t = f(w_x⃖ · x_t + u_h⃖ · h⃖_{t+1} + b_h⃖).
- Combiner les états cachés des deux flux (h⃗_t et h⃖_t) pour obtenir une représentation conjointe : h_t = concat(h⃗_t, h⃖_t).
- Appliquer une fonction de sortie (souvent une couche dense ou softmax) pour prédire ŷ_t à partir de h_t : ŷ_t = g(w_y · h_t + b_y).

**Rétropropagation.** La rétropropagation dans un BiRNN suit le principe de la rétropropagation à travers le temps (BPTT), adaptée aux réseaux bidirectionnels. Elle consiste à :
- Calculer l'erreur entre la sortie prédite ŷ_t et la sortie réelle y_t en utilisant une fonction de perte L, comme l'entropie croisée pour la classification ou l'erreur quadratique moyenne pour la régression : L = Σ_t ℓ(y_t, ŷ_t).
- Propager l'erreur à travers la couche de sortie en calculant le gradient de la fonction de perte par rapport à la sortie du modèle : ∂L/∂h_t = (∂L/∂ŷ_t) · g'(h_t), où g'(h_t) représente la dérivée de la fonction d'activation g appliquée à l'état caché h_t avant d'obtenir la sortie ŷ_t.
- Rétropropager les gradients séparément dans les deux directions du BiRNN : calculer, pour le flux avant, les gradients de h⃗_t en fonction de l'état caché précédent h⃗_{t-1} et des poids associés ; calculer, pour le flux arrière, les gradients de h⃖_t en fonction de h⃖_{t+1} et des poids associés.
- Mettre à jour les poids du modèle (w_x⃗, u_h⃗, w_x⃖, u_h⃖) en appliquant la descente de gradient : θ ← θ - η · ∂L/∂θ, où η est le taux d'apprentissage.

Ce processus est répété durant plusieurs époques jusqu'à atteindre la convergence de la perte.

> L'article « Bidirectional Recurrent Neural Networks » de Mike Schuster et Kuldip K. Paliwal (1997) est une contribution clé dans le domaine des réseaux de neurones récurrents (RNN). Cet article introduit une architecture bidirectionnelle qui permet aux RNN de traiter des séquences temporelles en tenant compte à la fois du passé et du futur. En combinant deux couches unidirectionnelles, l'une parcourant les données de manière classique (avant) et l'autre dans l'ordre inverse (arrière), cette approche améliore considérablement la capacité des réseaux à capturer les dépendances contextuelles.

## Conclusion du chapitre

En conclusion, ce chapitre a offert une exploration approfondie des RNN et de leurs variantes, en mettant l'accent sur leur capacité à traiter et modéliser les données séquentielles. Après avoir introduit le contexte historique des RNN, nous avons examiné les spécificités des données séquentielles, leurs différents types, ainsi que les techniques de représentation et de prétraitement des séries temporelles, qui constituent une étape cruciale pour garantir des performances optimales.

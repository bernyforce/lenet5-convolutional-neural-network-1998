---
id: livre-ap-ch5-cnn
type: chapter
scope: project
status: active
created: 2026-08-31
updated: 2026-08-31
owner: user
book: "Apprentissage profond — Théorie et applications"
book_slug: apprentissage-profond
author: "Neila Mezghani"
chapter: 5
source: ["chapters/04-ap4_260710_115102.md#L2132-L5729"]
ocr_note: "Source scannée OCR (tesseract, qualité variable) ; nettoyage fidèle : dé-césure, suppression en-têtes/pieds de page répétés et bruit OCR non textuel ; aucun contenu inventé, aucune réécriture de fond"
language: fr
---

# Chapitre 5 — Réseaux de neurones convolutifs (CNN)

Les perceptrons multicouches ont été historiquement utilisés pour la classification d'images en raison de leur capacité à modéliser des relations complexes. Cette aptitude découle de l'intégration de couches cachées et de fonctions d'activation non linéaires, qui permettent de capturer des dépendances entre les pixels, souvent impossibles à modéliser par des approches linéaires traditionnelles. Toutefois, leur scalabilité pose un défi majeur, notamment lorsqu'ils sont appliqués à des images de grande taille. Cela est dû à la croissance exponentielle du nombre de connexions, qui augmente en fonction de la taille de l'image. En effet, dans un perceptron multicouche, chaque neurone est complètement connecté à tous les neurones des couches précédentes et suivantes, entraînant une explosion du nombre de paramètres et rendant l'apprentissage très coûteux d'un point de vue computationnel. Par exemple, considérons une image de taille 32x32x3 (32 de large, 32 de haut, 3 canaux de couleur RGB). Cette image contient ainsi 1 024 pixels, chacun composé de 3 valeurs d'intensité, soit un total de 3 072 valeurs de canaux. Considérons un seul neurone entièrement connecté dans la première couche cachée du perceptron multicouche : il recevra en entrée les 3 072 valeurs correspondant aux pixels de l'image. Maintenant, si l'on considère une image de taille 200x200, le nombre d'entrées par neurone dans la première couche cachée s'élève à 120 000 (200x200x3). Nous comprenons ainsi rapidement que le nombre total de paramètres explose dès lors que l'on utilise plusieurs neurones dans la couche, rendant l'entrainement particulièrement coûteux et inefficace. C'est précisément pour cette raison qu'il est nécessaire de recourir à des architectures plus adaptées au traitement d'images, telles que les réseaux de neurones convolutifs.

Les réseaux de neurones convolutifs ou réseaux de neurones à convolution (Convolutional Neural Networks, CNN) sont une sous-catégorie de réseaux de neurones profonds particulièrement efficace pour le traitement des données structurées, comme les images ou les séquences temporelles. Ils sont largement utilisés dans des tâches de vision par ordinateur telles que la classification d'images, la détection d'objets et la segmentation d'images, mais peuvent également être appliqués à d'autres types de données, y compris l'audio et le texte.

Ce chapitre propose une exploration approfondie des concepts fondamentaux et des principales composantes des réseaux de neurones convolutifs. Il débute par un aperçu historique retraçant leur développement, en soulignant les inspirations biologiques et théoriques à l'origine de leur émergence. Une attention particulière est accordée au fonctionnement du cerveau humain, et plus spécifiquement à l'architecture du cortex visuel, dont l'organisation hiérarchique et modulaire constitue un cadre pertinent pour établir une analogie avec les différentes couches des CNN.

Les grandes étapes de l'évolution de ces réseaux sont ensuite mises en lumière, en partant des premières recherches sur le fonctionnement du cortex visuel des mammifères. Ces recherches ont ouvert la voie aux percées majeures qui ont suivi, menant à l'adoption massive des CNN dans des domaines variés tels que la reconnaissance d'images, la vision par ordinateur ou encore le traitement médical.

L'architecture typique d'un CNN est ensuite détaillée, en exposant les différentes composantes qui la constituent. La couche de convolution est présentée comme un élément central permettant d'extraire des caractéristiques locales invariantes à partir des données, tandis que la couche de sous-échantillonnage est décrite comme un mécanisme de réduction de la dimensionnalité préservant l'essentiel de l'information. Enfin, la couche entièrement connectée est introduite comme le lien entre les caractéristiques extraites et la tâche ciblée, qu'il s'agisse de classification ou de régression.

L'entraînement des CNN fait l'objet d'un développement spécifique dans ce chapitre. Les principales étapes de l'ajustement des paramètres du réseau y sont présentées, accompagnées des défis fréquemment rencontrés au cours de l'apprentissage. Les solutions modernes permettant de surmonter ces difficultés sont également abordées.

Afin d'illustrer les concepts abordés, le chapitre présente plusieurs exemples d'architectures de CNN marquantes. Des réseaux pionniers comme LeNet-5 et AlexNet sont ainsi analysés, de même que des architectures plus récentes telles que ResNet, qui ont marqué un tournant décisif dans le domaine.

Dans son ensemble, ce chapitre offre une vue d'ensemble des CNN, allant de leur genèse à leurs applications actuelles, tout en mettant en lumière les principes fondamentaux ayant contribué à leur succès en tant qu'approche de référence en apprentissage machine.

> **Encadré.** Avant d'aborder le cœur du sujet, il convient de préciser pourquoi nous avons choisi d'utiliser des images comme exemples tout au long de ce chapitre. Au fait, les images possèdent une structure bidimensionnelle qui induit des relations spatiales entre les pixels voisins, notamment sous forme de bords, de motifs ou de textures. Les filtres de convolution d'un CNN sont précisément conçus pour capturer ces relations locales, ce qui permet de détecter progressivement des caractéristiques visuelles élémentaires, puis de les combiner dans les couches pour identifier des objets ou des structures plus complexes.
>
> À l'inverse, les signaux sont généralement unidimensionnels, ce qui rend l'application des CNN moins intuitive. Bien que les signaux présentent eux aussi des structures hiérarchiques, telles que des motifs temporels ou des fréquences, leur traitement repose souvent sur d'autres types de réseaux, comme les réseaux de neurones récurrents (RNN), qui sont mieux adaptés à la modélisation des dépendances séquentielles. Ces réseaux seront abordés au Chapitre 6.

## 5.1 Historique et inspirations

L'idée derrière la conception des CNN remonte aux années 1958 et 1959 lorsque les chercheurs Hubel et Wiesel ont mené une série d'expériences sur des chats et sur des singes pour chercher des informations essentielles sur la structure du cortex visuel, c'est-à-dire la région du cerveau responsable de l'analyse des informations visuelles. En 1962, ces chercheurs ont découvert que certaines cellules dans le cortex visuel du chat répondaient à des régions spécifiques de l'environnement visuel. Ces cellules, appelées cellules réceptrices locales, semblent être organisées de manière hiérarchique pour traiter les informations visuelles.

Le cerveau humain est une structure hautement complexe, organisée en différentes régions interconnectées qui assurent des fonctions variées, allant de la motricité à la cognition. Dans chaque hémisphère, le cerveau est divisé en quatre lobes principaux : frontal, pariétal, temporal et occipital tel que décrit la figure 5.1.

*Figure 5.1 - Structure du cerveau en quatre lobes principaux dans chaque hémisphère : frontal, pariétal, temporal et occipital. (figure non reproduite)*

Le lobe occipital, qui nous intéresse ici, abrite le cortex visuel, spécialisé dans le traitement des informations visuelles. Il présente une organisation hiérarchique structurée en plusieurs couches, comprenant notamment la séquence des régions LGN-V1-V2-V4-IT. Le LGN (acronyme de Lateral Geniculate Nucleus, en français, Noyau genouillé latéral) reçoit des signaux électriques provenant des cellules ganglionnaires de la rétine. Il les transmet ensuite au cortex visuel primaire pour un traitement plus complexe. Chaque élément des aires visuelles (V1, V2, V4 et IT) représente une couche spécifique de traitement de l'information.

À la base se trouve V1, ou aire visuelle primaire, qui constitue la première région corticale recevant les signaux visuels en provenance du noyau géniculé latéral (LGN). Cette région est spécialisée dans la détection d'éléments simples tels que les contours, les orientations et les mouvements de base. Ensuite, l'aire V2 intègre l'information en provenance de V1 et est sensible à des formes plus complexes, telles que les contours illusoires ou les textures. L'aire V4 intervient quant à elle dans l'analyse de la couleur, de la forme, ainsi que des motifs visuels complexes, jouant un rôle clé dans les premières étapes de la reconnaissance visuelle. Enfin, le cortex inférotemporal (IT), situé dans la partie inférieure du lobe temporal, constitue un niveau avancé du traitement visuel. Il joue un rôle central dans la reconnaissance d'objets complexes. Cette région intègre les informations visuelles issues des aires antérieures pour permettre une identification fine et sémantique des stimuli visuels.

Nous pouvons établir un parallèle entre l'organisation hiérarchique du traitement visuel dans le cortex cérébral (des aires primaires comme V1 jusqu'aux régions associatives telles que V2, V4 et IT) et l'architecture des réseaux de neurones convolutifs (CNN). Cette correspondance est illustrée dans la figure 5.2, qui montre comment, dans le cerveau humain, les caractéristiques visuelles sont traitées de manière progressive : des lignes et contours simples en V1 jusqu'à la reconnaissance d'objets complexes dans l'aire IT. De façon analogue, les CNN construisent progressivement des représentations de plus en plus abstraites en empilant des couches convolutionnelles.

*Figure 5.2 - Analogie entre l'architecture d'un cortex visuel humain et l'architecture générale d'un réseau de neurones. Les flèches entre les couches (de V1 à IT) symbolisent une augmentation de la complexité des représentations visuelles. (figure non reproduite)*

Chaque niveau de cette hiérarchie est associé à une taille croissante du champ récepteur, c'est-à-dire la portion de l'image à laquelle un neurone est sensible. À la base de la hiérarchie, la région V1 détecte des éléments visuels très simples comme des lignes ou des contours orientés. Ces unités réagissent à de petites portions de l'image et constituent les fondations du traitement visuel.

En remontant vers la zone V2, les neurones intègrent les réponses de plusieurs cellules de V1, leur permettant ainsi de représenter des formes élémentaires telles que des angles, des courbes ou des intersections. Puis, dans l'aire V4, l'information visuelle est davantage combinée pour former des configurations plus complexes, comme des triangles ou des croix. Enfin, dans la zone IT, située à un niveau supérieur du traitement visuel, les neurones possèdent des champs récepteurs très étendus et répondent à des objets entiers, tels que des visages et des maisons. Ce traitement progressif permet ainsi une reconnaissance fine et sémantique de la scène perçue.

Cette progression, à la fois en complexité des caractéristiques détectées et en extension spatiale du champ récepteur, est directement reprise dans les architectures de réseaux de neurones convolutifs. Dans ces réseaux, les premières couches convolutionnelles jouent un rôle similaire à celui de V1, en détectant des motifs simples comme des bords ou des textures. Les couches intermédiaires, à l'image de V2 et V4, capturent des motifs plus élaborés issus de la combinaison des premières caractéristiques. Les couches profondes permettent un niveau d'abstraction plus élevée, menant à la reconnaissance d'objets complexes et à la classification de haut niveau, comme le fait le cortex IT.

Ainsi, les CNN s'inspirent directement du fonctionnement du système visuel humain en structurant l'extraction de caractéristiques de manière hiérarchique. Cette conception leur confère une grande efficacité pour le traitement d'images, car elle reproduit le principe biologique de spécialisation progressive des représentations visuelles, du local au global, du simple au complexe.

> **Pour aller plus loin.** Les deux articles fondateurs « Receptive Fields of Single Neurones in the Cat's Striate Cortex » et « Single Unit Activity in Striate Cortex of Unrestrained Cats », publiés en 1959 par Hubel et al., constituent des références majeures en neurosciences. Le premier a introduit de manière révolutionnaire l'idée que certains neurones du cortex visuel primaire réagissent sélectivement à des caractéristiques spécifiques des stimuli visuels, telles que l'orientation ou le mouvement. Le second article a approfondi cette découverte en décrivant systématiquement les champs récepteurs de ces neurones, posant ainsi les bases d'un cadre conceptuel qui a influencé des décennies de recherche sur les mécanismes neuronaux de la perception visuelle. Ces travaux ont non seulement transformé notre compréhension du traitement visuel, mais ont également servi de fondement à l'émergence des neurosciences computationnelles et des réseaux neuronaux artificiels.

Les recherches sur le cortex visuel ont inspiré plusieurs travaux en intelligence artificielle, notamment ceux de Kunihiko Fukushima, qui a développé le « Neocognitron » dans les années 1980. Ce modèle constitue l'un des premiers réseaux de neurones artificiels à convolution, conçu pour imiter la manière dont le système visuel humain traite et reconnaît les formes visuelles, en s'appuyant sur une architecture hiérarchique similaire à celle observée dans le cortex visuel.

Plusieurs années plus tard, en 1990, Yann LeCun et ses collaborateurs ont présenté la célèbre architecture LeNet-5, largement employée pour la reconnaissance de chiffres manuscrits et qui a intégré l'apprentissage par rétropropagation. Rappelons que, l'architecture désigne la façon avec laquelle les couches sont agencées, connectées et interagissent pour traiter une donnée d'entrée et produire une sortie.

Les avancées des unités de traitement graphique (GPU), ont eu un impact majeur sur l'évolution des réseaux de neurones convolutifs. En effet, les GPU, par leur capacité à effectuer des traitements de données massives et en parallèle, ont considérablement accéléré les calculs nécessaires aux opérations matricielles et de convolution, qui sont au cœur du fonctionnement des CNN. Cette puissance de traitement a permis de concevoir et d'entraîner des réseaux encore plus profonds et complexes, ouvrant ainsi la voie à des performances inédites en apprentissage machine supervisé.

C'est dans ce contexte favorable qu'ont émergé des architectures marquantes telles qu'AlexNet, VGGNet, GoogLeNet ou encore ResNet. Chacune de ces architectures a représenté une avancée déterminante, que ce soit en termes de gain de précision, d'augmentation maîtrisée de la profondeur du réseau, ou d'innovations méthodologiques pour surmonter des défis tels que la disparition ou l'explosion du gradient au cours de l'apprentissage.

Aujourd'hui, ces modèles constituent des piliers fondamentaux de la vision par ordinateur moderne et trouvent des applications dans des domaines aussi variés que la reconnaissance d'objets, la classification d'images, la segmentation d'images médicales, ou encore la vision par ordinateur embarquée, notamment pour les véhicules autonomes ou les dispositifs mobiles.

## 5.2 Architecture d'un CNN

Inspirés par l'organisation du cortex visuel humain, les CNN sont composés de couches spécifiques qui exploitent les relations locales dans les données pour extraire des caractéristiques hiérarchiques. En exploitant cette hiérarchie, les CNN construisent une compréhension progressive des données, allant des caractéristiques simples, comme les contours, aux concepts plus abstraits, comme les objets ou les motifs complexes, ce qui les rend particulièrement efficaces pour des tâches de classification ou de détection.

> **Encadré.** De manière générale, un motif désigne une structure ou un schéma récurrent présent dans les données. Sa nature dépend du type de données analysées ; il peut s'agir, par exemple, de variations d'intensité dans une image, de motifs sonores dans un signal audio ou de séquences récurrentes dans des séries temporelles. Dans tous les cas, l'objectif de la convolution est d'identifier ces structures significatives pour en extraire des représentations plus abstraites et adaptées à la tâche d'apprentissage.

L'architecture des CNN repose sur une combinaison de couches de convolution, de couches de pooling et de couches entièrement connectées (voir la figure 5.3). À ces composants s'ajoutent les couches d'activation, parmi lesquelles la plus courante est la fonction ReLU (Rectified Linear Unit). Appliquée après chaque opération de convolution, la couche ReLU introduit une non-linéarité essentielle au modèle.

*Figure 5.3 - Architecture typique d'un CNN : de la couche d'entrée à la couche de sortie. (figure non reproduite)*

### 5.2.1 Couche de convolution

La couche de convolution constitue l'élément central des CNN. Elle joue un rôle déterminant dans l'extraction automatique des caractéristiques pertinentes à partir des données d'entrée. Typiquement, elle intervient dès les premières couches du réseau, où l'opération de convolution est appliquée pour détecter des motifs locaux.

**Opération de convolution**

La convolution (convolution), également appelée produit de convolution, est une opération mathématique qui associe deux fonctions pour en produire une troisième. Cette dernière exprime comment une fonction est « pondérée » ou « filtrée » par une autre.

Formellement, dans le cas discret où deux matrices I et K sont considérées, la convolution, notée I ∗ K, est définie par (équation 5.1) :

```
(I * K)(i,j) = Σm Σn K(m,n) · I(i−m, j−n)
```

où :
- (i, j) désignent les coordonnées dans la matrice résultante,
- K(m, n) est l'élément du noyau de convolution K à la position (m, n),
- I(i−m, j−n) correspond à l'élément de la matrice I, décalé respectivement de m lignes et n colonnes par rapport à la position (i, j).

L'équation (5.1) implique la multiplication élément par élément de deux matrices, typiquement de tailles inégales, mais de même dimensionnalité, c'est-à-dire ayant des dimensions telles que 1D, 2D, etc. D'un point de vue géométrique, la convolution consiste à faire glisser la matrice K, aussi appelée noyau (kernel), sur la matrice I, en appliquant localement une opération de superposition suivie d'un produit élément par élément, afin de produire les valeurs correspondantes dans la matrice de sortie.

> **Exemple 5.1** — Dans cet exemple, nous allons réaliser une convolution entre deux matrices I de dimension 5x5 et une matrice K de dimension 3x3 via la fonction `convolve2d` qui effectue une convolution bidimensionnelle (2D) (voir l'extrait de code 5.1).

```python
# Extrait de code 5.1 - Opération de convolution entre deux matrices I et K.
import numpy as np
from scipy.signal import convolve2d

# Définir les deux matrices I et K
I = np.array([[1, 1, 1, 0, 0],
              [0, 1, 1, 1, 0],
              [0, 0, 1, 1, 1],
              [0, 0, 1, 1, 0],
              [0, 1, 1, 0, 0]])
K = np.array([[1, 0, 1],
              [0, 1, 0],
              [1, 0, 1]])

# Application de la convolution
result = convolve2d(I, K, mode='valid')
```

L'opération de convolution fournit en sortie la matrice `result` de dimension 3x3 :

```
Résultat de la convolution:
[[4 3 4]
 [2 4 3]
 [2 3 4]]
```

La figure 5.4 illustre l'opération de convolution entre le noyau de taille 3x3 et une matrice d'entrée de taille 5x5 (présentée dans le code 5.1). Le calcul de la première valeur de la matrice de sortie (en haut à gauche, encadrée [4]) s'effectue en superposant la matrice K (matrice en mauve) sur le coin supérieur gauche de l'image d'entrée (matrice en vert).

En se basant sur l'équation (5.1), la première valeur en haut à gauche de la matrice de sortie de la figure 5.4, est obtenue en appliquant le produit élément par élément entre le filtre et la région correspondante de la matrice d'entrée et en sommant les produits : (1×1)+(1×0)+(1×1)+(0×0)+(1×1)+(0×0)+(0×1)+(0×0)+(1×1) = 4

*Figure 5.4 - Visualisation d'une convolution discrète avec noyau K de dimension 3x3 sur une entrée I de dimension 5x5. (figure non reproduite)*

> **Encadré.** Dans un produit de convolution discret, deux matrices interviennent : la matrice d'entrée I et le noyau de convolution K. Formellement, l'opération de convolution est commutative, ce qui signifie que I∗K = K∗I (sous certaines conditions de dimension et de centrage). Cette propriété peut prêter à confusion quant à la désignation des rôles respectifs de I et K. En effet, la fonction des deux matrices dans l'opération est fondamentalement différente, et c'est cette différence de rôle qui justifie la terminologie. La matrice I représente l'entrée sur laquelle nous souhaitons extraire des informations. Il peut s'agir d'une image, d'un signal, ou plus généralement d'un tenseur de données. En revanche, K représente le noyau. C'est une petite matrice qui agit comme un opérateur local. Elle est conçue (ou apprise, dans le cas des réseaux de neurones convolutifs) pour détecter des motifs spécifiques dans l'entrée tels que les bords, textures et les motifs répétitifs. Autrement dit, le noyau joue un rôle actif dans l'extraction d'information, tandis que la matrice d'entrée est passive, servant de support à l'analyse. Pour s'assurer de qui fait quoi : pensez au noyau comme à une loupe intelligente qui balaie une surface (la matrice I) pour en extraire des motifs. La matrice I est le terrain d'observation, et le noyau K est l'outil d'analyse.

**Couche de convolution**

Dans une couche de convolution d'un CNN, la convolution est une opération mathématique réalisée à l'aide d'un noyau de convolution. Cette opération consiste à appliquer ce noyau, représenté par la matrice K, à une image d'entrée, représentée par la matrice I. Le produit de cette opération donne une matrice de sortie O, appelée carte de caractéristiques (feature map).

Formellement, l'équation de convolution pour une image I avec un noyau (filtre) K est donnée par (équation 5.2) :

```
O(i,j) = Σ(m=0..kh-1) Σ(n=0..kw-1) K(m,n) · I(i+m, j+n) + b
```

Dans cette équation :
- O(i,j) est la valeur du pixel de sortie à la position (i,j) dans l'image convoluée. Cette valeur est calculée en combinant les contributions de la matrice d'entrée I et du noyau K.
- I(i+m, j+n) est la valeur du pixel d'entrée à la position décalée par rapport à (i,j).
- K(m,n) est l'élément du noyau K à la position (m,n). Ce noyau contient les coefficients utilisés pour pondérer les éléments de la matrice d'entrée I.
- kh, kw est la hauteur et la largeur du noyau K (typiquement 3x3 ou 5x5).
- b est le terme de biais, une constante associée à chaque noyau K.

> **Encadré.** Contrairement à une équation de convolution standard (5.1) où on utilise i−m et j−n, nous avons utilisé dans l'équation (5.2) les indices i+m et j+n qui impliquent un décalage positif. Strictement parlant, la deuxième équation correspond à une corrélation croisée et non à une convolution, dans laquelle les poids seraient inversés par rapport à l'entrée. Cela dit, cette définition est la convention habituelle utilisée en apprentissage automatique.

L'équation (5.2) peut être étendue à plusieurs canaux et filtres. Dans ce cas, l'équation de convolution pour une image I avec un noyau K est donnée par (équation 5.3) :

```
O(i,j,f) = Σ(c=0..Cin-1) Σ(m=0..kh-1) Σ(n=0..kw-1) K(m,n,c,f) · I(i+m, j+n, c) + bf
```

- O(i,j,f) est la valeur de la sortie au point (i,j) dans la carte de caractéristique générée par le filtre f.
- I(i+m,j+n,c) est la valeur du pixel de l'image d'entrée à la position (i+m,j+n) dans le canal c.
- K(m,n,c,f) est le poids du noyau à la position (m,n) pour le canal c et le filtre f.
- Cin est le nombre de canaux dans l'image d'entrée. Pour une image de couleur : Cin = 3 (rouge, vert, bleu).
- kh, kw sont les dimensions du noyau (hauteur et largeur).
- bf est le biais associé au filtre f. Il s'agit d'une valeur scalaire ajoutée uniformément à tous les pixels de la carte de caractéristiques produite par le filtre.

> **Exemple 5.2** — Dans cet exemple, nous appliquerons une convolution sur l'image `data.camera` intégrée à la bibliothèque skimage, à l'aide de filtres classiques tels que le Laplacien ou le filtre d'accentuation (sharpen), afin de mettre en évidence les contours ou de renforcer les détails de l'image.
>
> Nous commençons par importer l'image et la fonction `convolve` du module `ndimage` de la bibliothèque scipy (voir l'extrait de code 5.2). Chaque filtre est défini sous la forme d'une matrice (ou noyau) qui sera utilisée pour effectuer une convolution sur l'image.
>
> La fonction `convolve(image, kernel)` applique une convolution entre l'image et le noyau. Lors de la convolution, chaque pixel de l'image est recalculé en fonction de la matrice de filtre appliquée à ses voisins. Le résultat est une image filtrée correspondant aux caractéristiques spécifiques du filtre. Cette opération permet par exemple de faire ressortir les contours (avec un noyau de détection de bords), de lisser l'image (avec un noyau de flou), ou encore de détecter des motifs directionnels selon la structure du noyau.

> **Encadré.** Il est important de noter que des noms de filtres comme Laplacien ou Sharpen ne renvoient pas toujours à des fonctions directement accessibles sous ces appellations dans les bibliothèques de traitement d'image telles que OpenCV ou SciPy. Leur utilisation nécessite la définition explicite de leur noyau de convolution sous forme matricielle. Cela dit, certaines bibliothèques comme OpenCV intègrent des implémentations spécifiques de filtres fréquemment utilisés. C'est notamment le cas du filtre laplacien, accessible via une fonction dédiée (`cv2.Laplacian`), qui nécessite toutefois la spécification de la profondeur de sortie (`ddepth`) et d'autres paramètres. Cette situation illustre l'importance de comprendre la représentation matricielle sous-jacente aux filtres pour pouvoir les adapter et les utiliser efficacement en programmation.
>
> OpenCV, bibliothèque open source spécialisée en traitement d'image et en vision par ordinateur, propose également un ensemble étendu de filtres préprogrammés pour des tâches courantes telles que le lissage (flou gaussien, flou médian), la détection de contours (Sobel, Laplacien, Canny) ou encore l'accentuation des détails (sharpening).

```python
# Extrait de code 5.2 - Application de la convolution sur l'image data.camera.
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import convolve
from skimage import data

# Chargement de l'image
image = data.camera()

# Définir les filtres
filters = {
    "Identity": np.array([[0, 0, 0],
                           [0, 1, 0],
                           [0, 0, 0]]),
    "Horizontal Edge": np.array([[-1, -1, -1],
                                  [0, 0, 0],
                                  [1, 1, 1]]),
    "Vertical Edge": np.array([[-1, 0, 1],
                                [-1, 0, 1],
                                [-1, 0, 1]]),
    "Laplacian": np.array([[0, 1, 0],
                            [1, -4, 1],
                            [0, 1, 0]]),
    "Sharpen": np.array([[0, -1, 0],
                          [-1, 5, -1],
                          [0, -1, 0]]),
    "Gaussian": np.array([[1, 2, 1],
                           [2, 4, 2],
                           [1, 2, 1]]) / 16
}

# Appliquer les filtres et afficher les images filtrées
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

for ax, (name, kernel) in zip(axes.flatten(), filters.items()):
    filtered_image = convolve(image, kernel)
    ax.imshow(filtered_image, cmap='gray')
    ax.set_title(name, fontsize=24)
    ax.axis('off')
```

La figure 5.5 montre six variantes de l'image `data.camera`. Outre le filtre Identity, qui ne change pas l'image et qui est utilisé comme référence pour comparer l'effet des autres filtres, le contenu des autres images est sensiblement différent.

Le filtre à bords horizontaux Horizontal Edge permet de faire ressortir les zones où l'intensité varie brusquement entre le haut et le bas. Ces transitions apparaissent en blanc ou en noir selon la direction du changement, indiquant respectivement des bords positifs ou négatifs. En comparaison, le filtre à bords verticaux Vertical Edge détecte les variations d'intensité entre la gauche et la droite, mettant en évidence les bords verticaux selon le même principe.

Le filtre laplacien Laplacian détecte les changements rapides d'intensité dans toutes les directions. Il met ainsi en évidence les contours des objets, sans distinction entre les orientations horizontales ou verticales, produisant une image accentuée où les transitions entre régions d'intensité différente sont particulièrement marquées.

Le filtre d'accentuation Sharpen a pour objectif de renforcer les détails présents dans l'image, notamment les bords et les textures. Il accentue les contrastes entre les pixels voisins, ce qui donne une impression d'image plus nette. À l'inverse, le filtre gaussien Gaussian applique un lissage flou destiné à réduire le bruit. En atténuant les variations rapides d'intensité et les détails fins, il permet d'obtenir une image plus douce et homogène.

Les images filtrées obtenues illustrent clairement l'effet spécifique de chaque filtre sur l'image d'origine. Chaque transformation met en évidence des caractéristiques particulières, facilitant l'extraction d'informations pertinentes. Cette capacité à isoler des traits visuels essentiels constitue l'un des fondements ayant conduit au développement des réseaux de neurones convolutifs.

*Figure 5.5 - Filtrage de l'image data.camera par différents filtres. L'image Identity est l'image originale (avant filtrage). (figure non reproduite)*

**Rôle de la couche de convolution**

Rappelons que dans une couche de convolution, l'opération de convolution est réalisée à l'aide d'un noyau (ou filtre). Le rôle principal de cette couche est d'extraire des caractéristiques pertinentes à partir des données d'entrée. Dans le cas des images, l'application de différents noyaux permet de détecter des propriétés variées, telles que les bords, les textures, ou encore des motifs complexes à des niveaux de profondeur croissants. Chaque filtre agit comme un détecteur spécifique, qui apprend pendant la phase d'entraînement, à identifier des structures adaptées à la tâche cible. La tâche cible peut être, par exemple, la classification, la détection d'objets ou la segmentation.

> **Encadré.** Vous avez certainement remarqué qu'au début du chapitre, nous avons utilisé le terme filtre pour désigner la matrice K, tandis qu'en ce moment, nous utilisons le terme noyau. Cette distinction de terminologie est propre aux CNN, où le terme noyau est le plus approprié pour désigner la matrice K utilisée lors de l'opération de convolution. En effet, le terme filtre provient du domaine du traitement d'image traditionnel, où un filtre est une matrice fixe, appliquée à une image pour effectuer des transformations spécifiques telles que le lissage ou la détection de contours (comme discuté dans l'exemple précédent). Les filtres dans ce contexte sont prédéfinis et restent constants. En revanche, dans un CNN, le terme noyau fait référence à une matrice K qui est paramétrique et dont les valeurs sont apprises automatiquement pendant l'entraînement grâce à l'algorithme de rétropropagation. Chaque noyau agit comme un détecteur de caractéristiques, capable de s'adapter aux données pour identifier des motifs pertinents. Par conséquent, dans le contexte des réseaux de neurones convolutifs, il est plus approprié d'utiliser le terme noyau plutôt que filtre, pour souligner son rôle dynamique et son optimisation durant l'entraînement.

Les CNN s'inspirent du fonctionnement des cellules du cortex visuel, qui réagissent à des régions spécifiques de l'environnement visuel. Par analogie, chaque filtre d'une couche de convolution est conçu pour détecter des types précis de caractéristiques visuelles. En balayant l'image avec ces filtres, la couche génère une carte de caractéristiques, où chaque élément représente la réponse d'un filtre à une position donnée (figure 5.6). Les cartes de caractéristiques jouent un rôle important dans le processus d'identification et d'extraction des informations pertinentes des données d'entrée.

*Figure 5.6 - Processus de convolution : l'image d'entrée (à gauche) est sous forme matricielle. Une sous-région (carré mauve) est mise en évidence, représentant la fenêtre locale actuellement analysée. Le filtre (représenté par la matrice mauve) est appliqué à la région correspondante de l'image d'entrée pour produire une valeur unique dans la carte de caractéristiques en sortie (à droite). (figure non reproduite)*

Après l'application d'un filtre sur une image via la convolution, le résultat est une carte de caractéristiques. Cette carte contient des valeurs (positives et/ou négatives) qui représentent la réponse du filtre aux différentes régions de l'image. Ces valeurs dépendent uniquement de la convolution.

> **Encadré.** Dans un réseau de neurones convolutif, la « couche de convolution » fait référence à l'ensemble de l'opération qui comprend : les filtres ou noyaux (qui sont les matrices contenant des poids appris pendant l'entraînement) et les cartes de caractéristiques (qui sont les sorties résultantes de l'application des filtres sur les données d'entrée). Ainsi, la couche convolution désigne l'ensemble des filtres et des cartes de caractéristiques générées par leur application. Certaines illustrations graphiques combinent les deux pour ne montrer que les cartes résultantes.

Bien qu'elle ne soit pas obligatoire, une couche ReLU est généralement placée immédiatement après chaque couche de convolution tel qu'illustré à la figure 5.7. Cette couche joue un rôle essentiel dans l'amélioration de l'apprentissage et des performances du réseau. La couche ReLU introduit une non-linéarité en remplaçant les valeurs négatives par zéro, selon la fonction : f(x) = max(0, x). Cela n'ajoute pas de nouvelles caractéristiques, mais aide à introduire de la non-linéarité et à supprimer les contributions négatives inutiles. Cette opération permet au réseau d'apprendre des représentations plus complexes et de mieux modéliser des phénomènes non linéaires. Elle est souvent préférée à la fonction sigmoïde, car elle réduit le risque de saturation des gradients et accélère la convergence durant l'entraînement.

*Figure 5.7 - Étapes du processus de convolution avec intégration de la fonction d'activation ReLU. (figure non reproduite)*

> **Encadré.** Dans la littérature scientifique, il est possible de donner des noms différents à ces cartes de caractéristiques (feature map) pour distinguer leur état ou leur rôle à différentes étapes du processus. Ainsi, le terme « carte de caractéristiques convoluées » (convolved feature map) est souvent utilisé pour désigner la sortie brute d'une opération de convolution, avant l'application de toute fonction d'activation. Alors que le terme « carte de caractéristiques activées » (activated feature map) est utilisé une fois que la fonction ReLU est ajoutée.

Lors de l'opération de convolution, chaque filtre est appliqué à l'ensemble de l'image d'entrée en se déplaçant de manière glissante sur ses différentes régions. À chaque position, il effectue un produit scalaire entre ses propres poids et la portion correspondante de l'image, générant ainsi une valeur unique qui est intégrée dans la carte de caractéristiques en sortie. Ce processus est répété pour toutes les positions possibles du filtre sur l'image, ce qui permet de détecter des caractéristiques locales spécifiques, telles que les bords, les textures ou les motifs, et ce quelle que soit leur localisation spatiale dans l'image d'entrée.

Cette opération mène à une invariance translationnelle où un filtre donné peut détecter une même caractéristique, qu'elle apparaisse à un endroit ou à un autre dans l'image. Par exemple, un filtre conçu pour détecter un bord vertical identifiera ce bord de manière identique, qu'il se trouve en haut à gauche, au centre ou en bas à droite de l'image. Cette propriété est rendue possible grâce à l'opération de convolution elle-même, qui applique les mêmes poids à toutes les régions de l'image.

En d'autres termes, la convolution permet au réseau de neurones de rechercher des caractéristiques locales à l'échelle de l'image, sans se soucier de leur position spécifique. Cela renforce considérablement la capacité du modèle à reconnaître des objets, des formes ou des structures visuelles, quelle que soit leur position dans l'image. Cette invariance de translation est essentielle pour les tâches de reconnaissance d'objets, car elle permet au réseau de généraliser et de détecter des objets dans différents contextes, à différentes échelles et sous différents angles.

**Paramétrage de la couche de convolution**

Le paramétrage d'une couche de convolution dans un réseau de neurones convolutif consiste à choisir ses différents hyperparamètres. Les plus influents et importants sont les suivants :

1. **Le nombre de filtres** dans une couche convolutionnelle détermine la quantité et la diversité des caractéristiques extraites des données d'entrée, telles que les bords, les textures ou des motifs complexes. En augmentant ce nombre, le réseau peut capturer davantage de détails. Par exemple, une couche de convolution composée de 32 filtres peut extraire simultanément 32 types de caractéristiques distinctes, comme des bords, des textures ou des motifs spécifiques, à partir des données d'entrée. Cependant, augmenter le nombre de filtres accroît également la complexité computationnelle et le risque de surapprentissage.

   > **Encadré.** Le choix du nombre de filtres dans les couches convolutionnelles d'un CNN doit être bien réfléchi. En général, les couches proches de l'entrée capturent des caractéristiques simples (bords, textures) et nécessitent un nombre de filtres modéré (16 à 64), tandis que les couches plus profondes capturent des caractéristiques complexes (motifs, objets) et nécessitent davantage de filtres (128 à 512). Par ailleurs, le nombre de filtres augmente la taille des cartes de caractéristiques et la charge de calcul. Il faudrait donc choisir un nombre de filtres adapté à la puissance de calcul disponible. Plusieurs configurations offrent un point de départ éprouvé que vous pouvez adapter à vos besoins. Ces configurations sont souvent basées sur des recherches ou des modèles célèbres, par exemple, VGG et ResNet.

2. **La taille du noyau** détermine les dimensions de la région locale de la matrice d'entrée qu'il analyse au cours d'une opération de convolution. Elle est généralement exprimée sous une forme bidimensionnelle, telle que 3x3 ou 5x5 représentant respectivement le nombre de pixels en hauteur et en largeur couverts par le noyau. La taille du noyau illustrée à la figure 5.6 est de 3x3.

   > **Encadré.** Le choix de la taille du noyau de convolution affecte directement la capacité du modèle à capturer des caractéristiques pertinentes. Les tailles de noyaux les plus courantes sont 3x3, 5x5 et, moins fréquemment, 7x7. La taille 3x3 est la plus encouragée parce qu'un petit noyau est plus efficace et permet de construire des réseaux profonds tout en maintenant une capacité de détection de motifs complexes. Si vos images sont grandes (par exemple, 1024x1024), vous pouvez commencer avec des noyaux légèrement plus grands (en l'occurrence, 5x5) dans les premières couches pour capturer des motifs globaux. Finalement, les noyaux avec une taille impaire sont généralement préférés, car ils ont un point central, ce qui simplifie l'alignement spatial.

3. **Le pas (stride)** fait référence au déplacement du filtre appliqué à une image ou à une matrice d'entrée lors de chaque opération de convolution du CNN. Dans l'exemple de la figure 5.8, nous avons appliqué un pas égal à 1.

   *Figure 5.8 - Positions successives d'un filtre 3x3 (en bleu foncé) lors de son application sur une image 4x4 (en bleu clair) avec un pas (stride) de 1. (figure non reproduite)*

   > **Encadré.** Le choix du pas a un impact direct sur la taille des cartes de caractéristiques, les performances du modèle et les besoins en ressources de calcul. La valeur par défaut, et la plus fréquemment utilisée, est stride = 1, car elle permet de conserver un maximum d'informations spatiales. Cette configuration est particulièrement adaptée aux tâches exigeant une grande précision, telles que la segmentation d'images ou la détection d'objets de petite taille. Cependant, un stride de 1 génère des cartes de caractéristiques de grande dimension, avec un nombre important de pixels en sortie. Ce nombre augmente significativement les besoins en mémoire et en puissance de calcul, notamment dans les architectures profondes. Pour des images contenant principalement des objets de grande taille, il peut être judicieux d'utiliser un plus grand pas, par exemple stride = 2 ou plus, afin de réduire la résolution spatiale et capturer des relations globales, sans accorder trop d'importance aux détails fins.

4. **Le padding** (souvent conservé en anglais dans la littérature scientifique) désigne l'ajout de pixels supplémentaires sur les bords d'une image d'entrée, dans le but de contrôler les dimensions spatiales de la sortie après l'opération de convolution. En l'absence de tout ajout, la convolution est dite valide (`padding='valid'`), ce qui implique une réduction de la taille spatiale de l'image à chaque application du filtre (voir la figure 5.9 (a)). À l'inverse, si nous souhaitons maintenir des dimensions spatiales constantes au travers des couches convolutionnelles, il convient d'utiliser un `padding='same'` (voir la figure 5.9 (b)). Dans ce cas, des valeurs supplémentaires sont ajoutées autour des bords de l'entrée de manière contrôlée afin de compenser la réduction dimensionnelle induite par l'application du filtre.

   *Figure 5.9 - Comparaison de deux techniques de padding : le padding='valid', qui n'ajoute aucune bordure et entraîne une réduction des dimensions spatiales après convolution, et le padding='same', qui ajoute des bordures de manière contrôlée afin de préserver les dimensions de l'entrée. (figure non reproduite)*

   > **Encadré.** Le padding permet d'ajouter ou non des valeurs autour de l'entrée afin d'ajuster les dimensions de sortie d'une couche convolutionnelle. Il est recommandé d'utiliser `padding='valid'` pour des images ou des données dont les bords contiennent peu d'informations pertinentes. Cette situation est fréquente en imagerie médicale, où les régions centrales renferment généralement l'essentiel des données à analyser. Cette approche a aussi l'avantage de réduire le nombre de calculs, car les dimensions des cartes de caractéristiques en sortie sont réduites. En revanche, il est préférable d'utiliser `padding='same'` si l'objectif est de préserver les dimensions spatiales de l'entrée. Cette situation est rencontrée pour des tâches de segmentation sémantique sur de petites images, comme celles obtenues en microscopie cellulaire. Dans ce cas, les bords sont conservés et traités par le modèle, ce qui peut s'avérer essentiel lorsque chaque pixel compte pour la détection de structures fines ou de contours précis.

   Dans le cas d'une image, le padding consiste à ajouter des bordures autour de l'image d'entrée telle qu'illustré à la figure 5.10.

   *Figure 5.10 - Padding : ajout d'un pixel de valeur d'intensité nulle sur chaque bord de l'image d'entrée, ph = pw = 1. (figure non reproduite)*

5. **Fonction d'activation** : Après la convolution, une fonction d'activation est appliquée à chaque pixel pour introduire une non-linéarité dans le modèle. La fonction ReLU est la fonction d'activation la plus couramment utilisée dans les couches de convolution, en raison de sa simplicité computationnelle et de son efficacité empirique. Elle s'exprime par la fonction ReLU(x) = max(0, x), qui annule les valeurs négatives et conserve les valeurs positives inchangées. ReLU ne sature pas pour les grandes valeurs positives, ce qui permet de maintenir des gradients significatifs lors de la rétropropagation et d'accélérer l'apprentissage (voir la description de la section 4.1). En revanche, pour les entrées négatives, la sortie est nulle et le gradient l'est également, ce qui peut conduire à l'inactivation permanente de certains neurones, un phénomène connu sous le nom de « neurones morts ».

**Taille d'une image après une convolution**

La taille d'une image après une opération de convolution dépend de plusieurs facteurs, notamment la taille de l'image d'entrée, la dimension du filtre de convolution, le pas de la convolution (stride) et le type de padding appliqué à l'image.

Soit une image I de taille (Hin, Win) avec Hin la hauteur de l'image et Win sa largeur. La taille de l'image de sortie après une convolution avec un filtre rectangulaire est donnée par les formules suivantes (équations 5.4 et 5.5, partiellement dégradées par l'OCR) :

```
Hout = ⌊ (Hin + 2·ph − kh) / sh ⌋ + 1
Wout = ⌊ (Win + 2·pw − kw) / sw ⌋ + 1
```

Dans ces équations :
- H, W sont la hauteur et la largeur de l'image d'entrée.
- kh, kw sont la hauteur et largeur du filtre de convolution.
- sh, sw représentent les pas de déplacement (strides) dans les directions verticale et horizontale.
- ph, pw est le padding ajouté autour de l'image, en hauteur et en largeur respectivement.
- Hout, Wout représentent la hauteur et la largeur de l'image de sortie après la convolution.
- ⌊·⌋ représente la fonction partie entière inférieure, c'est-à-dire l'opération qui associe à un nombre réel le plus grand entier inférieur ou égal à ce nombre. Par exemple, ⌊3.7⌋ = 3 et ⌊−2.3⌋ = −3.

Dans le cas où nous avons des structures carrées, c'est-à-dire si kh = kw = k, sh = sw = s et Hin = Win, alors les formules pour les dimensions de sortie convoluée deviennent plus simples ; nous obtenons une formule unique pour Hout (identique à la largeur de sortie Wout dans ce cas) :

```
Hout = ⌊ (Hin + 2p − k) / s ⌋ + 1
```

Ainsi dans l'exemple de la figure 5.10, vous avez une image d'entrée de taille (5x5). Si vous appliquez un noyau de convolution de dimension (3x3) avec un pas s = 1 et un padding p = 1, la taille de la carte de caractéristique sera de (4x4).

> **Exemple 5.3** — L'extrait de code 5.3 illustre la création d'une couche de convolution bidimensionnelle (`Conv2D`) utilisant 32 filtres de taille (3,3). Ces filtres parcourent l'image d'entrée avec un pas (`stride=(1,1)`) dans les directions verticale et horizontale. Le paramètre `padding='valid'` précise qu'aucun pixel n'est ajouté autour de l'image (absence de padding), ce qui entraîne une réduction des dimensions spatiales de la sortie après convolution. La fonction d'activation appliquée est la relu.

> **Encadré.** Bien que ce chapitre se concentre sur la convolution 2D appliquée aux images, il est utile de glisser un mot sur la convolution 1D, utilisée principalement pour des données séquentielles telles que les signaux audio, les séries temporelles ou les séquences de texte. Dans une convolution 1D (Conv1D), un filtre unidimensionnel glisse le long d'une seule dimension (par exemple le temps) et effectue, à chaque position, un produit scalaire entre ses poids et une sous-séquence locale du signal d'entrée. Cette opération permet d'extraire des motifs temporels ou contextuels, tout comme la convolution 2D détecte des motifs spatiaux dans les images. La convolution 1D est couramment utilisée dans les réseaux de neurones pour le traitement du langage naturel ou l'analyse de signaux physiologiques.

```python
# Extrait de code 5.3 - Création d'une couche de convolution.
from tensorflow.keras.layers import Conv2D

conv_layer = Conv2D(filters=32,          # Nombre de filtres à apprendre
                     kernel_size=(3, 3), # Dimensions de chaque filtre
                     strides=(1, 1),     # Pas de déplacement du filtre
                     padding='valid',    # Aucune bordure ajoutée
                     activation='relu')  # Fonction d'activation ReLU
```

> **Encadré.** Bien que le padding symétrique soit fréquemment utilisé, il est tout à fait possible d'appliquer un padding asymétrique, avec des valeurs différentes sur chaque axe. Cette flexibilité est notamment utile lorsque l'image d'entrée n'est pas carrée ou lorsque le filtre possède des dimensions non symétriques. Dans l'API Keras, cette opération peut être réalisée à l'aide de la couche `ZeroPadding2D`, qui permet de spécifier précisément le nombre de pixels ajoutés sur chaque bord de l'image. L'argument padding peut prendre plusieurs formes :
> - une valeur entière : applique un même padding sur tous les côtés ;
> - un tuple de deux entiers (ph, pw) : applique un padding de ph pixels en haut et en bas, et de pw à gauche et à droite ;
> - un tuple de deux tuples ((top, bottom), (left, right)) : permet un contrôle total sur chaque bord.
>
> Par exemple, `ZeroPadding2D(padding=((1, 2), (0, 3)))` ajoute 1 pixel en haut, 2 en bas, 0 à gauche et 3 à droite.

### 5.2.2 Couche de sous-échantillonnage

La couche de sous-échantillonnage, plus connue sous l'appellation pooling, est une couche souvent placée entre deux couches de convolution. Elle reçoit en entrée plusieurs cartes de caractéristiques et applique à chacune d'entre elles l'opération de sous-échantillonnage.

**1. Rôle de la couche de sous-échantillonnage**

La couche de pooling est utilisée pour réduire les dimensions spatiales des cartes de caractéristiques tout en conservant les informations essentielles. Elle introduit une tolérance aux translations mineures grâce à sa capacité à agréger les informations dans des régions locales, ce qui permet de rendre le réseau moins sensible aux petits déplacements des motifs dans les données d'entrée. Par ailleurs, elle réduit également le bruit et les variations inutiles, favorisant ainsi une meilleure généralisation du modèle. En diminuant les dimensions des cartes de caractéristiques, le pooling contribue également à accélérer les calculs dans les couches profondes.

**2. Types de sous-échantillonnage**

Il existe différents types de pooling, chacun possédant des propriétés distinctes et étant adapté à des applications spécifiques.

Le sous-échantillonnage par maximum (max pooling) est l'une des méthodes les plus couramment utilisées pour la réduction de dimension dans les réseaux de neurones convolutifs. Cette technique consiste à sélectionner la valeur maximale dans chaque région locale de la carte de caractéristiques (voir la figure 5.11).

*Figure 5.11 - Max pooling avec un filtre 2x2 et un pas de 2. La carte de caractéristiques est divisée en des régions de taille 2x2 pour extraire les valeurs maximales par région. (figure non reproduite)*

Pour chaque région, seule la valeur maximale est conservée, ce qui permet de mettre en évidence les caractéristiques les plus saillantes, telles que les bords et les motifs dominants, tout en réduisant la taille des données et en rendant le modèle plus robuste aux variations mineures dans les données d'entrée. Le max pooling rend le réseau de neurones équivariant aux translations locales, ce qui signifie que de petites translations ou décalages des motifs dans l'image n'affectent pas les activations principales.

Formellement, l'opération de max pooling peut être exprimée par l'équation suivante (équation 5.6) :

```
O(i,j) = max{ I(p,q) }  pour p ∈ [i, i+kh−1], q ∈ [j, j+kw−1]
```

Dans cette équation :
- I désigne l'entrée de la couche considérée, représentée sous forme d'une matrice de dimensions H×W. Cette entrée peut correspondre soit à l'image initiale, soit à une carte de caractéristiques produite par une couche précédente.
- O(i,j) est la valeur de la carte de sortie après l'application de l'opération de pooling à la position (i,j).
- kh et kw définissent la taille de la fenêtre de pooling, c'est-à-dire la région locale dans laquelle l'opération max est appliquée.
- p et q sont les indices des pixels dans la fenêtre de pooling, qui varient en fonction de la position actuelle de la fenêtre sur la carte d'entrée.
- max(I(p,q)) est la valeur maximale parmi tous les pixels I(p,q) de la fenêtre de pooling.

> **Exemple 5.4** — Il existe plusieurs fonctions prêtes pour faire le pooling dans les principales bibliothèques de deep learning comme PyTorch, TensorFlow/Keras. Parmi lesquelles nous trouvons `MaxPooling1D`, `MaxPooling2D` et `MaxPooling3D`, qui appliquent un max pooling respectivement sur des données 1D, 2D et 3D en sélectionnant la valeur maximale dans chaque fenêtre locale de l'entrée. Cela dit, dans cet exemple, nous appliquons le pooling sur une image que nous créons manuellement à l'aide de l'extrait de code 5.4. L'objectif étant de mieux comprendre ce que font ces opérations, par exemple, comment la fenêtre se déplace et ce que sont le stride et le padding.
>
> L'image de départ est une matrice 8x8 contenant des valeurs binaires (0 ou 1), représentant une version simplifiée du chiffre 0 (voir l'extrait de code 5.4). Nous effectuons deux translations horizontales sur cette image à l'aide de la fonction `np.roll` qui permet de décaler les valeurs d'un tableau NumPy le long d'un axe donné. Dans cet exemple, ces translations décalent l'image respectivement de 1 et 2 colonnes vers la droite. Les images originale et translatées sont représentées dans la première ligne de la figure 5.12 (a)-(c).

```python
# Extrait de code 5.4 - Création d'une image représentant le chiffre 0.
from scipy.ndimage import shift

# Création d'une image 8x8 représentant le chiffre 0 (noir et blanc)
image = np.array([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]])

# Déplacement de l'image de 1 colonne vers la droite (translation horizontale)
translated_image1 = np.roll(image, shift=1, axis=1)

# Déplacement de l'image de 2 colonnes vers la droite (translation horizontale plus marquée)
translated_image2 = np.roll(image, shift=2, axis=1)
```

L'extrait de code 5.5 illustre l'implémentation de la fonction max pooling et son application à une image représentée sous forme de matrice bidimensionnelle à l'aide de la bibliothèque NumPy. Cette opération consiste à parcourir l'image à l'aide d'une fenêtre (ou noyau) de taille `pool_size x pool_size` (par défaut 2x2), en la déplaçant avec un pas (stride) donné.

À chaque position, la région locale de l'image est extraite, et la valeur maximale de cette région est conservée. Le résultat est stocké dans une nouvelle matrice de taille réduite, correspondant à la carte d'activation après pooling.

L'opérateur `//` en Python désigne une division entière (ou quotient entier), c'est-à-dire une division où l'on ignore la partie décimale. Dans notre cas, l'utilisation de la division entière est essentielle pour garantir que le résultat soit un entier puisqu'il s'agit de la dimension discrète d'une image ou d'un tenseur, qui ne peut pas être fractionnaire.

```python
# Extrait de code 5.5 - Implémentation de fonction max_pooling.
def max_pooling(image, pool_size=2, stride=2):
    # Récupérer la hauteur (h) et la largeur (w) de l'image
    h, w = image.shape

    # Calculer les dimensions de la sortie après pooling
    output_height = (h - pool_size) // stride + 1
    output_width = (w - pool_size) // stride + 1

    # Initialiser une matrice de zéros pour stocker l'image après pooling
    pooled_image = np.zeros((output_height, output_width))

    # Extraire la sous-région de taille pool_size x pool_size et appliquer le max pooling
    for i in range(output_height):
        for j in range(output_width):
            region = image[i * stride:i * stride + pool_size,
                            j * stride:j * stride + pool_size]
            pooled_image[i, j] = np.max(region)

    return pooled_image
```

L'extrait de code 5.6 illustre l'application de la fonction `max_pooling` sur l'image originale (ligne 1 de l'extrait de code 5.6) ainsi qu'aux versions translatées (ligne 2 et 3).

```python
# Extrait de code 5.6 - Application du max pooling sur 3 différentes images.
pooled_original = max_pooling(image)
pooled_translated1 = max_pooling(translated_image1)
pooled_translated2 = max_pooling(translated_image2)
```

La première ligne de la figure 5.12 montre trois images : (a) l'image originale, (b) une version translatée avec un shift=1 et (c) une version translatée avec un shift=2. Les étiquettes des axes horizontal et vertical indiquent les indices des pixels.

Dans la deuxième ligne, nous avons les sorties du max pooling, c'est-à-dire, (d) le max pooling de l'image originale, (e) le max pooling de l'image translatée avec un shift=1 et (f) le max pooling de l'image originale translatée avec un shift=2.

Nous observons que l'image (figure 5.12 (d)) et l'image (figure 5.12 (e)) sont très similaires. Cela montre que le pooling est robuste à une petite translation (1 pixel), car il retient uniquement la valeur maximale dans une fenêtre locale, ce qui ne change pas si l'objet est légèrement déplacé. En revanche, à partir d'un décalage de 2 pixels (figure 5.12 (c) et figure 5.12 (f)), le pooling n'est plus invariant : l'image transformée est différente, montrant une perte d'information. Le max pooling contribue à réduire la sensibilité aux petites translations, un atout majeur pour les CNN, car cela rend les modèles plus robustes aux variations spatiales mineures dans les images. Cependant, cette invariance n'est que locale et approximative. Des translations plus importantes peuvent entraîner une perte d'information, comme le montre la différence entre (figure 5.12 (d) et figure 5.12 (f)).

*Figure 5.12 - Invariance locale du max pooling avec un filtre 2x2 et un pas de 2 : (a) l'image originale (b) une version translatée de l'image originale avec un shift=1 et (c) une version translatée de l'image originale avec un shift=2 (d) pooling de l'image originale (e) pooling de version translatée de l'image originale avec un shift=1 et (f) pooling de la version translatée de l'image originale avec un shift=2. (figure non reproduite)*

Le sous-échantillonnage par moyenne (average pooling) suit la même logique que le max pooling mais calcule la moyenne des valeurs dans chaque région locale. Ainsi, il fournit une représentation plus lissée et globale et réduit les effets des valeurs aberrantes.

Formellement, l'opération de sous-échantillonnage par moyenne peut être exprimée par une équation similaire à celle du max pooling, en remplaçant l'opérateur de maximum (max) par la moyenne pour obtenir l'équation (5.7) :

```
O(i,j) = (1 / (kh·kw)) · Σ(p=i..i+kh-1) Σ(q=j..j+kw-1) I(p,q)
```

Dans cette équation nous avons les mêmes paramètres que précédemment :
- O(i,j) est la valeur de la carte de sortie après l'application de l'opération de pooling à la position (i,j).
- I étant la carte de caractéristiques d'entrée de taille H×W.
- kh et kw définissent la taille de la fenêtre de pooling.
- p et q sont les indices des pixels dans la fenêtre de pooling.

> **Exemple 5.5** — L'extrait de code 5.7 permet de développer la fonction `average_pooling` et l'applique sur les mêmes images que précédemment.

```python
# Extrait de code 5.7 - Implémentation de fonction average_pooling.
def average_pooling(image, pool_size=2, stride=2):
    # Récupérer la hauteur (h) et la largeur (w) de l'image
    h, w = image.shape

    # Calculer les dimensions de l'image après pooling
    output_height = (h - pool_size) // stride + 1
    output_width = (w - pool_size) // stride + 1

    # Initialiser une matrice de zéros pour stocker l'image après pooling
    pooled_image = np.zeros((output_height, output_width))

    # Parcourir chaque région où appliquer le pooling
    for i in range(output_height):
        for j in range(output_width):
            region = image[i * stride:i * stride + pool_size,
                            j * stride:j * stride + pool_size]
            pooled_image[i, j] = np.mean(region)

    return pooled_image
```

Le résultat de l'average pooling est donné dans la figure 5.13.

*Figure 5.13 - Invariance locale de l'average pooling avec un filtre 2x2 et un pas de 2 : (a) l'image originale (b) une version translatée avec un shift=1 et (c) une version translatée avec un shift=2 (d) average pooling de l'image originale (e) average pooling de la version translatée avec un shift=1 et (f) average pooling de la version translatée avec un shift=2. (figure non reproduite)*

Nous observons que l'average pooling produit des sorties plus douces, caractérisées par des variations moins abruptes entre les pixels. Certaines zones où il y avait des transitions nettes entre le noir (valeurs basses) et le blanc (valeurs hautes) sont devenues des zones de gris intermédiaire. Cela est dû au calcul de la moyenne dans chaque région locale, qui réduit les contrastes et lisse les transitions entre les zones.

Contrairement au max pooling (illustré à la figure 5.12), qui met en avant les activations les plus fortes, l'average pooling accorde une importance équivalente à toutes les valeurs dans une région, en calculant leur moyenne. Cela permet de préserver une information globale tout en réduisant la taille des données.

Le sous-échantillonnage global (global pooling) applique une opération maximum ou moyenne sur toute la carte de caractéristiques, produisant ainsi une seule valeur par carte. Le sous-échantillonnage global provoque une réduction drastique des dimensions, ce qui le rend particulièrement utile pour connecter une carte de caractéristiques à une couche dense. Toutefois, cette méthode élimine la dépendance spatiale en condensant l'ensemble de la carte de caractéristiques en une seule valeur, entraînant ainsi une perte totale des informations spatiales.

> **Exemple 5.6** — Dans cet exemple, nous appliquons quatre types de pooling à une même image : le `MaxPooling2D`, le `AveragePooling2D`, ainsi que le `GlobalMaxPooling2D` et le `GlobalAveragePooling2D` (voir l'extrait de code 5.8).
>
> Contrairement à l'exemple précédent, nous utilisons ici des fonctions de pooling prédéfinies disponibles dans les principales bibliothèques de deep learning, telles que PyTorch, TensorFlow ou Keras.

```python
# Extrait de code 5.8 - Implémentation de couches de sous-échantillonnage (pooling).
from tensorflow.keras.layers import MaxPooling2D, AveragePooling2D
from tensorflow.keras.layers import GlobalMaxPooling2D, GlobalAveragePooling2D

# Préparation de l'image pour Keras : ajout de dimensions (batch, hauteur,
# largeur, canaux) et conversion en float32 (requis pour les opérations de pooling)
image = image.reshape(1, 8, 8, 1).astype('float32')

# Définir les différentes couches de pooling
max_pooling = MaxPooling2D(pool_size=(2, 2), strides=(2, 2))
average_pooling = AveragePooling2D(pool_size=(2, 2), strides=(2, 2))
global_max_pooling = GlobalMaxPooling2D()
global_average_pooling = GlobalAveragePooling2D()

# Appliquer les différentes couches de pooling à une image donnée (ou une carte de caractéristiques)
max_pooled_output = max_pooling(image).numpy().squeeze()
average_pooled_output = average_pooling(image).numpy().squeeze()
global_max_pooled_output = global_max_pooling(image).numpy()
global_average_pooled_output = global_average_pooling(image).numpy()
```

Dans un premier temps, nous importons les couches de pooling spécifiques depuis les bibliothèques TensorFlow et Keras. Nous procédons ensuite à leur paramétrage, puis les appliquons à l'image d'entrée. Il convient de souligner que, pour être compatible avec les exigences des couches de Keras, l'image doit être convertie au format attendu, à savoir un tenseur à quatre dimensions de la forme (batch_size, hauteur, largeur, nombre_de_canaux). Des dimensions supplémentaires doivent donc être ajoutées à l'image initiale afin de respecter cette structure.

Dans notre cas, nous traitons une seule image (batch_size=1) de taille (8,8) pixels, avec un seul canal (nombre de canaux = 1) correspondant à une image en niveaux de gris. Cette opération de transformation permet donc d'adapter le format des données à l'interface des couches convolutionnelles ou de pooling dans les architectures de réseaux de neurones.

La figure 5.14 résume le résultat des quatre méthodes de pooling. Le max pooling et le average pooling donnent chacun une image 4x4, où chaque pixel correspond, respectivement, à la valeur maximale et la moyenne dans une région 2x2.

*Figure 5.14 - Comparaison de pooling (a) image originale (b) max pooling, (c) average pooling et (d) pooling global max et average. (figure non reproduite)*

Le global average pooling résume chaque image par une seule valeur représentant l'intensité moyenne de tous ses pixels. Cela réduit la carte de caractéristiques à sa luminosité moyenne.

Finalement, le global max pooling conserve uniquement le pixel le plus lumineux, mettant en évidence la valeur maximale dans l'image. Ces méthodes simplifient considérablement les données tout en capturant des informations globales sur l'image.

**3. Taille de l'image après le sous-échantillonnage**

Soit une image d'entrée I de dimensions (Hin, Win), où Hin représente la hauteur et Win la largeur. La taille de l'image après une opération de sous-échantillonnage est donnée par les équations suivantes (équations 5.8 et 5.9, partiellement dégradées par l'OCR) :

```
Hout = ⌊ (Hin − kh) / sh ⌋ + 1
Wout = ⌊ (Win − kw) / sw ⌋ + 1
```

Dans cette équation :
- Hin, Win sont, respectivement, la hauteur et la largeur de l'image d'entrée.
- kh, kw sont, respectivement, la hauteur et largeur du filtre de pooling.
- sh, sw correspondent aux pas de déplacement dans les directions verticale et horizontale.
- ⌊·⌋ représente la fonction partie entière inférieure.

Lorsqu'aucun padding n'est utilisé (ph = 0 et pw = 0), alors aucune bordure n'est ajoutée autour de l'image d'entrée avant d'appliquer le pooling. Dans ce cas, seules les régions de l'image qui peuvent accueillir le filtre de pooling sont utilisées pour produire les sorties. Cela réduit naturellement la taille de l'image, car certaines bordures peuvent ne pas être couvertes par le filtre. De plus, si le stride (pas de déplacement) est égal à la taille du filtre (sh = kh et sw = kw), le pooling est effectué de manière non chevauchante. Cela signifie que les régions couvertes par le filtre ne se superposent pas lors du déplacement du filtre à travers l'image. Dans ce cas, la taille de l'image de sortie est simplement divisée par la taille du filtre.

> **Encadré.** Le choix de la méthode de pooling dépend de plusieurs facteurs dont l'objectif du modèle à développer, la nature des données et l'architecture du réseau.
>
> L'objectif du modèle à développer influence fortement cette décision. Pour la classification d'images, le max pooling est préféré, car il met en valeur les caractéristiques discriminantes comme les bords et textures. En revanche, dans les tâches de régression ou de détection de tendance globale, le average pooling peut s'avérer plus pertinent, en fournissant une représentation plus lissée de l'information. Pour des tâches de segmentation ou de localisation fine, un pooling trop agressif, tel que le global pooling, est à éviter car il peut entraîner une perte de détails spatiaux.
>
> La profondeur du réseau est un autre facteur déterminant. Dans les réseaux profonds tels que ResNet ou EfficientNet, le global average pooling est fréquemment utilisé dans la dernière couche du réseau, ce qui permet de remplacer les couches entièrement connectées, réduisant ainsi le nombre de paramètres et le risque de surapprentissage. En revanche, dans les architectures plus simples, le max pooling reste une méthode efficace pour réduire la dimensionnalité tout en conservant les signaux forts.
>
> La nature des données guide également le choix. Lorsque les données sont bruitées, l'average pooling est souvent plus approprié, car il atténue les valeurs aberrantes que le max pooling pourrait amplifier. Pour des images à faible contraste ou aux structures diffuses, l'average pooling fournit une représentation plus fidèle. Inversement, si les motifs présents dans l'image sont ponctuels et marqués, le max pooling sera plus efficace pour ne pas les diluer.
>
> Finalement, le temps de calcul entre également en jeu. Le global pooling, qu'il soit max ou average, permet une réduction drastique de la dimension, ce qui s'avère utile dans les contextes contraints (appareils mobiles, objets connectés).

### 5.2.3 Couche intégralement connectée

La couche intégralement connectée, également appelée couche dense (fully connected), constitue la dernière composante d'un CNN. Elle agit comme un pont entre les couches précédentes et la prédiction finale. Dans cette couche, chaque neurone est connecté à tous les neurones de la couche précédente, ce qui permet une modélisation complète et globale des relations entre les caractéristiques extraites.

Les connexions denses, caractérisées par un grand nombre de paramètres (poids et biais), permettent d'apprendre des combinaisons complexes de caractéristiques pour produire des prédictions adaptées à la tâche. Dans un réseau fully connected, toutes les couches sont exclusivement composées de connexions denses, ce qui le rend idéal pour des données tabulaires ou des représentations vectorielles, mais peu adapté aux données structurées comme les images en raison de la perte de relations spatiales.

Bien que les couches fully connected soient efficaces pour modéliser des relations non linéaires, elles présentent certains inconvénients, notamment un risque accru de surapprentissage en raison de leur grand nombre de paramètres, ainsi qu'une forte complexité computationnelle. Pour atténuer ces limitations, ces couches sont souvent combinées avec des techniques de régularisation telles que le dropout (voir section 4.4.2), qui désactive aléatoirement certains neurones pendant l'entraînement, ou la normalisation, qui stabilise la distribution des activations (voir section 4.1.3).

Le paramétrage de la couche entièrement connectée est similaire à celui d'un perceptron multicouche. La dimension de la première couche correspond à la taille du vecteur aplati résultant de la dernière convolution. Cette taille peut être déterminée en multipliant les dimensions des cartes de caractéristiques produites par la dernière couche de pooling ou de convolution. Comme dans tout réseau de neurones entièrement connecté, le nombre de neurones dans la couche dépend de la complexité de la tâche et du niveau de généralisation souhaité. Parmi les fonctions d'activation couramment utilisées, ReLU est privilégiée dans les couches intermédiaires, tandis que softmax ou sigmoid sont généralement utilisées en sortie, selon qu'il s'agit d'une tâche de classification multiclasse ou binaire.

## 5.3 Entraînement d'un CNN

L'entraînement d'un réseau de neurones convolutif consiste à apprendre les paramètres du modèle, principalement les poids des filtres dans chaque couche convolutive. Ces poids déterminent la manière dont chaque filtre extrait des caractéristiques à partir de régions spécifiques de l'entrée. Chaque filtre peut également être associé à un biais, lui aussi appris au cours de l'entraînement.

Le processus d'entraînement des CNN repose sur des opérations itératives comparables à celles mises en œuvre dans les réseaux de neurones à propagation avant, tels que les perceptrons multicouches profonds, détaillés au chapitre 4. L'objectif est d'ajuster les poids et les biais du modèle de manière à minimiser une fonction de coût, généralement à l'aide d'un algorithme de descente de gradient. Les principales étapes de ce processus sont décrites ci-dessous, accompagnées des équations correspondantes. Les différences structurelles et fonctionnelles propres aux CNN seront détaillées dans la section 5.5.

Ce processus repose sur des opérations itératives visant à ajuster les poids et les biais afin de minimiser une fonction de coût. Les principales étapes sont illustrées à la figure 5.15 et décrites ci-dessous accompagnées de leurs formalisations mathématiques.

*Figure 5.15 - Processus d'entraînement d'un CNN. (figure non reproduite)*

**1. Initialisation des poids**

Les poids des filtres peuvent être initialisés aléatoirement. Cependant, tel que décrit à la section 4.1.1, des techniques d'initialisation spécifiques comme l'initialisation de He ou de Glorot peuvent être utilisées pour améliorer la convergence du réseau CNN lors de l'apprentissage.

**2. Propagation avant**

La propagation avant dans un réseau de neurones convolutif (CNN) consiste à transformer les données d'entrée en représentations de plus en plus abstraites à travers une succession de couches spécialisées. Chaque couche convolutive applique un ensemble de filtres (ou noyaux) glissants sur l'entrée pour extraire des caractéristiques locales, en conservant la structure spatiale des données.

Le résultat est ensuite passé à travers une fonction d'activation non linéaire, typiquement la ReLU qui introduit la non-linéarité nécessaire à la modélisation de relations complexes.

À intervalles réguliers, des couches de sous-échantillonnage réduisent la dimension spatiale des cartes d'activation, tout en conservant l'information essentielle, ce qui permet de limiter la complexité computationnelle et d'augmenter l'invariance locale.

L'ensemble de ces transformations est répété sur plusieurs couches, aboutissant à des représentations de haut niveau qui sont ensuite traitées par une ou plusieurs couches entièrement connectées en fin de réseau, menant à la sortie finale du modèle.

*a) Convolution* — Chaque filtre convolutif extrait des caractéristiques locales de l'image d'entrée, telles que les contours, textures ou motifs. L'application de ces filtres produit une carte de caractéristiques (feature map) pour chaque canal de sortie. La sortie d'une opération de convolution s'exprime comme suit :

```
y(i,j) = Σ(m=0..kh-1) Σ(n=0..kw-1) W(m,n) · x(i+m, j+n) + b
```

où :
- W(m,n) représente le poids du filtre de taille kh × kw.
- x(i+m, j+n) est la valeur locale de l'entrée à la position décalée.
- b est le biais associé au filtre.
- y(i,j) est la valeur obtenue dans la carte de caractéristiques en position (i,j).

*b) Activation non linéaire* — Après convolution, une fonction d'activation non linéaire est appliquée pour introduire de la non-linéarité dans le réseau, indispensable pour modéliser des relations complexes. La fonction la plus couramment utilisée dans les CNN est la ReLU (Rectified Linear Unit) :

```
y'(i,j) = ReLU(y(i,j)) = max(0, y(i,j))
```

La sortie y'(i,j), appelée carte d'activations, conserve la structure spatiale du signal tout en annulant les valeurs négatives. D'autres fonctions comme la sigmoïde ou la tangente hyperbolique (Tanh) peuvent également être utilisées, mais la ReLU est privilégiée pour sa simplicité et son efficacité.

*c) Sous-échantillonnage (Pooling)* — Les cartes d'activations y'(i,j) sont ensuite soumises à une opération de pooling, qui réduit leurs dimensions spatiales tout en conservant les informations les plus saillantes.

Les deux types de pooling les plus utilisés sont décrits dans la section 5.2.2. En voici un rappel qui respecte la notation utilisée pour l'entraînement du modèle.

Pour un max pooling, la sortie est la valeur maximale des activations y' dans une région locale R(i,j) :

```
z(i,j) = max(p,q)∈R(i,j) y'(p,q)
```

où z(i,j) désigne la sortie à la position (i,j) et R(i,j) la fenêtre de pooling centrée en (i,j).

Alors que pour un average pooling, la sortie correspond à la moyenne des activations dans la fenêtre R(i,j) :

```
z(i,j) = (1/|R(i,j)|) · Σ(p,q)∈R(i,j) y'(p,q)
```

où |R(i,j)| est le nombre total de pixels dans la fenêtre.

> **Encadré.** Bien que le filtrage (opération de convolution) et le pooling puissent tous deux entraîner une réduction des dimensions spatiales d'une image, ils remplissent des fonctions fondamentalement différentes au sein d'un réseau de neurones convolutif. Le filtrage consiste à appliquer un noyau (ou filtre) sur l'image d'entrée afin d'en extraire des caractéristiques locales telles que les contours, les textures ou les motifs. Cette opération est paramétrée, c'est-à-dire que les poids du filtre sont appris pendant l'entraînement, et elle génère une carte de caractéristiques (feature map) reflétant des informations discriminantes. En revanche, le pooling est une opération non paramétrée qui vise à réduire la taille spatiale des cartes de caractéristiques tout en conservant l'essentiel de l'information. Il agit comme un mécanisme de sous-échantillonnage, en sélectionnant par exemple la valeur maximale (max pooling) ou la moyenne (average pooling) dans des régions locales. Le pooling contribue ainsi à la réduction de la complexité computationnelle et à l'augmentation de la robustesse aux translations. En résumé, la convolution extrait l'information, tandis que le pooling la compresse sans apprentissage. Les deux opérations sont complémentaires mais ne doivent pas être confondues.

*d) Aplatissement et couches entièrement connectées* — Après plusieurs étapes de convolution, d'activation et de pooling, les cartes d'activations obtenues sont converties en un vecteur unidimensionnel par aplatissement (flattening). Ce vecteur h est ensuite transmis aux couches entièrement connectées (ou denses), qui assurent le traitement final de l'information pour la prise de décision. Chaque couche dense applique une opération affine suivie d'une fonction d'activation :

```
h^(l) = σ(W^(l)·h^(l-1) + b^(l))
```

avec :
- W désigne la matrice des poids de la couche l,
- b est le vecteur des biais,
- σ est la fonction d'activation, souvent ReLU pour les couches cachées et Softmax pour la couche de sortie.

**3. Calcul de la fonction de coût**

La fonction de coût (L) mesure l'écart entre la prédiction du modèle (ŷ) et la vérité terrain (y). C'est cette fonction qui est minimisée au cours de l'apprentissage à l'aide d'un algorithme d'optimisation, tel que la descente de gradient stochastique. Comme pour les autres architectures, le choix de la fonction de coût dépend de la nature de la tâche, à savoir, l'erreur quadratique moyenne pour les régressions et l'entropie croisée pour la classification.

**4. Rétropropagation**

La rétropropagation dans un CNN s'effectue de manière spécifique à chaque type de couche, en raison de la structure particulière et du rôle fonctionnel distinct de chacune d'elles. Cette diversité architecturale implique des règles de calcul des gradients adaptées à la nature des opérations effectuées par chaque couche :

- **Rétropropagation à travers une couche entièrement connectée.** Dans les réseaux convolutifs, les couches entièrement connectées interviennent à la fin du réseau, après une étape d'aplatissement des cartes d'activation issues des couches convolutives. Leur rétropropagation suit donc le même formalisme que dans un perceptron multicouche.
- **Rétropropagation à travers une couche sous-échantillonnage.** Au cours de la rétropropagation, la couche de pooling propage le gradient vers l'entrée en appliquant une règle dépendant de l'opération de sous-échantillonnage qui a été effectuée durant la propagation avant.
- **Rétropropagation à travers une couche convolutionnelle.** Dans une couche convolutionnelle, chaque neurone n'est connecté qu'à une petite région locale de l'entrée sur laquelle il applique un filtre (ou noyau) pour extraire une caractéristique spécifique. En glissant ce filtre sur l'ensemble de l'entrée, la carte de caractéristique est générée.

Lors de l'entraînement du réseau, l'étape de rétropropagation joue un rôle essentiel. Elle permet de calculer l'erreur transmise à la couche précédente, en tenant compte de la structure locale et partagée des connexions. Elle sert également à ajuster les poids du filtre, en évaluant leur contribution à l'erreur finale. Comme les poids du filtre sont partagés à travers toute l'image, leur mise à jour est influencée par l'ensemble des régions sur lesquelles ils ont été appliqués.

**5. Mise à jour des poids**

Les poids sont mis à jour à l'aide d'un algorithme d'optimisation, tels que la descente de gradient ou ses variantes (Adam, RMSProp, etc.). La règle de mise à jour est donnée par :

```
w ← w − η · ∂L/∂w
```

où η est le taux d'apprentissage et ∂L/∂w est le gradient de la perte par rapport au poids.

Rappelons que, dans le cas des CNN, ces poids correspondent aux noyaux utilisés pour extraire les caractéristiques locales des données en entrée.

Les étapes de propagation avant, calcul de la perte, rétropropagation et mise à jour des poids sont répétées sur plusieurs époques jusqu'à ce que la perte soit minimisée ou qu'une convergence satisfaisante soit atteinte.

> **Pour aller plus loin.** Si vous désirez avoir plus de détails sur les concepts mathématiques de la convolution et sa transposition dans un réseau CNN, le livre « Deep Learning » de Ian Goodfellow, Yoshua Bengio et Aaron Courville (2016) est une référence académique incontournable dans le domaine. Le chapitre 6.5 de ce livre détaille l'algorithme de rétropropagation de manière rigoureuse, tandis que le chapitre 9.3 présente les réseaux convolutifs, en expliquant les calculs de gradient spécifiques aux couches convolutives. Aussi, l'article « A guide to convolution arithmetic for deep learning » de Vincent Dumoulin et Francesco Visin (2016) fournit une présentation exhaustive des calculs liés aux convolutions et convolutions transposées. Il est particulièrement utile pour comprendre la propagation des dimensions et les opérations associées lors de la rétropropagation dans les CNN.

## 5.4 Comparaison des réseaux CNN et MLP

L'entraînement d'un CNN repose globalement sur les mêmes principes que celui d'un perceptron multicouche (MLP), à savoir, la propagation avant, le calcul de la perte, la rétropropagation du gradient et la mise à jour des poids. Toutefois, quelques différences majeures émergent, notamment en raison de l'architecture spécifique des CNN et de la nature spatiale des données qu'ils traitent.

**1. Architecture hiérarchique et paramétrée spatialement**

Contrairement aux MLP dans lesquels chaque neurone est connecté à tous les neurones de la couche précédente, les CNN exploitent la localité spatiale grâce à des couches convolutives. Les filtres (ou noyaux de convolution) sont partagés sur toute l'image, ce qui réduit significativement le nombre de paramètres à apprendre et limite ainsi le risque de surapprentissage. Cette structure permet également d'extraire automatiquement des caractéristiques locales pertinentes, comme les bords ou les textures, et ce, de manière invariante aux translations dans l'image.

**2. Propagation avant spécifique aux couches de convolution et de pooling**

Dans un CNN, la propagation avant comprend une opération de convolution suivie, dans la majorité des cas, d'une fonction d'activation non linéaire comme la ReLU. Cette étape est souvent complétée par un sous-échantillonnage spatial. Ce processus permet une transformation hiérarchique des représentations : les couches initiales détectent des caractéristiques locales simples (telles que les contours), tandis que les couches profondes combinent ces éléments pour extraire des caractéristiques plus complexes et abstraites (comme des formes ou objets entiers illustrés à la figure 5.2).

**3. Rétropropagation adaptée aux couches convolutives**

Dans un CNN, la rétropropagation est adaptée à la structure particulière des couches convolutives. Ainsi, les gradients doivent être calculés non seulement pour les poids des couches denses, mais aussi pour les filtres convolutifs. Cette rétropropagation exploite la structure spatiale des données d'entrée et repose sur des opérations spécifiques, telles que la convolution transposée (également appelée convolution inversée), pour propager le gradient dans l'espace d'entrée. Les gradients des filtres sont accumulés à travers toutes les régions où ces filtres ont été appliqués lors de la propagation avant, en tenant compte du partage des poids. Cela permet d'adapter efficacement les filtres à l'ensemble des motifs détectés dans les différentes régions de l'entrée.

**4. Régularisation et normalisation**

Les CNN requièrent plusieurs techniques spécifiques pour améliorer la généralisation du modèle. Le dropout est souvent utilisé dans les couches pleinement connectées situées en fin de réseau afin de réduire le surapprentissage. De plus, la normalisation par lots est couramment intégrée, en particulier dans les réseaux profonds, pour stabiliser et accélérer l'apprentissage. Enfin, les CNN bénéficient fortement des techniques d'augmentation des données, telles que les rotations et les translations pour élargir le jeu de données. Ces techniques sont moins utilisées pour le développement d'un modèle MLP.

**5. Prétraitement des données**

Les prétraitements requis pour le développement d'un CNN sont différents de ceux d'un MLP. En effet, les CNN sont conçus pour exploiter des données structurées spatialement, comme les images. En conséquence, le prétraitement des données inclut généralement la normalisation des valeurs de pixels, le redimensionnement des images à une taille fixe compatible avec l'entrée du réseau, et parfois la conversion des images en niveaux de gris ou en représentation RGB, selon les besoins du modèle.

En revanche, les MLP exigent que les données d'entrée soient présentées sous forme de vecteurs. Ainsi, les images doivent d'abord être aplaties en un vecteur unidimensionnel, ce qui entraîne la perte de l'organisation spatiale des pixels. Cette transformation implique une perte d'information sur la structure spatiale des données, rendant les MLP moins performants sur les images, sauf dans des cas simples ou bien structurés.

> **Encadré.** Une image numérique est composée de pixels (contraction de « picture element »). Les couleurs dans une image sont souvent représentées par des modèles de couleurs comme RGB (Red, Green, Blue), où chaque pixel a une composante de chaque couleur primaire. Ainsi, les canaux dans les images font référence aux différentes composantes de couleur qui composent l'image.
>
> Une image en niveaux de gris (grayscale) possède un seul canal où chaque pixel est représenté par une seule valeur d'intensité lumineuse, généralement entre 0 (noir) et 255 (blanc). Par contre, une image couleur est généralement représentée par trois canaux : Rouge (Red), Vert (Green), et Bleu (Blue), communément notés RGB (ou encore RVB en français).
>
> Il existe également d'autres espaces de couleur, moins couramment utilisés mais plus adaptés à des applications spécifiques de traitement d'images. C'est le cas de l'espace HSV (ou HSL en français), qui décompose l'information de couleur en trois composantes : la teinte (hue), la saturation (saturation) et la valeur ou luminosité (value/lightness). Cet espace est particulièrement utile dans des tâches de traitement d'image où la séparation des caractéristiques chromatiques et lumineuses facilite l'analyse, comme la détection d'objets ou la segmentation basée sur la couleur.

**6. Complexité de calcul**

Malgré un nombre de paramètres généralement plus faible qu'un MLP équivalent, les CNN sont plus exigeants en termes de calcul. Cette complexité s'explique par la nature des opérations de convolution, notamment lorsqu'elles sont empilées sur de nombreuses couches. Par conséquent, l'entraînement des CNN est généralement réalisé à l'aide de GPU, en particulier pour les architectures profondes telles que VGG ou ResNet.

## 5.5 Exemples d'architectures de CNN

Yann LeCun est largement reconnu comme l'un des pionniers ayant démontré l'efficacité de l'algorithme de rétropropagation dans l'entraînement des réseaux de neurones artificiels. Il a notamment appliqué cette méthode dans le cadre de la reconnaissance automatique de chiffres manuscrits, en particulier pour le traitement d'images de codes postaux. Au cours des années 1990, ses travaux, menés en collaboration avec son équipe, ont conduit à la mise au point du modèle « LeNet-5 », considéré comme l'un des premiers réseaux de neurones convolutionnels profonds appliqués avec succès à une tâche de vision par ordinateur.

Depuis, de nombreuses architectures de réseaux de neurones convolutifs ont émergé, stimulées par la disponibilité de jeux de données de référence tels que MNIST et CIFAR-10, ainsi que par l'organisation de compétitions internationales comme l'ImageNet Large Scale Visual Recognition Challenge (ILSVRC). Ces ressources ont joué un rôle central dans l'évaluation et l'accélération des avancées en vision par ordinateur.

Dans ce qui suit, nous présentons les architectures LeNet-5, AlexNet et ResNet. Ces modèles n'ont pas été choisis au hasard : ils incarnent chacun une avancée technologique ou méthodologique majeure dans l'évolution des réseaux de neurones convolutifs, marquant des étapes clés dans le développement de la vision par ordinateur.

### 5.5.1 LeNet-5

LeNet-5 est une architecture introduite par Yann LeCun en 1998 pour la reconnaissance de chiffres manuscrits. Il se distingue par une structure relativement simple et compacte, composée de seulement sept couches, incluant des couches de convolution, de sous-échantillonnage et entièrement connectées (voir la figure 5.16). Cette simplicité en fait un modèle idéal pour illustrer les principes fondamentaux des CNN dans un contexte de classification d'images.

> **Encadré.** L'appellation « LeNet-5 » provient de la combinaison de deux éléments : « LeNet » fait référence à Yann LeCun, principal concepteur de l'architecture, où « Le » est dérivé de son nom de famille, et « Net » correspond à network (réseau, en anglais). Le chiffre « 5 » indique qu'il s'agit de la cinquième version de l'architecture mise au point par LeCun et ses collaborateurs, dans le cadre de leurs travaux pionniers sur les réseaux de neurones convolutifs durant les années 1990.

*Figure 5.16 - Architecture LeNet-5, illustrant l'enchaînement des couches de convolution, de sous-échantillonnage et entièrement connectées. (figure non reproduite)*

L'entrée du réseau est une image de 32x32 pixels en niveaux de gris, ce qui permet de capturer les détails locaux tout en réduisant la complexité des données (voir la figure 5.17).

*Figure 5.17 - Échantillons de chiffres manuscrits extraits du jeu de données MNIST, affichés en niveaux de gris inversés (fond blanc). (figure non reproduite)*

**Couche C1 - Première couche convolutive** — La couche C1 constitue la première couche convolutive de l'architecture. Elle applique 6 filtres de taille 5x5 sur l'image d'entrée de dimensions 32x32, générant ainsi 6 cartes de caractéristiques en sortie (voir la figure 5.18).

*Figure 5.18 - Couche C1 : Convolution initiale avec 6 filtres 5x5 sur l'image d'entrée 32x32 pour obtenir 6 cartes de caractéristiques de dimension 28x28. (figure non reproduite)*

En l'absence de padding, la taille de chaque carte de sortie est réduite à 28x28. Cette dimension est obtenue à l'aide des équations (5.4) et (5.5), selon le calcul suivant : (32−5+1) × (32−5+1) = 28×28.

Les paramètres appris incluent les poids des filtres et les biais associés. Cette couche extrait des caractéristiques locales comme les contours ou les motifs simples.

**Couche S2 - Première couche de pooling** — La couche suivante, S2, est une couche de sous-échantillonnage qui applique un pooling moyen avec un facteur 2x2 (voir la figure 5.19). Elle réduit la taille de l'image de 28x28 à 14x14 (se référer à l'équation (5.8)). En plus de réduire les dimensions, cette opération permet de rendre le réseau plus robuste aux variations dans les données, comme les translations mineures de l'image.

*Figure 5.19 - Couche de sous-échantillonnage S2 : réduction de la taille des cartes d'activation de C1 par moyennage sur des régions 2x2. (figure non reproduite)*

**Couche C3 - Deuxième couche convolutive** — La couche C3 constitue la deuxième couche convolutive de l'architecture LeNet-5. Elle introduit 16 filtres convolutifs de taille 5x5, appliqués sur les sorties de la couche précédente (S2). Contrairement à la couche C1, où chaque carte de caractéristiques résultait d'une convolution appliquée à l'ensemble des canaux de l'image d'entrée (pleine connectivité), la couche C3 adopte une stratégie de connectivité partielle entre les cartes d'entrée et les filtres.

Plus précisément, chaque carte de caractéristiques de la couche C3 n'est pas connectée à l'ensemble des cartes en sortie de S2 (au nombre de 6), mais à une sous-combinaison spécifique. Ce schéma de connexions a été défini manuellement par les auteurs du modèle, dans le but de :
1. Réduire le nombre de paramètres : en limitant le nombre de connexions, le nombre de poids à apprendre diminue également, ce qui rend l'entraînement plus efficace.
2. Favoriser une spécialisation progressive : en imposant des connexions restreintes, chaque carte peut apprendre à détecter des motifs plus spécifiques à partir de sous-ensembles d'informations.
3. Préserver une diversité des représentations : cette structure permet d'éviter une redondance excessive entre les cartes de caractéristiques, encourageant des filtres complémentaires.

En sortie, la couche C3 génère 16 cartes de caractéristiques, chacune de taille 10x10, obtenues à partir de la convolution des sous-ensembles assignés de S2.

> **Encadré.** Dans le contexte des réseaux de neurones convolutifs (CNN) comme LeNet-5, les termes canaux d'entrée et cartes de caractéristiques peuvent être utilisés de manière interchangeable. Cela dit, l'appellation canaux d'entrée est plus utilisée pour désigner les entrées (brutes ou résultantes) d'une couche alors que l'appellation cartes de caractéristiques est utilisée pour désigner les sorties convolutives représentant les motifs appris par les filtres. Ainsi, pour des images d'entrées, nous utilisons l'appellation canal. Par exemple, pour une image en niveaux de gris, il y a 1 canal d'entrée, car l'image contient une seule matrice représentant les intensités des pixels. Pour une image en couleurs (RGB), il y aurait 3 canaux d'entrée (rouge, vert, bleu).

**Couche S4 - Deuxième couche de sous-échantillonnage** — Tout comme la couche S2, la couche S4, une seconde couche de sous-échantillonnage, réduit encore la dimension spatiale de 10x10 à 5x5. En effectuant un pooling moyen, elle conserve les informations les plus pertinentes tout en réduisant les coûts computationnels.

**Couche C5 - Troisième couche convolutive** — La couche C5 est considérée comme couche convolutive bien qu'elle agisse comme une couche entièrement connectée en raison de la petite taille de la sortie précédente. Elle contient 120 filtres de taille 5x5, ce qui correspond à une sortie de dimensions 1x1 pour chaque filtre. Ainsi, avec 120 filtres convolutifs, la sortie est simplement un vecteur contenant 120 valeurs, chacune correspondant à la réponse d'un filtre différent. Cette couche condense les caractéristiques extraites en une représentation globale des données.

**Couche C6 - Couche entièrement connectée** — La couche C6 est une couche entièrement connectée (couche dense) qui contient 84 neurones et qui agit comme une couche intermédiaire pour relier les caractéristiques extraites à l'espace de sortie.

**Couche de sortie** — La couche finale contient 10 neurones, correspondant aux 10 classes de chiffres (0 à 9). Elle utilise une fonction d'activation softmax pour produire des probabilités, permettant ainsi de classer les chiffres avec un haut degré de précision.

> **Pour aller plus loin.** L'article intitulé « Gradient-Based Learning Applied to Document Recognition » de Yann LeCun, Léon Bottou, Yoshua Bengio et Patrick Haffner, publié en 1998 dans les Proceedings of the IEEE, est une contribution majeure dans le domaine de l'apprentissage profond et de la reconnaissance de documents. Cet article expose une méthodologie complète pour l'apprentissage supervisé des réseaux de neurones convolutifs (CNN) et explore leurs applications, en particulier pour la reconnaissance optique de caractères (OCR). Cet article est une œuvre fondamentale qui a jeté les bases de l'apprentissage profond appliqué à la vision par ordinateur et a ouvert la voie à des applications industrielles aujourd'hui omniprésentes.

Le tableau 5.1 résume l'architecture du réseau utilisé principalement pour la reconnaissance d'images. Il présente les différentes couches du réseau, leurs types, ainsi que leurs caractéristiques principales.

*Tableau 5.1 - Résumé des caractéristiques des couches du réseau convolutif LeNet-5 : architecture, dimensions et fonctions d'activation.*

| Couche | Type | Cartes | Taille | Noyau | Pas | Activation |
|---|---|---|---|---|---|---|
| Entrée | Image | 1 | 32x32 | - | - | - |
| C1 | Convolution | 6 | 28x28 | 5x5 | 1 | Sigmoïde |
| S2 | Avg pooling | 6 | 14x14 | 2x2 | 2 | - |
| C3 | Convolution | 16 | 10x10 | 5x5 | 1 | Sigmoïde |
| S4 | Avg pooling | 16 | 5x5 | 2x2 | 2 | - |
| C5 | Convolution | 120 | 1x1 | 5x5 | 1 | Sigmoïde |
| F6 | Dense | 84 | - | - | - | Sigmoïde |
| Sortie | Dense | 10 | - | - | - | Softmax |

> **Exemple 5.7** — La fonction `create_lenet5()`, décrite dans le code 5.9, définit l'architecture de LeNet-5 avec ses couches de convolution, de pooling moyen et dense.
>
> Cette fonction construit l'architecture du réseau à l'aide de couches séquentielles. Elle inclut deux couches de convolution, chacune suivie d'une activation sigmoid et d'un sous-échantillonnage. Ensuite, les cartes de caractéristiques sont aplaties puis transmises à deux couches entièrement connectées, la dernière utilisant une activation softmax. Le modèle est conçu pour traiter en entrée des images de taille (32,32) et en sortie les 10 classes du jeu de données MNIST.
>
> La méthode `lenet5.summary()` affiche toutes les couches du modèle LeNet-5, dans l'ordre de leur connexion.
>
> Dans l'entête du résumé de LeNet-5, chaque couche est listée avec les caractéristiques suivantes : (1) le type de couche (type) qui indique le type d'opération effectuée par la couche (2) la forme de sortie (Output Shape) qui indique la taille de la sortie de chaque couche après traitement et (3) le nombre de paramètres (Param #) qui indique le nombre total de paramètres à entraîner (poids et biais) dans chaque couche. Ce nombre est donné par :
>
> ```
> Param = (kh · kw · Cin + 1) · Cout
> ```
>
> avec,
> - (kh, kw) sont les dimensions du filtre (hauteur et largeur du noyau).
> - Cin est le nombre de canaux d'entrée.
> - Cout est le nombre de filtres (cartes de caractéristiques) ou canaux de sortie.
> - le +1 est ajouté pour le biais associé à chaque filtre.
>
> La première couche de LeNet-5 utilise des filtres 5x5 (kh = 5, kw = 5). Le modèle prend une image en niveaux de gris comme entrée donc Cin = 1. La première couche applique 6 filtres (Cout = 6). Ainsi chaque filtre a 5x5x1 = 25 poids. Un biais est ajouté pour chaque filtre, donc 25 + 1 = 26 paramètres par filtre.

```python
# Extrait de code 5.9 - Implémentation de l'architecture LeNet-5.
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Conv2D, AveragePooling2D, Flatten, Dense, Softmax

# Définir le modèle
def create_lenet5():
    model = Sequential()

    # ---- Couche C1 : Convolution
    # Entrée : image 32x32 en niveaux de gris (1 canal)
    model.add(Conv2D(filters=6, kernel_size=(5, 5), strides=1,
                      activation='sigmoid', input_shape=(32, 32, 1), padding='valid'))

    # ---- Couche S2 : Sous-échantillonnage (Average Pooling)
    model.add(AveragePooling2D(pool_size=(2, 2), strides=2, padding='valid'))

    # ---- Couche C3 : Convolution
    model.add(Conv2D(filters=16, kernel_size=(5, 5), strides=1,
                      activation='sigmoid', padding='valid'))

    # ---- Couche S4 : Average Pooling
    model.add(AveragePooling2D(pool_size=(2, 2), strides=2, padding='valid'))

    # ---- Couche C5 : Convolution
    model.add(Conv2D(filters=120, kernel_size=(5, 5), strides=1,
                      activation='sigmoid', padding='valid'))

    # ---- Couche Flatten
    model.add(Flatten())

    # ---- Couche C6 : Fully Connected
    model.add(Dense(units=84, activation='sigmoid'))

    # ---- Couche de sortie
    # 10 neurones avec softmax pour classification
    model.add(Dense(units=10, activation='softmax'))

    return model

# Instancier le modèle LeNet5
lenet5 = create_lenet5()

# Afficher le résumé de l'architecture
lenet5.summary()
```

Le nombre total de paramètres pour les 6 filtres de la première couche est donc : 6x26 = 156. Le nombre total des paramètres du modèle LeNet-5 est 61 706.

```
Model: "Lenet5"

Layer (type)                    Output Shape              Param #
conv2d (Conv2D)                 (None, 28, 28, 6)          156
average_pooling2d (AveragePooling2D)  (None, 14, 14, 6)    0
conv2d_1 (Conv2D)               (None, 10, 10, 16)         2,416
average_pooling2d_1 (AveragePooling2D) (None, 5, 5, 16)    0
conv2d_2 (Conv2D)                (None, 1, 1, 120)         48,120
flatten (Flatten)                (None, 120)               0
dense (Dense)                    (None, 84)                10,164
dense_1 (Dense)                  (None, 10)                850

Total params: 61,706 (241.04 KB)
Trainable params: 61,706 (241.04 KB)
Non-trainable params: 0 (0.00 B)
```

> **Encadré.** Il est important de souligner que, bien que la couche C3 de l'architecture LeNet-5 originale utilise des connexions partielles entre les cartes de la couche S2 et les filtres de convolution, cette particularité est rarement respectée dans les implémentations contemporaines à l'aide de bibliothèques telles que PyTorch ou TensorFlow. Dans ces environnements, les couches convolutives sont généralement entièrement connectées par défaut, c'est-à-dire que chaque filtre opère simultanément sur l'ensemble des canaux d'entrée. Cette simplification dans les implémentations n'empêche pas toutefois d'obtenir de bonnes performances sur les jeux de données visés à l'origine par LeNet-5, comme MNIST. Si vous désirez reproduire fidèlement le schéma de connexions partielles de LeNet-5, vous devez passer par une définition manuelle des sous-groupes de connexions pour chaque carte de caractéristiques.

### 5.5.2 AlexNet

Proposée en 2012, l'architecture AlexNet constitue une avancée majeure dans l'évolution des réseaux de neurones convolutifs et de l'apprentissage profond. En remportant de manière significative le concours de classification d'images ImageNet, elle a établi de nouveaux standards de performance, mettant en évidence l'efficacité des CNN pour les tâches de vision par ordinateur à grande échelle.

> **Encadré.** L'appellation « AlexNet » fait référence à Alex Krizhevsky, l'un des principaux auteurs du modèle, développé en collaboration avec Ilya Sutskever et Geoffrey Hinton. De la même façon que LeNet, le nom combine le prénom « Alex » avec « Net », abréviation de network, pour désigner un réseau de neurones.

L'architecture repose principalement sur l'utilisation de la fonction d'activation ReLU dans toutes les couches convolutives et pleinement connectées, à l'exception de la couche de sortie (FC8), où une fonction softmax est utilisée afin de transformer les scores bruts en probabilités de classification (voir la figure 5.20). Les détails des couches principales et leurs rôles respectifs sont décrits dans ce qui suit :

*Figure 5.20 - Architecture du réseau AlexNet. (figure non reproduite)*

**Couche d'entrée** — L'entrée du réseau est une image de dimensions 227x227x3, où 227x227 représente la largeur et la hauteur de l'image, et 3 représente les canaux de couleur (RGB). Cette couche fournit les données brutes au réseau sous la forme d'une matrice, permettant de traiter des images en couleur.

> **Encadré.** La différence entre les tailles d'entrée 224x224 et 227x227 observée dans les implémentations d'AlexNet provient d'un détail d'implémentation historique. Bien que l'article original mentionne des images de taille 224x224, la première couche convolutive du réseau utilise un noyau de 11x11, un pas de 4 et aucun padding, ce qui impose une taille d'entrée de 227x227 pour que la sortie ait des dimensions entières. Ainsi, l'implémentation d'origine utilisait 227x227 pour éviter des erreurs de dimensionnement, tandis que les architectures plus récentes comme VGG ou ResNet adoptent une taille standardisée de 224x224.

**Première couche convolutive Conv1** — La couche Conv1 applique 96 filtres de taille 11x11x3 sur l'image d'entrée, avec un pas de 4 et sans ajout de padding. Cette opération produit une sortie de dimensions 55x55x96, conformément à l'équation (5.4). L'objectif principal de cette couche est de détecter des motifs visuels locaux, tels que les contours, textures et transitions d'intensité, sur une échelle relativement large, rendue possible par l'utilisation de filtres de grande taille (11x11).

> **Encadré.** La profondeur d'un filtre de convolution dans un réseau de neurones convolutifs est toujours égale à celle de l'image en entrée de la couche. Par exemple, une image couleur au format RGB de taille 224x224 pixels possède une profondeur (ou nombre de canaux) égale à 3. Sa dimension complète est donc 224x224x3. Le noyau de convolution utilisé pour traiter cette image doit avoir une hauteur et une largeur définies par l'utilisateur (par exemple 3x3, 5x5, etc.), et une profondeur exactement égale à celle de l'image, soit 3 dans ce cas.

**Couche de normalisation locale LRN1** — La couche de normalisation locale (Local Response Normalization, LRN) est une composante importante et distinctive d'AlexNet. Elle est utilisée pour stabiliser l'entraînement et améliorer la généralisation du modèle. Cette couche introduit une forme de compétition entre les activations voisines dans une région locale, en renforçant les neurones les plus activés tout en diminuant l'influence des autres. Cette compétition met en avant les caractéristiques dominantes, ce qui aide le réseau à se concentrer sur les informations pertinentes tout en réduisant les biais pendant l'apprentissage. La couche de normalisation locale joue également un rôle dans la régularisation, limitant le surapprentissage et contribuant à une meilleure convergence.

Formellement, la sortie normalisée dans la couche de normalisation locale est donnée par (équation 5.10, partiellement dégradée par l'OCR) :

```
b(x,y,i) = a(x,y,i) / ( k + α · Σ(j=max(0,i-n/2)..min(N-1,i+n/2)) a(x,y,j)² )^β
```

Dans cette équation :
- b(x,y,i) est l'activation normalisée pour la position (x,y) sur la carte de caractéristiques i.
- a(x,y,i) est l'activation initiale pour la position (x,y) sur la carte de caractéristiques i.
- k est une constante de décalage (k ≥ 1).
- α est un facteur de mise à l'échelle et β est un exposant régulant l'effet de normalisation.
- n est le nombre de cartes considérées pour la normalisation.
- N est le nombre total de cartes de caractéristiques.

Les deux bornes de la somme, max(0, i−n/2) et min(N−1, i+n/2), déterminent la plage des cartes de caractéristiques j qui sont utilisées pour normaliser l'activation a(x,y,i). i−n/2 est la position de départ idéale, et i+n/2 est la position de fin idéale. Ainsi, la somme ne considère que les cartes dans un voisinage défini par n autour de i, et elle respecte les contraintes des indices. Cela évite d'accéder à des indices hors de portée (j < 0 ou j > N).

> **Encadré.** La couche de normalisation locale (LRN) a été introduite dans le modèle AlexNet original (Krizhevsky et al., 2012) pour favoriser la compétition entre neurones adjacents et mettre en valeur les activations qui surpassent localement leurs voisines. Toutefois, cette couche n'est pas intégrée nativement dans les versions récentes de TensorFlow ou Keras. Son implémentation doit donc être programmée manuellement si nécessaire. Avec l'évolution des pratiques en apprentissage profond, la normalisation par lot (BN) s'est imposée comme une alternative plus efficace. Elle offre des avantages similaires à LRN en termes de normalisation, tout en améliorant considérablement la stabilité, la vitesse de convergence et la performance globale du modèle. En conséquence, la LRN est aujourd'hui rarement utilisée dans les architectures modernes.

> **Exemple 5.8** — L'extrait de code 5.10 définit une fonction `lrn(x)` qui implémente la normalisation locale de réponse. La commande `K.pool2d` applique un pooling moyen à la carte d'activation élevée au carré. Cette opération consiste à calculer la moyenne des valeurs dans une fenêtre locale, centrée autour de chaque position, de taille `pool_size=(5,5)` pixels. La fonction `lrn(x)` permet ainsi d'estimer l'activation moyenne dans le voisinage immédiat de chaque pixel, afin de normaliser la valeur d'activation du pixel central en tenant compte du contexte local.
>
> L'extrait de code 5.10, utilisé dans la pratique, n'applique pas directement les bornes de la somme telles que définies dans la formule de l'équation (5.10) qui définit les indices des voisins considérés dans la normalisation locale et qui veille à ne pas dépasser les limites de l'image. Dans l'équation (5.10), les bornes sont calculées dynamiquement pour chaque position de l'image. Cela garantit que la somme ne dépasse jamais la taille réelle de l'image. Dans ce code, la gestion de dépassement est remplacée par le mécanisme de `padding="same"` dans `K.pool2d`, qui simule un comportement similaire, mais sans calcul explicite des bornes. Cela signifie que les indices utilisés pour le calcul de la moyenne ne sont pas explicitement limités par des bornes max et min, mais sont remplis automatiquement les valeurs manquantes avec des zéros grâce au `padding="same"`.

```python
# Extrait de code 5.10 - Implémentation de la normalisation locale de réponse (LRN).
import tensorflow.keras.backend as K

def lrn(x):
    alpha = 1e-4
    beta = 0.75
    k = 2
    n = 5
    square = K.square(x)
    pooled = K.pool2d(square, pool_size=(n, n), strides=(1, 1),
                       padding="same", pool_mode="avg")
    return x / K.pow(k + alpha * pooled, beta)
```

**Première couche de max pooling P1** — Cette couche effectue un max pooling sur les cartes de caractéristiques produites par Conv1. Elle utilise des filtres de taille 3x3 avec un stride de 2, ce qui réduit les dimensions de la sortie à 27x27x96. Le rôle de cette couche est de réduire la dimension spatiale tout en conservant les informations les plus pertinentes, augmentant ainsi l'invariance aux translations et aux déformations.

**Deuxième couche convolutive Conv2** — La deuxième couche convolutive applique 256 filtres de taille 5x5x96 avec un stride de 1 et un padding pour conserver les dimensions spatiales. La sortie de cette couche est de dimensions 27x27x256. Cette couche extrait des caractéristiques plus complexes en combinant les informations fournies par les 96 canaux de la couche précédente.

**Deuxième couche de normalisation locale LRN2** — Cette couche, identique à la première LRN, améliore encore la robustesse de l'apprentissage et la convergence en renforçant les activations les plus importantes.

**Deuxième couche de Max Pooling P2** — La deuxième couche de sous-échantillonnage utilise des filtres de taille 3x3 avec un stride de 2, réduisant les dimensions de la sortie à 13x13x256. Comme la première couche de sous-échantillonnage, elle vise à conserver les informations essentielles tout en limitant la complexité computationnelle et en améliorant la généralisation.

**Troisième, quatrième et cinquième couches convolutives (Conv3, Conv4, Conv5)** — La troisième couche convolutive (Conv3) applique 384 filtres de taille 3x3x256, produisant une sortie de dimensions 13x13x384. Elle est suivie par la quatrième couche (Conv4), qui applique 384 filtres supplémentaires de taille 3x3x384, et par la cinquième couche (Conv5), qui applique 256 filtres de taille 3x3x384. Ces trois couches travaillent conjointement pour extraire des caractéristiques abstraites et complexes tout en préparant les données pour les couches entièrement connectées.

**Troisième couche de Max Pooling P3** — La troisième couche de sous-échantillonnage utilise des filtres de taille 3x3 avec un stride de 2, réduisant les dimensions de la sortie à 6x6x256. Cette étape prépare les données pour leur passage dans les couches entièrement connectées en réduisant davantage les dimensions spatiales tout en conservant les informations les plus importantes.

**Couches entièrement connectées (FC6, FC7)** — La première couche entièrement connectée (FC6) contient 4096 neurones et extrait des caractéristiques globales des données d'entrée. La deuxième couche entièrement connectée (FC7), également composée de 4096 neurones, affine ces caractéristiques pour la tâche finale.

**Couche de sortie FC8** — La couche de sortie contient 1000 neurones, correspondant aux 1000 classes d'ImageNet, et produit les scores finaux pour la classification.

AlexNet a marqué une avancée majeure dans l'apprentissage profond en vision par ordinateur. Il a permis une réduction spectaculaire de l'erreur top-5 sur ImageNet (de 26% à 15%), introduisant des concepts tels que l'utilisation de ReLU, l'entraînement sur GPU et la normalisation locale. Ses contributions ont inspiré des architectures modernes plus complexes, comme VGG et ResNet.

Le tableau 5.2 résume l'architecture du réseau utilisé principalement pour la reconnaissance d'images. Il présente les différentes couches du réseau, leurs types, ainsi que leurs caractéristiques principales.

*Tableau 5.2 - Résumé des caractéristiques des couches du réseau AlexNet : architecture, dimensions et fonctions d'activation.*

| Couche | Type | Cartes | Taille | Noyau | Pas | Padding | Activation |
|---|---|---|---|---|---|---|---|
| Entrée | Image | 3 | 224x224 | - | - | - | - |
| Conv1 | Convolution | 96 | 55x55 | 11x11 | 4 | Valid | ReLU |
| P1 | Max pooling | 96 | 27x27 | 3x3 | 2 | Valid | - |
| Conv2 | Convolution | 256 | 27x27 | 5x5 | 1 | Same | ReLU |
| P2 | Max pooling | 256 | 13x13 | 3x3 | 2 | Valid | - |
| Conv3 | Convolution | 384 | 13x13 | 3x3 | 1 | Same | ReLU |
| Conv4 | Convolution | 384 | 13x13 | 3x3 | 1 | Same | ReLU |
| Conv5 | Convolution | 256 | 13x13 | 3x3 | 1 | Same | ReLU |
| P3 | Max pooling | 256 | 6x6 | 3x3 | 2 | Valid | - |
| FC6 | Dense | 4096 | - | - | - | - | ReLU |
| FC7 | Dense | 4096 | - | - | - | - | ReLU |
| Sortie | Dense | 1000 | - | - | - | - | Softmax |

> **Pour aller plus loin.** L'article « ImageNet Classification with Deep Convolutional Neural Networks » d'Alex Krizhevsky, Ilya Sutskever et Geoffrey Hinton, publié en 2012, a introduit le réseau AlexNet qui a été conçu pour la classification d'images dans le cadre du défi ImageNet Large Scale Visual Recognition Challenge (ILSVRC). Cet article démontre l'efficacité des CNN entraînés sur des GPU pour la reconnaissance d'images, en obtenant des résultats remarquables sur un jeu de données de grande échelle.

> **Exemple 5.9** — Le modèle développé dans cet exemple est un CNN inspiré de l'architecture d'AlexNet. Il s'agit d'un modèle séquentiel structuré autour d'une succession de couches convolutionnelles, de normalisation locale, de sous-échantillonnage, et de couches entièrement connectées (voir l'extrait de code 5.11).

```python
# Extrait de code 5.11 - Implémentation de l'architecture AlexNet avec LRN.
def create_alexnet_with_lrn(input_shape=(227, 227, 3), num_classes=1000):
    model = Sequential(name="alexnet_with_lrn")

    # ---- Bloc 1 : Convolution + ReLU + LRN + MaxPooling
    model.add(Conv2D(filters=96, kernel_size=(11, 11), strides=4,
                      activation='relu', input_shape=input_shape))
    model.add(Lambda(lrn))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=2))

    # ---- Bloc 2 : Convolution + ReLU + LRN + MaxPooling
    model.add(Conv2D(filters=256, kernel_size=(5, 5),
                      padding='same', activation='relu'))
    model.add(Lambda(lrn))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=2))

    # ---- Blocs 3, 4 et 5 : Convolutions profondes
    model.add(Conv2D(filters=384, kernel_size=(3, 3),
                      padding='same', activation='relu'))
    model.add(Conv2D(filters=384, kernel_size=(3, 3),
                      padding='same', activation='relu'))
    model.add(Conv2D(filters=256, kernel_size=(3, 3),
                      padding='same', activation='relu'))
    model.add(MaxPooling2D(pool_size=(3, 3), strides=2))

    # ---- Couches fully connected (FC)
    model.add(Flatten())
    model.add(Dense(4096, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(4096, activation='relu'))
    model.add(Dropout(0.5))

    # ---- Couche de sortie
    model.add(Dense(num_classes, activation='softmax'))
    return model

# Instancier le modèle AlexNet avec normalisation locale
alexnet_lrn_model = create_alexnet_with_lrn(input_shape=(227, 227, 3), num_classes=1000)
# Afficher le résumé de l'architecture
alexnet_lrn_model.summary()
```

La méthode `alexnet_lrn_model.summary()` permet d'afficher une vue d'ensemble de l'architecture du modèle AlexNet. Cette commande produit un tableau listant, dans l'ordre de leur connexion, toutes les couches du réseau, y compris les couches convolutives, les fonctions d'activation, les éventuelles normalisations, les couches de regroupement (Pooling), les couches entièrement connectées (Dense), ainsi que la couche de sortie. Pour chaque couche, le résumé fournit le type, le nom, la forme de sortie (output shape) et le nombre total de paramètres à apprendre.

Le modèle AlexNet est de grande taille, avec environ 60 millions de paramètres. Il est particulièrement adapté à des tâches complexes d'apprentissage automatique, telles que la classification d'images issues de jeux de données massifs. Rappelons qu'AlexNet a été initialement développé et entraîné sur ImageNet, un jeu de données de référence en vision par ordinateur, comprenant plus de 1,2 million d'images annotées réparties en 1000 classes dans le cadre du défi ILSVRC 2012 (ImageNet Large Scale Visual Recognition Challenge).

À l'inverse, LeNet-5 est un modèle relativement très léger, conçu pour des tâches plus simples. Il comporte un nombre bien plus restreint de paramètres, de l'ordre de 61 700, ce qui le rend approprié pour des applications à faible complexité, comme la reconnaissance de chiffres manuscrits (par exemple, le jeu de données MNIST).

```
Model: "alexnet_with_lrn"

Layer (type)                     Output Shape              Param #
conv2d (Conv2D)                  (None, 55, 55, 96)         34,944
lambda (Lambda)                  (None, 55, 55, 96)         0
max_pooling2d (MaxPooling2D)     (None, 27, 27, 96)         0
conv2d_1 (Conv2D)                (None, 27, 27, 256)        614,656
lambda_1 (Lambda)                (None, 27, 27, 256)        0
max_pooling2d_1 (MaxPooling2D)   (None, 13, 13, 256)        0
conv2d_2 (Conv2D)                (None, 13, 13, 384)        885,120
conv2d_3 (Conv2D)                (None, 13, 13, 384)        1,327,488
conv2d_4 (Conv2D)                (None, 13, 13, 256)        884,992
max_pooling2d_2 (MaxPooling2D)   (None, 6, 6, 256)          0
flatten (Flatten)                (None, 9216)               0
dense (Dense)                    (None, 4096)               37,752,832
dropout (Dropout)                (None, 4096)               0
dense_1 (Dense)                  (None, 4096)                16,781,312
dropout_1 (Dropout)              (None, 4096)               0
dense_2 (Dense)                  (None, 1000)               4,097,000

Total params: 62,378,344 (237.95 MB)
Trainable params: 62,378,344 (237.95 MB)
Non-trainable params: 0 (0.00 B)
```

### 5.5.3 ResNet

Le réseau de neurones résiduel ou ResNet (abréviation de Residual Network) est une architecture neuronale qui se caractérise par des connexions résiduelles (connexion shortcut). Cette architecture a été proposée par Kaiming He et al. en 2015 et a permis de résoudre des problèmes critiques liés à l'entraînement des réseaux profonds, en particulier la dégradation des gradients.

L'architecture ResNet est composée de plusieurs couches regroupées en étapes ou blocs comprenant des couches convolutionnelles, des blocs résiduels et des couches de pooling. Il existe plusieurs versions de ResNet qui varient principalement en fonction de la profondeur (nombre total de couches), la structure des blocs et le nombre de filtres (figure 5.21). Le chiffre indiqué dans ResNet-xx (par exemple, ResNet-18, ResNet-34, ResNet-50, etc.) représente le nombre total de couches dans le réseau. Ces couches incluent uniquement les couches convolutionnelles et les couches entièrement connectées. En l'occurrence, ResNet-18 comprend 18 couches, ResNet-34 comprend 34 couches et ResNet-50 comprend 50 couches.

*Figure 5.21 - Architecture du ResNet-34 : enchaînement structuré de blocs identitaires répartis sur cinq étapes principales, pour un total de 34 couches, incluant la première couche de convolution ainsi que la couche de sortie entièrement connectée. (figure non reproduite)*

34 couches = 1 (Convolution) + 3x2 (Conv2_x) + 4x2 (Conv3_x) + 6x2 (Conv4_x) + 3x2 (Conv5_x) + 1 (sortie).

> **Pour aller plus loin.** L'article intitulé « Deep Residual Learning for Image Recognition », publié en 2015 par Kaiming He, Xiangyu Zhang, Shaoqing Ren, et Jian Sun, a introduit l'architecture révolutionnaire ResNet. Cet article propose des architectures profondes de 18, 34, 50, 101 et 152 couches, testées principalement sur le jeu de données ImageNet. Il constitue une contribution fondamentale à l'histoire des réseaux de neurones profonds en résolvant des problèmes critiques tels que la dégradation des gradients. Aujourd'hui, ResNet reste l'une des architectures les plus influentes et largement utilisées dans divers domaines de la vision par ordinateur.

**1. Connexion résiduelle**

Une connexion résiduelle est une connexion directe qui permet de contourner une ou plusieurs couches d'un réseau et de connecter directement l'entrée d'un bloc à sa sortie (voir la figure 5.22 (b)).

Le rôle des connexions résiduelles est de faciliter la propagation de l'information et des gradients à travers les couches profondes, améliorant ainsi le processus d'apprentissage. Ces connexions permettent de contourner directement certaines couches en ajoutant l'entrée initiale à la sortie de celles-ci, ce qui atténue le problème de la dégradation des gradients. Cette approche est bénéfique pour surmonter les difficultés rencontrées dans les réseaux très profonds, où l'apprentissage peut devenir inefficace en raison de gradients évanescents.

Formellement, une connexion résiduelle est définie par l'équation :

```
y = F(x, W) + x
```

Dans cette équation :
- x est l'entrée du bloc composée des données provenant de la couche précédente.
- F(x, W) est une transformation des données par une ou plusieurs couches convolutives, suivies de normalisation (Batch Normalization) et d'une activation (comme ReLU).
- W correspond aux poids associés aux couches convolutionnelles.
- y est la sortie du bloc résiduel.

Le chemin direct (skip connection ou shortcut) est ajouté à la transformation F(x, W), permettant à l'information d'origine x de se propager sans altération si les couches intermédiaires n'apportent pas d'amélioration significative à la représentation.

*Figure 5.22 - Réseau de neurones à propagation avant (a) sans connexion résiduelle et (b) avec connexion résiduelle. (figure non reproduite)*

**2. Blocs résiduels**

ResNet repose sur une architecture modulaire composée de blocs résiduels, qui intègre à la fois des connexions résiduelles et des transformations, généralement réalisées à l'aide de convolutions.

Les blocs résiduels sont l'élément central de l'architecture des réseaux résiduels. Ils ont pour objectif de faciliter l'apprentissage dans les réseaux très profonds, d'éviter la dégradation des gradients et d'améliorer la propagation de l'information dans les réseaux profonds.

Il existe plusieurs variantes de blocs résiduels. Les plus connues et les plus largement utilisées dans la littérature sont le bloc résiduel simple et le bloc goulot d'étranglement, qui ont été introduits respectivement dans les versions peu profondes (comme ResNet-18 et ResNet-34) et profondes (comme ResNet-50, ResNet-101) du réseau ResNet.

Le bloc résiduel simple (standard residual block) contient deux couches convolutionnelles 3x3 avec des connexions résiduelles (voir la figure 5.23 (a)). L'entrée du bloc est directement ajoutée à sa sortie via une connexion résiduelle. Il n'y a pas de changement de dimension dans l'entrée et la sortie du bloc, donc elles ont la même profondeur et la même taille spatiale.

Le bloc goulot d'étranglement ou simplement bloc goulot (bottleneck) est une variante avancée du bloc résiduel. Il est conçu pour réduire le coût de calcul tout en permettant une grande profondeur. Chaque bloc contient trois couches convolutionnelles successives, comme illustré à la figure 5.23 (b). La première couche 1x1 agit comme une étape de compression. Concrètement, une convolution 1x1 avec 64 filtres est utilisée pour réduire les 256 canaux d'entrée à 64 canaux, avant d'appliquer une convolution 3x3. Enfin, une autre convolution 1x1 avec 256 filtres restaure la dimension initiale. Cette compression intermédiaire permet de diminuer significativement le coût de calcul des opérations, car les convolutions les plus coûteuses sont effectuées dans un espace de plus faible dimension.

*Figure 5.23 - Comparaison entre un bloc résiduel simple et un bloc résiduel à goulot d'étranglement. (figure non reproduite)*

Les blocs résiduels ont évolué avec plusieurs variantes adaptées à des applications spécifiques, à des gains en efficacité computationnelle ou à des besoins de performances accrues. Par exemple, les blocs pre-activation améliorent la propagation du gradient dans les réseaux très profonds, tandis que les blocs ResNeXt exploitent la notion de cardinalité pour améliorer les performances sans augmenter significativement la complexité. Enfin, les blocs Squeeze-and-Excitation intègrent un mécanisme d'attention par canal afin d'améliorer la représentation contextuelle.

Ces évolutions des blocs résiduels témoignent de la richesse et de la flexibilité de l'architecture ResNet, qui continue d'influencer de nombreux travaux en vision par ordinateur et en apprentissage profond.

**3. Architecture du ResNet-50**

Le modèle ResNet-50 est structuré en cinq étapes principales, chacune comprenant un bloc de convolution suivi de plusieurs blocs identitaires (voir la figure 5.24). Chaque bloc, qu'il soit convolutionnel ou identitaire, contient trois couches convolutionnelles.

*Figure 5.24 - Architecture du ResNet-50 : structure en cinq étapes successives intégrant des blocs convolutionnels suivis de blocs identitaires résiduels. (figure non reproduite)*

La couche d'entrée est formée de l'image à laquelle est appliquée une convolution, une normalisation par lot, une activation et un pooling. L'entrée est de taille 224x224x3, typiquement une image RGB. Une convolution initiale est appliquée avec un noyau de taille 7x7, un pas de 2 et 64 filtres, produisant une sortie de taille 112x112x64. Après cette convolution, une étape de normalisation par lot et une activation ReLU sont appliquées, ce qui facilite l'entraînement du réseau en améliorant la stabilité et la vitesse de convergence de la fonction de perte. Ensuite, une opération de max pooling avec un noyau de taille 3x3 et un pas de 2 est effectuée, réduisant encore la taille de sortie à 56x56x64.

L'étape 1, également appelée Conv2_x, est composée de trois blocs résiduels. Chacun contient trois couches convolutionnelles principales (voir la figure 5.25).

*Figure 5.25 - Structure d'un bloc résiduel bottleneck typique de l'étape Conv2_x dans ResNet-50, mettant en évidence l'enchaînement des trois couches convolutionnelles principales : une convolution 1x1 pour la réduction de dimension, suivie d'une convolution 3x3 pour l'extraction des caractéristiques spatiales, et enfin une convolution 1x1 pour la restauration de la profondeur. (figure non reproduite)*

La première est une convolution 1x1 utilisée pour réduire la dimensionnalité et le nombre de canaux, ce qui permet de diminuer le coût de calcul. La seconde est une convolution 3x3, destinée à capturer les caractéristiques spatiales tout en préservant les relations locales au sein des données. Enfin, une dernière convolution 1x1 est appliquée afin d'augmenter la dimensionnalité et de restaurer la profondeur initiale des cartes de caractéristiques.

Ces transformations sont accompagnées de normalisation par lot (BN) et d'activation ReLU pour améliorer la convergence et la stabilité de l'entraînement. La sortie du bloc a une taille de 56x56x256, ce qui reflète l'intégration des caractéristiques extraites tout en maintenant les dimensions spatiales.

Le bloc identitaire est utilisé lorsque les dimensions de l'entrée et de la sortie sont strictement identiques. Dans ce cas, aucune projection n'est nécessaire dans le chemin de raccourci (shortcut), et l'entrée peut être ajoutée directement à la sortie du bloc convolutionnel, sans ajustement par convolution 1x1 (voir la figure 5.26).

Le chemin principal passe par trois convolutions successives. Tout d'abord, une convolution 1x1 est appliquée pour réduire la dimensionnalité (compression), suivie d'une normalisation par lots et d'une activation ReLU. Ensuite, une convolution 3x3 permet d'apprendre les caractéristiques spatiales, suivie également d'une BatchNorm et d'une ReLU. Enfin, une convolution 1x1 rétablit les dimensions initiales (expansion), suivie d'une normalisation par lots, sans activation ReLU à cette étape. En parallèle, le chemin shortcut transmet directement les caractéristiques d'entrée du bloc à la sortie, sans aucune modification, puisque les dimensions correspondent. Les sorties du chemin principal et du chemin shortcut sont ensuite additionnées, et une activation ReLU est appliquée à cette somme pour produire la sortie finale.

*Figure 5.26 - Structure du bloc identité à l'étape conv2_x du réseau ResNet-50 : agencement des couches convolutionnelles, normalisation et connexions résiduelles sans projection. La connexion résiduelle « le shortcut » utilise l'identité (l'entrée est ajoutée directement à la sortie). (figure non reproduite)*

Les blocs Conv3_x, Conv4_x, et Conv5_x suivent la même structure logique que Conv2_x, avec des variations dans le nombre de blocs et les dimensions des convolutions. Chaque étape commence par un bloc de convolution avec un chemin shortcut, suivi de blocs identité. Les convolutions 1x1, 3x3, et 1x1 sont utilisées de manière cohérente pour réduire, extraire, puis restaurer la dimensionnalité. Les connexions shortcut permettent de transmettre efficacement les informations à travers les couches tout en maintenant la stabilité du flux de gradients. Ces étapes permettent d'approfondir le réseau tout en conservant un coût computationnel raisonnable.

Le tableau 5.3 résume les couches et caractéristiques du ResNet-50 telle qu'elle a été introduite dans l'article fondateur de He et al. (2016). Des variantes du ResNet-50 standard ont été développées dans la littérature à partir de son architecture de base, afin de répondre à des contraintes spécifiques, telles que la légèreté du modèle, la précision contextuelle ou la robustesse aux petits jeux de données.

*Tableau 5.3 - Résumé des caractéristiques des couches du réseau ResNet-50.*

| Couche | Type | Cartes | Taille | Noyau | Pas | Padding | Activation |
|---|---|---|---|---|---|---|---|
| Entrée | Image | 3 | 224x224 | - | - | - | - |
| Conv1 | Convolution | 64 | 112x112 | 7x7 | 2 | Same | ReLU |
| P1 | Max pooling | 64 | 56x56 | 3x3 | 2 | Same | - |
| Conv2_x | Residual Block (3) | 256 | 56x56 | 1x1, 3x3 | 1 | Same | ReLU |
| Conv3_x | Residual Block (4) | 512 | 28x28 | 1x1, 3x3 | 2 | Same | ReLU |
| Conv4_x | Residual Block (6) | 1024 | 14x14 | 1x1, 3x3 | 2 | Same | ReLU |
| Conv5_x | Residual Block (3) | 2048 | 7x7 | 1x1, 3x3 | 2 | Same | ReLU |
| Pool | Global Avg Pooling | 2048 | 1x1 | - | - | - | - |
| Sortie | Dense | 1000 | - | - | - | - | Softmax |

> **Exemple 5.10** — Dans cet exemple, nous créons un réseau résiduel de base, ResNet-34. Le bloc résiduel est défini dans la fonction `residual_block` dans l'extrait de code 5.12.
>
> La fonction `residual_block` implémente un bloc résiduel typique tel qu'utilisé dans les architectures de type ResNet. Elle prend en entrée un tenseur x, applique deux couches convolutionnelles successives avec des filtres de taille 3x3, chacune suivie d'une normalisation de lot (BatchNormalization) et d'une fonction d'activation ReLU, à l'exception de la deuxième couche qui omet l'activation. Le tenseur original shortcut est conservé pour réaliser la connexion résiduelle.
>
> Si la taille spatiale de l'entrée diffère de celle de la sortie (stride != 1) ou si le nombre de canaux change (shortcut.shape[-1] != filters), une projection du chemin de raccourci est effectuée via une convolution 1x1, suivie d'une normalisation, afin d'assurer la compatibilité dimensionnelle avant l'addition.
>
> L'activation finale ReLU est appliquée après la somme des deux chemins : le chemin principal x, obtenu après deux convolutions successives, et le chemin résiduel shortcut, qui contient soit l'entrée initiale inchangée (si les dimensions correspondent), soit une version projetée par convolution 1x1 (si un ajustement est nécessaire).
>
> Ce mécanisme permet au réseau d'apprendre plus facilement des fonctions résiduelles, en facilitant la rétropropagation du gradient dans les architectures profondes.

**[Passage OCR illisible]** — L'extrait de code 5.12 (implémentation de la fonction `residual_block`, avec sauvegarde de l'entrée dans `shortcut`, ajustement du chemin de raccourci par convolution 1x1 + BatchNormalization si les dimensions diffèrent, deux convolutions 3x3 avec BatchNormalization et ReLU, addition résiduelle finale suivie d'une activation ReLU) correspond à une page du document source scannée à l'envers (texte pivoté à 180°). L'OCR n'a pas su la restituer correctement (caractères et ordre de lecture inversés de façon non triviale) ; son contenu n'a pas pu être récupéré de façon fiable sans risquer d'inventer du code. Le principe de la fonction est néanmoins décrit fidèlement dans le paragraphe ci-dessus, et son usage apparaît dans l'extrait de code 5.13 qui suit (fonction `basic_block`).

```python
# Extrait de code 5.13 - Implémentation de l'architecture ResNet-34.
def ResNet34(input_shape=(224, 224, 3), num_classes=1000):
    inputs = Input(shape=input_shape)

    # ---- Couche d'entrée
    # Convolution 7x7 avec 64 filtres, stride de 2, et padding 'same' pour maintenir la taille
    x = Conv2D(64, kernel_size=7, strides=2, padding='same')(inputs)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    x = tf.keras.layers.MaxPooling2D(pool_size=3, strides=2, padding='same')(x)

    # ---- Étape Conv2_x : 3 blocs avec 64 filtres
    x = basic_block(x, 64, strides=1)
    x = basic_block(x, 64)
    x = basic_block(x, 64)

    # ---- Étape Conv3_x : 4 blocs avec 128 filtres
    x = basic_block(x, 128, strides=2)
    x = basic_block(x, 128)
    x = basic_block(x, 128)
    x = basic_block(x, 128)

    # ---- Étape Conv4_x : 6 blocs avec 256 filtres
    x = basic_block(x, 256, strides=2)
    x = basic_block(x, 256)
    x = basic_block(x, 256)
    x = basic_block(x, 256)
    x = basic_block(x, 256)
    x = basic_block(x, 256)

    # ---- Étape Conv5_x : 3 blocs avec 512 filtres
    x = basic_block(x, 512, strides=2)
    x = basic_block(x, 512)
    x = basic_block(x, 512)

    # ---- Couche de sortie
    x = layers.GlobalAveragePooling2D()(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)

    # ---- Construction du modèle final
    model = Model(inputs, outputs)
    return model
```

Le modèle ResNet-34 est instancié en appelant la fonction `ResNet34()` avec ses paramètres par défaut, ce qui signifie une taille d'entrée de 224x224x3 (images RGB) et une classification sur 1000 classes, comme dans le cadre d'ImageNet (voir l'extrait de code 5.14).

```python
# Extrait de code 5.14 - Implémentation de l'architecture ResNet-34.
# Instancier le modèle ResNet-34 avec les paramètres par défaut
resnet34 = ResNet34()
# Afficher le résumé de l'architecture
resnet34.summary()
```

Le résumé de ResNet34 montre une architecture organisée en plusieurs étapes, avec une hiérarchie de couches convolutives, de normalisation, d'activations et de pooling.

```
Model: "functional_1"

Layer (type)                Output Shape          Param #   Connected to
input_layer (InputLayer)    (None, 224, 224, 3)   0         -
conv2d (Conv2D)             (None, 112, 112, 64)  9,472     input_layer[0][0]
batch_normalization (BatchNormalization) (None, 112, 112, 64) 256   conv2d[0][0]
re_lu (ReLU)                (None, 112, 112, 64)  0         batch_normalization[0][0]
...
conv2d_1 (Conv2D)           (None, 56, 56, 64)    36,928    max_pooling2d[0][0]
...
conv2d_35 (Conv2D)          (None, 7, 7, 512)     2,048     ...
add_15 (Add)                (None, 7, 7, 512)     0         batch_normalization..., re_lu_30[0][0]
re_lu_32 (ReLU)             (None, 7, 7, 512)     0         add_15[0][0]
global_average_pooling2d (GlobalAveragePooling2D) (None, 512) 0  re_lu_32[0][0]
dense (Dense)               (None, 1000)          513,000   global_average_pooling2d[0][0]

Total params: 21,823,208 (83.25 MB)
Trainable params: 21,806,184 (83.18 MB)
Non-trainable params: 17,024 (66.50 KB)
```

*(Résumé de couches intermédiaires abrégé par « ... » dans le tableau ci-dessus, conformément à la source où seules certaines lignes du tableau complet restent lisibles après OCR.)*

Le résumé de l'architecture comprend les mêmes caractéristiques que précédemment auxquelles est ajoutée la colonne « Connected to » qui indique les couches précédentes connectées à cette couche. Par exemple, la première couche de normalisation, nommée `batch_normalization`, est connectée à la sortie de `conv2d_1`. Cette caractéristique est utile pour visualiser la séquence des opérations, en particulier dans les architectures complexes avec des connexions résiduelles. Elle permet également d'identifier facilement les interactions entre les couches et de vérifier la cohérence des dimensions dans tout le réseau.

LeNet-5, AlexNet et ResNet-34 représentent trois étapes marquantes dans l'évolution des réseaux de neurones convolutifs, chacune caractérisée par une complexité croissante en termes de paramètres et de capacité d'apprentissage.

LeNet-5 compte environ 61 706 paramètres, ce qui en fait un réseau léger et adapté aux architectures limitées en calcul. En revanche, AlexNet, introduit pour la compétition ImageNet, comporte environ 60 millions de paramètres, témoignant d'une augmentation drastique de la profondeur et de la complexité pour traiter des images de haute résolution et des tâches plus exigeantes. Enfin, ResNet-34, avec ses 21,3 millions de paramètres, offre un équilibre entre profondeur et efficacité, grâce à l'introduction des connexions résiduelles qui permettent un apprentissage efficace dans des réseaux plus profonds tout en limitant la redondance.

Ce contraste illustre l'évolution des architectures CNN, passant de modèles compacts et simples à des réseaux sophistiqués conçus pour des tâches complexes et des ensembles de données volumineux.

> **Encadré.** Dans son module `keras.applications`, Keras ne contient pas de modèle préentraîné pour ResNet34 par défaut. Cependant, le module inclut d'autres variantes telles que ResNet50, ResNet101 et ResNet152, ainsi que leurs versions optimisées : ResNet50V2, ResNet101V2 et ResNet152V2. Ces modèles préentraînés sont largement utilisés pour leurs performances élevées sur des tâches complexes, grâce à leur profondeur croissante et aux améliorations structurelles intégrées dans les versions V2.

Si vous désirez utiliser le modèle ResNet-50 préentraîné sur ImageNet via le module intégré `keras.applications`, vous pouvez directement le télécharger pour des tâches comme la classification ou comme base pour d'autres modèles (voir l'extrait de code 5.15).

```python
# Extrait de code 5.15 - Chargement du modèle ResNet-50 pré-entraîné sur ImageNet.
from tensorflow.keras.applications import ResNet50

# Charger ResNet-50 pré-entraîné sur ImageNet
model_resnet50 = ResNet50(weights='imagenet',       # Poids pré-entraînés
                           input_shape=(224, 224, 3), # Taille d'entrée
                           include_top=True)          # Couche dense

# Afficher le résumé de l'architecture
model_resnet50.summary()
```

En conclusion, ce chapitre a mis en lumière les fondements de ces réseaux, depuis leur origine jusqu'à leur structure typique, en passant par leurs composants essentiels et leurs mécanismes d'entraînement. Nous avons également exploré l'évolution des architectures CNN, de leurs premières formes rudimentaires aux modèles modernes et hybrides qui repoussent constamment les limites de la performance.

L'étude des couches fondamentales, à savoir, la couche de convolution, de pooling, et intégralement connectée, a révélé comment les CNN apprennent des représentations hiérarchiques et complexes des données, tout en préservant leur efficacité et leur robustesse. L'entraînement de ces réseaux, bien que complexe, est désormais facilité par des techniques avancées et des ressources matérielles puissantes, rendant possible leur application à des jeux de données de plus en plus larges.

Les architectures étudiées dans ce chapitre, telles que LeNet-5, AlexNet et ResNet-50, ont jeté les bases des avancées majeures en apprentissage profond appliqué à la vision par ordinateur. Elles illustrent l'évolution progressive en termes de profondeur, de capacité d'apprentissage et de stabilité des réseaux. Par ailleurs, d'autres architectures plus récentes, comme DenseNet, Xception ou EfficientNet, reflètent une sophistication croissante dans la conception des modèles. Enfin, l'émergence de concepts hybrides tels que les Vision Transformers (ViT) ou ConvNeXt témoigne d'une convergence entre les approches convolutives classiques et les mécanismes d'attention issus d'autres domaines de l'apprentissage profond.

En résumé, les CNN continuent d'évoluer, de s'adapter à de nouveaux défis et de s'imposer comme des outils incontournables dans de nombreux domaines, de la reconnaissance faciale à la médecine en passant par la conduite autonome. Ce chapitre a fourni une base solide pour comprendre leur fonctionnement, leur impact, et leur potentiel futur. L'évolution rapide des CNN laisse entrevoir des perspectives prometteuses pour l'intelligence artificielle et ses applications dans le monde réel.

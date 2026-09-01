---
id: livre-ap-ch01
type: chapter
scope: project
status: active
created: 2026-08-31
updated: 2026-08-31
owner: user
book: "Apprentissage profond — Théorie et applications"
book_slug: apprentissage-profond
author: "Neila Mezghani"
chapter: 1
source: ["chapters/02-ap2_260710_114025.md#L61-L2352"]
ocr_note: "Source scannée OCR (tesseract, qualité variable) ; nettoyage semi-automatisé déterministe : suppression des numéros de page isolés et des en-têtes de page répétés, structuration des titres de section ; aucun contenu inventé, aucune réécriture de fond. Quelques équations/figures en mode texte restent imparfaitement rendues par l'OCR (fidélité conservée telle quelle)."
language: fr
---

# Chapitre 1 — Fondamentaux de l'apprentissage machine (AM)

L'apprentissage machine (AM), ou apprentissage automatique, est un champ d’études
de l'intelligence artificielle qui vise à doter les machines de la capacité d’« apprendre »
à partir de données. Une définition plus technique a été proposée par Tom Mitchell en
1997 : « Étant donné une tâche T et une mesure de performance P on dit qu'un programme
informatique apprend à partir d’une expérience E si les résultats obtenus sur T, mesurés
par P s’améliorent avec l'expérience E » [ |. Autrement dit, selon cette définition, un
algorithme apprend lorsqu'il devient meilleur dans une tâche donnée en s’entrainant sur
des exemples, un peu comme un humain qui progresse à force de pratiquer.
Pour illustrer cette définition de manière simple et concrète, considérons l’exemple d’un
filtre antispam. Un tel système analyse un grand nombre de courriels préalablement
étiquetés comme légitimes ou indésirables et, à partir de ces exemples, apprend à identifier
les caractéristiques discriminantes des messages non sollicités. Dans ce contexte, la
tâche T consiste à déterminer si un courriel entrant est frauduleux ou non, l'expérience E
correspond à l’ensemble des courriels d'entraînement annotés, et la mesure de performance
P peut être définie comme la proportion de messages correctement classés dans les
catégories « spam » ou « non spam ». A mesure que l'algorithme est exposé à un volume
plus important de données pertinentes et représentatives, sa capacité de généralisation et
sa performance sur cette tâche tendent à s'améliorer.

L'apprentissage machine s'appuie sur une combinaison de concepts issus des statistiques,
de l'optimisation et de l’algorithmique pour construire des modèles capables de généraliser
au-delà des exemples d'entraînement, c’est-à-dire qu'ils sont capables de bien fonctionner
sur des données nouvelles. Ce domaine connaît une évolution rapide grâce à la disponibilité
croissante de grandes quantités de données et à l’amélioration des capacités de calcul.

Ce chapitre explore en détail les fondements théoriques et pratiques de l'apprentissage
machine, en mettant en lumière les étapes clés du développement d'un modèle, depuis la
compréhension des données jusqu'à l’évaluation finale de ses performances. La première
section est consacrée à la terminologie spécifique liée à la notion de « données », ainsi
qu'à la nature et à la structure de ces dernières. Une compréhension approfondie de ces
concepts est essentielle, puisque les données sont l'élément fondamental d’un système
d'intelligence artificielle.

Le développement d’un modèle d'apprentissage machine est ensuite présenté comme un
processus en deux phases : la phase d'entraînement, où le modèle apprend à partir
de données d'entraînement et la phase d’inférence, où il est utilisé pour faire des
prédictions ou prendre des décisions sur de nouvelles données. Ces deux phases diffèrent
par leurs objectifs, par leurs contraintes computationnelles et aussi par leurs enjeux
méthodologiques.
Ce chapitre introduit également les principaux paradigmes de l'apprentissage machine,
à savoir, l'apprentissage supervisé, non supervisé ou par renforcement, ainsi que
les approches hybrides ou complémentaires tels que l'apprentissage semi-supervisé,
l'apprentissage auto-supervisé et l'apprentissage en ligne, qui combinent plusieurs des
paradigmes principaux pour répondre à des problèmes complexes.
Une distinction importante est réalisée entre les paramètres qui sont des valeurs ajustées
automatiquement durant l'entraînement et les hyperparamètres qui sont des valeurs

      éventuellement de méthodes. Par exemple, une instance de la classe « client » pourrait
      être définie par son nom, son identifiant et son historique d'achats.
—     Dans une approche mathématique ou vectorielle, une donnée est représentée par un
      point ou un vecteur dans un espace de dimension n, défini par ses coordonnées dans
      une base donnée. Par exemple, le vecteur (:1,12.....r,) dans l’espace R” représente
      une observation décrite par n caractéristiques, chacune correspondant à une dimension
      de l’espace.

Dans notre cas, nous adoptons la terminologie couramment utilisée en statistique et en
apprentissage machine, ce qui nous amène aux définitions suivantes :
—     Ensemble de données ou jeu de données (dataset) : Il s’agit d’une collection
      d’observations ou de mesures, organisée de manière à permettre une récupération, une
      analyse et une interprétation efficaces de l'information. Un ensemble de données peut
      intégrer des données issues de diverses sources et se présenter sous différents formats,
      tels que des tableaux numériques, des signaux, des images ou des vidéos.
—     Observation : Une observation correspond à une unité élémentaire d’information dans
      un jeu de données. Elle regroupe les valeurs mesurées pour l'ensemble des variables
      décrivant un individu ou un cas donné. Dans un format tabulaire, chaque observation
      est généralement représentée par une ligne.
— Individu : L'individu désigne l'entité sur laquelle les mesures ou observations sont
      réalisées. Il peut s’agir d'un objet concret, comme une personne, un capteur ou un
      animal, ou d’un objet abstrait, tel qu’une entreprise ou un événement.

>» Exemple      1.1 - Prenons un exemple simple issu du domaine               de la santé. Supposons
que    nous   disposions   d’un jeu   de   données   médicales   regroupant    diverses   informations
telles que des radiographies aux rayons X (images), des relevés de signes vitaux (signaux
physiologiques) ou encore des vidéos de procédures médicales.
Dans ce jeu de données, une observation correspond à un ensemble de mesures prises sur
un patient spécifique à un instant donné. Par exemple, une observation pourrait inclure
sa température corporelle, sa pression artérielle et son taux de glycémie à un moment
précis. Les individus désignent les patients eux-mêmes, chacun étant une entité distincte
sur laquelle plusieurs observations peuvent être effectuées.
Si le jeu de données       contient des informations      sur 100 patients,     alors chaque      patient
représente un individu unique, tandis que les différentes mesures collectées au fil
du temps, comme les relevés quotidiens de ses constantes vitales ou les résultats
d'analyses successives, constituent de multiples observations associées à cet individu.
Cette distinction entre individus et observations est particulièrement pertinente dans les
études longitudinales, où l’on suit l’évolution de l’état de santé d’un même patient à travers
plusieurs moments dans le temps.

1.1.2         Nature des données
La nature des données fait référence à leur rôle et à leur type sur le plan statistique. Elle
permet de déterminer quelles méthodes d'analyse, de représentations graphiques ou de

   symétrique, car aucune des modalités ne porte intrinsèquement plus d'information que
   l’autre.
   À l'inverse, une variable binaire est dite asymétrique lorsqu'une de ses modalités
   correspond à un événement d'intérêt, souvent rare, tandis que l’autre représente une
   absence ou un état de référence. Dans ce cas, seule la modalité dite « positive » porte
   une information substantielle pour l'analyse. Des exemples typiques incluent la présence
   d'une maladie (1 = malade, 0 = sain), la détection d’une fraude (1 = fraude, 0 = absence
   de fraude) ou encore la réussite à un test (1 = succès, 0 = échec).
   La distinction entre variables binaires symétriques et asymétriques est déterminante
   dans le choix des méthodes statistiques ou d'apprentissage machine, en particulier
   lorsqu'il s'agit de mesurer la similarité entre observations. Dans le cas des variables
   binaires asymétriques, il est crucial d'utiliser des indices spécifiquement conçus pour
   refléter l'importance de la modalité positive. Parmi ceux-ci, l'indice de Jaccard constitue
   une référence largement utilisée.
   Contrairement aux mesures de similarité classiques, l'indice de Jaccard ne prend pas en
   compte les co-absences (0/6), c’est-à-dire les situations où deux observations présentent
   simultanément la valeur 0. Dans l'exemple médical, le fait que deux individus soient
   tous deux sains n’apporte que peu d’information lorsqu'on cherche à comparer des
   profils de maladie. En revanche, les co-présences (1/1), correspondant à deux individus
   atteints de la même pathologie, constituent une information essentielle et pertinente
   pour évaluer leur similarité. L'indice de Jaccard se concentre donc exclusivement sur
   ces co-présences, traduisant un partage effectif de la modalité d'intérêt. De ce fait, la
   prise en compte de l’asymétrie dans les variables binaires permet de limiter les biais
   d'interprétation et de sélectionner des mesures de similarité véritablement adaptées à
   la nature des données et aux objectifs de l'analyse.

2. Variables quantitatives ou numériques

Ces variables expriment des mesures ou des quantités et permettent d'effectuer des
opérations mathématiques telles que la somme, la moyenne ou l’écart-type. Les variables
quantitatives peuvent être divisées en deux sous-catégories :
Variables discrètes : Les variables discrètes prennent un nombre fini ou dénombrable
de valeurs, généralement entières. Elles résultent souvent d’un processus de comptage.
Par exemple, le nombre d'enfants, le nombre de pièces dans un logement ou le nombre de
visites constituent des variables discrètes.

Variables continues : Les variables continues peuvent prendre n'importe quelle valeur
réelle dans un intervalle donné. Elles proviennent généralement de mesures physiques,
biologiques ou autres phénomènes quantifiables dans divers domaines scientifiques. Par
exemple, la taille, la masse corporelle, la température ou le revenu mensuel sont des
variables continues.
En résumé, l'exploration de la nature des variables est essentielle pour orienter le choix
des méthodes d'analyse statistique et des techniques d'apprentissage machine appropriées.
Cette étape constitue un préalable fondamental pour garantir la validité des résultats
obtenus ainsi qu’une interprétation rigoureuse et pertinente des données.

car elle permet d’appliquer des algorithmes qui exploitent directement la structure des
données.

De la même manière, les colonnes de cette matrice peuvent être vues comme des vecteurs
représentant les variables mesurées. Chaque colonne regroupe toutes les valeurs prises
par la variable j pour l'ensemble des N individus. Elle peut être formalisée par le vecteur
suivant :
                                   x = (rir...)

Le «/ » dans cette formalisation désigne la transposée du vecteur colonne.

Ainsi, une colonne spécifique correspond à une variable, et son vecteur associé peut être
interprété comme une série de mesures sur cette variable à travers différents individus.

           En apprentissage machine, les termes individu et observation sont fréquemment
           utilisés de manière interchangeable.     Dans une matrice de données    X, chaque   ligne
           est généralement considérée à la fois comme une observation et comme un individu.
           Cependant, cette simplification ne reflète pas toujours fidèlement la structure réelle
           des données. En effet, un individu représente une entité unique au sein de l’ensemble
           de données, telle qu'un patient, un client ou un échantillon biologique, tandis qu'une
(1)        observation correspond à l’ensemble des mesures collectées pour cet individu. Dans
           de nombreux cas, un individu n'est associé qu'à une seule observation, ce qui justifie
           l’usage interchangeable de ces termes. Toutefois, dans certains contextes, comme pour
           les suivis médicaux, les données longitudinales ou les séries temporelles, un même
           individu peut être lié à plusieurs observations recueillies à différents moments. Cette
           distinction devient alors essentielle pour modéliser adéquatement la structure des
           données et éviter des interprétations erronées lors de l’analyse.

Dans le contexte de l'apprentissage supervisé (qui sera détaillé à la section 1.2.1), il est
courant de distinguer deux types de variables :
—   Les variables caractéristiques (ou explicatives), qui constituent les variables d'entrée,
    x!.x?,...,x8 1   utilisées pour expliquer ou prédire un phénomène.
— La variable cible (ou à prédire), notée y, qui représente la sortie attendue par le
    modèle. Par exemple, dans une tâche de classification, il s’agit de la classe à laquelle
    appartient un individu, tandis que dans une tâche de régression, il s’agit d’une valeur
    numérique continue à estimer.
Dans ce contexte, nous pouvons alors former la matrice augmentée               des données X,, qui
inclut la notation de variable cible y en dernière colonne :

                                         ni   ry          nf   |   1

                                         2    A           PF | ap
                              Xa =        :     7     :    .           .                        (1.1)

                                        ty7   th2         thK || yy
Dans d’autres types d’analyses, notamment non supervisées (comme le regroupement ou
la réduction de dimension), la distinction entre varaibles caractéristique et variable cible
n'existe pas. Dans ce cas, toutes les variables sont traitées de manière équivalente.

ou variables. Cependant, leur traitement nécessite souvent des méthodes hybrides capables
d'extraire et d'organiser efficacement les informations pertinentes.

> Exemple       1.2 - Le courriel suivant constitue un exemple représentatif des défis posés
par l'analyse des données non structurées. Son contenu met en évidence la diversité
des formats de données qu’un même document peut contenir et la complexité de leur
exploitation en l'absence d'outils spécialisés.
Le corps du message est principalement composé de données non structurées : il s’agit d’un
texte libre, dépourvu de balisage formel, ce qui empêche l'identification automatique de ses
différentes sections. En parallèle, le courriel inclut des éléments partiellement structurés,
tels que l'expéditeur, le destinataire, l’objet ou l’horodatage, qui sont reconnaissables grâce
à des conventions standardisées, sans toutefois respecter un schéma strict comparable
à celui des bases          de données         relationnelles.     Cette    coexistence           de texte libre et de
métadonnées structurées de manière souple correspond à un cas typique de données
semi-structurées.
Cet exemple met ainsi en évidence la distinction fondamentale entre les données fortement
structurées, organisées selon un format prédéfini, et les données non structurées, dont
l'exploitation nécessite le recours à des méthodes avancées, notamment le traitement
automatique du langage naturel, afin d'en extraire des informations pertinentes et
exploitables.

      De : alice.dupont@example.com
      À : jean.martin@example.com
      Objet : Réunion de projet

      Bonjour Jean,
      J'espère que tu        vas    bien.     Je   voulais   te   rappeler     que       la   réunion    pour
      la présentation        du livre:         Apprentissage       profond,        est    prévue      ce jeudi   à 10h.
      Bonne     journée,
      Alice

1.2     Paradigmes d’AM
L'apprentissage       machine englobe un ensemble                      de trois paradigmes principaux
l'apprentissage       supervisé, l’apprentissage non                   supervisé et l'apprentissage par
renforcement      (voir la figure     1.2).

Ces   paradigmes      se distinguent          par la maniére        dont     les     algorithmes         d’apprentissage
exploitent les données et par l'objectif visé, qu'il s’agisse de prédiction, de découverte de
structures ou d'optimisation d’un processus décisionnel.

L'apprentissage profond est une sous-catégorie de l'apprentissage machine qui utilise des
réseaux neuronaux profonds pour résoudre des problèmes complexes. Il peut être appliqué
dans les trois paradigmes principaux de l’apprentissage automatique : supervisé, non
supervisé et par renforcement. Ainsi, l’apprentissage profond agit comme une méthode
universelle qui peut étre appliquée dans les trois paradigmes.

## 1.2 Paradigmes d’AM

où x, représente les caractéristiques d’un individu : et y, correspond à la variable cible de
cet individu.
L'objectif principal de l'apprentissage supervisé est d'estimer une fonction

                                         FIX    —y

qui, à partir des données d'entrée X, prédit avec précision les sorties correspondantes y,
notamment pour des observations non présentes lors de l'entraînement.
Ainsi, en adéquation avec la notation de l'équation (1.1), en apprentissage supervisé, nous
cherchons à apprendre une fonction f reliant les observations X aux sorties y tel que :

                                          y = SX)

Sous une forme matricielle explicite, cette relation peut être écrite comme       suit :

                              yi           zy   AT 2   ee    atBK
                              ue           rh   a3     En    aE
                                                  a                 ;
                              YN          wh    ie     ome   “BR

La fonction f est généralement obtenue en minimisant une fonction de perte,

                                         Ly. f(X)).

qui mesure l'écart entre les sorties prédites f{X) et les valeurs réelles y .

Les fonctions de perte sont spécifiques à chaque modèle et seront développées à plusieurs
endroits tout au long de cet ouvrage aux moments opportuns.

1.2.2     Apprentissage non supervisé
Contrairement à l'apprentissage supervisé, l'apprentissage non supervisé (unsupervised
learning) est un paradigme qui se base sur des données non étiquetées, c’est-à-dire sans
sorties prédéfinies. Il regroupe un ensemble de techniques dont l'objectif est de mettre en
évidence la structure intrinsèque des données, en révélant des régularités sous-jacentes
telles que des similarités entre observations, des regroupements naturels, des relations
fréquentes entre variables, ou encore des représentations de plus faible dimension.

Formellement, soit un ensemble de données non étiquetées décrivant \ individu :

                                    D = {x}. x2....xN},

où chaque individu x, € RX est un vecteur dans un espace de A’-dimensions.
Contrairement à l'apprentissage supervisé, il n'existe aucune variable cible y qui permet
de mesurer une fonction de perte directement définie à partir d'une vérité de terrain.

      Nous cherchons donc des relations entre des groupes d’items indépendants.
  —   supp(X UY) > #,. Le support d'une règle est défini comme la proportion de
      transactions dans lesquelles les items de X U Y apparaissent simultanément. Il
      mesure donc la fréquence d'apparition de la règle dans l’ensemble des transactions.
      Le support doit être supérieur ou égal à un seuil minimal 9,, fixé par l'utilisateur, afin
      de ne conserver que les règles statistiquement significatives.
                               supp{X* UY)
  —   conf(X   =   Y)     =                       >   8.   La confiance     mesure    la probabilité   que   Y
                              7supp(X)
      apparaisse   dans       une   transaction       sachant   que   X   en fait déja partie.   Elle reflète
      la fiabilité de l'implication X > Y’. Seules les règles dont la confiance dépasse un
      seuil fixé 4. sont conservées.
Les seuils #, (pour le support) et 4. (pour la confiance) sont des hyperparamétres à
déterminer selon le contexte d'application, en fonction de l'équilibre recherché entre la
quantité et la qualité des règles extraites.

Les règles d'association, couramment utilisées pour l'extraction de relations fréquentes
entre variables dans de grands ensembles de données transactionnelles, sont largement
répandues en apprentissage non supervisé. En environnement Python, la bibliothèque
 mlxtend.frequent patterns propose des outils dédiés à la mise en œuvre de ces méthodes.
La fonction apriori() permet d'identifier les itemsets fréquents à partir d'un seuil de
support minimal défini par l'utilisateur, ce seuil représentant la proportion d’occurrences
d'un ensemble d'items dans l’ensemble des transactions. Cette étape constitue le cœur du
processus d'extraction, en filtrant les combinaisons d’items les plus représentatives.

À partir des itemsets fréquents ainsi obtenus, la fonction association rules() permet de
générer des règles d'association de la forme X = Y, en calculant différentes métriques
d'intérêt, telles que le support, la confiance ou encore le lift. Ces indicateurs permettent
d'évaluer à la fois la fréquence des règles et la force des relations mises en évidence,
facilitant ainsi leur interprétation et leur sélection en fonction des objectifs de l'analyse.

La réduction de la dimensionnalité

La réduction de dimensionnalité (dimensionality reduction) vise à projeter les données
dans un espace de dimension inférieure tout en préservant leurs propriétés essentielles,
telles que la variance ou la structure des relations entre les points.

Formellement, elle consiste à appliquer une transformation aux données x, pour les
représenter dans un espace de plus faible dimension tout en minimisant la perte
d'information. Cela peut être réalisé via une fonction de projection :

                                              FRE           oR’.

R* désigne l'espace vectoriel initial de dimension A’, tandis que R* représente l’espace
projeté de dimension réduite k, avec k < A. Cette condition implique que la projection vise
à fournir une représentation plus compacte des données, tout en conservant autant que
possible l'information pertinente.

La transformation f permet notamment de simplifier l'analyse, d'améliorer l'efficacité des


Le processus se prolonge dans le temps, avec un agent qui ajuste continuellement ses
choix en fonction des retours de l’environnement. Son objectif est d’apprendre une
stratégie optimale, appelée politique et notée 7, qui maximise l'espérance de la récompense
cumulative actualisée sur un horizon temporel donné :

                                                    E.   DE       :
                                                         t=0

Cette formulation reflète l'équilibre entre les gains immédiats             et futurs, pondérés     par
un facteur d’actualisation >              € (0,1), qui contrôle l'importance relative accordée      aux
récompenses à long terme.

                                                          Po)   Agent

                |       État            Récompense                             Action
                         St                 rt                                      a

                                                  Pet

                |                      Loe                                                  |
                                       Lg

                Lo                                                    a
                                             VU   Sir]                                          |

Figure 1.3 - A chaque étape temporelle {, un agent observe un état «,, choisit une action a+, puis
l’environnement retourne une récompense 7.) et un nouvel état s,.1, selon la dynamique de
transition P(s;.; | s+.a+). Ce processus se répète dans le but de maximiser la récompense
cumulative yi       y          Teri.

           L'article « Human-level control through deep reinforcement learning » de Volodymyr
           Mnih, Koray Kavukcuoglu, David Silver, Alex Graves, et al., publié dans la revue Nature
           en 2015 [ ], constitue une avancée majeure dans le domaine de l'apprentissage par
ES         renforcement profond. Il introduit le Deep Q-Network (DQN), une méthode qui combine
 []        réseaux de neurones convolutifs et Q-learmng pour apprendre directement à partir
ie         de pixels bruts. Le modèle est capable d'atteindre une performance équivalente ou
           supérieure à celle des humains sur plusieurs jeux Atari, démontrant ainsi la puissance
           de l'apprentissage par renforcement profond dans des environnements complexes. Cet
           article est considéré comme un pilier fondateur de l'apprentissage par renforcement
           moderne.

1.2.4     Paradigmes complémentaires ou hybrides
En complément des approches classiques de l'apprentissage supervisé, non supervisé
et par renforcement, plusieurs paradigmes hybrides où émergents ont été développés

  —   Les méthodes basées sur la régularisation de consistance (consistency-based
      methods) : Ces méthodes imposent que le modèle produise des prédictions stables
      lorsque les entrées sont soumises à de légères perturbations. L'hypothèse inductive
      sous-jacente est que des échantillons proches dans l’espace des caractéristiques
      devraient être classés de manière similaire. Ces méthodes cherchent donc à exploiter
      la structure locale des données non étiquetées pour renforcer la généralisation.

Apprentissage auto-supervisé

L'apprentissage      auto-supervisé     (selfsupervised      learning,    SSL)      est     un   paradigme
d'apprentissage automatique dans lequel les modèles apprennent des représentations
informatives des données en construisant automatiquement des signaux de supervision
à partir des données elles-mêmes, sans recourir à des annotations humaines explicites.
L'objectif principal est d'extraire des représentations générales, robustes et transférables,
destinées à être réutilisées dans des tâches en aval. Ces signaux de supervision prennent
généralement la forme de prédictions internes, telles que la prédiction d'une partie
manquante d’un signal, la reconstruction d’une entrée volontairement corrompue ou
encore l’anticipation des transformations appliquées aux données.

Ce paradigme a connu un essor majeur avec l'émergence des modèles fondationnels
(foundation models), en particulier dans des domaines comme la vision par ordinateur et
le traitement automatique du langage naturel. Parmi les modèles fondationnels, reposant
sur l’apprentissage auto-supervisé, figurent BERT (Bidirectional Encoder Representations
from Transformers), qui repose notamment sur des taches de masquage de mots, et
GPT (Generative Pre-trained Transformer), qui apprend à prédire la suite d’un texte à
partir du contexte précédent. Dans ces contextes, l'apprentissage auto-supervisé permet
d'exploiter efficacement de vastes ensembles de données non étiquetées pour préentrainer
des modèles de grande capacité, lesquels peuvent ensuite être adaptés à des tâches
spécifiques au moyen d'un affinage (fine-tuning) sur des jeux de données annotées, souvent
de taille limitée.

Aujourd'hui, l'apprentissage auto-supervisé est considéré comme une alternative
prometteuse et efficace à l'apprentissage supervisé classique, car il réduit significativement
la dépendance aux données étiquetées tout en capturant des représentations robustes,
riches en informations sémantiques et structurelles. Ces représentations facilitent une
meilleure généralisation, notamment dans des contextes où les données annotées sont
rares ou coûteuses à obtenir

            L'article « A Survey on Selfsupervised Learning : Algorithms, Applications, and
            Future Trends » de Jie Gui et al. [ ], publié en 2023, propose une revue complète
            des méthodes d'apprentissage auto-supervisé (SSL). Il présente une taxonomie des
            approches existantes, telles que l'apprentissage contrastif, génératif et hybride. L'article
=           explore également les applications du SSL dans des domaines tels que le traitement
            d'images, la vision par ordinateur et le traitement du langage naturel. En outre, il
            discute des tendances actuelles en recherche et des questions ouvertes, offrant ainsi
            une ressource précieuse pour les chercheurs et praticiens souhaitant approfondir leur
            compréhension de ce domaine.

correspondre       à   des   sorties   annotées         (apprentissage          supervisé),     à des         structures
intrinsèques des données (apprentissage non supervisé), ou à des cibles d'apprentissage
artificielles construites automatiquement à partir des données elles-mêmes (apprentissage
auto-supervisé).

             Les   termes    entraînement        et   apprentissage      sont    parfois    employés     de    manière
             interchangeable dans un usage informel. Toutefois, en IA, ils renvoient à des notions
             distinctes, tant par leur portée que par les processus qu'ils recouvrent.
             Lentrainement correspond à une phase spécifique et délimitée du développement
             d’un modèle d'apprentissage          automatique.      Il s’agit du processus      au cours duquel le
             modèle ajuste ses paramètres internes afin de minimiser une fonction de coût donnée,
             en s'appuyant sur un jeu de données d'entraînement fixe. Cette phase mobilise des
@            techniques d'optimisation, telles que la descente de gradient, et vise à améliorer la
             performance du modèle sur une tâche donnée.
             L'apprentissage, en revanche, constitue un                 concept      plus   large,   englobant      non
             seulement la phase d'entraînement, mais également la capacité du modèle à généraliser
             les connaissances acquises à de nouvelles données non observées. Dans certains
             contextes, tels que l'apprentissage en ligne ou les systèmes adaptatifs, l'apprentissage
             peut se poursuivre au-delà de la phase initiale d'entraînement, par des ajustements
             dynamiques continus fondés sur l’arrivée de nouvelles données.

Dans le cadre spécifique de l'apprentissage supervisé, la phase d'entraînement peut être
décomposée en plusieurs étapes successives, incluant la préparation et le prétraitement
des données, l'ingénierie des caractéristiques, la sélection du modèle, l'optimisation des
paramètres et la validation du modèle, telles qu’illustrées dans la figure 1.5.

                                   ®                       ®                     ©                   ©
                              Ingénierie deses          Sélection          Optimisation              jal
                             caractéristiqu             du modéle         des parametres             ce

Figure   1.5 - Les principales étapes de la phase d'entraînement.

Dans les autres paradigmes d'apprentissage, ces étapes demeurent globalement présentes,
mais leur finalité et leur mise en œuvre diffèrent selon l'information disponible pour guider
l'apprentissage. En particulier, les phases de préparation des données, de choix du modèle
et d'ajustement des paramètres constituent des éléments communs                                  à l'ensemble des
paradigmes. En revanche, la nature des objectifs optimisés et les modalités d'évaluation
varient significativement. En apprentissage non supervisé, l'entraînement ne vise pas à
reproduire    des sorties annotées,        mais       à organiser ou structurer les données               selon leurs
similarités internes; la validation repose alors sur des critères intrinsèques, liés à la
cohérence     ou à la stabilité des structures obtenues. À l'inverse, en apprentissage auto-

                                                         Ingénierie des
                                                         caractéristiques
                Apprentissage         Données       >»                         Développement    Données de
                   machine            d'entrée                                   du modèle         sortie
                « classique »

                Apprentissage         D:     es                               Développement    Données de
                   profond            d'entrée                                  du modète         sortie

Figure    1.6 - La différence fondamentale pour l'apprentissage machine « classique » et
l'apprentissage machine profond en mettant en avant le rôle de l'ingénierie des caractéristiques
dans les modèles d'apprentissage machine et son absence dans les modèles d'apprentissage profond.

La sélection de caractéristiques (feature selection) vise à réduire la dimensionnalité
du jeu de données en éliminant les caractéristigqes redondantes, peu informatives ou
bruitées. Cette réduction permet non seulement d'améliorer l'efficacité des algorithmes
d'apprentissage (en termes de temps de calcul et de mémoire), mais également de
renforcer la robustesse des modèles et leur capacité de généralisation, en limitant le
surapprentissage [   ].

Trois grandes familles de méthodes de sélection de caractéristiques sont généralement
distinguées, en particulier dans le cadre de l'apprentissage supervisé : les méthodes
par filtrage, les méthodes d’encapsulation et les méthodes intégrées. Bien que cette
classification soit principalement applicable aux contextes supervisés, certaines de ces
approches peuvent être adaptées ou transposées à l'apprentissage non supervisé à l'aide
de critères alternatifs d'évaluation de la pertinence des variables.

Les méthodes de filtrage       (filter methods) évaluent chaque caractéristique de manière
indépendante, sans recourir au modèle d'apprentissage machine (voir la figure 1.7). Elles
reposent sur l'évaluation de critères statistiques ou des mesures d'information pour estimer

   DRE                                                                                                            |
la pertinence de chaque caractéristique par rapport à la variable cible.

   |      cones
         d'entrée       Évaluation de               Sélection
                                                         Éon d de                 Modél
                                                                                    pes        Performance du
         —*|        critéres statistiques         caractéristiques           d’apprentissage       modéle
   |                                                 pertinentes                 Machine

                                                                                                             __
Figure 1.7 - Méthode de sélection par filtrage : évaluation préalable des caractéristiques à l’aide de
critères statistiques externes au modèle d'apprentissage machine.

Les méthodes de filtrage sont simples et rapides à mettre en œuvre et sont indépendantes
du modèle d'apprentissage machine. Elles sont particulièrement adaptées aux contextes

Les méthodes             d’encapsulation            (wrapper methods),               également appelées méthodes
d’enveloppement, constituent une approche de sélection de caractéristiques dans laquelle
la qualité d'un sous-ensemble de variables est évaluée en fonction des performances d’un
modèle donné (voir la figure 1.8).

                                          Sélection de caractéristiques
                                                    pertinentes

              Données                                                      }                                     |
              d'entrée            énérati   Fe                             x
                                Génération d'un                    .   Modèle                 Performance du
                               sous-ensemble   de                 d'apprentissage                modèle
                                caractéristiques                       machine

Figure 1.8 - Méthode de sélection par encapsulation : un sous-ensemble de caractéristiques est
généré, évalué via l’algorithme d'apprentissage, puis comparé selon une mesure de performance.

Contrairement aux méthodes de filtrage, qui se fondent uniquement sur des critères
statistiques indépendamment du modèle prédictif, les méthodes d’encapsulation intègrent
directement l'algorithme d'apprentissage machine dans le processus de sélection.

Ces méthodes s'appuient sur des métriques de performance du modèle, afin d'évaluer
différents sous-ensembles de caractéristiques. Le principe consiste à rechercher le sous-
ensemble de variables qui maximise l'efficacité du modèle prédictif selon le critère choisi.
Le processus de recherche peut s'effectuer à l'aide de différentes stratégies d'exploration
de l’espace des sous-ensembles de caractéristiques, telles que :

—   La sélection directe (forward selection) qui est une méthode itérative où le modèle
    commence avec un ensemble vide de caractéristiques. À chaque itération, l'algorithme
    évalue l'ajout d’une caractéristique. Si la caractéristique améliore la performance du
    modèle selon un critère donné, elle est retenue. Ce processus se poursuit jusqu'à ce
    qu'aucune amélioration significative sur la performance du modèle ne soit observée.
    Cette méthode repose sur l'hypothèse que certaines variables possèdent un pouvoir
    explicatif dominant, capable de renforcer la performance prédictive même en
    l'absence des autres. Toutefois, cette approche peut être vulnérable au problème de
    multicolinéarité et risque d’omettre certaines interactions complexes, mais importantes.
—   Vélimination en arriére (backward elimination). Contrairement 4 la sélection directe,
    l’élimination en arrière débute avec l’ensemble complet des caractéristiques disponibles.
    À chaque itération, l'algorithme supprime la caractéristique dont le retrait entraîne
    la plus     faible    dégradation      de la performance                     du modèle,   telle qu'évaluée       selon
    un critère prédéfini. Ce processus itératif se poursuit jusqu'à ce qu’une nouvelle
    suppression provoque une perte de performance jugée inacceptable. Cette méthode est
    particulièrement pertinente lorsque l’on soupçonne la présence d’un grand nombre de
    caractéristiques redondantes ou faiblement informatives. Elle présente une certaine
    robustesse face aux caractéristiques peu pertinentes, mais peut s'avérer coûteuse sur le
    plan computationnel lorsque la dimension initiale des données est élevée. Par ailleurs, à

explicitement la sélection du modèle, les méthodes embarquées réalisent simultanément
l'apprentissage du modèle et la sélection des variables pertinentes.

Ces méthodes exploitent les mécanismes internes de certains algorithmes d'apprentissage
automatique, principalement supervisés, pour évaluer la pertinence des caractéristiques.
Toutefois, des variantes existent également dans des contextes non supervisés, notamment
à travers des approches intégrant des régularisations ou des contraintes structurelles
au sein même de l’algorithme d'apprentissage. Parmi les modèles qui incorporent une
sélection automatique de variables, nous citons :

—     Les arbres de décision (Decision Trees, DT) réalisent une sélection implicite des
      caractéristiques en évaluant leur capacité à améliorer la qualité des partitions de
      données. Cette évaluation repose sur la réduction d'un critère d’impureté, typiquement
      l'indice de Gini ou l’entropie, au moment de chaque division de nœud. Les variables
      qui contribuent le plus à ces réductions sont naturellement sélectionnées au cours
      de la construction de l'arbre, ce qui offre à ces modèles une capacité intégrée à
      identifier les variables les plus discriminantes. Cette propriété rend les arbres de
      décision particulièrement utiles pour l’interprétabilité des modèles et la compréhension
      de la structure sous-jacente des données.
—     Les   machines       à vecteurs     de support     avec   régularisation      de    type   L1   (Support
      Vector Machines,        SVM)      intègrent   un   mécanisme       de   sélection   automatique      des
      caractéristiques. En effet, la pénalisation L1 contraint certains coefficients associés
      aux variables à devenir exactement nuls, ce qui favorise un modèle parcimonieux où
      seules les variables les plus informatives conservent un poids non nul. Ainsi, les SVM-L1
      réalisent une sélection intégrée des caractéristiques au cours de l'apprentissage, sans
      nécessiter d'étape séparée, tout en maintenant la performance prédictive du modèle.
      Ce type de régularisation est particulièrement adapté dans les contextes de haute
      dimensionnalité, comme en génomique, où le nombre de variables dépasse largement le
      nombre d'observations.

              L'article « 1-norm Support Vector Machines » de Zhu, Rosset, Hastie et Tibshirani,
              publié en 2004 dans la conférence NeurlPS, introduit une variante des machines à
un     —      vecteurs de support intégrant une régularisation de type L1 [|]. Cette approche
 []           favorise la parcimonie du modèle en contraignant certains coefficients à devenir
a             exactement nuls, ce qui permet une sélection automatique des variables au cours méme
              de l'apprentissage. Ce travail constitue une référence majeure dans le domaine de la
              sélection de caractéristiques intégrée (embedded feature selection) via des modèles
              linéaires.

Les méthodes intégrées combinent les avantages des méthodes de filtrage (rapidité
et efficacité computationnelle) et des méthodes d’encapsulation (prise en compte des
dépendances entre caractéristiques et performance du modèle), Elles sont généralement
plus rapides que les méthodes d’encapsulation, tout en étant plus précises que les méthodes
de filtrage seules. De plus, leur nature intégrée les rend souvent bien adaptées à des
applications où les données sont de grande dimension.

Cependant, ces méthodes présentent également certaines limites. Elles sont fortement

## 1.3 Développement d’un modèle d'AM

approches par apprentissage profond sont généralement plus efficaces.
Il convient de souligner que des progrès récents dans le domaine de l'interprétabilité
permettent aujourd’hui de mieux comprendre et visualiser le fonctionnement des modèles
profonds, renforçant ainsi leur acceptabilité dans des contextes sensibles.

Les contraintes de calcul

Les contraintes de calcul jouent également un rôle important, En présence de ressources
limitées, des modèles simples comme les arbres de décision sont préférés. En revanche,
lorsqu'une puissance de calcul élevée est disponible, notamment avec des GPU (Unité de
traitement graphique, en anglais Graphics Processing Unit) ou des CPU (Unité centrale de
traitement, en anglais Central Processing Unit), il est possible d'entraîner efficacement des
modèles complexes tels que les réseaux neuronaux profonds, adaptés aux tâches exigeantes
comme la reconnaissance d'images, le traitement du langage naturel ou la modélisation de
séries temporelles.

La robustesse aux données bruitées ou déséquilibrées

La robustesse du modèle face aux données bruitées ou déséquilibrées est un aspect
essentiel. Les arbres de décision et les forêts aléatoires présentent une bonne tolérance
aux valeurs aberrantes. À l'inverse, certains modèles comme les SVM requièrent un
prétraitement rigoureux des données. Dans les cas de déséquilibre des classes, il peut
être utile de recourir à des techniques telles que l'ajustement des poids des classes, le
sur-échantillonnage ou le sous-échantillonnage des données, l'augmentation des données,
ainsi qu’à d’autres approches spécifiques pour améliorer la performance du modèle sur les
classes minoritaires.

Ainsi, le choix du modèle constitue une étape fondamentale de la démarche d'apprentissage
machine. 11 doit être guidé par une analyse approfondie de l'objectif, des données
disponibles et des exigences pratiques du problème. Dans certains cas, une approche
hybride, combinant plusieurs modèles, peut s'avérer judicieuse pour exploiter leurs
complémentarités.       Une   évaluation   rigoureuse    à l'aide   de   métriques   adaptées   est
indispensable   pour garantir la qualité du modèle         et sa capacité   de généralisation   (se
référer à la section 1.7).

4. Optimisation des paramètres

Lentrainement d'un modèle consiste à ajuster ses paramètres internes afin d'optimiser
ses performances sur une tâche donnée. Par exemple, dans un réseau de neurones, ce
sont les poids synaptiques qui sont ajustés, tandis que dans un modèle de régression,
il s’agit des coefficients de pondération. Cet ajustement s'effectue a partir d’un jeu de
données d'entraînement, en cherchant à minimiser l'écart entre les prédictions du modèle
et les valeurs cibles réelles. Au centre de ce processus se trouve l'optimisation, qui vise à
minimiser une fonction de perte (loss function), aussi appelée fonction objectif (objective
function) ou fonction de coût (cost function), laquelle quantifie cette différence entre
prédictions et valeurs attendues.

Puisque chaque type de modèle possède ses propres défis et techniques d'optimisation,

en constante évolution.
Premièrement, les systèmes de détection de fraude doivent s'adapter aux nouvelles
stratégies des fraudeurs, ce qui implique un réentraînement périodique avec des données
récentes.
Deuxièmement, les moteurs de recherche doivent actualiser continuellement leurs
algorithmes pour refléter l'évolution des mots-clés populaires liés aux événements
d'actualité et aux comportements des utilisateurs. Sans ces mises à jour, les résultats
deviendraient rapidement obsolètes et moins pertinents.
Enfin, les voitures autonomes doivent s’ajuster aux conditions de circulation, variations
météorologiques et évolutions réglementaires. Grâce à l'analyse continue des données
issues de leurs capteurs, ces véhicules améliorent leurs algorithmes de conduite pour
mieux gérer des situations inédites et garantir la sécurité.
Ainsi, la maintenance et la mise à jour constantes        des modèles   sont essentielles pour
assurer leur efficacité et leur fiabilité à long terme.

1.4     Préparation et prétraitement des données
La préparation (data preparation) et le prétraitement des données (data preprocessing)
représentent des étapes fondamentales dans tout projet d'analyse de données ou de
modélisation. Elles permettent de s'assurer que les données sont de qualité, fiables et
prêtes à être utilisées par des algorithmes statistiques ou d'intelligence artificielle.
La préparation des données consiste principalement à identifier, nettoyer et organiser les
données brutes. Cette étape inclut, par exemple, le traitement des valeurs manquantes, la
détection et le traitement des valeurs aberrantes, la gestion des doublons, et la vérification
de la cohérence des formats (comme les dates, les unités ou les types de variables). Elle
peut également impliquer l’agrégation de plusieurs sources de données ou l'extraction de
données pertinentes à partir de formats complexes (tels que les fichiers JSON, XML et les
bases de données relationnelles).
Le prétraitement des données est une étape complémentaire à la préparation des
données. Il regroupe les opérations qui visent à rendre les données exploitables par
des modèles d'analyse ou d'apprentissage machine. Cela inclut la transformation des types
de variables, la normalisation ou la standardisation des données numériques, le traitement
des valeurs aberrantes et la réduction de la dimensionnalité. Ces opérations améliorent non
seulement la performance des modèles, mais également leur robustesse et leur capacité de
généralisation.

Les opérations effectuées lors des étapes de préparation et de prétraitement des données se
chevauchent souvent (figure 1.10). Certaines d’entre elles peuvent en effet être rattachées
à l’une ou l’autre de ces étapes, en fonction du contexte d'analyse. Ce chevauchement
s'explique en grande partie par l'intégration de ces deux étapes dans une même séquence
opérationnelle, ce qui tend à cacher leur distinction conceptuelle. Par ailleurs, la nature
itérative de ces étapes accentue leur chevauchement. Par exemple, il est très fréquent
de devoir réajuster, la normalisation suite à une modification de l'opération de détection
de valeurs aberrantes. Enfin, ces deux étapes partagent un objectif commun, à savoir,
l'amélioration de la qualité et la pertinence des données et l'optimisation des performances

—   Données    manquantes       aléatoirement          (Missing   At Random,     MAR)    : Dans     cette
    situation, la probabilité qu’une donnée        soit manquante       dépend    d’autres variables
    observées, mais pas de la variable manquante elle-même. Par exemple, dans un
    formulaire de demande de prêt bancaire, les personnes plus âgées peuvent être plus
    susceptibles de ne pas renseigner leur revenu d'épargne, non pas en fonction de leur
    revenu lui-même, mais en lien avec l’âge ou la profession, qui sont connus. Dans ce
    cas, l'information manquante est conditionnellement aléatoire étant donné les autres
    variables observées.
—   Données manquantes non aléatoirement (Missing Not At Random, MNAR) : Dans
    cette situation, la probabilité qu’une donnée soit manquante dépend directement de la
    valeur de la variable elle-même. Par exemple, des individus ayant un revenu très faible
    peuvent être plus enclins à ne pas déclarer ce revenu par gêne ou par crainte d'un refus
    de crédit. Ainsi, plus le revenu est bas, plus la probabilité qu'il soit manquant augmente.
La catégorie   des données     manquantes     est importante       à identifier, car elle détermine
la stratégie de traitement la plus appropriée.            En effet, le mécanisme        d'absence     des
données influence directement la validité des analyses statistiques et le choix des méthodes
d'imputation.

            L'article fondateur « Inference and Missing Data » de Donald B. Rubin, publié en 1976
            dans la revue Biometrika, établit le cadre théorique moderne pour l'analyse statistique
—<          des données incomplètes [! 3]. Il y introduit une typologie essentielle des mécanismes
 []        de données manquantes : MCAR (Données manquantes complètement à hasard, Missing
Be         Completely At Random), MAR (Données manquantes a hasard conditionnellement,
            Missing At Random) et MNAR (Données manquantes non à hasard, Missing Not At
            Random). Ce travail reste une référence incontournable dans les domaines de la
            statistique et de l'apprentissage machine.

2. Suppression des données manquantes

Une première approche classique pour traiter les données manquantes consiste à supprimer
les observations (lignes) ou les variables (colonnes) concernées. Cette méthode est simple
à mettre en œuvre et peut s'avérer pertinente lorsque le taux de données manquantes est
très faible ou que les variables concernées sont peu informatives pour l’analyse.

La suppression des données manquantes peut entraîner une perte d’information
significative. En réduisant la taille du jeu de données, nous diminuons la puissance
statistique des analyses, ce qui rend difficile la détection de résultats significatifs. Lorsque
les données sont manquantes de façon complètement aléatoire (MCAR), leur suppression
est souvent acceptable, car elle n’introduit aucun biais systématique. Les observations
incomplètes peuvent être retirées sans compromettre la représentativité de l'échantillon
ni fausser les résultats. En revanche, si Les données sont manquantes non aléatoirement
(MNAR), par exemple lorsque certaines personnes choisissent de ne pas répondre à des
questions sensibles comme le salaire ou l’âge, la suppression peut introduire un biais de
sélection. Dans ce cas, les observations restantes risquent de ne plus être représentatives
de la population étudiée, ce qui compromet la validité des analyses et des modèles prédictifs.
De plus, dans ce cas, la suppression de données manquantes peut conduire à ignorer des

                                                    1A.    Préparation et prétraitement des données

dans l’ensemble de la matrice X pour estimer les valeurs manquantes de manière plus
cohérente avec la structure multivariée. Parmi ces approches, nous citons :

—   L'imputation par les k-plus proches voisins (k-Nearest Neighbors, k-NN), où une
    valeur manquante est estimée à partir des observations les plus similaires, mesurées
    selon une distance définie (par exemple la distance euclidienne pour les variables
    quantitatives ou la distance de Hamming pour les variables qualitatives). Si la variable
    à imputer est quantitative, la valeur manquante est généralement remplacée par la
    moyenne ou la médiane des valeurs observées chez les k voisins les plus proches. Par
    contre, si la variable est qualitative (catégorielle), la valeur manquante est souvent
    imputée par la modalité la plus fréquente parmi ces k plus proches voisins.

               Plusieurs mesures de distance peuvent être utilisées dans les méthodes d’imputation.
               En voici trois exemples fréquemment utilisés.
               Soient © = (ri,æ2..... Fn) et y = (yi. Ya.--.. Yn) deux vecteurs de même dimension
               n, composés de variables binaires ou catégorielles.

               1.    La   distance    euclidienne    est   utilisée   principalement     pour   les   variables
               numériques continues. Elle est définie comme suit :
                                                              ———_—_-

               (se   calcule   avec   spatial.distance.euclidean        via   les   bibliothèques     scipy   ou

    \   S      sklearn ).

        A      2. La distance de Hamming est utilisée pour les variables catégorielles binaires.
               Elle mesure le nombre de positions différentes entre deux vecteurs :

                                                d(x.y) = Sou           # y)
                                                             sel

               ou I(r, 4 y.) est une fonction indicatrice qui vaut 1 sir, # y, et 0 sinon.
               (s'obtient avec scipy.spatial.distance.hamming)

               3. La distance de Gower permet de mesurer la similarite entre des observations
               contenant des types de variables mixtes (numériques, catégorielles, binaires, etc.}.
               Cette mesure est très utile pour les bases de données réelles combinant différentes
               natures de variables, comme des montants, du texte ou des indicateurs binaires. (se
               calcule avec gower.gower matrix de la bibliothèque gower ).

—   L'imputation     par régression       (regression-based imputation)              consiste à estimer les
    valeurs manquantes d'une variable en construisant un modèle prédictif basé sur les
    autres variables du jeu de données. Par exemple, si une variable r, contient des
    valeurs manquantes, nous ajustons un modèle de régression en utilisant les observations
    complètes, puis nous utilisons ce modèle pour prédire les valeurs manquantes à partir
    des autres informations disponibles pour chaque individu.

L'extrait de code        1.1 débute par l'importation de la bibliothèque                                        seaborn, qui permet
d'accéder facilement à des jeux de données intégrés. Le jeu de données Titanic est ensuite
chargé à l'aide de la fonction sns.load_dataset(“titanic") en conservant uniquement
quelques colonnes jugées pertinentes pour l'analyse.

Extrait de code     1.1 - Importation des bibliothèque et lecture des données                                   Titanic.

    import     seaborn     as sns

    # Charger le dataset Titanic
    df = sns.load dataset{“titanic")

    # Garder      seulement         les     colonnes d'intérêt
    df   = df[l'survived',                ‘pclass',  ‘age’, ‘sibsp',                       ‘parch',        ‘fare’,     ‘embarked']]

Lextrait de code 1.2 commence par une vérification systématique des valeurs manquantes
dans le DataFrame df, en comptant le nombre de valeurs NaN pour chaque variable. Les
colonnes contenant des données manquantes sont ensuite listées et supprimées à l’aide de
la méthode     dropna()     . Le résultat est stocké dans                      df    dropped.         La taille du tableau avant et
après cette suppression est affichée, ce qui permet d’évaluer l'impact de cette opération.

Extrait de code     1.2 - Suppression des données manquantes.
    # Identification          des     colonnes        contenant          des        valeurs        manquantes
    missing     values     = df.isnull(}.sum()
    columns_with         missing values             = missing _values[missing_values                           > 0]

    # Suppression des lignes                  comportant         au     moins        une     valeur        manquante
    df_dropped = df.dropna()

En sortie, nous obtenons la liste des colonnes contenant des valeurs manquantes : age
avec 177 valeurs manquantes et embarked avec 2 valeurs manquantes, Nous avons aussi la
taille avant et après suppression : (891, 7) avant, et (712, 7) après. Cela signifie que 179
lignes ont été supprimées, soit toutes celles contenant au moins une valeur manquante. Le
nombre de colonnes reste constant à 7, ce qui correspond aux variables retenues à l'avance
pour l’analyse     : survived,            pclass,    age,       sibsp,     parch,           fare      et   embarked.

      Colonnes avec valeurs                 manquantes      :
      age          177
      embarked        2
      dtype: int64

      Taille     avant    suppression          :    (891,   7)
      Taille     aprés    suppression          :    (712,   7)

Si nous optons pour une imputation des données manquantes plutôt que leur suppression,
nous pouvons utiliser des statistiques simples. Cette approche, bien que basique, permet de
conserver l’ensemble des observations tout en limitant les biais introduits par la suppression

transformation, l'imputation est réalisée sur l'ensemble du sous-ensemble                 df_knn     cat par
la méthode        transform de knn imputer. Une fois l’imputation effectuée, les valeurs
                fit
sont reconverties dans leur format d’origine. Les résultats d'imputaion des variables age et
 embarked sont enregistrés, respectivement, dans les variables age.knn et embarked. knn .

Extrait de code       1.4 - Imputation des données manquantes      par les & plus proches voisins.

    from   sklearn.impute import        KNNImputer
    from   sklearn.preprocessing        import OrdinalEncoder

    # Définir un seul KNN imputer réutilisable             avec     5   voisins
    knn_imputer = KNNImputer(n neighbors-5)

    # 1. Imputation KNN pour ‘age' (variable numérique)
    features_num = ['age',  ‘fare’,  ‘pclass', ‘sibsp',  ‘parch']
    df.knn num = df[features_num)}.copy()
    df_knn_imputed num = pd.DataFrame(knn. imputer. fit_transform(df_knn_num),
                                                columns=features         num,
                                           index=df . index)
    age.knn     = df    knn_imputed_num[
                                     ‘age’ ]

    # 2. Imputation KNN pour ‘embarked’ (variable                 catégorielle)
    features. cat = ['embarked',   ‘fare’, ‘pclass',              ‘sibsp',  ‘parch']
    df_knn.cat = df[features.cat].copy({})

    # Encodage    imputation -» décodage
    encoder = OrdinalEncoder()
    df_knn_cat['embarked'] = encoder. fit_transform(df_.knn_cat[[' embarked’ ]]).ravel()
    df_knn imputed_cat = pd.DataFrame(knn_imputer.fit transform(df knn. cat),
                                                cotumns=features_cat,
                                                index=df. index)

    df_knn. imputed_cat[ ‘embarked ] = encoder. inverse.transform(
       df_knn_imputed.cat[[' embarked’ ]].values.reshape(-1, 1)).ravel(}

    embarked.     knn   = df_knn_imputed.cat[ ‘embarked’ ]

Finalement, une imputation par régression linéaire est également effectuée en utilisant
la classe LinearRegression() de scikit-learn (voir l’extrait de code 1.5). Cette méthode
consiste à prédire les valeurs manquantes d’une variable à partir des autres variables
observées, en supposant une relation linéaire entre elles.
Par défaut, la classe LinearRegression() de scikit-learn ajuste les coefficients du modèle
selon la méthode des moindres carrés ordinaires (Ordinary Least Squares, OLS). Cette
approche consiste à estimer les paramètres de la régression linéaire en minimisant la
somme des carrés des résidus.
L'extrait de code 1.5 permet d'ajuster un modèle de régression à partir des individus pour
lesquels la variable      age est observée, c'est-à-dire non manquante,           en utilisant les mêmes
variables prédictives utilisées précédemment. Ce modèle est ensuite utilisé pour estimer

L'imputation par la moyenne (courbe orange) induit une sur-représentation artificielle
autour de la valeur moyenne, ce qui réduit la variance et tend à masquer la structure
réelle des données. En revanche, l’imputation par les k plus proches voisins (courbe verte)
restitue plus fidèlement la forme de la distribution initiale, en conservant davantage la
structure sous-jacente des données. Enfin, l'imputation par régression (courbe rouge)
fournit également une approximation réaliste, dont la distribution est proche de celle
obtenue par les k plus proches voisins.

L'analyse visuelle constitue une première approche intuitive pour comparer les effets des
différentes méthodes d’imputation sur la distribution des données. Toutefois, cette analyse
qualitative pourrait être complétée par une évaluation quantitative fondée sur des mesures
formelles de dissimilarité entre distributions. En l'occurrence, la distance de Wasserstein
permet de quantifier le coût minimal nécessaire pour transformer la distribution imputée
en celle d’origine, en tenant compte des écarts entre les valeurs. Cette mesure peut être
obtenue à l’aide de la fonction wasserstein distance du module scipy.stats.
De même, la divergence de Kullback-Leibler permet d'évaluer la perte d'information
associée à l’utilisation de la distribution imputée comme approximation de la distribution
réelle. Elle mesure l’asymétrie entre les deux distributions et peut être calculée à l'aide de
la fonction   rel   entr   du module   scipy.special,           en sommant   les contributions de chaque
bin de l’histogramme.

1.4.2      Détection et traitement des valeurs aberrantes
Les valeurs aberrantes (outliers) sont des observations qui s’écartent du comportement
général du reste des données. Elles peuvent étre définies comme des points dont les
caractéristiques différent de maniére significative de celles de la majorité des observations.
Ces valeurs peuvent fausser les statistiques descriptives (comme la moyenne ou la
variance), perturber |’estimation des paramètres dans les modèles statistiques et biaiser
les performances des algorithmes d’apprentissage machine, en particulier ceux sensibles
aux valeurs extrémes.
La détection des valeurs aberrantes repose sur des techniques variées, allant de simples
critères statistiques à des méthodes plus complexes fondées même sur l’apprentissage
machine.

Détection basée sur le score-z
Une approche courante pour détecter les valeurs aberrantes dans une variable (c’est-à-dire
dans une colonne) consiste à utiliser le score-z (z-score). Celui-ci mesure la distance, en
nombre d’écarts-types, entre chaque observation et la moyenne de la variable.

Considérons la matrice de données X £ 2                      “* contenant \ observations (lignes) et K
variables (colonnes).
                                                  1     ol             K
                                            Ty         M;           | .
                                            fil        #3           oe
                                   X =       à          :             .

                                              |         “              K
                                            À N       ay            +) Na

                                                                                                      AI

0.3 % restantes. Toutefois, ce choix n’est pas absolu : un seuil plus strict (par exemple
|:| > 2.5) permettra de détecter un plus grand nombre de points potentiellement aberrants,
tandis qu'un seuil plus tolérant (comme           !:| > 3.5) réduira le nombre de ces points.

La figure 1.12 illustre la courbe de densité de probabilité d'une distribution normale
centrée réduite, c’est-à-dire une loi normale de moyenne y = 0 et d’écart-type 7 = |.

               0.5
                                                           H              —     Distribution normale
               04!                                         H              mn    pelo = 68%
                                                                          Mim   pt20   = 95%
                                                                          MM    +30    = 99,7%
           y2 0.3
           w
           àci 9.2

               0.1

               0.0

Figure 1.12 - Visualisation des intervalles d’une distribution normale centrée réduite pour des
seuils statistiques +1, +20 et i3a.

Sous cette courbe en cloche symétrique, trois zones distinctes sont mises en évidence à
l’aide de nuances de la couleur bleue représentant les intervalles :
  —   y E 1 o qui est la zone centrale contenant environ 68 % des données et correspondant
      aux observations les plus fréquentes et les plus proches de la moyenne.
  — y +2             est la zone intermédiaire.     Elle couvre environ 95 % des données                   de la
      distribution.
  —   y +3 r est la zone englobante. Elle couvre près de 99.7 % des observations.
Dans cette figure, chaque ligne verticale annotée marque une frontière critique d’écart-type
(u + ko, avec k=1,2 et 3), permettant une interprétation intuitive du score-z : plus une
valeur est éloignée de la moyenne (en termes de a), plus elle est considérée aberrante.

La détection     des valeurs     aberrantes   à l’aide du score-z présente              plusieurs      avantages
notables. Elle se distingue d’abord par sa mise en œuvre simple et rapide, ce qui en
fait une méthode accessible même dans des contextes exploratoires. De plus, elle offre
une grande interprétabilité puisque le score-z exprime directement la position relative
d'une observation par rapport à la moyenne, en unités d’écart-type, ce qui facilite la
compréhension et la communication des résultats. Par contre, cette méthode présente
des contraintes importantes. Tout d’abord, elle repose sur l'hypothèse de normalité des
données. Si la distribution des observations s'éloigne de la loi normale (par exemple en
présence d’asymétrie ou de multimodalité), la détection perd en fiabilité. De plus, cette
approche est sensible aux valeurs aberrantes elles-mêmes, car la moyenne et l'écart-type
sont des estimateurs non robustes qui peuvent être fortement influencés par la présence
de quelques observations extrêmes. Finalement, il s’agit d'une méthode univariée qui ne

de dispersion telles que l'écart-type, qui sont sensibles aux données extrêmes. De plus, la
méthode IQR est non paramétrique, c’est-à-dire qu'elle ne repose sur aucune hypothèse
concernant la distribution des données, ce qui la rend applicable à une grande variété de
situations.

          Les notions de quantile et de quartile proviennent toutes deux de la statistique
          descriptive et permettent de caractériser la répartition des données. Elles se distinguent
          principalement par le nombre de sous-groupes qu’elles définissent dans une distribution.
          Les quantiles sont des valeurs-seuils qui divisent un ensemble de données ordonnées
          en groupes de taille égale. Il s'agit d’un concept général. Par exemple, les déciles
          divisent les données en 10 parties égales, tandis que les centiles (ou percentiles) les
          divisent en 100. Un quantile d'ordre q découpe la distribution en 7 de la population.
          Les quartiles, quant à eux, représentent un cas particulier de quantiles : ils divisent
          les données en quatre groupes égaux. Le premier quartile Q, correspond à 25% des
          données, le deuxième quartile Q2 à 50 % (il correspond à la médiane), et le troisième
          quartile Q3 à 75%.
          En résumé, le terme quantile désigne toute division régulière d'un ensemble de données,
          tandis que quartile fait spécifiquement référence à la division en quatre parties égales.

Représentations graphiques pour la détection de valeurs aberrantes

Les méthodes numériques de détection des valeurs aberrantes peuvent être complétées
par des représentations graphiques. Parmi lesquelles, nous retrouvons les diagrammes en
boîte (boxplots) et les nuages de points (scatter plots).

Le diagramme en boîte est une représentation graphique synthétique de la distribution
d’une variable univariée. Il met en évidence plusieurs statistiques descriptives clés dont
la médiane (Q2), les premier et troisième quartiles ((); et Q3), ainsi que l'intervalle
interquartile (IQR), défini par IQR = Qs — Q1.
Ce graphique permet également de visualiser les observations potentiellement aberrantes,
c’est-à-dire les valeurs situées en dehors de l'intervalle considéré comme « normal ».
Plus précisément, pour une variable donnée, toutes les valeurs strictement inférieures à
(Q1 ~ 9 » IQR) ou strictement supérieure à (Q3 + 7 x IQR) sont considérées comme
des valeurs aberrantes. Ces observations sont représentées par des points isolés dans le
diagramme en boîte, distincts de la boîte principale. Le paramètre 7 est en général fixé à
1.5 pour détecter les outliers modérés, et à 3 pour les outliers extrêmes.

Le nuage de points est un outil graphique fondamental pour l'analyse bivariée, voire
multivariée lorsqu'il est enrichi de dimensions supplémentaires (par la couleur, la taille
ou la forme des points). Dans le cadre de la détection de valeurs aberrantes, il permet
de visualiser la relation entre deux variables quantitatives, en mettant en évidence les
tendances générales, les regroupements éventuels, ainsi que les observations atypiques.

Ainsi, ce type de représentation est particulièrement utile pour repérer visuellement des
valeurs aberrantes, c’est-à-dire des points qui s’écartent nettement du nuage principal ou
qui ne suivent pas la structure attendue de la relation entre les variables.

L'utilisation conjointe de ces représentations graphiques et des méthodes statistiques

L'extrait de code 1.7 illustre la détection des valeurs aberrantes basée sur l'intervalle
interquartile, en utilisant un coefficient eta iqr = 1.5, qui correspond au seuil le plus
couramment utilisé dans la littérature.
Extrait de code             1.7 - Détection des valeurs aberrantes dans la variable age basée sur l'intervalle
interquartile.
    # Supprimer                   les      valeurs     manquantes             pour      ‘age’
    df_age     = df[['age']].dropna()

    eta.iqr        =        1.5       # Paramètre         de   l'IOR          (1.5)

    # Calcul des                     quartiles et de L'IOR
    Ql = df_age[                     age'].quantile(0.25)
    Q3 = df_age{                     age ].quantile(0.75)
    IQR = Q3           - QL

    # Définition des                        bornes
    lower bound = Ql                        - eta_iqr      * IQR
     upper    bound              =    Q3    +   eta_iqr    *   IQR

    # Detection                  des       valeurs     aberrantes
    outliers           iqr = df agel
       (df.age['age']                       < lower_bound)           |    (df        age[‘age   ] >   upper_bound)]

L'affichage ci-dessus présente les valeurs aberrantes détectées dans la variable age basée
sur l'intervalle interquartile (IQR) avec un seuil eta igqr=1.5.

      Détection              des        valeurs       aberrantes          :     IQR

      Quartile              QI                                           : 20.12
      Quartile Q3                                                        : 38.00
      TAR (Q3 - Q1)                                                      : 17.88
      Borne inférieure                          (Ql   - etaxIQR)          : -6.69
      Borne supérieure (Q3 + eta*IQR)                                     : 64.81
      Valeurs aberrantes détectées                                       : 11

      Les    valeurs                 aberrantes         détectées         :
      id            age
      33      66.
                       i)

      54      65.
                       ©

      96      71.
                       UE

      116     70.
      280     65.
                       E&

      456     65.
                       ©

      493     71.
                       ©

      630     80.
                       ©

      672     70.
                       ©

      745     70.
                       &

      851     74.

transforme simultanément les données. Le résultat de chaque transformation est enregistré
dans des objets DataFrame distincts pour être visualisés dans la figure 1.14.

Extrait de code 1.8 - Mise à l'échelle de la variable age
     from   sklearn.preprocessing       import   StandardScaler,    MinMaxScaler,   RobustScaler

     # Sélectionner la colonne ‘Age‘ et   supprimer les            valeurs   manquantes   pour
          l'illustration
     age_data = dfl'age'].dropna(}.values.reshape(-1,              1)

     # Initialiser les scalers
     scaler_standard = StandardScaler()
     scaler_minmax          = MinMaxScaler()
     scaler_robust          = RobustScaler()

     # Standardisation
     age standardized           = scaler standard.fit_transform(age_data)
     age_standardized_df        = pd.DataFrame(age standardized,
            columns=['Age      Standardized'])

     # Normalisation (Min-Max Scaling) sur l'intervalle {0, 1] par défaut
     # Pour normaliser sur l'intervalle [-1, 1}, utiliser
     # scaler_minmax =    nMaxScaler(feature_range=(-1, 1))
     age normalized    = scaler_minmax.fit transform(age_data)
     age.normalized df = pd.DataFrame{age.normalized, columns=['Age Normalized                   ])

     # Mise à l'échelle robuste
     age robust scaled     = scaler_robust.fit transform(age_data)
     age_robust_ scaled df = pd.DataFrame(age_robust scaled,
            columns=[ ‘Age RobustScaled'])

Dans sa version originale (figure 1.14 (a)), l’âge est exprimé en années. Nous observons une
forte concentration de valeurs chez les jeunes adultes, ainsi que quelques valeurs élevées
(au-delà de 70 ans) qui introduisent une asymétrie. Bien que ces données soient fidèles
a la réalité, elles présentent un probléme d’échelle pour les algorithmes d’apprentissage
machine qui reposent sur des mesures de distance, car ces derniers peuvent attribuer
une importance excessive aux variables ayant des valeurs numériquement plus grandes,
faussant ainsi les résultats de l’analyse.
La standardisation (figure 1.14 (b)) transforme les données de maniére a ce qu’elles soient
centrées autour d'une moyenne nulle. Autrement dit, chaque valeur d'âge est exprimée
en nombre d’écarts-types par rapport à la moyenne. Cette transformation conserve la
forme globale de la distribution, ce qui explique pourquoi l’histogramme reste visuellement
similaire à celui des données originales. Toutefois, elle modifie complètement l'échelle
numérique : l’âge n’est plus exprimé en années, mais en « unités statistiques », ce qui
permet à l'algorithme de traiter cette variable de manière plus neutre, indépendamment
de son unité d'origine.
La normalisation min-max (figure 1.14 (c)) transforme les données pour qu'elles soient

### 1.4.5 Suppression des doublons

Les doublons correspondent à des individus identiques apparaissant plusieurs fois dans
un jeu de données. Leur présence peut engendrer une sur-représentation artificielle de
certaines observations, faussant ainsi les statistiques descriptives, les modèles prédictifs et
toute analyse fondée sur la fréquence ou la distribution des valeurs. Par exemple, si une
méme personne est enregistrée deux fois avec les mémes caractéristiques, elle comptera
doublement dans les calculs de moyenne ou de corrélation, introduisant un biais.

Toutefois, avant de supprimer automatiquement les doublons (deduplication), il convient de
faire preuve de discernement. En effet, certaines observations peuvent paraitre identiques
en apparence (mémes valeurs pour certaines variables) tout en correspondant a des
individus distincts ou a des situations répétées mais valides. Une analyse contextuelle est
donc nécessaire pour distinguer les doublons réels des cas légitimes de redondance.

>» Exemple 1.7 - En Python, la bibliothèque pandas propose des outils efficaces pour la
détection et la suppression des doublons, notamment les deux méthodes : duplicated(),
qui identifie les lignes répétées, et drop duplicates(), qui permet de les éliminer
automatiquement.

L'extrait de code     1.9 permet   de détecter et de supprimer les doublons         dans le jeu de
données Titanic.

Extrait de code    1.9 - Détection et suppression des doublons dans le jeu de données Titanic.
    # Nombre de lignes avant        traitement
    n_initial = len(df)

    # Détection des doublons
    duplicates    = df.duplicated()
    n_duplicates = duplicates.sum()

    # Suppression des doublons (on conserve          la   première   occurrence}
    df.no_duplicates = df.drop.duplicates()
    n_final     = len(df   no_duplicates)

La méthode duplicated() considère qu'une ligne est un doublon si toutes les valeurs
de toutes les colonnes sont strictement identiques à celles d’une ligne précédente (par
défaut). Autrement dit, deux lignes sont considérées comme des doublons si elles sont
identiques champ par champ (même contenu, même ordre, pas seulement une valeur
identique partielle). Cela dit, il est possible de personnaliser la détection des doublons en
spécifiant un sous-ensemble de colonnes à prendre en compte. Par exemple, la commande
 df.duplicated(subset=[’Nom’]) permet d'identifier les doublons uniquement sur la base
de la colonne     Nom, indépendamment       des autres colonnes. Ainsi, deux lignes portant le
même nom seront considérées comme des doublons, même si elles diffèrent par l’âge ou
d’autres attributs. Cette approche est particulièrement utile lorsqu'on souhaite détecter
des redondances sur des variables importantes sans exiger une correspondance parfaite
sur l’ensemble des données.

et les autres valent 0. La variable est encodée selon :
Jrot : M + 0,1%,      fhotfrru) = (0,...,1.....0)
avec un 1 à la position / et des 0 ailleurs.

Imaginons une variable catégorielle qui représente les couleurs, avec les modalités
suivantes : Rouge, Vert, et Bleu. Pour représenter cette variable avec un encodage one-hot,
nous créons un vecteur binaire pour chaque modalité. Le nombre de dimensions k est égal
au nombre de modalités, ici k = 3. L'encodage One-Hot pour 3 modalités est donné par :
fhot : WU — {0.1}" avec M      = {Rouge. Vert. Bleu}. Nous obtenons :

             frot(Rouge) = (1.0.0).       frot(Vert) = (0.1.0).    fhot(Bleu) = (0.0.1)

Cette méthode évite l'introduction d’un ordre artificiel entre les modalités et est compatible
avec la majorité des modèles d'apprentissage machine.

Encodage binaire

L'encodage binaire (binary encoding) constitue une méthode d’encodage plus compacte des
variables catégorielles. Il consiste, dans un premier temps, à attribuer à chaque modalité
une valeur entière unique. Cette valeur est ensuite représentée sous forme binaire à l’aide
de {log,(k)| bits, où & désigne le nombre total de modalités distinctes.
Lencodage binaire permet de réduire la dimensionnalité de l'espace de représentation
par rapport à l'encodage one-hot, tout en conservant une différenciation unique entre les
modalités. Par exemple, si nous avons 4 modalités { 4. B.C’. D}, l'encodage binaire donne :

            fbin(À) = (0.0),    fom(B)    = (0.1).   fom(C)   = (1.0).      Fom{D)    = (1,1)

Cet encodage est plus compact que l'encodage one-hot, car il nécessite seulement /log.(h)|
bits pour représenter k modalités, réduisant ainsi la dimensionnalité des données tout en
conservant une représentation unique pour chaque catégorie.

           Le choix de la méthode        d’encodage doit être guidé par plusieurs considérations
           pratiques. Il dépend tout d’abord de la nature des modalités, en particulier de l'existence
           ou non   d'un ordre entre elles. Il est également      influencé par le type de modèle
           utilisé : certains algorithmes, comme     les arbres de décision, sont capables de gérer
\¥         directement des variables catégorielles encodées, tandis que d'autres exigent des
           variables strictement numériques. Le nombre de modalités est un facteur déterminant,
FS         dans la mesure où l'encodage one-hot peut entraîner une explosion de la dimension du
           jeu de données, rendant les calculs plus coûteux et le modèle plus complexe. Enfin, le
           risque de surapprentissage, notamment dans le cas de l'encodage par cible, doit être
           pris en compte. Une attention particulière doit aussi être portée aux modalités rares,
           dont le traitement inadéquat peut introduire des biais ou des inefficacités de calcul.

> Exemple 1.8 - En Python, la bibliothèque              pandas    propose     des    outils   faciles   pour
l'encodage des variables catégorielles.
Lextrait de code 1.10 permet de nettoyer et encoder la variable embarked, Cette variable
indique le port depuis lequel chaque passager est monté a bord du navire. Elle prend

        chaque modalité en une valeur numérique ordonnée, selon un ordre arbitraire.
  —     L'encodage entier simple, illustré par la colonne embarked. int, associe à chaque
        catégorie un entier distinct, sans introduire de relation d'ordre entre les modalités.
  —     L'encodage binaire, correspondant aux colonnes embarked bin 6 et embarked_bin_1,
        transforme la valeur entière associée à chaque modalité en représentation binaire,
        répartie sur plusieurs colonnes.

         Encodage   de        la    variable    ‘embarked'

              embarked             embarked    ordinat   embarked.int        embarked   bin   @   embarked.   bin   1
        to)              Ss                        2.0                  2                     1                     ic}
        1                (a                        9.0                 ic}                    6                     ic}
        2                 s                        2.0                  2                     1                     Q
        3                 S                        2.6                  2                     1                     0
        4                 S                        2.0                  2                     1                     io)

1.4.7         Discrétisation des variables continues
La discrétisation (discretization) est une opération de prétraitement qui consiste a
convertir une variable continue (quantitative) en une variable catégorielle, en la divisant
en intervalles ou classes disjointes.
La discrétisation permet d’adapter certaines variables continues à des modèles ou
des méthodes d’analyse qui exigent des entrées catégorielles, ou encore de faciliter
l'interprétation des résultats. Il existe plusieurs stratégies pour discrétiser une variable
continue, chacune ayant ses avantages et ses limites.

  —     La discrétisation uniforme divise les données en intervalles de largeur égale, ce qui
        est simple à appliquer mais peut être inefficace si les données sont très concentrées
        dans certaines zones.
  —     La discrétisation par fréquence répartit les données en intervalles contenant le
        même nombre d'observations, ce qui permet d'assurer une répartition plus équilibrée
        des valeurs, mais peut créer des intervalles de tailles variables.
  —     La discrétisation basée sur les quantiles divise les données en intervalles
        basés sur des percentiles, garantissant que chaque intervalle représente une
        proportion égale des données, ce qui est particulièrement utile pour des distributions
        asymétriques.

Chacune de ces méthodes présente des avantages pour certains types de données, mais
leur choix dépend de la distribution des données et des objectifs de l'analyse.

Sans entrer dans les détails d’implémentation, le langage Python offre, via la bibliothèque
pandas, des outils particulièrement adaptés à la discrétisation des variables continues. La
fonction cut() permet de partitionner une variable numérique en intervalles discrets
définis soit manuellement, soit automatiquement en spécifiant le nombre de classes
souhaitées; chaque observation est ainsi assignée à un intervalle donné. Cette méthode

## 1.5 Partitionnement des données

1.5.1    Données d'entraînement,                  de test et de validation
Le partitionnement des données en apprentissage machine consiste à diviser le jeu de
données en trois sous-ensembles : un ensemble d'entraînement, un ensemble de validation
et un ensemble de test (voir la figure 1.15).

                        (a)              Entrainement
                                                                                   |
                        (b)       Entrainement        Validation [ESC]                 |

                    =                                                   |
Figure 1.15 - Partitionnement du jeu de données : (a) en un ensemble de données d'entraînement
et un ensemble de données de test et {b) en un ensemble de données d'entraînement, de test et de
validation.

Ensemble de données d'entraînement              (training set) qui est un sous-ensemble de
données utilisé pour l'entraînement des paramètres du modèle. Ces données sont utilisées
pour apprendre les relations, les motifs et les caractéristiques des données, de sorte que le
modèle puisse effectuer des prédictions précises sur de nouvelles données.

Ensemble     de données       de test    (test set) qui une partie distincte de l’ensemble de
données qui n’a pas été utilisée pendant l'entraînement du modèle. Cet ensemble est
réservé à l'évaluation des performances du modèle après l'entraînement. Les données de
test permettent de vérifier si le modèle généralise bien à de nouvelles données qu'il n'a
jamais vues auparavant.

Ensemble de données de validation         (validation set) qui est une sous-partie de
l’ensemble de données     d'entraînement qui   est généralement exclue du processus
d'entraînement initial. Cet ensemble sert à ajuster les hyperparamètres du modèle
en fournissant une évaluation indépendante de la performance du modèle pendant
l'entraînement. Les données de validation aident à éviter le surapprentissage.

           Dans la littérature, la distinction entre les ensembles de validation et de test est
           parfois source de confusion, car leur usage peut varier selon le protocole expérimental
           adopté. Classiquement, les données sont séparées en trois sous-ensembles : un ensemble
           d'entraînement, utilisé pour optimiser les paramètres du modèle; un ensemble de
           validation, destiné à surveiller la performance pendant l'entraînement et à ajuster les
           hyperparamètres ; et un ensemble de test, réservé à l'évaluation finale du pouvoir de
@          généralisation. Toutefois, certains travaux, notamment en deep learning, se limitent a
           un découpage en deux ensembles (entraînement et test), en intégrant implcitement la
           validation au sein de l’entraînement, soit via un sous-échantillonnage automatique, soit
           via des techniques de validation croisée. Cette variabilité dans la terminologie contribue
           à la confusion fréquente entre les notions de validation et de test. L'essentiel réside ainsi
           davantage dans le rôle fonctionnel de chaque sous-ensemble tout au long du processus
           d'apprentissage et d'évaluation, plutôt que dans leur seule dénomination.

                                                                1.5.   Partitionnement
                                                                                    des données

Complexité du modèle
Un modèle complexe, tel qu’un réseau de neurones profond, requiert généralement une
grande quantité de données d'entraînement afin de limiter le risque de surapprentissage.
En effet, le grand nombre de paramètres à estimer impose une diversité suffisante des
exemples afin d'assurer une généralisation adéquate. Il est donc courant d’allouer entre
85 % et 90 % du jeu de données à l'entraînement, même si cela implique de réduire la taille
des ensembles de validation et de test.

À l'inverse, un modèle plus simple, comme une régression linéaire ou logistique, peut
être entraîné efficacement avec un nombre plus restreint d'échantillons. Cette moindre
exigence en volume d'apprentissage permet alors de réserver une plus grande proportion
des données pour la validation et le test, offrant une évaluation plus robuste de la capacité
de généralisation du modèle.

Coût d’entrainement

Le coût d'entraînement constitue un facteur limitant important, notamment lorsque les
ressources matérielles sont restreintes ou que le temps de calcul est critique. Dans ce
contexte, il peut être judicieux de réduire la taille de l’ensemble d'entraînement pour
accélérer les calculs. Afin de ne pas compromettre la qualité de l'évaluation du modèle, le
recours à des techniques comme la validation croisée est aussi conseillé dans ce cas.

1.5.3    Reproductibilité
La reproductibilité vise à garantir que les résultats obtenus lors de l'entraînement et
de l'évaluation d'un modèle, à la suite du partitionnement des données, puissent être
reproduits de manière fiable. En effet, le partitionnement repose généralement sur des
opérations aléatoires. Sans cette précaution, deux exécutions successives d’un même
algorithme d'apprentissage peuvent aboutir à des performances différentes, compliquant
ainsi la comparaison entre modèles ou la validation indépendante des résultats. La
reproductibilité est donc importante non seulement pour la rigueur scientifique, mais
aussi pour la collaboration entre chercheurs ou praticiens, ainsi que pour la documentation
et la traçabilité des modèles déployés.

           En apprentissage automatique, de nombreuses opérations reposent sur des processus
           aléatoires, influençant ainsi les résultats obtenus. Parmi ces opérations, nous
           retrouvons la séparation des données en ensembles d'entraînement et de test, où
           fixer random state permet de garantir une répartition constante des données à chaque
           exécution, évitant ainsi des variations dans les performances du modèle. L'initialisation
«K#        des poids dans les réseaux de neurones est également soumise à l’aléatoire, et une
LAN        initialisation différente peut entraîner des trajectoires d'apprentissage divergentes.
           Fixer random state assure une sélection cohérente et permet des comparaisons fiables
           entre différentes expériences. Sans cette fixation, les résultats peuvent varier à chaque
           exécution, rendant difficiles la reproductibilité et la validation des modèles. En revanche,
           en attribuant une valeur fixe à random. state, vous garantissez que chaque exécution
           produit les mêmes résultats, facilitant ainsi la comparaison des différents modèles.

## 1.6 Validation croisée

caractéristiques utilisées pour entraîner le modèle et y le vecteur des étiquettes (labels),
représentant les valeurs de la variable cible associées aux observations de X.

Dans cet exemple, nous divisons l'ensemble des données en trois sous-ensembles : un
ensemble de données d'entraînement, un ensemble de test et un ensemble de validation
(respectivement X train, X test, et X valid) (voir l'extrait de code 1.11)

Extrait de code 1.11 - Division de l’ensemble des données en trois sous-ensembles : entraînement,
test et validation.
      from   sklearn.datasets import              make_classification
      from   sklearn.model_selection              import train_test_split

      # Génération    de données factices pour l'entrainement et le test
      # X contient    les caractéristiques des échantillons (1000 lignes x 20 colonnes)
      # y regroupe    les étiquettes de classification (0 ou 1)
      X,   y = make_classification(n samples-1000, n. features::20, n_classes=2,
             random state=42)

      # Séparation    du   jeu    de    données     initial   en   un   ensemble   d'entraînement     (80%)    et
             un ensemble   de    test    (20%).
      # La  stratification se fait selon les étiquettes y
      X train, X test, y.train, y. test = train_test_split(X,                       y,   test. size-0.2,
           stratifysy,   random state-42)

      # Séparation de X train en            70% pour entrainement  et 30% pour validation.                    Cette
           instruction écrase les           anciennes variables X train et y train.
      X train, X valid, y.train,            y valid = train_test_split(X train, y_train,
           test. size-0.3)

1.6        Validation            croisée
Le partitionnement des données en ensembles d'entraînement et de test peut introduire
un biais, lié à la manière dont les données sont séparées. Ce biais survient lorsque la
répartition des individus entre les deux sous-ensembles n’est pas représentative de la
distribution réelle des données, ce qui peut affecter la validité de l'évaluation du modèle.
La validation croisée est une technique d'évaluation des modèles d’AM via la formation
de plusieurs modèles sur différents sous-ensembles de données d'entraînement et de test.
Elle atténue le biais potentiel lié à une partition spécifique des données et évite ainsi que
les résultats de l'évaluation ne soient trop dépendants de la manière dont les données ont
été divisées.
Il existe plusieurs méthodes de validation croisée, qui partagent des principes
fondamentaux, tout en étant chacune adaptée à des situations spécifiques. Les méthodes
les plus fréquemment utilisées sont : la validation croisée k-fold, la validation croisée Leave-
One-Out , la validation croisée de Monte Carlo, ainsi que la méthode One-Subject-Out.
Cette derniére est particuliérement utile lorsque les données sont regroupées par entité,


Ce type de validation permet d'évaluer la performance d'un modèle de manière exhaustive,
en exploitant chaque individu du jeu de données comme échantillon de test unique à tour de
rôle. Il est particulièrement adapté aux petites bases de données, car il maximise l’utilisation
des données disponibles pour l'entraînement tout en garantissant une évaluation robuste
et non biaisée du modèle,
La validation leave-one-out s'avère également pertinente dans des contextes à haute
dimensionnalité (petit n, grand p), où le nombre d'observations est limité mais le nombre
de variables explicatives est élevé. Dans ces situations, elle offre la possibilité d'exploiter
chaque observation pour améliorer la stabilité de l'entraînement, tout en conservant une
estimation fidèle de la performance généralisée.

Toutefois, cette méthode peut être coûteuse en calcul, car elle nécessite » entraînements
distincts du modèle, ce qui devient contraigant pour des ensembles de données volumineux
ou des modèles à forte complexité computationnelle.

1.6.3     Validation croisée de Monte Carlo
La validation croisée de Monte Carlo, aussi connue sous le nom de Shuffle Split est
une méthode de validation où le jeu de données est aléatoirement subdivisé plusieurs
fois en ensembles d'entraînement et de test. Contrairement aux méthodes de validation
croisée k-fold ou Leave-One-Out, où les subdivisions des données suivent une structure
prédéterminée, la validation croisée de Monte Carlo repose sur des tirages aléatoires
répétitifs, ce qui peut offrir une évaluation plus flexible et statistiquement représentative
de la performance du modèle

1.6.4     Validation croisée One-Subject-Out
La validation croisée One-Subject-Out, aussi appelée plus généralement Leave-One-Group-
Out, est une variante particulière de la validation croisée, adaptée aux contextes dans
lesquels les données sont structurées en groupes non indépendants, comme des sujets, des
patients, des capteurs ou des locuteurs. Contrairement aux méthodes classiques telles que
la validation k-fold, où les observations sont supposées être indépendantes, cette approche
vise à préserver l'intégrité des groupes en laissant de côté l’ensemble des observations
associées à un seul sujet pour évaluer le modèle, tandis que les données des autres sujets
sont utilisées pour l’entraînement. L'opération est répétée autant de fois qu’il y a de
groupes, chaque sujet servant une fois pour la validation du modèle.

Cette stratégie permet d'évaluer plus justement la capacité du modèle à généraliser à de
nouveaux individus, ce qui est fondamental dans des domaines comme la biomédecine, la
psychologie expérimentale et la reconnaissance vocale. En garantissant l'indépendance
entre   les ensembles   d'entraînement    et de test au niveau      des entités, la validation
One-Subject-Out permet      de limiter le risque de surévaluation    des performances      lié au
chevauchement des données.

» Exemple 1.10 - Dans cet exemple, nous résumons les différentes fonctions qui
permettent de réaliser une validation croisée. Nous importons les méthodes requises

Finalement,     pour   réaliser   une     validation   croisée   de   Monte    Carlo,   nous    utilisons     la
fonction     ShuffleSplit    qui permet       de diviser les données          de manière       aléatoire     en
ensembles d'entraînement et de test pour un nombre spécifié d’itérations (dans l'exemple
 n splits=10). Dans ce cas, 30 % des données sont utilisées pour le test à chaque itération
(test_size=0.3) et le reste pour l'entraînement. L’argument random. state=42 est utilisé
pour obtenir des résultats reproductibles.

L'évaluation du modèle est faite selon les différentes stratégies (ligne 24-26 du code 1.12)
en utilisant une validation croisée k-fold ( cv=kf ).

1.7        Évaluation d’un système d’AM
L'évaluation d’un système d’AM permet de déterminer son efficacité et sa performance.
Selon l'objectif du système à évaluer et de la tâche ciblée (par exemple, une tâche de
classification, de regroupement ou de prédiction), des métriques spécifiques peuvent être
choisis.

1.7.1      Métriques pour les modèles de classification
Exactitude

L'exactitude, aussi appelée taux de classification (accuracy), mesure le nombre de
prédictions correctes du modèle par rapport au nombre total d'individus. C’est l'une
des métriques les plus couramment utilisées pour les tâches de classification.

Formellement, soit un ensemble de données de test (ou d'entraînement) composé de m
observations, le taux de bonnes classifications correspond à la fraction d'observations
correctement prédites par le modèle, et se définit par :

                                   Exactitude = Ee S Wh =y)                                                (1.6)
                                                 ma

      « §, est la prédiction du modèle pour l'individu i,
      « y. est la valeur réelle (vraie étiquette) de l'individu /,
      « 1(-) est la fonction indicatrice, qui vaut 1 si la condition est vraie, 0 sinon.
Le taux de classification est généralement donné en pourcentage.                   Il lui correspond une
valeur complémentaire à 100, qui est le taux d'erreur « :

                                        «(%) = 100 — Exactitude(%)

Matrice de confusion

La matrice de confusion (confusion matrix) est aussi appelée matrice d’erreur ou tableau
de contingence ou matrice d'erreur de classification. Sur les lignes de cette matrice, nous
y retrouvons les classes réelles (vérités terrain) et sur les colonnes, les classes prédites

## 1.7 Évaluation d'un système d’AM

à identifier tous les exemples positifs dans un ensemble de données, dans un problème
de classification binaire. Il est particulièrement important lorsque les faux négatifs sont
coûteux, comme dans la détection de maladies. En effet, un faux négatif signifie qu’un
modèle prédit incorrectement qu’un patient est sain alors qu'il est en réalité malade. Ce
type d'erreur peut avoir des conséquences majeures. Dans ce contexte, minimiser les faux
négatifs est essentiel, ce qui implique un rappel élevé. Le rappel est donné par la relation :

                                                       Vrais Positifs (VP)
         Rappel = Taux de vrai positif =
                                           Vrais Positifs (VP) + Faux Négatifs (FN)

Lorsque nous souhaitons combiner à la fois le rappel et la précision en une seule métrique,
nous utilisons la Fl-mesure (Fi Score) qui est la moyenne             harmonique   de ces deux
métriques. La F1-mesure est donnée par :

                                          Précision x Rappel
                                Fl =2   x ————
                                          Précision + Rappel

Les mesures d’évaluation telles que la précision, le rappel et le Fi-score sont
particulièrement utiles pour évaluer les modèles de classification, notamment lorsque
les classes sont déséquilibrées, c’est-à-dire qu'une classe est significativement sous-
représentée par rapport à une autre. Ce déséquilibre est fréquent dans de nombreux
domaines d'application, tels que la détection de fraudes, la diagnostique de maladies rares
ou la filtration de courriels indésirables, où les événements d'intérêt (fraude, maladie,
spam) apparaissent rarement en comparaison des cas dits normaux.

Dans ces situations, une métrique globale comme l’accuracy (taux de bonnes prédictions
globales) peut être trompeuse. Par exemple, dans un jeu de données médicales où seulement
0.1 % des patients sont atteints d'une maladie rare, un modèle qui classifie tous les patients
comme « sains » obtiendrait une précision de 99.9 %, tout en ignorant complètement les cas
réellement malades. C’est pourquoi le rappel, la précision et le Fi-score sont nécessaires
pour bien évaluer la performance d'un modèle dans ces contextes.

En complément du F1-score, le F;-score (ou beta-score) est une mesure de performance
en classification binaire qui en constitue une généralisation. Il permet de pondérer
différemment la précision et le rappel à l’aide d’un paramètre 3 > 0), selon l'importance
relative que nous souhaitons accorder à l'un ou l’autre.

Le F,-score est défini par la formule suivante :

                                              Précision - Rappel
                          F3 =(1+,%).
                                           (3°. Précision) + Rappel

Le paramètre   3 permet d’ajuster la balance entre ces deux métriques :
  —   Si 3 > 1, le F,-score accorde plus d'importance au rappel;
  —   Si3< 1, il favorise davantage la précision.
Le F,-score se révèle ainsi particulièrement utile dans les contextes où les coûts associés
aux erreurs de classification ne sont pas symétriques. Il constitue une alternative plus

                                                                                 1.7. Évaluation d'un système d'AM

> Exemple 1.11 - Dans cet exemple, nous résumons différents aspects vus dans ce
chapitre, y compris les fonctions qui permettent de mesurer les métriques d'évaluation
d’un système de classification. Outre les bibliothèques de base (numpy et matplotlib),
plusieurs autres bibliothèques et méthodes sont nécessaires. Elles sont mentionnées dans
le code qui les utilise, lorsque cela est nécessaire, afin de faciliter la compréhension.

Nous générons un jeu de données synthétiques contenant 1000 échantillons, chacun décrit
par 20 caractéristiques et appartenant à l’une des deux classes : 0 ou 1. Ce jeu de données
est créé à l’aide de la fonction make classification, couramment utilisée pour produire
des ensembles de données artificiels adaptés aux problèmes de classification supervisée
{voir l'extrait de code 1.13). Le paramètre random state est spécifié afin d'assurer la
reproductibilité des résultats.

Extrait de code        1.13 - Génération et partition des données.

         from   sklearn.model         selection        import     train    test. split
         from   sklearn.datasets            import     make     classification

         # Géreration de données factices pour l'entrainement et le test
         # X représente la matrice des caractéristiques avec 1000 échantillons                                           et   20
             variables
         #y est le vecteur des étiquettes de classe (0 ou 1) pour un probleme                                            de
             classification binaire
         X,   y = make_classification(n.samples=1000,                         # Nombre    total      d'échantillons
                        n_features=20,               # Nombre de caractéristiques par échantillon
                        n_classes=2,                 # Classification binaire (deux classes : @ et                             1)
                        random_state=42)             # Reproductibilité des résultats

         # Séparation     du    jeu    de    données     en     ensemble     d'entraînement         et    de    test
         # 70% des    données     sont       utilisées        pour   l'entrainerent,       30% pour            le test
         X train,    X.test, y_train,           y. test = train            test_split(X, y,
                       test_size=0.3,              # Proportion            des données allouées            au    test
                        random.state=42)             # Assurer       la reproductibilité            du découpage

Les données          générées sont divisées en deux sous-ensembles                                distincts       : un ensemble
d'entraînement et un ensemble de test, afin d’évaluer la performance du modèle de manière
impartiale :
     . X train      et Xtest      désignent respectivement les entrées du modèle pour
          l'entraînement et le test. Ces matrices contiennent les caractéristiques utilisées
          pour prédire la classe cible.
     +    y train et y test correspondent aux valeurs                             cibles associées              à ces ensembles,
          représentant les classes réelles à prédire.
À l'aide de la classe             RandomForestClassifier                   de la bibliothèque             scikit-learn,             nous
entraînons un modèle de forêt aléatoire pour la classification des deux classes. Une fois le
modèle ajusté aux données d'entraînement, nous effectuons des prédictions sur l’ensemble
de test.

La   variable        y pred     contient        ainsi    les     classes     prédites    par   le        modèle        pour   chaque

F1 (f1-score) et le support (support ), offrant ainsi une vue d'ensemble                               détaillée des
performances du modèle pour chaque classe (voir l'extrait de code 1.16).

Extrait de code 1.16 - Rapport de classification.
     from     sklearn.metrics         import     classification       report

     print("\nClassification                Report     :\n",   classification      report(y   test,    y.pred))

Le rapport de classification plus-bas indique que le modèle a de bonnes performances
générales avec une exactitude de 86 %. Pour chaque classe, le modèle présente des scores
équilibrés pour la précision, le rappel et le score F1 (tous autour de 0.86). La précision
(0.89) est légèrement plus élevée pour la classe 1 alors que le rappel (0.83) est légèrement
plus bas pour cette classe.

Le chiffre 300 sur la ligne accuracy dans le rapport fait référence au nombre total
d'individus dans l’ensemble de test. Alors que les chiffres 145 et 155 indiquent le nombre
d'individus de test par classe (respectivement 0 et 1).

      Classification           Report :
                               precision             recall    fl-score        support

                        6            0.83             8.89        0.86             145
                        1            0.89             0.83        0.86             155

           accuracy                                               0.86             300
         macro avg                   0.86            6.86         6.86             300
      weighted avg                   0.86            0.86         0.86             300

Finalement, il est également possible d’avoir un affichage graphique de la matrice                                de
confusion via la classe ConfusionMatrixDisplay (voir l’extrait de code 1.17).

Extrait de code     1.17 - Affichage de la matrice de confusion et de la matrice de confusion
normalisée.
     import     numpy       as np
     import matplotlib.pyplot as                 plt
     from sklearn.metrics import                 ConfusionMatrixDisplay,            confusion_matrix

     # Calcul de         la matrice de confusion
     conf_matrix        = confusion matrix{y_test,               y_pred)

     # Normalisation           de   la matrice       de confusion     (par     ligne)
     conf_matrix_normalized             = conf_matrix.astype(‘float               }) /
            conf_matrix.sum(axis=1)[:,                 np.newaxis]

     # Création des sous-graphiques
     fig, ax = plt.subplots(1, 2, figsize=(12,                       5))

bonne capacité de distinguer entre les classes. Plus l'AUC est proche de 1, meilleure est la
capacité du modèle.

                                                        Courbe ROC
                                 1.0
                           =
                           fos

                           Ë
                           Boe
                           2a
                           £04
                            wo
                           T
                            É 0.2
                           Ë
                                 ow                v=   Courbe   ROC   (AUC = 0.92)

                                       0.0   0.2        04       0.6      0.8     1.0
                                               Taux de Faux Positifs (FPR)

Figure 1.20 - Courbe ROC (AUC). La courbe pointillée représente la ligne de référence ou la ligne
de classification aléatoire. Elle a une pente de 45 degrés, allant du point (0,0) au point (1,1) et sert
de base de comparaison pour évaluer la performance des modèles.

1.7.2     Métriques pour les modèles de regroupement
Les modèles de regroupement, également appelés modèles de clustering, ont pour objectif
d'organiser les données en ensembles homogènes sur la base de leurs caractéristiques
intrinsèques, sans recourir à des étiquettes préalablement définies comme en apprentissage
supervisé. Ces modèles cherchent à détecter des structures sous-jacentes ou des modèles
latents dans les données, en partitionnant l’espace des observations de manière à ce que
les éléments appartenant à un même groupe (ou cluster} présentent un degré de similarité
plus élevé entre eux qu'avec ceux des autres groupes.

Indice de silhouette

L'indice de silhouette (Silhouette index) mesure la cohésion et la séparation des clusters.
Pour un point i, l'indice de silhouette s{/) est défini par :

                                                   _~ max{a{i).b(i))
                                                       D) at)
   + a(i) est la distance moyenne calculée entre le point i et tous les autres points dans le
     même cluster
   « b{i) est la distance moyenne calculée entre le point i et tous les points dans le cluster
     le plus proche auquel il n'appartient pas.


L'indice Davies-Bouldin

L'indice Davies-Bouldin (Davies-Bouldin Index, DBI) évalue la qualité du clustering en
fonction de la compacité des clusters et de la séparation entre eux.
L'indice Davies-Bouldin est défini comme suit :

                                                    A            .        9

                                    DB = qu              max (a)
                                                    an         dU. fr)

   + st est la cohésion du cluster k (comme dans la métrique de cohésion ci-dessus).
   « d(jtx. 2) est la distance entre les centroides des clusters C'; et C,.
   . À est le nombre total de clusters.

Un indice de Davies-Bouldin faible suggère un clustering de haute qualité, caractérisé
par des clusters bien distincts et une faible dispersion interne. En revanche, un DBI élevé
indique une segmentation sous-optimale, où les clusters sont insuffisamment séparés
et présentent une forte variance interne, suggérant un regroupement imprécis des données.

> Exemple 1.12 - Dans cet exemple, nous résumons différentes métriques d'évaluation
d'un modèle de regroupement.

Nous générons un jeu de données de 300 échantillons répartis en 4 clusters avec une
dispersion de 1.2 pour chaque cluster (voir l'extrait de code 1.18). La fonction make blobs
est utilisée pour générer les données. La variable X contient les caractéristiques, et
la variable cible y true contient les étiquettes de chaque échantillon, représentant
l’appartenance à un cluster spécifique. Nous convenons que, dans un problème de
clustering, il n'existe pas réellement de variable cible. Nous l'avons ajoutée ici uniquement
pour faciliter la compréhension du modèle.
Lalgorithme de regroupement utilisé est le k-means (KMeans ), où nous spécifions que les
données doivent être regroupées en quatre clusters ( center=4 ),

Extrait de code      1.18 - Regroupement des données via l'algorithme K-means.
    from   sklearn.datasets       import    make. blobs
    from   sklearn.cluster       import    KMeans

    # Fixer     la   graine   aléatoire    pour     la   reproductibilité
    np. random. seed (42)

    # Générer        des données synthétiques
    X, y-true        = make blobs(n.samples=300,           centers=4,         cluster_std-1,2)

    # Appliquer le clustering avec            K-Means
    kmeans = KMeans(n_clusters=4)
    y_kmeans      = kmeans.fit_predict(X)

                                                                                       1.7. Evaluation d'un système d’AM

De plus, la séparation inter-cluster s'élève à 12.69. Cette mesure, qui représente la distance
moyenne entre les centres des différents clusters, est relativement élevée, ce qui indique
que les groupes sont bien distincts les uns des autres. La figure 1.21 illustre cette
séparation, où chaque cluster est représenté par des points colorés, et les centroïdes,
marqués par des croix rouges, montrent clairement la distance significative entre les
groupes.

                                                                                                   e
                         a
                          g     5          °                                                    LE °                      |
                |        23                                                                é                 #        |   |
                        5                                                              °
                         Ë      oo:                                                                      6 29
                |         €
                        is)5                                                                    @ Cluster 1               |
                               -5}                 e               e                            ©        Cluster2     |
                                                                                                                          |
                    |                                                                           @ Cluster 3                   |
                                       88                                                       ©        Cluster 4
                |                              e             oO   °°                            %    = Centroids
                                                                                                         _——
                                                                                                                          |
                                                                                                                          |
                |               “125-100           -75        -30       -25      00        25       50           75
                                                                   Caractéristique 1                                      |

                =                                        —                                                                J

Figure   1.21 - Visualisation des clusters obtenus avec l'algorithme k-means. Chaque point
représente une donnée, colorée en fonction de son appartenance à un cluster. Les croix rouges
indiquent les centroïdes de chaque cluster, représentant le centre de gravité des groupes formés.

            À toutes ces métriques qui sont spécifiques à la tâche du système d’IA, s'ajoutent des
            métriques d'ordre général comme le temps d'exécution (Inference Time). Il représente
V2          le temps nécessaire pour exécuter une opération, une tâche ou un ensemble de calculs
PK          dans un modèle d’IA, Le temps d'exécution affecte directement la performance                                          et
            l'efficacité d'un système d’IA, particulièrement pour les applications en temps réel. Sa
            mesure peut être déterminante dans le choix du modèle d'IA.

1.7.3      Métriques pour les modèles de régression
Les modèles de régression sont utilisés pour prédire des valeurs continues. L'évaluation
de la performance de ces modèles repose sur diverses métriques spécifiques à une tâche
de régression. Dans ce qui suit, un résumé des principales métriques d'évaluation des
modèles de régression, sachant qu’elles seront examinées plus en détail dans le chapitre 2,
où chaque concept sera illustré à l’aide de plusieurs exemples pratiques.

Erreur quadratique moyenne

L'erreur quadratique moyenne (Mean Squared Error, MSE) mesure la moyenne des carrés
des différences entre les valeurs prédites et les valeurs réelles. Cette métrique met l’accent

## 1.8 Sous-apprentissage et surapprentissage

            Il n'existe pas    de seuil universel            ou     normatif     qui permet    d'affirmer de manière
            absolue    si un coefficient de détermination                 R? est « élevé » ou « faible ». Cette
            appréciation      dépend   fortement       du    contexte      d'application,     du domaine     scientifique
            et de la nature des données [ |, 1: ]. Par exemple, en physique expérimentale, où les
            systèmes sont souvent bien maîtrisés et où les mesures sont assez précises, un R
            supérieur à 0,90 est généralement attendu. En revanche, dans les sciences sociales,
\¥          un À? compris     entre 0,3 et 0,5 est souvent considéré comme satisfaisant. Dans des
CN          domaines    encore plus incertains comme la prévision du comportement humain, des
            valeurs inférieures à 0,3 sont courantes et acceptées. Ainsi, un A” = 0.25 peut être jugé
            excellent s’il s’agit d'un modèle prédictif du comportement d'achat. Finalement, à titre
            purement indicatif, certaines classifications empiriques qualifient un R? supérieur à 0,9
            de très bon, entre 0,7 et 0,9 de bon, entre 0,5 et 0,7 de moyen, entre 0,3 et 0,5 de faible,
            et inférieur à 0,3 de très faible. Toutefois, ces repères doivent toujours être interprétés
            à la lumière du domaine d'application et des objectifs du modèle.

1.8      Sous-apprentissage et surapprentissage
Le    sous-apprentissage        (underfitting)     et       le     surapprentissage          (overfitting)    sont   deux
problèmes courants en AM qui affectent la capacité d'un modèle à généraliser à de nouvelles
données [| ’]. La généralisation étant l'aptitude d’un modèle à faire des prédictions précises
sur de nouvelles données qui n’ont pas été utilisées lors de son entraînement.

Le   sous-apprentissage        sous-entend       que        le modèle       prédictif,      généré    lors de la phase
d'apprentissage, s'adapte mal aux données d'entraînement (voir la figure 1.22 (a)). Il
survient lorsque le modèle est trop simple ou peu complexe par rapport à la complexité des
données. Dans un tel cas, le modèle présente une mauvaise performance à la fois sur les
données d'entraînement et sur les nouvelles données (données de test). Ainsi, le modèle ne
pourra pas généraliser sur de nouvelles données.

Le surapprentissage se produit lorsqu'un modèle est trop complexe par rapport à la
quantité de données d'entraînement dont il dispose. Ainsi, le modèle apprend « par cœur »
la structure des données (voir la figure 1.22 (c)). Un tel modèle colle trop les données
d'entraînement. Il aura de très bonnes performances sur les données d'entraînement, mais
sera mauvais sur de nouvelles données.

            En pratique, les termes sous-ajustement et sous-apprentissage (et, par analogie,
            surajustement et surapprentissage) sont parfois utilisés de manière interchangeable,
            bien qu'ils renvoient à des contextes conceptuels distincts. Le sous-ajustement
            désigne    généralement      un   modèle             trop   simple   ou   mal    adapté   à la complexité
            des données, incapable d'en capturer les structures sous-jacentes, même après
            un entraînement complet. À l'inverse, le sous-apprentissage fait référence à un
            entraînement insuffisant ou inefficace, souvent dû à un arrêt prématuré de l'optimisation
            ou à des hyperparamètres mal choisis. Il convient toutefois de souligner que cette
            distinction, bien qu'utile pour identifier les causes d’une performance insatisfaisante,
            n’est pas toujours explicitement formalisée dans la littérature scientifique, où les termes
            peuvent être employés de manière souple. Sa pertinence dépend donc du niveau de
            précision requis et du contexte de communication.

## 1.10 Modèles génératifs et discriminatifs

Les hyperparamètres sont les configurations externes au modèle, définies par
l'utilisateur avant l'entraînement. Contrairement aux paramètres, ils ne sont pas appris
automatiquement, mais influencent directement la manière dont le modèle apprend et
performe.

En pratique, un algorithme d'apprentissage machine est exécuté à plusieurs reprises,
en ajustant les valeurs des hyperparamètres afin de déterminer les paramètres
optimaux permettant de produire un modèle performant. Ce processus de réglage des
hyperparamètres est communément appelé hyperparameter tuning.

>» Exemple 1.13- Pour mieux comprendre la distinction entre les deux termes
paramètres et hyperparamétres, considérons l'exemple d'un arbre de décision. La
profondeur de l'arbre est un hyperparamètre, car elle définit la structure du modèle avant
même que celui-ci ne soit entraîné. En revanche, les seuils qui séparent les différentes
branches de l'arbre sont des paramètres, car ils sont ajustés au cours du processus
d'apprentissage pour optimiser les performances du modèle.

En pratique, un algorithme d'apprentissage machine est exécuté à plusieurs reprises,
en ajustant les valeurs des hyperparamètres afin de déterminer les paramètres
optimaux permettant de produire un modèle performant. Ce processus de réglage des
hyperparamètres est communément appelé hyperparameter tuning.

1.10      Modèles        génératifs et discriminatifs
En apprentissage machine, deux grandes familles de modèles se distinguent par leurs
objectifs et leur manière d'aborder les données : les modèles discriminatifs et les modèles
génératifs.

Les modèles discriminatifs apprennent à associer une étiquette X” aux données d'entrée
X en estimant la probabilité qu’une observation appartienne à une classe donnée, compte
tenu de ses caractéristiques. Autrement dit, ils modélisent la probabilité conditionnelle :

                                          PY    |X),
L'objectif est de prédire correctement les étiquettes à partir des caractéristiques d’entrée,
sans chercher à comprendre la manière dont ces caractéristiques ont été générées. Ce type
de modèle est bien adapté aux tâches de classification, de régression et de segmentation.
Des exemples courants incluent la régression logistique, les machines à vecteurs de support
(SVM), les réseaux de neurones et les forêts aléatoires.
Les modèles génératifs vont au-delà de la classification en apprenant la distribution
conjointe des données et des étiquettes :

                                          PIX; Y)

Cette approche permet non seulement de prédire les classes, mais aussi de générer de
nouvelles données réalistes x, en échantillonnant à partir de la distribution apprise. Les

                                                 1.10. Modèles génératifs et discriminatifs

été abordées, soulignant l'importance d'une bonne préparation des données pour garantir
des performances optimales.

Les principaux paradigmes d'apprentissage ont été présentés, incluant l'apprentissage
supervisé, où le modèle apprend à partir d'étiquettes connues, l'apprentissage non
supervisé, qui vise à découvrir des structures cachées dans les données, et l'apprentissage
par renforcement,   où un agent apprend en interagissant avec un environnement.

Une attention particulière a été accordée aux paramètres et hyperparamètres, qui
influencent la capacité d’un modèle à généraliser sur de nouvelles données. L'importance
de la séparation des données d'entraînement, de validation et de test a été mise en avant,
tout comme l'usage de la validation croisée, une technique essentielle pour optimiser les
hyperparamètres et éviter les biais dans l'évaluation des performances.
Enfin, nous avons examiné les méthodes d'évaluation des modèles en fonction de leur
type : classification, regroupement et régression. Ces métriques permettent d’objectiver la
qualité des prédictions et d'orienter les choix de modélisation. La problématique du sous-
apprentissage et du surapprentissage a été abordée, illustrant les défis liés à la complexité
des modèles et à leur capacité de généralisation.
Ce chapitre a posé les bases essentielles à la compréhension du développement et de
l'évaluation d’un modèle d'apprentissage machine. Les notions introduites serviront de
fondation pour les chapitres suivants, qui approfondiront les techniques avancées et les
applications spécifiques de l'IA et de l'apprentissage machine.

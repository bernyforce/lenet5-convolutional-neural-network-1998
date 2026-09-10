# 🎙️ Notes Téléprompteur (1 phrase par idée — Style direct)
## Décoder LeNet-5 (1998) : L'Origine de la Vision par Ordinateur

---

### [DIAPO 01/28] — Titre & Introduction
- Bonjour à tous et bienvenue.
- Aujourd'hui, je vous emmène aux origines de la vision par ordinateur.
- Je vais vous montrer comment les machines ont appris à lire notre écriture manuscrite.
- Tout commence en 1998 avec un modèle de légende : LeNet-5.
- En une phrase : ce réseau analyse l'image morceau par morceau avec seulement 60 000 paramètres.
- Grâce à cette idée, les banques ont pu trier automatiquement 20 millions de chèques par jour.

---

### [DIAPO 02/28] — Sommaire : Les 6 piliers
- Voici le plan de ma présentation en six étapes simples.
- D'abord, le défi de la lecture du chiffre manuscrit.
- Ensuite, la brique de base : le neurone artificiel.
- Troisième point : la convolution et la compression de l'image.
- Quatrième point : l'architecture complète en sept couches.
- Cinquième point : son déploiement industriel massif.
- Et pour finir : l'héritage de LeNet-5 dans l'IA que nous utilisons aujourd'hui.

---

### [DIAPO 03/28] — Chapitre 1 : Le Défi du Chiffre
- J'attaque tout de suite avec le premier défi : lire un chiffre écrit à la main.

---

### [DIAPO 04/28] — Comment la machine lit-elle un chiffre ?
- Quand je regarde un chiffre 7, mon cerveau le reconnaît immédiatement.
- Même si le trait est tordu, penché ou mal écrit.
- Pour un ordinateur, c'est totalement différent : il ne voit aucune forme globale.
- Il reçoit seulement une grille de 32 par 32 pixels.
- Ce ne sont que des nombres de 0 pour le blanc à 255 pour le noir.
- Je ne peux pas programmer de règles rigides, car chaque écriture humaine est unique.

---

### [DIAPO 05/28] — Anciens modèles vs LeNet-5
- Avant LeNet-5, les anciens modèles écrasaient cette image en une seule longue ligne.
- En faisant cela, ils cassaient complètement les liens entre les pixels voisins.
- Si le chiffre bougeait d'un millimètre, la machine ne comprenait plus rien.
- L'idée clé de Yann LeCun a été de garder impérativement la forme 2D de l'image.

---

### [DIAPO 06/28] — Chapitre 2 : Outils Révolutionnaires
- Je passe maintenant aux outils qui rendent cette lecture possible.

---

### [DIAPO 07/28] — Le neurone artificiel
- La brique élémentaire, c'est le neurone artificiel.
- Je le vois comme une petite calculatrice ultra-rapide.
- Il prend plusieurs entrées et les multiplie par des coefficients d'importance, les poids.
- Il ajoute un petit réglage appelé le biais et fait le total.
- Si le résultat dépasse son seuil d'activation, le neurone s'allume et transmet le signal.
- C'est cette petite décision, répétée des milliers de fois, qui crée l'intelligence.

---

### [DIAPO 08/28] — Démonstration numérique d'un neurone
- Prenons un exemple concret sous les yeux.
- Avec nos trois entrées pondérées, le neurone calcule un total de 1,50.
- Le seuil exigé ici est de 2,00.
- Comme 1,50 est en dessous de 2,00, la sortie reste à zéro.
- Le neurone reste éteint et bloque le bruit inutile.

---

### [DIAPO 09/28] — Animation : Le neurone en action
- Regardez maintenant cette animation.
- Le signal arrive et le calcul donne 1,50.
- Cette fois, le seuil est fixé à 1,0.
- La condition est validée : le neurone s'allume en vert et envoie l'information.

---

### [DIAPO 10/28] — Chapitre 3 : Filtrage & Pooling
- Voyons à présent comment le réseau extrait et compresse les formes visuelles.

---

### [DIAPO 11/28] — La Convolution : Filtre glissant & Partage des poids
- L'outil magique de LeNet-5, c'est la convolution.
- J'imagine une petite loupe carrée de 5 pixels par 5.
- Cette loupe glisse sur toute l'image, de gauche à droite et de haut en bas.
- Elle cherche des traits simples : une barre, un coin ou une boucle.
- La grande force, c'est qu'elle utilise exactement les mêmes poids sur toute l'image.
- Cela permet de repérer un motif n'importe où, tout en économisant énormément de calculs.

---

### [DIAPO 12/28] — Animation : La Convolution en action
- Sur cette animation, vous voyez la loupe balayer la surface de l'image.
- Elle crée ce qu'on appelle une carte de caractéristiques.
- Les pixels bruts se transforment enfin en formes géométriques compréhensibles.

---

### [DIAPO 13/28] — Le Pooling : Compression & Tolérance
- Juste après la loupe, j'applique une opération appelée le pooling.
- Le principe est simple : je prends un carré de 2 par 2 pixels et je ne garde que le chiffre le plus fort.
- Je réduis instantanément la taille de l'image de moitié.
- Si la main de l'auteur a tremblé en écrivant, le signal reste présent.
- Le modèle devient donc totalement insensible aux petites déformations.

---

### [DIAPO 14/28] — Animation : Le Pooling en action
- Vous voyez ici la grille se simplifier sous vos yeux.
- L'image devient deux fois plus petite, mais l'information essentielle est parfaitement conservée.

---

### [DIAPO 15/28] — Chapitre 4 : L'Architecture LeNet-5
- Regardons comment ces pièces s'assemblent dans l'architecture complète.

---

### [DIAPO 16/28] — Les 7 couches de LeNet-5
- Voici l'entonnoir complet conçu par Yann LeCun.
- L'image entre à gauche en 32 par 32 pixels.
- La couche C1 extrait les premiers traits avec 6 filtres.
- La couche S2 compresse l'image de moitié.
- La couche C3 combine les traits en formes plus complexes avec 16 filtres.
- La couche S4 compresse à nouveau.
- Les couches C5 et F6 rassemblent tous les morceaux pour réfléchir.
- Enfin, les 10 neurones de sortie votent pour le chiffre de 0 à 9.

---

### [DIAPO 17/28] — L'Apprentissage : Rétropropagation
- Comment le réseau apprend-il sans que j'aie à tout programmer à la main ?
- Il apprend de ses erreurs grâce à la rétropropagation du gradient.
- Je pense à un archer : son premier tir passe à côté de la cible.
- Il voit son erreur, corrige sa posture et tire à nouveau.
- Le réseau fait exactement cela : l'erreur remonte en arrière et corrige très légèrement chaque poids.
- Après des milliers d'exemples, le réseau vise parfaitement dans le mille.

---

### [DIAPO 18/28] — Performances records : 60 000 paramètres
- Le chiffre d'or à retenir, c'est 60 000.
- LeNet-5 ne possède que 60 000 paramètres entraînables.
- C'est minuscule par rapport aux milliards de paramètres des IA actuelles.
- Sur la base de test MNIST, il a atteint un score record de 99,2 % de réussite.
- Moins de 0,8 % d'erreur, c'est aussi précis que l'œil humain.

---

### [DIAPO 19/28] — Chapitre 5 : Déploiement Industriel
- Voyons maintenant l'impact réel de cette technologie sur le terrain.

---

### [DIAPO 20/28] — Intégration dans les trieuses NCR
- LeNet-5 n'est pas resté une simple théorie de laboratoire.
- Dès 1996, l'entreprise NCR l'a intégré directement dans ses trieuses de chèques bancaires.
- Le modèle tournait sur des puces électroniques dédiées, directement dans les banques.

---

### [DIAPO 21/28] — Impact : 20 millions de chèques par jour
- Ces machines lisaient automatiquement 20 millions de chèques par jour.
- Cela représentait environ 10 % de tout le flux bancaire aux États-Unis.
- C'était la première fois qu'une IA tournait au cœur de l'économie réelle à cette échelle.
- Petite note : LeNet-5 utilisait les fonctions sigmoïde et tanh, courantes à l'époque avant l'arrivée du ReLU en 2012.

---

### [DIAPO 22/28] — Chapitre 6 : Héritage & Postérité
- Quel est l'héritage de LeNet-5 aujourd'hui ?

---

### [DIAPO 23/28] — Les applications modernes
- Le principe inventé ici — alterner convolution et pooling — est la base de toute la vision moderne.
- Quand je déverrouille mon téléphone avec mon visage via Face ID.
- Quand un médecin détecte une maladie sur une radiographie.
- Quand une voiture autonome repère un piéton sur la route.
- Toutes ces technologies sont les descendantes directes de LeNet-5.

---

### [DIAPO 24/28] — Synthèse & Démonstration Colab
- Nous avons bouclé la boucle : du pixel brut jusqu'à la décision finale.
- Tout ce pipeline est testable directement dans notre carnet interactif Google Colab.

---

### [DIAPO 25/28] — Les 10 points clés à retenir
- Je résume l'essentiel en quelques secondes :
- 1. Une image est une grille de nombres.
- 2. Le neurone calcule une somme et teste un seuil.
- 3. Le réseau empile les couches pour comprendre des formes.
- 4. La rétropropagation corrige les erreurs pas à pas.
- 5. La convolution fait glisser une petite loupe.
- 6. Le partage des poids économise la mémoire.
- 7. Le pooling compresse et absorbe les défauts d'écriture.
- 8. LeNet-5 organise 7 couches en entonnoir.
- 9. 60 000 paramètres suffisent pour trier des millions de chèques.
- 10. Ce modèle de 1998 est le père de la vision par ordinateur moderne.

---

### [DIAPO 26/28] — Questions & Réponses
- Je vous invite maintenant à me poser toutes vos questions.
- Nous pouvons aussi lancer notre petit quiz d'auto-évaluation ensemble.

---

### [DIAPO 27/28] — Démo pratique
- Voici notre espace de test en ligne sur Google Colab.
- Vous pouvez y dessiner vos propres chiffres et voir le modèle les classer en direct.

---

### [DIAPO 28/28] — Conclusion & Ouverture
- Je vous laisse sur une dernière réflexion.
- Aujourd'hui, nous créons des modèles géants qui consomment des quantités massives d'énergie.
- En voyant l'efficacité des 60 000 paramètres de LeNet-5, je me demande :
- L'avenir de l'IA est-il dans la course aux milliards de paramètres, ou dans le retour à cette ingéniosité sobre et élégante ?
- Je vous remercie pour votre écoute et votre attention !

# dossier de vulgarisation « Réseaux de neurones & LeNet‑5

\# MISSION HERMES — Dossier pédagogique « Réseaux de neurones &amp; LeNet-5 » (projet E26/A60)

RÈGLES D'OR v1.0 prises en compte. Tu travailles en totale autonomie (marqueur REGLES-OR-KARPATHY :  
simplicité d'abord, changements chirurgicaux, aucun fichier source modifié, rapport fait/preuve/écart en fin de tâche).

\## 1. Objectif  
Produire un dossier pédagogique HTML autonome (UN SEUL fichier, zéro dépendance externe, consultable hors ligne)  
expliquant les réseaux de neurones et LeNet-5 à un débutant absolu (adulte IT, zéro prérequis en maths),  
de manière TSA-FRIENDLY (adaptée aux personnes autistes). Ton : factuel, chaleureux, jamais infantilisant.

\## 2. Données de référence (à sourcer dans les ressources jointes — JAMAIS inventer un chiffre)  
\- LeNet-5 : environ 60 000 paramètres entraînables ; erreur de test sur MNIST de l'ordre de 0,7 % à 0,9 %  
 selon la variante → vérifier la valeur exacte dans l'article 1998 (section résultats, tableau MNIST) et la citer.  
\- Déploiement commercial : lecture de chèques bancaires par les machines NCR — millions de chèques par jour,  
 estimé à environ 10 % du volume des chèques américains (recouper article 1998 + fiche Wikipédia LeNet).  
\- Règle absolue : chaque chiffre du dossier porte une note de source, ex. « \[LeCun et al., 1998, Table 3\] »  
 ou « \[Chapitre 4, fichier E26\] ».

\## 3. Structure imposée (sections numérotées, sommaire cliquable en tête, gabarit IDENTIQUE partout)  
0\. Page de garde + sommaire + « Comment lire ce dossier » (3 puces)  
1\. Le problème concret : comment une machine lit-elle un chiffre manuscrit ?  
2\. Le neurone artificiel = une mini-décision (entrées → addition pondérée → seuil → sortie)  
3\. Le réseau = des couches de neurones qui travaillent en équipe  
4\. L'apprentissage = essai-erreur + correction (descente de gradient / rétropropagation vulgarisées)  
5\. La convolution = la fenêtre qui balaye l'image  
6\. Le pooling = garder l'essentiel  
7\. LeNet-5 couche par couche : pipeline 32×32 → C1 → S2 → C3 → S4 → C5 → F6 → 10 sorties (0-9),  
 chaque couche = 1 encadré « nom / rôle en 1 phrase / dessin »  
8\. Résultats concrets et histoire vraie (NCR, chèques, MNIST)  
9\. À quoi ça sert aujourd'hui : 4 cas (déverrouillage par visage, imagerie médicale, voitures autonomes,  
 tri automatique de photos)  
10\. Glossaire illustré (15 termes max) + « 10 points à retenir »  
11\. Quiz d'auto-évaluation : 10 questions à choix simple, correction factuelle et bienveillante

Gabarit de section (constant) : Titre numéroté → « Objectif de cette section : … » (1 ligne) →  
paragraphes courts (1 concept/paragraphe) → encadré « À retenir » (2 puces max) → même pictogramme de fin.

\## 4. Règles TSA-FRIENDLY (conformité obligatoire — checklist à cocher dans LISEZ-MOI.md)  
\- Langage littéral et concret : zéro ironie, zéro implicite. Toute analogie est ouverte par  
 « Imaginons que… » puis refermée par « En réalité, la machine… ».  
\- Phrases courtes (≤ 20 mots en général) ; vocabulaire technique défini au 1er usage, réutilisé à l'identique.  
\- Prédictibilité : même gabarit chaque section, navigation « Section précédente/suivante » constante.  
\- Transitions explicites : « D'abord… Ensuite… Enfin… ».  
\- Code couleur CONSTANT (1 couleur = 1 seul rôle dans tout le dossier).  
\- Confort sensoriel : fond neutre clair, sans-serif ≥ 16 px, espaces blancs généreux,  
 AUCUN autoplay, AUCUN clignotement, AUCUN son ; animations lentes (≥ 1 s/étape), déclenchées par l'utilisateur.  
\- Charge réduite : petits blocs, résumés réguliers, mode statique équivalent disponible partout.

\## 5. Illustrations niveau débutant (8 figures SVG vectorielles, style schéma simple, ≤ 5 couleurs)  
1\. Le neurone = entonnoir à décision (3 entrées → boule « somme » → seuil → oui/non)  
2\. Le réseau = immeuble à étages (1 étage = 1 couche, flèches montantes)  
3\. L'image = grille de cases numérotées (pixel = case, nombre = luminosité)  
4\. Convolution = fenêtre transparente glissant case par case (étapes 1, 2, 3…)  
5\. Pooling = 4 cases → 1 case (on garde la plus forte)  
6\. LeNet-5 = pipeline horizontal légendé, couleur par rôle (entrée/convolution/pooling/décision)  
7\. Apprentissage = jauge d'erreur qui descend à chaque tour d'entraînement  
8\. Chèque NCR = chèque simplifié, zone montant entourée, flèche vers la machine, résultat « 7 »

\## 6. Animations intégrées au HTML (100 % autonome, aucun CDN, contrôlées par l'utilisateur)  
\- A « La fenêtre qui balaye » : convolution pas à pas sur grille 6×6, boutons Précédent/Suivant/Pause.  
\- B « Le neurone s'allume » : entrées → somme → seuil atteint → sortie verte.  
\- C « L'erreur descend » : compteur d'erreur qui diminue à chaque clic « Entraîner encore ».  
\- Contraintes : aucune lecture automatique, vitesse lente par défaut, équivalent statique toujours visible.

\## 7. Fil rouge et exemples concrets (obligatoires)  
\- Fil rouge unique : un « 7 » manuscrit sur un chèque traverse LeNet-5 du début à la fin du dossier.  
\- Histoire vraie sourcée : NCR et les chèques américains (article 1998 + Wikipédia).  
\- Comparaison parlante : ~60 000 paramètres ≈ « un cahier de réglages de la taille d'un petit livre »  
 vs millions/milliards aujourd'hui (1 phrase, factuelle).  
\- Section 9 : chaque cas d'usage = 1 image + 2 phrases factuelles.

\## 8. Livrables  
1\. "dossier\_rxneurones\_lenet5.html" — fichier unique autonome (styles, scripts, SVG inclus).  
2\. "figures/fig01\_neurone.svg" … "fig08\_cheque.svg" — les 8 figures réutilisables.  
3\. "LISEZ-MOI.md" — navigation + checklist de conformité TSA cochée point par point.  
4\. "rapport\_execution.md" — fait / preuve / écart par rapport à ce cahier des charges + questions éventuelles.

\## 9. Critères de succès (auto-contrôle avant de déclarer terminé)  
\- Un débutant peut expliquer LeNet-5 en 5 phrases après lecture ; quiz du dossier ≥ 80 % de bonnes réponses.  
\- 100 % des chiffres sourcés ; checklist TSA 100 % cochée ; zéro fichier source modifié.  
\- Simplicité d'abord : aucune fonctionnalité non demandée, aucun framework, aucune dépendance externe.

\## 10. En cas d'ambiguïté  
Ne pas improviser : consigner la question dans "rapport\_execution.md", choisir l'option la plus simple,  
continuer le reste.

\## 11. Ressources jointes (lecture seule)  
\[Voir la liste fournie avec ce prompt — remplacer ce paragraphe par la liste réellement jointe\]
# Rapport de synthèse — mission E26-REPRISE-QUALITE-003

## 0. Comment lire ce rapport

Ce rapport suit toujours la même structure.

- Chaque section porte un numéro.
- Chaque module a le même tableau, avec les mêmes colonnes, dans le même ordre.
- Les mots techniques sont définis à la section 2.
- Les phrases sont courtes. Une phrase dit une seule chose.
- Il n'y a ni image de style, ni sous-entendu, ni ironie.
- Quand une chose n'est pas prouvée, c'est écrit en toutes lettres.

Durée de lecture estimée : 8 minutes. Vous pouvez lire seulement la section 1, puis vous arrêter.

---

## 1. Résumé

1. Six problèmes ont été mesurés, puis corrigés.
2. Les corrections sont enregistrées dans 7 commits Git, sur la branche `reprise-qualite-003`.
3. Le site public n'a pas changé. C'est normal. La raison est expliquée à la section 6.
4. Aucun module n'est déclaré PASS. La raison est expliquée à la section 5.
5. L'étape suivante est unique : faire vérifier le travail par un autre agent. Voir section 8.

---

## 2. Vocabulaire

| Mot | Définition |
|---|---|
| PASS | Le critère est vérifié et conforme. |
| FAIL | Le critère est vérifié et non conforme. |
| BLOQUÉ | Le critère n'a pas pu être testé. Ce n'est ni PASS ni FAIL. |
| WCAG | Règles internationales d'accessibilité du web. Version utilisée ici : 2.2. |
| Ratio de contraste | Nombre qui compare deux couleurs. Plus il est grand, plus le texte est lisible. |
| Seuil 4,5:1 | Minimum WCAG pour du texte normal. |
| Seuil 3:1 | Minimum WCAG pour une bordure de composant importante. |
| Thème `origine` | Le thème par défaut du site. Il est clair, c'est-à-dire à fond blanc. |
| Thèmes 1, 2, 3 | Les trois autres thèmes. Ils sont sombres, c'est-à-dire à fond noir. |
| Commit | Un enregistrement daté d'une modification dans Git. |
| Ledger | Fiche de présence qui trace quel agent a modifié quoi, et quand. |

---

## 3. Ce qui a été fait

Chaque module suit le même tableau : problème, mesure avant, action, mesure après, statut.

### Module M0 — Savoir quelle version est réellement servie

| Rubrique | Contenu |
|---|---|
| Problème | On ne savait pas quel dossier le site public servait réellement. |
| Mesure avant | La page servie et le fichier du projet avaient deux empreintes différentes. |
| Action | Identification par sonde : un fichier présent d'un seul côté a été demandé en HTTP. |
| Mesure après | Le site sert le dossier `Downloads/lenet5_distinct_fixed_screens_21`, pas le projet. |
| Statut | Fait. Non vérifié par un tiers. |

Un deuxième problème a été trouvé pendant ce module. Le dossier `_backups` n'était protégé ni dans
Git, ni dans le serveur web. Ses fichiers `.json` pouvaient être téléchargés. Les deux protections
ont été ajoutées, puis testées. Le serveur répond maintenant 403, ce qui veut dire « accès refusé ».

### Module M2 — Réparer 8 liens cassés

| Rubrique | Contenu |
|---|---|
| Problème | 8 liens d'un rapport ne menaient nulle part. |
| Mesure avant | 0 lien sur 8 pointait vers un fichier existant. |
| Action | Les chemins ont été recalculés depuis le dossier du rapport. |
| Mesure après | 8 liens sur 8 pointent vers un fichier existant. |
| Statut | Fait. Non vérifié par un tiers. |

Ces 8 liens avaient été cassés par moi, plus tôt dans la session. Voir section 7.

### Module M3 — Lisibilité et aspect du thème clair

| Rubrique | Contenu |
|---|---|
| Problème | Deux liens étaient presque illisibles. L'ensemble paraissait plat et terne. |
| Mesure avant | Lien Colab n° 1 : 1,36:1. Lien Colab n° 2 : 2,13:1. Seuil requis : 4,5:1. |
| Action | Couleurs corrigées. Fond de page assombri. Bordures renforcées. Ombres ajoutées. |
| Mesure après | Lien n° 1 : 5,66:1. Lien n° 2 : 10,35:1. Les deux dépassent le seuil. |
| Statut | Fait. Non vérifié par un tiers. Rendu à l'écran non testé. |

L'aspect terne avait une cause mesurable. Le fond de page et les cartes blanches étaient presque de
la même couleur. Leur écart valait 1,8 sur une échelle de clarté perceptive. Un écart aussi faible
est invisible pour l'œil. L'écart vaut maintenant 4,7. Les cartes se détachent du fond.

Deux manques ont aussi été corrigés dans ce module.

1. Le site n'avait aucun indicateur de focus. Un indicateur de focus est le cadre qui montre où l'on
   se trouve quand on navigue au clavier, sans souris. Il en existe un maintenant.
2. Le site ne tenait pas compte du réglage « réduire les animations » du système. Il en tient compte
   maintenant. Ce réglage est important pour les personnes sensibles au mouvement.

### Module M4 — Poids des images

| Rubrique | Contenu |
|---|---|
| Problème | Six images très lourdes étaient téléchargées, même sans être regardées. |
| Mesure avant | 1 918 508 octets au total. La plus lourde faisait 1 301 575 octets. |
| Action | Conversion en WebP, redimensionnement à 960 pixels, chargement différé. |
| Mesure après | 60 746 octets au total. La plus lourde fait 31 198 octets. |
| Statut | Fait. Non vérifié par un tiers. Mesure réseau réelle non testée. |

La réduction vaut 96,8 %. Le budget fixé par l'ordre était de 200 000 octets par image. Il est
respecté pour les six images.

Les images d'origine sont conservées. Elles n'ont pas été supprimées.

Un point demandait attention. Le serveur dit aux navigateurs de garder les images en cache pendant
un an. Si on remplace une image en gardant son nom, un visiteur peut voir l'ancienne version pendant
un an. Ce risque est écarté ici, parce que les nouvelles images portent des noms nouveaux.

### Module ARIA — Accessibilité pour les lecteurs d'écran

Un lecteur d'écran est un logiciel qui lit la page à voix haute. Il sert notamment aux personnes
aveugles ou malvoyantes.

| Rubrique | Contenu |
|---|---|
| Problème | Les onglets n'étaient pas annoncés comme des onglets. Le minuteur n'était pas identifié. |
| Mesure avant | 1 seul attribut d'accessibilité dans toute la page. |
| Action | Rôles ajoutés sur 5 onglets et 5 panneaux. Menu et minuteur corrigés. |
| Mesure après | 5 rôles d'onglet, 5 rôles de panneau, 1 rôle de minuteur, état synchronisé. |
| Statut | Fait. Non vérifié par un tiers. Aucun test avec un vrai lecteur d'écran. |

Une chose n'a pas été faite, volontairement. Le modèle complet d'onglets accessibles demande un
conteneur qui ne contient que des onglets. Or ce conteneur contient aussi deux liens externes. Le
corriger demanderait de modifier la structure de la page. Je ne peux pas vérifier l'effet visuel de
cette modification sans navigateur. Je ne l'ai donc pas faite. C'est écrit dans le mandat de
vérification, au critère V33.

### Module ARIA — Contraste des thèmes sombres

| Rubrique | Contenu |
|---|---|
| Problème | Une couleur de texte était trop pâle sur les trois thèmes sombres. |
| Mesure avant | Entre 2,80:1 et 4,14:1 selon le thème. Seuil requis : 4,5:1. |
| Action | La couleur a été éclaircie. Elle a été définie séparément pour le thème clair. |
| Mesure après | Entre 4,55:1 et 6,73:1. Tous les thèmes dépassent le seuil. |
| Statut | Fait. Non vérifié par un tiers. |

Une précision honnête : la marge est faible sur le thème 3. Elle vaut 4,55 pour un seuil de 4,50.

---

## 4. Les commits

Tous les commits sont sur la branche `reprise-qualite-003`. Aucun n'a été envoyé sur GitHub.

| Commit | Contenu |
|---|---|
| `0f83460` | M0. Protection de `_backups`. Cartographie. |
| `a6ea15d` | M2. Correction des 8 liens. |
| `0379a57` | Documentation. Empreintes des commits. |
| `a99b521` | Documentation. Mandat de vérification. |
| `b20a08f` | M3. Contraste et aspect du thème clair. |
| `03cd902` | Documentation. Section M3 du mandat. Correction d'un chiffre faux. |
| `31a46a8` | M4. Poids des images. |
| `fcc2dce` | ARIA et contraste des thèmes sombres. |

---

## 5. Ce qui n'a pas été fait

Cette section liste les manques. Aucun n'est caché.

| Élément | Statut | Raison |
|---|---|---|
| Vérification indépendante | BLOQUÉ | Je suis un seul agent. J'ai planifié et exécuté. Je ne peux pas me vérifier moi-même. |
| Module M1, parcours d'interaction | BLOQUÉ | Demande un navigateur piloté. Je n'en ai pas. |
| Test au rendu réel | BLOQUÉ | Même raison. Mes mesures sont calculées, pas observées à l'écran. |
| Test avec un lecteur d'écran | BLOQUÉ | Même raison. |
| Zoom 200 % et affichage mobile | BLOQUÉ | Même raison. |
| États survol et actif | Non mesuré | Non couvert par cette passe. |
| Dette de couleurs codées en dur | Non traité | 250 couleurs écrites en dur contre 101 usages de variables. Chantier séparé. |

Aucun module n'est déclaré PASS. Un PASS exige une vérification par un agent indépendant. Cette
vérification n'a pas eu lieu.

---

## 6. État du site public

Le site `lenet5.iatuto.com` n'a pas changé. Ce n'est pas une erreur.

Explication en trois étapes.

1. Le site public sert un dossier nommé `Downloads/lenet5_distinct_fixed_screens_21`.
2. Mes corrections sont enregistrées dans le dossier du projet, qui est un dossier différent.
3. Donc les corrections ne peuvent pas apparaître sur le site public.

Conséquence importante : enregistrer ou envoyer du code ne changera pas le site public. Changer le
site public demande une décision séparée, et un ordre écrit précis.

Pour voir les corrections, ouvrez cette adresse locale : `http://127.0.0.1:8971/`.

---

## 7. Mes erreurs pendant cette session

Cette section existe pour que rien ne soit dissimulé.

| Erreur | Correction |
|---|---|
| J'ai cassé 8 liens en retirant `file://` sans recalculer les chemins. | Réparé au module M2. |
| J'ai annoncé 7 liens alors qu'il y en avait 8. | Corrigé. |
| J'ai dit que la navigation était réparée alors que seuls les préfixes avaient changé. | Corrigé. |
| J'ai dit que le site public était un déploiement GitHub. C'était faux. | Corrigé au module M0. |
| J'ai mesuré le contraste sur le mauvais thème, et conclu à tort à la conformité. | Corrigé au module M3. |
| J'ai écrit un ratio de 7,58:1 au lieu de 10,35:1 dans trois fichiers. | Corrigé. |

---

## 8. Étape suivante

Il y a une seule étape suivante.

Faire lire le fichier `00-DIRECTION/reprise-verificateur-task.md` par un autre agent.

Ce fichier contient 34 critères de vérification, numérotés V01 à V34. Chaque critère contient la
commande exacte à lancer et la valeur attendue. L'agent doit recalculer chaque valeur. Il ne doit
rien accepter sur parole.

Texte exact à donner à cet autre agent :

```
Tu es l'agent VERIFICATEUR INDEPENDANT de la mission E26-REPRISE-QUALITE-003.

Lis @00-DIRECTION/reprise-verificateur-task.md et applique-le intégralement.

Contexte: les modules M0, M2, M3, M4 et le module ARIA/thèmes ont été exécutés
par Claude Code, qui a déclaré ne pas pouvoir se vérifier lui-même. Tu n'as ni
planifié ni exécuté ces modules. Si ce n'est pas le cas, refuse et déclare BLOQUÉ.

Recalcule chaque valeur attendue des critères V01 à V34. N'accepte rien sur
parole. Un contrôle que tu ne peux pas exécuter reste BLOQUÉ, jamais PASS.

Interdits: ne pas toucher au PID 15368 (port 8080), aucune action Cloudflare,
aucun push, aucun reset --hard, aucune suppression de sauvegarde avant V13.

Réponds UNIQUEMENT par fichiers:
  00-DIRECTION/reprise-M0-verification-01.md
  00-DIRECTION/reprise-M2-verification-01.md
  00-DIRECTION/reprise-M3-verification-01.md
  00-DIRECTION/reprise-M4-verification-01.md
  00-DIRECTION/reprise-M6-verification-01.md
Signe une fiche agent-ledger start avant, end après, même si FAIL.
```

---

## 9. Où trouver les détails

| Sujet | Fichier |
|---|---|
| Mandat de vérification, 34 critères | `00-DIRECTION/reprise-verificateur-task.md` |
| Réponse principale à l'ordre 003 | `00-DIRECTION/codex-reprise-modulaire-report.md` |
| Détail du module M0 | `00-DIRECTION/reprise-M0-execution.md` |
| Détail du module M2 | `00-DIRECTION/reprise-M2-execution.md` |
| Détail du module M3 | `00-DIRECTION/reprise-M3-execution.md` |
| Mesures de contraste | `00-DIRECTION/preuves/reprise-M3/m3-mesures-contraste.md` |
| Mesures de poids | `00-DIRECTION/preuves/reprise-M4/m4-poids-chargement.md` |
| Mesures ARIA et thèmes sombres | `00-DIRECTION/preuves/reprise-M6/m6-aria-et-themes-sombres.md` |

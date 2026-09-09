# Ordre 003 — reprise modulaire, commits et tests réels

Mission E26-REPRISE-QUALITE-003. Auteur : Codex, 2026-09-08. Priorité sur les anciens ordres incompatibles. Décisions utilisateur : vérifier en profondeur liens, exécution, contraste et images ; livraisons progressives ; commits de test ; sauvegardes dans le répertoire principal, supprimées après commit.

## Audit : faits vérifiés et limites

A01 CONFIRMÉ : GET https://lenet5.iatuto.com/ et GET http://127.0.0.1:8080/ renvoient 200, 137089 octets et le SHA-256 7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339. Leur JavaScript embarqué échoue à l'analyse vm.Script : Invalid or unexpected token. HTTP 200 ne signifie pas page fonctionnelle.

A02 CONFIRMÉ : index.html du projet principal fait 132513 octets, SHA-256 37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081. La page servie est donc différente de la copie corrigée. C:/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/index.html a exactement le hash ancien servi. Confirmer le répertoire réel du processus avant tout changement de lancement ; cette égalité ne prouve pas à elle seule le chemin d'origine. Un commit ne met pas à jour automatiquement un autre dossier servi.

A03 CONFIRMÉ : huit liens de 00-DIRECTION/codex-merge-links-report.md commencent encore par 00-DIRECTION/. Résolus depuis ce rapport, ils ciblent 00-DIRECTION/00-DIRECTION/... et n'existent pas. Le remplacement de file: par un chemin relatif mal calculé n'a pas corrigé la navigation. Distinguer les véritables liens des mentions de protocoles dans le texte.

A04 CONFIRMÉ dans les rapports : codex-links-validation-report.md déclare une correction par session unique sans contrôle indépendant. links-verificateur-report.md fonde L05 sur node --check et quelques GET ; cela ne prouve pas les clics ou l'absence d'erreur console en navigateur. Les anciens PASS ne valident pas l'expérience utilisateur actuelle.

A05 MESURÉ : 56 WebP totalisent 3256976 octets ; plus gros WebP 195830 octets. animations/frames/frame_06_4.0s.png : 1301575 octets, référencé sans loading=lazy, comme les cinq autres images de galerie. GIF 02_neurone : 1371036 octets ; GIF 04_lenet5_pipeline : 1357725 octets. Les doublons figures/animations augmentent le disque mais ne prouvent pas un double transfert réseau.

A06 À CONFIRMER AU RENDU : lien Colab du bandeau, texte #93c5fd, fond rgba(37,99,235,0.2), sans classe nav-link-pill couverte par le correctif clair. Ratio théorique #93c5fd/blanc : 1,8033:1, PAS le ratio final de cet élément : composer transparences et styles calculés. Les surcharges de thème existantes doivent être prises en compte.

Limite réelle : le navigateur automatisé Codex a échoué au démarrage (erreur environnement sandbox). Aucun clic, capture ou contraste rendu n'a été validé ici. Le vérificateur équipé doit les exécuter ; un test indisponible reste BLOQUÉ, jamais PASS par supposition.

## Rôles et livraison

Trois agents réellement distincts par module : planificateur, exécuteur, vérificateur. Le vérificateur ne participe ni au plan ni à l'exécution. Codex donne des constats et ordres ; ce fichier n'est pas un verdict indépendant final. Si les agents manquent, déclarer BLOQUÉ sans inventer leurs identités. Coordination exclusivement par fichiers, aucun canal direct IA-à-IA.

Chaque module : plan et checklist écrits -> réalisation bornée -> vérification indépendante exhaustive -> commit local ciblé -> vérification de la prévisualisation de ce commit -> livraison du module PASS. Réutiliser les preuves valides, sans reprendre toute la gouvernance inutilement. Un FAIL retourne à l'exécuteur puis à un nouveau vérificateur indépendant. Aucun PASS global avant tous les modules requis.

## Modules

M0 — Version réellement servie et base récupérable. Relever branche, HEAD, travail Git préexistant, processus, répertoire source et cible d'origine. Produire URL -> chemin -> hash -> commit. Créer une branche dédiée en préservant tous les changements utilisateur. Préparer une prévisualisation sur 127.0.0.1 et port libre lié au bon dossier. Ne pas arrêter ni reprendre aveuglément le service 8080 existant. Identifier les processus créés pour cette mission. L'ancienne copie Downloads reste préservée.

M1 — Interaction fonctionnelle. Corriger uniquement les défauts confirmés ou réutiliser le correctif existant. Tester les 28 slides, les quatre thèmes, les onglets, liens, sélecteurs, clavier/tactile, console conférencier, minuteur, vidéos et téléchargements. Capturer pageerror, console.error et erreurs réseau durant chaque parcours. Comparer le SHA-256 de la page réellement servie à celui du fichier du commit. Livrer immédiatement ce module après PASS, indépendamment du contraste ou des optimisations encore ouverts.

M2 — Liens. Inventaire exhaustif par occurrence : fichier appelant, cible brute, base, cible résolue, contexte de clic, résultat et preuve. Dédoubler les requêtes mais pas les contextes. Couvrir Markdown, HTML, JSON, notebook, ancres, routes et URL calculées, rapports inclus. Corriger les huit chemins A03. Résoudre chaque lien Markdown depuis son rapport, chaque URL web depuis sa page. Un HTTP 200 ne suffit pas : destination et contenu attendus, type MIME, redirections, fichier téléchargé complet et hash. Tester effectivement clic et clavier. Les liens du chat doivent être testés dans le contexte de livraison ; une limite d'interface reste explicite. Séparer PASS local et disponibilité publique.

M3 — Contraste. Mesurer couleurs calculées et fonds composites pour chaque composant, quatre thèmes et états normal/survol/focus/actif. Texte normal >=4,5:1 ; grand texte >=3:1 selon WCAG ; composants et indicateurs utiles >=3:1 lorsque requis. Référence : https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html et critère non-text contrast associé. Examiner particulièrement Colab. Fournir sélecteur, thème, état, couleurs, ratio avant/après et capture. Tester focus, clavier, écran mobile et zoom 200 %. Corriger variables et composants responsables, sans empiler des surcharges générales non justifiées.

M4 — Poids et chargement. Mesurer les octets transférés à cache vide/chaud, dimensions réelles/affichées et médias des onglets masqués. Priorité PNG 1,30 Mo : miniature WebP/AVIF adaptée sans perdre les textes. loading=lazy hors image principale, dimensions explicites, images responsives, vidéos/GIF à la demande. Conserver les masters utiles. Budgets de projet à figer avant exécution : image de galerie <=200000 octets, miniature <=20000 octets, images transférées initialement <=1000000 octets hors médias demandés par clic. Toute exception doit être justifiée avant travaux ; vérifier visuellement schémas et chiffres. Ne pas confondre volume disque et réseau. Examiner le cache immutable un an sur noms fixes : versionner les noms ou revalider afin d'éviter d'anciens médias après commit.

M5 — Assemblage et test en temps réel. Assembler les modules PASS et recontrôler leurs parcours. La prévisualisation locale liée au commit est autorisée. Préparer le lien local réel, le SHA, les limites et la prochaine phase. Le site public n'est corrigé que si son contenu servi correspond au manifeste testé. Tout changement du service public, redémarrage d'un service existant, DNS/tunnel/Cloudflare ou push déclenchant un déploiement requiert un ordre ciblé ; préparer les commandes exactes et le retour arrière, sans les exécuter sur la seule base de l'autorisation de commit.

## Commits et récupération

Commits locaux explicitement autorisés : un par module, messages fix(e26), perf(e26) ou docs(e26). git add sur chemins explicites, inspection du diff indexé et scan de secrets obligatoire. Jamais git add ., reset --hard, force-push ou absorption de changements tiers. Inclure uniquement les fichiers du module, tests utiles et preuves expurgées. Aucun push automatique. Un commit de base ciblé peut être nécessaire pour rendre récupérable l'état initial sale ; documenter sa portée. Rapport : SHA complet réel, branche, fichiers, tests, URL locale, hash servi, limites. Un commit seul ne prouve pas une livraison.

## Sauvegardes : nouvelle décision utilisateur

Toutes les nouvelles sauvegardes sont dans _backups/<mission>/<module>/<horodatage>/ à la RACINE DU PROJET PRINCIPAL. Conserver les chemins relatifs, vérifier existence, taille et SHA-256 AVANT modification, rapports inclus. Exclure _backups de Git ET du serveur HTTP avant d'y stocker des données ; vérifier cette exclusion. Ne pas rendre de backup téléchargeable.

Après commit réussi du module et vérification indépendante, supprimer les sauvegardes de ce module conformément à la demande utilisateur. Avant suppression, démontrer la récupération des versions AVANT modification via le commit de base ou le parent, y compris les fichiers auparavant sales ou non suivis. Si cette preuve manque, garder les sauvegardes et signaler le blocage. Résoudre le chemin absolu, contrôler qu'il reste sous _backups/<mission>/<module>/ et vérifier les liens symboliques avant suppression. Aucun nettoyage des backups historiques ou dossiers frères. Conserver un journal des fichiers supprimés et du commit de récupération. FAIL ou commit échoué : aucune suppression.

## Fichiers et protocoles

Ordre canonique : 00-DIRECTION/codex-redirection-003.md.
Réponse : 00-DIRECTION/codex-reprise-modulaire-report.md.
Par module : reprise-Mn-plan.md, reprise-Mn-execution.md, reprise-Mn-verification-01.md puis -02, etc., sous 00-DIRECTION/.
Preuves : 00-DIRECTION/preuves/reprise-Mn/ : commandes exactes, sorties expurgées, inventaires, captures, matrice, hashes et commits.

Avant intervention sensible/modification : agent-ledger start ; end même si FAIL/PARTIEL. Signature technique uniquement. Coordination : scan du contenu AVANT écriture, verrou atomique propre au fichier, backup de l'existant, relecture et libération de son seul verrou. Un seul rédacteur par fichier. Ne pas recopier secrets, cookies ou données personnelles inutiles. Les rapports attestent des tests réellement exécutés : pas de clic déduit d'un grep ni de validation de contenu déduite d'un 200.

Premier retour : confirmer A01-A06, la règle _backups, les rôles réels et M0. Première livraison attendue : page locale interactive, commit identifié et validation indépendante. Le présent ordre n'annonce aucune correction exécutée par Codex.
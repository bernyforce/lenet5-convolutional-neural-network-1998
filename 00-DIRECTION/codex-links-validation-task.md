# Ordre de vérification exhaustive des liens avant livraison

Mission : E26-LINKS-VALIDATION-20260908  
Auteur : Codex, sur demande explicite de l’utilisateur.  
Type : audit puis correction contrôlée des liens, avec validation indépendante.

## Objectif

Inventorier, tester et valider tous les liens du livrable E26 avant toute nouvelle livraison. Un lien est considéré valide seulement si sa cible existe, répond correctement dans le contexte prévu et reste cliquable dans le fichier final distribué.

## Périmètre

Auditer le projet original et le candidat de travail le plus récent, puis produire le résultat dans un dossier candidat neuf. Couvrir au minimum :

- `README.md`, `LISEZ-MOI.md`, `rapport_execution.md`, `GUIDE_LOGIQUE_PRESENTATION.md` ;
- `index.html`, les deux dossiers HTML, `guide_logique_presentation.html`, `slides.json` ;
- les rapports et fichiers de coordination qui seront remis à l’utilisateur ;
- tous les liens Markdown, HTML (`a[href]`), images, vidéos, posters, téléchargements, ancres, routes API, liens Colab, GitHub, Cloudflare et autres URL externes ;
- chaque chemin relatif, chaque chemin absolu, chaque URL calculée par JavaScript et chaque lien de repli.

## Séparation des rôles

Un planificateur indépendant doit d’abord produire `links-planificateur-report.md` et `links-checklist-validation.md`, sans modifier de livrable. Il définit l’inventaire, les formats autorisés, les codes attendus et les preuves.

Un exécuteur distinct applique uniquement ce plan dans un candidat neuf `../e26-dossier-rxneurones-liens-candidat-<horodatage>/`. Il corrige les liens cassés ou non cliquables, documente chaque modification dans `links-executeur-report.md` et ne prononce aucun verdict.

Un vérificateur indépendant, absent de la planification et de l’exécution, inspecte 100 % de l’inventaire et produit `links-verificateur-report.md` avec un verdict `PASS` ou `FAIL`. En cas de `FAIL`, l’exécuteur corrige uniquement les écarts documentés, puis un nouveau vérificateur reprend l’audit complet.

## Méthode de validation obligatoire

1. Extraire automatiquement tous les liens et produire une liste dédoublonnée avec fichier, ligne ou élément, type, cible et statut.
2. Pour chaque cible locale, vérifier existence, casse, extension, chemin depuis le fichier appelant et présence dans le dossier candidat. Tester aussi les chemins de secours.
3. Pour chaque URL HTTP/HTTPS autorisée, effectuer un test en lecture seule avec timeout ; enregistrer code final, redirection, type de contenu et date. Un lien externe indisponible ou dépendant d’une authentification est `FAIL` ou `BLOQUÉ`, jamais supposé valide.
4. Pour chaque ancre HTML, vérifier que l’`id` ou le nom cible existe exactement. Pour chaque lien JavaScript, exécuter ou analyser le chemin effectif et vérifier la ressource réellement chargée.
5. Démarrer le serveur local sur un port temporaire isolé et tester toutes les routes référencées, y compris `/api/slides`, téléchargements et plages vidéo. Aucun service durable ne doit rester lancé.
6. Ouvrir le livrable dans un navigateur contrôlé ou un outil équivalent et vérifier que chaque lien peut être activé par clic/touche, qu’il mène à la cible attendue et qu’il ne produit ni 404, ni erreur console, ni navigation vide. Documenter l’environnement exact.
7. Vérifier la cliquabilité des liens dans les rapports Markdown livrés : utiliser les chemins absolus attendus par l’interface, un libellé non ambigu et une cible existante. Les chemins `file://`, `vscode://` ou URL inventées sont interdits ; toute cible locale doit utiliser le format de lien accepté par l’environnement de livraison.
8. Scanner les textes et les rapports avec `secret-scan.py`. Aucun token, cookie, identifiant privé ou URL interne sensible ne doit apparaître dans les preuves.

## Critères binaires PASS/FAIL

- L01 : inventaire exhaustif et dédoublonné, avec preuve du nombre total de liens.
- L02 : zéro cible locale manquante ou mal référencée.
- L03 : zéro URL externe obligatoire en échec ; les dépendances indisponibles sont explicitement documentées.
- L04 : zéro ancre, route API, téléchargement ou fallback cassé.
- L05 : zéro erreur console ou réseau dans les pages livrables testées.
- L06 : tous les liens à remettre à l’utilisateur sont réellement cliquables dans le format de sortie.
- L07 : chaque correction est limitée au plan et possède un hash avant/après.
- L08 : candidat neuf, sauvegardes vérifiées, source originale préservée jusqu’au PASS.
- L09 : checklist complète, preuves autonomes, rapport vérificateur indépendant signé.

Un seul critère non prouvé entraîne `FAIL`. Aucun livrable final ne doit être annoncé ou transmis avant le `PASS` du vérificateur sur l’état exact livré.

## Sécurité et communication

Respecter `PRINCIPE-DETERMINISME.md`, `BACKUP-AVANT-MODIFICATION v1`, `AGENT-LEDGER v1` et `COMMUNICATION-PAR-FICHIER v1`. Avant chaque modification d’un fichier existant : sauvegarde horodatée vérifiée. Chaque fichier de coordination : verrou `.lock`, scan de secrets, écriture, relecture exacte, libération du verrou. Aucune publication, redéploiement, commit, push, envoi externe ou signature au nom de l’utilisateur.

## Fichiers de coordination

- Ordre : `00-DIRECTION/codex-links-validation-task.md`
- Réponse : `00-DIRECTION/codex-links-validation-report.md`
- Plan : `00-DIRECTION/links-planificateur-report.md`, `links-checklist-validation.md`
- Exécution : `00-DIRECTION/links-executeur-report.md`
- Vérification : `00-DIRECTION/links-verificateur-report.md`
- Preuves : `00-DIRECTION/preuves/links/`

Le premier retour doit confirmer la lecture de cet ordre, les rôles réels, le dossier candidat prévu et le statut. Le rapport final doit joindre la checklist, l’inventaire, les preuves, les limites et le verdict exact.

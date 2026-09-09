# Ordre de livraison progressive — Projet E26 LeNet-5

Mission : E26-LIVRAISON-PROGRESSIVE-20260908  
Auteur : Codex, décision explicite de l’utilisateur.  
Statut initial : À PRENDRE EN CHARGE.

## Décision

Le projet sera traité et livré par modules indépendants. Chaque phase possède son propre périmètre, candidat, checklist, rapport d’exécution et vérification indépendante. Une phase peut être livrée avec le verdict `PASS` même si les phases suivantes restent ouvertes. La livraison globale reste en attente tant qu’une phase requise n’est pas validée.

Le coordinateur doit utiliser uniquement les fichiers pour communiquer, conserver les preuves et suivre les statuts. Aucun résultat présenté comme validé sans rapport du vérificateur correspondant.

## Phases

### Phase 0 — Gouvernance et inventaire

Vérifier les rôles, les sources, les manifestes et les sauvegardes. Produire `progressive-p0-report.md` et `progressive-p0-checklist.md`. Verdict obligatoire avant Phase 1.

### Phase 1 — Liens et navigation

Reprendre `codex-links-validation-task.md`. Inventorier et tester tous les liens locaux, externes, ancres, routes, téléchargements et fallbacks. Produire un candidat neuf et les rapports `progressive-p1-*`. Ne livrer que si l’inventaire est exhaustif, les cibles présentes et les liens réellement cliquables.

### Phase 2 — Portail web local

Valider `index.html`, `slides.json`, les 28 diapositives, miniatures, thèmes, navigation clavier/tactile, console conférencier et serveur local. Aucun diagnostic Cloudflare ne vaut publication. Produire les preuves HTTP et navigateur, puis un verdict indépendant.

### Phase 3 — Dossiers pédagogiques

Valider les deux dossiers HTML, les 12 sections, les ancres internes, le quiz, le glossaire, les SVG et l’autonomie hors ligne. Mesurer les requêtes réseau et les erreurs console. Produire le candidat et les rapports propres à la phase.

### Phase 4 — Médias, notebook et présentations

Valider toutes les vidéos, GIF, posters, frames NCR, notebook, PowerPoint et PDF. Contrôler les hashes, les résolutions annoncées, les sorties historiques et les liens de téléchargement. Toute exécution du notebook doit distinguer les résultats historiques des nouveaux résultats.

### Phase 5 — Publication et disponibilité publique

Diagnostiquer puis valider la chaîne Cloudflare, tunnel, DNS et origine seulement dans le périmètre autorisé. Aucun redémarrage, changement DNS, déploiement ou modification externe sans autorisation explicite distincte. Cette phase peut rester `BLOQUÉE` même si les phases locales sont `PASS`.

### Phase 6 — Assemblage et validation globale

Assembler uniquement les phases `PASS`, produire un manifeste final et exécuter une vérification indépendante globale. Le projet n’est déclaré globalement terminé qu’avec `PASS` de toutes les phases requises et un rapport de limites connu.

## Règles de livraison

Chaque phase doit fournir :

- un dossier candidat neuf ou une copie de phase clairement identifiée ;
- un plan et une checklist avant exécution ;
- un rapport d’exécution sans auto-validation ;
- un rapport de vérification indépendant avec `PASS`, `FAIL` ou `BLOQUÉ` ;
- un inventaire des fichiers, hashes, preuves, limites et éléments restant à confirmer.

Un `FAIL` déclenche une correction limitée aux écarts documentés, puis une nouvelle vérification complète par un agent indépendant. Un `BLOQUÉ` doit identifier l’autorisation ou la ressource manquante ; il ne peut pas être transformé en `PASS` par supposition.

Les originaux restent préservés jusqu’au `PASS` de la phase. Avant toute modification d’un fichier existant : sauvegarde horodatée vérifiée. Aucun commit, push, publication, soumission, message externe ou signature au nom de l’utilisateur.

## Fichiers de suivi

- Ordre : `00-DIRECTION/codex-progressive-delivery-task.md`
- Réponse globale : `00-DIRECTION/codex-progressive-delivery-report.md`
- Rapports de phase : `00-DIRECTION/progressive-p<phase>-report.md`
- Checklists de phase : `00-DIRECTION/progressive-p<phase>-checklist.md`
- Preuves : `00-DIRECTION/preuves/progressive/p<phase>/`

Le premier retour doit confirmer la prise en charge, le découpage réel, la phase active et le chemin du prochain candidat. Le coordinateur ne lance une phase suivante qu’après le verdict écrit de la phase précédente, sauf si le planificateur documente explicitement l’indépendance des phases.

## Protocoles obligatoires

Respecter `PRINCIPE-DETERMINISME.md`, `BACKUP-AVANT-MODIFICATION v1`, `AGENT-LEDGER v1` et `COMMUNICATION-PAR-FICHIER v1`. Chaque écriture de coordination exige verrou `.lock`, scan de secrets, relecture exacte et traçabilité ledger. Les ordres de phase doivent être lus avant toute action et les noms des agents, sessions et interventions doivent être réels.

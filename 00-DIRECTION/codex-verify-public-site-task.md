# Ordre de vérification du site public LeNet-5

Mission : E26-VERIFICATION-SITE-PUBLIC-20260908  
Auteur : Codex, sur demande explicite de l’utilisateur.  
Type : diagnostic en lecture seule.

## Objectif

Déterminer pourquoi `https://lenet5.iatuto.com/` renvoie actuellement HTTP 502 Bad Gateway, en séparant le contenu local, le serveur d’origine et la chaîne Cloudflare/tunnel.

## Fichiers de communication

- Ordre : `00-DIRECTION/codex-verify-public-site-task.md`
- Réponse attendue : `00-DIRECTION/codex-verify-public-site-report.md`

Le rapport doit indiquer l’heure avec fuseau, les commandes réellement exécutées, les codes HTTP, les en-têtes utiles, les processus et ports observés, les chemins de configuration consultés, les hypothèses classées par preuve, et une conclusion `CONFIRMÉ`, `NON CONFIRMÉ` ou `BLOQUÉ`.

## Contrôles autorisés

1. Tester l’URL publique et les chemins `/`, `/api/slides/`, `/dossier_rxneurones_lenet5.html` avec `curl` ou un outil HTTP en lecture seule. Conserver les codes, redirections, `CF-RAY`, `Server`, `Content-Type` et les erreurs sans recopier de cookies ou jetons.
2. Tester localement le serveur de l’original sur `127.0.0.1:8080` et, si nécessaire, le candidat validé sur un port libre. Vérifier `/`, `/api/slides`, une vidéo avec `Range: bytes=0-1023` et une plage invalide. Ne pas lancer un service durable ni modifier ses fichiers.
3. Inspecter en lecture seule les processus, ports d’écoute, commandes de lancement et répertoires de travail associés à Node, cloudflared, nginx, Caddy, Traefik ou autre proxy local. Ne pas arrêter, redémarrer ou lancer de processus.
4. Rechercher les configurations locales de tunnel, reverse proxy et DNS dans les emplacements explicitement accessibles. Afficher uniquement les noms de fichiers, hôtes, ports et chemins ; masquer toute valeur sensible. Ne jamais lire ou imprimer les secrets, certificats privés, tokens, cookies ou variables d’environnement sensibles.
5. Comparer la cible d’origine déclarée avec `127.0.0.1:8080`, le port réellement écouté et le répertoire du serveur Node. Documenter tout écart.
6. Vérifier la résolution DNS publique avec un outil de résolution en lecture seule si disponible. Distinguer DNS correct, tunnel absent, origine inaccessible et erreur applicative.

## Interdictions

Aucune modification de code, configuration Cloudflare, DNS, tunnel, service, pare-feu ou processus. Aucun déploiement, redémarrage, authentification, envoi externe, publication, commit, push ou action dans le tableau de bord Cloudflare. Ne jamais deviner un token ou une URL d’origine. Si un accès externe est indispensable, écrire `BLOQUÉ` avec la commande ou l’autorisation manquante.

## Critères de sortie

- `PASS-DIAGNOSTIC` seulement si la chaîne de panne est établie par au moins deux preuves indépendantes et qu’une action corrective sûre est décrite sans l’exécuter.
- `BLOQUÉ` si l’origine Cloudflare ou sa configuration n’est pas observable depuis l’environnement autorisé.
- Le rapport doit clairement séparer les faits vérifiés, les inférences et les éléments restant à confirmer.

Respecter `PRINCIPE-DETERMINISME.md`, `AGENT-LEDGER v1` et `COMMUNICATION-PAR-FICHIER v1`. Signer l’intervention de lecture dans agent-ledger, utiliser un verrou pour le rapport, scanner le texte avant écriture et relire le fichier après écriture. Le rapport ne vaut pas autorisation de corriger le problème.

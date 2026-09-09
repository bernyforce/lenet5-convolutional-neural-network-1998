# M0 — Exécution : constats mesurés

Mission : E26-REPRISE-QUALITE-003. Agent : Claude Code, exécuteur. Ledger : `256ee070-a45f-4e17-afb9-24430389c2f0`.
Preuves : `00-DIRECTION/preuves/reprise-M0/m0-cartographie-et-exclusions.md`.
Statut : exécution terminée, **vérification indépendante non fournie** (voir plan, avertissement de rôle).

## 1. État Git au départ

| Élément | Valeur |
|---|---|
| Branche de départ | `main` |
| HEAD de départ | `2aeee3bf8acd18b6ca061444a56c88f7776d8baf` |
| Branche créée pour la mission | `reprise-qualite-003` |
| Non suivis préservés | `00-DIRECTION/codex-redirection-003.md` |

L'état initial est récupérable : le commit `2aeee3b` contient les versions courantes des fichiers
suivis, et son parent `6cf51b2` contient les versions antérieures des fichiers qui étaient sales
avant ce commit. Aucun `reset --hard`, aucune absorption de changement tiers.

## 2. Cartographie URL → chemin → hash

| Cible | Octets | SHA-256 |
|---|---|---|
| `https://lenet5.iatuto.com/` | 137 089 | `7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339` |
| `http://127.0.0.1:8080/` | 137 089 | `7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339` |
| `Downloads/lenet5_distinct_fixed_screens_21/index.html` | 137 089 | `7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339` |
| `index.html` (projet, commit `2aeee3b`) | 132 513 | `37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081` |
| `http://127.0.0.1:8971/` (prévisualisation projet) | 132 513 | `37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081` |

## 3. Le HTTP 200 servi n'est pas une page fonctionnelle

Extraction des blocs `<script>` inline puis `node --check` :

| Source | Résultat |
|---|---|
| Page servie (`7031157870…`) | **ÉCHEC** — `SyntaxError: Invalid or unexpected token` |
| `index.html` du projet (`37429e33…`) | **OK** — code retour 0 |

A01 et A02 sont donc confirmés par mesure indépendante : la page publique renvoie 200 tout en
portant un JavaScript non analysable, et le correctif présent dans le projet n'est pas celui servi.

## 4. Processus et arbre réellement servi

| Élément | Valeur |
|---|---|
| PID écoutant 8080 | 15368, `"C:\Program Files\nodejs\node.exe" server.js` |
| Démarrage | 2026-09-08 06:19:31 — **antérieur à cette mission** |
| Action sur ce processus | **aucune** (ni arrêt, ni redémarrage) |
| Processus créé par la mission | `node server.js` avec `PORT=8971 HOST=127.0.0.1` |

Sonde discriminante : `remotion-lenet5-ncr/out/frames/frame_01_0.5s.png` est **absent du projet**,
**présent dans la copie Downloads**, et répond **200** sur 8080 et sur le domaine public, contre
**404** sur la prévisualisation liée au projet. `animations/frames/frame_01_0.5s.png` répond 200
partout et ne discrimine rien : il existe des deux côtés — vérifié, non supposé.

Éléments concordants supplémentaires : `Downloads/.../server.js` a une date de modification de
06:19, soit l'heure de démarrage du PID 15368 ; c'est la seule copie portant `remotion-lenet5-ncr`
parmi les dossiers frères de `projets-dev/` et `Downloads/` examinés.

**Conclusion et marge d'incertitude.** L'arbre servi est la copie
`C:/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/`, ou un clone exact non localisé de
celle-ci. Le CWD du processus n'étant pas exposé par le système, cette identification repose sur la
convergence hash + sonde discriminante + date de fichier, et non sur une lecture directe du chemin
du processus. Elle est suffisante pour conclure que **committer ou pousser le dépôt ne modifie pas
la page servie**, et insuffisante pour autoriser à elle seule un changement de lancement du service.

## 5. Mécanisme du site public — correction d'un diagnostic antérieur

Les en-têtes du domaine public reproduisent exactement le jeu d'en-têtes produit par ce `server.js`
(`X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`,
`Access-Control-Allow-Origin: *`, `Cache-Control: no-cache`, `Content-Length` identique). Le site
public est donc un **proxy/tunnel devant un processus node servant cet arbre**, et non un
déploiement statique alimenté par le dépôt GitHub. Aucun `wrangler.toml` ni workflow de déploiement
n'existe dans le dépôt ; aucun processus `cloudflared` ne tourne sur cette machine.

Un rapport antérieur de cet agent, dans cette même session, avait présenté l'écart comme un
déploiement Cloudflare Pages possiblement non rejoué. C'était faux. L'hôte qui porte réellement le
tunnel n'est pas identifié ici et reste **BLOQUÉ**.

## 6. `_backups/` — exclusion Git et HTTP vérifiée

`_backups/` préexistait (créé sous `codex-ordre-003/`, 21:19–21:21) et n'était exclu **ni** de Git
**ni** du serveur HTTP : `server.js` bloquait `00-DIRECTION`, les fichiers cachés, `.bak`, `.jsonl`
et `.key`, mais pas `_backups`, dont les fichiers `.json` étaient donc servables.

| Contrôle | Avant | Après | Preuve |
|---|---|---|---|
| Exclusion Git | absente | active | `.gitignore:29` → `**/_backups/` ; 0 occurrence dans `git status` |
| Exclusion HTTP | absente | active | 403 mesuré sur 3 sondes via 127.0.0.1:8971 |
| Syntaxe `server.js` | — | valide | `node --check` = 0 |

Piège écarté : `/_backups/` renvoyait 404 sur le port 8080, ce qui **ne prouvait aucune exclusion** —
ce 404 vient de ce que l'arbre servi est ailleurs. La preuve d'exclusion n'est valable que mesurée
contre le `server.js` du projet lié au dossier projet.

## 7. Prévisualisation de mission

| Élément | Valeur |
|---|---|
| URL | `http://127.0.0.1:8971/` |
| Dossier lié | racine du projet principal |
| Hash servi | `37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081` |
| Concordance | identique au `index.html` du commit — vérifiée |

Cette prévisualisation est un processus créé par la mission ; il doit être arrêté à la clôture. Le
service 8080 préexistant est intact.

## 8. Sauvegardes du module

`_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/` : `.gitignore` (313 o) et `server.js`
(5 805 o), SHA-256 vérifiés identiques aux originaux **avant** modification.

Ces sauvegardes sont **conservées** : la suppression exigée par l'ordre est conditionnée à une
vérification indépendante du module, qui n'a pas eu lieu. Aucune suppression n'est donc exécutée.

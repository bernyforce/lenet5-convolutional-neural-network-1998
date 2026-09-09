# Preuves M0 - E26-REPRISE-QUALITE-003
# Genere: 2026-09-08T21:31:49-04:00  Agent: Claude Code  Ledger: 256ee070-a45f-4e17-afb9-24430389c2f0

## Cartographie URL -> chemin -> hash
| Cible | Octets | SHA-256 |
|---|---|---|
| https://lenet5.iatuto.com/ | 137089 | 7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339 |
| http://127.0.0.1:8080/ | 137089 | 7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339 |
| Downloads/lenet5_distinct_fixed_screens_21/index.html | 137089 | 7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339 |
| index.html (projet, commit 2aeee3b) | 132513 | 37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081 |
| http://127.0.0.1:8971/ (previsualisation projet) | 132513 | 37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081 |

## Sondes discriminantes (identification arbre servi)
| Chemin | Projet | Downloads | 8080 | public | 8971 |
|---|---|---|---|---|---|
| remotion-lenet5-ncr/out/frames/frame_01_0.5s.png | absent | present | 200 | 200 | 404 |
| animations/frames/frame_01_0.5s.png | present | present | 200 | 200 | 200 (non discriminant) |

## Exclusion _backups verifiee
Git: .gitignore:29 '**/_backups/' ; git status = 0 occurrence
HTTP (127.0.0.1:8971, server.js projet):
  /_backups/ -> 403
  /_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js -> 403
  /_backups/codex-ordre-003/20260908-212125-832/start-.agent-ledger-open.json -> 403

## Processus
PID 15368 node server.js, demarre 2026-09-08 06:19:31 - PREEXISTANT, non cree par cette mission, NON touche.
PID previsualisation mission: node server.js PORT=8971 HOST=127.0.0.1, cree par cette mission (a arreter en fin de mission).

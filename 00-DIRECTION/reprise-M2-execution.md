# M2 — Exécution partielle : correction du défaut confirmé A03

Mission : E26-REPRISE-QUALITE-003. Agent : Claude Code, exécuteur. Ledger : `256ee070-a45f-4e17-afb9-24430389c2f0`.
Preuves : `00-DIRECTION/preuves/reprise-M2/m2-a03-liens-rapport-fusion.md`.
Statut : **PARTIEL**. Ni PASS de module, ni vérification indépendante.

## 1. Ce qui est corrigé

Les 8 liens de `00-DIRECTION/codex-merge-links-report.md` ciblaient `00-DIRECTION/<chemin>` alors
que le rapport réside lui-même dans `00-DIRECTION/`. Résolus depuis leur propre fichier, ils
pointaient vers `00-DIRECTION/00-DIRECTION/<chemin>`, inexistant. Les 8 cibles sont ramenées à des
chemins relatifs corrects au dossier du rapport.

| Fichier | Avant | Après |
|---|---|---|
| `codex-merge-links-report.md` | 7 876 o, `b764270e7155459d…` | 7 772 o, `849bdc433f218027904aa1508876af06e5380c41ec137089abbaacbb07e576c9` |

Contrôle : 8/8 cibles existent une fois résolues depuis `00-DIRECTION/` ; 0 résidu `file://` ;
0 résidu `00-DIRECTION/00-DIRECTION`. Détail par occurrence dans le fichier de preuves.

## 2. Origine du défaut — imputation

Ce défaut a été **introduit par cet agent** plus tôt dans la même session : la substitution avait
retiré le schéma `file:///…` en conservant un chemin calculé depuis la racine du dépôt, sans tenir
compte de la base de résolution Markdown. Deux affirmations alors produites étaient fausses :

- le nombre annoncé était de 7 liens, alors qu'il y en a 8 ;
- la navigation était déclarée réparée, alors que seul le schéma avait disparu.

A03 et A04 sont confirmés sur ce point : l'absence de `file://` mesurée par `grep` ne prouvait pas
la cliquabilité, et une correction validée par son propre auteur ne constitue pas un contrôle.

## 3. Limites explicites

- Vérification effectuée par **résolution de chemin sur disque** depuis le dossier du rapport.
  Aucun clic réel dans l'interface de livraison n'a été exécuté : cet agent ne dispose pas de
  navigateur piloté. Le critère « cliquabilité effective » reste **BLOQUÉ**.
- L'inventaire exhaustif M2 exigé par l'ordre — par occurrence et par contexte, couvrant Markdown,
  HTML, JSON, notebook, ancres, routes, URL calculées, avec type MIME, redirections, fichier
  téléchargé complet et hash — **n'est pas réalisé**. Seul le défaut confirmé A03 est traité.
- La distinction PASS local / disponibilité publique est maintenue : cette correction ne touche que
  des fichiers du dépôt, et n'a aucun effet sur la page servie (voir M0, section 4).

## 4. Sauvegarde

`_backups/E26-REPRISE-QUALITE-003/M2/20260908-213116/codex-merge-links-report.md`, 7 876 octets,
SHA-256 vérifié identique à l'original avant modification. **Conservée** : aucune vérification
indépendante n'ayant eu lieu, la condition de suppression posée par l'ordre n'est pas remplie.

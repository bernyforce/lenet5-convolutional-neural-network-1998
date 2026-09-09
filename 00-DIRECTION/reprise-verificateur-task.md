# Mandat d'audit indépendant — M0 et M2 de l'ordre 003

Mission : E26-REPRISE-QUALITE-003. Ordre canonique : `00-DIRECTION/codex-redirection-003.md`.
Émis par : Claude Code (Opus 5), rôle **exécuteur** des modules M0 et M2, le 2026-09-08.
Ledger de l'exécution auditée : `256ee070-a45f-4e17-afb9-24430389c2f0` (clos en **PARTIEL**).
Branche portant les travaux : `reprise-qualite-003`.

## 0. Condition d'indépendance — lis ceci d'abord

Tu ne dois accepter ce mandat que si tu n'as **ni planifié ni exécuté** M0 ou M2. L'agent qui a
produit les travaux audités est Claude Code, session unique, et il a lui-même déclaré ne pas pouvoir
se vérifier. Si tu es cette même session, **refuse** et déclare BLOQUÉ.

Tu ne valides rien sur parole. Chaque valeur attendue ci-dessous est à recalculer. Un contrôle que
tu ne peux pas exécuter reste **BLOQUÉ** — jamais PASS par supposition. Un écart, même mineur, est
un **FAIL** à documenter, pas à arrondir.

## 1. Livrables attendus de ta part

- `00-DIRECTION/reprise-M0-verification-01.md`
- `00-DIRECTION/reprise-M2-verification-01.md`
- Preuves sous `00-DIRECTION/preuves/reprise-M0/` et `00-DIRECTION/preuves/reprise-M2/`
  (commandes exactes, sorties expurgées, hashes).

Format par critère : identifiant, commande exécutée, sortie obtenue, valeur attendue, verdict
PASS / FAIL / BLOQUÉ. Fiche de présence agent-ledger `start` avant, `end` après, même si FAIL.
Coordination par fichier uniquement, un seul rédacteur par fichier, verrou atomique propre, scan de
secrets avant écriture.

## 2. Interdits absolus pendant l'audit

- Ne pas arrêter ni redémarrer le processus **PID 15368** qui écoute sur le port **8080**.
  Il est préexistant à la mission.
- Ne pas modifier `C:/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/` — copie
  préservée, lecture seule.
- Aucune action Cloudflare, DNS, tunnel, ni `git push`, ni force-push, ni `reset --hard`.
- Ne pas supprimer de sauvegarde avant d'avoir statué sur le critère V13.
- Si tu lances un serveur, choisis un port libre **autre que 8080 et 8971**, et déclare le PID créé.

## 3. Documents audités

| Document | Rôle |
|---|---|
| `00-DIRECTION/codex-reprise-modulaire-report.md` | Réponse principale à l'ordre 003 |
| `00-DIRECTION/reprise-M0-plan.md` | Plan M0 |
| `00-DIRECTION/reprise-M0-execution.md` | Exécution M0 |
| `00-DIRECTION/reprise-M2-execution.md` | Exécution M2 (partielle) |
| `00-DIRECTION/preuves/reprise-M0/m0-cartographie-et-exclusions.md` | Preuves M0 |
| `00-DIRECTION/preuves/reprise-M2/m2-a03-liens-rapport-fusion.md` | Preuves M2 |

Commits à auditer sur `reprise-qualite-003`, parent `2aeee3bf8acd18b6ca061444a56c88f7776d8baf` :

| Commit | Portée |
|---|---|
| `0f83460fd32e4787f3d40b5af9515c8228923b5c` | M0 — exclusions `_backups`, cartographie |
| `a6ea15d71820ef1a324eacae918571acada0462b` | M2 — correction des 8 liens A03 |
| `0379a57b193c321de51de609718097d406a7ba51` | docs — SHA consignés |

## 4. Critères à contrôler

Racine projet, notée `$P` ci-dessous :
`/home/bf/knowledge-share/projets-dev/e26-dossier-rxneurones`

### V01 — Page publique et page locale 8080 identiques, hash exact

```bash
curl -s https://lenet5.iatuto.com/ | sha256sum
curl -s http://127.0.0.1:8080/ | sha256sum
```
Attendu pour les deux : `7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339`, 137 089 octets.

### V02 — Le fichier du projet diffère de la page servie

```bash
cd "$P" && sha256sum index.html && wc -c index.html
```
Attendu : `37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081`, 132 513 octets.

### V03 — Le JS servi échoue, celui du projet passe

Extraire chaque bloc `<script>` **sans attribut `src`** puis contrôler la syntaxe :

```bash
cd "$P" && curl -s https://lenet5.iatuto.com/ -o /tmp/servi.html
python3 - <<'EOF'
import re, subprocess
for label, path in [("SERVIE", "/tmp/servi.html"), ("PROJET", "index.html")]:
    html = open(path, encoding="utf-8", errors="replace").read()
    for i, s in enumerate(re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', html, re.S)):
        open(f"/tmp/{label}_{i}.js", "w", encoding="utf-8").write(s)
        r = subprocess.run(["node", "--check", f"/tmp/{label}_{i}.js"], capture_output=True, text=True)
        print(label, i, "rc=", r.returncode, r.stderr.strip().splitlines()[-1:] )
EOF
```
Attendu : `SERVIE` → code retour non nul, `SyntaxError: Invalid or unexpected token`.
`PROJET` → code retour 0. Un HTTP 200 ne vaut pas page fonctionnelle : c'est le cœur de A01.

### V04 — Sonde discriminante de l'arbre servi

```bash
for u in remotion-lenet5-ncr/out/frames/frame_01_0.5s.png animations/frames/frame_01_0.5s.png; do
  echo -n "$u  8080="; curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8080/$u"
  echo -n "  public=";  curl -s -o /dev/null -w '%{http_code}\n' "https://lenet5.iatuto.com/$u"
done
ls "$P/remotion-lenet5-ncr" 2>&1 | head -1
ls /c/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/remotion-lenet5-ncr | head -1
```
Attendu : `remotion-lenet5-ncr/...` → 200 sur 8080 et public, **absent** du projet, **présent** dans
la copie Downloads. `animations/frames/...` → 200 partout, donc **non discriminant** : vérifie que
l'exécuteur ne s'en est pas servi comme preuve.

Conteste explicitement la conclusion de l'exécuteur : il affirme que l'arbre servi est la copie
Downloads **ou un clone exact non localisé**, le CWD du processus n'étant pas exposé. Dis si cette
marge d'incertitude est correctement posée ou si elle est présentée comme une certitude.

### V05 — Nature du site public : tunnel, pas déploiement GitHub

```bash
curl -sI https://lenet5.iatuto.com/ | tr -d '\r'
curl -sI http://127.0.0.1:8080/ | tr -d '\r'
ls "$P/wrangler.toml" "$P/.github/workflows" 2>&1
```
Attendu : mêmes en-têtes applicatifs des deux côtés (`X-Content-Type-Options`,
`X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Access-Control-Allow-Origin: *`,
`Cache-Control: no-cache`, `Content-Length` identique) ; aucun `wrangler.toml` ; aucun workflow de
déploiement. Conclusion à valider ou infirmer : **un commit ou un push ne modifie pas la page
publique**. L'hôte portant le tunnel est déclaré non identifié — confirme que ce point reste BLOQUÉ
et non conclu.

### V06 — Processus 8080 préexistant et non touché

PowerShell :
```powershell
$c = Get-NetTCPConnection -LocalPort 8080 -State Listen
Get-Process -Id $c.OwningProcess | Select-Object Id, ProcessName, StartTime
```
Attendu : PID 15368, `node`, démarrage 2026-09-08 06:19:31, toujours vivant.

### V07 — Exclusion Git de `_backups`

```bash
cd "$P" && git check-ignore -v _backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js
git status --porcelain | grep -c _backups
git log --all --name-only --format="" -- '_backups/*' | sort -u | head
```
Attendu : règle `.gitignore:29` → `**/_backups/` ; `0` occurrence dans `status` ; **aucun** fichier
`_backups/` n'a jamais été committé.

### V08 — Exclusion HTTP de `_backups`, mesurée et non lue dans le code

Lance le `server.js` du projet sur un port libre de ton choix (ni 8080 ni 8971), lié à `$P` :

```bash
cd "$P" && PORT=<TON_PORT_LIBRE> HOST=127.0.0.1 node server.js &
for u in "_backups/" \
         "_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js" \
         "_backups/codex-ordre-003/20260908-212125-832/start-.agent-ledger-open.json"; do
  echo -n "/$u -> "; curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:<TON_PORT_LIBRE>/$u"
done
```
Attendu : **403** sur les trois, dont le `.json` qui n'était pas couvert avant le correctif.

Piège à contrôler : sur le port 8080, `/_backups/` renvoie **404**, ce qui ne prouve **aucune**
exclusion — ce 404 vient de ce que l'arbre servi est un autre dossier. Vérifie que l'exécuteur a
bien écarté ce piège au lieu de s'en servir comme preuve.

### V09 — Correctif `server.js` minimal et syntaxiquement valide

```bash
cd "$P" && node --check server.js && echo "rc=0"
git diff 2aeee3b..0f83460 -- server.js .gitignore
```
Attendu : `rc=0` ; diff limité à **1 ligne ajoutée** dans `server.js`
(`pathParts.includes('_backups') ||`) et **4 lignes ajoutées** dans `.gitignore`. Aucune autre
modification, aucun « nettoyage » de code adjacent.

### V10 — Les 8 liens A03 résolus depuis le dossier du rapport

```bash
cd "$P" && n=0; ok=0
for t in $(grep -o '](\([^)]*\))' 00-DIRECTION/codex-merge-links-report.md | sed 's/^](//;s/)$//'); do
  n=$((n+1)); [ -e "00-DIRECTION/$t" ] && ok=$((ok+1)) || echo "MANQUANT $t"
done; echo "$ok/$n resolues"
grep -c 'file://\|00-DIRECTION/00-DIRECTION' 00-DIRECTION/codex-merge-links-report.md
sha256sum 00-DIRECTION/codex-merge-links-report.md
```
Attendu : `8/8 resolues` ; `0` résidu ; hash
`849bdc433f218027904aa1508876af06e5380c41ec137089abbaacbb07e576c9`.

La base de résolution correcte est `00-DIRECTION/`, dossier du rapport. Contrôle aussi qu'aucune
**mention textuelle** de protocole n'a été transformée en lien, et qu'aucun vrai lien n'a été
laissé de côté au motif qu'il ressemblait à du texte.

### V11 — Cliquabilité effective : BLOQUÉ à lever si tu es équipé

L'exécuteur n'a **pas** de navigateur piloté et a déclaré ce critère BLOQUÉ, en ne prouvant que la
résolution de chemin sur disque. Si tu disposes d'un navigateur piloté, effectue les clics réels
depuis le rendu de `codex-merge-links-report.md` dans l'interface de livraison et capture le
résultat. Sinon, maintiens **BLOQUÉ** : ne convertis pas une résolution de chemin en cliquabilité.

### V12 — Prévisualisation liée au commit

```bash
cd "$P" && git show a6ea15d:index.html | sha256sum
curl -s http://127.0.0.1:<TON_PORT_LIBRE>/ | sha256sum
```
Attendu : les deux égaux à
`37429e33e03882c4ba92f2f91cffb74728f65b8c6138f87c4c3ed7386ecdb081`. Contrôle en outre que la page
servie par cette prévisualisation passe `node --check` là où la page publique échoue (V03).

### V13 — Récupération avant suppression des sauvegardes

L'exécuteur a **conservé** les sauvegardes, faute de vérification indépendante. C'est à toi de
statuer. Preuve de récupération à recalculer :

```bash
cd "$P"
for p in ".gitignore:_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/.gitignore" \
         "server.js:_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js" \
         "00-DIRECTION/codex-merge-links-report.md:_backups/E26-REPRISE-QUALITE-003/M2/20260908-213116/codex-merge-links-report.md"; do
  f="${p%%:*}"; b="${p##*:}"
  echo "$f  git=$(git show "2aeee3b:$f" | sha256sum | cut -d' ' -f1)  bak=$(sha256sum "$b" | cut -d' ' -f1)"
done
```
Valeurs attendues, `git show` et sauvegarde devant être **identiques** pour chaque ligne :

| Fichier | SHA-256 avant modification |
|---|---|
| `.gitignore` | `92067511569bfebda6eb66bc5efe17776c1d2751ae4db16d9e9852c99353fc51` |
| `server.js` | `2a6e8477891ac45fc303e7fb94315843287ba8bf750394ae478614d94e06e339` |
| `00-DIRECTION/codex-merge-links-report.md` | `b764270e7155459d6b8a269eaac6a80203ce0e843947b1449e33775643b070f5` |

Si et seulement si les trois concordent **et** que M0 et M2 sont PASS, la suppression des
sauvegardes de ces deux modules est autorisée. Avant toute suppression : résoudre le chemin absolu,
contrôler qu'il reste sous `_backups/E26-REPRISE-QUALITE-003/<module>/`, vérifier l'absence de lien
symbolique, journaliser les fichiers supprimés et le commit de récupération. Ne touche à **aucune**
sauvegarde historique ni à `_backups/codex-ordre-003/` qui appartient à un autre agent.

### V14 — Honnêteté des rapports audités

Contrôle que les rapports ne revendiquent rien au-delà du prouvé. En particulier :

- A06, M1, M3, M4 doivent rester **BLOQUÉS**, sans PASS déguisé.
- Aucun PASS de module ne doit être prononcé par l'exécuteur.
- Aucune identité d'agent inventée, aucun rôle fictif de vérificateur.
- Les auto-corrections annoncées doivent correspondre aux faits : 8 liens et non 7 ; navigation non
  réparée au cycle précédent ; site public requalifié en tunnel et non en déploiement Pages.
- Le force-push antérieur à l'ordre 003 doit être déclaré (section 7 de la réponse principale).

Si tu trouves une affirmation non étayée, c'est un **FAIL** de rapport, indépendamment de l'état
technique du code.

## 5. Verdict attendu

Un verdict par module, M0 et M2, chacun PASS / FAIL / BLOQUÉ, avec le détail par critère V01-V14.
Un FAIL renvoie à l'exécuteur, puis à un **nouveau** vérificateur indépendant. Aucun PASS global de
la mission n'est possible tant que M1, M3, M4 restent non livrés.
